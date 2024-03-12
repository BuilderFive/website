export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      account: {
        Row: {
          bio: string | null
          created_at: string
          display_name: string
          last_joined: string
          username: string
          uuid: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          display_name: string
          last_joined?: string
          username: string
          uuid?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          display_name?: string
          last_joined?: string
          username?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_account_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ideas: {
        Row: {
          name: string
          project_uuid: string
          thought: string
          uuid: string
        }
        Insert: {
          name: string
          project_uuid: string
          thought: string
          uuid?: string
        }
        Update: {
          name?: string
          project_uuid?: string
          thought?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "ideas_project_uuid_fkey"
            columns: ["project_uuid"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["uuid"]
          }
        ]
      }
      location: {
        Row: {
          coordinates: string
          id: string
          name: string
        }
        Insert: {
          coordinates: string
          id?: string
          name: string
        }
        Update: {
          coordinates?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      meeting: {
        Row: {
          duration: unknown
          goal: string
          location_id: string
          project_uuid: string
          start_time: string
        }
        Insert: {
          duration: unknown
          goal: string
          location_id: string
          project_uuid: string
          start_time: string
        }
        Update: {
          duration?: unknown
          goal?: string
          location_id?: string
          project_uuid?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_project_uuid_fkey"
            columns: ["project_uuid"]
            isOneToOne: true
            referencedRelation: "project"
            referencedColumns: ["uuid"]
          }
        ]
      }
      project: {
        Row: {
          created_at: string
          image: string
          is_public: boolean
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string
          image: string
          is_public?: boolean
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string
          image?: string
          is_public?: boolean
          name?: string
          uuid?: string
        }
        Relationships: []
      }
      teammates: {
        Row: {
          account_uuid: string
          project_uuid: string
          role: string
        }
        Insert: {
          account_uuid: string
          project_uuid: string
          role: string
        }
        Update: {
          account_uuid?: string
          project_uuid?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "teammates_account_uuid_fkey"
            columns: ["account_uuid"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "teammates_project_uuid_fkey"
            columns: ["project_uuid"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["uuid"]
          }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never