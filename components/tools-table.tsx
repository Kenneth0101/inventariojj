"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import type { Tool } from "@/lib/types"
import { deleteTool } from "@/app/actions"
import { ToolForm } from "./tool-form"

interface ToolsTableProps {
  tools: Tool[]
  onRefresh: () => void
}

const statusColors: Record<Tool["status"], string> = {
  disponible: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  en_uso: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  mantenimiento: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  dañado: "bg-red-500/20 text-red-400 border-red-500/30",
}

const statusLabels: Record<Tool["status"], string> = {
  disponible: "Disponible",
  en_uso: "En Uso",
  mantenimiento: "Mantenimiento",
  dañado: "Dañado",
}

export function ToolsTable({ tools, onRefresh }: ToolsTableProps) {
  const [editingTool, setEditingTool] = useState<Tool | null>(null)
  const [deletingTool, setDeletingTool] = useState<Tool | null>(null)

  const handleDelete = async () => {
    if (deletingTool) {
      await deleteTool(deletingTool.id)
      setDeletingTool(null)
      onRefresh()
    }
  }

  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-lg">No se encontraron herramientas</p>
        <p className="text-sm">Agrega una nueva herramienta para comenzar</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead className="text-muted-foreground font-semibold">Código</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Nombre</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Categoría</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Estado</TableHead>
              <TableHead className="text-muted-foreground font-semibold">Ubicación</TableHead>
              <TableHead className="text-muted-foreground font-semibold w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool.id} className="border-border hover:bg-muted/30">
                <TableCell className="font-mono text-primary font-medium">{tool.code}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{tool.name}</span>
                    {tool.observations && (
                      <span className="text-xs text-muted-foreground italic mt-0.5">
                        {tool.observations}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{tool.category || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[tool.status]}>
                    {statusLabels[tool.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{tool.location || "—"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Abrir menú</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem onClick={() => setEditingTool(tool)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingTool(tool)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ToolForm
        tool={editingTool}
        open={!!editingTool}
        onOpenChange={(open) => !open && setEditingTool(null)}
        onSuccess={onRefresh}
      />

      <AlertDialog open={!!deletingTool} onOpenChange={(open) => !open && setDeletingTool(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar herramienta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente{" "}
              <span className="font-semibold text-foreground">{deletingTool?.name}</span> del inventario.
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
