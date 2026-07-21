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
  components/
    app-shell/
    metric-tile/
    status-card/
  core/
    guards/
    interceptors/
  models/
  pages/
    login/
    dashboard/
    usuarios/
    equipos/
    perforaciones/
    revision-supervisor/
  services/
  app.routes.ts
```

## Relacion con backend

El frontend consume la API V1 del backend:

```text
http://localhost:3000/api/v1
```

La URL esta definida en:

```text
src/environments/environment.ts
```

## Credenciales demo

```text
Administrador
Email: admin@ssrmining.local
Password: Admin12345!

Supervisor
Email: supervisor@ssrmining.local
Password: Supervisor12345!

Operador
Email: operador1@ssrmining.local
Password: Operador12345!
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
npm test -- --watch=false
```

## Alcance de esta base

- Login conectado al endpoint de autenticacion.
- Persistencia local del token JWT.
- Interceptor para enviar `Authorization: Bearer <token>`.
- Guard para proteger rutas internas.
- Layout responsive orientado a tablets.
- Paginas iniciales para dashboard, usuarios, equipos, perforaciones y revision de supervisor.
- Servicios tipados y alineados al contrato `{ data }` del backend V1.
- Dashboard conectado a KPIs reales: metros, pozos, ROP, adherencia, ranking de operadores y distribucion operacional.

## Siguientes pasos

1. Validar visualmente la app con backend corriendo.
2. Construir formularios de alta y edicion.
3. Incorporar filtros avanzados de perforaciones y dashboard.
4. Implementar acciones visuales de revision supervisor.
5. Agregar pruebas unitarias de servicios, guards e interacciones principales.
