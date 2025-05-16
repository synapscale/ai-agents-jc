"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentViewPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var section_1 = require("@/components/ui/section");
var tabs_1 = require("@/components/ui/tabs");
var skeleton_1 = require("@/components/ui/skeleton");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var use_toast_1 = require("@/components/ui/use-toast");
var use_local_storage_1 = require("@/hooks/use-local-storage");
var utils_1 = require("@/lib/utils");
function AgentViewPage(_a) {
    var params = _a.params;
    var router = (0, navigation_1.useRouter)();
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var _c = (0, use_local_storage_1.useLocalStorage)("agents", []), agents = _c[0], setAgents = _c[1];
    var _d = (0, react_1.useState)(false), deleteDialogOpen = _d[0], setDeleteDialogOpen = _d[1];
    // Find the agent
    var agent = (0, react_1.useMemo)(function () {
        return agents.find(function (a) { return a.id === params.id; });
    }, [agents, params.id]);
    // Simulate loading
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setIsLoading(false);
        }, 1000);
        return function () { return clearTimeout(timer); };
    }, []);
    // Handle delete
    var handleDelete = function () {
        setAgents(function (prev) { return prev.filter(function (a) { return a.id !== params.id; }); });
        (0, use_toast_1.toast)({
            title: "Agente excluído",
            description: "O agente foi removido com sucesso.",
            variant: "default",
        });
        router.push("/agentes");
    };
    // Handle duplicate
    var handleDuplicate = function () {
        if (!agent)
            return;
        var newAgent = __assign(__assign({}, agent), { id: Date.now().toString(), name: "".concat(agent.name, " (C\u00F3pia)"), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "draft" });
        setAgents(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newAgent], false); });
        (0, use_toast_1.toast)({
            title: "Agente duplicado",
            description: "Uma cópia do agente foi criada com sucesso.",
        });
        router.push("/agentes/".concat(newAgent.id, "/view"));
    };
    // Handle archive/unarchive
    var handleToggleArchive = function () {
        if (!agent)
            return;
        setAgents(function (prev) {
            return prev.map(function (a) {
                return a.id === agent.id
                    ? __assign(__assign({}, a), { status: a.status === "archived" ? "active" : "archived", updatedAt: new Date().toISOString() }) : a;
            });
        });
        (0, use_toast_1.toast)({
            title: agent.status === "archived" ? "Agente ativado" : "Agente arquivado",
            description: agent.status === "archived"
                ? "O agente foi movido para ativos."
                : "O agente foi arquivado e não aparecerá nas listas padrão.",
        });
    };
    // Format date
    var formatDate = function (dateString) {
        var date = new Date(dateString);
        return new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };
    // Get status badge
    var getStatusBadge = function (status) {
        switch (status) {
            case "active":
                return (<badge_1.Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <lucide_react_1.CheckCircle2 className="mr-1 h-3 w-3"/>
            Ativo
          </badge_1.Badge>);
            case "draft":
                return (<badge_1.Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <lucide_react_1.Edit className="mr-1 h-3 w-3"/>
            Rascunho
          </badge_1.Badge>);
            case "archived":
                return (<badge_1.Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            <lucide_react_1.AlertCircle className="mr-1 h-3 w-3"/>
            Arquivado
          </badge_1.Badge>);
            default:
                return null;
        }
    };
    // Loading state
    if (isLoading) {
        return (<div className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <skeleton_1.Skeleton className="h-9 w-24"/>
            <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
            <skeleton_1.Skeleton className="h-8 w-64"/>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <skeleton_1.Skeleton className="h-6 w-20"/>
              <skeleton_1.Skeleton className="h-6 w-16"/>
              <skeleton_1.Skeleton className="h-6 w-24"/>
            </div>
            <div className="flex gap-2">
              <skeleton_1.Skeleton className="h-9 w-24"/>
              <skeleton_1.Skeleton className="h-9 w-24"/>
              <skeleton_1.Skeleton className="h-9 w-24"/>
            </div>
          </div>

          <skeleton_1.Skeleton className="h-10 w-full mb-6"/>

          <skeleton_1.Skeleton className="h-64 w-full mb-6"/>

          <skeleton_1.Skeleton className="h-32 w-full"/>
        </div>
      </div>);
    }
    // Agent not found
    if (!agent) {
        return (<div className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <link_1.default href="/agentes" className="flex items-center text-gray-500 hover:text-gray-900">
              <lucide_react_1.ArrowLeft className="mr-1 h-4 w-4"/>
              Voltar
            </link_1.default>
            <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
            <h1 className="text-xl font-bold">Agente não encontrado</h1>
          </div>

          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground mb-4">O agente solicitado não foi encontrado.</p>
            <link_1.default href="/agentes">
              <button_1.Button className="bg-purple-600 hover:bg-purple-700">Voltar para a lista de agentes</button_1.Button>
            </link_1.default>
          </div>
        </div>
      </div>);
    }
    return (<div className="p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <link_1.default href="/agentes" className="flex items-center text-gray-500 hover:text-gray-900">
            <lucide_react_1.ArrowLeft className="mr-1 h-4 w-4"/>
            Voltar
          </link_1.default>
          <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
          <h1 className="text-xl font-bold truncate">{agent.name}</h1>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge(agent.status)}
            <badge_1.Badge variant="outline" className="bg-muted/30">
              {agent.type}
            </badge_1.Badge>
            <badge_1.Badge variant="outline" className="bg-muted/30">
              {agent.model}
            </badge_1.Badge>
          </div>

          <div className="flex flex-wrap gap-2">
            <button_1.Button variant="outline" size="sm" className="h-9" onClick={handleToggleArchive}>
              {agent.status === "archived" ? (<>
                  <lucide_react_1.CheckCircle2 className="mr-1.5 h-4 w-4"/>
                  Ativar
                </>) : (<>
                  <lucide_react_1.AlertCircle className="mr-1.5 h-4 w-4"/>
                  Arquivar
                </>)}
            </button_1.Button>

            <button_1.Button variant="outline" size="sm" className="h-9" onClick={handleDuplicate}>
              <lucide_react_1.Copy className="mr-1.5 h-4 w-4"/>
              Duplicar
            </button_1.Button>

            <link_1.default href={"/agentes/".concat(agent.id)}>
              <button_1.Button variant="outline" size="sm" className="h-9">
                <lucide_react_1.Edit className="mr-1.5 h-4 w-4"/>
                Editar
              </button_1.Button>
            </link_1.default>

            <button_1.Button variant="outline" size="sm" className="h-9 text-destructive hover:text-destructive" onClick={function () { return setDeleteDialogOpen(true); }}>
              <lucide_react_1.Trash2 className="mr-1.5 h-4 w-4"/>
              Excluir
            </button_1.Button>

            <button_1.Button className="h-9 bg-purple-600 hover:bg-purple-700 text-white">
              <lucide_react_1.MessageSquare className="mr-1.5 h-4 w-4"/>
              Conversar
            </button_1.Button>
          </div>
        </div>

        <tabs_1.Tabs defaultValue="prompt" className="mb-6">
          <tabs_1.TabsList className="mb-4">
            <tabs_1.TabsTrigger value="prompt">Prompt</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="details">Detalhes</tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="connections">Conexões</tabs_1.TabsTrigger>
          </tabs_1.TabsList>

          <tabs_1.TabsContent value="prompt">
            <section_1.Section title="Prompt do Agente">
              <div className="bg-muted/20 p-4 rounded-md border font-mono text-sm whitespace-pre-wrap">
                {agent.prompt}
              </div>
            </section_1.Section>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="details">
            <section_1.Section title="Informações do Agente">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                    <p>{agent.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tipo</h3>
                    <p>{agent.type}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Modelo</h3>
                    <p>{agent.model}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <p>{getStatusBadge(agent.status)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Criado em</h3>
                    <p>{formatDate(agent.createdAt)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Atualizado em</h3>
                    <p>{formatDate(agent.updatedAt)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                    <p className="font-mono text-xs">{agent.id}</p>
                  </div>
                </div>
              </div>
            </section_1.Section>
          </tabs_1.TabsContent>

          <tabs_1.TabsContent value="connections">
            <div className="space-y-6">
              <section_1.Section title="Agentes Relacionados">
                {agent.agents && agent.agents.length > 0 ? (<div className="flex flex-wrap gap-2">
                    {agent.agents.map(function (relatedAgent) { return (<badge_1.Badge key={relatedAgent.id} variant="secondary" className="px-2 py-1">
                        {relatedAgent.label}
                      </badge_1.Badge>); })}
                  </div>) : (<p className="text-muted-foreground">Nenhum agente relacionado.</p>)}
              </section_1.Section>

              <section_1.Section title="URLs Relacionadas">
                {agent.urls && agent.urls.length > 0 ? (<div className="flex flex-wrap gap-2">
                    {agent.urls.map(function (url) { return (<badge_1.Badge key={url.id} variant="secondary" className="px-2 py-1">
                        {url.label}
                      </badge_1.Badge>); })}
                  </div>) : (<p className="text-muted-foreground">Nenhuma URL relacionada.</p>)}
              </section_1.Section>
            </div>
          </tabs_1.TabsContent>
        </tabs_1.Tabs>

        <div className={(0, utils_1.cn)("p-4 rounded-md border", agent.status === "archived" ? "bg-gray-50" : "bg-blue-50")}>
          <h3 className="font-medium mb-1">{agent.status === "archived" ? "Agente arquivado" : "Dica"}</h3>
          <p className="text-sm text-muted-foreground">
            {agent.status === "archived"
            ? "Este agente está arquivado e não aparecerá nas listas padrão. Você pode ativá-lo novamente clicando no botão 'Ativar'."
            : "Você pode testar este agente clicando no botão 'Conversar' acima."}
          </p>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <alert_dialog_1.AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <alert_dialog_1.AlertDialogContent>
          <alert_dialog_1.AlertDialogHeader>
            <alert_dialog_1.AlertDialogTitle>Excluir agente</alert_dialog_1.AlertDialogTitle>
            <alert_dialog_1.AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o agente e removerá seus dados de nossos
              servidores.
            </alert_dialog_1.AlertDialogDescription>
          </alert_dialog_1.AlertDialogHeader>
          <alert_dialog_1.AlertDialogFooter>
            <alert_dialog_1.AlertDialogCancel>Cancelar</alert_dialog_1.AlertDialogCancel>
            <alert_dialog_1.AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </alert_dialog_1.AlertDialogAction>
          </alert_dialog_1.AlertDialogFooter>
        </alert_dialog_1.AlertDialogContent>
      </alert_dialog_1.AlertDialog>
    </div>);
}
