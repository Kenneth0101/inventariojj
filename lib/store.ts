import type { Tool, ToolFormData } from "./types"

const initialTools: Tool[] = [
  {
    id: 1,
    code: "TAL-001",
    name: "Taladro Percutor Bosch",
    description: "Taladro percutor 750W con maletín",
    category: "Herramientas Eléctricas",
    quantity: 3,
    status: "disponible",
    location: "Bodega Principal",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    code: "SIE-002",
    name: "Sierra Circular DeWalt",
    description: "Sierra circular 7 1/4 pulgadas",
    category: "Herramientas Eléctricas",
    quantity: 2,
    status: "en_uso",
    location: "Obra Norte",
    created_at: new Date("2024-02-10"),
    updated_at: new Date("2024-02-10"),
  },
  {
    id: 3,
    code: "MAR-003",
    name: "Martillo Demoledor",
    description: "Martillo demoledor 1500W",
    category: "Herramientas Eléctricas",
    quantity: 1,
    status: "mantenimiento",
    location: "Taller",
    created_at: new Date("2024-03-05"),
    updated_at: new Date("2024-03-05"),
  },
  {
    id: 4,
    code: "NVL-004",
    name: "Nivel Láser Stanley",
    description: "Nivel láser autonivelante 360°",
    category: "Medición",
    quantity: 4,
    status: "disponible",
    location: "Bodega Principal",
    created_at: new Date("2024-03-20"),
    updated_at: new Date("2024-03-20"),
  },
  {
    id: 5,
    code: "MZC-005",
    name: "Mezcladora de Concreto",
    description: "Mezcladora 1 saco capacidad",
    category: "Maquinaria",
    quantity: 2,
    status: "en_uso",
    location: "Obra Sur",
    created_at: new Date("2024-04-01"),
    updated_at: new Date("2024-04-01"),
  },
  {
    id: 6,
    code: "SOL-006",
    name: "Soldadora Inverter",
    description: "Soldadora 200A con electrodos",
    category: "Herramientas Eléctricas",
    quantity: 1,
    status: "dañado",
    location: "Taller",
    created_at: new Date("2024-04-15"),
    updated_at: new Date("2024-04-15"),
  },
  {
    id: 7,
    code: "CIN-007",
    name: "Cinta Métrica 8m",
    description: "Cinta métrica profesional",
    category: "Medición",
    quantity: 15,
    status: "disponible",
    location: "Bodega Principal",
    created_at: new Date("2024-05-01"),
    updated_at: new Date("2024-05-01"),
  },
  {
    id: 8,
    code: "AMO-008",
    name: 'Amoladora Angular 4.5"',
    description: "Amoladora 850W con discos",
    category: "Herramientas Eléctricas",
    quantity: 5,
    status: "disponible",
    location: "Bodega Principal",
    created_at: new Date("2024-05-10"),
    updated_at: new Date("2024-05-10"),
  },
]

// Store en memoria
const tools: Tool[] = [...initialTools]
let nextId = initialTools.length + 1

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

export function createToolInStore(data: ToolFormData): Tool {
  const newTool: Tool = {
    id: nextId++,
    code: data.code,
    name: data.name,
    description: data.description || null,
    category: data.category || null,
    quantity: data.quantity,
    status: data.status,
    location: data.location || null,
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
    description: data.description || null,
    category: data.category || null,
    quantity: data.quantity,
    status: data.status,
    location: data.location || null,
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
