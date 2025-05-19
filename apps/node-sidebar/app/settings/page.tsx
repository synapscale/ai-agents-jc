"use client"

import { SettingsSidebar } from "@/components/settings/settings-sidebar"

export default function SettingsPage() {
  return (
    <div className="h-full p-6 flex gap-8">
      <aside className="w-64">
        <SettingsSidebar />
      </aside>
      <main className="flex-1">
        <h1 className="text-3xl font-bold mb-6">Configurações</h1>

        <div className="grid gap-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">Perfil</h2>
            <div className="bg-card rounded-lg border p-4">
              <p className="text-muted-foreground">Configurações de perfil serão implementadas em breve.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Preferências</h2>
            <div className="bg-card rounded-lg border p-4">
              <p className="text-muted-foreground">Preferências do usuário serão implementadas em breve.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Integrações</h2>
            <div className="bg-card rounded-lg border p-4">
              <p className="text-muted-foreground">Integrações com serviços externos serão implementadas em breve.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
