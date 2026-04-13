# Metodologías de Desarrollo de Software

> Documento de investigación elaborado como parte del proceso de planificación del proyecto.

---

## 1. ¿Qué es Agile?

Agile (en español, "ágil") es una **filosofía de desarrollo de software** que nació como respuesta a los problemas del desarrollo tradicional (conocido como modelo en cascada o *Waterfall*). En el modelo tradicional, se planificaba todo el proyecto al inicio, se desarrollaba de principio a fin, y el cliente no veía el resultado hasta el final. Esto generaba un problema enorme: si algo había salido mal, se descubría demasiado tarde.

Agile propone una manera diferente de pensar: en lugar de construir todo de golpe, se trabaja en **ciclos cortos y repetitivos**, entregando partes funcionales del software frecuentemente. Así, el cliente puede ver avances reales, dar feedback, y el equipo puede corregir el rumbo antes de que los errores se acumulen.

### Objetivo principal de Agile

El objetivo de Agile es **entregar valor al cliente de manera continua y adaptarse al cambio** sin que eso destruya el proyecto. No es un conjunto de reglas fijas, sino un conjunto de valores y principios recogidos en el llamado *Manifiesto Ágil* (2001), que entre otras cosas dice:

- Las personas y la comunicación importan más que los procesos y las herramientas.
- El software que funciona importa más que la documentación exhaustiva.
- La colaboración con el cliente importa más que la negociación de contratos.
- Responder al cambio importa más que seguir un plan rígido.

Agile **no es una metodología en sí misma**, sino un paraguas bajo el cual existen varias metodologías concretas. Las más conocidas son **Scrum** y **Kanban**.

---

## 2. ¿Qué es Scrum?

Scrum es una **metodología ágil estructurada** que organiza el trabajo en ciclos cortos llamados *Sprints*. Es el framework ágil más usado en la industria del software.

La idea central es: dividir el trabajo en piezas manejables, asignar un equipo pequeño con roles claros, trabajar durante un período fijo, y al final del período entregar algo funcional. Después se revisa, se aprende, y se repite.

### 2.1 Roles en Scrum

Scrum define exactamente **quién hace qué** dentro del equipo:

#### Product Owner (Dueño del Producto)
Es la persona responsable de definir **qué se construye y en qué orden**. Representa los intereses del cliente o del negocio. Mantiene actualizado el *Product Backlog* (explicado más abajo) y decide qué es más valioso para el proyecto. No es el jefe del equipo técnico, sino el responsable del producto.

#### Scrum Master
Es el responsable de que el equipo **aplique Scrum correctamente**. No es un jefe ni un gestor de proyectos tradicional. Su rol es eliminar los obstáculos que impiden al equipo trabajar bien, facilitar las reuniones, y asegurarse de que todos entiendan y respeten el proceso. Es, en cierto modo, el guardián del método.

#### Development Team (Equipo de Desarrollo)
Es el grupo de personas que **construye el software**. Suelen ser entre 3 y 9 personas. Son autogestionados: deciden entre ellos cómo hacer el trabajo técnico. No tienen sub-roles fijos (no hay un "jefe de desarrolladores" dentro del equipo).

### 2.2 Sprints

Un Sprint es el **ciclo de trabajo central de Scrum**. Es un período de tiempo fijo, normalmente de 1 a 4 semanas, durante el cual el equipo se compromete a completar un conjunto de tareas.

Las reglas del Sprint son:
- Su duración no cambia una vez iniciado.
- El objetivo del Sprint no se modifica mientras está en curso.
- Al final del Sprint, debe existir un **incremento funcional** del producto (algo que se puede mostrar y, idealmente, usar).

Esta estructura fija es importante porque **crea un ritmo predecible**. El equipo sabe que cada X semanas hay que entregar algo real, lo que evita la procrastinación y los proyectos que nunca terminan.

### 2.3 Backlog

El *Backlog* es, en esencia, **la lista de todo lo que hay que hacer** en el proyecto, ordenada por prioridad.

Existen dos tipos:

- **Product Backlog**: La lista completa de funcionalidades, mejoras y correcciones que el producto podría necesitar. La gestiona el Product Owner. Está viva: cambia con el tiempo según las necesidades del negocio.

- **Sprint Backlog**: El subconjunto del Product Backlog que el equipo se compromete a completar durante el Sprint actual. Se define al inicio de cada Sprint en una reunión llamada *Sprint Planning*.

Las tareas del backlog se escriben normalmente como **User Stories** (historias de usuario): descripciones simples de una funcionalidad desde el punto de vista del usuario. Ejemplo: *"Como usuario, quiero poder filtrar los productos por precio para encontrar lo que me interesa más rápido."*

### 2.4 Ceremonias (Reuniones) de Scrum

Scrum define reuniones concretas para mantener al equipo alineado:

- **Sprint Planning**: Al inicio del Sprint. El equipo decide qué tareas del Product Backlog va a abordar y cómo.
- **Daily Scrum (Daily Standup)**: Reunión diaria de máximo 15 minutos. Cada miembro responde: ¿qué hice ayer?, ¿qué haré hoy?, ¿hay algo que me bloquea?
- **Sprint Review**: Al final del Sprint. El equipo muestra al Product Owner (y al cliente si es posible) lo que se ha construido. Se recibe feedback.
- **Sprint Retrospective**: Después del Review. El equipo reflexiona sobre su propio proceso: ¿qué fue bien?, ¿qué fue mal?, ¿qué mejoraremos en el próximo Sprint?

---

## 3. ¿Qué es Kanban?

Kanban es otra metodología ágil, pero con una filosofía diferente a Scrum. Su origen está en el sistema de producción de **Toyota** en los años 50, donde se usaban tarjetas físicas (*kan* = visual, *ban* = tarjeta) para controlar el flujo de trabajo en las fábricas.

Aplicado al software, Kanban propone **visualizar el trabajo en curso** y **limitar cuántas tareas se pueden hacer al mismo tiempo**. No hay Sprints, no hay roles fijos, no hay reuniones obligatorias. Es mucho más flexible.

### 3.1 El tablero Kanban

La herramienta central de Kanban es el **tablero**. Se divide en columnas que representan los estados posibles de una tarea. La estructura más básica es:

| Por hacer | En progreso | Hecho |
|-----------|-------------|-------|
| Tarea A   | Tarea C     | Tarea E |
| Tarea B   |             | Tarea F |

Cada tarea es una tarjeta que se mueve de izquierda a derecha según avanza. En proyectos reales, las columnas pueden ser más específicas: *Backlog → Diseño → Desarrollo → Testing → Revisión → Desplegado*.

### 3.2 WIP Limits (Límites de trabajo en progreso)

Una de las reglas más importantes de Kanban es el **WIP Limit** (*Work In Progress Limit*): establecer un máximo de tareas que pueden estar en progreso al mismo tiempo en cada columna.

¿Por qué? Porque hacer muchas cosas a la vez parece productivo pero en realidad ralentiza todo. Si un desarrollador tiene 8 tareas "en progreso", en realidad no está avanzando en ninguna. Limitar el WIP obliga a **terminar antes de empezar algo nuevo**, lo que mejora el flujo.

### 3.3 Flujo continuo

A diferencia de Scrum, Kanban no trabaja en ciclos. El trabajo **fluye de manera continua**: cuando se termina una tarea, se coge la siguiente del backlog. No hay fecha de entrega fija por Sprint, sino un flujo constante de trabajo completado.

Esto hace que Kanban sea ideal para entornos donde las tareas llegan de forma imprevisible (como soporte técnico o mantenimiento).

---

## 4. Diferencias entre Scrum y Kanban

| Aspecto | Scrum | Kanban |
|---|---|---|
| **Estructura temporal** | Trabaja en Sprints de duración fija | Flujo continuo, sin ciclos fijos |
| **Roles** | Roles definidos: Product Owner, Scrum Master, equipo | No define roles específicos |
| **Cambios en curso** | No se cambian las tareas durante el Sprint | Se pueden añadir o cambiar tareas en cualquier momento |
| **Métricas principales** | Velocidad del equipo (puntos por Sprint) | Lead time y cycle time (tiempo que tarda una tarea en completarse) |
| **Reuniones** | Reuniones obligatorias definidas por el framework | No hay reuniones obligatorias |
| **Entregas** | Al final de cada Sprint | Continuas, cuando una tarea está lista |
| **Rigidez** | Más estructurado y prescriptivo | Más flexible y adaptable |
| **Curva de aprendizaje** | Requiere formación y comprensión del framework | Más fácil de adoptar gradualmente |

---

## 5. ¿Cuándo usar cada metodología?

### Cuándo usar Scrum

Scrum es la mejor opción cuando:

- El proyecto tiene un **alcance que puede dividirse en funcionalidades** entregables.
- El equipo es **estable y dedicado** al proyecto (no gente que entra y sale).
- Se necesita **feedback frecuente** del cliente para ajustar la dirección.
- El proyecto es **nuevo** (no hay una base de código heredada enorme que mantener).
- El equipo puede comprometerse a las ceremonias: planning, daily, review, retro.

**Ejemplos típicos**: Desarrollo de un producto SaaS desde cero, construcción de una app móvil, desarrollo de un MVP (*Minimum Viable Product*).

### Cuándo usar Kanban

Kanban es la mejor opción cuando:

- El trabajo es **continuo e impredecible**: llegan tareas nuevas constantemente.
- El equipo también hace **mantenimiento y soporte**, no solo desarrollo de nuevas funcionalidades.
- Se busca una metodología de **adopción gradual** sin reestructurar todo el equipo.
- No hay un "final de proyecto" claro, sino un flujo de trabajo permanente.
- El equipo es pequeño o trabaja de forma más **independiente**.

**Ejemplos típicos**: Equipo de soporte técnico, mantenimiento de un sistema en producción, equipos de operaciones, freelancers gestionando múltiples clientes.

### ¿Y si no quiero elegir solo uno?

Existe una combinación llamada **Scrumban**, que mezcla la estructura de Sprints de Scrum con el tablero visual y los WIP limits de Kanban. Es una opción válida para equipos que quieren lo mejor de ambos mundos.

---

## Conclusión

Agile es la filosofía, Scrum y Kanban son dos formas concretas de aplicarla. Ninguna es mejor en absoluto: **la mejor metodología es la que se adapta al contexto del equipo y del proyecto**. Para este proyecto, dado que estamos construyendo una aplicación nueva desde cero con funcionalidades claras y etapas definidas, **Scrum** es la metodología más apropiada.

---

*Documento elaborado durante la fase de investigación inicial del proyecto.*