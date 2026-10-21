import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AIAssistantDrawer from './components/AIAssistantDrawer';
import NavigationStackBar from './components/NavigationStackBar';
import MobileBottomNav from './components/MobileBottomNav';

// Views
import LandingPage from './views/LandingPage';
import AuthModal from './views/AuthModal';
import CompanyAdminDashboard from './views/CompanyAdminDashboard';
import ProjectManagersView from './views/ProjectManagersView';
import SiteEngineerView from './views/SiteEngineerView';
import AIWastePredictionView from './views/AIWastePredictionView';
import InternalTransferView from './views/InternalTransferView';
import ProcurementView from './views/ProcurementView';
import WarehouseView from './views/WarehouseView';
import SupplierPortalView from './views/SupplierPortalView';
import DocumentOCRView from './views/DocumentOCRView';
import SmartEquipmentView from './views/SmartEquipmentView';
import MarketplaceView from './views/MarketplaceView';
import LogoutModal from './views/LogoutModal';

// Canonical titles for navigation stack
const viewCatalog = {
  'admin': { labelAr: 'إدارة الشركة والصلاحيات', labelEn: 'Company Admin & RBAC' },
  'projects': { labelAr: 'إدارة المشاريع (BOQ)', labelEn: 'Projects Management' },
  'site-engineer': { labelAr: 'تنفيذ الموقع واستهلاك المواد', labelEn: 'Site Execution & Logs' },
  'waste-prediction': { labelAr: 'تنبؤ الهدر بالذكاء الاصطناعي', labelEn: 'AI Waste Prediction' },
  'transfers': { labelAr: 'نقل الفائض بين المواقع', labelEn: 'Surplus & Internal Transfers' },
  'procurement': { labelAr: 'المشتريات وعروض الأسعار', labelEn: 'Procurement & RFQs' },
  'warehouse': { labelAr: 'المخازن واستلام المواد', labelEn: 'Warehouse & Receiving' },
  'ocr': { labelAr: 'فحص المستندات OCR', labelEn: 'AI Document OCR' },
  'equipment': { labelAr: 'تتبع الآليات والمعدات (07)', labelEn: 'Smart Machinery & Equipment' },
  'marketplace': { labelAr: 'سوق تصريف الفائض', labelEn: 'Surplus B2B Marketplace' },
  'supplier': { labelAr: 'بوابة الموردين المستقلة', labelEn: 'Supplier Portal' }
};

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentRole, setCurrentRole] = useState('Company Admin');
  const [language, setLanguage] = useState('ar'); // Arabic as primary per user requirements, toggleable to 'en'
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('PRJ-001');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Logout Handlers
  const handleTriggerLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    setCurrentRole('Company Admin');
    setCurrentView('landing');
  };

  // Bidirectional Navigation History Engine
  const [navHistory, setNavHistory] = useState([
    { view: 'admin', labelAr: 'إدارة الشركة والصلاحيات', labelEn: 'Company Admin & RBAC', projectId: 'PRJ-001' }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < navHistory.length - 1;
  const previousItem = canGoBack ? navHistory[historyIndex - 1] : null;
  const nextItem = canGoForward ? navHistory[historyIndex + 1] : null;

  // Navigate forward and push to history
  const navigateTo = (newView, meta = {}, pushBrowser = true) => {
    if (newView === 'landing') {
      setCurrentView('landing');
      return;
    }

    const targetProjId = meta.projectId || selectedProjectId;
    if (meta.projectId) setSelectedProjectId(meta.projectId);

    let labelAr = meta.labelAr || viewCatalog[newView]?.labelAr || newView;
    let labelEn = meta.labelEn || viewCatalog[newView]?.labelEn || newView;

    // Specialize project label in stack
    if (newView === 'projects' && targetProjId) {
      if (targetProjId === 'PRJ-001') {
        labelAr = 'مشروع كمبوند المنصورة';
        labelEn = 'Al-Mansoura Complex';
      } else if (targetProjId === 'PRJ-002') {
        labelAr = 'برج العاصمة الإدارية';
        labelEn = 'New Capital Tower';
      } else if (targetProjId === 'PRJ-003') {
        labelAr = 'أبراج كورنيش الإسكندرية';
        labelEn = 'Alexandria Waterfront';
      }
    }

    const newStackItem = {
      view: newView,
      projectId: targetProjId,
      labelAr,
      labelEn,
      ...meta
    };

    setNavHistory(prev => {
      // Avoid duplicate consecutive identical items in history
      const current = prev[historyIndex];
      if (current && current.view === newView && current.projectId === targetProjId) {
        return prev;
      }
      const trimmed = prev.slice(0, historyIndex + 1);
      const updated = [...trimmed, newStackItem];
      setHistoryIndex(updated.length - 1);
      return updated;
    });

    setCurrentView(newView);

    if (pushBrowser && typeof window !== 'undefined') {
      try {
        window.history.pushState({ view: newView, projectId: targetProjId }, '', `#${newView}`);
      } catch (e) {
        // Safe fallback in restricted environments
      }
    }
  };

  // Pop from history (Go Back - الرجوع)
  const goBack = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const target = navHistory[targetIndex];
      setHistoryIndex(targetIndex);
      setCurrentView(target.view);
      if (target.projectId) setSelectedProjectId(target.projectId);
    } else {
      // At stack root, fall back to default role view or landing
      const defaultView = getDefaultViewForRole(currentRole);
      if (currentView !== defaultView) {
        navigateTo(defaultView);
      } else {
        setCurrentView('landing');
      }
    }
  };

  // Step Forward in History (التقدم)
  const goForward = () => {
    if (historyIndex < navHistory.length - 1) {
      const targetIndex = historyIndex + 1;
      const target = navHistory[targetIndex];
      setHistoryIndex(targetIndex);
      setCurrentView(target.view);
      if (target.projectId) setSelectedProjectId(target.projectId);
    }
  };

  // Jump directly to an ancestor crumb in the history
  const jumpToStackIndex = (index) => {
    if (index >= 0 && index < navHistory.length) {
      const target = navHistory[index];
      setHistoryIndex(index);
      setCurrentView(target.view);
      if (target.projectId) setSelectedProjectId(target.projectId);
    }
  };

  // Reset to root crumb of current stack
  const resetToRoot = () => {
    if (navHistory.length > 0) {
      const root = navHistory[0];
      setNavHistory([root]);
      setHistoryIndex(0);
      setCurrentView(root.view);
      if (root.projectId) setSelectedProjectId(root.projectId);
    }
  };

  // Sync with native browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state && event.state.view) {
        const { view, projectId } = event.state;
        setCurrentView(view);
        if (projectId) setSelectedProjectId(projectId);
      } else if (window.location.hash) {
        const hashView = window.location.hash.replace('#', '');
        if (viewCatalog[hashView]) {
          setCurrentView(hashView);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const getDefaultViewForRole = (role) => {
    if (role === 'Company Admin') return 'admin';
    if (role === 'Project Manager') return 'projects';
    if (role === 'Site Engineer') return 'site-engineer';
    if (role === 'Procurement Officer') return 'procurement';
    if (role === 'Warehouse Officer') return 'warehouse';
    if (role === 'Supplier') return 'supplier';
    return 'admin';
  };

  // Sync role switch with appropriate default view and reset stack
  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    const targetView = getDefaultViewForRole(newRole);
    const initialMeta = viewCatalog[targetView] || { labelAr: 'الرئيسية', labelEn: 'Dashboard' };
    
    setNavHistory([
      { view: targetView, labelAr: initialMeta.labelAr, labelEn: initialMeta.labelEn, projectId: selectedProjectId }
    ]);
    setHistoryIndex(0);
    setCurrentView(targetView);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  // If viewing public landing page
  if (currentView === 'landing') {
    return (
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        <LandingPage 
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setIsAuthOpen(true);
          }}
          onExploreDashboard={(role = 'Company Admin') => {
            handleRoleChange(role);
          }}
          language={language}
          onLanguageToggle={toggleLanguage}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          initialMode={authMode}
          onLoginSuccess={(role) => {
            handleRoleChange(role);
          }}
          language={language}
        />
      </div>
    );
  }

  // If viewing as Supplier: Dedicated Standalone Supplier System!
  if (currentRole === 'Supplier' || currentView === 'supplier') {
    return (
      <div 
        dir={language === 'ar' ? 'rtl' : 'ltr'} 
        className={`min-h-screen bg-[#FFFDF9] text-[#26231F] flex flex-col ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
      >
        <SupplierPortalView 
          language={language}
          onLanguageToggle={toggleLanguage}
          onSwitchToCompany={() => handleRoleChange('Company Admin')}
          onLogout={handleTriggerLogout}
          onOpenAssistant={() => setIsAssistantOpen(true)}
        />

        {/* Floating AI Construction Assistant Drawer */}
        <AIAssistantDrawer
          isOpen={isAssistantOpen}
          onClose={() => setIsAssistantOpen(false)}
          language={language}
        />

        {/* Logout Confirmation Modal */}
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirmLogout={handleConfirmLogout}
          language={language}
          currentRole={currentRole}
        />
      </div>
    );
  }

  return (
    <div 
      dir={language === 'ar' ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-[#FFFDF9] text-[#26231F] flex flex-col ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}
    >
      {/* Top Global Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        language={language}
        onLanguageToggle={toggleLanguage}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onLogout={handleTriggerLogout}
        onOpenLanding={() => setCurrentView('landing')}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Main App Layout: Sidebar + Active View Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left/Right Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={navigateTo}
          currentRole={currentRole}
          language={language}
          onLogout={handleTriggerLogout}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Workspace Container */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-[#FFFDF9] relative pb-24 md:pb-12">
          {/* Subtle architectural grid pattern */}
          <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#26231F_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="w-full max-w-[1720px] mx-auto pb-12 relative z-10">
            
            {/* Global Interactive Breadcrumb & Back/Forward Navigation Stack */}
            <NavigationStackBar
              navHistory={navHistory}
              historyIndex={historyIndex}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              previousItem={previousItem}
              nextItem={nextItem}
              currentView={currentView}
              selectedProjectId={selectedProjectId}
              onGoBack={goBack}
              onGoForward={goForward}
              onJumpToStack={jumpToStackIndex}
              onResetToRoot={resetToRoot}
              onOpenLanding={() => setCurrentView('landing')}
              language={language}
            />

            {/* View Switching */}
            {currentView === 'admin' && (
              <CompanyAdminDashboard
                onSelectProject={(id) => {
                  navigateTo('projects', { projectId: id });
                }}
                onOpenTransfers={() => navigateTo('transfers')}
                onOpenWaste={() => navigateTo('waste-prediction')}
                onOpenProcurement={() => navigateTo('procurement')}
                language={language}
              />
            )}

            {currentView === 'projects' && (
              <ProjectManagersView
                selectedProjectId={selectedProjectId}
                onOpenTransferModal={() => navigateTo('transfers')}
                onBack={goBack}
                language={language}
              />
            )}

            {currentView === 'site-engineer' && (
              <SiteEngineerView 
                onBack={goBack}
                onOpenWaste={() => navigateTo('waste-prediction')}
                onOpenTransfers={() => navigateTo('transfers')}
                language={language} 
              />
            )}

            {currentView === 'waste-prediction' && (
              <AIWastePredictionView 
                onBack={goBack}
                language={language} 
              />
            )}

            {currentView === 'transfers' && (
              <InternalTransferView 
                onBack={goBack}
                language={language} 
              />
            )}

            {currentView === 'procurement' && (
              <ProcurementView 
                onBack={goBack}
                language={language} 
              />
            )}

            {currentView === 'warehouse' && (
              <WarehouseView
                onOpenOCR={() => navigateTo('ocr')}
                onOpenSurplusLog={() => navigateTo('transfers')}
                onBack={goBack}
                language={language}
              />
            )}

            {currentView === 'supplier' && (
              <SupplierPortalView 
                onBack={goBack}
                language={language} 
              />
            )}

            {currentView === 'ocr' && (
              <DocumentOCRView 
                onBack={goBack}
                language={language} 
              />
            )}

            {currentView === 'equipment' && (
              <SmartEquipmentView 
                onBack={goBack}
                language={language} 
              />
            )}

            {currentView === 'marketplace' && (
              <MarketplaceView 
                onBack={goBack}
                language={language} 
              />
            )}

          </div>
        </main>

      </div>

      {/* Floating AI Construction Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        language={language}
      />

      {/* Auth Modal for switching or registering */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
        onLoginSuccess={(role) => {
          handleRoleChange(role);
        }}
        language={language}
      />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={handleConfirmLogout}
        language={language}
        currentRole={currentRole}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onViewChange={navigateTo}
        currentRole={currentRole}
        language={language}
        onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

    </div>
  );
}
