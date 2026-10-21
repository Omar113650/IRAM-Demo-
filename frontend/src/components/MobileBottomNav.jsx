import React from 'react';
import { 
  LayoutDashboard, 
  Building, 
  ArrowRightLeft, 
  ShoppingBag, 
  Warehouse, 
  Menu,
  MessageSquare,
  FileText,
  HardHat,
  Sparkles
} from 'lucide-react';

export default function MobileBottomNav({ 
  currentView, 
  onViewChange, 
  currentRole, 
  language = 'ar',
  onToggleSidebar,
  onOpenAssistant
}) {
  const isAr = language === 'ar';
  const isSupplier = currentRole === 'Supplier';

  if (currentView === 'landing') {
    return null; // On public landing page, let the standard mobile landing header handle it
  }

  // Company primary tabs
  const companyNav = [
    {
      id: 'admin',
      labelAr: 'الرئيسية',
      labelEn: 'Admin',
      icon: LayoutDashboard,
      isActive: currentView === 'admin'
    },
    {
      id: 'projects',
      labelAr: currentRole === 'Project Manager' ? 'موقعي' : 'المشاريع',
      labelEn: currentRole === 'Project Manager' ? 'My Site' : 'Projects',
      icon: currentRole === 'Site Engineer' ? HardHat : Building,
      targetView: currentRole === 'Site Engineer' ? 'site-engineer' : 'projects',
      isActive: currentView === 'projects' || currentView === 'site-engineer'
    },
    {
      id: 'transfers',
      labelAr: 'نقل الفائض',
      labelEn: 'Transfers',
      icon: ArrowRightLeft,
      badge: '38',
      isActive: currentView === 'transfers'
    },
    {
      id: 'procurement',
      labelAr: 'التوريد/المخزن',
      labelEn: 'Supply/WMS',
      icon: currentRole === 'Warehouse Officer' ? Warehouse : ShoppingBag,
      targetView: currentRole === 'Warehouse Officer' ? 'warehouse' : 'procurement',
      isActive: currentView === 'procurement' || currentView === 'warehouse'
    }
  ];

  // Supplier primary tabs
  const supplierNav = [
    {
      id: 'supplier-bids',
      labelAr: 'عروضي',
      labelEn: 'My Bids',
      icon: MessageSquare,
      targetView: 'supplier',
      isActive: currentView === 'supplier'
    },
    {
      id: 'supplier-rfqs',
      labelAr: 'طلبات التوريد',
      labelEn: 'RFQs',
      icon: ShoppingBag,
      targetView: 'supplier',
      isActive: currentView === 'supplier'
    }
  ];

  const activeTabs = isSupplier ? supplierNav : companyNav;

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE5DE] shadow-lg px-2 py-1.5 flex items-center justify-around safe-bottom"
    >
      {activeTabs.map(tab => {
        const Icon = tab.icon;
        const active = tab.isActive;
        const target = tab.targetView || tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onViewChange(target)}
            className={`flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 transition-all relative cursor-pointer ${
              active 
                ? 'text-[#E85312] font-black scale-105' 
                : 'text-[#6E6862] hover:text-[#26231F] font-bold'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 px-1 text-[8.5px] font-black bg-[#E85312] text-white rounded-full leading-none py-0.5">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight truncate max-w-[68px] leading-tight">
              {isAr ? tab.labelAr : tab.labelEn}
            </span>
          </button>
        );
      })}

      {/* Quick AI Trigger on Mobile */}
      {onOpenAssistant && (
        <button
          type="button"
          onClick={onOpenAssistant}
          className="flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 text-[#C59B46] hover:text-[#AA7C11] font-bold cursor-pointer transition-all"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#0F172A] to-[#26231F] flex items-center justify-center text-amber-400 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] tracking-tight leading-tight">
            {isAr ? "الذكاء" : "AI"}
          </span>
        </button>
      )}

      {/* More / Menu Drawer Toggle */}
      <button
        type="button"
        onClick={onToggleSidebar}
        className="flex-1 py-1 px-1 flex flex-col items-center justify-center gap-1 text-[#6E6862] hover:text-[#26231F] font-bold cursor-pointer transition-all"
        title={isAr ? "جميع الأنظمة والقائمة" : "Full Menu"}
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] tracking-tight leading-tight">
          {isAr ? "المزيد" : "Menu"}
        </span>
      </button>
    </nav>
  );
}
