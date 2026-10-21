import React, { useState } from 'react';
import { 
  Building2, 
  Bell, 
  Search, 
  Globe, 
  ChevronDown, 
  UserCheck, 
  Sparkles, 
  Truck,
  Building,
  ShieldAlert,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import IramLogo, { RealEstateIconBox } from './IramLogo';

export default function Navbar({ 
  currentRole, 
  onRoleChange, 
  language, 
  onLanguageToggle, 
  onOpenAssistant,
  onLogout,
  onOpenLanding,
  onToggleMobileSidebar,
  unreadAlertsCount = 3
}) {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const companyRoles = [
    { id: 'Company Admin', labelEn: 'Company Admin', labelAr: 'مسؤول الشركة الرئيسي', desc: 'All Projects & Management' },
    { id: 'Project Manager', labelEn: 'Project Manager', labelAr: 'مدير المشروع', desc: 'Scoped to Al-Mansoura Site' },
    { id: 'Procurement Officer', labelEn: 'Procurement Officer', labelAr: 'مسؤول المشتريات', desc: 'RFQs & Supplier Decision' },
    { id: 'Site Engineer', labelEn: 'Site Engineer', labelAr: 'مهندس الموقع', desc: 'Field Waste & Consumption' },
    { id: 'Warehouse Officer', labelEn: 'Warehouse Officer', labelAr: 'مسؤول المخزن', desc: 'Material Receiving & Surplus' }
  ];

  const supplierRoles = [
    { id: 'Supplier', labelEn: 'Supplier Partner', labelAr: 'بوابة الموردين المستقلة', desc: 'Quotations & PO Awards' }
  ];

  const notifications = [
    {
      id: 1,
      titleEn: "Critical Shortage Alert: Steel Rebar 16mm",
      titleAr: "تنبيه نقص حرج: حديد تسليح 16 مم",
      descEn: "Al-Mansoura Complex has only 5.7 days of supply remaining.",
      descAr: "كمبوند المنصورة يمتلك مخزون يكفي 5.7 أيام فقط.",
      time: "10m ago",
      type: "alert"
    },
    {
      id: 2,
      titleEn: "Surplus Reallocation Match Found",
      titleAr: "تم العثور على تطابق لنقل فائض مواد",
      descEn: "90 Tons Steel surplus in New Capital matches Al-Mansoura requirement. Net saving: $45,550.",
      descAr: "فائض 90 طن ببرج العاصمة يطابق احتياج المنصورة. توفير صافي: $45,550.",
      time: "35m ago",
      type: "success"
    },
    {
      id: 3,
      titleEn: "Supplier Quotation Decision Recorded",
      titleAr: "تم اعتماد عرض سعر المورد",
      descEn: "Misr Beni Suef awarded PO-0043 for Portland Cement.",
      descAr: "تم إرسال أمر الشراء PO-0043 لشركة مصر بني سويف للأسمنت.",
      time: "1h ago",
      type: "info"
    }
  ];

  const isAr = language === 'ar';
  const isSupplier = currentRole === 'Supplier';

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 border-b border-[#EAE5DE] shadow-xs backdrop-blur-md text-[#26231F]">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo + Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="md:hidden p-1.5 -ml-1 rtl:-ml-0 rtl:-mr-1 rounded-lg text-[#26231F] hover:bg-[#F7F5F1] border border-[#EAE5DE] cursor-pointer"
            aria-label="Toggle mobile menu"
            title={isAr ? "فتح القائمة" : "Open Menu"}
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenLanding}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group focus:outline-hidden text-left rtl:text-right"
            title={isAr ? "العودة إلى الصفحة الرئيسية للموقع" : "Return to Home Page"}
          >
            <RealEstateIconBox className="w-7 h-7 sm:w-8 sm:h-8" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1 leading-none">
                <span className="text-[15px] sm:text-[16px] font-black tracking-wider text-[#26231F] leading-none">
                  IRAM
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4] animate-pulse"></span>
              </div>
              <span className="text-[7.5px] sm:text-[8px] font-bold tracking-[0.2em] text-[#E85312] uppercase leading-tight mt-0.5">
                CONTECH SYSTEMS
              </span>
            </div>
          </button>
        </div>

        {/* Global Search Bar (Warm Theme) */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-[#6E6862] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={isAr ? "بحث عن مادة، كود مشروع، إذن استلام، أو تنبيه فائض..." : "Search materials, SKU, project codes, RFQs..."}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#F7F5F1] text-[#26231F] placeholder-[#6E6862] border border-[#EAE5DE] rounded-lg focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] transition-all font-medium"
            />
          </div>
        </div>

        {/* Action Controls & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Assistant Quick Trigger */}
          <button 
            onClick={onOpenAssistant}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-[#E85312] to-[#FF6B2B] hover:from-[#CC4509] hover:to-[#E85312] text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
            title="Ask IRAM AI Assistant"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-12 transition-transform animate-soft-pulse" />
            <span className="hidden sm:inline">{isAr ? "مساعد الـ AI" : "AI Assistant"}</span>
          </button>

          {/* Language Toggle */}
          <button 
            onClick={onLanguageToggle}
            className="px-2.5 py-1.5 text-[#6E6862] hover:text-[#26231F] hover:bg-[#EAE5DE]/40 border border-[#EAE5DE] rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#E85312]" />
            <span className="uppercase text-[11px] font-bold">{language}</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-[#6E6862] hover:text-[#26231F] hover:bg-[#F7F5F1] border border-[#EAE5DE] rounded-md transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              {unreadAlertsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E85312] rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#EAE5DE] p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#EAE5DE]">
                  <h4 className="text-xs font-bold text-[#26231F]">
                    {isAr ? "التنبيهات والإشعارات" : "System Alerts & Notifications"}
                  </h4>
                  <span className="text-[11px] text-[#E85312] font-semibold cursor-pointer">
                    {isAr ? "تحديد الكل كمقروء" : "Mark all read"}
                  </span>
                </div>
                <div className="divide-y divide-[#E2E8F0] max-h-72 overflow-y-auto mt-2">
                  {notifications.map(n => (
                    <div key={n.id} className="py-2.5 px-2 hover:bg-[#F7F9FB] rounded-lg transition-colors text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0F172A]">
                          {isAr ? n.titleAr : n.titleEn}
                        </span>
                        <span className="text-[10px] text-[#94A3B8]">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                        {isAr ? n.descAr : n.descEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-[#CBD5E1]"></div>

          {/* Persona Switcher (Cleanly Separating Company from Supplier) */}
          <div className="relative">
            <button 
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-[#CBD5E1] hover:border-slate-400 bg-[#EEF2F6] hover:bg-[#E2E8F0] transition-all text-left cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#E85312] text-white flex items-center justify-center font-bold text-xs">
                {isSupplier ? "SUP" : "CC"}
              </div>
              <div className="hidden lg:block">
                <div className="text-xs font-bold text-[#0F172A] leading-tight">
                  {isSupplier ? "Ezz Steel Mills Egypt" : "El-Sewedy Contracting"}
                </div>
                <div className="text-[10px] font-bold text-[#E85312] flex items-center gap-1">
                  <UserCheck className="w-2.5 h-2.5" />
                  {currentRole}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#475569]" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-dropdown border border-[#CBD5E1] p-2.5 z-50 animate-in fade-in zoom-in-95">
                
                {/* 1. Company Roles Section */}
                <div className="px-2 py-1 text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#E85312]" />
                  <span>{isAr ? "أدوار شركة المقاولات (Company RBAC)" : "Contractor Roles (RBAC)"}</span>
                </div>
                {companyRoles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onRoleChange(r.id);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      currentRole === r.id 
                        ? 'bg-[#FEECE5] text-[#E85312] font-semibold' 
                        : 'text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div>
                      <span className="block">{isAr ? r.labelAr : r.labelEn}</span>
                      <span className="text-[10px] text-[#64748B] font-normal">{r.desc}</span>
                    </div>
                    {currentRole === r.id && <span className="w-1.5 h-1.5 rounded-full bg-[#E85312]"></span>}
                  </button>
                ))}

                {/* 2. Supplier Section */}
                <div className="mt-2 pt-2 border-t border-[#E2E8F0] px-2 py-1 text-[10px] font-extrabold text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-[#15803D]" />
                  <span>{isAr ? "بوابة مجتمع الموردين (Supplier Portal)" : "Supplier Portal (Independent)"}</span>
                </div>
                {supplierRoles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => {
                      onRoleChange(r.id);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                      currentRole === r.id 
                        ? 'bg-[#FEECE5] text-[#E85312]' 
                        : 'text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <div>
                      <span className="block font-bold">{isAr ? r.labelAr : r.labelEn}</span>
                      <span className={`text-[10px] font-normal ${currentRole === r.id ? 'text-[#E85312]' : 'text-[#64748B]'}`}>
                        {r.desc}
                      </span>
                    </div>
                    {currentRole === r.id && <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]"></span>}
                  </button>
                ))}

                {/* 3. Global Sign Out Action */}
                <div className="mt-2 pt-2 border-t border-[#CBD5E1]">
                  <button
                    onClick={() => {
                      setRoleMenuOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold text-rose-700 hover:bg-rose-50 flex items-center justify-between transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-3.5 h-3.5 text-rose-600 group-hover:-translate-x-0.5 transition-transform" />
                      <span>{isAr ? "تسجيل الخروج من المنظومة" : "Sign Out from IRAM"}</span>
                    </div>
                    <span className="text-[10px] text-rose-500 font-mono">Exit</span>
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
