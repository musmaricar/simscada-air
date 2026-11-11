/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, LineChart, TrendingUp } from 'lucide-react';

interface TrendPoint {
  timeSec: number;
  turbidity: number;
  freeChlorine?: number;
  settledTurbidity?: number;
  reservoirLevel?: number;
  zonePressure?: number;
  zoneFlow?: number;
}

interface TrendChartProps {
  trendHistory?: TrendPoint[];
  history?: TrendPoint[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ trendHistory, history }) => {
  const points = trendHistory || history || [];
  const [selectedParam, setSelectedParam] = useState<'turbidity' | 'freeChlorine' | 'reservoirLevel' | 'zonePressure'>('turbidity');

  const paramConfig = {
    turbidity: {
      name: 'Kekeruhan Air Olahan (Filtrasi)',
      unit: 'NTU',
      target: '< 3.0 NTU',
      color: '#f43f5e',
      min: 0,
      max: 6,
      safeMax: 3.0,
      getValue: (p: TrendPoint) => p.turbidity,
    },
    freeChlorine: {
      name: 'Sisa Klor Bebas (Reservoir)',
      unit: 'mg/L',
      target: '0.2 - 0.5 mg/L',
      color: '#38bdf8',
      min: 0,
      max: 1.0,
      safeMin: 0.2,
      safeMax: 0.5,
      getValue: (p: TrendPoint) => p.freeChlorine || 0.35,
    },
    reservoirLevel: {
      name: 'Level Ketinggian Reservoir',
      unit: 'meter',
      target: '2.0 - 4.8 m',
      color: '#34d399',
      min: 0,
      max: 5.0,
      safeMin: 2.0,
      safeMax: 4.8,
      getValue: (p: TrendPoint) => p.reservoirLevel || 4.2,
    },
    zonePressure: {
      name: 'Tekanan Jaringan (Zona 1)',
      unit: 'bar',
      target: '2.0 - 2.8 bar',
      color: '#fbbf24',
      min: 0,
      max: 4.0,
      safeMin: 2.0,
      safeMax: 3.0,
      getValue: (p: TrendPoint) => p.zonePressure || 2.4,
    },
  };

  const currConfig = paramConfig[selectedParam];

  // SVG dimensions
  const svgWidth = 800;
  const svgHeight = 90;
  const paddingX = 40;
  const paddingY = 12;

  // Render path for history points (up to last 60 points)
  const displayPoints = points.slice(-60);
  const pointsStr = displayPoints.map((pt, idx) => {
    const x = paddingX + (idx / Math.max(1, displayPoints.length - 1)) * (svgWidth - paddingX * 2);
    const val = currConfig.getValue(pt);
    const clampedVal = Math.max(currConfig.min, Math.min(currConfig.max, val));
    const normalizedY = (clampedVal - currConfig.min) / (currConfig.max - currConfig.min);
    const y = svgHeight - paddingY - normalizedY * (svgHeight - paddingY * 2);
    return `${x},${y}`;
  }).join(' ');

  const latestVal = displayPoints.length > 0 ? currConfig.getValue(displayPoints[displayPoints.length - 1]) : 3.4;

  return (
    <div className="bg-[#0b1120] rounded-xl border border-[#1e293b] p-3 text-slate-100 font-sans shadow-inner">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <LineChart className="w-4 h-4 text-sky-400" />
          <span className="font-bold text-slate-200">{currConfig.name}</span>
          <span className="text-[10px] text-slate-400 font-mono">Baku Mutu: {currConfig.target}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Param Buttons */}
          <div className="flex items-center gap-1 font-mono text-[10px]">
            {(['turbidity', 'freeChlorine', 'reservoirLevel', 'zonePressure'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedParam(key)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedParam === key
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-[#1e293b] text-slate-400 hover:text-white'
                }`}
              >
                {key === 'turbidity' && 'Kekeruhan'}
                {key === 'freeChlorine' && 'Sisa Klor'}
                {key === 'reservoirLevel' && 'Level Reservoir'}
                {key === 'zonePressure' && 'Tekanan Jaringan'}
              </button>
            ))}
          </div>

          <div className="text-right pl-2 border-l border-[#1e293b]">
            <span className="text-[10px] text-slate-400 mr-1 font-mono">Nilai Terkini:</span>
            <span className="text-xs font-black text-rose-400 font-mono">
              {latestVal.toFixed(2)} {currConfig.unit}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-20">
          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
          <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="#1e293b" strokeWidth="1" />

          {/* Y Axis Labels */}
          <text x={paddingX - 6} y={paddingY + 4} fill="#64748b" fontSize="8" textAnchor="end" fontFamily="monospace">
            {currConfig.max}
          </text>
          <text x={paddingX - 6} y={svgHeight / 2 + 3} fill="#64748b" fontSize="8" textAnchor="end" fontFamily="monospace">
            {((currConfig.max + currConfig.min) / 2).toFixed(1)}
          </text>
          <text x={paddingX - 6} y={svgHeight - paddingY} fill="#64748b" fontSize="8" textAnchor="end" fontFamily="monospace">
            {currConfig.min}
          </text>

          {/* Safe threshold reference line (3.0 NTU for turbidity) */}
          {currConfig.safeMax && (
            <line
              x1={paddingX}
              y1={svgHeight - paddingY - ((currConfig.safeMax - currConfig.min) / (currConfig.max - currConfig.min)) * (svgHeight - paddingY * 2)}
              x2={svgWidth - paddingX}
              y2={svgHeight - paddingY - ((currConfig.safeMax - currConfig.min) / (currConfig.max - currConfig.min)) * (svgHeight - paddingY * 2)}
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          )}

          {/* Curve */}
          {displayPoints.length > 1 ? (
            <polyline
              fill="none"
              stroke={currConfig.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsStr}
            />
          ) : (
            <line
              x1={paddingX}
              y1={svgHeight / 2}
              x2={svgWidth - paddingX}
              y2={svgHeight / 2}
              stroke={currConfig.color}
              strokeWidth="2"
            />
          )}
        </svg>
      </div>
    </div>
  );
};
