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
  LogOut
} from 'lucide-react';

export default function Sidebar({ currentView, onViewChange, currentRole, language, onLogout }) {
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
    <aside className="w-64 bg-white border-r border-[#CBD5E1] min-h-[calc(100vh-4rem)] flex flex-col justify-between shrink-0 p-4 select-none shadow-xs">
      <div>
        
        {/* Navigation Section */}
        <div className="space-y-1.5">
          <div className="px-3 py-1.5 text-xs font-bold text-[#475569] uppercase tracking-wider flex items-center justify-between">
            <span>{isSupplier ? (isAr ? "بوابة الموردين" : "SUPPLIER MODULES") : (isAr ? "الوحدات والأنظمة" : "COMPANY MODULES")}</span>
            <span className="text-[10px] px-2 py-0.5 bg-[#E2E8F0] rounded-md font-bold text-[#0F172A] border border-[#CBD5E1]">
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
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                  active 
                    ? 'bg-[#E85312] text-white font-bold shadow-xs' 
                    : 'text-[#334155] hover:bg-[#E2E8F0] hover:text-[#0F172A] font-semibold'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-[#475569]'}`} />
                  <span>{isAr ? item.labelAr : item.labelEn}</span>
                </div>

                {item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                    active ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#334155] border border-[#CBD5E1]'
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
      <div className="mt-6 pt-4 border-t border-[#CBD5E1]">
        <div className="p-3 bg-[#EEF2F6] rounded-xl text-[#0F172A] border border-[#CBD5E1] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E85312] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E85312]" />
              {isSupplier ? "Supplier Network" : "Tenant Isolation"}
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] border border-[#15803D]/20 rounded-full font-bold">Active</span>
          </div>
          <div className="text-sm font-bold truncate text-[#0F172A]">
            {isSupplier ? "Ezz Steel Mills Egypt" : "El-Sewedy Contracting"}
          </div>
          <div className="text-xs text-[#475569] font-medium mt-0.5">
            {isSupplier ? "Tier 1 Certified Vendor" : "Multi-Project Enterprise"}
          </div>
        </div>

        {/* Quick Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full mt-2.5 px-3 py-2 rounded-xl border border-[#CBD5E1] hover:border-rose-300 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-bold transition-all flex items-center justify-between group cursor-pointer"
            title={isAr ? "تسجيل الخروج" : "Sign Out"}
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 transition-colors" />
              <span>{isAr ? "تسجيل الخروج" : "Sign Out"}</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-rose-600">IRAM</span>
          </button>
        )}
      </div>

    </aside>
  );
}
