// NotFoundPage.tsx
// Página que se muestra cuando el usuario navega a una ruta que no existe

import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <p className="text-8xl mb-4">🐱</p>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-gray-500 mb-8">Esta página no existe o el gato se la comió</p>
      <Button
        texto="Volver al inicio"
        onClick={() => navigate('/')}
        tipo="primario"
      />
    </div>
  )
}
