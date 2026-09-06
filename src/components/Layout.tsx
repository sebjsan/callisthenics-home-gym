import { NavLink, Outlet } from 'react-router-dom';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.5 px-3 py-2 text-xs font-medium transition-colors ${
    isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
  }`;

export function Layout() {
  return (
    <div className="min-h-dvh bg-ink text-slate-100 flex flex-col">
      <header className="sticky top-0 z-20 border-b border-white/5 bg-ink/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="2" />
                <path d="M8 9l4 2 4-2 2 8-6 3-6-3z" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight">Callisthenics Home Gym</p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500">30-day pull-up plan</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/5 bg-ink/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-lg justify-around px-2 py-1">
          <NavLink to="/" end className={linkClass}>
            <HomeIcon />
            Today
          </NavLink>
          <NavLink to="/calendar" className={linkClass}>
            <CalIcon />
            Plan
          </NavLink>
          <NavLink to="/progress" className={linkClass}>
            <ProgIcon />
            Progress
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 01-1 1h-5v-6H10v6H5a1 1 0 01-1-1v-9.5z" strokeLinejoin="round" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ProgIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19V5M4 19h16" strokeLinecap="round" />
      <path d="M8 15v-4M12 15V8M16 15v-7" strokeLinecap="round" />
    </svg>
  );
}
