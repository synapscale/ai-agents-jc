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
exports.default = AgentsPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var use_local_storage_1 = require("../../../../shared/hooks/use-local-storage");
var skeleton_1 = require("../../components/ui/skeleton");
var agent_list_header_1 = require("../../components/agents/agent-list-header");
var agent_list_filters_1 = require("../../components/agents/agent-list-filters");
var agent_list_empty_1 = require("../../components/agents/agent-list-empty");
var agent_card_1 = require("../../components/agents/agent-card");
var agent_delete_dialog_1 = require("../../components/agents/agent-delete-dialog");
var date_utils_1 = require("../../../../shared/utils/date-utils");
// Sample agents data
var SAMPLE_AGENTS = [
    {
        id: "1",
        name: "Assistente de Suporte Técnico",
        type: "chat",
        model: "gpt-4o",
        description: "Assistente especializado em resolver problemas técnicos",
        status: "active",
        createdAt: "2023-05-15T10:30:00.000Z",
        updatedAt: "2023-05-15T10:30:00.000Z",
    },
    {
        id: "2",
        name: "Gerador de Conteúdo para Blog",
        type: "texto",
        model: "gpt-4",
        description: "Cria artigos de blog sobre diversos temas",
        status: "draft",
        createdAt: "2023-05-10T14:20:00.000Z",
        updatedAt: "2023-05-14T09:15:00.000Z",
    },
    {
        id: "3",
        name: "Assistente de Pesquisa Acadêmica",
        type: "chat",
        model: "gpt-4",
        description: "Auxilia em pesquisas acadêmicas e formatação de trabalhos",
        status: "active",
        createdAt: "2023-05-05T08:45:00.000Z",
        updatedAt: "2023-05-12T16:30:00.000Z",
    },
];
function AgentsPage() {
    var router = (0, navigation_1.useRouter)();
    var _a = (0, use_local_storage_1.useLocalStorage)("agents", SAMPLE_AGENTS), agents = _a[0], setAgents = _a[1];
    var _b = (0, react_1.useState)(""), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)("all"), statusFilter = _c[0], setStatusFilter = _c[1];
    var _d = (0, react_1.useState)(true), isLoading = _d[0], setIsLoading = _d[1];
    var _e = (0, react_1.useState)(null), agentToDelete = _e[0], setAgentToDelete = _e[1];
    // Simulate loading state
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setIsLoading(false);
        }, 800);
        return function () { return clearTimeout(timer); };
    }, []);
    // Filter agents based on search query and status
    var filteredAgents = (0, react_1.useMemo)(function () {
        return agents.filter(function (agent) {
            var matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (agent.description && agent.description.toLowerCase().includes(searchQuery.toLowerCase()));
            var matchesStatus = statusFilter === "all" || agent.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [agents, searchQuery, statusFilter]);
    // Handle agent deletion
    var handleDeleteAgent = function () {
        if (agentToDelete) {
            setAgents(agents.filter(function (agent) { return agent.id !== agentToDelete.id; }));
            setAgentToDelete(null);
        }
    };
    // Handle agent duplication
    var handleDuplicateAgent = function (agent) {
        var newAgent = __assign(__assign({}, agent), { id: Date.now().toString(), name: "".concat(agent.name, " (C\u00F3pia)"), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), status: "draft" });
        setAgents(__spreadArray(__spreadArray([], agents, true), [newAgent], false));
    };
    // Navigate to create new agent
    var handleCreateAgent = function () {
        router.push("/agentes/novo");
    };
    // Render loading state
    if (isLoading) {
        return (<div className="container py-6">
				<div className="flex justify-between items-center mb-6">
					<skeleton_1.Skeleton className="h-8 w-48"/>
					<skeleton_1.Skeleton className="h-10 w-32"/>
				</div>

				<div className="flex items-center gap-4 mb-6">
					<skeleton_1.Skeleton className="h-10 flex-1"/>
					<skeleton_1.Skeleton className="h-10 w-32"/>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{[1, 2, 3, 4, 5, 6].map(function (i) { return (<skeleton_1.Skeleton key={i} className="h-48 w-full"/>); })}
				</div>
			</div>);
    }
    return (<div className="container py-6">
			{/* Header */}
			<agent_list_header_1.AgentListHeader onCreateAgent={handleCreateAgent}/>

			{/* Filters */}
			<agent_list_filters_1.AgentListFilters searchQuery={searchQuery} statusFilter={statusFilter} onSearchChange={setSearchQuery} onStatusChange={function (value) { return setStatusFilter(value); }}/>

			{/* Agent list */}
			{filteredAgents.length === 0 ? (<agent_list_empty_1.AgentListEmpty onCreateAgent={handleCreateAgent}/>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{filteredAgents.map(function (agent) { return (<agent_card_1.AgentCard key={agent.id} agent={agent} onDuplicate={handleDuplicateAgent} onDelete={setAgentToDelete} formatDate={date_utils_1.formatDate}/>); })}
				</div>)}

			{/* Delete confirmation dialog */}
			<agent_delete_dialog_1.AgentDeleteDialog agent={agentToDelete} onOpenChange={function (open) { return !open && setAgentToDelete(null); }} onConfirm={handleDeleteAgent}/>
		</div>);
}
