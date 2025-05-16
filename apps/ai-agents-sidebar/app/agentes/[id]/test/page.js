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
exports.default = AgentTestPage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var link_1 = require("next/link");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var textarea_1 = require("@/components/ui/textarea");
var skeleton_1 = require("@/components/ui/skeleton");
var use_toast_1 = require("@/components/ui/use-toast");
var use_local_storage_1 = require("@/hooks/use-local-storage");
function AgentTestPage(_a) {
    var _this = this;
    var _b;
    var params = _a.params;
    var router = (0, navigation_1.useRouter)();
    var _c = (0, react_1.useState)(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = (0, use_local_storage_1.useLocalStorage)("agents", []), agents = _d[0], setAgents = _d[1];
    var _e = (0, use_local_storage_1.useLocalStorage)("conversations", []), conversations = _e[0], setConversations = _e[1];
    var _f = (0, react_1.useState)(null), currentConversation = _f[0], setCurrentConversation = _f[1];
    var _g = (0, react_1.useState)(""), input = _g[0], setInput = _g[1];
    var _h = (0, react_1.useState)(false), isProcessing = _h[0], setIsProcessing = _h[1];
    var messagesEndRef = (0, react_1.useRef)(null);
    // Find the agent
    var agent = (0, react_1.useMemo)(function () {
        return agents.find(function (a) { return a.id === params.id; });
    }, [agents, params.id]);
    // Initialize or find conversation
    (0, react_1.useEffect)(function () {
        if (!agent)
            return;
        // Find existing conversation or create new one
        var existingConversation = conversations.find(function (c) { return c.agentId === agent.id; });
        if (existingConversation) {
            setCurrentConversation(existingConversation);
        }
        else {
            // Create new conversation
            var newConversation_1 = {
                id: Date.now().toString(),
                agentId: agent.id,
                messages: [
                    {
                        id: Date.now().toString(),
                        role: "system",
                        content: agent.prompt || "Você é um assistente útil.",
                        timestamp: new Date().toISOString(),
                    },
                ],
                title: "Conversa com ".concat(agent.name),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            setConversations(function (prev) { return __spreadArray(__spreadArray([], prev, true), [newConversation_1], false); });
            setCurrentConversation(newConversation_1);
        }
        setIsLoading(false);
    }, [agent, conversations, setConversations]);
    // Scroll to bottom when messages change
    (0, react_1.useEffect)(function () {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
    }, [currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.messages]);
    // Handle send message
    var handleSendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var userMessage, updatedConversation, responseContent, assistantMessage, finalConversation_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!input.trim() || !currentConversation || !agent)
                        return [2 /*return*/];
                    userMessage = {
                        id: Date.now().toString(),
                        role: "user",
                        content: input,
                        timestamp: new Date().toISOString(),
                    };
                    updatedConversation = __assign(__assign({}, currentConversation), { messages: __spreadArray(__spreadArray([], currentConversation.messages, true), [userMessage], false), updatedAt: new Date().toISOString() });
                    setCurrentConversation(updatedConversation);
                    setConversations(function (prev) { return prev.map(function (c) { return (c.id === updatedConversation.id ? updatedConversation : c); }); });
                    // Clear input
                    setInput("");
                    // Simulate AI response
                    setIsProcessing(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    // In a real app, this would be an API call to your AI service
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })
                        // Generate a response based on the agent's type
                    ];
                case 2:
                    // In a real app, this would be an API call to your AI service
                    _a.sent();
                    responseContent = "";
                    switch (agent.type) {
                        case "chat":
                            responseContent = "Aqui est\u00E1 uma resposta simulada do agente ".concat(agent.name, " usando o modelo ").concat(agent.model, ".\n\nEsta \u00E9 uma demonstra\u00E7\u00E3o de como o agente responderia \u00E0 sua mensagem: \"").concat(input, "\"\n\nEm uma implementa\u00E7\u00E3o real, esta resposta seria gerada pelo modelo de IA especificado.");
                            break;
                        case "imagem":
                            responseContent = "[Imagem gerada com base no prompt: \"".concat(input, "\"]\n\nEm uma implementa\u00E7\u00E3o real, uma imagem seria gerada aqui.");
                            break;
                        case "texto":
                            responseContent = "Texto gerado com base no prompt: \"".concat(input, "\"\n\nEm uma implementa\u00E7\u00E3o real, este texto seria gerado pelo modelo de IA especificado.");
                            break;
                        default:
                            responseContent = "Resposta simulada do agente.";
                    }
                    assistantMessage = {
                        id: Date.now().toString(),
                        role: "assistant",
                        content: responseContent,
                        timestamp: new Date().toISOString(),
                    };
                    finalConversation_1 = __assign(__assign({}, updatedConversation), { messages: __spreadArray(__spreadArray([], updatedConversation.messages, true), [assistantMessage], false), updatedAt: new Date().toISOString() });
                    setCurrentConversation(finalConversation_1);
                    setConversations(function (prev) { return prev.map(function (c) { return (c.id === finalConversation_1.id ? finalConversation_1 : c); }); });
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    (0, use_toast_1.toast)({
                        title: "Erro ao processar mensagem",
                        description: "Ocorreu um erro ao processar sua mensagem. Tente novamente.",
                        variant: "destructive",
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsProcessing(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    // Format timestamp
    var formatTimestamp = function (timestamp) {
        var date = new Date(timestamp);
        return new Intl.DateTimeFormat("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };
    // Loading state
    if (isLoading) {
        return (<div className="flex flex-col h-screen">
        <header className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center gap-2">
            <skeleton_1.Skeleton className="h-9 w-24"/>
            <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
            <skeleton_1.Skeleton className="h-8 w-48"/>
          </div>
          <skeleton_1.Skeleton className="h-9 w-9"/>
        </header>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <skeleton_1.Skeleton className="h-16 w-3/4 ml-auto"/>
            <skeleton_1.Skeleton className="h-24 w-3/4"/>
            <skeleton_1.Skeleton className="h-16 w-3/4 ml-auto"/>
            <skeleton_1.Skeleton className="h-32 w-3/4"/>
          </div>
        </div>

        <div className="p-4 border-t bg-white">
          <skeleton_1.Skeleton className="h-20 w-full"/>
        </div>
      </div>);
    }
    // Agent not found
    if (!agent) {
        return (<div className="flex flex-col h-screen">
        <header className="flex items-center p-4 border-b bg-white">
          <link_1.default href="/agentes" className="flex items-center text-gray-500 hover:text-gray-900">
            <lucide_react_1.ArrowLeft className="mr-1 h-4 w-4"/>
            Voltar
          </link_1.default>
          <div className="w-px h-6 bg-gray-200 mx-2" aria-hidden="true"></div>
          <h1 className="text-xl font-bold">Agente não encontrado</h1>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-muted-foreground mb-4">O agente solicitado não foi encontrado.</p>
            <link_1.default href="/agentes">
              <button_1.Button className="bg-purple-600 hover:bg-purple-700">Voltar para a lista de agentes</button_1.Button>
            </link_1.default>
          </div>
        </div>
      </div>);
    }
    return (<div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-2">
          <link_1.default href={"/agentes/".concat(agent.id, "/view")} className="flex items-center text-gray-500 hover:text-gray-900">
            <lucide_react_1.ArrowLeft className="mr-1 h-4 w-4"/>
            Voltar
          </link_1.default>
          <div className="w-px h-6 bg-gray-200" aria-hidden="true"></div>
          <h1 className="text-lg font-medium truncate">{agent.name}</h1>
          <badge_1.Badge variant="outline" className="bg-muted/30">
            {agent.model}
          </badge_1.Badge>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {(currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.messages.filter(function (m) { return m.role !== "system"; }).length) === 0 ? (<div className="text-center py-12">
              <lucide_react_1.Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground"/>
              <h2 className="text-lg font-medium mb-2">Comece uma conversa com {agent.name}</h2>
              <p className="text-muted-foreground mb-6">
                Digite uma mensagem abaixo para começar a interagir com este agente.
              </p>
              <div className="max-w-md mx-auto p-4 bg-white rounded-lg border">
                <h3 className="font-medium mb-2">Sobre este agente</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {((_b = agent.prompt) === null || _b === void 0 ? void 0 : _b.substring(0, 100)) ||
                "Este \u00E9 um agente do tipo ".concat(agent.type, " usando o modelo ").concat(agent.model, ".")}
                  ...
                </p>
                <div className="text-xs text-muted-foreground">
                  Criado em {new Date(agent.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>) : (currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.messages.filter(function (m) { return m.role !== "system"; }).map(function (message) { return (<div key={message.id} className={"flex ".concat(message.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={"max-w-[80%] rounded-lg p-4 ".concat(message.role === "user" ? "bg-purple-600 text-white" : "bg-white border")}>
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? <lucide_react_1.Bot className="h-4 w-4"/> : <lucide_react_1.User className="h-4 w-4"/>}
                      <span className="text-xs font-medium">{message.role === "assistant" ? agent.name : "Você"}</span>
                      <span className="text-xs opacity-70">{formatTimestamp(message.timestamp)}</span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>); }))}

          {isProcessing && (<div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-4 bg-white border">
                <div className="flex items-center gap-2">
                  <lucide_react_1.Bot className="h-4 w-4"/>
                  <span className="text-xs font-medium">{agent.name}</span>
                  <lucide_react_1.Loader2 className="h-3 w-3 animate-spin"/>
                </div>
              </div>
            </div>)}

          <div ref={messagesEndRef}/>
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={function (e) {
            e.preventDefault();
            handleSendMessage();
        }} className="flex flex-col gap-2">
            <textarea_1.Textarea value={input} onChange={function (e) { return setInput(e.target.value); }} placeholder={"Envie uma mensagem para ".concat(agent.name, "...")} className="min-h-[100px] resize-none" disabled={isProcessing}/>
            <div className="flex justify-end">
              <button_1.Button type="submit" className="bg-purple-600 hover:bg-purple-700" disabled={!input.trim() || isProcessing}>
                {isProcessing ? (<>
                    <lucide_react_1.Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Processando...
                  </>) : (<>
                    <lucide_react_1.Send className="mr-2 h-4 w-4"/>
                    Enviar
                  </>)}
              </button_1.Button>
            </div>
          </form>
        </div>
      </div>
    </div>);
}
