// HomePage.tsx
// Página principal que muestra el listado de todas las colonias

import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import Modal from '../components/Modal'
import FormColonia from '../components/FormColonia'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'

export default function HomePage() {
  const navigate = useNavigate()
  const { coloniasFiltradas, busqueda, setBusqueda, eliminarColonia, loadingColonias, errorColonias } = useAppContext()
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {loadingColonias && (
        <div className="text-center py-12">
          <p className="text-purple-600 font-medium">Cargando colonias...</p>
        </div>
      )}

      {errorColonias && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">Error: {errorColonias}</p>
          <p className="text-red-500 text-sm mt-1">Asegurate de que el servidor esta corriendo en http://localhost:3000</p>
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <Button
        texto="+ Nueva colonia"
        onClick={() => setModalAbierto(true)}
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
                <Badge texto={`Cuidador: ${colonia.cuidador}`} color="gris" />
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
      {modalAbierto && (
  <Modal titulo="Nueva colonia" onCerrar={() => setModalAbierto(false)}>
    <FormColonia onCerrar={() => setModalAbierto(false)} />
  </Modal>
)}
    </div>
  )
}