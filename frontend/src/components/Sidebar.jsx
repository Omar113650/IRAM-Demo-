import React from 'react';
import { 
  LayoutDashboard, 
  Building, 
  ArrowRightLeft, 
  ShoppingBag, 
  Warehouse, 
  Users, 
  FileSearch, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  TrendingDown,
  MessageSquare,
  Award,
  Layers,
  HardHat,
  Truck,
  Coins,
  LogOut,
  X
} from 'lucide-react';
import { RealEstateIconBox } from './IramLogo';

export default function Sidebar({ 
  currentView, 
  onViewChange, 
  currentRole, 
  language, 
  onLogout,
  isMobileOpen = false,
  onCloseMobile = () => {}
}) {
  const isAr = language === 'ar';
  const isSupplier = currentRole === 'Supplier';

  // Navigation Items for Company Users (Strict RBAC filtering)
  const allCompanyNavItems = [
    {
      id: 'admin',
      labelEn: 'Company Admin & RBAC',
      labelAr: 'إدارة الشركة والصلاحيات',
      icon: LayoutDashboard,
      badge: 'Master',
      roles: ['Company Admin']
    },
    {
      id: 'projects',
      labelEn: currentRole === 'Project Manager' ? 'My Project (Al-Mansoura)' : 'Projects Management',
      labelAr: currentRole === 'Project Manager' ? 'موقعي (كمبوند المنصورة)' : 'إدارة مشاريع الشركة',
      icon: Building,
      badge: currentRole === 'Project Manager' ? 'Assigned' : '3 Sites',
      roles: ['Company Admin', 'Project Manager']
    },
    {
      id: 'site-engineer',
      labelEn: 'Site Daily Execution',
      labelAr: 'تنفيذ الموقع واستهلاك المواد',
      icon: HardHat,
      badge: 'Daily',
      roles: ['Company Admin', 'Site Engineer']
    },
    {
      id: 'transfers',
      labelEn: 'Surplus & Transfers',
      labelAr: 'الفائض والنقل الداخلي',
      icon: ArrowRightLeft,
      highlight: true,
      roles: ['Company Admin', 'Project Manager', 'Procurement Officer', 'Warehouse Officer']
    },
    {
      id: 'waste-prediction',
      labelEn: 'AI Waste Prediction',
      labelAr: 'تنبؤ الهدر بالذكاء الاصطناعي',
      icon: TrendingDown,
      roles: ['Company Admin', 'Project Manager', 'Site Engineer']
    },
    {
      id: 'procurement',
      labelEn: 'Procurement & RFQs',
      labelAr: 'المشتريات وعروض الأسعار',
      icon: ShoppingBag,
      roles: ['Company Admin', 'Procurement Officer']
    },
    {
      id: 'warehouse',
      labelEn: 'Warehouse & Receiving',
      labelAr: 'المخازن والاستلام',
      icon: Warehouse,
      roles: ['Company Admin', 'Warehouse Officer']
    },
    {
      id: 'ocr',
      labelEn: 'AI Document OCR',
      labelAr: 'فحص المستندات OCR',
      icon: FileSearch,
      roles: ['Company Admin', 'Warehouse Officer']
    },
    {
      id: 'equipment',
      labelEn: 'Smart Machinery (Sec 07)',
      labelAr: 'تتبع الآليات والمعدات (07)',
      icon: Truck,
      badge: 'Roadmap',
      roles: ['Company Admin', 'Project Manager', 'Site Engineer']
    },
    {
      id: 'marketplace',
      labelEn: 'Surplus Marketplace',
      labelAr: 'سوق تصريف الفائض',
      icon: Coins,
      badge: 'B2B',
      roles: ['Company Admin', 'Procurement Officer', 'Warehouse Officer']
    },
    {
      id: 'landing',
      labelEn: 'Public Landing Page',
      labelAr: 'الصفحة التعريفية',
      icon: ExternalLink,
      roles: ['Company Admin', 'Project Manager', 'Site Engineer', 'Procurement Officer', 'Warehouse Officer']
    }
  ];

  // Dedicated Navigation Items for Suppliers
  const supplierNavItems = [
    {
      id: 'supplier',
      labelEn: 'My Bids & Contractor Replies',
      labelAr: 'عروضي وردود الشركات',
      icon: MessageSquare,
      badge: 'Live'
    },
    {
      id: 'supplier-rfqs',
      labelEn: 'Open RFQ Invitations',
      labelAr: 'طلبات التوريد المتاحة',
      icon: ShoppingBag
    },
    {
      id: 'landing',
      labelEn: 'Public Portal',
      labelAr: 'الصفحة العامة',
      icon: ExternalLink
    }
  ];

  // Filter items specifically for the currently authenticated role
  const activeItems = isSupplier 
    ? supplierNavItems 
    : allCompanyNavItems.filter(item => item.roles.includes(currentRole));

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
        />
      )}

      <aside className={`
        bg-[#FFFDF9] border-r rtl:border-r-0 rtl:border-l border-[#EAE5DE] select-none shadow-xs
        /* Desktop layout */
        hidden md:flex md:w-64 md:min-h-[calc(100vh-4rem)] md:static md:translate-x-0 md:z-auto md:p-4
        /* Mobile drawer layout */
        fixed top-0 bottom-0 z-50 w-72 sm:w-80 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
        ${isMobileOpen 
          ? 'translate-x-0 shadow-2xl flex' 
          : 'max-md:rtl:translate-x-full max-md:ltr:-translate-x-full max-md:hidden'}
      `}>
        <div>
          {/* Mobile Drawer Header with Logo & Close Button */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EAE5DE] md:hidden">
            <div className="flex items-center gap-2.5">
              <RealEstateIconBox className="w-7 h-7" />
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-wider text-[#26231F] leading-none">IRAM</span>
                <span className="text-[7.5px] font-bold tracking-[0.18em] text-[#E85312] uppercase leading-tight mt-0.5">CONTECH SYSTEMS</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-[#F7F5F1] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Navigation Section */}
          <div className="space-y-1.5">
            <div className="px-3 py-1.5 text-xs font-bold text-[#6E6862] uppercase tracking-wider flex items-center justify-between">
              <span>{isSupplier ? (isAr ? "بوابة الموردين" : "SUPPLIER MODULES") : (isAr ? "الوحدات والأنظمة" : "COMPANY MODULES")}</span>
              <span className="text-[10px] px-2 py-0.5 bg-[#F7F5F1] rounded-md font-bold text-[#26231F] border border-[#EAE5DE]">
                {currentRole}
              </span>
            </div>

            {activeItems.map(item => {
              const Icon = item.icon;
              const active = currentView === item.id || (isSupplier && item.id.startsWith('supplier') && currentView === 'supplier');

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'supplier-rfqs') onViewChange('supplier');
                    else onViewChange(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                    active 
                      ? 'bg-[#E85312] text-white font-bold shadow-xs' 
                      : 'text-[#26231F] hover:bg-[#F7F5F1] hover:text-[#E85312] font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#6E6862]'}`} />
                    <span>{isAr ? item.labelAr : item.labelEn}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-[#F7F5F1] text-[#6E6862] border border-[#EAE5DE]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

        </div>

      {/* Account Info Pill at Bottom */}
      <div className="mt-6 pt-4 border-t border-[#EAE5DE]">
        <div className="p-3 bg-[#F7F5F1] rounded-xl text-[#26231F] border border-[#EAE5DE] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85312] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E85312]" />
              {isSupplier ? "Supplier Network" : "Tenant Isolation"}
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[#E8F1E4] text-[#15803D] border border-[#15803D]/20 rounded-full font-bold">Active</span>
          </div>
          <div className="text-sm font-bold truncate text-[#26231F]">
            {isSupplier ? "Ezz Steel Mills Egypt" : "El-Sewedy Contracting"}
          </div>
          <div className="text-xs text-[#6E6862] font-medium mt-0.5">
            {isSupplier ? "Tier 1 Certified Vendor" : "Multi-Project Enterprise"}
          </div>
        </div>

        {/* Quick Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full mt-2.5 px-3 py-2 rounded-xl border border-[#EAE5DE] hover:border-rose-300 hover:bg-rose-50 text-[#6E6862] hover:text-rose-700 text-xs font-bold transition-all flex items-center justify-between group cursor-pointer"
            title={isAr ? "تسجيل الخروج" : "Sign Out"}
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5 text-[#6E6862] group-hover:text-rose-600 transition-colors" />
              <span>{isAr ? "تسجيل الخروج" : "Sign Out"}</span>
            </div>
            <span className="text-[10px] font-mono text-[#6E6862] group-hover:text-rose-600">IRAM</span>
          </button>
        )}
      </div>

    </aside>
    </>
  );
}
