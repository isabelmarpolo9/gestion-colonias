import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-purple-700 shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Bigotes Mudejaresv" className="h-12 w-auto" />
        </Link>
      </div>
    </header>
  )
}