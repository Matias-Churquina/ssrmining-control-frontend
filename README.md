# SSRMining Control de Perforaciones - Frontend

Frontend web para tablets y navegadores de escritorio del sistema de control de perforaciones de SSRMining.

Preparado por **Credere.Dev**.

## Stack inicial

- Angular 22
- TypeScript
- SCSS
- Bootstrap
- Bootstrap Icons
- RxJS
- Angular Router
- Angular HttpClient

## Estructura base

```text
src/app/
├── components/
│   ├── app-shell/
│   ├── metric-tile/
│   └── status-card/
├── core/
│   ├── guards/
│   └── interceptors/
├── models/
├── pages/
│   ├── login/
│   ├── dashboard/
│   ├── usuarios/
│   ├── equipos/
│   ├── perforaciones/
│   └── revision-supervisor/
├── services/
└── app.routes.ts
```

## Relacion con backend

El frontend queda preparado para consumir la API V1 del backend:

```text
http://localhost:3000/api/v1
```

La URL esta definida en:

```text
src/environments/environment.ts
```

## Comandos

Instalar dependencias:

```bash
npm install
```

Levantar en desarrollo:

```bash
npm start
```

Compilar:

```bash
npm run build
```

Ejecutar pruebas:

```bash
npm test
```

## Alcance de esta primera base

- Login conectado al endpoint de autenticacion.
- Persistencia local del token JWT.
- Interceptor para enviar `Authorization: Bearer <token>`.
- Guard para proteger rutas internas.
- Layout responsive orientado a tablets.
- Paginas iniciales para dashboard, usuarios, equipos, perforaciones y revision de supervisor.
- Servicios tipados para consumir los modulos ya disponibles en backend V1.

## Siguientes pasos

1. Validar visualmente la app con el backend corriendo.
2. Ajustar contratos si alguna respuesta real difiere del tipado inicial.
3. Construir formularios de alta y edicion.
4. Incorporar filtros avanzados de perforaciones y dashboard.
5. Agregar pruebas unitarias de servicios, guards e interacciones principales.
