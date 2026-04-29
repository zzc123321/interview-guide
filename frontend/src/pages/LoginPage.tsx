import { FormEvent, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Mail, Lock, Sparkles } from 'lucide-react';
import { useAuth } from '../components/auth/AuthProvider';

interface FieldErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const redirectTo = useMemo(() => (
    location.state?.from?.pathname || '/history'
  ), [location.state]);

  const validate = () => {
    const nextErrors: FieldErrors = {};
    if (!email.trim()) {
      nextErrors.email = '请输入邮箱地址';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = '请输入有效的邮箱地址';
    }
    if (!password) {
      nextErrors.password = '请输入密码';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    setErrors({});
    try {
      await login({ email: email.trim(), password });
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setErrors({
        form: error instanceof Error ? error.message : '登录失败，请稍后重试',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#0f172a] text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.14),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.9),rgba(30,41,59,0.78))]" />

      <header className="relative z-10 px-6 py-8 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.35)]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-xl tracking-tight">Interview AI</div>
            <div className="text-xs text-slate-400">Precision recruitment platform</div>
          </div>
        </div>
      </header>

      <main className="relative z-10 min-h-[calc(100vh-164px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[480px] rounded-[32px] border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/30 p-8 md:p-12 relative">
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-violet-500/20 blur-[80px]" />
          <div className="absolute -bottom-20 -left-16 w-40 h-40 rounded-full bg-indigo-500/20 blur-[80px]" />

          <div className="relative">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-display font-semibold mb-3">Welcome Back</h1>
              <p className="text-slate-400">Precision recruitment, powered by Interview AI.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                    placeholder="name@company.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <p className="mt-2 text-sm text-rose-300">{errors.email}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="password" className="block text-xs uppercase tracking-[0.2em] text-slate-400">
                    Password
                  </label>
                  <button type="button" className="text-xs text-violet-200/80 hover:text-white transition-colors">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 pl-11 pr-4 outline-none transition-all focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && <p className="mt-2 text-sm text-rose-300">{errors.password}</p>}
              </div>

              {errors.form && (
                <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {errors.form}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-medium text-lg shadow-[0_12px_40px_rgba(99,102,241,0.35)] hover:shadow-[0_16px_50px_rgba(124,58,237,0.42)] transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative flex items-center gap-4 mb-7">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  disabled
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 text-slate-400 flex items-center justify-center gap-3 cursor-not-allowed"
                >
                  <span className="w-5 h-5 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#34a853_0deg,#4285f4_120deg,#fbbc05_240deg,#ea4335_360deg)]" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  disabled
                  className="h-14 rounded-2xl border border-white/10 bg-white/5 text-slate-400 flex items-center justify-center gap-3 cursor-not-allowed"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </button>
              </div>
              <p className="mt-3 text-center text-xs text-slate-500">Social sign-in will be available in a later release.</p>
            </div>

            <div className="mt-10 text-center text-sm text-slate-400">
              Don&apos;t have an account yet?
              <span className="ml-1 text-violet-200 font-medium">Self-signup will be added later.</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>© 2026 Interview AI. Built for the future of recruitment.</div>
        <div className="flex items-center gap-5">
          <Link to="/login" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
          <Link to="/login" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
          <Link to="/login" className="hover:text-slate-200 transition-colors">Security</Link>
        </div>
      </footer>
    </div>
  );
}
