import React from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  RotateCcw,
  Building2,
  HardHat,
  ArrowRightLeft,
  TrendingDown,
  ShoppingBag,
  Warehouse,
  FileSearch,
  ExternalLink,
  Truck,
  Coins
} from 'lucide-react';

export default function NavigationStackBar({
  navHistory = [],
  navStack = [],
  historyIndex = 0,
  canGoBack = false,
  canGoForward = false,
  previousItem = null,
  nextItem = null,
  currentView,
  selectedProjectId,
  onGoBack,
  onGoForward,
  onJumpToStack,
  onResetToRoot,
  onOpenLanding,
  language = 'ar'
}) {
  const isAr = language === 'ar';
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight;
  const BackArrowIcon = isAr ? ArrowRight : ArrowLeft;
  const ForwardArrowIcon = isAr ? ArrowLeft : ArrowRight;

  // Normalize history state
  const history = navHistory.length > 0 ? navHistory : (navStack.length > 0 ? navStack : []);
  const activeIndex = typeof historyIndex === 'number' ? historyIndex : Math.max(0, history.length - 1);
  const actualCanGoBack = typeof canGoBack === 'boolean' ? canGoBack : activeIndex > 0;
  const actualCanGoForward = typeof canGoForward === 'boolean' ? canGoForward : activeIndex < history.length - 1;
  const prev = previousItem || (actualCanGoBack ? history[activeIndex - 1] : null);
  const next = nextItem || (actualCanGoForward ? history[activeIndex + 1] : null);
  const activeTrail = history.slice(0, activeIndex + 1);

  // View icons mapping for breadcrumbs
  const viewIconMap = {
    'landing': Home,
    'admin': Building2,
    'projects': Building2,
    'site-engineer': HardHat,
    'transfers': ArrowRightLeft,
    'waste-prediction': TrendingDown,
    'procurement': ShoppingBag,
    'warehouse': Warehouse,
    'ocr': FileSearch,
    'equipment': Truck,
    'marketplace': Coins,
    'supplier': ShoppingBag
  };

  // Projects directory for breadcrumb naming
  const projectsMap = {
    'PRJ-001': { ar: 'كمبوند المنصورة السكني', en: 'Al-Mansoura Complex' },
    'PRJ-002': { ar: 'برج الأعمال - العاصمة', en: 'New Capital Tower' },
    'PRJ-003': { ar: 'أبراج كورنيش الإسكندرية', en: 'Alexandria Waterfront' }
  };

  const currentProjectName = selectedProjectId && projectsMap[selectedProjectId]
    ? (isAr ? projectsMap[selectedProjectId].ar : projectsMap[selectedProjectId].en)
    : null;

  return (
    <nav 
      aria-label="Navigation Stack and Breadcrumbs"
      className="bg-white border border-[#EAE5DE] rounded-xl px-3 sm:px-4 py-2.5 mb-5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-sm select-none"
    >
      {/* Left / Start: Bidirectional Back & Forward Controls + Trail */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 min-w-0">
        
        {/* Navigation Action Buttons (Back & Forward) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Home Quick Button */}
          <button
            type="button"
            onClick={onOpenLanding}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#F7F5F1] hover:bg-[#FEECE5] border border-[#EAE5DE] text-[#6E6862] hover:text-[#26231F] font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs hover:-translate-y-0.5 active:scale-95"
            title={isAr ? 'الصفحة الرئيسية للموقع' : 'Public Landing Page'}
          >
            <Home className="w-3.5 h-3.5 text-[#E85312]" />
            <span className="hidden xl:inline">{isAr ? 'الرئيسية' : 'Home'}</span>
          </button>

          {/* Back Button (← رجوع) */}
          <button
            type="button"
            onClick={onGoBack}
            disabled={!actualCanGoBack && currentView === 'landing'}
            className={`group px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
              actualCanGoBack 
                ? 'bg-[#F7F5F1] hover:bg-[#FEECE5] border-[#EAE5DE] hover:border-[#E85312] text-[#26231F] hover:text-[#E85312] cursor-pointer hover:-translate-y-0.5 active:scale-95' 
                : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
            }`}
            title={prev ? (isAr ? `الرجوع إلى: ${prev.labelAr}` : `Back to: ${prev.labelEn}`) : (isAr ? 'رجوع' : 'Back')}
          >
            <BackArrowIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5 ${actualCanGoBack ? 'text-[#E85312]' : 'text-slate-300'}`} />
            <span>{isAr ? 'رجوع' : 'Back'}</span>
            {prev && (
              <span className="hidden lg:inline text-[11px] text-[#6E6862] group-hover:text-[#E85312] max-w-[120px] truncate font-normal">
                ({isAr ? prev.labelAr : prev.labelEn})
              </span>
            )}
          </button>

          {/* Forward Button (تقدم →) */}
          <button
            type="button"
            onClick={onGoForward}
            disabled={!actualCanGoForward}
            className={`group px-2.5 sm:px-3 py-1.5 rounded-lg border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-2xs ${
              actualCanGoForward 
                ? 'bg-[#F7F5F1] hover:bg-[#FEECE5] border-[#EAE5DE] hover:border-[#E85312] text-[#26231F] hover:text-[#E85312] cursor-pointer hover:-translate-y-0.5 active:scale-95' 
                : 'bg-slate-50 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
            }`}
            title={next ? (isAr ? `التقدم إلى: ${next.labelAr}` : `Forward to: ${next.labelEn}`) : (isAr ? 'تقدم' : 'Forward')}
          >
            <span>{isAr ? 'تقدم' : 'Forward'}</span>
            {next && (
              <span className="hidden lg:inline text-[11px] text-[#6E6862] group-hover:text-[#E85312] max-w-[120px] truncate font-normal">
                ({isAr ? next.labelAr : next.labelEn})
              </span>
            )}
            <ForwardArrowIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 ${actualCanGoForward ? 'text-[#E85312]' : 'text-slate-300'}`} />
          </button>
        </div>

        <div className="h-4 w-px bg-[#CBD5E1] hidden sm:block"></div>

        {/* Breadcrumb Trail */}
        <ol className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-medium text-[#475569]">
          
          {/* Root Crumb */}
          <li className="flex items-center gap-1">
            <button
              onClick={onResetToRoot}
              className="hover:text-[#E85312] font-bold flex items-center gap-1 text-[#0F172A] transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#E85312]" />
              <span>{isAr ? 'منظومة إيرام' : 'IRAM Cloud'}</span>
            </button>
          </li>

          {/* Active Trail Iteration */}
          {activeTrail.map((item, index) => {
            const isLast = index === activeTrail.length - 1;
            const ItemIcon = viewIconMap[item.view] || Layers;
            const label = isAr ? item.labelAr : item.labelEn;

            return (
              <li key={`${item.view}-${index}`} className="flex items-center gap-1">
                <ChevronIcon className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
                
                {isLast ? (
                  <span 
                    className="font-black text-[#0F172A] bg-[#EEF2F6] px-2 py-0.5 rounded-md flex items-center gap-1.5 border border-[#CBD5E1]"
                    aria-current="page"
                  >
                    <ItemIcon className="w-3.5 h-3.5 text-[#E85312]" />
                    <span>{label}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => onJumpToStack(index)}
                    className="hover:text-[#E85312] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                    title={isAr ? `الانتقال إلى ${label}` : `Jump to ${label}`}
                  >
                    <ItemIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ol>

      </div>

      {/* Right / End: Active Scope & Quick Reset Actions */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Active Project Scope Pill if on Project / Site view */}
        {(currentView === 'projects' || currentView === 'site-engineer') && currentProjectName && (
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-50 border border-orange-200 text-xs font-bold text-[#E85312]">
            <span className="w-2 h-2 rounded-full bg-[#E85312] animate-pulse"></span>
            <span>{isAr ? `المشروع: ${currentProjectName}` : `Site: ${currentProjectName}`}</span>
          </div>
        )}

        {/* History depth indicator */}
        {history.length > 2 && (
          <button
            onClick={onResetToRoot}
            className="text-[11px] font-bold text-[#64748B] hover:text-[#0F172A] px-2 py-1 rounded-md border border-dashed border-[#CBD5E1] hover:bg-[#EEF2F6] flex items-center gap-1 transition-colors cursor-pointer"
            title={isAr ? 'العودة لأول شاشة رئيسية في المكدس' : 'Reset history stack to root'}
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">{isAr ? 'بداية المسار' : 'Root'}</span>
          </button>
        )}

        {/* Public Landing Link */}
        <button
          onClick={onOpenLanding}
          className="text-xs font-bold text-[#475569] hover:text-[#E85312] px-2.5 py-1 rounded-md hover:bg-[#EEF2F6] flex items-center gap-1 transition-colors cursor-pointer"
          title={isAr ? 'عرض الموقع التعريفي' : 'View Public Landing'}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isAr ? 'الموقع العام' : 'Landing'}</span>
        </button>

      </div>
    </nav>
  );
}
