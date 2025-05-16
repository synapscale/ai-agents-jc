"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCard = AgentCard;
var navigation_1 = require("next/navigation");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
/**
 * Component for displaying an agent card in the listing
 *
 * This component displays an agent card with actions for viewing, editing,
 * testing, duplicating, and deleting the agent.
 *
 * @example
 * ```tsx
 * <AgentCard
 *   agent={agent}
 *   onDuplicate={handleDuplicate}
 *   onDelete={handleDelete}
 *   formatDate={formatDate}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentCard(_a) {
    var 
    // Required props
    agent = _a.agent, onDuplicate = _a.onDuplicate, onDelete = _a.onDelete, formatDate = _a.formatDate, 
    // Optional props with defaults
    onView = _a.onView, onEdit = _a.onEdit, onTest = _a.onTest, _b = _a.showActions, showActions = _b === void 0 ? true : _b, _c = _a.customActions, customActions = _c === void 0 ? [] : _c, _d = _a.showFooter, showFooter = _d === void 0 ? true : _d, _e = _a.showBadges, showBadges = _e === void 0 ? true : _e, onClick = _a.onClick, _f = _a.isSelected, isSelected = _f === void 0 ? false : _f, _g = _a.selectable, selectable = _g === void 0 ? false : _g, onSelect = _a.onSelect, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var router = (0, navigation_1.useRouter)();
    var handleView = function () {
        if (onView) {
            onView(agent);
        }
        else {
            router.push("/agentes/".concat(agent.id, "/view"));
        }
    };
    var handleEdit = function () {
        if (onEdit) {
            onEdit(agent);
        }
        else {
            router.push("/agentes/".concat(agent.id));
        }
    };
    var handleTest = function () {
        if (onTest) {
            onTest(agent);
        }
        else {
            router.push("/agentes/".concat(agent.id, "/test"));
        }
    };
    var handleClick = function () {
        if (selectable && onSelect) {
            onSelect(agent);
        }
        else if (onClick) {
            onClick(agent);
        }
        else {
            handleEdit();
        }
    };
    var componentId = id || "agent-card-".concat(agent.id);
    return (<card_1.Card className={(0, utils_1.cn)("overflow-hidden hover:shadow-md transition-shadow", isSelected && "ring-2 ring-purple-500", selectable && "cursor-pointer", className)} id={componentId} data-testid={testId} aria-label={ariaLabel || "Agente: ".concat(agent.name)} data-selected={isSelected} onClick={selectable || onClick ? handleClick : undefined}>
      <card_1.CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <card_1.CardTitle className="truncate">{agent.name}</card_1.CardTitle>
            <card_1.CardDescription className="truncate">{agent.description || "Sem descrição"}</card_1.CardDescription>
          </div>
          {showActions && (<dropdown_menu_1.DropdownMenu>
              <dropdown_menu_1.DropdownMenuTrigger asChild>
                <button_1.Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Opções do agente" data-testid={"".concat(componentId, "-actions-trigger")} onClick={function (e) { return e.stopPropagation(); }} // Prevent card click when clicking dropdown
        >
                  <lucide_react_1.MoreVertical className="h-4 w-4" aria-hidden="true"/>
                  <span className="sr-only">Opções</span>
                </button_1.Button>
              </dropdown_menu_1.DropdownMenuTrigger>
              <dropdown_menu_1.DropdownMenuContent align="end" onClick={function (e) { return e.stopPropagation(); }} // Prevent card click when clicking menu items
        >
                <dropdown_menu_1.DropdownMenuItem onClick={handleView} data-testid={"".concat(componentId, "-view-action")}>
                  <lucide_react_1.Eye className="mr-2 h-4 w-4" aria-hidden="true"/>
                  Visualizar
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuItem onClick={handleEdit} data-testid={"".concat(componentId, "-edit-action")}>
                  <lucide_react_1.Edit className="mr-2 h-4 w-4" aria-hidden="true"/>
                  Editar
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuItem onClick={handleTest} data-testid={"".concat(componentId, "-test-action")}>
                  <lucide_react_1.Play className="mr-2 h-4 w-4" aria-hidden="true"/>
                  Testar
                </dropdown_menu_1.DropdownMenuItem>
                <dropdown_menu_1.DropdownMenuItem onClick={function () { return onDuplicate(agent); }} data-testid={"".concat(componentId, "-duplicate-action")}>
                  <lucide_react_1.Copy className="mr-2 h-4 w-4" aria-hidden="true"/>
                  Duplicar
                </dropdown_menu_1.DropdownMenuItem>
                {customActions.map(function (action, index) { return (<dropdown_menu_1.DropdownMenuItem key={index} onClick={function () { return action.onClick(agent); }} className={action.className} data-testid={"".concat(componentId, "-custom-action-").concat(index)}>
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </dropdown_menu_1.DropdownMenuItem>); })}
                <dropdown_menu_1.DropdownMenuItem onClick={function () { return onDelete(agent); }} className="text-red-600 focus:text-red-600" data-testid={"".concat(componentId, "-delete-action")}>
                  <lucide_react_1.Trash className="mr-2 h-4 w-4" aria-hidden="true"/>
                  Excluir
                </dropdown_menu_1.DropdownMenuItem>
              </dropdown_menu_1.DropdownMenuContent>
            </dropdown_menu_1.DropdownMenu>)}
        </div>
      </card_1.CardHeader>
      <card_1.CardContent className={(0, utils_1.cn)("pb-3", (onClick || selectable) && "cursor-pointer")} onClick={handleClick} data-testid={"".concat(componentId, "-content")}>
        {showBadges && (<div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full" data-testid={"".concat(componentId, "-model-badge")}>
              {agent.model}
            </span>
            <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full" data-testid={"".concat(componentId, "-type-badge")}>
              {agent.type === "chat" ? "Chat" : agent.type === "texto" ? "Texto" : "Imagem"}
            </span>
            {agent.status && (<span className={(0, utils_1.cn)("text-xs font-medium px-2 py-1 rounded-full", agent.status === "active"
                    ? "bg-green-100 text-green-800"
                    : agent.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800")} data-testid={"".concat(componentId, "-status-badge")}>
                {agent.status === "active" ? "Ativo" : agent.status === "draft" ? "Rascunho" : "Arquivado"}
              </span>)}
          </div>)}
      </card_1.CardContent>
      {showFooter && (<card_1.CardFooter className="pt-0 flex justify-between text-xs text-gray-500" data-testid={"".concat(componentId, "-footer")}>
          <span>Criado: {formatDate(agent.createdAt)}</span>
          <span>Atualizado: {formatDate(agent.updatedAt)}</span>
        </card_1.CardFooter>)}
    </card_1.Card>);
}
