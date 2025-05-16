"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardPage;
var section_1 = require("@/components/ui/section");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function DashboardPage() {
    return (<div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <section_1.Section title="Dashboard" description="Visão geral do seu sistema">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
                <card_1.CardTitle className="text-sm font-medium">Agentes Ativos</card_1.CardTitle>
                <lucide_react_1.BarChart className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 desde o último mês</p>
              </card_1.CardContent>
            </card_1.Card>
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
                <card_1.CardTitle className="text-sm font-medium">Interações</card_1.CardTitle>
                <lucide_react_1.LineChart className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+15% desde a semana passada</p>
              </card_1.CardContent>
            </card_1.Card>
            <card_1.Card>
              <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
                <card_1.CardTitle className="text-sm font-medium">Uso por Modelo</card_1.CardTitle>
                <lucide_react_1.PieChart className="h-4 w-4 text-muted-foreground"/>
              </card_1.CardHeader>
              <card_1.CardContent>
                <div className="text-2xl font-bold">GPT-4o</div>
                <p className="text-xs text-muted-foreground">65% do uso total</p>
              </card_1.CardContent>
            </card_1.Card>
          </div>

          <card_1.Card className="w-full">
            <card_1.CardHeader>
              <card_1.CardTitle>Atividade Recente</card_1.CardTitle>
            </card_1.CardHeader>
            <card_1.CardContent>
              <p className="text-center py-12 text-muted-foreground">
                Os dados de atividade serão exibidos aqui quando disponíveis.
              </p>
            </card_1.CardContent>
          </card_1.Card>
        </section_1.Section>
      </div>
    </div>);
}
