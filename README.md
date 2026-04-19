# Aulentra — Sitio web institucional

Sitio web de Aulentra · sistema operativo académico. Producto de [Noventor](#).

Next.js 14 · TypeScript · Tailwind CSS 3.4 · sistema de diseño **Horizon dark**.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3001
npm run build
npm run start
npm run lint
```

## Stack

| Tecnología   | Versión |
| ------------ | ------- |
| Next.js      | 14.2    |
| TypeScript   | 5.5     |
| Tailwind CSS | 3.4     |
| React        | 18.3    |

## Sistema Horizon (modo dark)

| Token             | Hex        | Uso                           |
| ----------------- | ---------- | ----------------------------- |
| `bg`              | `#151935`  | Fondo dominante               |
| `bg-deep`         | `#101328`  | Fondo alterno / sidebar       |
| `card`            | `#1D2145`  | Superficies de card           |
| `elevated`        | `#242852`  | Hover / cards elevadas        |
| `fg`              | `#ECEEF8`  | Texto principal               |
| `fg-soft`         | `#B8BDD6`  | Texto secundario              |
| `muted`           | `#7B82A6`  | Metadata, placeholders        |
| `primary`         | `#A5B4FC`  | Acento Horizon soft (indigo)  |
| `accent`          | `#7DD3FC`  | Acento secundario (blue)      |
| `accent-cyan`     | `#67E8F9`  | Tercer acento (cyan)          |
| Gradiente Horizon | `135deg, #4F46E5 → #3B82F6 → #06B6D4` | CTAs, destellos |
| Gradiente soft    | `135deg, #A5B4FC → #7DD3FC → #67E8F9` | Hairlines, accents dark |

## Tipografías

- **Geist Sans** — cuerpo y UI (mismo stack que la app de producto)
- **Geist Mono** — etiquetas técnicas, códigos de rol
- **IBM Plex Serif** — acentos editoriales (citas, firmas)

## Estructura

```
src/
 ├─ app/              · App Router · layout, page, globals.css
 ├─ components/
 │   ├─ layout/       · Header, Footer
 │   └─ ui/           · Badge, Button, Container, Reveal, SectionWrapper, Wordmark
 ├─ content/          · Copy centralizado (landing.ts)
 └─ lib/              · Utilidades (cn)
```

## Relación con Noventor

Aulentra es la primera solución de Noventor. El sitio de Noventor (empresa) vive en un repo aparte.
