# Despliegue demo frontend SSRMining

Guia para publicar Angular como demo publica manteniendo separado el entorno local.

## Entornos

- Local: `src/environments/environment.ts`
- Produccion bajo mismo dominio/API proxy: `src/environments/environment.prod.ts`
- Demo publica: `src/environments/environment.demo.ts`

Antes de desplegar, actualizar:

```ts
apiUrl: 'https://<backend-render>.onrender.com/api/v1'
```

## Vercel

Configuracion sugerida:

```text
Framework Preset: Angular
Build Command: npm run build:demo
Output Directory: dist/ssrmining-control-frontend/browser
```

El archivo `vercel.json` redirige rutas internas a `index.html`, evitando 404 al refrescar paginas como `/dashboard` o `/perforaciones`.

## Backend requerido

El backend debe permitir el dominio final del frontend en `CORS_ORIGIN`.

Ejemplo:

```text
CORS_ORIGIN=https://<frontend-demo>.vercel.app,http://localhost:4200
```

## Validacion funcional

1. Abrir la URL publica del frontend.
2. Iniciar sesion como administrador:

```text
admin@ssrmining.local / Admin12345!
```

3. Validar dashboard, filtros, equipos, usuarios y perforaciones.
4. Iniciar sesion como operador y registrar una perforacion.
5. Iniciar sesion como supervisor y revisar el registro.
