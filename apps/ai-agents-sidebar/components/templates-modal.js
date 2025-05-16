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
exports.TemplatesModal = TemplatesModal;
var react_1 = require("react");
var react_2 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var template_list_1 = require("@/components/templates/template-list");
var template_preview_1 = require("@/components/templates/template-preview");
var template_form_1 = require("@/components/templates/template-form");
var category_selector_1 = require("@/components/templates/category-selector");
var category_manager_1 = require("@/components/templates/category-manager");
var use_local_storage_1 = require("@/hooks/use-local-storage");
// Default templates
var DEFAULT_TEMPLATES = [
    {
        id: "1",
        name: "Assistente de Suporte Técnico",
        description: "Template para um assistente especializado em suporte técnico",
        content: "# Assistente de Suporte T\u00E9cnico\n\nVoc\u00EA \u00E9 um assistente especializado em fornecer suporte t\u00E9cnico para produtos de tecnologia. Seu objetivo \u00E9 ajudar os usu\u00E1rios a resolver problemas t\u00E9cnicos de forma clara e eficiente.\n\n## Capacidades:\n- Diagnosticar problemas t\u00E9cnicos com base nas descri\u00E7\u00F5es dos usu\u00E1rios\n- Fornecer instru\u00E7\u00F5es passo a passo para resolu\u00E7\u00E3o de problemas\n- Explicar conceitos t\u00E9cnicos em linguagem simples\n- Recomendar recursos adicionais quando necess\u00E1rio\n\n## Comportamento:\n- Seja paciente e compreensivo com usu\u00E1rios de todos os n\u00EDveis de conhecimento t\u00E9cnico\n- Fa\u00E7a perguntas para esclarecer o problema quando a descri\u00E7\u00E3o for vaga\n- Priorize solu\u00E7\u00F5es mais simples antes de sugerir procedimentos complexos\n- Confirme se o problema foi resolvido ap\u00F3s fornecer uma solu\u00E7\u00E3o",
        categories: ["Suporte", "Geral"],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
    },
    {
        id: "2",
        name: "Assistente de Redação",
        description: "Template para um assistente especializado em redação e revisão de textos",
        content: "# Assistente de Reda\u00E7\u00E3o e Revis\u00E3o\n\nVoc\u00EA \u00E9 um assistente especializado em reda\u00E7\u00E3o e revis\u00E3o de textos. Seu objetivo \u00E9 ajudar os usu\u00E1rios a melhorar a qualidade de seus textos, corrigindo erros e sugerindo melhorias.\n\n## Capacidades:\n- Revisar textos para corrigir erros gramaticais e ortogr\u00E1ficos\n- Sugerir melhorias de clareza, coes\u00E3o e coer\u00EAncia\n- Ajudar a adaptar o tom e estilo para diferentes p\u00FAblicos e contextos\n- Fornecer feedback construtivo sobre a estrutura do texto\n\n## Comportamento:\n- Seja detalhista na identifica\u00E7\u00E3o de problemas no texto\n- Explique o motivo das corre\u00E7\u00F5es e sugest\u00F5es\n- Respeite o estilo e a voz do autor\n- Priorize a clareza e a precis\u00E3o na comunica\u00E7\u00E3o",
        categories: ["Redação", "Geral"],
        createdAt: "2023-01-02T00:00:00.000Z",
        updatedAt: "2023-01-02T00:00:00.000Z",
    },
    {
        id: "3",
        name: "Assistente de Pesquisa",
        description: "Template para um assistente especializado em pesquisa e análise de informações",
        content: "# Assistente de Pesquisa e An\u00E1lise\n\nVoc\u00EA \u00E9 um assistente especializado em pesquisa e an\u00E1lise de informa\u00E7\u00F5es. Seu objetivo \u00E9 ajudar os usu\u00E1rios a encontrar, organizar e compreender informa\u00E7\u00F5es sobre diversos t\u00F3picos.\n\n## Capacidades:\n- Sintetizar informa\u00E7\u00F5es complexas em resumos claros e concisos\n- Organizar informa\u00E7\u00F5es em estruturas l\u00F3gicas e compreens\u00EDveis\n- Identificar padr\u00F5es e tend\u00EAncias em conjuntos de dados\n- Formular perguntas relevantes para aprofundar a pesquisa\n\n## Comportamento:\n- Seja met\u00F3dico e sistem\u00E1tico na abordagem de pesquisa\n- Cite fontes e refer\u00EAncias quando dispon\u00EDveis\n- Diferencie claramente entre fatos, opini\u00F5es e especula\u00E7\u00F5es\n- Reconhe\u00E7a limita\u00E7\u00F5es e incertezas nas informa\u00E7\u00F5es dispon\u00EDveis",
        categories: ["Pesquisa", "Geral"],
        createdAt: "2023-01-03T00:00:00.000Z",
        updatedAt: "2023-01-03T00:00:00.000Z",
    },
];
// Default categories
var DEFAULT_CATEGORIES = ["Suporte", "Redação", "Pesquisa", "Marketing", "Desenvolvimento", "Geral"];
function TemplatesModal(_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, onSelectTemplate = _a.onSelectTemplate, _b = _a.currentPrompt, currentPrompt = _b === void 0 ? "" : _b;
    // Estados
    var _c = (0, use_local_storage_1.useLocalStorage)("prompt-templates", DEFAULT_TEMPLATES), templates = _c[0], setTemplates = _c[1];
    var _d = (0, use_local_storage_1.useLocalStorage)("template-categories", DEFAULT_CATEGORIES), categories = _d[0], setCategories = _d[1];
    var _e = (0, react_2.useState)("todos"), selectedCategory = _e[0], setSelectedCategory = _e[1];
    var _f = (0, react_2.useState)(null), selectedTemplate = _f[0], setSelectedTemplate = _f[1];
    var _g = (0, react_2.useState)(false), isCreating = _g[0], setIsCreating = _g[1];
    var _h = (0, react_2.useState)(false), isManagingCategories = _h[0], setIsManagingCategories = _h[1];
    var _j = (0, react_2.useState)(""), searchQuery = _j[0], setSearchQuery = _j[1];
    // Resetar seleção quando o modal é aberto
    (0, react_2.useEffect)(function () {
        if (isOpen) {
            setSelectedTemplate(null);
            setIsCreating(false);
            setIsManagingCategories(false);
            setSelectedCategory("todos");
            setSearchQuery("");
        }
    }, [isOpen]);
    // Filtrar templates por categoria e pesquisa
    var filteredTemplates = (0, react_1.useMemo)(function () {
        var filtered = templates;
        if (selectedCategory !== "todos") {
            filtered = filtered.filter(function (template) { return template.categories.includes(selectedCategory); });
        }
        if (searchQuery) {
            filtered = filtered.filter(function (template) {
                return template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (template.description && template.description.toLowerCase().includes(searchQuery.toLowerCase()));
            });
        }
        return filtered;
    }, [templates, selectedCategory, searchQuery]);
    // Manipuladores
    var handleSelectTemplate = function (template) {
        setSelectedTemplate(template);
        setIsCreating(false);
    };
    var handleCreateTemplate = function () {
        setSelectedTemplate(null);
        setIsCreating(true);
    };
    var handleSaveTemplate = function (template) {
        if (template.id) {
            // Atualizar template existente
            setTemplates(templates.map(function (t) { return (t.id === template.id ? template : t); }));
        }
        else {
            // Criar novo template
            var newTemplate = __assign(__assign({}, template), { id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
            setTemplates(__spreadArray(__spreadArray([], templates, true), [newTemplate], false));
        }
        setIsCreating(false);
        setSelectedTemplate(null);
    };
    var handleDeleteTemplate = function (id) {
        setTemplates(templates.filter(function (t) { return t.id !== id; }));
        setSelectedTemplate(null);
    };
    var handleUseTemplate = function (template) {
        onSelectTemplate(template);
        onClose();
    };
    var handleAddCategory = function (category) {
        if (!categories.includes(category)) {
            setCategories(__spreadArray(__spreadArray([], categories, true), [category], false));
        }
    };
    var handleUpdateCategory = function (oldCategory, newCategory) {
        setCategories(categories.map(function (c) { return (c === oldCategory ? newCategory : c); }));
        setTemplates(templates.map(function (t) { return (__assign(__assign({}, t), { categories: t.categories.map(function (cat) { return (cat === oldCategory ? newCategory : cat); }) })); }));
        if (selectedCategory === oldCategory) {
            setSelectedCategory(newCategory);
        }
    };
    var handleDeleteCategory = function (category) {
        setCategories(categories.filter(function (c) { return c !== category; }));
        // Atualizar templates que usam esta categoria
        setTemplates(templates.map(function (t) { return (__assign(__assign({}, t), { categories: t.categories.filter(function (c) { return c !== category; }) })); }));
        if (selectedCategory === category) {
            setSelectedCategory("todos");
        }
    };
    var getTemplateCountsByCategory = function () {
        return templates.reduce(function (acc, template) {
            template.categories.forEach(function (category) {
                acc[category] = (acc[category] || 0) + 1;
            });
            return acc;
        }, {});
    };
    var templateCounts = getTemplateCountsByCategory();
    var isValidTemplate = function (template) {
        return !!template.name && !!template.content && !!template.categories && template.categories.length > 0;
    };
    return (<dialog_1.Dialog open={isOpen} onOpenChange={function (open) { return !open && onClose(); }}>
      <dialog_1.DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col">
        <dialog_1.DialogHeader>
          <dialog_1.DialogTitle>
            {isManagingCategories
            ? "Gerenciar Categorias"
            : isCreating
                ? "Criar Novo Template"
                : selectedTemplate
                    ? "Detalhes do Template"
                    : "Biblioteca de Templates"}
          </dialog_1.DialogTitle>
        </dialog_1.DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row gap-4">
          {isManagingCategories ? (<category_manager_1.CategoryManager categories={categories} onAddCategory={handleAddCategory} onUpdateCategory={handleUpdateCategory} onDeleteCategory={handleDeleteCategory} onBack={function () { return setIsManagingCategories(false); }} templateCounts={templateCounts}/>) : isCreating ? (<template_form_1.TemplateForm template={{ categories: ["Geral"], content: currentPrompt }} onChange={function (field, value) {
                setSelectedTemplate(function (prev) {
                    var _a;
                    return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
                });
            }} onSubmit={function () {
                if (isValidTemplate(selectedTemplate)) {
                    handleSaveTemplate(selectedTemplate);
                }
            }} onCancel={function () { return setIsCreating(false); }} categories={categories} onManageCategories={function () { return setIsManagingCategories(true); }} isValid={isValidTemplate(selectedTemplate)} isEdit={false}/>) : selectedTemplate ? (<template_preview_1.TemplatePreview template={selectedTemplate} onUse={handleUseTemplate}/>) : (<>
              <div className="md:w-1/3 flex flex-col">
                <category_selector_1.CategorySelector selectedCategories={[selectedCategory]} availableCategories={categories} onAddCategory={function () { }} onRemoveCategory={function () { }} onManageCategories={function () { return setIsManagingCategories(true); }}/>
              </div>
              <div className="md:w-2/3 flex flex-col overflow-hidden">
                <template_list_1.TemplateList templates={filteredTemplates} categories={categories} selectedTemplate={selectedTemplate} filterCategory={selectedCategory} searchQuery={searchQuery} onSelectTemplate={handleSelectTemplate} onEditTemplate={function (template) {
                setSelectedTemplate(template);
                setIsCreating(true);
            }} onDeleteTemplate={handleDeleteTemplate} onCopyContent={function (content) { return navigator.clipboard.writeText(content); }} onUseTemplate={handleUseTemplate} onCreateTemplate={handleCreateTemplate} onManageCategories={function () { return setIsManagingCategories(true); }} onFilterCategoryChange={function (category) { return setSelectedCategory(category); }} onSearchQueryChange={function (query) { return setSearchQuery(query); }}/>
              </div>
            </>)}
        </div>
      </dialog_1.DialogContent>
    </dialog_1.Dialog>);
}
