"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CanvasPage;
var section_1 = require("@/components/ui/section");
var card_1 = require("@/components/ui/card");
function CanvasPage() {
    return (<div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <section_1.Section title="Canvas" description="Ferramenta visual para criação de fluxos">
          <card_1.Card>
            <card_1.CardContent className="p-6">
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                <h3 className="text-lg font-medium mb-2">Página em Desenvolvimento</h3>
                <p className="text-muted-foreground mb-4">
                  A ferramenta Canvas está sendo desenvolvida e estará disponível em breve.
                </p>
              </div>
            </card_1.CardContent>
          </card_1.Card>
        </section_1.Section>
      </div>
    </div>);
}
