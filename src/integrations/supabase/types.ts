export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      blockchain_transactions: {
        Row: {
          amount: number
          block_number: number | null
          campaign_id: string | null
          confirmed_at: string | null
          created_at: string
          gas_price: number | null
          gas_used: number | null
          id: string
          investor_id: string | null
          network_id: string
          status: string
          transaction_hash: string
          transaction_type: string
        }
        Insert: {
          amount: number
          block_number?: number | null
          campaign_id?: string | null
          confirmed_at?: string | null
          created_at?: string
          gas_price?: number | null
          gas_used?: number | null
          id?: string
          investor_id?: string | null
          network_id?: string
          status?: string
          transaction_hash: string
          transaction_type: string
        }
        Update: {
          amount?: number
          block_number?: number | null
          campaign_id?: string | null
          confirmed_at?: string | null
          created_at?: string
          gas_price?: number | null
          gas_used?: number | null
          id?: string
          investor_id?: string | null
          network_id?: string
          status?: string
          transaction_hash?: string
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "blockchain_transactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "investment_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign_milestones: {
        Row: {
          campaign_id: string
          created_at: string
          deadline: string | null
          description: string | null
          id: string
          order_index: number | null
          status: string | null
          target_amount: number | null
          title: string
        }
        Insert: {
          campaign_id: string
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          status?: string | null
          target_amount?: number | null
          title: string
        }
        Update: {
          campaign_id?: string
          created_at?: string
          deadline?: string | null
          description?: string | null
          id?: string
          order_index?: number | null
          status?: string | null
          target_amount?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_milestones_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "investment_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_campaigns: {
        Row: {
          category: string | null
          created_at: string
          creator_id: string
          description: string | null
          estimated_return_max: number | null
          estimated_return_min: number | null
          goal_amount: number
          id: string
          image_url: string | null
          raised_amount: number | null
          status: string | null
          timeframe: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          creator_id: string
          description?: string | null
          estimated_return_max?: number | null
          estimated_return_min?: number | null
          goal_amount: number
          id?: string
          image_url?: string | null
          raised_amount?: number | null
          status?: string | null
          timeframe?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          creator_id?: string
          description?: string | null
          estimated_return_max?: number | null
          estimated_return_min?: number | null
          goal_amount?: number
          id?: string
          image_url?: string | null
          raised_amount?: number | null
          status?: string | null
          timeframe?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_campaigns_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          campaign_id: string
          created_at: string
          id: string
          investor_id: string
          status: string | null
          transaction_hash: string | null
          wallet_address: string | null
        }
        Insert: {
          amount: number
          campaign_id: string
          created_at?: string
          id?: string
          investor_id: string
          status?: string | null
          transaction_hash?: string | null
          wallet_address?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string
          created_at?: string
          id?: string
          investor_id?: string
          status?: string | null
          transaction_hash?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investments_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "investment_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_verifications: {
        Row: {
          address: string
          city: string
          country: string
          created_at: string
          date_of_birth: string
          document_number: string
          document_type: string
          full_name: string
          id: string
          phone: string | null
          rejected_reason: string | null
          status: string
          updated_at: string
          user_id: string | null
          verified_at: string | null
        }
        Insert: {
          address: string
          city: string
          country: string
          created_at?: string
          date_of_birth: string
          document_number: string
          document_type: string
          full_name: string
          id?: string
          phone?: string | null
          rejected_reason?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          country?: string
          created_at?: string
          date_of_birth?: string
          document_number?: string
          document_type?: string
          full_name?: string
          id?: string
          phone?: string | null
          rejected_reason?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
          verified_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          category: string | null
          created_at: string
          full_name: string | null
          id: string
          linkedin_url: string | null
          twitter_handle: string | null
          updated_at: string
          username: string | null
          verified: boolean | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          category?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          linkedin_url?: string | null
          twitter_handle?: string | null
          updated_at?: string
          username?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          category?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          linkedin_url?: string | null
          twitter_handle?: string | null
          updated_at?: string
          username?: string | null
          verified?: boolean | null
          website?: string | null
        }
        Relationships: []
      }
      security_settings: {
        Row: {
          created_at: string
          email_notifications: boolean
          id: string
          login_alerts: boolean
          max_daily_withdrawal: number | null
          sms_notifications: boolean
          two_factor_enabled: boolean
          updated_at: string
          user_id: string | null
          withdrawal_confirmations: boolean
        }
        Insert: {
          created_at?: string
          email_notifications?: boolean
          id?: string
          login_alerts?: boolean
          max_daily_withdrawal?: number | null
          sms_notifications?: boolean
          two_factor_enabled?: boolean
          updated_at?: string
          user_id?: string | null
          withdrawal_confirmations?: boolean
        }
        Update: {
          created_at?: string
          email_notifications?: boolean
          id?: string
          login_alerts?: boolean
          max_daily_withdrawal?: number | null
          sms_notifications?: boolean
          two_factor_enabled?: boolean
          updated_at?: string
          user_id?: string | null
          withdrawal_confirmations?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
