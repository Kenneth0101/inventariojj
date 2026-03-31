import type { Tool, ToolFormData } from "./types"

// Store en memoria (sin datos iniciales)
const tools: Tool[] = []
let nextId = 1

export function getToolsFromStore(search?: string): Tool[] {
  if (!search) return [...tools].sort((a, b) => b.created_at.getTime() - a.created_at.getTime())

  const searchLower = search.toLowerCase()
  return tools
    .filter((t) => t.name.toLowerCase().includes(searchLower) || t.code.toLowerCase().includes(searchLower))
    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
}

export function getToolFromStore(id: number): Tool | null {
  return tools.find((t) => t.id === id) || null
}

// Generar código automático basado en categoría
export function generateToolCode(category: string): string {
  // Obtener las 3 primeras letras de la categoría (sin espacios ni caracteres especiales)
  const cleanCategory = category.replace(/[^a-zA-Z]/g, "").toUpperCase()
  const prefix = cleanCategory.substring(0, 3).padEnd(3, "X")
  
  // Encontrar todos los códigos existentes con este prefijo
  const existingCodes = tools
    .filter((t) => t.code.startsWith(prefix + "-"))
    .map((t) => {
      const parts = t.code.split("-")
      return parts.length > 1 ? parseInt(parts[1]) || 0 : 0
    })
  
  // Obtener el siguiente número disponible
  const maxNumber = existingCodes.length > 0 ? Math.max(...existingCodes) : 0
  const nextNumber = maxNumber + 1
  
  return `${prefix}-${nextNumber.toString().padStart(3, "0")}`
}

export function createToolInStore(data: ToolFormData): Tool {
  const newTool: Tool = {
    id: nextId++,
    code: data.code,
    name: data.name,
    description: null,
    category: data.category || null,
    quantity: 1,
    status: data.status,
    location: data.location || null,
    observations: data.observations || null,
    created_at: new Date(),
    updated_at: new Date(),
  }
  tools.push(newTool)
  return newTool
}

export function updateToolInStore(id: number, data: ToolFormData): Tool | null {
  const index = tools.findIndex((t) => t.id === id)
  if (index === -1) return null

  tools[index] = {
    ...tools[index],
    code: data.code,
    name: data.name,
    category: data.category || null,
    status: data.status,
    location: data.location || null,
    observations: data.observations || null,
    updated_at: new Date(),
  }
  return tools[index]
}

export function deleteToolFromStore(id: number): boolean {
  const index = tools.findIndex((t) => t.id === id)
  if (index === -1) return false

  tools.splice(index, 1)
  return true
}

// Categorías (sin datos iniciales)
const categories: string[] = []

export function getCategoriesFromStore(): string[] {
  return [...categories].sort()
}

export function createCategoryInStore(name: string): boolean {
  if (categories.includes(name)) return false
  categories.push(name)
  return true
}

export function deleteCategoryFromStore(name: string): boolean {
  const index = categories.indexOf(name)
  if (index === -1) return false
  categories.splice(index, 1)
  return true
}
