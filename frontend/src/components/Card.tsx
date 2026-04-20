// Card.tsx
// Componente reutilizable para mostrar una tarjeta genérica
// Se usará para mostrar colonias y gatos en los listados

interface CardProps {
  titulo: string;
  subtitulo?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function Card({ titulo, subtitulo, children, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-xl p-4 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200' : ''}`}
    >
      <h3 className="text-lg font-semibold text-gray-800">{titulo}</h3>
      {subtitulo && (
        <p className="text-sm text-gray-500 mt-1">{subtitulo}</p>
      )}
      {children && (
        <div className="mt-3">
          {children}
        </div>
      )}
    </div>
  )
}
