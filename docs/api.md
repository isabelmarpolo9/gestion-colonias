# Documentacion de la API REST

Base URL: `http://localhost:3000/api/v1`

---

## Health Check

### GET /api/health
Comprueba que el servidor esta funcionando.

**Response 200:**
```json
{
  "status": "ok",
  "message": "Servidor funcionando correctamente"
}
```

---

## Colonias

### GET /api/v1/colonias
Devuelve todas las colonias.

**Response 200:**
```json
[
  {
    "id": "1",
    "nombre": "Colonia del Parque",
    "direccion": "Parque Grande, Zaragoza",
    "cuidador": "Isabel",
    "coordenadas": { "lat": 41.6488, "lng": -0.8891 }
  }
]
```

---

### GET /api/v1/colonias/:id
Devuelve una colonia concreta.

**Response 200:**
```json
{
  "id": "1",
  "nombre": "Colonia del Parque",
  "direccion": "Parque Grande, Zaragoza",
  "cuidador": "Isabel",
  "coordenadas": { "lat": 41.6488, "lng": -0.8891 }
}
```

**Response 404:**
```json
{ "error": "Colonia no encontrada" }
```

---

### POST /api/v1/colonias
Crea una colonia nueva.

**Request body:**
```json
{
  "nombre": "Colonia del Rio",
  "direccion": "Paseo Echegaray, Zaragoza",
  "cuidador": "Maria"
}
```

**Response 201:**
```json
{
  "id": "1234567890",
  "nombre": "Colonia del Rio",
  "direccion": "Paseo Echegaray, Zaragoza",
  "cuidador": "Maria",
  "coordenadas": { "lat": 0, "lng": 0 }
}
```

**Response 400:**
```json
{ "error": "Nombre, direccion y cuidador son obligatorios" }
```

---

### PUT /api/v1/colonias/:id
Actualiza una colonia existente.

**Request body:**
```json
{
  "cuidador": "Laura"
}
```

**Response 200:**
```json
{
  "id": "1",
  "nombre": "Colonia del Parque",
  "direccion": "Parque Grande, Zaragoza",
  "cuidador": "Laura",
  "coordenadas": { "lat": 41.6488, "lng": -0.8891 }
}
```

**Response 404:**
```json
{ "error": "Colonia no encontrada" }
```

---

### DELETE /api/v1/colonias/:id
Elimina una colonia.

**Response 200:**
```json
{ "message": "Colonia eliminada correctamente" }
```

**Response 404:**
```json
{ "error": "Colonia no encontrada" }
```

---

## Gatos

### GET /api/v1/colonias/:id/gatos
Devuelve los gatos de una colonia concreta.

**Response 200:**
```json
[
  {
    "id": "1",
    "coloniaId": "1",
    "nombre": "Manchas",
    "color": "negro y blanco",
    "sexo": "macho",
    "edad": 3,
    "esterilizado": true,
    "testado": true,
    "resultadoTest": "negativo",
    "enfermo": false,
    "descripcionEnfermedad": "",
    "embarazada": false,
    "foto": "",
    "desparasitaciones": [
      { "id": "1", "fecha": "2024-01-15", "producto": "Stronghold" }
    ]
  }
]
```

---

### GET /api/v1/gatos/:id
Devuelve un gato concreto.

**Response 200:**
```json
{
  "id": "1",
  "coloniaId": "1",
  "nombre": "Manchas",
  "color": "negro y blanco",
  "sexo": "macho",
  "edad": 3,
  "esterilizado": true,
  "testado": true,
  "resultadoTest": "negativo",
  "enfermo": false,
  "descripcionEnfermedad": "",
  "embarazada": false,
  "foto": "",
  "desparasitaciones": []
}
```

**Response 404:**
```json
{ "error": "Gato no encontrado" }
```

---

### POST /api/v1/colonias/:id/gatos
Crea un gato nuevo en una colonia.

**Request body:**
```json
{
  "nombre": "Tigre",
  "color": "naranja",
  "sexo": "macho",
  "edad": 4
}
```

**Response 201:**
```json
{
  "id": "1234567890",
  "coloniaId": "1",
  "nombre": "Tigre",
  "color": "naranja",
  "sexo": "macho",
  "edad": 4,
  "esterilizado": false,
  "testado": false,
  "resultadoTest": null,
  "enfermo": false,
  "descripcionEnfermedad": "",
  "embarazada": false,
  "foto": "",
  "desparasitaciones": []
}
```

**Response 400:**
```json
{ "error": "Nombre, color, sexo y edad son obligatorios" }
```

---

### PUT /api/v1/gatos/:id
Actualiza un gato existente.

**Request body:**
```json
{
  "esterilizado": true
}
```

**Response 200:**
```json
{
  "id": "1",
  "esterilizado": true
}
```

**Response 404:**
```json
{ "error": "Gato no encontrado" }
```

---

### DELETE /api/v1/gatos/:id
Elimina un gato.

**Response 200:**
```json
{ "message": "Gato eliminado correctamente" }
```

**Response 404:**
```json
{ "error": "Gato no encontrado" }
```

---

## Codigos HTTP

| Codigo | Significado |
|--------|-------------|
| 200 | Exito |
| 201 | Creado correctamente |
| 400 | Error del cliente (datos incorrectos) |
| 404 | No encontrado |
| 500 | Error del servidor |