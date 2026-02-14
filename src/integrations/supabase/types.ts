export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agents: {
        Row: {
          agent_code: string
          agent_name: string
          created_at: string
          id: string
          status: string | null
          tasks_processed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_code: string
          agent_name: string
          created_at?: string
          id?: string
          status?: string | null
          tasks_processed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_code?: string
          agent_name?: string
          created_at?: string
          id?: string
          status?: string | null
          tasks_processed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string
          label: string | null
          last_used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix: string
          label?: string | null
          last_used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string
          label?: string | null
          last_used_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      mandates: {
        Row: {
          agent_id: string | null
          created_at: string
          id: string
          mandate_name: string
          spending_limit: number
          spent: number
          status: string | null
          time_window: string | null
          tx_limit: number | null
          updated_at: string
          user_id: string
          verification_mode: string | null
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          id?: string
          mandate_name: string
          spending_limit?: number
          spent?: number
          status?: string | null
          time_window?: string | null
          tx_limit?: number | null
          updated_at?: string
          user_id: string
          verification_mode?: string | null
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          id?: string
          mandate_name?: string
          spending_limit?: number
          spent?: number
          status?: string | null
          time_window?: string | null
          tx_limit?: number | null
          updated_at?: string
          user_id?: string
          verification_mode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mandates_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_whitelist: {
        Row: {
          auto_approved: boolean | null
          category: string | null
          created_at: string
          domain: string
          id: string
          mandate_id: string
          mfa_required: boolean | null
          user_id: string
        }
        Insert: {
          auto_approved?: boolean | null
          category?: string | null
          created_at?: string
          domain: string
          id?: string
          mandate_id: string
          mfa_required?: boolean | null
          user_id: string
        }
        Update: {
          auto_approved?: boolean | null
          category?: string | null
          created_at?: string
          domain?: string
          id?: string
          mandate_id?: string
          mfa_required?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "merchant_whitelist_mandate_id_fkey"
            columns: ["mandate_id"]
            isOneToOne: false
            referencedRelation: "mandates"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          did_identifier: string | null
          full_name: string | null
          id: string
          identity_score: number | null
          kyc_status: string | null
          updated_at: string
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          did_identifier?: string | null
          full_name?: string | null
          id?: string
          identity_score?: number | null
          kyc_status?: string | null
          updated_at?: string
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          did_identifier?: string | null
          full_name?: string | null
          id?: string
          identity_score?: number | null
          kyc_status?: string | null
          updated_at?: string
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          agent_id: string | null
          amount: number
          created_at: string
          currency: string | null
          id: string
          mandate_id: string | null
          merchant: string
          status: string | null
          tx_hash: string | null
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          mandate_id?: string | null
          merchant: string
          status?: string | null
          tx_hash?: string | null
          user_id: string
        }
        Update: {
          agent_id?: string | null
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          mandate_id?: string | null
          merchant?: string
          status?: string | null
          tx_hash?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_mandate_id_fkey"
            columns: ["mandate_id"]
            isOneToOne: false
            referencedRelation: "mandates"
            referencedColumns: ["id"]
          },
        ]
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
