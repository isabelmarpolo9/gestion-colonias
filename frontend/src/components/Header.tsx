import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-purple-700 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Bigotes Mudejares" className="h-14 w-auto" />
          <span className="text-2xl font-bold text-white tracking-wide">
            Gestión de Colonias Felinas
          </span>
        </Link>
      </div>
    </header>
  )
}