"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
var link_1 = require("next/link");
var button_1 = require("@/components/ui/button");
function NotFound() {
    return (<div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4">404 - Página não encontrada</h1>
        <p className="text-muted-foreground mb-6">A página que você está procurando não existe ou foi movida.</p>
        <link_1.default href="/">
          <button_1.Button className="bg-purple-600 hover:bg-purple-700">Voltar para o início</button_1.Button>
        </link_1.default>
      </div>
    </div>);
}
