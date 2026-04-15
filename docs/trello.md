# Organización del Proyecto en Trello

---

## 1. Tablero

Se ha creado un tablero en Trello llamado **"Gestión de Colonias Felinas"** para organizar el desarrollo del proyecto siguiendo una metodología Kanban.

---

## 2. Columnas

El tablero está dividido en 5 columnas que representan el estado de cada tarea:

- **Backlog**: Todas las funcionalidades pendientes de empezar
- **Todo**: Tareas seleccionadas para hacer próximamente
- **In Progress**: Tareas que están siendo desarrolladas en este momento
- **Review**: Tareas terminadas que necesitan revisión
- **Done**: Tareas completamente terminadas y verificadas

---

## 3. Tarjetas y subtareas técnicas

### Funcionalidades principales

#### Ver listado de colonias
- Crear componente ColonyList en React
- Crear datos de ejemplo de colonias en LocalStorage
- Crear función en el cliente de API para obtener colonias
- Maquetar la lista con Tailwind

#### Ver los gatos de cada colonia
- Crear componente CatList en React
- Filtrar gatos por colonia desde LocalStorage
- Crear función en el cliente de API para obtener gatos de una colonia
- Maquetar la lista con Tailwind

#### Ficha de cada gato
- Crear componente CatCard en React
- Definir el tipo Cat en TypeScript (nombre, color, sexo, edad, estado)
- Mostrar todos los campos de la ficha
- Maquetar la ficha con Tailwind

#### Marcar si un gato está esterilizado
- Añadir campo esterilizado (boolean) al tipo Cat en TypeScript
- Crear botón para marcar/desmarcar esterilizado
- Guardar el cambio en LocalStorage
- Mostrar el estado visualmente en la ficha

#### Marcar si un gato está testado (FIV/FELV)
- Añadir campo testado (boolean) al tipo Cat en TypeScript
- Crear botón para marcar/desmarcar testado
- Guardar el cambio en LocalStorage
- Mostrar el estado visualmente en la ficha

#### Marcar si un gato está enfermo
- Añadir campo enfermo (boolean) y descripcionEnfermedad (string) al tipo Cat en TypeScript
- Crear botón para marcar/desmarcar enfermo
- Crear campo de texto para describir la enfermedad
- Guardar el cambio en LocalStorage
- Mostrar el estado visualmente en la ficha

#### Marcar si una gata está embarazada
- Añadir campo embarazada (boolean) al tipo Cat en TypeScript
- Crear botón para marcar/desmarcar embarazada
- Guardar el cambio en LocalStorage
- Mostrar el estado visualmente en la ficha

#### Registrar desparasitaciones
- Añadir campo desparasitaciones (array) al tipo Cat en TypeScript
- Crear formulario para registrar fecha y producto
- Guardar la desparasitación en LocalStorage
- Mostrar el historial de desparasitaciones en la ficha

### Funcionalidades opcionales

#### Añadir fotos a la ficha del gato
- Añadir campo foto (string) al tipo Cat en TypeScript
- Crear input para subir una imagen
- Convertir la imagen a base64 para guardarla en LocalStorage
- Mostrar la foto en la ficha del gato

#### Filtrar gatos por estado
- Crear componente de filtros en React
- Añadir filtros por esterilizado, testado, enfermo y embarazada
- Filtrar la lista de gatos según el filtro seleccionado
- Maquetar los filtros con Tailwind

#### Registrar cuidador responsable de cada colonia
- Añadir campo cuidador (string) al tipo Colony en TypeScript
- Crear formulario para registrar el nombre del cuidador
- Guardar el cuidador en LocalStorage
- Mostrar el cuidador en el listado de colonias

#### Exportar datos de una colonia en PDF
- Instalar librería de generación de PDF (jsPDF)
- Crear función para generar el PDF con los datos de la colonia
- Incluir listado de gatos y sus estados en el PDF
- Añadir botón de exportar en la página de la colonia

#### Mapa con la ubicación de las colonias
- Instalar librería de mapas (Leaflet)
- Añadir campo coordenadas (lat, lng) al tipo Colony en TypeScript
- Crear componente Map en React
- Mostrar un marcador por cada colonia en el mapa
- Maquetar el mapa con Tailwind

---

## 4. Flujo de trabajo

Las tarjetas se mueven de izquierda a derecha según avanzan:
1. Toda funcionalidad nueva entra en **Backlog**
2. Cuando se va a empezar se mueve a **Todo**
3. Mientras se desarrolla está en **In Progress**
4. Al terminar pasa a **Review** para ser revisada
5. Una vez verificada se mueve a **Done**