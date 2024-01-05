"use client";

import { Navbar } from "flowbite-react";
import { usePathname } from "next/navigation";

export default function ProductLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar className="border-b border-gray-300 py-4">
          <Navbar.Brand>
            <h1 className="italic font-medium">Teste Madeira Madeira</h1>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link href="/product" active={pathname === "/product"}>
              Listar Produtos
            </Navbar.Link>
            <Navbar.Link
              href="/product/create"
              active={pathname === "/product/create"}
            >
              Cadastrar Produtos
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
      </header>
      <main className="py-4 bg-gray-100 flex-1">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
