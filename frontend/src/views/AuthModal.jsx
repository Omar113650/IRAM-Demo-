import React, { useState, useEffect } from 'react';
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
import IramLogo, { RealEstateIconBox } from '../components/IramLogo';

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
  const [authView, setAuthView] = useState(initialMode === 'register' ? 'company-step-1' : (initialMode === 'supplier' ? 'supplier-join' : 'login'));
  const isRegisterFlow = authView === 'company-step-1' || authView === 'company-step-2' || authView === 'supplier-join';
  
  useEffect(() => {
    if (initialMode === 'register') setAuthView('company-step-1');
    else if (initialMode === 'supplier') setAuthView('supplier-join');
    else if (initialMode === 'login') setAuthView('login');
  }, [initialMode, isOpen]);
  
  // Show / Hide password state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Outer Container Matching Figma Screenshot */}
      <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-slate-200/80 w-full max-w-5xl xl:max-w-6xl min-h-[660px] max-h-[95vh] overflow-hidden flex flex-col md:flex-row relative p-3 sm:p-5 gap-4">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 rtl:right-auto rtl:left-6 z-30 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors bg-white/90 backdrop-blur-xs shadow-xs"
          title={isAr ? "إغلاق" : "Close"}
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================== */}
        {/* LEFT COLUMN: FORM PANEL (Pixel-perfect matching Figma screenshot) */}
        {/* ============================================================== */}
        <div className={`flex-1 p-4 sm:p-8 overflow-y-auto flex flex-col justify-between transition-all duration-300 rounded-[24px] ${
          isRegisterFlow ? 'md:order-2 bg-[#F8FAFC]' : 'md:order-1 bg-white'
        }`}>
          
          <div>
            {/* Figma Top Logo: Shown on form for Sign-In, or on Mobile */}
            <div className={`flex items-center gap-2.5 mb-5 ${isRegisterFlow ? 'md:hidden' : ''}`}>
              <RealEstateIconBox className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="font-black text-base tracking-wider text-[#0F172A] leading-none">IRAM</span>
                <span className="text-[8px] font-bold tracking-[0.2em] text-[#E85312] uppercase leading-tight mt-0.5">CONTECH SYSTEMS</span>
              </div>
            </div>

            {/* Natural Main Auth Tabs: Sign In / Create Account */}
            {!['forgot-password', 'email-verify', 'reset-password'].includes(authView) ? (
              <div className="mb-6 p-1 bg-[#F5F2EB] rounded-xl border border-[#EAE5DE] flex items-center">
                <button 
                  type="button" 
                  onClick={() => setAuthView('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                    authView === 'login' 
                      ? 'bg-white text-[#26231F] shadow-xs' 
                      : 'text-[#6E6862] hover:text-[#26231F]'
                  }`}
                >
                  {isAr ? "تسجيل الدخول" : "Sign In"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setAuthView('company-step-1')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                    authView !== 'login' 
                      ? 'bg-white text-[#26231F] shadow-xs' 
                      : 'text-[#6E6862] hover:text-[#26231F]'
                  }`}
                >
                  {isAr ? "إنشاء حساب جديد" : "Create Account"}
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <button 
                  type="button" 
                  onClick={() => setAuthView('login')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6E6862] hover:text-[#E85312] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{isAr ? "العودة لتسجيل الدخول" : "Back to Sign In"}</span>
                </button>
              </div>
            )}

            {/* ------------------------------------------------------------ */}
            {/* 1. SIGN IN SCREEN (Figma Frame `logggin` & `login`) */}
            {/* ------------------------------------------------------------ */}
            {authView === 'login' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                
                {/* Header text */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#E85312] block mb-2">
                    {isAr ? "أهلاً بك مجدداً" : "WELCOME BACK"}
                  </span>
                  <h2 className="text-3xl sm:text-[34px] font-black text-[#0F172A] leading-[1.12] tracking-tight">
                    Never Short. Never Stuck.<br />
                    <span className="text-[#E85312]">Always Valued.</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-[#64748B] mt-2 font-medium">
                    {isAr ? "قرارات ذكية لمواد البناء لكل مشروع من مشاريعك." : "Smarter material decisions for every project."}
                  </p>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSignInSubmit} className="space-y-4">
                  
                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
                      {isAr ? "البريد الإلكتروني للعمل *" : "Work email *"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email" 
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-[#CBD5E1] rounded-lg text-[#0F172A] placeholder-slate-400 focus:outline-hidden focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Password field */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#0F172A]">
                        {isAr ? "كلمة المرور *" : "Password *"}
                      </label>
                      <button 
                        type="button"
                        onClick={() => setAuthView('forgot-password')}
                        className="text-xs font-bold text-[#E85312] hover:underline"
                      >
                        {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        required
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          setLoginError(null);
                        }}
                        placeholder="••••••••••••"
                        className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white rounded-lg text-[#0F172A] placeholder-slate-400 focus:outline-hidden transition-all font-medium ${
                          loginError 
                            ? 'border-2 border-[#E85312] focus:border-[#E85312]' 
                            : 'border border-[#CBD5E1] focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312]'
                        }`}
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    
                    {/* Error message matching Figma right frame */}
                    {loginError && (
                      <div className="flex items-center gap-1.5 text-[11px] text-[#E85312] font-semibold mt-1.5 animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{isAr ? "كلمة المرور غير صحيحة. حاول مرة أخرى." : "Incorrect password. Try again."}</span>
                      </div>
                    )}
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#E85312] hover:bg-[#CC4509] text-white font-bold text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-5"
                  >
                    <span>{isAr ? "تسجيل الدخول" : "Sign in"}</span>
                    <span>→</span>
                  </button>
                </form>

                {/* Don't have an account link */}
                <div className="text-center text-xs text-slate-500 pt-2 font-medium">
                  {isAr ? "ليس لديك حساب؟ " : "Don't have an account? "}
                  <button 
                    type="button" 
                    onClick={() => setAuthView('company-step-1')} 
                    className="font-bold text-[#E85312] hover:underline cursor-pointer"
                  >
                    {isAr ? "إنشاء حساب جديد" : "Create one"}
                  </button>
                </div>

                {/* Enterprise Security & Privacy Seal */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-[#A09A93] font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{isAr ? "تسجيل دخول آمن ومحمي بتشفير 256-bit بمعايير حوكمة المؤسسات" : "Secured with 256-bit enterprise encryption"}</span>
                </div>

              </div>
            )}

          {/* ------------------------------------------------------------ */}
          {/* 2. COMPANY SETUP (Step 1 of 2 - Matches Figma 1920w light)   */}
          {/* ------------------------------------------------------------ */}
          {authView === 'company-step-1' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 p-6 sm:p-8 max-w-lg w-full mx-auto">
                
                {/* Step 1 of 2 & Account Setup */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium pb-2">
                  <span>{isAr ? "الخطوة 1 من 2" : "Step 1 of 2"}</span>
                  <span>{isAr ? "إعداد الحساب" : "Account Setup"}</span>
                </div>

                {/* Stepper matching Figma screenshot */}
                <div className="flex items-center gap-3 pb-5 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E85312] text-white flex items-center justify-center text-[10px] font-black">1</span>
                    <span className="text-xs font-bold text-[#E85312]">{isAr ? "الشركة" : "Company"}</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-200 relative overflow-hidden rounded-full">
                    <div className="h-full bg-[#E85312] w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-semibold">2</span>
                    <span className="text-xs font-medium text-slate-400">{isAr ? "حساب المدير" : "Admin Account"}</span>
                  </div>
                </div>

                {/* Heading */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {isAr ? "بيانات الشركة" : "Set up your company"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setAuthView('supplier-join')}
                      className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                    >
                      {isAr ? "التسجيل كمورد مواد؟" : "Register as Supplier?"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isAr ? "أنشئ مساحة عمل شركتك على إرم لبدء التعاون وتتبع المواد وإدارة المشاريع." : "Create your company workspace on IRAM to start collaborating."}
                  </p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setAuthView('company-step-2'); }} className="space-y-3.5">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "اسم الشركة *" : "Company name *"}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Al-Bayan Contracting & Engineering"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Company Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "نوع الشركة والتخصص *" : "Company type *"}
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={companyType}
                        onChange={(e) => setCompanyType(e.target.value)}
                        className="w-full pl-10 pr-9 rtl:pl-9 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 appearance-none transition-all cursor-pointer font-medium"
                      >
                        <option value="General Contractor">General Contractor</option>
                        <option value="Infrastructure & Heavy Civil">Infrastructure & Heavy Civil</option>
                        <option value="Commercial Real Estate Developer">Commercial Real Estate Developer</option>
                        <option value="MEP & Specialty Contractor">MEP & Specialty Contractor</option>
                        <option value="Industrial & Energy EPC">Industrial & Energy EPC</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Tax & Commercial Reg (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? "الرقم الضريبي *" : "Tax registration number *"}
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          required
                          value={taxRegNumber}
                          onChange={(e) => setTaxRegNumber(e.target.value)}
                          placeholder="Enter tax registration"
                          className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? "رقم السجل التجاري *" : "Commercial registration number *"}
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          required
                          value={crNumber}
                          onChange={(e) => setCrNumber(e.target.value)}
                          placeholder="Enter commercial registration"
                          className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "عنوان مقر الشركة (اختياري)" : "Company address (Optional)"}
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        value={companyAddress}
                        onChange={(e) => setCompanyAddress(e.target.value)}
                        placeholder="e.g. New Cairo, Egypt"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Company Phone */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "رقم هاتف الشركة *" : "Company phone number *"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="tel" 
                        required
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        placeholder="e.g. +20 10 1234 5678"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-mono font-medium"
                      />
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#E85312] hover:bg-[#CC4509] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>{isAr ? "المتابعة" : "Continue"}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>

                {/* Disclaimer */}
                <p className="text-[11px] text-center text-slate-400 pt-4">
                  {isAr ? (
                    <>بإنشاء الحساب، أنت توافق على <a href="#terms" className="text-[#E85312] font-semibold hover:underline">شروط الخدمة</a> و <a href="#privacy" className="text-[#E85312] font-semibold hover:underline">سياسة الخصوصية</a></>
                  ) : (
                    <>By creating an account, you agree to our <a href="#terms" className="text-[#E85312] font-semibold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-[#E85312] font-semibold hover:underline">Privacy Policy</a></>
                  )}
                </p>

                <div className="text-center pt-3 text-xs text-slate-500">
                  {isAr ? "لديك حساب بالفعل؟ " : "Already have an account? "}
                  <button onClick={() => setAuthView('login')} className="font-bold text-[#E85312] hover:underline cursor-pointer">
                    {isAr ? "تسجيل الدخول" : "Sign in"}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 3. ADMIN ACCOUNT (Step 2 of 2 - Matches Figma 1920w light)   */}
          {/* ------------------------------------------------------------ */}
          {authView === 'company-step-2' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 p-6 sm:p-8 max-w-lg w-full mx-auto">
                
                {/* Step 2 of 2 & Account Setup */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium pb-2">
                  <span>{isAr ? "الخطوة 2 من 2" : "Step 2 of 2"}</span>
                  <span>{isAr ? "إعداد الحساب" : "Account Setup"}</span>
                </div>

                {/* Stepper matching Figma screenshot */}
                <div className="flex items-center gap-3 pb-5 pt-1">
                  <div 
                    onClick={() => setAuthView('company-step-1')} 
                    className="flex items-center gap-2 cursor-pointer group"
                    title={isAr ? "العودة للخطوة 1" : "Back to step 1"}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black group-hover:bg-[#E85312] transition-colors">✓</span>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-[#E85312] transition-colors">{isAr ? "الشركة" : "Company"}</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-[#E85312] rounded-full"></div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E85312] text-white flex items-center justify-center text-[10px] font-black">2</span>
                    <span className="text-xs font-bold text-[#E85312]">{isAr ? "حساب المدير" : "Admin Account"}</span>
                  </div>
                </div>

                {/* Heading */}
                <div className="mb-5">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {isAr ? "إنشاء حساب مسؤول الشركة" : "Create your admin account"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isAr ? "إعداد الحساب الذي سيدير مساحة عمل شركتك وصلاحيات الفريق." : "Set up the account that will manage your company workspace."}
                  </p>
                </div>

                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  onLoginSuccess('Company Admin', 'COMPANY'); 
                  onClose(); 
                }} className="space-y-3.5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "الاسم الكامل *" : "Full name *"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        required
                        value={adminFullName}
                        onChange={(e) => setAdminFullName(e.target.value)}
                        placeholder="e.g. Ahmed Mohamed"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "البريد الإلكتروني للعمل *" : "Work email *"}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email" 
                        required
                        value={adminWorkEmail}
                        onChange={(e) => setAdminWorkEmail(e.target.value)}
                        placeholder="e.g. ahmed@company.com"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "رقم الهاتف الشخصي *" : "Phone number *"}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="tel" 
                        required
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        placeholder="e.g. +20 10 1234 5678"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-mono font-medium"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "كلمة المرور *" : "Password *"}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Create a strong password"
                        className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* 4-Segment Strength Bar matching Figma screenshot */}
                    <div className="grid grid-cols-4 gap-1.5 mt-2">
                      <div className={`h-1.5 rounded-full transition-all ${adminPassword.length > 0 ? 'bg-[#E85312]' : 'bg-slate-200'}`} />
                      <div className={`h-1.5 rounded-full transition-all ${adminPassword.length >= 6 ? 'bg-[#E85312]' : 'bg-slate-200'}`} />
                      <div className={`h-1.5 rounded-full transition-all ${adminPassword.length >= 8 && /[0-9]/.test(adminPassword) ? 'bg-[#E85312]' : 'bg-slate-200'}`} />
                      <div className={`h-1.5 rounded-full transition-all ${adminPassword.length >= 8 && /[A-Z]/.test(adminPassword) && /[^A-Za-z0-9]/.test(adminPassword) ? 'bg-[#E85312]' : 'bg-slate-200'}`} />
                    </div>

                    <div className="flex items-center justify-between mt-1.5 text-[11px]">
                      <span className="text-slate-400">
                        {isAr ? "8 أحرف على الأقل تحتوي أرقاماً ورموزاً" : "Must be at least 8 characters with numbers & symbols"}
                      </span>
                      <span className="font-bold text-slate-700">
                        {isAr ? "القوة: " : "Strength: "}
                        <strong className="text-[#E85312]">
                          {strength.label}
                        </strong>
                      </span>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "تأكيد كلمة المرور *" : "Confirm password *"}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={adminConfirmPassword}
                        onChange={(e) => setAdminConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Create Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#E85312] hover:bg-[#CC4509] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>{isAr ? "إنشاء حساب مسؤول الشركة" : "Create admin account"}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>

                {/* Disclaimer */}
                <p className="text-[11px] text-center text-slate-400 pt-4">
                  {isAr ? (
                    <>بإنشاء الحساب، أنت توافق على <a href="#terms" className="text-[#E85312] font-semibold hover:underline">شروط الخدمة</a> و <a href="#privacy" className="text-[#E85312] font-semibold hover:underline">سياسة الخصوصية</a></>
                  ) : (
                    <>By creating an account, you agree to our <a href="#terms" className="text-[#E85312] font-semibold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-[#E85312] font-semibold hover:underline">Privacy Policy</a></>
                  )}
                </p>

                <div className="text-center pt-3 text-xs text-slate-500">
                  <button onClick={() => setAuthView('company-step-1')} className="font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer">
                    {isAr ? "← العودة إلى بيانات الشركة" : "← Back to Company Setup"}
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ------------------------------------------------------------ */}
          {/* 4. SUPPLIER COMMUNITY ONBOARDING (Matches Figma Frame 3)     */}
          {/* ------------------------------------------------------------ */}
          {authView === 'supplier-join' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 p-6 sm:p-8 max-w-lg w-full mx-auto">
                
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {isAr ? "الانضمام إلى مجتمع الموردين" : "Join Supplier Community"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setAuthView('company-step-1')}
                      className="text-xs font-bold text-[#E85312] hover:underline cursor-pointer"
                    >
                      {isAr ? "التسجيل كشركة مقاولات؟" : "Register as Contractor?"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isAr 
                      ? "أنشئ حساب المورد الخاص بك وتواصل مع شركات المقاولات التي تبحث عن المواد التي توفرها." 
                      : "Create your supplier account and connect with construction companies looking for the materials you provide."}
                  </p>
                </div>

                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  onLoginSuccess('Supplier', 'SUPPLIER'); 
                  onClose(); 
                }} className="space-y-3.5">
                  
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "اسم الشركة الموردة *" : "Company name *"}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        required
                        value={supplierCompanyName}
                        onChange={(e) => setSupplierCompanyName(e.target.value)}
                        placeholder="e.g. Apex Steel Supply Co."
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Contact Person Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "اسم مسؤول التواصل المعتمد *" : "Contact person name *"}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text"
                        required
                        value={supplierContactPerson}
                        onChange={(e) => setSupplierContactPerson(e.target.value)}
                        placeholder="Full name"
                        className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* Work Email & Phone Number (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? "البريد الإلكتروني للعمل *" : "Work email *"}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="email"
                          required
                          value={supplierWorkEmail}
                          onChange={(e) => setSupplierWorkEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? "رقم الهاتف المباشر *" : "Phone number *"}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                        <input 
                          type="tel"
                          required
                          value={supplierPhone}
                          onChange={(e) => setSupplierPhone(e.target.value)}
                          placeholder="+20 100 000 0000"
                          className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-mono font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "كلمة المرور *" : "Password *"}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showPassword ? "text" : "password"}
                        required
                        value={supplierPassword}
                        onChange={(e) => setSupplierPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? "تأكيد كلمة المرور *" : "Confirm password *"}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={supplierConfirmPassword}
                        onChange={(e) => setSupplierConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className="w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:border-[#E85312] focus:ring-1 focus:ring-[#E85312] text-slate-900 placeholder:text-slate-400 transition-all font-medium"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Create Supplier Account Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#E85312] hover:bg-[#CC4509] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>{isAr ? "إنشاء حساب مورد معتمد" : "Create supplier account"}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>

                {/* Disclaimer */}
                <p className="text-[11px] text-center text-slate-400 pt-4">
                  {isAr ? (
                    <>بإنشاء الحساب، أنت توافق على <a href="#terms" className="text-[#E85312] font-semibold hover:underline">شروط الخدمة</a> و <a href="#privacy" className="text-[#E85312] font-semibold hover:underline">سياسة الخصوصية</a></>
                  ) : (
                    <>By creating an account, you agree to our <a href="#terms" className="text-[#E85312] font-semibold hover:underline">Terms of Service</a> and <a href="#privacy" className="text-[#E85312] font-semibold hover:underline">Privacy Policy.</a></>
                  )}
                </p>

                <div className="text-center pt-3 text-xs text-slate-500">
                  {isAr ? "لديك حساب بالفعل؟ " : "Already registered? "}
                  <button onClick={() => setAuthView('login')} className="font-bold text-[#E85312] hover:underline cursor-pointer">
                    {isAr ? "تسجيل الدخول" : "Sign in"}
                  </button>
                </div>

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

          {/* Left Column Footer matching Figma Screen (shown on login) */}
          {!isRegisterFlow && (
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>© 2026 IRAM. All rights reserved.</span>
              <div className="flex items-center gap-3">
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-600 transition-colors">Privacy</a>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-600 transition-colors">Terms</a>
              </div>
            </div>
          )}

        </div>

        {/* ============================================================== */}
        {/* VISUAL HERO CARD                                              */}
        {/* 1. When Register: Staging yard + "A clearer way to build."    */}
        {/* 2. When Login: Sunset Crane + "AI-POWERED MATERIAL MANAGEMENT"*/}
        {/* ============================================================== */}
        <div className={`hidden md:flex flex-1 relative rounded-[24px] sm:rounded-[28px] overflow-hidden min-h-[580px] bg-slate-900 flex-col justify-end p-8 sm:p-10 transition-all duration-300 ${
          isRegisterFlow ? 'md:order-1' : 'md:order-2'
        }`}>
          {/* Construction Background Image */}
          <img 
            src={isRegisterFlow 
              ? "/figma-images/fd7333fae2c06a1e2f17fbc8e4ab1dce57b422fa" 
              : "/figma-images/13d55822ea4078d8544ea8b632e7d48023429ce4"
            } 
            alt="IRAM Construction Site"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700"
            onError={(e) => {
              e.currentTarget.src = isRegisterFlow 
                ? "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
                : "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1600&q=80";
            }}
          />

          {/* High-legibility Gradients matching Figma */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          {/* REGISTER FLOW HERO: Brand Logo at top & "A clearer way to build." at bottom */}
          {isRegisterFlow ? (
            <>
              {/* Top-Left Logo matching Figma Screenshot 1920w light */}
              <div className="absolute top-8 left-8 rtl:left-auto rtl:right-8 z-20 flex items-center gap-2.5">
                <RealEstateIconBox className="w-8 h-8" />
                <div className="flex flex-col">
                  <span className="font-black text-lg tracking-wider text-white leading-none">IRAM</span>
                  <span className="text-[8px] font-bold tracking-[0.2em] text-[#00F5D4] uppercase leading-tight mt-0.5">CONTECH SYSTEMS</span>
                </div>
              </div>

              {/* Bottom Tagline matching Figma Screenshot 1920w light */}
              <div className="relative z-10 max-w-md text-white animate-in fade-in duration-300">
                <div className="w-12 h-1.5 bg-[#E85312] rounded-full mb-3.5"></div>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                  {isAr ? "طريقة أوضح وأذكى للبناء." : "A clearer way to build."}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300/90 mt-2 font-normal leading-relaxed">
                  {isAr 
                    ? "الربط الفوري بين المواقع الإنشائية والمخازن، لتجنب تأخير الصب وشراء ما تحتاجه فقط." 
                    : "Zero idle pouring days, automated site transfers, and verified material procurement."}
                </p>
              </div>
            </>
          ) : (
            /* LOGIN FLOW HERO: AI Badge & Metrics matching Figma Frame logggin */
            <div className="relative z-10 max-w-md space-y-3.5 text-white animate-in fade-in duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.14em] text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E85312] animate-pulse"></span>
                {isAr ? "إدارة مواد ذكية بالذكاء الاصطناعي" : "AI-POWERED MATERIAL MANAGEMENT"}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-[1.18] tracking-tight">
                {isAr ? (
                  <>استبق العجز. اكتشف الفائض.<br /><span className="text-[#FBA94C]">وحافظ على سرعة الإنجاز.</span></>
                ) : (
                  <>Anticipate shortages. Spot surplus.<br /><span className="text-[#FBA94C]">Keep every project moving.</span></>
                )}
              </h3>

              <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
                {isAr 
                  ? "منظومة رقمية موحدة للمقاولين، مديري المشاريع، والموردين لربط المواقع والتخزين الميداني بالوقت الفعلي." 
                  : "Real-time visibility, automated site transfers, and competitive verified procurement across your entire project portfolio."}
              </p>

              {/* Live ConTech Enterprise Metrics */}
              <div className="pt-3.5 border-t border-white/15 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-base sm:text-lg font-black text-white">18%</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wide">{isAr ? "توفير الهدر" : "Waste Cut"}</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-[#FBA94C]">4.2x</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wide">{isAr ? "سرعة التوريد" : "PO Speed"}</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-black text-emerald-400">0 Days</div>
                  <div className="text-[10px] text-slate-300 uppercase tracking-wide">{isAr ? "توقف صب" : "Idle Delays"}</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
