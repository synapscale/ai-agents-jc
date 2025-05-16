"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Error;
var react_1 = require("react");
var link_1 = require("next/link");
var button_1 = require("@/components/ui/button");
function Error(_a) {
    var error = _a.error, reset = _a.reset;
    (0, react_1.useEffect)(function () {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (<div className="flex min-h-screen flex-col items-center justify-center text-center p-4">
      <div className="max-w-md">
        <h1 className="text-4xl font-bold mb-4">Algo deu errado</h1>
        <p className="text-muted-foreground mb-6">
          Ocorreu um erro ao processar sua solicitação. Nossa equipe foi notificada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button_1.Button onClick={reset} variant="outline">
            Tentar novamente
          </button_1.Button>
          <link_1.default href="/">
            <button_1.Button className="bg-purple-600 hover:bg-purple-700">Voltar para o início</button_1.Button>
          </link_1.default>
        </div>
      </div>
    </div>);
}
