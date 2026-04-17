# Gestión del Proyecto

---

## 1. Metodología utilizada

Para organizar el desarrollo de este proyecto se ha utilizado **Kanban** mediante un tablero en Trello. Se eligió Kanban porque el proyecto lo desarrolla una sola persona y el trabajo fluye de forma continua sin necesidad de Sprints fijos.

---

## 2. Tablero de Trello

El tablero está dividido en 5 columnas:

- **Backlog**: Todas las funcionalidades pendientes de empezar
- **Todo**: Tareas seleccionadas para hacer próximamente
- **In Progress**: Tareas que están siendo desarrolladas en este momento
- **Review**: Tareas terminadas que necesitan revisión
- **Done**: Tareas completamente terminadas y verificadas

Enlace al tablero: [Gestión de Colonias Felinas](https://trello.com/b/gcabkubB/gestion-de-colonias-felinas)

---

## 3. Flujo de trabajo

1. Toda funcionalidad nueva entra en **Backlog**
2. Cuando se va a empezar se mueve a **Todo**
3. Mientras se desarrolla está en **In Progress**
4. Al terminar pasa a **Review** para ser revisada
5. Una vez verificada se mueve a **Done**

---

## 4. Control de versiones

Se utiliza Git y GitHub para el control de versiones. Los commits siguen la convención **Conventional Commits**:

- `feat`: nueva funcionalidad
- `fix`: corrección de errores
- `chore`: tareas de configuración
- `docs`: documentación

---

## 5. Estructura del proyecto

El proyecto está organizado como un monorepo con tres carpetas principales:

- `frontend/`: aplicación React + TypeScript + Tailwind
- `backend/`: API REST con Express + TypeScript
- `docs/`: toda la documentación del proyecto