/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { ActionLog, AlarmItem, Mission, MissionResult, ScadaState } from '../../types';
import { useApp } from '../../context/AppContext';
import { CONTROL_POINTS } from '../../data/seedData';
import { 
  evaluateMissionScore, 
  INITIAL_SCADA_STATE, 
  tickSimulation 
} from '../../engine/simulationEngine';
import { ScadaMimic } from '../simulator/ScadaMimic';
import { ControlPanel } from '../simulator/ControlPanel';
import { AlarmPanel } from '../simulator/AlarmPanel';
import { TrendChart } from '../simulator/TrendChart';
import { NarrativeModal } from '../simulator/NarrativeModal';
import { scadaAudio } from '../../utils/audio';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Lightbulb, 
  Play, 
  RotateCcw, 
  StopCircle,
  Building2,
  XCircle,
  Activity,
  Droplets,
  Sliders
} from 'lucide-react';

interface ScadaSimulatorProps {
  mission: Mission;
  onFinishMission: (result: MissionResult) => void;
  onExit: () => void;
}

export const L5_ScadaSimulator: React.FC<ScadaSimulatorProps> = ({
  mission,
  onFinishMission,
  onExit,
}) => {
  const { currentUser, currentTenant, activeTrack, saveMissionResult } = useApp();

  // Initial state for IPA-06 matching L5 mockup:
  // Timer at 02:45, raw water 185 NTU, PAC at 48 mg/L, pH 7.20, filtered 3.4 NTU, alarms active acknowledged
  const [scada, setScada] = useState<ScadaState>(() => ({
    ...INITIAL_SCADA_STATE,
    rawWaterFlow: 75.0,
    rawWaterTurbidity: 185.0,
    coagulantDoseSetpoint: 48.0,
    coagulantActualDose: 48.0,
    waterPh: 7.20,
    flashMixerRunning: true,
    flocculatorMixerRunning: true,
    settledWaterTurbidity: 12.4,
    sludgeLevelPercent: 28,
    filteredWaterTurbidity: 3.4,
    filter1Headloss: 1.6,
    freeResidualChlorine: 0.38,
    reservoirLevelMeters: 4.20,
    reservoirLevelPercent: 84,
  }));

  const [elapsedSec, setElapsedSec] = useState<number>(165); // 02:45
  const [selectedUnit, setSelectedUnit] = useState<string>('koagulasi');
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);
  const [currentNarrativeUnit, setCurrentNarrativeUnit] = useState<string | null>(null);

  // Initial 2 active alarms in acknowledged state matching L5 SVG
  const [alarms, setAlarms] = useState<AlarmItem[]>([
    {
      id: 'alm-sedang-01',
      timestamp: '01:15',
      timestampSec: 75,
      priority: 'sedang',
      controlPointId: 'intake',
      controlPointName: 'Intake Air Baku',
      message: 'Kekeruhan air baku tinggi (185 NTU, masih di atas ambang)',
      status: 'aktif_diakui',
      clearMethod: 'auto',
    },
    {
      id: 'alm-tinggi-02',
      timestamp: '01:45',
      timestampSec: 105,
      priority: 'tinggi',
      controlPointId: 'filtrasi',
      controlPointName: 'Filtrasi (Air Olahan)',
      message: 'Kekeruhan air olahan ≥ 3 NTU (Terukur: 3,4 NTU)',
      status: 'aktif_diakui',
      clearMethod: 'auto',
    },
  ]);

  const [actionLogs, setActionLogs] = useState<ActionLog[]>([
    { timestampSec: 75, controlPointId: 'intake', action: 'Alarm SEDANG muncul: kekeruhan air baku melonjak 20 → 185 NTU', value: 185, isCorrect: true },
    { timestampSec: 85, controlPointId: 'intake', action: 'ACK alarm air baku dalam 10 detik', value: 'ACK', isCorrect: true },
    { timestampSec: 105, controlPointId: 'filtrasi', action: 'Alarm TINGGI muncul: kekeruhan air olahan 3,4 NTU (≥ 3,0 NTU)', value: 3.4, isCorrect: true },
    { timestampSec: 110, controlPointId: 'filtrasi', action: 'ACK alarm air olahan dalam 5 detik', value: 'ACK', isCorrect: true },
    { timestampSec: 130, controlPointId: 'koagulasi', action: 'Dosis PAC 20 → 48 mg/L (tindakan benar pertama: 25 detik)', value: 48, isCorrect: true },
    { timestampSec: 145, controlPointId: 'koagulasi', action: 'Dosis kapur 8,5 mg/L, pH dijaga 7,20', value: 8.5, isCorrect: true },
    { timestampSec: 160, controlPointId: 'intake', action: 'Debit intake diturunkan ke 75 L/s', value: 75, isCorrect: true },
  ]);

  // Stability counters for 10s auto-clear deadband
  const [turbidityStableCount, setTurbidityStableCount] = useState<number>(0);
  const [chlorineStableCount, setChlorineStableCount] = useState<number>(0);
  const [pressureStableCount, setPressureStableCount] = useState<number>(0);
  const [stableTicks, setStableTicks] = useState<number>(100);

  // Trend history
  const [trendHistory, setTrendHistory] = useState<Array<{
    timeSec: number;
    turbidity: number;
    settledTurbidity: number;
    freeChlorine: number;
    reservoirLevel: number;
    zonePressure: number;
    zoneFlow: number;
  }>>([
    { timeSec: 0, turbidity: 20, settledTurbidity: 3.5, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
    { timeSec: 75, turbidity: 185, settledTurbidity: 3.5, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
    { timeSec: 105, turbidity: 185, settledTurbidity: 12.0, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
    { timeSec: 130, turbidity: 185, settledTurbidity: 10.5, freeChlorine: 0.35, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 100 },
    { timeSec: 165, turbidity: 185, settledTurbidity: 7.5, freeChlorine: 0.38, reservoirLevel: 4.2, zonePressure: 2.4, zoneFlow: 75 },
  ]);

  const isRunningRef = useRef<boolean>(true);
  const prevAlarmsCountRef = useRef<number>(alarms.length);

  useEffect(() => {
    // 1-Second Simulation Interval Loop (1 Hz)
    const timer = window.setInterval(() => {
      if (!isRunningRef.current) return;

      setElapsedSec((prev) => {
        const nextSec = prev + 1;

        setScada((prevScada) => {
          const simRes = tickSimulation(
            prevScada,
            mission,
            nextSec,
            alarms,
            actionLogs,
            turbidityStableCount,
            chlorineStableCount,
            pressureStableCount
          );

          setAlarms(simRes.alarms);
          setTurbidityStableCount(simRes.nextTurbidityStableCount);
          setChlorineStableCount(simRes.nextChlorineStableCount);
          setPressureStableCount(simRes.nextPressureStableCount);

          if (simRes.isParameterStable) {
            setStableTicks((s) => s + 1);
          }

          setTrendHistory((th) => [
            ...th.slice(-120),
            {
              timeSec: nextSec,
              turbidity: simRes.nextScada.filteredWaterTurbidity,
              settledTurbidity: simRes.nextScada.settledWaterTurbidity,
              freeChlorine: simRes.nextScada.freeResidualChlorine,
              reservoirLevel: simRes.nextScada.reservoirLevelMeters,
              zonePressure: simRes.nextScada.zone1Pressure,
              zoneFlow: simRes.nextScada.zone1Flow,
            },
          ]);

          return simRes.nextScada;
        });

        return nextSec;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
      scadaAudio.stopAlarmSound();
    };
  }, [alarms, actionLogs, turbidityStableCount, chlorineStableCount, pressureStableCount, mission]);

  // Handle Control Panel user action
  const handleUpdateScada = (
    updates: Partial<ScadaState>,
    actionName: string,
    value: string | number
  ) => {
    setScada((prev) => ({ ...prev, ...updates }));

    let isCorrect = true;
    let feedback = 'Tindakan dicatat';

    if (updates.distPump1Running === false && !scada.distPump2Running && actionName.includes('Stop')) {
      isCorrect = false;
      feedback = 'Tindakan Tidak Aman: Menghentikan seluruh pompa pasokan mendadak (-15 Poin)';
    }

    const newLog: ActionLog = {
      timestampSec: elapsedSec,
      controlPointId: selectedUnit,
      action: actionName,
      value,
      isCorrect,
      feedback,
    };

    setActionLogs((prev) => [...prev, newLog]);
  };

  // Reset Pump Trip Action
  const handleResetPumpTrip = () => {
    scadaAudio.playAcknowledgeChime();

    setScada((prev) => ({
      ...prev,
      intakePumpTripped: false,
      distPumpTripped: false,
    }));

    setAlarms((prev) =>
      prev.map((a) => {
        if (a.isLatched && a.status !== 'clear') {
          return {
            ...a,
            status: 'pulih_belum_clear',
            latchedResetDone: true,
            clearNote: 'Thermal breaker telah di-reset oleh operator. Siap di-clear.',
          };
        }
        return a;
      })
    );

    setActionLogs((prev) => [
      ...prev,
      {
        timestampSec: elapsedSec,
        controlPointId: selectedUnit,
        action: 'Reset Proteksi Trip Pompa (Electrical Reset)',
        value: 'RESET_OK',
        isCorrect: true,
        feedback: 'Reset trip pompa berhasil dilakukan sesuai SOP.',
      },
    ]);
  };

  // Alarm Acknowledge
  const handleAcknowledgeAlarm = (alarmId: string) => {
    scadaAudio.playAcknowledgeChime();
    setAlarms((prev) =>
      prev.map((a) => (a.id === alarmId ? { ...a, status: 'aktif_diakui' } : a))
    );

    setActionLogs((prev) => [
      ...prev,
      {
        timestampSec: elapsedSec,
        controlPointId: selectedUnit,
        action: 'Acknowledge (Akui) Alarm SCADA',
        value: alarmId,
        isCorrect: true,
      },
    ]);
  };

  // Alarm Manual Clear with Rejection (PRD §10)
  const handleClearAlarm = (alarmId: string): { success: boolean; message: string } => {
    const alarm = alarms.find((a) => a.id === alarmId);
    if (!alarm) return { success: false, message: 'Alarm tidak ditemukan' };

    // Rejection 1: Latched Pump Trip
    if (alarm.isLatched && !alarm.latchedResetDone) {
      setActionLogs((prev) => [
        ...prev,
        {
          timestampSec: elapsedSec,
          controlPointId: alarm.controlPointId,
          action: 'Percobaan Clear Alarm Sebelum Reset Trip (Ditolak)',
          value: 'REJECTED',
          isCorrect: false,
          feedback: 'Pelanggaran SOP: Alarm pompa trip wajib di-reset di panel kontrol sebelum di-clear! (-15 Poin)',
        },
      ]);
      return {
        success: false,
        message: 'Penyebab belum ditangani: Pompa trip harus di-reset terlebih dahulu!',
      };
    }

    // Rejection 2: Parameter is still abnormal
    if (alarm.controlPointId === 'filtrasi' && scada.filteredWaterTurbidity >= 3.0) {
      setActionLogs((prev) => [
        ...prev,
        {
          timestampSec: elapsedSec,
          controlPointId: 'filtrasi',
          action: 'Percobaan Clear Alarm Kekeruhan Tinggi Saat Masih Abnormal (Ditolak)',
          value: 'REJECTED',
          isCorrect: false,
          feedback: 'Pelanggaran SOP: Tombol Clear ditekan saat kekeruhan air olahan masih di atas 3,0 NTU! (-15 Poin)',
        },
      ]);
      return {
        success: false,
        message: `Penyebab belum ditangani: Kekeruhan air olahan ${scada.filteredWaterTurbidity.toFixed(1)} NTU ≥ 3,0 NTU!`,
      };
    }

    if (alarm.controlPointId === 'intake' && scada.rawWaterTurbidity > 50) {
      setActionLogs((prev) => [
        ...prev,
        {
          timestampSec: elapsedSec,
          controlPointId: 'intake',
          action: 'Percobaan Clear Alarm Kekeruhan Baku Saat Masih Tinggi (Ditolak)',
          value: 'REJECTED',
          isCorrect: false,
          feedback: 'Pelanggaran SOP: Kekeruhan air baku masih 185 NTU!',
        },
      ]);
      return {
        success: false,
        message: `Penyebab belum ditangani: Kekeruhan air baku ${scada.rawWaterTurbidity.toFixed(0)} NTU masih di atas ambang!`,
      };
    }

    // Allowed Clear
    scadaAudio.playSuccessFanfare();
    setAlarms((prev) =>
      prev.map((a) => (a.id === alarmId ? { ...a, status: 'clear', clearMethod: 'manual' } : a))
    );

    return {
      success: true,
      message: 'Alarm berhasil di-clear oleh operator.',
    };
  };

  const handleUseHint = () => {
    setHintsUsedCount((prev) => prev + 1);
    setShowHintModal(true);
    setActionLogs((prev) => [
      ...prev,
      {
        timestampSec: elapsedSec,
        controlPointId: selectedUnit,
        action: 'Operator Membuka Bantuan Petunjuk (-5 Poin)',
        value: `Hint #${hintsUsedCount + 1}`,
        isCorrect: true,
        feedback: 'Pengurangan nilai -5 Poin diterapkan.',
      },
    ]);
  };

  const handleFinish = () => {
    isRunningRef.current = false;
    scadaAudio.stopAlarmSound();

    const result = evaluateMissionScore(
      mission,
      elapsedSec,
      actionLogs,
      alarms,
      { stable: stableTicks, total: Math.max(1, elapsedSec) },
      hintsUsedCount,
      currentUser?.id || 'user-peserta-ipa',
      currentTenant.id,
      currentUser?.track || activeTrack,
      trendHistory
    );

    saveMissionResult(result);
    onFinishMission(result);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Find active highest priority alarm
  const activeAlarm = alarms.find((a) => a.status !== 'clear');

  return (
    <div className="max-w-[1720px] mx-auto px-3 sm:px-6 py-4 font-sans text-slate-100 space-y-4 select-none">
      
      {/* Top Header Bar Matching SVG L5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0f172a] border border-[#24324d] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600/20 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              MISI: {mission.code} {mission.name}
            </div>
            <div className="text-[11px] text-slate-400">
              {currentTenant.name} · Operator: <strong className="text-white">{currentUser?.fullName}</strong> ({currentUser?.role})
            </div>
          </div>
        </div>

        {/* Center Timer & Score */}
        <div className="flex items-center gap-3 font-mono">
          <div className="px-3.5 py-1.5 rounded-xl bg-[#0b1120] border border-[#1e293b] text-xs">
            <span className="text-slate-400 mr-2 font-sans font-semibold">⏱ WAKTU:</span>
            <span className="text-white font-bold text-sm">{formatTimer(elapsedSec)}</span>
            <span className="text-slate-500 text-xs"> / 10:00</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-[#0b1120] border border-[#1e293b] text-xs">
            <span className="text-slate-400 mr-2 font-sans font-semibold">SKOR SEMENTARA:</span>
            <span className="text-emerald-400 font-bold text-sm">92</span>
          </div>
        </div>

        {/* Buttons: Hint (-5 Poin) & Selesai Simulasi */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUseHint}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Petunjuk (−5 Poin)</span>
          </button>

          <button
            onClick={handleFinish}
            className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-rose-950/50 flex items-center gap-1.5"
          >
            <StopCircle className="w-3.5 h-3.5" />
            <span>SELESAI SIMULASI</span>
          </button>
        </div>
      </div>

      {/* Alarm Warning Banner Matching SVG L5 */}
      {activeAlarm && (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/60 text-amber-200 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 shadow-md">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0" />
            <span className="font-bold uppercase tracking-wider text-amber-300">
              ▲ ALARM {activeAlarm.priority.toUpperCase()}:
            </span>
            <span className="truncate text-slate-100 font-medium">
              Kekeruhan Air Olahan Masuk Reservoir {scada.filteredWaterTurbidity.toFixed(1)} NTU (Batas Permenkes: &lt; 3,0 NTU) · Status: Diakui oleh Operator (ACK pada 01:50)
            </span>
          </div>
          <span className="text-[10px] text-amber-300 font-mono font-semibold shrink-0">
            Auto-Clear Aktif setelah Kekeruhan ≤ 2,7 NTU stabil 10 dtk
          </span>
        </div>
      )}

      {/* Main SCADA Workspace Grid: Left = Mimic & Trend Chart, Right = Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* LEFT AREA: SCADA Mimic 7 Units + Trend Chart (Width: 9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          
          {/* Mimic Diagram Canvas */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-3 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between px-2 pb-2 mb-1 border-b border-[#1e293b] text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                DIAGRAM MIMIC PROSES TERPADU: INSTALASI PENGOLAHAN AIR (IPA) AKTIF
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-950 border border-sky-500/30 text-sky-400 font-mono font-bold">
                JALUR IPA · SIKLUS REAL-TIME 1 HZ
              </span>
            </div>

            <ScadaMimic
              scada={scada}
              track={currentUser?.track || activeTrack}
              selectedUnit={selectedUnit}
              onSelectUnit={setSelectedUnit}
              onOpenNarrative={setCurrentNarrativeUnit}
              activeAlarms={alarms}
            />
          </div>

          {/* Real-Time Trend Chart */}
          <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-4 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                TREN KEKERUHAN AIR OLAHAN (REAL-TIME 1 HZ):
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Batas Kritis: 3,0 NTU · Deadband Auto-Clear: ≤ 2,7 NTU
              </span>
            </div>

            <TrendChart trendHistory={trendHistory} />
          </div>
        </div>

        {/* RIGHT AREA: Control Panel (Width: 3 cols) */}
        <div className="lg:col-span-3 bg-[#0f172a] rounded-2xl border border-[#24324d] p-4 shadow-xl">
          <ControlPanel
            selectedUnit={selectedUnit}
            scada={scada}
            onUpdateScada={handleUpdateScada}
            onOpenNarrative={setCurrentNarrativeUnit}
            onResetPumpTrip={handleResetPumpTrip}
          />
        </div>

      </div>

      {/* Bottom Area: Alarm Panel Table (ISA-18.2 4-Status Standard) */}
      <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1e293b] text-xs">
          <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
            DAFTAR ALARM SISTEM (4 STATUS STANDAR PRD §10: AKTIF BLM DIAKUI · AKTIF DIAKUI · PULIH BLM CLEAR · CLEAR)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {alarms.filter((a) => a.status !== 'clear').length} Alarm Memerlukan Perhatian
          </span>
        </div>

        <AlarmPanel
          alarms={alarms}
          onAcknowledge={handleAcknowledgeAlarm}
          onClear={handleClearAlarm}
          onSelectControlPoint={setSelectedUnit}
        />
      </div>

      {/* Educational Narrative Pop-up Modal (L5a) */}
      {currentNarrativeUnit && (
        <NarrativeModal
          controlPoint={
            CONTROL_POINTS.find((cp) => cp.id === currentNarrativeUnit) ||
            CONTROL_POINTS[1] // Koagulasi default
          }
          scada={scada}
          hasActiveAlarm={alarms.some(
            (a) => a.controlPointId === currentNarrativeUnit && a.status !== 'clear'
          )}
          onClose={() => setCurrentNarrativeUnit(null)}
        />
      )}

      {/* Hint Modal (-5 Poin) */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-[#0f172a] rounded-2xl border border-amber-500/40 p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5 text-amber-400">
              <Lightbulb className="w-5 h-5" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Bantuan Petunjuk Mentor (−5 Poin)
              </h3>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-slate-200 leading-relaxed space-y-2">
              <p>1. Tekan tombol <strong className="text-white">ACK</strong> pada banner alarm untuk menghentikan bunyi sirine.</p>
              <p>2. Buka panel kendali <strong className="text-white">Flash Mixer Koagulasi</strong>, lalu naikkan setpoint dosis PAC dari 20 mg/L ke <strong className="text-amber-400">48 mg/L</strong>.</p>
              <p>3. Dosis kapur disetel ke <strong className="text-emerald-400">8,5 mg/L</strong> agar pH tetap 7,20.</p>
              <p>4. Tunggu selama 10 detik setelah kekeruhan air olahan kembali normal (&le; 2,7 NTU), alarm akan <strong className="text-sky-400">Auto-Clear otomatis</strong>.</p>
            </div>

            <div className="text-[10px] text-slate-500 italic">
              Pengurangan skor -5 Poin telah dicatat pada sistem penilaian misi.
            </div>

            <button
              onClick={() => setShowHintModal(false)}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              Kembali ke Workspace SCADA
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
