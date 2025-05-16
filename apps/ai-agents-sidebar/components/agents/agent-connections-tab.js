"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentConnectionsTab = AgentConnectionsTab;
var badge_list_1 = require("@/components/ui/badge-list");
var section_1 = require("@/components/ui/section");
/**
 * Component for the connections tab of the agent form
 *
 * This component displays and manages the connections for an agent,
 * including related agents and URLs.
 *
 * @example
 * ```tsx
 * <AgentConnectionsTab
 *   agents={form.values.agents}
 *   urls={form.values.urls}
 *   onAddAgent={addAgent}
 *   onRemoveAgent={removeAgent}
 *   onAddUrl={addUrl}
 *   onRemoveUrl={removeUrl}
 *   onEditAgent={editAgent}
 *   onEditUrl={editUrl}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentConnectionsTab(_a) {
    var 
    // Required props
    agents = _a.agents, urls = _a.urls, onAddAgent = _a.onAddAgent, onRemoveAgent = _a.onRemoveAgent, onAddUrl = _a.onAddUrl, onRemoveUrl = _a.onRemoveUrl, 
    // Optional props with defaults
    onEditAgent = _a.onEditAgent, onEditUrl = _a.onEditUrl, _b = _a.maxAgents, maxAgents = _b === void 0 ? 10 : _b, _c = _a.maxUrls, maxUrls = _c === void 0 ? 10 : _c, _d = _a.agentsEmptyMessage, agentsEmptyMessage = _d === void 0 ? "Nenhum agente relacionado. Clique em 'Adicionar Agente' para vincular agentes." : _d, _e = _a.urlsEmptyMessage, urlsEmptyMessage = _e === void 0 ? "Nenhuma URL relacionada. Clique em 'Adicionar URL' para vincular URLs." : _e, _f = _a.showAgentsSection, showAgentsSection = _f === void 0 ? true : _f, _g = _a.showUrlsSection, showUrlsSection = _g === void 0 ? true : _g, _h = _a.agentsSectionTitle, agentsSectionTitle = _h === void 0 ? "Agentes Relacionados" : _h, _j = _a.urlsSectionTitle, urlsSectionTitle = _j === void 0 ? "URLs Relacionadas" : _j, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var componentId = id || "agent-connections-tab";
    return (<div className={className} id={componentId} data-testid={testId} aria-label={ariaLabel || "Conexões do agente"}>
      {/* Seção de agentes relacionados */}
      {showAgentsSection && (<section_1.Section title={agentsSectionTitle} id={"".concat(componentId, "-agents-section")} aria-label={agentsSectionTitle}>
          <badge_list_1.BadgeList items={agents} onAdd={onAddAgent} onRemove={onRemoveAgent} onEdit={onEditAgent} addLabel="Agente" maxItems={maxAgents} emptyMessage={agentsEmptyMessage} id={"".concat(componentId, "-agents-list")} aria-label="Lista de agentes relacionados"/>
        </section_1.Section>)}

      {/* Seção de URLs */}
      {showUrlsSection && (<section_1.Section title={urlsSectionTitle} className="mt-4" id={"".concat(componentId, "-urls-section")} aria-label={urlsSectionTitle}>
          <badge_list_1.BadgeList items={urls} onAdd={onAddUrl} onRemove={onRemoveUrl} onEdit={onEditUrl} addLabel="URL" maxItems={maxUrls} emptyMessage={urlsEmptyMessage} id={"".concat(componentId, "-urls-list")} aria-label="Lista de URLs relacionadas"/>
        </section_1.Section>)}
    </div>);
}
