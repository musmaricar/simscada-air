/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlarmItem, AlarmPriority } from '../../types';
import { 
  AlertOctagon, 
  AlertTriangle, 
  Bell, 
  Check, 
  CheckCheck, 
  Info, 
  Volume2, 
  VolumeX, 
  XCircle,
  ShieldAlert
} from 'lucide-react';
import { scadaAudio } from '../../utils/audio';

interface AlarmPanelProps {
  alarms: AlarmItem[];
  onAcknowledge: (alarmId: string) => void;
  onClear: (alarmId: string) => { success: boolean; message: string };
  onSelectControlPoint: (controlPointId: string) => void;
}

export const AlarmPanel: React.FC<AlarmPanelProps> = ({
  alarms,
  onAcknowledge,
  onClear,
  onSelectControlPoint,
}) => {
  const [rejectMessage, setRejectMessage] = useState<string | null>(null);

  const handleClearClick = (alarm: AlarmItem) => {
    const result = onClear(alarm.id);
    if (!result.success) {
      setRejectMessage(result.message);
      setTimeout(() => setRejectMessage(null), 4000);
    } else {
      setRejectMessage(null);
    }
  };

  const getPriorityBadge = (priority: AlarmPriority) => {
    switch (priority) {
      case 'kritis':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
            <AlertOctagon className="w-3 h-3 text-rose-400" />
            <span>KRITIS</span>
          </span>
        );
      case 'tinggi':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            <span>TINGGI</span>
          </span>
        );
      case 'sedang':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/40 text-[10px] font-bold">
            <AlertTriangle className="w-3 h-3 text-sky-400" />
            <span>SEDANG</span>
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700/50 text-slate-300 border border-slate-600 text-[10px] font-bold">
            <Info className="w-3 h-3 text-slate-400" />
            <span>INFO</span>
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aktif_belum_diakui':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-500/50 font-bold text-[9px] animate-pulse">
            Aktif, Belum Diakui
          </span>
        );
      case 'aktif_diakui':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/50 font-bold text-[9px]">
            Aktif, Diakui
          </span>
        );
      case 'pulih_belum_clear':
        return (
          <span className="px-2 py-0.5 rounded-full bg-sky-950/60 text-sky-300 border border-sky-500/50 font-bold text-[9px]">
            Pulih, Belum Clear
          </span>
        );
      case 'clear':
        return (
          <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/50 font-bold text-[9px]">
            Clear (Normal)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Toast message if clear is rejected */}
      {rejectMessage && (
        <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/60 text-rose-200 text-xs font-bold flex items-center justify-between shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Penolakan Tindakan: {rejectMessage} (Terhitung kesalahan penanganan SOP -15 Poin)</span>
          </div>
          <button onClick={() => setRejectMessage(null)} className="text-rose-400 hover:text-white p-1">
            ✕
          </button>
        </div>
      )}

      {/* Alarms Table */}
      <div className="overflow-x-auto rounded-xl border border-[#1e293b] bg-[#0b1120]">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0f172a] text-slate-400 text-[10px] uppercase tracking-wider border-b border-[#1e293b] font-bold">
            <tr>
              <th className="py-2.5 px-3">Waktu</th>
              <th className="py-2.5 px-3">Bentuk / Prioritas</th>
              <th className="py-2.5 px-3">Titik Kontrol</th>
              <th className="py-2.5 px-3">Pesan Alarm & Nilai Proses</th>
              <th className="py-2.5 px-3">Status Alarm</th>
              <th className="py-2.5 px-3 text-right">Aksi Operator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e293b] font-sans">
            {alarms.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-slate-500 text-xs">
                  Tidak ada rekaman alarm aktif pada sesi ini.
                </td>
              </tr>
            ) : (
              alarms.map((alarm) => {
                const isCleared = alarm.status === 'clear';
                const isUnacknowledged = alarm.status === 'aktif_belum_diakui';

                return (
                  <tr
                    key={alarm.id}
                    onClick={() => onSelectControlPoint(alarm.controlPointId)}
                    className="hover:bg-[#1e293b]/40 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                      {alarm.timestamp}
                    </td>
                    <td className="py-2.5 px-3">
                      {getPriorityBadge(alarm.priority)}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-white">
                      {alarm.controlPointName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-200">
                      {alarm.message}
                    </td>
                    <td className="py-2.5 px-3">
                      {getStatusBadge(alarm.status)}
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-1.5" onClick={(e) => e.stopPropagation()}>
                      {isUnacknowledged && (
                        <button
                          type="button"
                          onClick={() => onAcknowledge(alarm.id)}
                          className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-[10px] transition-all shadow-xs"
                        >
                          Akui (ACK)
                        </button>
                      )}

                      {!isCleared && (
                        <button
                          type="button"
                          onClick={() => handleClearClick(alarm)}
                          className="px-2.5 py-1 rounded-lg bg-[#1e293b] hover:bg-rose-950/60 border border-[#334155] hover:border-rose-500/50 text-slate-300 hover:text-rose-200 text-[10px] font-semibold transition-all"
                        >
                          Clear Alarm
                        </button>
                      )}

                      {isCleared && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          Selesai ✓
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
