"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { createTool, updateTool } from "@/app/actions"
import type { Tool, ToolFormData } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface ToolFormProps {
  tool?: Tool | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

const categories = [
  "Herramientas Manuales",
  "Herramientas Eléctricas",
  "Maquinaria Pesada",
  "Equipos de Medición",
  "Equipos de Seguridad",
  "Otros",
]

const statuses = [
  { value: "disponible", label: "Disponible" },
  { value: "en_uso", label: "En Uso" },
  { value: "mantenimiento", label: "En Mantenimiento" },
  { value: "dañado", label: "Dañado" },
]

export function ToolForm({ tool, open, onOpenChange, onSuccess }: ToolFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<ToolFormData>({
    code: tool?.code || "",
    name: tool?.name || "",
    description: tool?.description || "",
    category: tool?.category || "",
    quantity: tool?.quantity || 1,
    status: tool?.status || "disponible",
    location: tool?.location || "",
  })

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
        description: "",
        category: "",
        quantity: 1,
        status: "disponible",
        location: "",
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="HM-001"
                required
                className="bg-input border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Cantidad *</Label>
              <Input
                id="quantity"
                type="number"
                min={0}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
                required
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Martillo de carpintero"
              required
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción de la herramienta..."
              className="bg-input border-border resize-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Bodega principal, Estante A-1"
              className="bg-input border-border"
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
