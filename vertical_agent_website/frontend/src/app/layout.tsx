import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        <header className="bg-slate-800 text-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-slate-300">
              Agente Vertical AI
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-slate-300">Início</Link>
              <Link href="/docs" className="hover:text-slate-300">Documentação</Link>
              <Link href="/chat" className="hover:text-slate-300">Chat Interativo</Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto px-6 py-8">
          {children}
        </main>
        <footer className="bg-slate-800 text-white py-6 text-center">
          <p>&copy; {new Date().getFullYear()} Manus Team. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}

