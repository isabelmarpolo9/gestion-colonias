import { useParams, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import Badge from '../components/Badge'
import Button from '../components/Button'

export default function CatPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { gatos, colonias, actualizarGato, eliminarGato } = useAppContext()

  const gato = gatos.find(g => g.id === id)
  const colonia = colonias.find(c => c.id === gato?.coloniaId)

  if (!gato) {
    navigate('/404')
    return null
  }

  const handleEliminar = () => {
    eliminarGato(gato.id)
    navigate(`/colonia/${gato.coloniaId}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={() => navigate(`/colonia/${gato.coloniaId}`)} className="text-purple-600 hover:text-purple-800 font-medium mb-4 block">
        Volver a {colonia?.nombre}
      </button>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-4">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-800">{gato.nombre}</h1>
          <Button texto="Eliminar" onClick={handleEliminar} tipo="peligro" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase">Color</p>
            <p className="text-gray-700">{gato.color}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Sexo</p>
            <p className="text-gray-700">{gato.sexo}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Edad</p>
            <p className="text-gray-700">{gato.edad} anos</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">Colonia</p>
            <p className="text-gray-700">{colonia?.nombre}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {gato.esterilizado && <Badge texto="Esterilizado" color="verde" />}
          {gato.testado && (
            <Badge
                texto={`Test FIV/FELV: ${gato.resultadoTest === 'positivo' ? 'Positivo' : 'Negativo'}`}
                color={gato.resultadoTest === 'positivo' ? 'rojo' : 'azul'}
            />
            )}
          {gato.enfermo && <Badge texto="Enfermo" color="rojo" />}
          {gato.embarazada && <Badge texto="Embarazada" color="amarillo" />}
        </div>
        {gato.enfermo && gato.descripcionEnfermedad && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-xs text-red-400 uppercase mb-1">Descripcion enfermedad</p>
            <p className="text-red-700">{gato.descripcionEnfermedad}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => actualizarGato(gato.id, { esterilizado: !gato.esterilizado })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${gato.esterilizado ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {gato.esterilizado ? 'Esterilizado' : 'Marcar esterilizado'}
          </button>
          <button onClick={() => actualizarGato(gato.id, { testado: !gato.testado })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${gato.testado ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {gato.testado ? 'Testado' : 'Marcar testado'}
          </button>
          <button onClick={() => actualizarGato(gato.id, { enfermo: !gato.enfermo })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${gato.enfermo ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {gato.enfermo ? 'Enfermo' : 'Marcar enfermo'}
          </button>
          <button onClick={() => actualizarGato(gato.id, { embarazada: !gato.embarazada })} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${gato.embarazada ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {gato.embarazada ? 'Embarazada' : 'Marcar embarazada'}
          </button>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Desparasitaciones</h2>
        {gato.desparasitaciones.length === 0 ? (
          <p className="text-gray-500">No hay desparasitaciones registradas</p>
        ) : (
          <div className="space-y-2">
            {gato.desparasitaciones.map(d => (
              <div key={d.id} className="flex justify-between items-center bg-purple-50 rounded-lg px-4 py-2">
                <span className="text-gray-700">{d.producto}</span>
                <span className="text-sm text-gray-400">{d.fecha}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}