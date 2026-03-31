"use server"

import type { ToolFormData, Tool } from "@/lib/types"
import {
  getToolsFromDB as getToolsFromStore,
  getToolFromDB as getToolFromStore,
  createToolInDB as createToolInStore,
  updateToolInDB as updateToolInStore,
  deleteToolFromDB as deleteToolFromStore,
  getCategoriesFromDB as getCategoriesFromStore,
  createCategoryInDB as createCategoryInStore,
  deleteCategoryFromDB as deleteCategoryFromStore,
  generateToolCodeFromDB as generateToolCode,
} from "@/lib/db-store"

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

// Generación de código
export async function getGeneratedCode(category: string): Promise<string> {
  return generateToolCode(category)
}

// Categorías
export async function getCategories(): Promise<string[]> {
  return getCategoriesFromStore()
}

export async function createCategory(name: string): Promise<{ success: boolean; error?: string }> {
  try {
    const result = createCategoryInStore(name)
    if (!result) {
      return { success: false, error: "La categoría ya existe" }
    }
    return { success: true }
  } catch (error) {
    console.error("Error creating category:", error)
    return { success: false, error: "Error al crear la categoría" }
  }
}

export async function deleteCategory(name: string): Promise<{ success: boolean; error?: string }> {
  try {
    const result = deleteCategoryFromStore(name)
    if (!result) {
      return { success: false, error: "Categoría no encontrada" }
    }
    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)
    return { success: false, error: "Error al eliminar la categoría" }
  }
}
