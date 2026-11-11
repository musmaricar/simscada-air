/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 
  | 'peserta'
  | 'instruktur'
  | 'admin_lembaga'
  | 'pimpinan_lembaga'
  | 'superadmin';

export type LearningTrack = 'ipa' | 'distribusi' | 'terpadu';

export type MissionLevel = 1 | 2 | 3 | 4 | 5; // 1: Pengenalan, 2: Normal, 3: Gangguan Tunggal, 4: Gangguan Berantai, 5: Misi Kelulusan

export type AlarmPriority = 'kritis' | 'tinggi' | 'sedang' | 'info';

export type AlarmStatus = 'aktif_belum_diakui' | 'aktif_diakui' | 'pulih_belum_clear' | 'clear';

export type OperatorLevelName = 
  | 'Operator Magang'
  | 'Operator Muda'
  | 'Operator Madya'
  | 'Operator Utama'
  | 'Operator Ahli';

export interface Tenant {
  id: string;
  code: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  address: string;
  contact: string;
  type: 'diklat_pdam' | 'balai_pelatihan' | 'swasta';
  license: {
    packageTracks: LearningTrack[];
    seatQuota: number;
    seatsUsed: number;
    startDate: string;
    endDate: string;
    isActive: boolean;
  };
  signers: {
    leaderName: string;
    leaderTitle: string;
    leaderSignatureUrl?: string;
    instructorName: string;
    instructorTitle: string;
  };
  config: {
    passThresholdScore: number;
    graduationThresholdScore: number;
    leaderboardEnabled: boolean;
    localSopNotes?: Record<string, string>;
  };
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  tenantId: string;
  groupId?: string;
  track?: LearningTrack;
  createdAt: string;
  lastLoginAt: string;
  avatarUrl?: string;
}

export interface TrainingGroup {
  id: string;
  tenantId: string;
  name: string;
  instructorId: string;
  track: LearningTrack;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ControlPointDef {
  id: string;
  name: string;
  category: 'ipa' | 'distribusi';
  monitoredParams: string[];
  controllableParams: string[];
  normalRanges: Record<string, { min: number; max: number; unit: string; desc: string }>;
  narrative: {
    apaIni: string;
    yangDipantau: string;
    yangBisaDikendalikan: string;
    dampakKeHilir: string;
    gangguanUmumDanSop: string;
    pelajariLebihLanjut: string;
  };
}

export interface MissionDisturbance {
  id: string;
  name: string;
  triggerTimeSec: number;
  type: 'kekeruhan_lonjakan' | 'pompa_trip' | 'klor_salah' | 'pipa_bocor' | 'tekanan_drop' | 'hulu_hilir';
  description: string;
  expectedActions: string[];
}

export interface Mission {
  code: string; // e.g. IPA-01, DST-05, TRP-01
  name: string;
  level: MissionLevel;
  levelName: string;
  track: LearningTrack[];
  trainingFocus: string;
  durationLimitSec?: number;
  passScore: number;
  briefing: {
    situation: string;
    objective: string;
    mentorQuote: string;
  };
  debriefing: {
    success: string;
    failure: string;
  };
  quiz: QuizQuestion[];
  disturbances: MissionDisturbance[];
  hints: string[];
}

export interface AlarmItem {
  id: string;
  timestamp: string;
  timestampSec: number;
  priority: AlarmPriority;
  controlPointId: string;
  controlPointName: string;
  message: string;
  status: AlarmStatus;
  isLatched?: boolean; // For pump trip: needs manual reset first
  latchedResetDone?: boolean;
  clearMethod?: 'auto' | 'manual';
  clearNote?: string;
  recoveredAtSec?: number;
}

export interface ActionLog {
  timestampSec: number;
  controlPointId: string;
  action: string;
  value: string | number;
  isCorrect?: boolean;
  feedback?: string;
}

export interface MissionResult {
  id: string;
  userId: string;
  tenantId: string;
  missionCode: string;
  track: LearningTrack;
  completedAt: string;
  durationSec: number;
  scoreTindakan: number;     // 40%
  scoreWaktuRespons: number;  // 25%
  scoreStabilitas: number;    // 20%
  scoreAlarm: number;         // 15%
  scoreDeductions: number;    // Hints (-5) or Unsafe actions (-15)
  totalScore: number;         // 0 - 100
  stars: number;              // 0, 1, 2, 3
  xpEarned: number;
  hintsUsedCount: number;
  isPassed: boolean;
  actionLogs: ActionLog[];
  alarmLogs: AlarmItem[];
  trendHistory: Array<{
    timeSec: number;
    turbidity: number;
    settledTurbidity: number;
    freeChlorine: number;
    reservoirLevel: number;
    zonePressure: number;
    zoneFlow: number;
  }>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requirement: string;
}

export interface UserBadge {
  badgeId: string;
  awardedAt: string;
}

export interface Certificate {
  id: string;
  certificateNumber: string; // e.g. SSA/BDAN/2026/001
  userId: string;
  userName: string;
  tenantId: string;
  tenantName: string;
  track: LearningTrack;
  trackName: string;
  predicate: 'Lulus' | 'Lulus dengan Baik' | 'Lulus dengan Pujian';
  averageScore: number;
  starsCount: number;
  operatorLevel: OperatorLevelName;
  issueDate: string;
  status: 'valid' | 'revoked';
  revokedReason?: string;
  revokedAt?: string;
  instructorApproved: boolean;
  leaderSigned: boolean;
  qrVerificationUrl: string;
}

export interface PrePostTestResult {
  userId: string;
  tenantId: string;
  type: 'pre' | 'post';
  score: number;
  completedAt: string;
}

export interface ScadaState {
  // Intake
  intakePump1Running: boolean;
  intakePump2Running: boolean;
  intakePumpDuty: 1 | 2;
  intakePumpTripped: boolean;
  rawWaterFlow: number; // m3/h (Target: 180 - 220)
  rawWaterTurbidity: number; // NTU (Normal: 15 - 35; Spikes to 180)
  
  // Coagulation & pH
  coagulantDoseSetpoint: number; // mg/L (Recommended: 20 - 45 based on turbidity)
  coagulantActualDose: number;
  waterPh: number; // 6.5 - 8.5
  flashMixerRunning: boolean;
  
  // Flocculation
  flocculatorMixerRunning: boolean;
  flocculatorRpm: number;
  flocQualityScore: number; // 0 - 100
  
  // Sedimentation (Clarifier)
  clarifierBlowdownOpen: boolean;
  sludgeLevelPercent: number; // 0 - 100
  settledWaterTurbidity: number; // NTU (Normal < 5)
  
  // Filtration (Dual Sand Filters)
  filter1Active: boolean;
  filter2Active: boolean;
  filter1Headloss: number; // mH2O (Normal < 1.8; Over 2.2 is clogged)
  filter2Headloss: number;
  filter1Backwashing: boolean;
  filter2Backwashing: boolean;
  filteredWaterTurbidity: number; // NTU (Permenkes target: < 3.0 NTU)
  
  // Disinfection
  chlorineDoseSetpoint: number; // mg/L (Target: 1.2 - 2.0 mg/L)
  freeResidualChlorine: number; // mg/L (Permenkes: 0.2 - 0.5 mg/L)
  
  // Reservoir
  reservoirInletOpen: boolean;
  reservoirOutletOpen: boolean;
  reservoirLevelMeters: number; // 1.0 - 5.0 m
  reservoirLevelPercent: number; // 0 - 100%
  
  // Distribution Pumps
  distPump1Running: boolean;
  distPump2Running: boolean;
  distPumpDuty: 1 | 2;
  distPumpTripped: boolean;
  distDischargePressure: number; // bar (Normal: 3.5 - 4.5 bar)
  distTotalFlow: number; // m3/h
  
  // Zone & Hydraulics
  valveZone1Open: boolean;
  valveZone2Open: boolean;
  valveIsolasiBocorOpen: boolean;
  prvSetpointBar: number; // bar (Target: 2.2 - 2.8 bar)
  zone1Pressure: number; // bar (Normal: 2.0 - 2.8 bar)
  zone2Pressure: number; // bar (Normal: 1.8 - 2.5 bar)
  zone1Flow: number; // m3/h
  zone2Flow: number; // m3/h
  pipeLeakActive: boolean;
  leakFlowSurge: number; // m3/h
  zoneChlorineEnd: number; // mg/L (Target: 0.15 - 0.35 mg/L)
}
