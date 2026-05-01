# Despliegue

---

## 1. Servicios utilizados

- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Render (https://render.com)

---

## 2. URLs en produccion

- **Frontend**: https://gestion-colonias.vercel.app
- **Backend API**: https://gestion-colonias-api.onrender.com
- **Health check**: https://gestion-colonias-api.onrender.com/api/health

---

## 3. Despliegue del backend en Render

1. Crear cuenta en Render con GitHub
2. Crear un nuevo **Web Service**
3. Seleccionar el repositorio `gestion-colonias`
4. Configurar:
   - **Name**: `gestion-colonias-api`
   - **Language**: Node
   - **Branch**: main
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Añadir variable de entorno: `PORT=3000`
6. Hacer clic en **Deploy Web Service**

Render redespliega automaticamente cada vez que se hace push a la rama `main`.

---

## 4. Despliegue del frontend en Vercel

1. Crear cuenta en Vercel con GitHub
2. Hacer clic en **Add New Project**
3. Importar el repositorio `gestion-colonias`
4. Configurar:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
5. Añadir variable de entorno:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://gestion-colonias-api.onrender.com/api/v1`
6. Hacer clic en **Deploy**

Vercel redespliega automaticamente cada vez que se hace push a la rama `main`.

---

## 5. Variables de entorno

### Frontend (Vercel)
| Variable | Valor | Descripcion |
|----------|-------|-------------|
| VITE_API_URL | https://gestion-colonias-api.onrender.com/api/v1 | URL del backend en produccion |

### Backend (Render)
| Variable | Valor | Descripcion |
|----------|-------|-------------|
| PORT | 3000 | Puerto en el que corre el servidor |

---

## 6. CORS

El backend tiene configurado CORS para permitir peticiones desde:
- `http://localhost:5173` (desarrollo local)
- Cualquier URL que termine en `.vercel.app` (produccion)

---

## 7. Notas importantes

- El plan gratuito de Render hace que el servidor se duerma tras 15 minutos de inactividad. La primera peticion puede tardar hasta 50 segundos en responder mientras el servidor se despierta.
- El `.env` nunca se sube a GitHub. Las variables de entorno se configuran directamente en los paneles de Vercel y Render.