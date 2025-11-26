"use server"

import type { ToolFormData, Tool } from "@/lib/types"
import {
  getToolsFromStore,
  getToolFromStore,
  createToolInStore,
  updateToolInStore,
  deleteToolFromStore,
} from "@/lib/store"

export async function getTools(search?: string): Promise<Tool[]> {
  return getToolsFromStore(search)
}

export async function getTool(id: number): Promise<Tool | null> {
  return getToolFromStore(id)
}

export async function createTool(data: ToolFormData): Promise<{ success: boolean; error?: string }> {
  try {
    createToolInStore(data)
    return { success: true }
  } catch (error) {
    console.error("Error creating tool:", error)
    return { success: false, error: "Error al crear la herramienta" }
  }
}

export async function updateTool(id: number, data: ToolFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const result = updateToolInStore(id, data)
    if (!result) {
      return { success: false, error: "Herramienta no encontrada" }
    }
    return { success: true }
  } catch (error) {
    console.error("Error updating tool:", error)
    return { success: false, error: "Error al actualizar la herramienta" }
  }
}

export async function deleteTool(id: number): Promise<{ success: boolean; error?: string }> {
  try {
    const result = deleteToolFromStore(id)
    if (!result) {
      return { success: false, error: "Herramienta no encontrada" }
    }
    return { success: true }
  } catch (error) {
    console.error("Error deleting tool:", error)
    return { success: false, error: "Error al eliminar la herramienta" }
  }
}
