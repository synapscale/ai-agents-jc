"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptEditor = PromptEditor;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var form_field_1 = require("@/components/form/form-field");
/**
 * A specialized editor for AI prompts with syntax highlighting and tools
 *
 * This component provides a textarea with enhanced features for editing AI prompts,
 * including auto-resizing, tab handling, and template selection.
 *
 * @example
 * ```tsx
 * <PromptEditor
 *   value={prompt}
 *   onChange={setPrompt}
 *   onBlur={validatePrompt}
 *   error={errors.prompt}
 *   label="Agent Prompt"
 *   required
 *   onSelectTemplate={() => openTemplatesModal()}
 * />
 * ```
 *
 * @param props - Component properties
 * @returns React component
 */
function PromptEditor(_a) {
    var 
    // Required props
    value = _a.value, onChange = _a.onChange, 
    // Optional props with defaults
    onSelectTemplate = _a.onSelectTemplate, error = _a.error, className = _a.className, _b = _a.minHeight, minHeight = _b === void 0 ? "200px" : _b, label = _a.label, _c = _a.required, required = _c === void 0 ? false : _c, onBlur = _a.onBlur, _d = _a.placeholder, placeholder = _d === void 0 ? "# Título do Prompt\n\nVocê é um assistente especializado em...\n\n## Capacidades:\n- Capacidade 1\n- Capacidade 2" : _d, _e = _a.readOnly, readOnly = _e === void 0 ? false : _e, maxLength = _a.maxLength, _f = _a.showCharCount, showCharCount = _f === void 0 ? true : _f, _g = _a.autoFocus, autoFocus = _g === void 0 ? false : _g, _h = _a.showTemplateButton, showTemplateButton = _h === void 0 ? true : _h, 
    // Accessibility props
    id = _a.id, testId = _a.testId, ariaLabel = _a.ariaLabel;
    var textareaRef = (0, react_1.useRef)(null);
    var _j = (0, react_1.useState)(false), isFocused = _j[0], setIsFocused = _j[1];
    var showCharacterCount = maxLength && showCharCount;
    // Auto-resize textarea
    (0, react_1.useEffect)(function () {
        var textarea = textareaRef.current;
        if (!textarea)
            return;
        var adjustHeight = function () {
            textarea.style.height = "auto";
            textarea.style.height = "".concat(Math.max(textarea.scrollHeight, Number.parseInt(minHeight)), "px");
        };
        adjustHeight();
        window.addEventListener("resize", adjustHeight);
        return function () {
            window.removeEventListener("resize", adjustHeight);
        };
    }, [value, minHeight]);
    // Tab key handling for indentation
    var handleKeyDown = function (e) {
        if (e.key === "Tab") {
            e.preventDefault();
            var start_1 = e.currentTarget.selectionStart;
            var end = e.currentTarget.selectionEnd;
            // Insert tab at cursor position
            var newValue = value.substring(0, start_1) + "  " + value.substring(end);
            onChange(newValue);
            // Move cursor after the inserted tab
            setTimeout(function () {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start_1 + 2;
                }
            }, 0);
        }
    };
    var inputId = id || "prompt-editor";
    return (<form_field_1.FormField label={label} error={error} required={required} id={inputId} headerRight={onSelectTemplate && showTemplateButton ? (<button type="button" onClick={onSelectTemplate} className="text-sm text-purple-600 hover:text-purple-800 font-medium" aria-label="Usar template de prompt">
            Usar template
          </button>) : null} testId={testId}>
      <div className={(0, utils_1.cn)("relative rounded-md border transition-colors", isFocused ? "border-purple-500 ring-1 ring-purple-500" : "border-input", error && "border-red-300 ring-1 ring-red-500", className)}>
        <textarea ref={textareaRef} id={inputId} value={value} onChange={function (e) { return onChange(e.target.value); }} onFocus={function () { return setIsFocused(true); }} onBlur={function () {
            setIsFocused(false);
            onBlur === null || onBlur === void 0 ? void 0 : onBlur();
        }} onKeyDown={handleKeyDown} className={(0, utils_1.cn)("flex w-full rounded-md border-0 bg-transparent px-3 py-2 text-sm shadow-none focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 font-mono")} style={{ minHeight: minHeight, resize: "vertical" }} placeholder={placeholder} required={required} aria-invalid={!!error} aria-describedby={error ? "".concat(inputId, "-error") : undefined} aria-label={ariaLabel || label || "Prompt editor"} spellCheck="false" data-gramm="false" readOnly={readOnly} maxLength={maxLength} autoFocus={autoFocus} data-testid={"".concat(inputId, "-textarea")}/>
        {showCharacterCount && (<div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none" aria-live="polite" aria-atomic="true">
            {value.length}/{maxLength}
          </div>)}
      </div>
    </form_field_1.FormField>);
}
