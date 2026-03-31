"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getCategories, createCategory, deleteCategory } from "@/app/actions"
import { Trash2, Plus, Tags } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CategoriesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CategoriesDialog({ open, onOpenChange }: CategoriesDialogProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      fetchCategories()
    }
  }, [open])

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(data)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    setLoading(true)
    const result = await createCategory(newCategory.trim())
    if (result.success) {
      setNewCategory("")
      fetchCategories()
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!deletingCategory) return

    const result = await deleteCategory(deletingCategory)
    if (result.success) {
      fetchCategories()
    }
    setDeletingCategory(null)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <Tags className="h-5 w-5" />
              Gestión de Categorías
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Nueva Categoría</Label>
              <div className="flex gap-2">
                <Input
                  id="category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Ej: Herramientas de Corte"
                  className="bg-input border-border"
                />
                <Button type="submit" disabled={loading || !newCategory.trim()} className="shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </form>

          <div className="space-y-2">
            <Label>Categorías Existentes ({categories.length})</Label>
            <div className="max-h-[300px] overflow-y-auto space-y-2 border border-border rounded-lg p-3 bg-muted/20">
              {categories.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No hay categorías. Agrega una nueva.
                </p>
              ) : (
                categories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between p-2 rounded-md bg-card border border-border hover:bg-muted/30 transition-colors"
                  >
                    <Badge variant="outline" className="text-sm font-normal">
                      {category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingCategory(category)}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deletingCategory} onOpenChange={(open) => !open && setDeletingCategory(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará la categoría <span className="font-semibold text-foreground">"{deletingCategory}"</span>. Las
              herramientas con esta categoría no se eliminarán, solo quedarán sin categoría asignada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
