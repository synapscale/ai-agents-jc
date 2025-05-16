"use client"

import type React from "react"

import { AppLayout } from "@/components/layout/app-layout"
import { NodeSidebar } from "@/components/node-sidebar/node-sidebar"

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout sidebar={<NodeSidebar />}>{children}</AppLayout>
  )
}
