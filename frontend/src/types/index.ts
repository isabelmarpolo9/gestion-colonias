// Tipos principales de la aplicación

export interface Desparasitacion {
  id: string;
  fecha: string;
  producto: string;
}

export interface Gato {
  id: string;
  coloniaId: string;
  nombre: string;
  color: string;
  sexo: 'macho' | 'hembra';
  edad: number;
  esterilizado: boolean;
  testado: boolean;
  resultadoTest: 'positivo' | 'negativo' | null;
  enfermo: boolean;
  descripcionEnfermedad: string;
  embarazada: boolean;
  foto: string;
  desparasitaciones: Desparasitacion[];
}

export interface Colonia {
  id: string;
  nombre: string;
  direccion: string;
  cuidador: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
}
