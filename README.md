# Granja SaaS Monorepo

Plataforma SaaS agropecuaria modular con arquitectura lista para escalar por suscripciones.

## Stack
- **Frontend:** Next.js + TypeScript + TailwindCSS
- **Backend:** NestJS + JWT + Guards (roles/suscripción)
- **DB:** PostgreSQL + Prisma
- **Arquitectura:** Monorepo con workspaces

## Estructura

```
/
├── apps/
│   ├── web   # Next.js
│   └── api   # NestJS
├── prisma/
│   └── schema.prisma
├── .env
└── README.md
```

## Módulos
- SaaS multiusuario (registro/login/JWT)
- Suscripciones (PORCINO, PISCICOLA, GANADERO, COMBO, EMPRESARIAL)
- Landing comercial SaaS
- Dashboard interno modular
- **Porcino funcional:** animales + eventos + métricas + descuento de bodega
- Piscícola (estructura base)
- Ganadero (estructura base)
- Bodega transversal
- Ventas
- Reportes básicos

## Variables de entorno
Configurar `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/granja_saas?schema=public"
JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="1d"
NEXT_PUBLIC_API_URL="http://localhost:4000"
PORT=4000
```

## Ejecutar

```bash
npm install
npx prisma migrate dev
npm run dev
```

- API en `http://localhost:4000`
- Web en `http://localhost:3000`

## Endpoints clave
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `GET/POST /porcino/animals`
- `GET/POST /porcino/events`
- `GET /porcino/metrics`
- `GET/POST /bodega/items`
- `GET/POST /sales`
- `GET /reports/summary`

## Stripe (futuro)
El modelo `Subscription` ya contempla `stripeRef` para futura sincronización con Stripe Billing.
