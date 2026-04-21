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
    primario: 'bg-purple-600 hover:bg-purple-700 text-white',
    secundario: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
    peligro: 'bg-red-500 hover:bg-red-600 text-white',
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