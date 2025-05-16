"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SettingsPage;
var section_1 = require("@/components/ui/section");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
function SettingsPage() {
    return (<div className="p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <section_1.Section title="Configurações" description="Gerencie as configurações do sistema">
          <tabs_1.Tabs defaultValue="general">
            <tabs_1.TabsList className="mb-4">
              <tabs_1.TabsTrigger value="general">Geral</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="account">Conta</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="api">API</tabs_1.TabsTrigger>
              <tabs_1.TabsTrigger value="advanced">Avançado</tabs_1.TabsTrigger>
            </tabs_1.TabsList>

            <tabs_1.TabsContent value="general">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle>Configurações Gerais</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    As configurações gerais serão exibidas aqui quando disponíveis.
                  </p>
                </card_1.CardContent>
              </card_1.Card>
            </tabs_1.TabsContent>

            <tabs_1.TabsContent value="account">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle>Configurações de Conta</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    As configurações de conta serão exibidas aqui quando disponíveis.
                  </p>
                </card_1.CardContent>
              </card_1.Card>
            </tabs_1.TabsContent>

            <tabs_1.TabsContent value="api">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle>Configurações de API</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    As configurações de API serão exibidas aqui quando disponíveis.
                  </p>
                </card_1.CardContent>
              </card_1.Card>
            </tabs_1.TabsContent>

            <tabs_1.TabsContent value="advanced">
              <card_1.Card>
                <card_1.CardHeader>
                  <card_1.CardTitle>Configurações Avançadas</card_1.CardTitle>
                </card_1.CardHeader>
                <card_1.CardContent>
                  <p className="text-center py-8 text-muted-foreground">
                    As configurações avançadas serão exibidas aqui quando disponíveis.
                  </p>
                </card_1.CardContent>
              </card_1.Card>
            </tabs_1.TabsContent>
          </tabs_1.Tabs>
        </section_1.Section>
      </div>
    </div>);
}
