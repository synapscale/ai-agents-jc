"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentBasicInfo = AgentBasicInfo;
var input_field_1 = require("@/components/form/input-field");
var select_field_1 = require("@/components/form/select-field");
var agent_constants_1 = require("@/constants/agent-constants");
/**
 * Component for the basic information section of the agent form
 *
 * This component displays and manages the basic information fields for an agent,
 * including name, type, model, description, and status.
 *
 * @example
 * ```tsx
 * <AgentBasicInfo
 *   name={form.values.name}
 *   type={form.values.type}
 *   model={form.values.model}
 *   description={form.values.description}
 *   status={form.values.status}
 *   onChangeName={(value) => form.handleChange("name", value)}
 *   onChangeType={(value) => form.handleChange("type", value)}
 *   onChangeModel={(value) => form.handleChange("model", value)}
 *   onChangeDescription={(value) => form.handleChange("description", value)}
 *   onChangeStatus={(value) => form.handleChange("status", value)}
 *   onBlurName={() => form.handleBlur("name")}
 *   nameError={form.errors.name}
 *   isNewAgent={true}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function AgentBasicInfo(_a) {
    var 
    // Required props
    name = _a.name, type = _a.type, model = _a.model, description = _a.description, status = _a.status, onChangeName = _a.onChangeName, onChangeType = _a.onChangeType, onChangeModel = _a.onChangeModel, onChangeDescription = _a.onChangeDescription, onChangeStatus = _a.onChangeStatus, onBlurName = _a.onBlurName, isNewAgent = _a.isNewAgent, 
    // Optional props with defaults
    nameError = _a.nameError, _b = _a.descriptionMaxLength, descriptionMaxLength = _b === void 0 ? 200 : _b, _c = _a.nameMaxLength, nameMaxLength = _c === void 0 ? 50 : _c, _d = _a.descriptionPlaceholder, descriptionPlaceholder = _d === void 0 ? "Breve descrição do agente" : _d, _e = _a.namePlaceholder, namePlaceholder = _e === void 0 ? "Digite o nome do agente" : _e, 
    // Accessibility props
    className = _a.className, id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var componentId = id || "agent-basic-info";
    return (<div className={className} id={componentId} data-testid={testId} aria-label={ariaLabel || "Informações básicas do agente"}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="w-full sm:w-1/2">
          <input_field_1.InputField id={"".concat(componentId, "-name")} label="Nome do Agente" name="name" value={name} onChange={onChangeName} onBlur={onBlurName} placeholder={namePlaceholder} required error={nameError} maxLength={nameMaxLength} autoFocus={isNewAgent} aria-describedby={nameError ? "".concat(componentId, "-name-error") : undefined}/>
        </div>

        <div className="w-full sm:w-1/2 flex gap-3 sm:gap-4">
          <div className="w-1/2">
            <select_field_1.SelectField id={"".concat(componentId, "-type")} label="Tipo" name="type" value={type} onChange={onChangeType} options={agent_constants_1.TYPE_OPTIONS} aria-label="Tipo do agente"/>
          </div>

          <div className="w-1/2">
            <select_field_1.SelectField id={"".concat(componentId, "-model")} label="Modelo" name="model" value={model} onChange={onChangeModel} options={agent_constants_1.MODEL_OPTIONS} aria-label="Modelo do agente"/>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3 sm:mt-4">
        <div className="w-full sm:w-1/2">
          <input_field_1.InputField id={"".concat(componentId, "-description")} label="Descrição" name="description" value={description} onChange={onChangeDescription} placeholder={descriptionPlaceholder} maxLength={descriptionMaxLength} aria-label="Descrição do agente"/>
        </div>

        <div className="w-full sm:w-1/2">
          <select_field_1.SelectField id={"".concat(componentId, "-status")} label="Status" name="status" value={status} onChange={onChangeStatus} options={agent_constants_1.STATUS_OPTIONS} aria-label="Status do agente"/>
        </div>
      </div>
    </div>);
}
