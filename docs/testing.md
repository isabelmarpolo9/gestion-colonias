# Testing y Pruebas

---

## 1. Pruebas manuales

### HomePage
| Funcionalidad | Resultado |
|---------------|-----------|
| Se cargan las colonias desde la API | OK |
| El buscador filtra colonias por nombre y direccion | OK |
| Se puede crear una colonia nueva | OK |
| Se puede eliminar una colonia | OK |
| Se muestra mensaje de carga mientras llegan los datos | OK |
| Se muestra mensaje de error si el servidor no esta disponible | OK |

### ColonyPage
| Funcionalidad | Resultado |
|---------------|-----------|
| Se cargan los gatos de la colonia desde la API | OK |
| Los filtros funcionan correctamente | OK |
| Se puede crear un gato nuevo | OK |
| El gato nuevo aparece en la lista sin recargar | OK |
| Se puede navegar a la ficha de un gato | OK |

### CatPage
| Funcionalidad | Resultado |
|---------------|-----------|
| Se carga la ficha del gato desde la API | OK |
| Se puede marcar/desmarcar esterilizado | OK |
| Se puede marcar/desmarcar testado | OK |
| Se puede marcar/desmarcar enfermo | OK |
| Se puede marcar/desmarcar embarazada | OK |
| Se puede registrar una desparasitacion | OK |
| La desparasitacion aparece sin recargar la pagina | OK |
| Se puede eliminar un gato | OK |

### Navegacion
| Funcionalidad | Resultado |
|---------------|-----------|
| El enlace del header lleva al inicio | OK |
| El boton volver funciona en ColonyPage | OK |
| El boton volver funciona en CatPage | OK |
| Una URL incorrecta muestra la pagina 404 | OK |

---

## 2. Pruebas de responsive

La app se ha probado en los siguientes tamaños de pantalla usando las herramientas de desarrollador del navegador:

| Dispositivo | Resultado |
|-------------|-----------|
| Escritorio (1280px) | OK |
| Tablet (768px) | OK |
| Movil (375px) | OK |

---

## 3. Bugs encontrados y corregidos

### Bug 1: Gatos no aparecian en ColonyPage
**Problema**: El contexto global llamaba a `useGatos()` sin `coloniaId`, por lo que siempre devolvía un array vacío.
**Solucion**: `ColonyPage` ahora usa su propio `useGatos(id)` con el ID de la colonia.

### Bug 2: CatPage mostraba pantalla en blanco
**Problema**: `CatPage` buscaba el gato en el contexto global que no tenia gatos cargados.
**Solucion**: `CatPage` ahora usa su propio `useGatos()` para cargar todos los gatos desde la API.

### Bug 3: Desparasitaciones no aparecian sin recargar
**Problema**: El formulario actualizaba la API pero no el estado local de `CatPage`.
**Solucion**: Se añadio una funcion `recargar` al hook `useGatos` que se llama al registrar una desparasitacion.

### Bug 4: Error de encoding en archivos TSX
**Problema**: Al copiar y pegar codigo con caracteres especiales aparecian errores de parse.
**Solucion**: Se reescribieron los archivos afectados evitando caracteres especiales.

---

## 4. Revision de consola

Se han revisado los errores de consola del navegador durante las pruebas. No se han encontrado errores en produccion. Los unicos avisos son del modo estricto de React en desarrollo, que son esperados.