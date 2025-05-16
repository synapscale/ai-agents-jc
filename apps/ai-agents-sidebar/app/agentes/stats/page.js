"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentStatsPage;
var react_1 = require("react");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var section_1 = require("@/components/ui/section");
var skeleton_1 = require("@/components/ui/skeleton");
var use_local_storage_1 = require("@hooks/use-local-storage");
var card_1 = require("@/components/ui/card");
function AgentStatsPage() {
    var _a = (0, react_1.useState)(true), isLoading = _a[0], setIsLoading = _a[1];
    var agents = (0, use_local_storage_1.useLocalStorage)("agents", [])[0];
    // Simulate loading
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setIsLoading(false);
        }, 800);
        return function () { return clearTimeout(timer); };
    }, []);
    // Calculate statistics
    var stats = (0, react_1.useMemo)(function () {
        // Count by type
        var typeCount = agents.reduce(function (acc, agent) {
            acc[agent.type] = (acc[agent.type] || 0) + 1;
            return acc;
        }, {});
        // Count by model
        var modelCount = agents.reduce(function (acc, agent) {
            acc[agent.model] = (acc[agent.model] || 0) + 1;
            return acc;
        }, {});
        // Count by status
        var statusCount = agents.reduce(function (acc, agent) {
            var status = agent.status || "active";
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
        return {
            total: agents.length,
            typeCount: typeCount,
            modelCount: modelCount,
            statusCount: statusCount,
        };
    }, [agents]);
    // Loading state
    if (isLoading) {
        return (<div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <skeleton_1.Skeleton className="h-9 w-24"/>
            <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
            <skeleton_1.Skeleton className="h-8 w-48"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {Array(4)
                .fill(0)
                .map(function (_, i) { return (<skeleton_1.Skeleton key={i} className="h-32 w-full"/>); })}
          </div>

          <skeleton_1.Skeleton className="h-64 w-full"/>
        </div>
      </div>);
    }
    return (<div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <link_1.default href="/agentes" className="flex items-center text-gray-500 hover:text-gray-900">
            <lucide_react_1.ArrowLeft className="mr-1 h-4 w-4"/>
            Voltar
          </link_1.default>
          <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
          <h1 className="text-xl font-bold">Estatísticas de Agentes</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
              <card_1.CardTitle className="text-sm font-medium">Total de Agentes</card_1.CardTitle>
              <lucide_react_1.BarChart className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <card_1.CardDescription>{stats.statusCount.active || 0} ativos</card_1.CardDescription>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
              <card_1.CardTitle className="text-sm font-medium">Por Tipo</card_1.CardTitle>
              <lucide_react_1.BarChart className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">
                {stats.typeCount.chat || 0} <span className="text-sm font-normal">chat</span>
              </div>
              <card_1.CardDescription>
                {stats.typeCount.imagem || 0} imagem, {stats.typeCount.texto || 0} texto
              </card_1.CardDescription>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
              <card_1.CardTitle className="text-sm font-medium">Por Modelo</card_1.CardTitle>
              <lucide_react_1.BarChart className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">
                {stats.modelCount["gpt-4o"] || 0} <span className="text-sm font-normal">GPT-4o</span>
              </div>
              <card_1.CardDescription>
                {stats.modelCount["gpt-4"] || 0} GPT-4, {stats.modelCount["gpt-3.5-turbo"] || 0} GPT-3.5
              </card_1.CardDescription>
            </card_1.CardContent>
          </card_1.Card>

          <card_1.Card>
            <card_1.CardHeader className="flex flex-row items-center justify-between pb-2">
              <card_1.CardTitle className="text-sm font-medium">Por Status</card_1.CardTitle>
              <lucide_react_1.BarChart className="h-4 w-4 text-muted-foreground"/>
            </card_1.CardHeader>
            <card_1.CardContent>
              <div className="text-2xl font-bold">
                {stats.statusCount.active || 0} <span className="text-sm font-normal">ativos</span>
              </div>
              <card_1.CardDescription>
                {stats.statusCount.draft || 0} rascunhos, {stats.statusCount.archived || 0} arquivados
              </card_1.CardDescription>
            </card_1.CardContent>
          </card_1.Card>
        </div>

        <section_1.Section title="Visão Geral dos Agentes">
          <div className="text-center py-12 border rounded-lg">
            <p className="text-muted-foreground mb-4">Estatísticas detalhadas estarão disponíveis em breve.</p>
            <link_1.default href="/agentes">
              <button_1.Button className="bg-purple-600 hover:bg-purple-700">Voltar para a lista de agentes</button_1.Button>
            </link_1.default>
          </div>
        </section_1.Section>
      </div>
    </div>);
}
