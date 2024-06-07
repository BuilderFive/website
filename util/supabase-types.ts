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
          member_uuid: string
          user_uuid: string | null
        }
        Insert: {
          created_at?: string
          group_uuid: string
          member_uuid?: string
          user_uuid?: string | null
        }
        Update: {
          created_at?: string
          group_uuid?: string
          member_uuid?: string
          user_uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_user_uuid_fkey"
            columns: ["user_uuid"]
            isOneToOne: false
            referencedRelation: "account"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "MVP_members_group_uuid_fkey"
            columns: ["group_uuid"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["group_uuid"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          end_at: string | null
          group_uuid: string
          location: number[]
          max_members: number
          topic: string
        }
        Insert: {
          created_at?: string
          end_at?: string | null
          group_uuid?: string
          location?: number[]
          max_members?: number
          topic?: string
        }
        Update: {
          created_at?: string
          end_at?: string | null
          group_uuid?: string
          location?: number[]
          max_members?: number
          topic?: string
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
      join_or_create_group: {
        Args: {
          p_user_uuid: string
          p_topic: string
          p_radius: number
          p_latitude: number
          p_longitude: number
        }
        Returns: string
      }
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
