"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NovoAgentePage;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
function NovoAgentePage() {
    var router = (0, navigation_1.useRouter)();
    // Redirect to the agent form with "novo" as the ID
    (0, react_1.useEffect)(function () {
        router.replace("/agentes/novo");
    }, [router]);
    return null;
}
