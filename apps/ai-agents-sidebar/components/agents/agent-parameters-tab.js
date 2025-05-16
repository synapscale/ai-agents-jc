"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentParametersTab = AgentParametersTab;
var react_1 = require("react");
var input_field_1 = require("@/components/form/input-field");
var section_1 = require("@/components/ui/section");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
/**
 * Component for the parameters tab of the agent form
 *
 * This component displays and manages the model parameters for an agent,
 * including tokens, temperature, and penalties.
 *
 * @example
 * ```tsx
 * <AgentParametersTab
 *   maxTokens={form.values.maxTokens.toString()}
 *   temperature={form.values.temperature.toString()}
 *   topP={form.values.topP.toString()}
 *   frequencyPenalty={form.values.frequencyPenalty.toString()}
 *   presencePenalty={form.values.presencePenalty.toString()}
 *   userDecision={form.values.userDecision}
 *   onChangeMaxTokens={(value) => form.handleChange("maxTokens", Number(value))}
 *   onChangeTemperature={(value) => form.handleChange("temperature", Number(value))}
 *   onChangeTopP={(value) => form.handleChange("topP", Number(value))}
 *   onChangeFrequencyPenalty={(value) => form.handleChange("frequencyPenalty", Number(value))}
 *   onChangePresencePenalty={(value) => form.handleChange("presencePenalty", Number(value))}
 *   onChangeUserDecision={(checked) => form.handleChange("userDecision", checked)}
 *   onBlurMaxTokens={() => form.handleBlur("maxTokens")}
 *   onBlurTemperature={() => form.handleBlur("temperature")}
 *   onBlurTopP={() => form.handleBlur("topP")}
 *   onBlurFrequencyPenalty={() => form.handleBlur("frequencyPenalty")}
 *   onBlurPresencePenalty={() => form.handleBlur("presencePenalty")}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentParametersTab(_a) {
    var 
    // Required props
    maxTokens = _a.maxTokens, temperature = _a.temperature, topP = _a.topP, frequencyPenalty = _a.frequencyPenalty, presencePenalty = _a.presencePenalty, userDecision = _a.userDecision, onChangeMaxTokens = _a.onChangeMaxTokens, onChangeTemperature = _a.onChangeTemperature, onChangeTopP = _a.onChangeTopP, onChangeFrequencyPenalty = _a.onChangeFrequencyPenalty, onChangePresencePenalty = _a.onChangePresencePenalty, onChangeUserDecision = _a.onChangeUserDecision, onBlurMaxTokens = _a.onBlurMaxTokens, onBlurTemperature = _a.onBlurTemperature, onBlurTopP = _a.onBlurTopP, onBlurFrequencyPenalty = _a.onBlurFrequencyPenalty, onBlurPresencePenalty = _a.onBlurPresencePenalty, 
    // Optional props with defaults
    maxTokensError = _a.maxTokensError, temperatureError = _a.temperatureError, topPError = _a.topPError, frequencyPenaltyError = _a.frequencyPenaltyError, presencePenaltyError = _a.presencePenaltyError, _b = _a.showAdvancedOptions, showAdvancedOptions = _b === void 0 ? true : _b, _c = _a.advancedOptionsDefaultOpen, advancedOptionsDefaultOpen = _c === void 0 ? false : _c, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var _d = (0, react_1.useState)(advancedOptionsDefaultOpen), advancedOptionsOpen = _d[0], setAdvancedOptionsOpen = _d[1];
    var toggleAdvancedOptions = function () {
        setAdvancedOptionsOpen(!advancedOptionsOpen);
    };
    var componentId = id || "agent-parameters-tab";
    return (<div className={className} id={componentId} data-testid={testId} aria-label={ariaLabel || "Parâmetros do modelo"}>
      <section_1.Section title="Parâmetros do Modelo">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input_field_1.InputField id={"".concat(componentId, "-max-tokens")} label="Máximo de Tokens" name="maxTokens" type="number" value={maxTokens} onChange={onChangeMaxTokens} onBlur={onBlurMaxTokens} error={maxTokensError} helperText="Número máximo de tokens a serem gerados" aria-describedby={maxTokensError ? "".concat(componentId, "-max-tokens-error") : undefined}/>

          <input_field_1.InputField id={"".concat(componentId, "-temperature")} label="Temperatura" name="temperature" type="number" step="0.1" value={temperature} onChange={onChangeTemperature} onBlur={onBlurTemperature} error={temperatureError} helperText="Controla a aleatoriedade (0-2)" aria-describedby={temperatureError ? "".concat(componentId, "-temperature-error") : undefined}/>

          {(!showAdvancedOptions || advancedOptionsOpen) && (<>
              <input_field_1.InputField id={"".concat(componentId, "-top-p")} label="Top P" name="topP" type="number" step="0.1" value={topP} onChange={onChangeTopP} onBlur={onBlurTopP} error={topPError} helperText="Amostragem de núcleo (0-1)" aria-describedby={topPError ? "".concat(componentId, "-top-p-error") : undefined}/>

              <input_field_1.InputField id={"".concat(componentId, "-frequency-penalty")} label="Penalidade de Frequência" name="frequencyPenalty" type="number" step="0.1" value={frequencyPenalty} onChange={onChangeFrequencyPenalty} onBlur={onBlurFrequencyPenalty} error={frequencyPenaltyError} helperText="Penaliza palavras frequentes (-2 a 2)" aria-describedby={frequencyPenaltyError ? "".concat(componentId, "-frequency-penalty-error") : undefined}/>

              <input_field_1.InputField id={"".concat(componentId, "-presence-penalty")} label="Penalidade de Presença" name="presencePenalty" type="number" step="0.1" value={presencePenalty} onChange={onChangePresencePenalty} onBlur={onBlurPresencePenalty} error={presencePenaltyError} helperText="Penaliza palavras já usadas (-2 a 2)" aria-describedby={presencePenaltyError ? "".concat(componentId, "-presence-penalty-error") : undefined}/>
            </>)}
        </div>

        {showAdvancedOptions && (<button_1.Button type="button" variant="ghost" size="sm" onClick={toggleAdvancedOptions} className="mt-4 text-xs text-muted-foreground" aria-expanded={advancedOptionsOpen} aria-controls={"".concat(componentId, "-advanced-options")}>
            {advancedOptionsOpen ? (<>
                <lucide_react_1.ChevronUp className="mr-1 h-3.5 w-3.5" aria-hidden="true"/>
                Ocultar opções avançadas
              </>) : (<>
                <lucide_react_1.ChevronDown className="mr-1 h-3.5 w-3.5" aria-hidden="true"/>
                Mostrar opções avançadas
              </>)}
          </button_1.Button>)}

        <div className="mt-4 flex items-center space-x-2">
          <switch_1.Switch id={"".concat(componentId, "-user-decision")} checked={userDecision} onCheckedChange={onChangeUserDecision} aria-label="Permitir que o usuário ajuste os parâmetros"/>
          <label_1.Label htmlFor={"".concat(componentId, "-user-decision")} className={(0, utils_1.cn)("text-sm", "cursor-pointer", "select-none")}>
            Permitir que o usuário ajuste os parâmetros
          </label_1.Label>
        </div>
      </section_1.Section>
    </div>);
}
