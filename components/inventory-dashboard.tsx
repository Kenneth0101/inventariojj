"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, Package, Wrench, AlertTriangle, CheckCircle, Tags } from "lucide-react"
import { ToolsTable } from "./tools-table"
import { ToolForm } from "./tool-form"
import { CategoriesDialog } from "./categories-dialog"
import { getTools } from "@/app/actions"
import type { Tool } from "@/lib/types"

export function InventoryDashboard() {
  const [tools, setTools] = useState<Tool[]>([])
  const [search, setSearch] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchTools = useCallback(async () => {
    setLoading(true)
    const data = await getTools(search)
    setTools(data)
    setLoading(false)
  }, [search])

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchTools()
    }, 300)
    return () => clearTimeout(debounce)
  }, [fetchTools])

  const stats = {
    total: tools.length,
    disponibles: tools.filter((t) => t.status === "disponible").length,
    enUso: tools.filter((t) => t.status === "en_uso").length,
    mantenimiento: tools.filter((t) => t.status === "mantenimiento" || t.status === "dañado").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Inventario</h1>
              <p className="text-sm text-muted-foreground">Control de Herramientas</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsCategoriesOpen(true)}
              className="bg-primary text-primary-foreground"
            >
              <Tags className="mr-2 h-4 w-4" />
              Categorías
            </Button>
            <Button onClick={() => setIsFormOpen(true)} className="bg-primary text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Herramienta
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-emerald-400">{stats.disponibles}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wrench className="h-4 w-4 text-blue-400" />
                En Uso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-400">{stats.enUso}</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                Mantenimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-400">{stats.mantenimiento}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o código..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border h-11"
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <ToolsTable tools={tools} onRefresh={fetchTools} />
        )}
      </main>

      <ToolForm open={isFormOpen} onOpenChange={setIsFormOpen} onSuccess={fetchTools} />
      <CategoriesDialog open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen} />
    </div>
  )
}
