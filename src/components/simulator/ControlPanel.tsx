/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScadaState } from '../../types';
import { 
  Activity, 
  AlertCircle, 
  Check, 
  Droplets, 
  Gauge, 
  Power, 
  RefreshCw, 
  Sliders, 
  Wrench,
  Info
} from 'lucide-react';

interface ControlPanelProps {
  selectedUnit: string;
  scada: ScadaState;
  onUpdateScada: (updates: Partial<ScadaState>, actionName: string, value: string | number) => void;
  onOpenNarrative: (unitId: string) => void;
  onResetPumpTrip: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedUnit,
  scada,
  onUpdateScada,
  onOpenNarrative,
  onResetPumpTrip,
}) => {
  return (
    <div className="bg-[#0f172a] rounded-2xl border border-[#24324d] p-4 flex flex-col h-full font-sans text-slate-100 select-none shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1e293b] mb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            PANEL KENDALI TITIK KONTROL
          </h3>
        </div>
        <span className="text-[10px] text-sky-400 font-mono font-bold capitalize">
          {selectedUnit}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
        
        {/* ======================================================== */}
        {/* UNIT: KOAGULASI (DEFAULT FOCUS FOR IPA-06 L5 SVG)        */}
        {/* ======================================================== */}
        {selectedUnit === 'koagulasi' && (
          <div className="space-y-3.5">
            <div className="text-[11px] text-slate-400 font-semibold">
              Unit Terpilih: <strong className="text-sky-400">Flash Mixer Koagulasi</strong>
            </div>

            {/* Slider 1: Setpoint Dosis PAC */}
            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  SETPOINT DOSIS KOAGULAN (PAC):
                </span>
                <span className="text-xs font-black text-sky-400 font-mono">
                  {scada.coagulantDoseSetpoint.toFixed(1)} mg/L
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="1"
                value={scada.coagulantDoseSetpoint}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdateScada(
                    { coagulantDoseSetpoint: val, coagulantActualDose: val },
                    'Ubah Setpoint Dosis Koagulan PAC',
                    `${val} mg/L`
                  );
                }}
                className="w-full accent-sky-500 cursor-pointer h-2 bg-[#1e293b] rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>Min: 10 mg/L</span>
                <span className="text-emerald-400 font-bold">SOP Banjir: 45–50 mg/L</span>
                <span>Max: 80 mg/L</span>
              </div>
            </div>

            {/* Slider 2: Dosis Penyesuai pH Kapur */}
            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  DOSIS PENYESUAI pH (KAPUR):
                </span>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  8,5 mg/L
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                defaultValue={8.5}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdateScada({ waterPh: 7.20 }, 'Koreksi Dosis Penyesuai pH Kapur', `${val} mg/L`);
                }}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-[#1e293b] rounded-lg"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>Target pH: 7,20 (Rentang Aman: 6,5–8,5)</span>
              </div>
            </div>

            {/* Flash Mixer Motor Buttons */}
            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                MOTOR FLASH MIXER:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateScada(
                      { flashMixerRunning: true },
                      'Nyalakan Flash Mixer Koagulasi',
                      'ON (120 RPM)'
                    )
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    scada.flashMixerRunning
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#1e293b] text-slate-400 hover:text-white'
                  }`}
                >
                  ON (120 RPM)
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateScada(
                      { flashMixerRunning: false },
                      'Matikan Flash Mixer Koagulasi',
                      'OFF'
                    )
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                    !scada.flashMixerRunning
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-[#1e293b] text-slate-400 hover:text-white'
                  }`}
                >
                  OFF (STOP)
                </button>
              </div>
            </div>

            {/* Dosing Klorin */}
            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                DOSING DESINFEKSI KLORIN (PRD §9):
              </span>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-sky-300 font-bold">1,20 mg/L (Sisa Klor: 0,38 mg/L)</span>
                <span className="text-emerald-400 text-[10px] font-bold">SOP Aman ✓</span>
              </div>
            </div>

            {/* Open Narrative Button */}
            <button
              type="button"
              onClick={() => onOpenNarrative('koagulasi')}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Info className="w-4 h-4 text-sky-400" />
              <span>BUKA NARASI TITIK KONTROL KOAGULASI</span>
            </button>
            <p className="text-[9px] text-center text-slate-500">
              Tanpa pengurangan skor · SOP Lembaga
            </p>

            {/* Hidden PRV Note on IPA Track */}
            <div className="pt-2 border-t border-[#1e293b] text-[10px] text-slate-500 text-center italic">
              PRV disembunyikan pada Misi IPA (Hanya di Jalur Distribusi).
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* UNIT: INTAKE & POMPA AIR BAKU                            */}
        {/* ======================================================== */}
        {selectedUnit === 'intake' && (
          <div className="space-y-3.5">
            <div className="text-[11px] text-slate-400 font-semibold">
              Unit Terpilih: <strong className="text-sky-400">Intake & Pompa Air Baku</strong>
            </div>

            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                Kontrol Pompa Intake (Air Baku):
              </span>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  type="button"
                  onClick={() =>
                    onUpdateScada(
                      { intakePump1Running: !scada.intakePump1Running },
                      scada.intakePump1Running ? 'Stop Pompa Intake 1' : 'Start Pompa Intake 1',
                      scada.intakePump1Running ? 'STOP' : 'RUN'
                    )
                  }
                  disabled={scada.intakePumpTripped}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    scada.intakePumpTripped
                      ? 'bg-rose-950/40 text-rose-400 border border-rose-500/40 cursor-not-allowed'
                      : scada.intakePump1Running
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#1e293b] text-slate-400 hover:text-white'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  P1: {scada.intakePumpTripped ? 'TRIP' : scada.intakePump1Running ? 'RUN' : 'STOP'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onUpdateScada(
                      { intakePump2Running: !scada.intakePump2Running },
                      scada.intakePump2Running ? 'Stop Pompa Intake 2' : 'Start Pompa Intake 2 (Standby)',
                      scada.intakePump2Running ? 'STOP' : 'RUN'
                    )
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    scada.intakePump2Running
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-[#1e293b] text-slate-400 hover:text-white'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  P2: {scada.intakePump2Running ? 'RUN' : 'STANDBY'}
                </button>
              </div>

              {/* Pump Trip Reset Button */}
              {scada.intakePumpTripped && (
                <div className="p-2.5 bg-rose-950/30 border border-rose-500/40 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>Pompa 1 Overload Trip!</span>
                  </div>
                  <button
                    type="button"
                    onClick={onResetPumpTrip}
                    className="w-full py-1.5 px-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Proteksi Trip Pompa Intake</span>
                  </button>
                </div>
              )}

              {/* Debit Intake Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Debit Intake:</span>
                  <span className="text-sky-400 font-mono font-bold">{scada.rawWaterFlow.toFixed(0)} L/s</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="120"
                  step="5"
                  value={scada.rawWaterFlow}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    onUpdateScada({ rawWaterFlow: val }, 'Ubah Debit Intake', `${val} L/s`);
                  }}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-[#1e293b] rounded-lg"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenNarrative('intake')}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Info className="w-4 h-4 text-sky-400" />
              <span>Buka Narasi Titik Kontrol Intake</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* UNIT: FILTRASI                                           */}
        {/* ======================================================== */}
        {selectedUnit === 'filtrasi' && (
          <div className="space-y-3.5">
            <div className="text-[11px] text-slate-400 font-semibold">
              Unit Terpilih: <strong className="text-sky-400">Filtrasi Pasir Cepat</strong>
            </div>

            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Headloss Filter:</span>
                <span className="text-amber-400 font-mono font-bold">{scada.filter1Headloss.toFixed(1)} m</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Kekeruhan Olahan:</span>
                <span className="text-rose-400 font-mono font-bold">{scada.filteredWaterTurbidity.toFixed(1)} NTU</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onUpdateScada({ filter1Backwashing: true, filter1Headloss: 0.6 }, 'Mulai Backwash Filter', 'BACKWASH');
                    alert('Siklus pencucian balik (Backwash) Filter Pasir 1 telah dimulai secara bertahap.');
                  }}
                  className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Pencucian Balik (Backwash Filter)
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenNarrative('filtrasi')}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Info className="w-4 h-4 text-sky-400" />
              <span>Buka Narasi Filtrasi</span>
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* UNIT: RESERVOIR                                          */}
        {/* ======================================================== */}
        {selectedUnit === 'reservoir' && (
          <div className="space-y-3.5">
            <div className="text-[11px] text-slate-400 font-semibold">
              Unit Terpilih: <strong className="text-sky-400">Reservoir Air Bersih</strong>
            </div>

            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Level Air:</span>
                <span className="text-sky-400 font-mono font-bold">{scada.reservoirLevelMeters.toFixed(2)} m (84%)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Sisa Klorin:</span>
                <span className="text-emerald-400 font-mono font-bold">{scada.freeResidualChlorine.toFixed(2)} mg/L</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onUpdateScada({ reservoirInletOpen: !scada.reservoirInletOpen }, 'Katup Inlet Reservoir', scada.reservoirInletOpen ? 'TUTUP' : 'BUKA')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold ${scada.reservoirInletOpen ? 'bg-emerald-600 text-white' : 'bg-[#1e293b] text-slate-400'}`}
                >
                  Katup Masuk: {scada.reservoirInletOpen ? 'BUKA' : 'TUTUP'}
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateScada({ reservoirOutletOpen: !scada.reservoirOutletOpen }, 'Katup Outlet Reservoir', scada.reservoirOutletOpen ? 'TUTUP' : 'BUKA')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold ${scada.reservoirOutletOpen ? 'bg-emerald-600 text-white' : 'bg-[#1e293b] text-slate-400'}`}
                >
                  Katup Keluar: {scada.reservoirOutletOpen ? 'BUKA' : 'TUTUP'}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenNarrative('reservoir')}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Info className="w-4 h-4 text-sky-400" />
              <span>Buka Narasi Reservoir</span>
            </button>
          </div>
        )}

        {/* Fallback for other units */}
        {selectedUnit !== 'koagulasi' && selectedUnit !== 'intake' && selectedUnit !== 'filtrasi' && selectedUnit !== 'reservoir' && (
          <div className="space-y-3.5">
            <div className="text-[11px] text-slate-400 font-semibold">
              Unit Terpilih: <strong className="text-sky-400 capitalize">{selectedUnit}</strong>
            </div>

            <div className="p-3 bg-[#0b1120] rounded-xl border border-[#1e293b] text-xs text-slate-400 space-y-2">
              <p>Pengaturan telemetri operasional aktif untuk unit {selectedUnit}.</p>
            </div>

            <button
              type="button"
              onClick={() => onOpenNarrative(selectedUnit)}
              className="w-full py-2.5 px-3 rounded-xl bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/40 text-sky-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Info className="w-4 h-4 text-sky-400" />
              <span>Buka SOP Narasi ({selectedUnit})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
