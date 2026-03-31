"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createTool, updateTool, getCategories, getGeneratedCode } from "@/app/actions"
import type { Tool, ToolFormData } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface ToolFormProps {
  tool?: Tool | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const statuses = [
  { value: "disponible", label: "Disponible" },
  { value: "en_uso", label: "En Uso" },
  { value: "mantenimiento", label: "En Mantenimiento" },
  { value: "dañado", label: "Dañado" },
]

export function ToolForm({ tool, open, onOpenChange, onSuccess }: ToolFormProps) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [formData, setFormData] = useState<ToolFormData>({
    code: "",
    name: "",
    category: "",
    status: "disponible",
    location: "",
    observations: "",
  })

  // Cargar categorías cuando se abre el diálogo
  useEffect(() => {
    if (open) {
      getCategories().then(setCategories)
    }
  }, [open])

  // Pre-cargar datos cuando se edita una herramienta
  useEffect(() => {
    if (tool && open) {
      setFormData({
        code: tool.code,
        name: tool.name,
        category: tool.category || "",
        status: tool.status,
        location: tool.location || "",
        observations: tool.observations || "",
      })
    } else if (!tool && open) {
      setFormData({
        code: "",
        name: "",
        category: "",
        status: "disponible",
        location: "",
        observations: "",
      })
    }
  }, [tool, open])

  // Generar código automáticamente cuando se selecciona una categoría (solo para nueva herramienta)
  const handleCategoryChange = async (category: string) => {
    setFormData({ ...formData, category })
    
    // Solo generar código si es una nueva herramienta
    if (!tool && category) {
      const generatedCode = await getGeneratedCode(category)
      setFormData((prev) => ({ ...prev, category, code: generatedCode }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = tool ? await updateTool(tool.id, formData) : await createTool(formData)

    setLoading(false)

    if (result.success) {
      onSuccess()
      onOpenChange(false)
      setFormData({
        code: "",
        name: "",
        category: "",
        status: "disponible",
        location: "",
        observations: "",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">{tool ? "Editar Herramienta" : "Nueva Herramienta"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Categoría - Primero para generar código */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
              disabled={!!tool}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Seleccionar categoría..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!!tool && <p className="text-xs text-muted-foreground">La categoría no se puede cambiar al editar</p>}
          </div>

          {/* Código - Generado automáticamente */}
          <div className="space-y-2">
            <Label htmlFor="code">Código *</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Selecciona una categoría primero"
              required
              disabled={!tool && !formData.category}
              className="bg-input border-border font-mono"
            />
            {!tool && <p className="text-xs text-muted-foreground">Se genera automáticamente al seleccionar categoría</p>}
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Pala cuadrada"
              required
              className="bg-input border-border"
            />
          </div>

          {/* Estado y Ubicación */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Estado *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as Tool["status"] })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Bodega A"
                className="bg-input border-border"
              />
            </div>
          </div>

          {/* Observaciones */}
          <div className="space-y-2">
            <Label htmlFor="observations">Observaciones</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
              placeholder="Notas adicionales sobre la herramienta..."
              className="bg-input border-border resize-none"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary text-primary-foreground">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {tool ? "Guardar Cambios" : "Agregar Herramienta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
