"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentListFilters = AgentListFilters;
var input_1 = require("@/components/ui/input");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
/**
 * Filters component for the agent listing page
 *
 * This component displays the filters for the agent listing page,
 * including search and status filters.
 *
 * @example
 * ```tsx
 * <AgentListFilters
 *   searchQuery={searchQuery}
 *   statusFilter={statusFilter}
 *   onSearchChange={setSearchQuery}
 *   onStatusChange={setStatusFilter}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentListFilters(_a) {
    var 
    // Required props
    searchQuery = _a.searchQuery, statusFilter = _a.statusFilter, onSearchChange = _a.onSearchChange, onStatusChange = _a.onStatusChange, 
    // Optional props with defaults
    _b = _a.searchPlaceholder, 
    // Optional props with defaults
    searchPlaceholder = _b === void 0 ? "Buscar agentes..." : _b, _c = _a.showStatusFilter, showStatusFilter = _c === void 0 ? true : _c, customFilters = _a.customFilters, onClearFilters = _a.onClearFilters, _d = _a.showClearFilters, showClearFilters = _d === void 0 ? true : _d, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var hasActiveFilters = searchQuery || statusFilter !== "all";
    var componentId = id || "agent-list-filters";
    return (<div className={(0, utils_1.cn)("flex flex-col sm:flex-row items-center gap-4 mb-6", className)} id={componentId} data-testid={testId} aria-label={ariaLabel || "Filtros de agentes"}>
      <div className="relative w-full">
        <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" aria-hidden="true"/>
        <input_1.Input placeholder={searchPlaceholder} value={searchQuery} onChange={function (e) { return onSearchChange(e.target.value); }} className="pl-10 pr-8" aria-label="Buscar agentes" data-testid={"".concat(componentId, "-search-input")}/>
        {searchQuery && (<button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={function () { return onSearchChange(""); }} aria-label="Limpar busca" data-testid={"".concat(componentId, "-clear-search")}>
            <lucide_react_1.X className="h-4 w-4" aria-hidden="true"/>
          </button>)}
      </div>

      {showStatusFilter && (<tabs_1.Tabs value={statusFilter} onValueChange={onStatusChange} className="w-full sm:w-auto" data-testid={"".concat(componentId, "-status-tabs")}>
          <tabs_1.TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <tabs_1.TabsTrigger value="all" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900" data-testid={"".concat(componentId, "-status-all")}>
              Todos
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="active" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900" data-testid={"".concat(componentId, "-status-active")}>
              Ativos
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="draft" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900" data-testid={"".concat(componentId, "-status-draft")}>
              Rascunhos
            </tabs_1.TabsTrigger>
            <tabs_1.TabsTrigger value="archived" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900" data-testid={"".concat(componentId, "-status-archived")}>
              Arquivados
            </tabs_1.TabsTrigger>
          </tabs_1.TabsList>
        </tabs_1.Tabs>)}

      {customFilters}

      {onClearFilters && showClearFilters && hasActiveFilters && (<button_1.Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs" aria-label="Limpar todos os filtros" data-testid={"".concat(componentId, "-clear-all")}>
          <lucide_react_1.X className="mr-1 h-3.5 w-3.5" aria-hidden="true"/>
          Limpar filtros
        </button_1.Button>)}
    </div>);
}
