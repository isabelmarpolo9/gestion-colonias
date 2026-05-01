# Retrospectiva del Proyecto

---

## 1. Que aprendi durante el proyecto

Este proyecto me ha permitido entender mejor como funciona una aplicacion web completa. Antes del proyecto tenia nociones basicas de React, pero no habia trabajado nunca con un backend propio ni con una API REST.

Lo mas importante que aprendi fue como se comunican el frontend y el backend: el frontend hace peticiones HTTP a la API, el backend las procesa y devuelve los datos en formato JSON, y el frontend los muestra en pantalla. Aunque suena sencillo, en la practica tiene muchos detalles: los tipos tienen que coincidir, el CORS tiene que estar configurado correctamente, y los estados de carga y error tienen que gestionarse bien.

Tambien aprendi a organizar el codigo por capas tanto en el frontend (componentes, hooks, contexto, cliente de API) como en el backend (rutas, controladores, servicios), lo que hace el codigo mucho mas facil de mantener.

---

## 2. Principales problemas encontrados

### Integracion frontend-backend
El mayor problema fue integrar el frontend con el backend. En local fue relativamente fluido, pero al desplegar en produccion surgieron varios problemas:

- **CORS**: El backend solo permitia peticiones desde `localhost:5173`. Al desplegar el frontend en Vercel, las peticiones venian de una URL distinta y el backend las rechazaba. Ademas Vercel genera URLs de preview distintas para cada despliegue, lo que complico aun mas la configuracion del CORS.
- **Variables de entorno**: La URL del backend estaba hardcodeada como `localhost:3000`. Hubo que configurar variables de entorno tanto en el codigo como en los paneles de Vercel y Render.

### Gatos y desparasitaciones
Durante el desarrollo en local tambien hubo problemas con la carga de datos:
- Los gatos no aparecian en `ColonyPage` porque el contexto global llamaba a `useGatos()` sin `coloniaId` y siempre devolvia un array vacio.
- Las desparasitaciones no aparecian sin recargar la pagina porque el formulario actualizaba la API pero no el estado local del componente.

### Problemas de TypeScript
Hubo varios errores de TypeScript que costaron resolver, especialmente con `verbatimModuleSyntax` que obliga a importar los tipos con `import type`, y con el tipo de `req.params.id` en Express que TypeScript no reconocia como `string` directamente.

### Errores de encoding
Al copiar y pegar codigo con caracteres especiales como tildes o la letra n con tilde, algunos archivos TSX generaban errores de parse. Se solucionaron reescribiendo los archivos afectados.

---

## 3. Como use la IA durante el desarrollo

Durante todo el proyecto use Claude como asistente de desarrollo. Dado que tengo pocos conocimientos previos y no tengo a nadie a quien preguntar, la IA fue mi principal fuente de ayuda.

Me sirvio para:
- Explicarme los conceptos antes de implementarlos (que es CORS, que es una API REST, como funciona Context API, etc.)
- Guiarme paso a paso en cada decision tecnica
- Resolver errores de TypeScript y de configuracion
- Escribir el codigo de los componentes, hooks y servicios
- Documentar cada parte del proyecto

La limitacion es que al depender tanto de la IA, en algunos momentos no entendia completamente por que se hacia cada cosa. Pero el proceso de preguntar el porq de cada paso me ayudo a entender mejor el funcionamiento general.

---

## 4. Reflexion final

Este proyecto ha sido un primer contacto real con el desarrollo fullstack. He aprendido que construir una aplicacion web completa implica muchas mas capas de las que parece: no solo hay que hacer que las cosas funcionen en local, sino tambien pensar en el despliegue, la configuracion de entornos, la seguridad basica (CORS), y la organizacion del codigo para que sea mantenible.

Me queda mucho por aprender, especialmente en la parte de TypeScript avanzado, gestion de errores robusta, y testing automatizado. Pero este proyecto me ha dado una base solida para seguir aprendiendo.