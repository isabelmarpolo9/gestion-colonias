// Badge.tsx
// Componente reutilizable para mostrar el estado de un gato
// Por ejemplo: "Esterilizado", "Enfermo", "Embarazada"

interface BadgeProps {
  texto: string;
  color: 'verde' | 'rojo' | 'amarillo' | 'azul' | 'gris';
}

export default function Badge({ texto, color }: BadgeProps) {
  const colores = {
    verde: 'bg-green-100 text-green-800',
    rojo: 'bg-red-100 text-red-800',
    amarillo: 'bg-yellow-100 text-yellow-800',
    azul: 'bg-blue-100 text-blue-800',
    gris: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colores[color]}`}>
      {texto}
    </span>
  );
}