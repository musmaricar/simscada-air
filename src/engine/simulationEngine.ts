/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ActionLog, AlarmItem, LearningTrack, Mission, MissionResult, ScadaState } from '../types';

export const INITIAL_SCADA_STATE: ScadaState = {
  intakePump1Running: true,
  intakePump2Running: false,
  intakePumpDuty: 1,
  intakePumpTripped: false,
  rawWaterFlow: 200,
  rawWaterTurbidity: 25.0,

  coagulantDoseSetpoint: 30,
  coagulantActualDose: 30,
  waterPh: 7.2,
  flashMixerRunning: true,

  flocculatorMixerRunning: true,
  flocculatorRpm: 18,
  flocQualityScore: 88,

  clarifierBlowdownOpen: false,
  sludgeLevelPercent: 35,
  settledWaterTurbidity: 2.2,

  filter1Active: true,
  filter2Active: true,
  filter1Headloss: 0.8,
  filter2Headloss: 0.9,
  filter1Backwashing: false,
  filter2Backwashing: false,
  filteredWaterTurbidity: 1.1,

  chlorineDoseSetpoint: 1.6,
  freeResidualChlorine: 0.35,

  reservoirInletOpen: true,
  reservoirOutletOpen: true,
  reservoirLevelMeters: 3.8,
  reservoirLevelPercent: 76,

  distPump1Running: true,
  distPump2Running: false,
  distPumpDuty: 1,
  distPumpTripped: false,
  distDischargePressure: 4.1,
  distTotalFlow: 180,

  valveZone1Open: true,
  valveZone2Open: true,
  valveIsolasiBocorOpen: true,
  prvSetpointBar: 2.5,
  zone1Pressure: 2.4,
  zone2Pressure: 2.1,
  zone1Flow: 110,
  zone2Flow: 70,
  pipeLeakActive: false,
  leakFlowSurge: 0,
  zoneChlorineEnd: 0.26,
};

export interface SimTickResult {
  nextScada: ScadaState;
  newAlarms: AlarmItem[];
  updatedAlarms: AlarmItem[];
  stabilityScoreDelta: number;
}

export function tickSimulation(
  current: ScadaState,
  mission: Mission,
  elapsedSec: number,
  existingAlarms: AlarmItem[],
  actionLogs: ActionLog[],
  turbidityStableCount: number,
  chlorineStableCount: number,
  pressureStableCount: number
): {
  nextScada: ScadaState;
  alarms: AlarmItem[];
  nextTurbidityStableCount: number;
  nextChlorineStableCount: number;
  nextPressureStableCount: number;
  isParameterStable: boolean;
} {
  const next: ScadaState = { ...current };
  let alarms = [...existingAlarms];

  // 1. Check & Trigger Skenario Gangguan based on elapsed seconds
  mission.disturbances.forEach((dist) => {
    if (elapsedSec >= dist.triggerTimeSec && elapsedSec < dist.triggerTimeSec + 2) {
      if (dist.type === 'kekeruhan_lonjakan') {
        next.rawWaterTurbidity = 180.0;
        // Raise alarm if not already present
        if (!alarms.some((a) => a.message.includes('Kekeruhan Air Baku Melonjak'))) {
          alarms.push({
            id: `alarm-turb-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            timestampSec: elapsedSec,
            priority: 'tinggi',
            controlPointId: 'koagulasi',
            controlPointName: 'Koagulasi & Pengaduk Cepat',
            message: 'Kekeruhan Air Baku Melonjak Ekstrem (180 NTU)! Flokulasi terancam gagal.',
            status: 'aktif_belum_diakui',
          });
        }
      }

      if (dist.type === 'pompa_trip') {
        if (mission.track.includes('distribusi') && !mission.track.includes('ipa')) {
          next.distPump1Running = false;
          next.distPumpTripped = true;
          if (!alarms.some((a) => a.message.includes('Pompa Distribusi P-101 Trip'))) {
            alarms.push({
              id: `alarm-dtrip-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              timestampSec: elapsedSec,
              priority: 'kritis',
              controlPointId: 'pompa_distribusi',
              controlPointName: 'Pompa Distribusi',
              message: 'Pompa Distribusi P-101 Trip Overload! Tekanan jaringan kolaps.',
              status: 'aktif_belum_diakui',
              isLatched: true,
              latchedResetDone: false,
            });
          }
        } else {
          next.intakePump1Running = false;
          next.intakePumpTripped = true;
          if (!alarms.some((a) => a.message.includes('Pompa Intake 1 Trip'))) {
            alarms.push({
              id: `alarm-itrip-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              timestampSec: elapsedSec,
              priority: 'kritis',
              controlPointId: 'intake',
              controlPointName: 'Intake & Pompa Air Baku',
              message: 'Pompa Intake 1 Trip Overheat! Pasokan air baku terhenti.',
              status: 'aktif_belum_diakui',
              isLatched: true,
              latchedResetDone: false,
            });
          }
        }
      }

      if (dist.type === 'klor_salah') {
        next.chlorineDoseSetpoint = 0.6;
        if (!alarms.some((a) => a.message.includes('Sisa Klor Bebas Rendah'))) {
          alarms.push({
            id: `alarm-cl-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            timestampSec: elapsedSec,
            priority: 'kritis',
            controlPointId: 'desinfeksi',
            controlPointName: 'Desinfeksi (Klorinasi)',
            message: 'Sisa Klor Bebas Terlalu Rendah (<0.20 mg/L)! Bahaya mikrobiologis.',
            status: 'aktif_belum_diakui',
          });
        }
      }

      if (dist.type === 'pipa_bocor') {
        next.pipeLeakActive = true;
        if (!alarms.some((a) => a.message.includes('Pipa Distribusi Pecah'))) {
          alarms.push({
            id: `alarm-leak-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            timestampSec: elapsedSec,
            priority: 'tinggi',
            controlPointId: 'valve_prv',
            controlPointName: 'Valve Zona & PRV',
            message: 'Pipa Distribusi Pecah di Zona 1! Debit melonjak & tekanan drop.',
            status: 'aktif_belum_diakui',
          });
        }
      }

      if (dist.type === 'tekanan_drop') {
        next.distDischargePressure = 2.4;
        if (!alarms.some((a) => a.message.includes('Tekanan Zona Di Bawah Batas'))) {
          alarms.push({
            id: `alarm-pdrop-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString(),
            timestampSec: elapsedSec,
            priority: 'tinggi',
            controlPointId: 'titik_pantau_jaringan',
            controlPointName: 'Titik Pantau Jaringan',
            message: 'Tekanan Zona Di Bawah Batas Layanan (<1.8 bar)! Pengaduan pelanggan.',
            status: 'aktif_belum_diakui',
          });
        }
      }
    }
  });

  // 2. Continuous Physics & Process Mass Balance calculations
  // Intake Flow
  const intakePumpsActive = (next.intakePump1Running ? 1 : 0) + (next.intakePump2Running ? 1 : 0);
  next.rawWaterFlow = intakePumpsActive * 105;

  // Coagulation Chemistry Response
  // Required PAC = rawWaterTurbidity * 0.3 + 18
  const targetPac = Math.max(25, next.rawWaterTurbidity * 0.28 + 10);
  const pacRatio = next.coagulantActualDose / targetPac;

  if (next.flashMixerRunning) {
    if (pacRatio >= 0.85 && pacRatio <= 1.25) {
      next.flocQualityScore = Math.min(95, next.flocQualityScore + 1);
    } else {
      next.flocQualityScore = Math.max(30, next.flocQualityScore - 2);
    }
  } else {
    next.flocQualityScore = Math.max(15, next.flocQualityScore - 3);
  }

  // Sedimentation settling
  if (next.flocQualityScore >= 70 && next.flocculatorMixerRunning) {
    next.settledWaterTurbidity = Math.max(1.2, next.settledWaterTurbidity * 0.95 + 1.2 * 0.05);
  } else {
    next.settledWaterTurbidity = Math.min(18.0, next.settledWaterTurbidity + 0.3);
  }

  // Filtration performance
  if (next.filter1Backwashing) {
    next.filter1Headloss = Math.max(0.4, next.filter1Headloss - 0.2);
  } else {
    next.filter1Headloss = Math.min(3.0, next.filter1Headloss + 0.002);
  }

  if (next.filter2Backwashing) {
    next.filter2Headloss = Math.max(0.4, next.filter2Headloss - 0.2);
  } else {
    next.filter2Headloss = Math.min(3.0, next.filter2Headloss + 0.002);
  }

  // Filtered water turbidity
  const filterClogged = next.filter1Headloss > 2.2 || next.filter2Headloss > 2.2;
  if (next.settledWaterTurbidity < 5.0 && !filterClogged) {
    next.filteredWaterTurbidity = Math.max(0.6, next.filteredWaterTurbidity * 0.92 + 0.8 * 0.08);
  } else {
    next.filteredWaterTurbidity = Math.min(8.0, next.filteredWaterTurbidity + 0.15);
  }

  // Disinfection residual (Permenkes 0.2 - 0.5 mg/L)
  // chlorine residual = (dosingSetpoint - 1.2) * 0.7 + 0.1
  const calculatedResidual = Math.max(0.05, (next.chlorineDoseSetpoint - 1.0) * 0.5 + 0.1);
  next.freeResidualChlorine = Math.max(0.05, Math.min(1.2, next.freeResidualChlorine * 0.9 + calculatedResidual * 0.1));

  // Reservoir Level Balance
  const inflowRate = (next.intakePump1Running || next.intakePump2Running) && next.reservoirInletOpen ? 180 : 0;
  const distPumpsActive = (next.distPump1Running ? 1 : 0) + (next.distPump2Running ? 1 : 0);
  const outflowRate = next.reservoirOutletOpen ? distPumpsActive * 90 : 0;
  const netFlow = inflowRate - outflowRate;

  next.reservoirLevelMeters = Math.max(0.5, Math.min(5.0, next.reservoirLevelMeters + netFlow * 0.00015));
  next.reservoirLevelPercent = Math.round((next.reservoirLevelMeters / 5.0) * 100);

  // Distribution Hydraulics
  if (distPumpsActive === 0) {
    next.distDischargePressure = 0.5;
    next.distTotalFlow = 0;
  } else if (distPumpsActive === 1) {
    next.distDischargePressure = 4.1;
    next.distTotalFlow = 160;
  } else {
    next.distDischargePressure = 4.5;
    next.distTotalFlow = 230;
  }

  // Zone pressures & leak physics
  let leakFlow = 0;
  if (next.pipeLeakActive && next.valveIsolasiBocorOpen) {
    leakFlow = 70; // 70 m3/h lost in leak!
    next.zone1Pressure = Math.max(0.9, next.prvSetpointBar - 1.3);
    next.zone2Pressure = Math.max(1.0, next.prvSetpointBar - 0.9);
  } else {
    // Isolated or normal
    next.zone1Pressure = next.valveZone1Open ? Math.max(1.5, next.prvSetpointBar - 0.1) : 0;
    next.zone2Pressure = next.valveZone2Open ? Math.max(1.4, next.prvSetpointBar - 0.3) : 0;
  }

  next.zone1Flow = (next.valveZone1Open ? 100 : 0) + (next.pipeLeakActive && next.valveIsolasiBocorOpen ? leakFlow : 0);
  next.zone2Flow = next.valveZone2Open ? 70 : 0;
  next.leakFlowSurge = leakFlow;
  next.zoneChlorineEnd = Math.max(0.08, next.freeResidualChlorine - 0.09);

  // 3. Automated Alarm Auto-Clear with 10s stability deadband (PRD Section 10)
  let nextTurbidityCount = turbidityStableCount;
  let nextChlorineCount = chlorineStableCount;
  let nextPressureCount = pressureStableCount;

  // Turbidity auto-clear (threshold < 2.7 NTU for 10 seconds)
  if (next.filteredWaterTurbidity <= 2.7) {
    nextTurbidityCount += 1;
  } else {
    nextTurbidityCount = 0;
  }

  if (nextTurbidityCount >= 10) {
    alarms = alarms.map((a) => {
      if (a.controlPointId === 'koagulasi' && a.status !== 'clear') {
        return {
          ...a,
          status: 'clear',
          clearMethod: 'auto',
          clearNote: 'Pulih otomatis: kekeruhan stabil normal selama 10 detik',
        };
      }
      return a;
    });
  }

  // Chlorine auto-clear (0.22 - 0.48 mg/L for 10 seconds)
  if (next.freeResidualChlorine >= 0.22 && next.freeResidualChlorine <= 0.48) {
    nextChlorineCount += 1;
  } else {
    nextChlorineCount = 0;
  }

  if (nextChlorineCount >= 10) {
    alarms = alarms.map((a) => {
      if (a.controlPointId === 'desinfeksi' && a.status !== 'clear') {
        return {
          ...a,
          status: 'clear',
          clearMethod: 'auto',
          clearNote: 'Pulih otomatis: sisa klorin berada di rentang Permenkes 10 detik',
        };
      }
      return a;
    });
  }

  // Leak / Zone pressure auto-clear (after isolation valve closed and pressure > 2.0 bar for 10s)
  if (!next.valveIsolasiBocorOpen && next.zone1Pressure >= 2.0) {
    nextPressureCount += 1;
  } else {
    nextPressureCount = 0;
  }

  if (nextPressureCount >= 10) {
    alarms = alarms.map((a) => {
      if (a.controlPointId === 'valve_prv' && a.status !== 'clear') {
        return {
          ...a,
          status: 'clear',
          clearMethod: 'auto',
          clearNote: 'Pulih otomatis: katup isolasi tertutup dan tekanan pulih',
        };
      }
      return a;
    });
  }

  // Latched Pump Trip Alarm state check
  // If pump is no longer tripped (reset was done), allow status to transition to 'pulih_belum_clear'
  alarms = alarms.map((a) => {
    if (a.isLatched && a.status !== 'clear') {
      if (a.controlPointId === 'intake' && !next.intakePumpTripped) {
        return { ...a, status: 'pulih_belum_clear', latchedResetDone: true };
      }
      if (a.controlPointId === 'pompa_distribusi' && !next.distPumpTripped) {
        return { ...a, status: 'pulih_belum_clear', latchedResetDone: true };
      }
    }
    return a;
  });

  const isParameterStable =
    next.filteredWaterTurbidity < 3.0 &&
    next.freeResidualChlorine >= 0.2 &&
    next.freeResidualChlorine <= 0.5 &&
    next.zone1Pressure >= 2.0;

  return {
    nextScada: next,
    alarms,
    nextTurbidityStableCount: nextTurbidityCount,
    nextChlorineStableCount: nextChlorineCount,
    nextPressureStableCount: nextPressureCount,
    isParameterStable,
  };
}

export function evaluateMissionScore(
  mission: Mission,
  durationSec: number,
  actionLogs: ActionLog[],
  alarmLogs: AlarmItem[],
  stabilityHistoryCount: { stable: number; total: number },
  hintsUsedCount: number,
  userId: string,
  tenantId: string,
  track: LearningTrack,
  trendHistory: Array<any>
): MissionResult {
  // 1. Ketepatan tindakan (40%)
  const correctActions = actionLogs.filter((a) => a.isCorrect !== false).length;
  const totalActions = Math.max(1, actionLogs.length);
  const scoreTindakan = Math.min(40, Math.round((correctActions / totalActions) * 40));

  // 2. Waktu respons (25%)
  // Based on duration limit or target 120s
  const targetTime = mission.durationLimitSec || 120;
  let scoreWaktuRespons = 25;
  if (durationSec > targetTime) {
    const overSec = durationSec - targetTime;
    scoreWaktuRespons = Math.max(10, Math.round(25 - (overSec / targetTime) * 15));
  } else {
    scoreWaktuRespons = 25;
  }

  // 3. Stabilitas parameter (20%)
  const stabilityRatio = stabilityHistoryCount.total > 0 ? stabilityHistoryCount.stable / stabilityHistoryCount.total : 0.85;
  const scoreStabilitas = Math.min(20, Math.round(stabilityRatio * 20));

  // 4. Penanganan alarm (15%)
  const allAlarms = alarmLogs;
  const handledAlarms = allAlarms.filter((a) => a.status === 'clear' || a.status === 'pulih_belum_clear').length;
  const totalAlarms = Math.max(1, allAlarms.length);
  const scoreAlarm = allAlarms.length === 0 ? 15 : Math.min(15, Math.round((handledAlarms / totalAlarms) * 15));

  // Deductions: -5 per hint used, -15 per unsafe action
  const unsafeDeduction = actionLogs.filter((a) => a.isCorrect === false && a.action.includes('Tidak Aman')).length * 15;
  const hintDeduction = hintsUsedCount * 5;
  const scoreDeductions = unsafeDeduction + hintDeduction;

  const rawTotal = scoreTindakan + scoreWaktuRespons + scoreStabilitas + scoreAlarm - scoreDeductions;
  const totalScore = Math.max(0, Math.min(100, rawTotal));

  // Stars: <70 = 0, 70-84 = 1, 85-94 = 2, >=95 = 3
  let stars = 0;
  if (totalScore >= 95) stars = 3;
  else if (totalScore >= 85) stars = 2;
  else if (totalScore >= (mission.passScore || 70)) stars = 1;

  // Passing criteria (Graduation exams require >= 80)
  const isPassed = totalScore >= mission.passScore;

  // XP = totalScore * difficulty multiplier
  const multiplier =
    mission.level === 1 ? 1.0 :
    mission.level === 2 ? 1.5 :
    mission.level === 3 ? 2.0 :
    mission.level === 4 ? 2.5 : 3.0;

  const xpEarned = isPassed ? Math.round(totalScore * multiplier) : Math.round(totalScore * 0.4);

  return {
    id: `result-${Date.now()}`,
    userId,
    tenantId,
    missionCode: mission.code,
    track,
    completedAt: new Date().toISOString(),
    durationSec,
    scoreTindakan,
    scoreWaktuRespons,
    scoreStabilitas,
    scoreAlarm,
    scoreDeductions,
    totalScore,
    stars,
    xpEarned,
    hintsUsedCount,
    isPassed,
    actionLogs,
    alarmLogs,
    trendHistory,
  };
}
