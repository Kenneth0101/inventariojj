export interface Tool {
  id: number
  code: string
  name: string
  description: string | null
  category: string | null
  quantity: number
  status: "disponible" | "en_uso" | "mantenimiento" | "dañado"
  location: string | null
  observations: string | null
  created_at: Date
  updated_at: Date
}

export interface ToolFormData {
  code: string
  name: string
  category?: string
  status: Tool["status"]
  location?: string
  observations?: string
}
