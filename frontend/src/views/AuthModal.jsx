import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  User, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Briefcase,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowLeft,
  AlertCircle,
  Phone,
  MapPin,
  FileText
} from 'lucide-react';
import IramLogo from '../components/IramLogo';

/**
 * AuthModal & Split-Screen Authentication Experience
 * Pixel-perfect implementation matching user's uploaded Figma sheets:
 * 1. Sign In ("Never Short. Never Stuck. Always Valued.")
 * 2. Step 1 of 2: Set up your company
 * 3. Step 2 of 2: Create your admin account (with password strength)
 * 4. Join IRAM Supplier Community (Dedicated onboarding)
 * 5. Forgot Password
 * 6. 6-Digit Email Verification (OTP with individual boxes & resend timer)
 * 7. Create New Password (with 4-point security criteria)
 */
export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login', 
  onLoginSuccess, 
  language 
}) {
  const isAr = language === 'ar';

  // Current view mode: 'login' | 'company-step-1' | 'company-step-2' | 'supplier-join' | 'forgot-password' | 'email-verify' | 'reset-password'
  const [authView, setAuthView] = useState(initialMode === 'register' ? 'company-step-1' : 'login');
  const isRegisterFlow = authView === 'company-step-1' || authView === 'company-step-2' || authView === 'supplier-join';
  
  // Show / Hide password state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showEmployeeRoles, setShowEmployeeRoles] = useState(false);

  // --- Sign In State ---
  const [loginEmail, setLoginEmail] = useState('admin@elsewedy-cc.com');
  const [loginPassword, setLoginPassword] = useState('Password123#');
  const [loginError, setLoginError] = useState(null);

  // --- Company Registration State (Step 1 of 2) ---
  const [companyName, setCompanyName] = useState('Al-Bayan Contracting & Engineering');
  const [companyType, setCompanyType] = useState('General Contractor');
  const [taxRegNumber, setTaxRegNumber] = useState('300489214700003');
  const [crNumber, setCrNumber] = useState('1010482910');
  const [companyAddress, setCompanyAddress] = useState('New Cairo, Egypt');
  const [companyPhone, setCompanyPhone] = useState('+20 10 1234 5678');

  // --- Admin Account State (Step 2 of 2) ---
  const [adminFullName, setAdminFullName] = useState('Eng. Ahmed Mahmoud');
  const [adminWorkEmail, setAdminWorkEmail] = useState('ahmed@albayan-cc.com');
  const [adminPhone, setAdminPhone] = useState('+20 10 9876 5432');
  const [adminPassword, setAdminPassword] = useState('Bayan2026Secure#');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('Bayan2026Secure#');

  // --- Supplier Community State ---
  const [supplierCompanyName, setSupplierCompanyName] = useState('Apex Steel Supplies Co.');
  const [supplierContactPerson, setSupplierContactPerson] = useState('Tarek Ezzat');
  const [supplierWorkEmail, setSupplierWorkEmail] = useState('sales@apexsteel.com');
  const [supplierPhone, setSupplierPhone] = useState('+20 100 000 0000');
  const [supplierCategory, setSupplierCategory] = useState('Metals & Structural Steel');
  const [supplierPassword, setSupplierPassword] = useState('ApexSteel2026#');
  const [supplierConfirmPassword, setSupplierConfirmPassword] = useState('ApexSteel2026#');

  // --- Password Recovery & OTP State ---
  const [recoveryEmail, setRecoveryEmail] = useState('ahmed@company.com');
  const [otpValues, setOtpValues] = useState(['4', '8', '1', '6', '8', '2']);
  const [otpError, setOtpError] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  if (!isOpen) return null;

  // Calculate password strength
  const getPasswordStrength = (pass) => {
    if (!pass || pass.length < 4) return { label: 'Weak', score: 1, color: 'bg-rose-500', width: '25%' };
    if (pass.length < 8) return { label: 'Medium', score: 2, color: 'bg-amber-500', width: '50%' };
    const hasUpper = /[A-Z]/.test(pass);
    const hasNum = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    if (hasUpper && hasNum && hasSpecial) return { label: 'Strong', score: 4, color: 'bg-emerald-500', width: '100%' };
    return { label: 'Medium', score: 3, color: 'bg-amber-500', width: '75%' };
  };

  const strength = getPasswordStrength(authView === 'reset-password' ? newPassword : adminPassword);

  // OTP Input Key Handling
  const handleOtpChange = (index, val) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = val;
    setOtpValues(newOtp);
    setOtpError(false);
    // Auto advance
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Sign In Handler
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const emailLower = loginEmail.trim().toLowerCase();
    let role = 'Company Admin';
    let type = 'COMPANY';

    if (emailLower.includes('sales@') || emailLower.includes('supplier') || emailLower.includes('mbs') || emailLower.includes('ezz')) {
      role = 'Supplier';
      type = 'SUPPLIER';
    } else if (emailLower.includes('pm') || emailLower.includes('tamer')) {
      role = 'Project Manager';
    } else if (emailLower.includes('site') || emailLower.includes('fathy')) {
      role = 'Site Engineer';
    } else if (emailLower.includes('procurement') || emailLower.includes('kareem')) {
      role = 'Procurement Officer';
    } else if (emailLower.includes('warehouse') || emailLower.includes('hassan')) {
      role = 'Warehouse Officer';
    }

    onLoginSuccess(role, type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container matching Figma 1920w Light & Split Cards (Expanded Executive Size) */}
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 w-full max-w-5xl xl:max-w-6xl min-h-[660px] max-h-[94vh] overflow-hidden flex flex-col md:flex-row relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors bg-white/80 backdrop-blur-xs shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================== */}
        {/* BRAND VISUAL HERO PANEL (Matches Figma Screenshot 2 & Register) */}
        {/* ============================================================== */}
        <div className={`hidden md:flex md:w-5/12 bg-slate-950 text-white relative flex-col justify-between p-8 overflow-hidden select-none transition-all duration-300 ${
          isRegisterFlow ? 'md:order-1' : 'md:order-2'
        }`}>
          {/* Dynamic Photo Matching Figma Canvas */}
          {isRegisterFlow ? (
            /* Concrete Pipes, Precast Slabs & Staging Yard (For Register / Create Account) */
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=1200&auto=format&fit=crop&q=85" 
              alt="Concrete Pipes and Staging Yard" 
              className="absolute inset-0 w-full h-full object-cover opacity-75"
            />
          ) : (
            /* Sunset Tower Crane & Worker Silhouette (For Sign In / Login) */
            <img 
              src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=1200&auto=format&fit=crop&q=80" 
              alt="Tower Crane Silhouette at Sunset" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-[#0F172A]/20"></div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <IramLogo className="h-8 w-auto" variant="dark" />
          </div>

          {/* Dynamic Value Proposition Card matching Figma screenshot */}
          {isRegisterFlow ? (
            /* Register Card Variant */
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                {isAr ? "إنشاء بيئة عمل سحابية جديدة" : "New Enterprise Workspace"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight text-white">
                {isAr ? "طريقة أوضح وأذكى لإدارة البناء." : "A clearer way to build."}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                {isAr 
                  ? "ربط التخطيط الهندسي، المشتريات، المخزون، والاستهلاك الفعلي عبر كافة مواقع عمل شركتك."
                  : "Connect planning, procurement, inventory, and site consumption across all company projects."}
              </p>
            </div>
          ) : (
            /* Login Card Variant (Anticipate shortages. Spot surplus. Keep every project moving.) */
            <div className="relative z-10 bg-slate-950/85 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] font-bold text-amber-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                {isAr ? "منظومة إدارية متصلة" : "Intelligent Lifecycle Platform"}
              </div>

              <h2 className="text-xl sm:text-2xl font-black leading-tight text-white">
                {isAr ? (
                  <>توقع النقص. رصد الفائض.<br /><span className="text-[#E85312]">استمرار إنجاز مشاريعك دون توقف.</span></>
                ) : (
                  <>Anticipate shortages. Spot surplus.<br /><span className="text-[#E85312]">Keep every project moving.</span></>
                )}
              </h2>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-mono text-slate-300">
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10">Predictive Shortages</span>
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10">Smart Procurement</span>
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/10">Surplus Reallocation</span>
              </div>
            </div>
          )}

          {/* Bottom Footer Note */}
          <div className="relative z-10 pt-4 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
            <span>© 2026 IRAM Enterprise SaaS</span>
            <span className="font-mono text-emerald-400">ISO 27001 Secure</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FORM PANEL */}
        {/* ============================================================== */}
        <div className={`flex-1 p-7 sm:p-11 overflow-y-auto transition-all duration-300 ${
          isRegisterFlow ? 'md:order-2' : 'md:order-1'
        }`}>
          
          {/* ------------------------------------------------------------ */}
          {/* 1. SIGN IN SCREEN (Figma: "Never Short. Never Stuck. Always Valued.") */}
          {/* ------------------------------------------------------------ */}
          {authView === 'login' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">
                  {isAr ? "أهلاً بك مجدداً" : "WELCOME BACK"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Never Short. Never Stuck. <br />
                  <span className="text-[#E85312]">Always Valued.</span>
                </h2>
                <p className="text-sm text-slate-500 mt-1.5">
                  {isAr ? "قرارات ذكية لمواد البناء لكل مشروع من مشاريعك." : "Smarter material decisions for every project."}
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Account Type Fast Switcher */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#EEF2F6] rounded-xl border border-[#CBD5E1]">
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('admin@elsewedy-cc.com');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    !loginEmail.includes('sales') && !loginEmail.includes('ezz') && !loginEmail.includes('supplier')
                      ? 'bg-white text-[#0F172A] shadow-xs border border-[#CBD5E1]'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  <span>👑 {isAr ? "صاحب شركة مقاولات" : "Company Owner"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginEmail('sales@ezzsteel.com');
                  }}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginEmail.includes('sales') || loginEmail.includes('ezz') || loginEmail.includes('supplier')
                      ? 'bg-[#0F172A] text-amber-400 shadow-xs'
                      : 'text-[#475569] hover:text-[#0F172A]'
                  }`}
                >
                  <span>🚚 {isAr ? "مورد معتمد (Supplier)" : "Verified Supplier"}</span>
                </button>
              </div>

              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {isAr ? "البريد الإلكتروني للعمل" : "Work email"}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email" 
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {isAr ? "كلمة المرور" : "Password"}
                    </label>
                    <button 
                      type="button"
                      onClick={() => setAuthView('forgot-password')}
                      className="text-xs font-medium text-[#E85312] hover:text-[#CC490F] transition-colors"
                    >
                      {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-[#94A3B8] focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{isAr ? "تسجيل الدخول" : "Sign in"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Navigation Options */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-slate-500 font-medium">
                  {isAr ? "ليس لديك حساب؟" : "Don't have an account?"}
                </span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setAuthView('company-step-1')}
                    className="font-bold text-[#E85312] hover:underline"
                  >
                    {isAr ? "إنشاء شركة جديدة" : "Register Company"}
                  </button>
                  <span className="text-slate-300">•</span>
                  <button 
                    onClick={() => setAuthView('supplier-join')}
                    className="font-bold text-slate-800 hover:text-[#E85312] transition-colors"
                  >
                    {isAr ? "انضمام كمورد" : "Join as Supplier"}
                  </button>
                </div>
              </div>

              {/* Primary Dual Account Selector: Company Contractor vs Verified Supplier */}
              <div className="pt-5 border-t border-slate-100 space-y-3">
                <div className="text-center">
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    {isAr ? "الدخول المباشر بحسابات المنظومة الأساسية" : "Direct Access By Primary Account Type"}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {isAr 
                      ? "الحسابات مقسمة أساساً إلى: صاحب الشركة، والمورد المعتمد" 
                      : "The system is divided into two primary accounts: Company Contractor & Verified Supplier"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Account 1: Company Contractor Owner */}
                  <div 
                    onClick={() => {
                      setLoginEmail('admin@elsewedy-cc.com');
                      onLoginSuccess('Company Admin', 'COMPANY');
                      onClose();
                    }}
                    className="p-4 border-2 border-slate-200 hover:border-[#E85312] rounded-2xl bg-gradient-to-b from-white to-orange-50/30 hover:shadow-md transition-all cursor-pointer group text-right"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black text-slate-900 group-hover:text-[#E85312] transition-colors flex items-center gap-1.5">
                        <span className="text-base">👑</span>
                        <span>{isAr ? "حساب صاحب الشركة / المقاول" : "Company Owner (Contractor)"}</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-[#E85312]">
                        Master
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {isAr 
                        ? "يتحكم في المنظومة كاملة، يضيف المشاريع، ويعين صلاحيات فريق العمل (PM، مهندس الموقع، المشتريات، المخازن)." 
                        : "Creates construction projects and manages team roles per project."}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-slate-400">admin@elsewedy-cc.com</div>
                  </div>

                  {/* Account 2: Verified Supplier */}
                  <div 
                    onClick={() => {
                      setLoginEmail('sales@ezzsteel.com');
                      onLoginSuccess('Supplier', 'SUPPLIER');
                      onClose();
                    }}
                    className="p-4 border-2 border-slate-900 hover:border-amber-500 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 text-white hover:shadow-md transition-all cursor-pointer group text-right"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-black text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                        <span className="text-base">🚚</span>
                        <span>{isAr ? "بوابة المورد المعتمد" : "Verified Supplier Portal"}</span>
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Vendor
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {isAr 
                        ? "بوابة مستقلة للمورد لتقديم عروض الأسعار المفصلة، ومتابعة قرارات المقاولين وأوامر التوريد المعتمدة." 
                        : "Receives RFQs, submits detailed binding quotations, and tracks PO awards."}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-slate-400">sales@ezzsteel.com</div>
                  </div>
                </div>

                {/* Sub-Roles Created by Company Owner (Collapsible Drawer for Testing) */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowEmployeeRoles(!showEmployeeRoles)}
                    className="w-full py-2.5 px-3 text-center text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{isAr ? "⚙️ حسابات موظفي الشركة (المُنشأة والمُدارة بواسطة صاحب الشركة)" : "⚙️ Company Internal Roles (Created & Assigned by Owner)"}</span>
                    <span className="text-[10px]">{showEmployeeRoles ? '▲ إخفاء' : '▼ استعراض للتجربة'}</span>
                  </button>

                  {showEmployeeRoles && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 animate-in fade-in">
                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail('pm.tamer@elsewedy-cc.com');
                          onLoginSuccess('Project Manager', 'COMPANY');
                          onClose();
                        }}
                        className="p-2.5 border border-slate-200 hover:border-[#E85312] rounded-xl text-right bg-white hover:bg-orange-50/30 transition-all cursor-pointer"
                      >
                        <span className="font-bold text-[11px] text-slate-900 block truncate">🏗️ مدير المشروع</span>
                        <span className="text-[9px] text-slate-400 block truncate">مجمع المنصورة</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail('site.fathy@elsewedy-cc.com');
                          onLoginSuccess('Site Engineer', 'COMPANY');
                          onClose();
                        }}
                        className="p-2.5 border border-slate-200 hover:border-[#E85312] rounded-xl text-right bg-white hover:bg-orange-50/30 transition-all cursor-pointer"
                      >
                        <span className="font-bold text-[11px] text-slate-900 block truncate">👷 مهندس الموقع</span>
                        <span className="text-[9px] text-slate-400 block truncate">استهلاك وصب</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail('procurement@elsewedy-cc.com');
                          onLoginSuccess('Procurement Officer', 'COMPANY');
                          onClose();
                        }}
                        className="p-2.5 border border-slate-200 hover:border-[#E85312] rounded-xl text-right bg-white hover:bg-orange-50/30 transition-all cursor-pointer"
                      >
                        <span className="font-bold text-[11px] text-slate-900 block truncate">📦 المشتريات</span>
                        <span className="text-[9px] text-slate-400 block truncate">مقارنة العروض والـ AI</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail('warehouse@elsewedy-cc.com');
                          onLoginSuccess('Warehouse Officer', 'COMPANY');
                          onClose();
                        }}
                        className="p-2.5 border border-slate-200 hover:border-[#E85312] rounded-xl text-right bg-white hover:bg-orange-50/30 transition-all cursor-pointer"
                      >
                        <span className="font-bold text-[11px] text-slate-900 block truncate">🏭 أمين المخزن</span>
                        <span className="text-[9px] text-slate-400 block truncate">استلام وحصر الفائض</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 2. COMPANY SETUP (Step 1 of 2 - Matches Figma Image 2 & 5) */}
          {/* ------------------------------------------------------------ */}
          {authView === 'company-step-1' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E85312] text-white flex items-center justify-center text-[10px] font-black">1</span>
                  <span className="text-xs font-black text-slate-900">Company</span>
                </div>
                <div className="flex-1 h-0.5 bg-slate-200 mx-3"></div>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-[10px] font-bold">2</span>
                  <span className="text-xs font-medium">Admin Account</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#E85312] uppercase">Step 1 of 2</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {isAr ? "بيانات الشركة والمقاول (Set up your company)" : "Set up your company"}
                </h3>
                <p className="text-xs text-slate-500">
                  Create your company workspace on IRAM to start collaborating.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setAuthView('company-step-2'); }} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Al-Bayan Contracting & Engineering"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company type *
                  </label>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                  >
                    <option>General Contractor</option>
                    <option>Infrastructure & Heavy Civil</option>
                    <option>Commercial Real Estate Developer</option>
                    <option>MEP & Specialty Contractor</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tax registration number *
                    </label>
                    <input 
                      type="text"
                      required
                      value={taxRegNumber}
                      onChange={(e) => setTaxRegNumber(e.target.value)}
                      placeholder="Enter tax registration"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Commercial registration number *
                    </label>
                    <input 
                      type="text"
                      required
                      value={crNumber}
                      onChange={(e) => setCrNumber(e.target.value)}
                      placeholder="Enter commercial registration"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company address (Optional)
                    </label>
                    <input 
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="e.g. New Cairo, Egypt"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Company phone number *
                    </label>
                    <input 
                      type="text"
                      required
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                      placeholder="e.g. +20 10 1234 5678"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center pt-2 text-xs text-slate-500">
                Already registered?{' '}
                <button onClick={() => setAuthView('login')} className="font-bold text-[#E85312] hover:underline">
                  Sign in
                </button>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 3. ADMIN ACCOUNT (Step 2 of 2 - Matches Figma Image 2 & 5) */}
          {/* ------------------------------------------------------------ */}
          {authView === 'company-step-2' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-black">✓</span>
                  <span className="text-xs font-bold">Company</span>
                </div>
                <div className="flex-1 h-0.5 bg-[#E85312] mx-3"></div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#E85312] text-white flex items-center justify-center text-[10px] font-black">2</span>
                  <span className="text-xs font-black text-slate-900">Admin Account</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#E85312] uppercase">Step 2 of 2</span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  {isAr ? "حساب مسؤول الشركة (Create your admin account)" : "Create your admin account"}
                </h3>
                <p className="text-xs text-slate-500">
                  Set up the account that will manage your company workspace.
                </p>
              </div>

              <form onSubmit={(e) => { 
                e.preventDefault(); 
                onLoginSuccess('Company Admin', 'COMPANY'); 
                onClose(); 
              }} className="space-y-3">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={adminFullName}
                    onChange={(e) => setAdminFullName(e.target.value)}
                    placeholder="e.g. Ahmed Mahmoud"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work email *
                    </label>
                    <input 
                      type="email"
                      required
                      value={adminWorkEmail}
                      onChange={(e) => setAdminWorkEmail(e.target.value)}
                      placeholder="e.g. ahmed@company.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone number *
                    </label>
                    <input 
                      type="text"
                      required
                      value={adminPhone}
                      onChange={(e) => setAdminPhone(e.target.value)}
                      placeholder="e.g. +20 10 1234 5678"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Password *</label>
                    <span className="text-[10px] font-bold text-slate-500">
                      Strength: <strong className={strength.score >= 3 ? 'text-emerald-600' : 'text-amber-600'}>{strength.label}</strong>
                    </span>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {/* Dynamic Strength Bar */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className={`${strength.color} h-full transition-all`} style={{ width: strength.width }}></div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Confirm password *
                  </label>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={adminConfirmPassword}
                    onChange={(e) => setAdminConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthView('company-step-1')}
                    className="px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create admin account</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 4. SUPPLIER COMMUNITY ONBOARDING (Matches Figma Image 2) */}
          {/* ------------------------------------------------------------ */}
          {authView === 'supplier-join' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">
                  {isAr ? "مجتمع موردي مواد البناء" : "SUPPLIER NETWORK"}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-0.5">
                  Join IRAM Supplier Community
                </h3>
                <p className="text-xs text-slate-500">
                  Create your supplier account and connect with construction companies looking for the materials you provide.
                </p>
              </div>

              <form onSubmit={(e) => { 
                e.preventDefault(); 
                onLoginSuccess('Supplier', 'SUPPLIER'); 
                onClose(); 
              }} className="space-y-3">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={supplierCompanyName}
                    onChange={(e) => setSupplierCompanyName(e.target.value)}
                    placeholder="e.g. Apex Steel Supplies Co."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact person name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={supplierContactPerson}
                    onChange={(e) => setSupplierContactPerson(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Work email *
                    </label>
                    <input 
                      type="email"
                      required
                      value={supplierWorkEmail}
                      onChange={(e) => setSupplierWorkEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone number *
                    </label>
                    <input 
                      type="text"
                      required
                      value={supplierPhone}
                      onChange={(e) => setSupplierPhone(e.target.value)}
                      placeholder="+20 100 000 0000"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Material Category *
                  </label>
                  <select
                    value={supplierCategory}
                    onChange={(e) => setSupplierCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option>Metals & Structural Steel</option>
                    <option>Cement & Aggregates</option>
                    <option>Ready-Mix Concrete</option>
                    <option>Pipes & Drainage Systems</option>
                    <option>Finishing, Marble & Tiles</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                    <input 
                      type="password"
                      required
                      value={supplierPassword}
                      onChange={(e) => setSupplierPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm password *</label>
                    <input 
                      type="password"
                      required
                      value={supplierConfirmPassword}
                      onChange={(e) => setSupplierConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Create supplier account</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </form>

              <div className="text-center pt-2 text-xs text-slate-500">
                Already part of the network?{' '}
                <button onClick={() => setAuthView('login')} className="font-bold text-[#E85312] hover:underline">
                  Sign in
                </button>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 5. FORGOT PASSWORD (Matches Figma Image 2 & 3) */}
          {/* ------------------------------------------------------------ */}
          {authView === 'forgot-password' && (
            <div className="space-y-4 animate-in fade-in duration-200 max-w-sm mx-auto text-center py-6">
              
              <div className="w-12 h-12 rounded-xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                {isAr ? "نسيت كلمة المرور؟" : "Forgot your password?"}
              </h3>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter your work email and we'll send you a verification code to reset your password.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); setAuthView('email-verify'); }} className="space-y-4 pt-2">
                <div className="text-left">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                  <input 
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs"
                >
                  Send Verification Code
                </button>
              </form>

              <div className="pt-4 text-xs text-slate-500">
                Remember your password?{' '}
                <button onClick={() => setAuthView('login')} className="font-bold text-[#E85312] hover:underline">
                  Sign in
                </button>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 6. EMAIL VERIFICATION OTP (Matches Figma Image 2 & 3) */}
          {/* ------------------------------------------------------------ */}
          {authView === 'email-verify' && (
            <div className="space-y-4 animate-in fade-in duration-200 max-w-sm mx-auto text-center py-4">
              
              <div className="w-12 h-12 rounded-xl bg-[#FEECE5] text-[#E85312] flex items-center justify-center mx-auto mb-2">
                <Mail className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                Check your email
              </h3>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                We sent a 6-digit verification code to <br />
                <strong className="text-slate-900 font-mono">{recoveryEmail}</strong>
              </p>

              {otpError && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center justify-center gap-1.5 animate-in shake">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>The code you entered is invalid or has expired.</span>
                </div>
              )}

              {/* 6 Individual Digit Boxes */}
              <div className="flex justify-center gap-2 pt-2">
                {otpValues.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-11 h-12 text-center text-lg font-black font-mono border-2 rounded-lg focus:outline-hidden transition-all ${
                      otpError 
                        ? 'border-rose-400 bg-rose-50/30 text-rose-700' 
                        : digit 
                        ? 'border-[#E85312] bg-[#FEECE5]/30 text-slate-900' 
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  />
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    if (otpValues.join('').length === 6) {
                      setAuthView('reset-password');
                    } else {
                      setOtpError(true);
                    }
                  }}
                  className="w-full py-3 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs"
                >
                  Verify Code
                </button>
              </div>

              <div className="text-xs text-slate-500 pt-2">
                Didn't receive the code?{' '}
                <button 
                  onClick={() => alert("Verification code re-sent to " + recoveryEmail)}
                  className="font-bold text-[#E85312] hover:underline"
                >
                  Resend code (45s)
                </button>
              </div>

              <div className="pt-2">
                <button onClick={() => setAuthView('login')} className="text-xs text-slate-400 hover:text-slate-600">
                  ← Back to Sign in
                </button>
              </div>

            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 7. CREATE NEW PASSWORD (Matches Figma Image 2 & 3) */}
          {/* ------------------------------------------------------------ */}
          {authView === 'reset-password' && (
            <div className="space-y-4 animate-in fade-in duration-200 max-w-sm mx-auto py-4">
              
              <div className="text-center">
                <h3 className="text-2xl font-black text-slate-900">
                  Create a new password
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Set a new secure password for your IRAM account.
                </p>
              </div>

              <form onSubmit={(e) => { 
                e.preventDefault(); 
                alert("Password reset successfully! Please sign in with your new password."); 
                setAuthView('login'); 
              }} className="space-y-3">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">New Password *</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter your new password"
                      className="w-full pl-3 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                  <input 
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#E85312] focus:bg-white"
                  />
                </div>

                {/* 4-Point Criteria List matching Figma screenshot */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] space-y-1.5 text-slate-600">
                  <span className="font-bold text-slate-800 block text-[10px] uppercase">Password Strength Requirements:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <span className={`flex items-center gap-1 ${newPassword.length >= 8 ? 'text-emerald-600 font-bold' : ''}`}>
                      ✓ At least 8 characters
                    </span>
                    <span className={`flex items-center gap-1 ${/[A-Z]/.test(newPassword) ? 'text-emerald-600 font-bold' : ''}`}>
                      ✓ One uppercase letter
                    </span>
                    <span className={`flex items-center gap-1 ${/[0-9]/.test(newPassword) ? 'text-emerald-600 font-bold' : ''}`}>
                      ✓ One number
                    </span>
                    <span className={`flex items-center gap-1 ${/[^A-Za-z0-9]/.test(newPassword) ? 'text-emerald-600 font-bold' : ''}`}>
                      ✓ One special character
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#E85312] hover:bg-[#CC490F] text-white font-medium text-xs shadow-xs"
                >
                  Reset Password
                </button>
              </form>

              <div className="text-center pt-2">
                <button onClick={() => setAuthView('login')} className="text-xs text-slate-400 hover:text-slate-600">
                  ← Remember your password? Sign in
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
