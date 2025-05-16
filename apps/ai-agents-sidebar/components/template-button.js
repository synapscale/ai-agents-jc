"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateButton = TemplateButton;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var templates_modal_1 = require("@/components/templates-modal");
var icon_button_1 = require("@/components/ui/icon-button");
function TemplateButton(_a) {
    var currentPrompt = _a.currentPrompt, onSelectTemplate = _a.onSelectTemplate;
    var _b = (0, react_1.useState)(false), isModalOpen = _b[0], setIsModalOpen = _b[1];
    var toggleModal = (0, react_1.useCallback)(function () {
        setIsModalOpen(function (prev) { return !prev; });
    }, []);
    var handleSelectTemplate = (0, react_1.useCallback)(function (template) {
        onSelectTemplate(template);
        setIsModalOpen(false);
    }, [onSelectTemplate]);
    return (<>
      <icon_button_1.IconButton variant="outline" size="sm" icon={<lucide_react_1.FileText />} label="Templates" className="h-7 sm:h-8 text-xs rounded-full flex-shrink-0" onClick={toggleModal} aria-haspopup="dialog" aria-expanded={isModalOpen}/>

      <templates_modal_1.TemplatesModal isOpen={isModalOpen} onClose={function () { return setIsModalOpen(false); }} onSelectTemplate={handleSelectTemplate} currentPrompt={currentPrompt}/>
    </>);
}
