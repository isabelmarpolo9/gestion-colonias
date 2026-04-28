// data.ts
// Datos en memoria que simula una base de datos
// En un proyecto real estos datos estarian en una base de datos como MongoDB o PostgreSQL

export interface Desparasitacion {
  id: string
  fecha: string
  producto: string
}

export interface Gato {
  id: string
  coloniaId: string
  nombre: string
  color: string
  sexo: 'macho' | 'hembra'
  edad: number
  esterilizado: boolean
  testado: boolean
  resultadoTest: 'positivo' | 'negativo' | null
  enfermo: boolean
  descripcionEnfermedad: string
  embarazada: boolean
  foto: string
  desparasitaciones: Desparasitacion[]
}

export interface Colonia {
  id: string
  nombre: string
  direccion: string
  cuidador: string
  coordenadas: {
    lat: number
    lng: number
  }
}

export const colonias: Colonia[] = [
  {
    id: '1',
    nombre: 'Colonia del Parque',
    direccion: 'Parque Grande, Zaragoza',
    cuidador: 'Isabel',
    coordenadas: { lat: 41.6488, lng: -0.8891 }
  },
  {
    id: '2',
    nombre: 'Colonia de la Plaza',
    direccion: 'Plaza del Pilar, Zaragoza',
    cuidador: 'Ana',
    coordenadas: { lat: 41.6561, lng: -0.8773 }
  }
]

export const gatos: Gato[] = [
  {
    id: '1',
    coloniaId: '1',
    nombre: 'Manchas',
    color: 'negro y blanco',
    sexo: 'macho',
    edad: 3,
    esterilizado: true,
    testado: true,
    resultadoTest: 'negativo',
    enfermo: false,
    descripcionEnfermedad: '',
    embarazada: false,
    foto: '',
    desparasitaciones: [
      { id: '1', fecha: '2024-01-15', producto: 'Stronghold' }
    ]
  },
  {
    id: '2',
    coloniaId: '1',
    nombre: 'Luna',
    color: 'gris',
    sexo: 'hembra',
    edad: 2,
    esterilizado: false,
    testado: false,
    resultadoTest: null,
    enfermo: false,
    descripcionEnfermedad: '',
    embarazada: true,
    foto: '',
    desparasitaciones: []
  }
]