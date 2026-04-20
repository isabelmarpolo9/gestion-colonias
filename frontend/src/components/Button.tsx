// Button.tsx
// Componente reutilizable para botones de la aplicación

interface ButtonProps {
  texto: string;
  onClick: () => void;
  tipo?: 'primario' | 'secundario' | 'peligro';
  disabled?: boolean;
}

export default function Button({ texto, onClick, tipo = 'primario', disabled = false }: ButtonProps) {
  const estilos = {
    primario: 'bg-blue-600 hover:bg-blue-700 text-white',
    secundario: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    peligro: 'bg-red-600 hover:bg-red-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${estilos[tipo]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {texto}
    </button>
  );
}