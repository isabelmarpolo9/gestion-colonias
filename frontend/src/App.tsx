import Badge from './components/Badge'
import Button from './components/Button'
import Card from './components/Card'
import Modal from './components/Modal'
import Header from './components/Header'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const [modalAbierto, setModalAbierto] = useState(false)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-5xl mx-auto px-4 py-8">

          <h2 className="text-lg font-semibold mb-3">Badges:</h2>
          <div className="flex gap-2 mb-6">
            <Badge texto="Esterilizado" color="verde" />
            <Badge texto="Enfermo" color="rojo" />
            <Badge texto="Embarazada" color="amarillo" />
            <Badge texto="Testado" color="azul" />
            <Badge texto="Sin datos" color="gris" />
          </div>

          <h2 className="text-lg font-semibold mb-3">Botones:</h2>
          <div className="flex gap-2 mb-6">
            <Button texto="Guardar" onClick={() => alert('Guardado')} tipo="primario" />
            <Button texto="Cancelar" onClick={() => alert('Cancelado')} tipo="secundario" />
            <Button texto="Eliminar" onClick={() => alert('Eliminado')} tipo="peligro" />
          </div>

          <h2 className="text-lg font-semibold mb-3">Cards:</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card titulo="Colonia del Parque" subtitulo="Calle Mayor 1">
              <Badge texto="5 gatos" color="azul" />
            </Card>
            <Card titulo="Colonia de la Plaza" subtitulo="Plaza España 3">
              <Badge texto="3 gatos" color="azul" />
            </Card>
          </div>

          <h2 className="text-lg font-semibold mb-3">Modal:</h2>
          <Button texto="Abrir Modal" onClick={() => setModalAbierto(true)} tipo="primario" />

          {modalAbierto && (
            <Modal titulo="Añadir gato" onCerrar={() => setModalAbierto(false)}>
              <p className="text-gray-600">Aquí irá el formulario para añadir un gato.</p>
              <div className="mt-4">
                <Button texto="Cerrar" onClick={() => setModalAbierto(false)} tipo="secundario" />
              </div>
            </Modal>
          )}

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
