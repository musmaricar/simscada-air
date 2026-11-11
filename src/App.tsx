/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Mission, MissionResult } from './types';
import { MISSIONS_LIST } from './data/seedData';
import { Header } from './components/common/Header';

// 19 Views (L1 - L16 including L4a and L8b)
import { L1_Login } from './components/views/L1_Login';
import { L2_TraineeHome } from './components/views/L2_TraineeHome';
import { L3_TrackSelect } from './components/views/L3_TrackSelect';
import { L4_ModuleQuizBriefing } from './components/views/L4_ModuleQuizBriefing';
import { L4a_PrePostTest } from './components/views/L4a_PrePostTest';
import { L5_ScadaSimulator } from './components/views/L5_ScadaSimulator';
import { L6_ResultsFeedback } from './components/views/L6_ResultsFeedback';
import { L7_BadgesLeaderboard } from './components/views/L7_BadgesLeaderboard';
import { L8_MyCertificate } from './components/views/L8_MyCertificate';
import { L8b_CertificatePending } from './components/views/L8b_CertificatePending';
import { L9_InstructorDashboard } from './components/views/L9_InstructorDashboard';
import { L10_ManageScenarios } from './components/views/L10_ManageScenarios';
import { L11_SessionReplay } from './components/views/L11_SessionReplay';
import { L12_ManageUsersGroups } from './components/views/L12_ManageUsersGroups';
import { L13_TenantSettings } from './components/views/L13_TenantSettings';
import { L14_TenantEvaluationDashboard } from './components/views/L14_TenantEvaluationDashboard';
import { L15_SuperAdminDashboard } from './components/views/L15_SuperAdminDashboard';
import { L16_PublicVerification } from './components/views/L16_PublicVerification';

function AppContent() {
  const {
    currentUser,
    currentTenant,
    activeTrack,
    getMissionsForTrack,
    currentView,
    setCurrentView,
    selectedMissionCode,
    setSelectedMissionCode,
    lastMissionResult,
    setLastMissionResult,
    replayUserId,
    setReplayUserId,
    verificationCertNo,
    setVerificationCertNo,
  } = useApp();

  // If user is not logged in and not viewing public verification, show L1 Login
  if (!currentUser && currentView !== 'public_verification') {
    return (
      <L1_Login
        onLoginSuccess={() => setCurrentView('home')}
        onOpenPublicVerification={() => setCurrentView('public_verification')}
      />
    );
  }

  const selectedMission =
    MISSIONS_LIST.find((m) => m.code === selectedMissionCode) || MISSIONS_LIST[5]; // Default to IPA-06

  const handleSelectMission = (code: string) => {
    setSelectedMissionCode(code);
    setCurrentView('module_quiz');
  };

  const handleStartSimulation = () => {
    setCurrentView('simulator');
  };

  const handleFinishSimulation = (res: MissionResult) => {
    setLastMissionResult(res);
    setCurrentView('results');
  };

  const handleNextMission = () => {
    const trackMissions = getMissionsForTrack(currentUser?.track || activeTrack);
    const currIdx = trackMissions.findIndex((m) => m.code === selectedMissionCode);
    if (currIdx >= 0 && currIdx < trackMissions.length - 1) {
      const nextM = trackMissions[currIdx + 1];
      setSelectedMissionCode(nextM.code);
      setCurrentView('module_quiz');
    } else {
      setCurrentView('home');
    }
  };

  const handleOpenReplay = (userId: string) => {
    setReplayUserId(userId);
    setCurrentView('replay');
  };

  const handleOpenPublicVerification = (certNo?: string) => {
    if (certNo) setVerificationCertNo(certNo);
    setCurrentView('public_verification');
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      {currentView !== 'public_verification' && (
        <Header 
          currentView={currentView} 
          onNavigate={(view) => {
            if (view === 'simulator_test') {
              setSelectedMissionCode('IPA-06');
              setCurrentView('simulator');
            } else {
              setCurrentView(view);
            }
          }} 
        />
      )}

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          currentUser?.role === 'peserta' ? (
            <L2_TraineeHome
              onSelectMission={handleSelectMission}
              onOpenPreTest={() => setCurrentView('pre_post_test')}
              onOpenPostTest={() => setCurrentView('pre_post_test')}
              onViewCertificates={() => {
                if (currentUser.id === 'user-rian-hidayat') {
                  setCurrentView('certificate_pending');
                } else {
                  setCurrentView('certificate');
                }
              }}
              onNavigateTrackSelect={() => setCurrentView('track_select')}
            />
          ) : currentUser?.role === 'instruktur' ? (
            <L9_InstructorDashboard
              onViewReplay={handleOpenReplay}
              onNavigateScenarios={() => setCurrentView('manage_scenarios')}
            />
          ) : currentUser?.role === 'superadmin' ? (
            <L15_SuperAdminDashboard />
          ) : (
            <L14_TenantEvaluationDashboard />
          )
        )}

        {currentView === 'track_select' && (
          <L3_TrackSelect onConfirmTrack={() => setCurrentView('home')} />
        )}

        {currentView === 'module_quiz' && (
          <L4_ModuleQuizBriefing
            mission={selectedMission}
            onStartSimulation={handleStartSimulation}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'pre_post_test' && (
          <L4a_PrePostTest
            onBack={() => setCurrentView('home')}
            onViewCertificate={() => setCurrentView('certificate')}
          />
        )}

        {currentView === 'simulator' && (
          <L5_ScadaSimulator
            mission={selectedMission}
            onFinishMission={handleFinishSimulation}
            onExit={() => setCurrentView('home')}
          />
        )}

        {currentView === 'results' && lastMissionResult && (
          <L6_ResultsFeedback
            mission={selectedMission}
            result={lastMissionResult}
            onRetry={() => setCurrentView('simulator')}
            onNextMission={handleNextMission}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'badges' && <L7_BadgesLeaderboard />}

        {currentView === 'certificate' && (
          <L8_MyCertificate
            onOpenPublicVerification={handleOpenPublicVerification}
          />
        )}

        {currentView === 'certificate_pending' && (
          <L8b_CertificatePending
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'instructor_dashboard' && (
          <L9_InstructorDashboard
            onViewReplay={handleOpenReplay}
            onNavigateScenarios={() => setCurrentView('manage_scenarios')}
          />
        )}

        {currentView === 'manage_scenarios' && <L10_ManageScenarios />}

        {currentView === 'replay' && (
          <L11_SessionReplay
            initialUserId={replayUserId}
            onBack={() => setCurrentView('instructor_dashboard')}
          />
        )}

        {currentView === 'manage_users' && <L12_ManageUsersGroups />}

        {currentView === 'tenant_settings' && <L13_TenantSettings />}

        {currentView === 'evaluation' && <L14_TenantEvaluationDashboard />}

        {currentView === 'superadmin_dashboard' && <L15_SuperAdminDashboard />}

        {currentView === 'public_verification' && (
          <L16_PublicVerification
            initialCertNumber={verificationCertNo}
            onBackToApp={() => setCurrentView('home')}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
