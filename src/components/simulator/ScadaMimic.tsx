/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlarmItem, LearningTrack, ScadaState } from '../../types';
import { Info, AlertTriangle } from 'lucide-react';

interface ScadaMimicProps {
  scada: ScadaState;
  track: LearningTrack;
  selectedUnit: string;
  onSelectUnit: (unitId: string) => void;
  onOpenNarrative: (unitId: string) => void;
  activeAlarms: AlarmItem[];
}

export const ScadaMimic: React.FC<ScadaMimicProps> = ({
  scada,
  track,
  selectedUnit,
  onSelectUnit,
  onOpenNarrative,
  activeAlarms,
}) => {
  const isIpaVisible = track === 'ipa' || track === 'terpadu';
  const isDistribusiVisible = track === 'distribusi' || track === 'terpadu';

  // Helper to check if a control point has active alarm
  const hasAlarm = (cpId: string) => activeAlarms.some((a) => a.controlPointId === cpId && a.status !== 'clear');
  const getAlarmPriority = (cpId: string) => {
    const alarm = activeAlarms.find((a) => a.controlPointId === cpId && a.status !== 'clear');
    return alarm ? alarm.priority : null;
  };

  return (
    <div className="relative w-full h-[520px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner select-none font-mono">
      {/* Background Blueprint Grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main Interactive HMI SVG Canvas */}
      <svg
        viewBox="0 0 1180 520"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="waterFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="reservoirWaterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="sandFilterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78716c" />
            <stop offset="50%" stopColor="#d6d3d1" />
            <stop offset="100%" stopColor="#a8a29e" />
          </linearGradient>

          <linearGradient id="sludgeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#854d0e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ======================================================== */}
        {/* SECTION 1: IPA (WATER TREATMENT PLANT)                     */}
        {/* ======================================================== */}
        <g id="ipa-section" opacity={isIpaVisible ? 1 : 0.35}>
          {/* Title Tag */}
            <text x="25" y="28" fill="#94a3b8" fontSize="12" fontWeight="bold" letterSpacing="1">
              INSTALASI PENGOLAHAN AIR (IPA)
            </text>

            {/* UNIT 1: INTAKE */}
            <g
              id="unit-intake"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('intake')}
            >
              {/* Hotspot bounding box */}
              <rect
                x="20"
                y="50"
                width="125"
                height="190"
                rx="8"
                fill={selectedUnit === 'intake' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'intake' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'intake' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'intake' ? '2' : '1'}
              />

              {/* River Water Sump */}
              <rect x="28" y="150" width="40" height="75" fill="#0c4a6e" rx="4" />
              <path d="M 28 160 Q 38 156 48 160 T 68 160 L 68 225 L 28 225 Z" fill="#0284c7" opacity="0.6" />
              <text x="32" y="218" fill="#bae6fd" fontSize="9" fontWeight="bold">SUNGAI</text>

              {/* Pump 1 */}
              <circle
                cx="98"
                cy="140"
                r="16"
                fill={scada.intakePumpTripped ? '#e11d48' : scada.intakePump1Running ? '#059669' : '#475569'}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="92" y="144" fill="#ffffff" fontSize="10" fontWeight="bold">P1</text>

              {/* Pump 2 */}
              <circle
                cx="98"
                cy="185"
                r="16"
                fill={scada.intakePump2Running ? '#059669' : '#475569'}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="92" y="189" fill="#ffffff" fontSize="10" fontWeight="bold">P2</text>

              {/* Pipe from River to Pumps */}
              <path d="M 48 180 L 82 180" stroke="#64748b" strokeWidth="5" fill="none" />
              <path d="M 65 180 L 65 140 L 82 140" stroke="#64748b" strokeWidth="5" fill="none" />

              {/* Unit Title */}
              <text x="30" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold">INTAKE AIR BAKU</text>
              <text x="30" y="86" fill="#38bdf8" fontSize="10">Q: {scada.rawWaterFlow.toFixed(0)} m³/h</text>
              <text x="30" y="100" fill={scada.rawWaterTurbidity > 50 ? '#f43f5e' : '#e2e8f0'} fontSize="10" fontWeight={scada.rawWaterTurbidity > 50 ? 'bold' : 'normal'}>
                NTU: {scada.rawWaterTurbidity.toFixed(1)}
              </text>
              <text x="30" y="114" fill={scada.intakePumpTripped ? '#f43f5e' : '#10b981'} fontSize="9" fontWeight="bold">
                {scada.intakePumpTripped ? 'P1 TRIP!' : scada.intakePump1Running ? 'P1 RUN (DUTY)' : 'STANDBY'}
              </text>
            </g>

            {/* Info Button Intake */}
            <circle
              cx="135"
              cy="62"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('intake'); }}
            />
            <text
              x="133"
              y="66"
              fill="#ffffff"
              fontSize="11"
              fontWeight="bold"
              className="pointer-events-none"
            >
              i
            </text>

            {/* Alarm Icon Intake */}
            {hasAlarm('intake') && (
              <g className="animate-bounce">
                <circle cx="118" cy="62" r="9" fill="#ef4444" />
                <text x="115" y="66" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Pipe Intake -> Coagulation */}
            <path
              d="M 114 140 L 175 140"
              stroke={scada.intakePump1Running || scada.intakePump2Running ? '#38bdf8' : '#475569'}
              strokeWidth="6"
              fill="none"
              className={scada.intakePump1Running || scada.intakePump2Running ? 'animate-pipe-flow' : ''}
            />

            {/* UNIT 2: KOAGULASI & PENGADUK CEPAT */}
            <g
              id="unit-koagulasi"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('koagulasi')}
            >
              <rect
                x="175"
                y="50"
                width="110"
                height="190"
                rx="8"
                fill={selectedUnit === 'koagulasi' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'koagulasi' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'koagulasi' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'koagulasi' ? '2' : '1'}
              />

              {/* Mixing Tank Graphic */}
              <rect x="187" y="125" width="85" height="100" fill="#0c4a6e" rx="4" />
              {/* Dosing Chemical Pipe */}
              <path d="M 230 85 L 230 135" stroke="#f59e0b" strokeWidth="4" fill="none" />
              <polygon points="226,135 234,135 230,142" fill="#f59e0b" />
              
              {/* Rapid Mixer Blade */}
              <rect x="228" y="140" width="4" height="40" fill="#94a3b8" />
              <rect
                x="215"
                y="170"
                width="30"
                height="6"
                fill="#f8fafc"
                className={scada.flashMixerRunning ? 'animate-pulse' : ''}
              />

              <text x="185" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold">KOAGULASI</text>
              <text x="185" y="85" fill="#f59e0b" fontSize="10">PAC: {scada.coagulantActualDose.toFixed(1)} mg/L</text>
              <text x="185" y="98" fill="#e2e8f0" fontSize="10">pH: {scada.waterPh.toFixed(2)}</text>
              <text x="185" y="112" fill={scada.flashMixerRunning ? '#10b981' : '#f43f5e'} fontSize="9" fontWeight="bold">
                {scada.flashMixerRunning ? 'MIXER CEPAT ON' : 'OFF'}
              </text>
            </g>

            {/* Info Button Koagulasi */}
            <circle
              cx="273"
              cy="62"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('koagulasi'); }}
            />
            <text x="271" y="66" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Koagulasi */}
            {hasAlarm('koagulasi') && (
              <g className="animate-bounce">
                <circle cx="255" cy="62" r="9" fill="#ef4444" />
                <text x="252" y="66" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Pipe Koagulasi -> Flokulasi */}
            <path
              d="M 272 170 L 315 170"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className="animate-pipe-flow"
            />

            {/* UNIT 3: FLOKULASI */}
            <g
              id="unit-flokulasi"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('flokulasi')}
            >
              <rect
                x="315"
                y="50"
                width="110"
                height="190"
                rx="8"
                fill={selectedUnit === 'flokulasi' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'flokulasi' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'flokulasi' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'flokulasi' ? '2' : '1'}
              />

              {/* Baffled Tank & Paddles */}
              <rect x="325" y="125" width="90" height="100" fill="#0c4a6e" rx="4" />
              <line x1="355" y1="125" x2="355" y2="200" stroke="#334155" strokeWidth="2" />
              <line x1="385" y1="150" x2="385" y2="225" stroke="#334155" strokeWidth="2" />

              {/* Slow Agitator */}
              <circle cx="340" cy="165" r="8" fill="#38bdf8" opacity="0.4" className={scada.flocculatorMixerRunning ? 'animate-spin' : ''} />
              <circle cx="370" cy="180" r="8" fill="#38bdf8" opacity="0.4" className={scada.flocculatorMixerRunning ? 'animate-spin' : ''} />
              <circle cx="400" cy="165" r="8" fill="#38bdf8" opacity="0.4" className={scada.flocculatorMixerRunning ? 'animate-spin' : ''} />

              <text x="325" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold">FLOKULASI</text>
              <text x="325" y="85" fill="#38bdf8" fontSize="10">RPM: {scada.flocculatorRpm.toFixed(0)}</text>
              <text x="325" y="98" fill="#a7f3d0" fontSize="10">Flok Index: {scada.flocQualityScore.toFixed(0)}%</text>
              <text x="325" y="112" fill={scada.flocculatorMixerRunning ? '#10b981' : '#f43f5e'} fontSize="9" fontWeight="bold">
                {scada.flocculatorMixerRunning ? 'PENGADUK ON' : 'OFF'}
              </text>
            </g>

            {/* Info Button Flokulasi */}
            <circle
              cx="413"
              cy="62"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('flokulasi'); }}
            />
            <text x="411" y="66" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Pipe Flokulasi -> Sedimentasi */}
            <path
              d="M 425 170 L 455 170"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className="animate-pipe-flow"
            />

            {/* UNIT 4: SEDIMENTASI (CLARIFIER) */}
            <g
              id="unit-sedimentasi"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('sedimentasi')}
            >
              <rect
                x="455"
                y="50"
                width="125"
                height="190"
                rx="8"
                fill={selectedUnit === 'sedimentasi' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'sedimentasi' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'sedimentasi' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'sedimentasi' ? '2' : '1'}
              />

              {/* Lamella Settler Graphic */}
              <polygon points="465,125 570,125 540,215 495,215" fill="#0c4a6e" />
              {/* Sludge at bottom */}
              <polygon
                points="490,200 545,200 540,215 495,215"
                fill="url(#sludgeGrad)"
              />
              {/* Lamella plate lines */}
              <line x1="480" y1="130" x2="495" y2="160" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <line x1="500" y1="130" x2="515" y2="160" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <line x1="520" y1="130" x2="535" y2="160" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
              <line x1="540" y1="130" x2="555" y2="160" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />

              {/* Blowdown Valve */}
              <circle cx="518" cy="225" r="7" fill={scada.clarifierBlowdownOpen ? '#10b981' : '#64748b'} />

              <text x="465" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold">SEDIMENTASI</text>
              <text x="465" y="85" fill="#38bdf8" fontSize="10">Kekeruhan: {scada.settledWaterTurbidity.toFixed(1)} NTU</text>
              <text x="465" y="98" fill="#fbbf24" fontSize="10">Sludge: {scada.sludgeLevelPercent.toFixed(0)}%</text>
              <text x="465" y="112" fill={scada.clarifierBlowdownOpen ? '#10b981' : '#94a3b8'} fontSize="9">
                Blowdown: {scada.clarifierBlowdownOpen ? 'OPEN' : 'CLOSED'}
              </text>
            </g>

            {/* Info Button Sedimentasi */}
            <circle
              cx="568"
              cy="62"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('sedimentasi'); }}
            />
            <text x="566" y="66" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Sedimentasi */}
            {hasAlarm('sedimentasi') && (
              <g className="animate-bounce">
                <circle cx="550" cy="62" r="9" fill="#ef4444" />
                <text x="547" y="66" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Pipe Sedimentasi -> Filtrasi */}
            <path
              d="M 570 140 L 610 140"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className="animate-pipe-flow"
            />

            {/* UNIT 5: FILTRASI (DUAL SAND FILTERS) */}
            <g
              id="unit-filtrasi"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('filtrasi')}
            >
              <rect
                x="610"
                y="50"
                width="140"
                height="190"
                rx="8"
                fill={selectedUnit === 'filtrasi' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'filtrasi' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'filtrasi' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'filtrasi' ? '2' : '1'}
              />

              {/* Filter 1 graphic */}
              <rect x="620" y="130" width="55" height="90" fill="#0f172a" rx="3" stroke="#475569" />
              <rect x="622" y="160" width="51" height="40" fill="url(#sandFilterGrad)" />
              <text x="626" y="145" fill="#e2e8f0" fontSize="9" fontWeight="bold">F-1</text>
              <text x="626" y="156" fill={scada.filter1Headloss > 2.0 ? '#f43f5e' : '#38bdf8'} fontSize="8">
                HL: {scada.filter1Headloss.toFixed(2)}m
              </text>
              {scada.filter1Backwashing && (
                <rect x="620" y="130" width="55" height="90" fill="#38bdf8" opacity="0.3" className="animate-pulse" />
              )}

              {/* Filter 2 graphic */}
              <rect x="685" y="130" width="55" height="90" fill="#0f172a" rx="3" stroke="#475569" />
              <rect x="687" y="160" width="51" height="40" fill="url(#sandFilterGrad)" />
              <text x="691" y="145" fill="#e2e8f0" fontSize="9" fontWeight="bold">F-2</text>
              <text x="691" y="156" fill={scada.filter2Headloss > 2.0 ? '#f43f5e' : '#38bdf8'} fontSize="8">
                HL: {scada.filter2Headloss.toFixed(2)}m
              </text>
              {scada.filter2Backwashing && (
                <rect x="685" y="130" width="55" height="90" fill="#38bdf8" opacity="0.3" className="animate-pulse" />
              )}

              <text x="620" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold">FILTRASI PASIR CEPAT</text>
              <text x="620" y="85" fill={scada.filteredWaterTurbidity >= 3.0 ? '#f43f5e' : '#10b981'} fontSize="10" fontWeight="bold">
                Air Bersih: {scada.filteredWaterTurbidity.toFixed(2)} NTU
              </text>
              <text x="620" y="98" fill="#94a3b8" fontSize="9">
                Permenkes: &lt; 3.0 NTU
              </text>
              <text x="620" y="112" fill={scada.filter1Backwashing || scada.filter2Backwashing ? '#38bdf8' : '#e2e8f0'} fontSize="9">
                {scada.filter1Backwashing ? 'BW: FILTER 1 CUCI...' : scada.filter2Backwashing ? 'BW: FILTER 2 CUCI...' : 'KEDUA FILTER RUN'}
              </text>
            </g>

            {/* Info Button Filtrasi */}
            <circle
              cx="738"
              cy="62"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('filtrasi'); }}
            />
            <text x="736" y="66" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Filtrasi */}
            {hasAlarm('filtrasi') && (
              <g className="animate-bounce">
                <circle cx="720" cy="62" r="9" fill="#ef4444" />
                <text x="717" y="66" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Pipe Filtrasi -> Desinfeksi */}
            <path
              d="M 740 180 L 780 180"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className="animate-pipe-flow"
            />

            {/* UNIT 6: DESINFEKSI (KLORINASI) */}
            <g
              id="unit-desinfeksi"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('desinfeksi')}
            >
              <rect
                x="780"
                y="50"
                width="120"
                height="190"
                rx="8"
                fill={selectedUnit === 'desinfeksi' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'desinfeksi' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'desinfeksi' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'desinfeksi' ? '2' : '1'}
              />

              {/* Chemical injector port */}
              <circle cx="840" cy="180" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <path d="M 840 120 L 840 166" stroke="#22d3ee" strokeWidth="4" />
              <polygon points="836,166 844,166 840,172" fill="#22d3ee" />

              <text x="790" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold">DESINFEKSI (KLOR)</text>
              <text x="790" y="85" fill="#22d3ee" fontSize="10">Dosis: {scada.chlorineDoseSetpoint.toFixed(2)} mg/L</text>
              <text x="790" y="100" fill={scada.freeResidualChlorine < 0.2 || scada.freeResidualChlorine > 0.5 ? '#f43f5e' : '#10b981'} fontSize="10" fontWeight="bold">
                Sisa Klor: {scada.freeResidualChlorine.toFixed(2)} mg/L
              </text>
              <text x="790" y="114" fill="#94a3b8" fontSize="9">
                Target: 0.2 - 0.5 mg/L
              </text>
            </g>

            {/* Info Button Desinfeksi */}
            <circle
              cx="888"
              cy="62"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('desinfeksi'); }}
            />
            <text x="886" y="66" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Desinfeksi */}
            {hasAlarm('desinfeksi') && (
              <g className="animate-bounce">
                <circle cx="870" cy="62" r="9" fill="#ef4444" />
                <text x="867" y="66" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Pipe to Reservoir */}
            <path
              d="M 900 180 L 935 180 L 935 300 L 960 300"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className="animate-pipe-flow"
            />
          </g>

        {/* ======================================================== */}
        {/* BRIDGE/COMMON: RESERVOIR (TANGKI AIR BERSIH)              */}
        {/* ======================================================== */}
        <g
          id="unit-reservoir"
          className="cursor-pointer transition-transform"
          onClick={() => onSelectUnit('reservoir')}
        >
          <rect
            x="960"
            y="250"
            width="190"
            height="240"
            rx="10"
            fill={selectedUnit === 'reservoir' ? '#0369a1' : '#1e293b'}
            fillOpacity={selectedUnit === 'reservoir' ? '0.35' : '0.8'}
            stroke={selectedUnit === 'reservoir' ? '#38bdf8' : '#334155'}
            strokeWidth={selectedUnit === 'reservoir' ? '2' : '1'}
          />

          {/* Reservoir Tank Graphical Outline */}
          <rect x="975" y="320" width="160" height="150" fill="#0f172a" rx="6" stroke="#475569" strokeWidth="2" />
          
          {/* Dynamic Water Level in Reservoir */}
          {(() => {
            const maxH = 135;
            const waterHeight = Math.max(10, Math.min(maxH, (scada.reservoirLevelPercent / 100) * maxH));
            const waterY = 465 - waterHeight;
            return (
              <rect
                x="979"
                y={waterY}
                width="152"
                height={waterHeight}
                fill="url(#reservoirWaterGrad)"
                rx="4"
              />
            );
          })()}

          {/* Level Gauge lines */}
          <line x1="975" y1="365" x2="985" y2="365" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="990" y="368" fill="#94a3b8" fontSize="8">75% (3.75m)</text>
          <line x1="975" y1="410" x2="985" y2="410" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="990" y="413" fill="#94a3b8" fontSize="8">50% (2.50m)</text>

          <text x="975" y="272" fill="#f8fafc" fontSize="12" fontWeight="bold">RESERVOIR AIR BERSIH</text>
          <text x="975" y="290" fill="#38bdf8" fontSize="11" fontWeight="bold">
            Level: {scada.reservoirLevelMeters.toFixed(2)} m ({scada.reservoirLevelPercent.toFixed(0)}%)
          </text>
          <text x="975" y="306" fill="#a7f3d0" fontSize="10">
            Sisa Klor: {scada.freeResidualChlorine.toFixed(2)} mg/L
          </text>
        </g>

        {/* Info Button Reservoir */}
        <circle
          cx="1135"
          cy="265"
          r="9"
          fill="#0284c7"
          className="cursor-pointer hover:fill-sky-400"
          onClick={(e) => { e.stopPropagation(); onOpenNarrative('reservoir'); }}
        />
        <text x="1133" y="269" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

        {/* Alarm Icon Reservoir */}
        {hasAlarm('reservoir') && (
          <g className="animate-bounce">
            <circle cx="1115" cy="265" r="9" fill="#ef4444" />
            <text x="1112" y="269" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
          </g>
        )}

        {/* ======================================================== */}
        {/* SECTION 2: JARINGAN DISTRIBUSI (DISTRIBUTION NETWORK)     */}
        {/* ======================================================== */}
        <g id="distribusi-section" opacity={isDistribusiVisible ? 1 : 0.35}>
          {/* Title Tag */}
            <text x="25" y="278" fill="#94a3b8" fontSize="12" fontWeight="bold" letterSpacing="1">
              JARINGAN PIPA DISTRIBUSI KOTA
            </text>

            {/* Suction Pipe from Reservoir to Distribution Pumps */}
            <path
              d="M 975 440 L 890 440"
              stroke="#0284c7"
              strokeWidth="6"
              fill="none"
              className={scada.distPump1Running || scada.distPump2Running ? 'animate-pipe-flow' : ''}
            />

            {/* UNIT 7: STASIUN POMPA DISTRIBUSI */}
            <g
              id="unit-pompa_distribusi"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('pompa_distribusi')}
            >
              <rect
                x="710"
                y="300"
                width="165"
                height="190"
                rx="8"
                fill={selectedUnit === 'pompa_distribusi' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'pompa_distribusi' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'pompa_distribusi' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'pompa_distribusi' ? '2' : '1'}
              />

              {/* Pump 101 */}
              <circle
                cx="780"
                cy="380"
                r="18"
                fill={scada.distPumpTripped ? '#e11d48' : scada.distPump1Running ? '#059669' : '#475569'}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="768" y="384" fill="#ffffff" fontSize="10" fontWeight="bold">P-101</text>

              {/* Pump 102 */}
              <circle
                cx="780"
                cy="435"
                r="18"
                fill={scada.distPump2Running ? '#059669' : '#475569'}
                stroke="#0f172a"
                strokeWidth="2"
              />
              <text x="768" y="439" fill="#ffffff" fontSize="10" fontWeight="bold">P-102</text>

              {/* Manifold pipes */}
              <path d="M 890 440 L 820 440 L 820 380 L 800 380" stroke="#64748b" strokeWidth="4" fill="none" />
              <path d="M 820 440 L 800 440" stroke="#64748b" strokeWidth="4" fill="none" />

              <text x="720" y="322" fill="#f8fafc" fontSize="11" fontWeight="bold">POMPA DISTRIBUSI</text>
              <text x="720" y="338" fill={scada.distDischargePressure < 3.0 ? '#f43f5e' : '#38bdf8'} fontSize="10" fontWeight="bold">
                Tekanan: {scada.distDischargePressure.toFixed(2)} bar
              </text>
              <text x="720" y="352" fill="#e2e8f0" fontSize="10">Debit: {scada.distTotalFlow.toFixed(0)} m³/h</text>
              <text x="720" y="366" fill={scada.distPumpTripped ? '#f43f5e' : '#10b981'} fontSize="9" fontWeight="bold">
                {scada.distPumpTripped ? 'P-101 TRIP!' : scada.distPump1Running ? 'P-101 RUN (DUTY)' : 'STANDBY'}
              </text>
            </g>

            {/* Info Button Pompa Distribusi */}
            <circle
              cx="860"
              cy="312"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('pompa_distribusi'); }}
            />
            <text x="858" y="316" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Pompa Distribusi */}
            {hasAlarm('pompa_distribusi') && (
              <g className="animate-bounce">
                <circle cx="842" cy="312" r="9" fill="#ef4444" />
                <text x="839" y="316" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Main Discharge Pipe from Pumps to Valve/PRV */}
            <path
              d="M 760 380 L 680 380"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className={scada.distPump1Running || scada.distPump2Running ? 'animate-pipe-flow' : ''}
            />

            {/* UNIT 8: VALVE & PRV */}
            <g
              id="unit-valve_prv"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('valve_prv')}
            >
              <rect
                x="475"
                y="300"
                width="190"
                height="190"
                rx="8"
                fill={selectedUnit === 'valve_prv' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'valve_prv' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'valve_prv' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'valve_prv' ? '2' : '1'}
              />

              {/* PRV Symbol */}
              <polygon points="560,370 580,380 560,390" fill="#f59e0b" />
              <polygon points="580,370 560,380 580,390" fill="#f59e0b" />
              <circle cx="570" cy="380" r="5" fill="#f8fafc" />

              {/* Pipe Split: Main to Zone 1 and Zone 2 */}
              <path d="M 680 380 L 590 380" stroke="#38bdf8" strokeWidth="5" fill="none" />
              <path d="M 550 380 L 490 380 L 490 360 L 450 360" stroke="#38bdf8" strokeWidth="5" fill="none" />
              <path d="M 490 380 L 490 430 L 450 430" stroke="#38bdf8" strokeWidth="5" fill="none" />

              {/* Isolation Valve for Leak */}
              <rect x="495" y="348" width="18" height="12" fill={scada.valveIsolasiBocorOpen ? '#10b981' : '#e11d48'} rx="2" />
              <text x="498" y="357" fill="#ffffff" fontSize="7" fontWeight="bold">ISO</text>

              <text x="485" y="322" fill="#f8fafc" fontSize="11" fontWeight="bold">VALVE ZONA & PRV</text>
              <text x="485" y="338" fill="#f59e0b" fontSize="10">PRV Setpoint: {scada.prvSetpointBar.toFixed(2)} bar</text>
              <text x="485" y="415" fill={scada.valveIsolasiBocorOpen ? '#34d399' : '#f43f5e'} fontSize="9">
                Valve Bocor: {scada.valveIsolasiBocorOpen ? 'OPEN (TERBUKA)' : 'ISOLATED (TERTUTUP)'}
              </text>
              <text x="485" y="430" fill="#94a3b8" fontSize="9">
                Z1 Valve: {scada.valveZone1Open ? 'OPEN' : 'CLOSED'} · Z2: {scada.valveZone2Open ? 'OPEN' : 'CLOSED'}
              </text>
            </g>

            {/* Info Button Valve PRV */}
            <circle
              cx="650"
              cy="312"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('valve_prv'); }}
            />
            <text x="648" y="316" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Valve PRV */}
            {hasAlarm('valve_prv') && (
              <g className="animate-bounce">
                <circle cx="632" cy="312" r="9" fill="#ef4444" />
                <text x="629" y="316" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}

            {/* Pipe to Zone 1 with Pipe Leak burst effect */}
            <path
              d="M 475 360 L 250 360"
              stroke={scada.pipeLeakActive && scada.valveIsolasiBocorOpen ? '#f43f5e' : '#38bdf8'}
              strokeWidth="6"
              fill="none"
              className={scada.pipeLeakActive && scada.valveIsolasiBocorOpen ? 'animate-pipe-flow-fast' : 'animate-pipe-flow'}
            />

            {/* Pipe leak water spray effect */}
            {scada.pipeLeakActive && scada.valveIsolasiBocorOpen && (
              <g className="animate-pulse">
                <circle cx="340" cy="360" r="14" fill="#f43f5e" opacity="0.4" />
                <path d="M 330 350 L 350 370 M 350 350 L 330 370" stroke="#ffffff" strokeWidth="2" />
                <text x="310" y="340" fill="#f43f5e" fontSize="9" fontWeight="bold">PIPA PECAH!</text>
              </g>
            )}

            {/* Pipe to Zone 2 */}
            <path
              d="M 475 430 L 250 430"
              stroke="#38bdf8"
              strokeWidth="6"
              fill="none"
              className="animate-pipe-flow"
            />

            {/* UNIT 9: TITIK PANTAU JARINGAN (ZONA 1 & 2) */}
            <g
              id="unit-titik_pantau_jaringan"
              className="cursor-pointer transition-transform"
              onClick={() => onSelectUnit('titik_pantau_jaringan')}
            >
              <rect
                x="20"
                y="300"
                width="225"
                height="190"
                rx="8"
                fill={selectedUnit === 'titik_pantau_jaringan' ? '#0369a1' : '#1e293b'}
                fillOpacity={selectedUnit === 'titik_pantau_jaringan' ? '0.35' : '0.7'}
                stroke={selectedUnit === 'titik_pantau_jaringan' ? '#38bdf8' : '#334155'}
                strokeWidth={selectedUnit === 'titik_pantau_jaringan' ? '2' : '1'}
              />

              {/* Zone 1 Card */}
              <rect x="30" y="335" width="205" height="60" fill="#0f172a" rx="4" stroke="#334155" />
              <text x="40" y="352" fill="#38bdf8" fontSize="10" fontWeight="bold">ZONA 1 (KOTA / RESIDENSIAL)</text>
              <text x="40" y="368" fill={scada.zone1Pressure < 1.8 ? '#f43f5e' : '#10b981'} fontSize="11" fontWeight="bold">
                P: {scada.zone1Pressure.toFixed(2)} bar
              </text>
              <text x="135" y="368" fill="#e2e8f0" fontSize="10">Q: {scada.zone1Flow.toFixed(0)} m³/h</text>
              <text x="40" y="385" fill="#94a3b8" fontSize="9">Batas Standar: 2.0 - 2.8 bar</text>

              {/* Zone 2 Card */}
              <rect x="30" y="405" width="205" height="75" fill="#0f172a" rx="4" stroke="#334155" />
              <text x="40" y="422" fill="#38bdf8" fontSize="10" fontWeight="bold">ZONA 2 (KOMERSIAL & UJUNG)</text>
              <text x="40" y="438" fill={scada.zone2Pressure < 1.6 ? '#f43f5e' : '#10b981'} fontSize="11" fontWeight="bold">
                P: {scada.zone2Pressure.toFixed(2)} bar
              </text>
              <text x="135" y="438" fill="#e2e8f0" fontSize="10">Q: {scada.zone2Flow.toFixed(0)} m³/h</text>
              <text x="40" y="456" fill={scada.zoneChlorineEnd < 0.2 ? '#f43f5e' : '#34d399'} fontSize="10" fontWeight="bold">
                Sisa Klor Ujung: {scada.zoneChlorineEnd.toFixed(2)} mg/L
              </text>
              <text x="40" y="470" fill="#94a3b8" fontSize="8">Target: &gt; 0.20 mg/L di sambungan terjauh</text>

              <text x="30" y="322" fill="#f8fafc" fontSize="11" fontWeight="bold">TELEMETRI JARINGAN</text>
            </g>

            {/* Info Button Titik Pantau */}
            <circle
              cx="230"
              cy="312"
              r="9"
              fill="#0284c7"
              className="cursor-pointer hover:fill-sky-400"
              onClick={(e) => { e.stopPropagation(); onOpenNarrative('titik_pantau_jaringan'); }}
            />
            <text x="228" y="316" fill="#ffffff" fontSize="11" fontWeight="bold" className="pointer-events-none">i</text>

            {/* Alarm Icon Titik Pantau */}
            {hasAlarm('titik_pantau_jaringan') && (
              <g className="animate-bounce">
                <circle cx="212" cy="312" r="9" fill="#ef4444" />
                <text x="209" y="316" fill="#ffffff" fontSize="11" fontWeight="bold">!</text>
              </g>
            )}
          </g>
      </svg>

      {/* Floating Legend / Quick Status Bar */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/80 backdrop-blur-xs py-1.5 px-3 rounded-lg border border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            Normal / Running
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            Warning / Menyesuaikan
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            Trip / Alarm Kritis
          </span>
        </div>
        <div className="text-slate-400">
          Klik titik kontrol untuk mengendalikan · Klik ikon <span className="text-sky-400 font-bold">i</span> untuk membuka narasi SOP
        </div>
      </div>
    </div>
  );
};
