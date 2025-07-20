import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface AuditLog {
  id: string
  user_id: string | null
  action: string
  table_name: string
  record_id: string | null
  old_values: any
  new_values: any
  ip_address: any
  user_agent: string | null
  created_at: string
}

export const useAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setLogs(data as AuditLog[] || [])
    } catch (error) {
      console.error('Erro ao buscar logs de auditoria:', error)
    } finally {
      setLoading(false)
    }
  }

  const logAction = async (
    action: string,
    tableName: string,
    recordId?: string,
    oldValues?: Record<string, any>,
    newValues?: Record<string, any>
  ) => {
    try {
      const { error } = await supabase
        .from('audit_logs')
        .insert({
          action,
          table_name: tableName,
          record_id: recordId,
          old_values: oldValues,
          new_values: newValues,
          ip_address: null,
          user_agent: navigator.userAgent
        })

      if (error) throw error
      
      await fetchLogs()
    } catch (error) {
      console.error('Erro ao criar log de auditoria:', error)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  return {
    logs,
    loading,
    fetchLogs,
    logAction
  }
}