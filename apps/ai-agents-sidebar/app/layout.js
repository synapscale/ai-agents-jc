"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var google_1 = require("next/font/google");
require("./globals.css");
var Sidebar_1 = require("../../../shared/ui/sidebar/Sidebar");
var sidebar_1 = require("../components/ui/sidebar");
var toaster_1 = require("../components/ui/toaster");
var ThemeProvider_1 = require("../../../packages/theme/theme-provider/ThemeProvider");
// Load Inter font with Latin subset
var inter = (0, google_1.Inter)({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});
// Metadata for SEO and viewport settings
exports.metadata = {
    title: "Canva E Agentes",
    description: "Plataforma para criação e gerenciamento de agentes de IA",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
    authors: [{ name: "Canva E Agentes Team" }],
    keywords: ["IA", "agentes", "prompts", "canvas", "chat"],
    generator: 'v0.dev'
};
function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="pt-BR" className={inter.variable}>
      <body className={"".concat(inter.className, " bg-gray-50/50 overscroll-none")}>
        <ThemeProvider_1.ThemeProvider>
          <sidebar_1.SidebarProvider>
            <div className="flex h-[100dvh] overflow-hidden">
              <Sidebar_1.Sidebar />
              <main className="flex-1 overflow-auto w-full" id="main-content">
                {children}
              </main>
            </div>
          </sidebar_1.SidebarProvider>
          <toaster_1.Toaster />
        </ThemeProvider_1.ThemeProvider>
      </body>
    </html>);
}
