import { Link } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'


export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <header className="bg-purple-700 dark:bg-slate-900 shadow-md transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Bigotes Mudejares" className="h-14 w-auto" />
          <span className="text-2xl font-bold text-white dark:text-purple-400 tracking-wide">
            Gestión de Colonias Felinas
          </span>
        </Link>
        <button
          onClick={toggleDarkMode}
          className="ml-auto text-white text-2xl hover:text-purple-200 dark:hover:text-yellow-400 transition-colors"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}