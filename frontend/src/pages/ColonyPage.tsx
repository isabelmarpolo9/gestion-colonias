import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { useGatos } from '../hooks/useGatos'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'
import { useState } from 'react'
import Modal from '../components/Modal'
import FormGato from '../components/FormGato'

export default function ColonyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { colonias } = useAppContext()
  const { gatosFiltrados, filtro, setFiltro, loading, error, añadirGato } = useGatos(id)
  const [modalAbierto, setModalAbierto] = useState(false)

  const colonia = colonias.find(c => c.id === id)

  if (!colonia) {
    navigate('/404')
    return null
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="text-purple-600 hover:text-purple-800 font-medium mb-4 block">
        Volver
      </button>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{colonia.nombre}</h1>
          <p className="text-gray-500">{colonia.direccion}</p>
          <p className="text-sm text-purple-600 mt-1">Cuidador: {colonia.cuidador}</p>
        </div>
        <Button texto="+ Añadir gato" onClick={() => setModalAbierto(true)} tipo="primario" />
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {(['todos', 'esterilizado', 'enfermo', 'embarazada', 'testado'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${filtro === f ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-purple-600 py-12">Cargando gatos...</p>}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700">Error: {error}</p>
        </div>
      )}

      {!loading && !error && gatosFiltrados.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay gatos en esta colonia</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gatosFiltrados.map(gato => (
            <Card
              key={gato.id}
              titulo={gato.nombre}
              subtitulo={`${gato.color} · ${gato.sexo} · ${gato.edad} años`}
              onClick={() => navigate(`/gato/${gato.id}`)}
            >
              <div className="flex gap-2 flex-wrap mt-2">
                {gato.esterilizado && <Badge texto="Esterilizado" color="verde" />}
                {gato.testado && <Badge texto="Testado" color="azul" />}
                {gato.enfermo && <Badge texto="Enfermo" color="rojo" />}
                {gato.embarazada && <Badge texto="Embarazada" color="amarillo" />}
                {!gato.esterilizado && !gato.testado && !gato.enfermo && !gato.embarazada && (
                  <Badge texto="Sin datos" color="gris" />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {modalAbierto && (
        <Modal titulo="Añadir gato" onCerrar={() => setModalAbierto(false)}>
          <FormGato coloniaId={id!} onCerrar={() => setModalAbierto(false)} onAnadir={añadirGato} />
        </Modal>
      )}
    </div>
  )
}