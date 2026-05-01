import express from 'express'
import coloniasRouter from './routes/colonias'
import gatosRouter from './routes/gatos'

const app = express()
const PORT = 3000

// Middleware para parsear JSON
// Sin esto Express no puede leer el body de las peticiones POST y PUT
app.use(express.json())

// Middleware para permitir peticiones desde el frontend (CORS)
// Sin esto el navegador bloquea las peticiones del frontend al backend
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://gestion-colonias.vercel.app']
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Rutas
app.use('/api/v1/colonias', coloniasRouter)
app.use('/api/v1/gatos', gatosRouter)

// Ruta de health check para comprobar que el servidor esta funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})