// HomePage.tsx
// Página principal que muestra el listado de todas las colonias

import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'

export default function HomePage() {
  const navigate = useNavigate()
  const { coloniasFiltradas, busqueda, setBusqueda, eliminarColonia } = useAppContext()

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Colonias Felinas</h1>
        <Button
          texto="+ Nueva colonia"
          onClick={() => {}}
          tipo="primario"
        />
      </div>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar colonia..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Lista de colonias */}
      {coloniasFiltradas.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No se encontraron colonias</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coloniasFiltradas.map(colonia => (
            <Card
              key={colonia.id}
              titulo={colonia.nombre}
              subtitulo={colonia.direccion}
              onClick={() => navigate(`/colonia/${colonia.id}`)}
            >
              <div className="flex justify-between items-center mt-2">
                <Badge texto={`Cuidador: ${colonia.cuidador}`} color="morado" />
                <button
                  onClick={e => {
                    e.stopPropagation()
                    eliminarColonia(colonia.id)
                  }}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}