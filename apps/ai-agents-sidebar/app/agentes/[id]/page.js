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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.default = AgentePage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var use_toast_1 = require("@/components/ui/use-toast");
var agent_form_header_1 = require("@/components/agents/agent-form-header");
var templates_modal_1 = require("@/components/templates-modal");
var use_form_1 = require("@hooks/use-form");
var use_disclosure_1 = require("@hooks/use-disclosure");
var use_local_storage_1 = require("@/hooks/use-local-storage");
var tabs_1 = require("@/components/ui/tabs");
var agent_basic_info_1 = require("@/components/agents/agent-basic-info");
var agent_prompt_tab_1 = require("@/components/agents/agent-prompt-tab");
var agent_parameters_tab_1 = require("@/components/agents/agent-parameters-tab");
var agent_connections_tab_1 = require("@/components/agents/agent-connections-tab");
var agent_form_actions_1 = require("@/components/agents/agent-form-actions");
var agent_form_loading_1 = require("@/components/agents/agent-form-loading");
var agent_not_found_1 = require("@/components/agents/agent-not-found");
var unsaved_changes_dialog_1 = require("@/components/agents/unsaved-changes-dialog");
var form_validation_1 = require("../../../../packages/utils/form-validation");
function AgentePage(_a) {
    var _this = this;
    var _b, _c, _d, _e, _f;
    var params = _a.params;
    var router = (0, navigation_1.useRouter)();
    var isNewAgent = params.id === "novo";
    // State for loading
    var _g = (0, react_1.useState)(true), isLoading = _g[0], setIsLoading = _g[1];
    // State for unsaved changes
    var _h = (0, react_1.useState)(false), hasUnsavedChanges = _h[0], setHasUnsavedChanges = _h[1];
    var _j = (0, react_1.useState)(false), showUnsavedDialog = _j[0], setShowUnsavedDialog = _j[1];
    var _k = (0, react_1.useState)(null), pendingAction = _k[0], setPendingAction = _k[1];
    // State for active tab
    var _l = (0, react_1.useState)("prompt"), activeTab = _l[0], setActiveTab = _l[1];
    // Get agents from local storage
    var _m = (0, use_local_storage_1.useLocalStorage)("agents", []), agents = _m[0], setAgents = _m[1];
    // Estado do modal de templates
    var templatesModal = (0, use_disclosure_1.useDisclosure)();
    // Find existing agent if editing
    var existingAgent = (0, react_1.useMemo)(function () {
        if (isNewAgent)
            return null;
        return agents.find(function (agent) { return agent.id === params.id; });
    }, [agents, isNewAgent, params.id]);
    // Inicializar o formulário com valores padrão ou existentes
    var initialValues = (0, react_1.useMemo)(function () {
        if (isNewAgent) {
            return {
                id: Date.now().toString(),
                name: "",
                type: "chat",
                prompt: DEFAULT_PROMPT,
                model: "gpt-4o",
                status: "draft",
                description: "",
                maxTokens: 2048,
                temperature: 0.7,
                topP: 1,
                frequencyPenalty: 0,
                presencePenalty: 0,
                stopSequences: [],
                userDecision: false,
                urls: [],
                agents: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        }
        else if (existingAgent) {
            // Convert existing agent to full AgentFormData
            return __assign(__assign({}, existingAgent), { prompt: existingAgent.prompt || DEFAULT_PROMPT, status: existingAgent.status || "active", description: existingAgent.description || "", maxTokens: existingAgent.maxTokens || 2048, temperature: existingAgent.temperature || 0.7, topP: existingAgent.topP || 1, frequencyPenalty: existingAgent.frequencyPenalty || 0, presencePenalty: existingAgent.presencePenalty || 0, stopSequences: existingAgent.stopSequences || [], userDecision: existingAgent.userDecision || false, urls: existingAgent.urls || [], agents: existingAgent.agents || [] });
        }
        else {
            // Fallback for when agent is not found
            return {
                id: params.id,
                name: "Agente não encontrado",
                type: "chat",
                prompt: "Agente não encontrado",
                model: "gpt-4o",
                status: "draft",
                description: "",
                maxTokens: 2048,
                temperature: 0.7,
                topP: 1,
                frequencyPenalty: 0,
                presencePenalty: 0,
                stopSequences: [],
                userDecision: false,
                urls: [],
                agents: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
        }
    }, [isNewAgent, existingAgent, params.id]);
    // Simulate loading state
    (0, react_1.useEffect)(function () {
        var timer = setTimeout(function () {
            setIsLoading(false);
        }, 800);
        return function () { return clearTimeout(timer); };
    }, []);
    // Check for unsaved changes
    (0, react_1.useEffect)(function () {
        var handleBeforeUnload = function (e) {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = "";
                return "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return function () { return window.removeEventListener("beforeunload", handleBeforeUnload); };
    }, [hasUnsavedChanges]);
    // Manipulador de envio do formulário
    var handleSubmitForm = (0, react_1.useCallback)(function (values) { return __awaiter(_this, void 0, void 0, function () {
        var now, updatedAgent_1;
        return __generator(this, function (_a) {
            try {
                now = new Date().toISOString();
                updatedAgent_1 = __assign(__assign({}, values), { updatedAt: now, createdAt: values.createdAt || now });
                // Update agents in local storage
                setAgents(function (prev) {
                    if (isNewAgent) {
                        return __spreadArray(__spreadArray([], prev, true), [updatedAgent_1], false);
                    }
                    else {
                        return prev.map(function (agent) { return (agent.id === updatedAgent_1.id ? updatedAgent_1 : agent); });
                    }
                });
                // Reset unsaved changes flag
                setHasUnsavedChanges(false);
                // Show success toast
                (0, use_toast_1.toast)({
                    title: isNewAgent ? "Agente criado com sucesso!" : "Alterações salvas com sucesso!",
                    description: isNewAgent
                        ? "Seu novo agente foi criado e está pronto para uso."
                        : "As alterações no agente foram salvas.",
                    duration: 3000,
                });
                // Redirect to agents list
                router.push("/agentes");
            }
            catch (error) {
                (0, use_toast_1.toast)({
                    title: "Erro ao salvar",
                    description: "Ocorreu um erro ao salvar o agente. Tente novamente.",
                    variant: "destructive",
                    duration: 3000,
                });
                throw error;
            }
            return [2 /*return*/];
        });
    }); }, [isNewAgent, router, setAgents]);
    // Usar o hook de formulário
    var form = (0, use_form_1.useForm)({
        initialValues: initialValues,
        onSubmit: handleSubmitForm,
        validate: form_validation_1.formValidation,
        validateOnBlur: true,
        onChange: function () { return setHasUnsavedChanges(true); },
    });
    // Handle back navigation with unsaved changes
    var handleBack = (0, react_1.useCallback)(function () {
        if (hasUnsavedChanges) {
            setPendingAction("navigate");
            setShowUnsavedDialog(true);
        }
        else {
            router.push("/agentes");
        }
    }, [hasUnsavedChanges, router]);
    // Handle form reset with unsaved changes
    var handleReset = (0, react_1.useCallback)(function () {
        if (hasUnsavedChanges) {
            setPendingAction("reset");
            setShowUnsavedDialog(true);
        }
        else {
            form.reset();
        }
    }, [hasUnsavedChanges, form]);
    // Confirm pending action
    var confirmPendingAction = (0, react_1.useCallback)(function () {
        if (pendingAction === "navigate") {
            router.push("/agentes");
        }
        else if (pendingAction === "reset") {
            form.reset();
            setHasUnsavedChanges(false);
        }
        setShowUnsavedDialog(false);
        setPendingAction(null);
    }, [pendingAction, router, form]);
    // Manipuladores para adicionar URLs e agentes
    var addUrl = (0, react_1.useCallback)(function () {
        form.setValues(function (prev) {
            var newId = Date.now().toString();
            return __assign(__assign({}, prev), { urls: __spreadArray(__spreadArray([], prev.urls, true), [{ id: newId, label: "URL ".concat(prev.urls.length + 1) }], false) });
        });
    }, [form]);
    var addAgent = (0, react_1.useCallback)(function () {
        form.setValues(function (prev) {
            var newId = Date.now().toString();
            return __assign(__assign({}, prev), { agents: __spreadArray(__spreadArray([], prev.agents, true), [{ id: newId, label: "AGENTE ".concat(prev.agents.length + 1) }], false) });
        });
    }, [form]);
    // Manipulador para remover URLs
    var removeUrl = (0, react_1.useCallback)(function (id) {
        form.setValues(function (prev) { return (__assign(__assign({}, prev), { urls: prev.urls.filter(function (url) { return url.id !== id; }) })); });
    }, [form]);
    // Manipulador para remover agentes
    var removeAgent = (0, react_1.useCallback)(function (id) {
        form.setValues(function (prev) { return (__assign(__assign({}, prev), { agents: prev.agents.filter(function (agent) { return agent.id !== id; }) })); });
    }, [form]);
    // Manipulador para selecionar um template
    var handleSelectTemplate = (0, react_1.useCallback)(function (template) {
        form.handleChange("prompt", template.content);
        templatesModal.close();
    }, [form, templatesModal]);
    // Título dinâmico para o cabeçalho
    var headerTitle = (0, react_1.useMemo)(function () {
        if (isLoading)
            return isNewAgent ? "Novo Agente" : "Carregando...";
        return isNewAgent ? "Novo Agente" : "Editar: ".concat(form.values.name);
    }, [isNewAgent, isLoading, form.values.name]);
    // Render loading state
    if (isLoading) {
        return <agent_form_loading_1.AgentFormLoading />;
    }
    // If agent not found and not creating new
    if (!isNewAgent && !existingAgent) {
        return <agent_not_found_1.AgentNotFound />;
    }
    return (<div className="flex flex-col w-full h-full bg-gray-50/50">
      {/* Cabeçalho do formulário */}
      <agent_form_header_1.AgentFormHeader isNewAgent={isNewAgent} isSubmitting={form.isSubmitting} onSubmit={form.handleSubmit} onOpenTemplates={templatesModal.open} isValid={form.isValid} title={headerTitle} onBack={handleBack}/>

      {/* Conteúdo principal */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <form className="space-y-4 sm:space-y-6" onSubmit={function (e) { return form.handleSubmit(e); }}>
            {/* Seção de detalhes do agente */}
            <agent_basic_info_1.AgentBasicInfo name={form.values.name} type={form.values.type} model={form.values.model} description={form.values.description} status={form.values.status} onChangeName={function (value) { return form.handleChange("name", value); }} onChangeType={function (value) { return form.handleChange("type", value); }} onChangeModel={function (value) { return form.handleChange("model", value); }} onChangeDescription={function (value) { return form.handleChange("description", value); }} onChangeStatus={function (value) { return form.handleChange("status", value); }} onBlurName={function () { return form.handleBlur("name"); }} nameError={form.touched.name ? form.errors.name : undefined} isNewAgent={isNewAgent}/>

            {/* Tabs para diferentes seções */}
            <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
              <tabs_1.TabsList className="mb-4 grid w-full grid-cols-3 md:w-auto md:inline-flex">
                <tabs_1.TabsTrigger value="prompt" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900">
                  Prompt
                </tabs_1.TabsTrigger>
                <tabs_1.TabsTrigger value="parameters" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900">
                  Parâmetros
                </tabs_1.TabsTrigger>
                <tabs_1.TabsTrigger value="connections" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-900">
                  Conexões
                </tabs_1.TabsTrigger>
              </tabs_1.TabsList>

              <tabs_1.TabsContent value="prompt" className="focus-visible:outline-none focus-visible:ring-0">
                <agent_prompt_tab_1.AgentPromptTab prompt={form.values.prompt} onChangePrompt={function (value) { return form.handleChange("prompt", value); }} onBlurPrompt={function () { return form.handleBlur("prompt"); }} promptError={form.touched.prompt ? form.errors.prompt : undefined} onOpenTemplates={templatesModal.open}/>
              </tabs_1.TabsContent>

              <tabs_1.TabsContent value="parameters" className="focus-visible:outline-none focus-visible:ring-0">
                <agent_parameters_tab_1.AgentParametersTab maxTokens={((_b = form.values.maxTokens) === null || _b === void 0 ? void 0 : _b.toString()) || ""} temperature={((_c = form.values.temperature) === null || _c === void 0 ? void 0 : _c.toString()) || ""} topP={((_d = form.values.topP) === null || _d === void 0 ? void 0 : _d.toString()) || ""} frequencyPenalty={((_e = form.values.frequencyPenalty) === null || _e === void 0 ? void 0 : _e.toString()) || ""} presencePenalty={((_f = form.values.presencePenalty) === null || _f === void 0 ? void 0 : _f.toString()) || ""} userDecision={form.values.userDecision} onChangeMaxTokens={function (value) { return form.handleChange("maxTokens", Number.parseInt(value) || undefined); }} onChangeTemperature={function (value) {
            return form.handleChange("temperature", Number.parseFloat(value) || undefined);
        }} onChangeTopP={function (value) { return form.handleChange("topP", Number.parseFloat(value) || undefined); }} onChangeFrequencyPenalty={function (value) {
            return form.handleChange("frequencyPenalty", Number.parseFloat(value) || undefined);
        }} onChangePresencePenalty={function (value) {
            return form.handleChange("presencePenalty", Number.parseFloat(value) || undefined);
        }} onChangeUserDecision={function (checked) { return form.handleChange("userDecision", checked); }} onBlurMaxTokens={function () { return form.handleBlur("maxTokens"); }} onBlurTemperature={function () { return form.handleBlur("temperature"); }} onBlurTopP={function () { return form.handleBlur("topP"); }} onBlurFrequencyPenalty={function () { return form.handleBlur("frequencyPenalty"); }} onBlurPresencePenalty={function () { return form.handleBlur("presencePenalty"); }} maxTokensError={form.touched.maxTokens ? form.errors.maxTokens : undefined} temperatureError={form.touched.temperature ? form.errors.temperature : undefined} topPError={form.touched.topP ? form.errors.topP : undefined} frequencyPenaltyError={form.touched.frequencyPenalty ? form.errors.frequencyPenalty : undefined} presencePenaltyError={form.touched.presencePenalty ? form.errors.presencePenalty : undefined}/>
              </tabs_1.TabsContent>

              <tabs_1.TabsContent value="connections" className="focus-visible:outline-none focus-visible:ring-0">
                <agent_connections_tab_1.AgentConnectionsTab agents={form.values.agents} urls={form.values.urls} onAddAgent={addAgent} onRemoveAgent={removeAgent} onAddUrl={addUrl} onRemoveUrl={removeUrl}/>
              </tabs_1.TabsContent>
            </tabs_1.Tabs>

            {/* Botões de ação */}
            <agent_form_actions_1.AgentFormActions onReset={handleReset} isSubmitting={form.isSubmitting} isValid={form.isValid} hasUnsavedChanges={hasUnsavedChanges} isNewAgent={isNewAgent}/>
          </form>
        </div>
      </main>

      {/* Modal de templates */}
      <templates_modal_1.TemplatesModal isOpen={templatesModal.isOpen} onClose={templatesModal.close} onSelectTemplate={handleSelectTemplate} currentPrompt={form.values.prompt}/>

      {/* Dialog for unsaved changes */}
      <unsaved_changes_dialog_1.UnsavedChangesDialog open={showUnsavedDialog} onOpenChange={setShowUnsavedDialog} onConfirm={confirmPendingAction}/>
    </div>);
}
