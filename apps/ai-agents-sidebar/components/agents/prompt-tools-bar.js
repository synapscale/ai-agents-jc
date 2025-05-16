"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptToolsBar = PromptToolsBar;
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
/**
 * PromptToolsBar - Barra de ferramentas para o editor de prompt
 */
function PromptToolsBar(_a) {
    var tools = _a.tools, onToolClick = _a.onToolClick, className = _a.className;
    return (<div className={(0, utils_1.cn)("flex flex-nowrap gap-2 mb-3 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:gap-3 scrollbar-hide", className)} role="toolbar" aria-label="Ferramentas de prompt">
      {tools.map(function (tool) { return (<button_1.Button key={tool.id} variant="outline" size="sm" className="h-7 sm:h-8 text-xs rounded-full whitespace-nowrap flex-shrink-0" onClick={function () { return onToolClick === null || onToolClick === void 0 ? void 0 : onToolClick(tool.id); }} aria-label={"Adicionar ".concat(tool.name)}>
          {tool.icon}
          {tool.name}
          <lucide_react_1.Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 ml-1" aria-hidden="true"/>
        </button_1.Button>); })}
    </div>);
}
