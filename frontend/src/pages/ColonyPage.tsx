// ColonyPage.tsx
// Página que muestra los gatos de una colonia concreta

import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Card from '../components/Card'
import Badge from '../components/Badge'
import Button from '../components/Button'

export default function ColonyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { colonias, gatosFiltrados, filtro, setFiltro } = useAppContext()

  // Buscamos la colonia por su ID
  const colonia = colonias.find(c => c.id === id)

  // Si no existe la colonia navegamos a 404
  if (!colonia) {
    navigate('/404')
    return null
  }

  // Filtramos los gatos de esta colonia concreta
  const gatosDeEstaColonia = gatosFiltrados.filter(g => g.coloniaId === id)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Cabecera */}
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate('/')}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          ← Volver
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{colonia.nombre}</h1>
          <p className="text-gray-500">{colonia.direccion}</p>
          <p className="text-sm text-purple-600 mt-1">Cuidador: {colonia.cuidador}</p>
        </div>
        <Button
          texto="+ Añadir gato"
          onClick={() => {}}
          tipo="primario"
        />
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['todos', 'esterilizado', 'enfermo', 'embarazada', 'testado'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
              filtro === f
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Lista de gatos */}
      {gatosDeEstaColonia.length === 0 ? (
        <p className="text-gray-500 text-center py-12">No hay gatos en esta colonia</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gatosDeEstaColonia.map(gato => (
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
    </div>
  )
}