import type { Tool, ToolFormData } from "./types"
import pool from "./db"
import type { RowDataPacket, ResultSetHeader } from "mysql2/promise"

// Interfaces para los resultados de MySQL
interface ToolRow extends RowDataPacket {
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

interface CategoryRow extends RowDataPacket {
  id: number
  name: string
}

// ==================== HERRAMIENTAS ====================

export async function getToolsFromDB(search?: string): Promise<Tool[]> {
  try {
    let query = "SELECT * FROM tools"
    const params: string[] = []

    if (search) {
      query += " WHERE name LIKE ? OR code LIKE ?"
      params.push(`%${search}%`, `%${search}%`)
    }

    query += " ORDER BY created_at DESC"

    const [rows] = await pool.query<ToolRow[]>(query, params)
    return rows
  } catch (error) {
    console.error("Error al obtener herramientas:", error)
    return []
  }
}

export async function getToolFromDB(id: number): Promise<Tool | null> {
  try {
    const [rows] = await pool.query<ToolRow[]>("SELECT * FROM tools WHERE id = ?", [id])
    return rows.length > 0 ? rows[0] : null
  } catch (error) {
    console.error("Error al obtener herramienta:", error)
    return null
  }
}

export async function createToolInDB(data: ToolFormData): Promise<Tool | null> {
  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO tools (code, name, description, category, quantity, status, location, observations) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [data.code, data.name, null, data.category || null, 1, data.status, data.location || null, data.observations || null]
    )

    return getToolFromDB(result.insertId)
  } catch (error) {
    console.error("Error al crear herramienta:", error)
    return null
  }
}

export async function updateToolInDB(id: number, data: ToolFormData): Promise<Tool | null> {
  try {
    await pool.query(
      "UPDATE tools SET code = ?, name = ?, category = ?, status = ?, location = ?, observations = ? WHERE id = ?",
      [data.code, data.name, data.category || null, data.status, data.location || null, data.observations || null, id]
    )

    return getToolFromDB(id)
  } catch (error) {
    console.error("Error al actualizar herramienta:", error)
    return null
  }
}

export async function deleteToolFromDB(id: number): Promise<boolean> {
  try {
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM tools WHERE id = ?", [id])
    return result.affectedRows > 0
  } catch (error) {
    console.error("Error al eliminar herramienta:", error)
    return false
  }
}

export async function generateToolCodeFromDB(category: string): Promise<string> {
  try {
    // Obtener las 3 primeras letras de la categoría (sin espacios ni caracteres especiales)
    const cleanCategory = category.replace(/[^a-zA-Z]/g, "").toUpperCase()
    const prefix = cleanCategory.substring(0, 3).padEnd(3, "X")

    // Encontrar el último código con este prefijo
    const [rows] = await pool.query<ToolRow[]>(
      "SELECT code FROM tools WHERE code LIKE ? ORDER BY code DESC LIMIT 1",
      [`${prefix}-%`]
    )

    let nextNumber = 1
    if (rows.length > 0) {
      const parts = rows[0].code.split("-")
      if (parts.length > 1) {
        const currentNumber = parseInt(parts[1]) || 0
        nextNumber = currentNumber + 1
      }
    }

    return `${prefix}-${nextNumber.toString().padStart(3, "0")}`
  } catch (error) {
    console.error("Error al generar código:", error)
    return "XXX-001"
  }
}

// ==================== CATEGORÍAS ====================

export async function getCategoriesFromDB(): Promise<string[]> {
  try {
    const [rows] = await pool.query<CategoryRow[]>("SELECT name FROM categories ORDER BY name ASC")
    return rows.map((row) => row.name)
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    return []
  }
}

export async function createCategoryInDB(name: string): Promise<boolean> {
  try {
    await pool.query("INSERT INTO categories (name) VALUES (?)", [name])
    return true
  } catch (error: any) {
    // Error de duplicado (código 1062)
    if (error.code === "ER_DUP_ENTRY") {
      return false
    }
    console.error("Error al crear categoría:", error)
    return false
  }
}

export async function deleteCategoryFromDB(name: string): Promise<boolean> {
  try {
    // Primero, actualizar todas las herramientas que usan esta categoría a NULL
    await pool.query("UPDATE tools SET category = NULL WHERE category = ?", [name])
    
    // Luego eliminar la categoría
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM categories WHERE name = ?", [name])
    return result.affectedRows > 0
  } catch (error) {
    console.error("Error al eliminar categoría:", error)
    return false
  }
}
