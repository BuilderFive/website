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
          bio: string
          created_at: string
          first_name: string
          last_joined: string
          last_name: string
          tokens: number
          uuid: string
        }
        Insert: {
          bio?: string
          created_at?: string
          first_name?: string
          last_joined?: string
          last_name?: string
          tokens?: number
          uuid?: string
        }
        Update: {
          bio?: string
          created_at?: string
          first_name?: string
          last_joined?: string
          last_name?: string
          tokens?: number
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_account_uuid_fkey"
            columns: ["uuid"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      friendship: {
        Row: {
          created_at: string
          receiver: string
          relationship: Database["public"]["Enums"]["Relationship Status"]
          sender: string
        }
        Insert: {
          created_at?: string
          receiver: string
          relationship?: Database["public"]["Enums"]["Relationship Status"]
          sender: string
        }
        Update: {
          created_at?: string
          receiver?: string
          relationship?: Database["public"]["Enums"]["Relationship Status"]
          sender?: string
        }
        Relationships: [
          {
            foreignKeyName: "friendship_account_uuid1_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "friendship_account_uuid2_fkey"
            columns: ["receiver"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["uuid"]
          },
        ]
      }
      group_members: {
        Row: {
          created_at: string
          group_uuid: string
          id: number
          qRank: number
          user_uuid: string
        }
        Insert: {
          created_at?: string
          group_uuid: string
          id?: number
          qRank?: number
          user_uuid: string
        }
        Update: {
          created_at?: string
          group_uuid?: string
          id?: number
          qRank?: number
          user_uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_uuid_fkey"
            columns: ["group_uuid"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["uuid"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          expires_at: string | null
          id: number
          qRank: number
          status: Database["public"]["Enums"]["group-status"]
          uuid: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: number
          qRank?: number
          status?: Database["public"]["Enums"]["group-status"]
          uuid?: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: number
          qRank?: number
          status?: Database["public"]["Enums"]["group-status"]
          uuid?: string
        }
        Relationships: []
      }
      invite_code: {
        Row: {
          code: string
          created_at: string | null
          id: number
          recipient_id: string | null
          user_id: string
        }
        Insert: {
          code?: string
          created_at?: string | null
          id?: never
          recipient_id?: string | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: never
          recipient_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invite_code_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["uuid"]
          },
        ]
      }
      MVP_group: {
        Row: {
          created_at: string
          goal: string
          max_members: number
          status: Database["public"]["Enums"]["group-status"]
          uuid: string
        }
        Insert: {
          created_at?: string
          goal?: string
          max_members?: number
          status?: Database["public"]["Enums"]["group-status"]
          uuid?: string
        }
        Update: {
          created_at?: string
          goal?: string
          max_members?: number
          status?: Database["public"]["Enums"]["group-status"]
          uuid?: string
        }
        Relationships: []
      }
      MVP_members: {
        Row: {
          created_at: string
          email: string
          group_uuid: string
          id: number
        }
        Insert: {
          created_at?: string
          email?: string
          group_uuid: string
          id?: number
        }
        Update: {
          created_at?: string
          email?: string
          group_uuid?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "MVP_members_group_uuid_fkey"
            columns: ["group_uuid"]
            isOneToOne: false
            referencedRelation: "MVP_group"
            referencedColumns: ["uuid"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string
          description: string
          logo: string | null
          name: string
          owner_uuid: string
          uuid: string
        }
        Insert: {
          created_at?: string
          description?: string
          logo?: string | null
          name?: string
          owner_uuid: string
          uuid?: string
        }
        Update: {
          created_at?: string
          description?: string
          logo?: string | null
          name?: string
          owner_uuid?: string
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_owner_uuid_fkey"
            columns: ["owner_uuid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      rsvp: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
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
      "group-status": "QUEUE" | "ACTIVE" | "INACTIVE"
      "Relationship Status": "areFriends" | "awaitFriends" | "blocked"
      stage:
        | "ideating"
        | "validating"
        | "MVP development"
        | "iterating"
        | "research"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
