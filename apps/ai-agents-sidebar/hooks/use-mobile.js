"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMobile = useIsMobile;
var use_mobile_1 = require("@shared/hooks/use-mobile");
function useIsMobile() {
    var isMobile = (0, use_mobile_1.useMobile)();
    return isMobile;
}
