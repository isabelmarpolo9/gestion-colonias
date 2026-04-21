// Header.tsx
// Barra de navegación que aparece en todas las páginas de la aplicación

import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-purple-700 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white hover:text-purple-200">
          🐱 Gestión de Colonias
        </Link>
        <nav className="flex gap-4">
          <Link
            to="/"
            className="text-purple-200 hover:text-white font-medium transition-colors duration-200"
          >
            Colonias
          </Link>
        </nav>
      </div>
    </header>
  )
}
