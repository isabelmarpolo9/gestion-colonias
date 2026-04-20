// Modal.tsx
// Componente reutilizable para ventanas emergentes
// Se usará para formularios como añadir gato o registrar desparasitación

interface ModalProps {
  titulo: string;
  onCerrar: () => void;
  children: React.ReactNode;
}

export default function Modal({ titulo, onCerrar, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{titulo}</h2>
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}
