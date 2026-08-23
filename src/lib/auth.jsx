import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext({
  ready: false,
  configured: false,
  session: null,
  user: null,
  profile: null,
  refreshProfile: async () => {},
  signOut: async () => {},
})

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [ready, setReady] = useState(!supabase)

  async function loadProfile(userId) {
    if (!supabase || !userId) {
      setProfile(null)
      return null
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    if (error) {
      console.warn('profile load failed', error.message)
      return null
    }
    setProfile(data)
    return data
  }

  useEffect(() => {
    if (!supabase) return undefined

    let cancelled = false
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return
      setSession(data.session ?? null)
      setReady(true)
    })

    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => {
      cancelled = true
      data.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session?.user) {
      setProfile(null)
      return
    }
    loadProfile(session.user.id)
  }, [session])

  const value = useMemo(() => ({
    ready,
    configured: Boolean(supabase),
    session,
    user: session?.user ?? null,
    profile,
    refreshProfile: () => loadProfile(session?.user?.id),
    signOut: async () => {
      if (supabase) await supabase.auth.signOut()
      setProfile(null)
    },
  }), [ready, session, profile])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}

export function isActiveMember(profile) {
  return profile?.membership_status === 'active' && Boolean(profile?.plan)
}
