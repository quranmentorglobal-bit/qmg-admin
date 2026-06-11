'use client'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  Star, CreditCard, Settings, LogOut, Menu, X, ChevronRight
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard',           label: 'Dashboard',            icon: LayoutDashboard },
  { href: '/teachers/pending',    label: 'Teacher Applications', icon: GraduationCap },
  { href: '/teachers',            label: 'Teacher Management',   icon: Users },
  { href: '/students',            label: 'Student Management',   icon: BookOpen },
  { href: '/bookings',            label: 'Bookings Overview',    icon: BookOpen },
  { href: '/reviews',             label: 'Reviews Moderation',   icon: Star },
  { href: '/settings',            label: 'Platform Settings',    icon: Settings },
]

export default function AdminLayout({ children, adminName }: { children: React.ReactNode, adminName?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  const Sidebar = () => (
    <aside className="flex flex-col h-full"
      style={{ background: 'linear-gradient(180deg, #0D3D20 0%, #1B5E37 100%)' }}>
      
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: 'rgba(184,149,42,0.2)', border: '1px solid rgba(184,149,42,0.4)' }}>
            🕌
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">
              Quran<span style={{ color: '#D4AF50' }}>Mentor</span>
            </p>
            <span className="text-xs font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
              style={{ background: 'rgba(184,149,42,0.25)', color: '#D4AF50' }}>
              Admin
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <button
              key={href}
              onClick={() => { router.push(href); setSidebarOpen(false) }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group"
              style={{
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.6)',
              }}>
              <Icon size={17} className="flex-shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {active && <ChevronRight size={14} style={{ color: '#D4AF50' }} />}
            </button>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.55)' }}>
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-60 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-60 flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 lg:px-6 gap-4 flex-shrink-0">
          <button className="lg:hidden p-2 rounded-lg text-ink-light hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-ink leading-tight">{adminName || 'Admin'}</p>
              <p className="text-xs text-ink-light">Super Admin</p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, #1B5E37, #0D3D20)' }}>
              {(adminName || 'A')[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
