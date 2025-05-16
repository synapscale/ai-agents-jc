"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Loading;
var skeleton_1 = require("@/components/ui/skeleton");
function Loading() {
    return (<div className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <skeleton_1.Skeleton className="h-10 w-64 mb-6"/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map(function (_, index) { return (<skeleton_1.Skeleton key={index} className="h-48 w-full"/>); })}
        </div>
      </div>
    </div>);
}
