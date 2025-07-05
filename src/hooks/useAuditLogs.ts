
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'

export interface AuditLog {
  id: string
  user_id: string | null
  action: string
  table_name: string
  record_id: string | null
  old_data: any
  new_data: any
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

export const useAuditLogs = (userId?: string) => {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        let query = supabase
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)

        if (userId) {
          query = query.eq('user_id', userId)
        }

        const { data, error } = await query

        if (error) {
          console.error('Erro ao buscar logs de auditoria:', error)
          setError('Erro ao carregar logs de auditoria')
          return
        }

        setLogs(data || [])
      } catch (err) {
        console.error('Erro geral:', err)
        setError('Erro inesperado')
      } finally {
        setLoading(false)
      }
    }

    fetchAuditLogs()
  }, [userId])

  const logAuditEvent = async (
    action: string,
    tableName: string,
    recordId?: string,
    oldData?: any,
    newData?: any
  ) => {
    try {
      const { error } = await supabase.rpc('log_audit_event', {
        p_action: action,
        p_table_name: tableName,
        p_record_id: recordId,
        p_old_data: oldData,
        p_new_data: newData
      })

      if (error) {
        console.error('Erro ao registrar evento de auditoria:', error)
      }
    } catch (err) {
      console.error('Erro ao registrar auditoria:', err)
    }
  }

  return {
    logs,
    loading,
    error,
    logAuditEvent
  }
}
