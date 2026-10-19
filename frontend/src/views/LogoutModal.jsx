import React from 'react';
import { LogOut, X, ShieldCheck, ArrowRight } from 'lucide-react';
import IramLogo from '../components/IramLogo';

export default function LogoutModal({ isOpen, onClose, onConfirmLogout, language, currentRole }) {
  if (!isOpen) return null;
  const isAr = language === 'ar';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container matching Figma Split Cards */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-4xl min-h-[500px] overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors bg-white/80 backdrop-blur-xs shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================== */}
        {/* BRAND VISUAL PANEL (Sunset Tower Crane & Worker Silhouette) */}
        {/* ============================================================== */}
        <div className="hidden md:flex md:w-1/2 bg-slate-950 text-white relative flex-col justify-between p-8 overflow-hidden select-none md:order-2">
          {/* Sunset Construction Yard with Tower Cranes from Figma Screenshot */}
          <img 
            src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80" 
            alt="Tower Crane Silhouette at Sunset" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/25"></div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <IramLogo className="h-8 w-auto" variant="dark" />
          </div>

          {/* Slogan Card matching Figma screenshot */}
          <div className="relative z-10 bg-slate-950/85 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl space-y-2.5">
            <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
              {isAr ? (
                <>
                  توقع النقص. رصد الفائض.<br />
                  <span className="text-[#E85312]">استمرار إنجاز مشاريعك دون توقف.</span>
                </>
              ) : (
                <>
                  Anticipate shortages. Spot surplus.<br />
                  <span className="text-[#E85312]">Keep every project moving.</span>
                </>
              )}
            </h3>
            <p className="text-[11px] text-slate-300 font-medium">
              {isAr 
                ? "يتم حفظ كافة تعديلاتك ومناسيب استهلاك المواد وأذونات الاستلام تلقائياً."
                : "All project material movements, POs and RFQs are securely synced."}
            </p>
          </div>

          {/* Bottom Footer Note */}
          <div className="relative z-10 pt-3 border-t border-white/10 text-[10px] text-slate-400">
            © 2026 IRAM Enterprise SaaS
          </div>
        </div>

        {/* ============================================================== */}
        {/* LOGOUT CONFIRMATION ACTION PANEL */}
        {/* ============================================================== */}
        <div className="flex-1 p-8 sm:p-11 flex flex-col justify-between md:order-1">
          
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 block mb-1">
                {isAr ? "تسجيل الخروج من الجلسة" : "SIGN OUT SESSION"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {isAr ? "هل ترغب في تسجيل الخروج؟" : "Confirm Sign Out"}
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {isAr 
                  ? "سيتم إنهاء جلستك الحالية والعودة إلى البوابة الترحيبية لمنصة IRAM. ستظل جميع بيانات الشركة ومشاريعك محفوظة بأمان."
                  : "You are about to sign out of your active workspace. All company data, RFQs, and stock levels remain encrypted and preserved."}
              </p>
            </div>

            {/* Active Session Info Pill */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">{isAr ? "الحساب الحالي:" : "Current Account:"}</span>
                <span className="font-mono font-bold text-slate-900">{currentRole}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium pt-1 border-t border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isAr ? "تم مزامنة كافة البيانات السحابية بنجاح" : "All cloud data synchronized"}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-slate-100">
            <button
              onClick={onConfirmLogout}
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{isAr ? "تأكيد تسجيل الخروج" : "Yes, Sign Out"}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{isAr ? "إلغاء والعودة للعمل" : "Cancel & Return"}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
