<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=white&color=61DAFB" />
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4" />
    <img src="https://img.shields.io/badge/-PostgreSQL-black?style=for-the-badge&logo=postgresql&logoColor=white&color=336791" />
    <img src="https://img.shields.io/badge/-Supabase-black?style=for-the-badge&logo=supabase&logoColor=white&color=3ECF8E" />
  </div>

<h1 align="center">📊 Dashboard de Ventas & Auditoría de Datos</h1>
<p align="center">
Prueba Técnica – Carga, Normalización y Explotación de Datos
</p>
</div>

---

## 📋 Table of Contents

1. 🤖 [Introducción](#introduccion)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Características](#features)
4. 🧠 [Arquitectura y Flujo](#arquitectura)
5. 🤸 [Quick Start](#quick-start)
6. 🗄️ [Modelo de Datos](#modelo)
7. 🚀 [Conclusión](#conclusion)

---

## <a name="introduccion">🤖 Introducción</a>

Este proyecto corresponde a una **prueba técnica de desarrollo**, cuyo objetivo es demostrar la capacidad de:

- Cargar datos desde archivos CSV externos
- Limpiar y normalizar información inconsistente
- Preservar errores para auditoría
- Explotar los datos mediante visualización y análisis

La solución simula un **entorno real de datos empresariales**, donde los errores no se eliminan, sino que se **registran, analizan y visualizan**.

---

## <a name="tech-stack">Tech Stack</a>

- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Recharts**
- **PostgreSQL**
- **Supabase**
- **SQL (ETL & auditoría)**

---

## <a name="features">Características</a>

**Carga de datos RAW**  
Los CSV se almacenan sin modificaciones para preservar trazabilidad.

**Normalización de datos**  
- Fechas inválidas
- Valores nulos
- Totales negativos
- Números en formato texto

**Auditoría completa**  
Los errores no se eliminan, se almacenan con su motivo:
- `FECHA_INVALIDA`
- `TOTAL_NEGATIVO`
- `CLIENTE_ID_NULO`
- `FORMATO_INVALIDO`

**Dashboard Analítico**  
- KPIs de errores
- Gráficos por tipo de error
- Gráficos por canal de venta
- Tablas detalladas de auditoría
---

## <a name="arquitectura">Arquitectura y Flujo</a>

<img src="public/Diagrama.png" alt="Diagrama de Arquitectura" />

## <a name="quick-start">🤸 Quick Start</a>

### Prerrequisitos

- Git
- Node.js
- npm

### Clonar repositorio

```bash
git clone https://github.com/AngelEmilioAquino/dashboard-DNI.git
cd dashboard-DNI
```

**Instalar Dependencia**

Instale las dependencias del proyecto usando npm:

```bash
npm install
```

**Correr el proyecto**

```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173) en el navegador para visualizar el proyecto.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>Global.css</code></summary>

```jsx
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

</details>

<details>
<summary><code>data.ts</code></summary>

```ts
export interface Cliente {
  cliente_id: number
  nombre: string
  ciudad: string
  segmento: string
  fecha_registro: string
}

export interface Venta {
  venta_id: number
  cliente_id: number
  fecha: string
  total: number
  moneda: string
  canal: string
}

export const clientes: Cliente[] = [
  { cliente_id: 1, nombre: "Clínica Guerrero S.A.", ciudad: "La Romana", segmento: "Individual", fecha_registro: "2024-11-23" },
  { cliente_id: 2, nombre: "Raúl Pérez", ciudad: "San Pedro de Macorís", segmento: "Retail", fecha_registro: "2024-12-12" },
  { cliente_id: 3, nombre: "Ferretería Guerrero Corp.", ciudad: "San Pedro de Macorís", segmento: "Individual", fecha_registro: "2024-01-17" },
  { cliente_id: 4, nombre: "Importadora Rodríguez S.A.", ciudad: "Higüey", segmento: "Corporativo", fecha_registro: "2024-10-14" },
  { cliente_id: 5, nombre: "Supermercados Del Este", ciudad: "Santo Domingo", segmento: "Corporativo", fecha_registro: "2024-05-20" },
  { cliente_id: 6, nombre: "María González", ciudad: "Santiago", segmento: "Individual", fecha_registro: "2024-03-08" },
  { cliente_id: 7, nombre: "Tech Solutions RD", ciudad: "Santo Domingo", segmento: "Corporativo", fecha_registro: "2024-07-15" },
  { cliente_id: 8, nombre: "Farmacia Central", ciudad: "La Vega", segmento: "Retail", fecha_registro: "2024-09-22" },
]

export const ventas: Venta[] = [
  { venta_id: 1001, cliente_id: 1, fecha: "2025-03-27", total: 1316.31, moneda: "DOP", canal: "kiosko" },
  { venta_id: 1002, cliente_id: 2, fecha: "2025-01-09", total: 2912.88, moneda: "DOP", canal: "web" },
  { venta_id: 1003, cliente_id: 3, fecha: "2025-02-15", total: 4521.50, moneda: "DOP", canal: "tienda" },
  { venta_id: 1004, cliente_id: 4, fecha: "2025-03-01", total: 8750.00, moneda: "DOP", canal: "web" },
  { venta_id: 1005, cliente_id: 5, fecha: "2025-01-20", total: 15230.75, moneda: "DOP", canal: "tienda" },
  { venta_id: 1006, cliente_id: 6, fecha: "2025-02-28", total: 890.25, moneda: "DOP", canal: "kiosko" },
  { venta_id: 1007, cliente_id: 7, fecha: "2025-03-15", total: 23450.00, moneda: "DOP", canal: "web" },
  { venta_id: 1008, cliente_id: 8, fecha: "2025-03-20", total: 3200.50, moneda: "DOP", canal: "tienda" },
  { venta_id: 1009, cliente_id: 1, fecha: "2025-02-10", total: 2100.00, moneda: "DOP", canal: "web" },
  { venta_id: 1010, cliente_id: 2, fecha: "2025-03-05", total: 1850.75, moneda: "DOP", canal: "kiosko" },
  { venta_id: 1011, cliente_id: 3, fecha: "2025-01-25", total: 5600.00, moneda: "DOP", canal: "tienda" },
  { venta_id: 1012, cliente_id: 4, fecha: "2025-02-20", total: 9200.50, moneda: "DOP", canal: "web" },
]

// Helper functions for dashboard statistics
export function getTotalVentas(): number {
  return ventas.reduce((sum, v) => sum + v.total, 0)
}

export function getTotalClientes(): number {
  return clientes.length
}

export function getVentasPorCanal(): { canal: string; total: number; count: number }[] {
  const canalMap = new Map<string, { total: number; count: number }>()
  
  for (const venta of ventas) {
    const existing = canalMap.get(venta.canal) || { total: 0, count: 0 }
    canalMap.set(venta.canal, {
      total: existing.total + venta.total,
      count: existing.count + 1
    })
  }
  
  return Array.from(canalMap.entries()).map(([canal, data]) => ({
    canal,
    ...data
  }))
}

export function getVentasPorMes(): { mes: string; total: number }[] {
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
  const mesMap = new Map<number, number>()
  
  for (const venta of ventas) {
    const mesIndex = new Date(venta.fecha).getMonth()
    const existing = mesMap.get(mesIndex) || 0
    mesMap.set(mesIndex, existing + venta.total)
  }
  
  return Array.from(mesMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([mesIndex, total]) => ({
      mes: meses[mesIndex],
      total
    }))
}

export function getClientesPorSegmento(): { segmento: string; count: number }[] {
  const segmentoMap = new Map<string, number>()
  
  for (const cliente of clientes) {
    const existing = segmentoMap.get(cliente.segmento) || 0
    segmentoMap.set(cliente.segmento, existing + 1)
  }
  
  return Array.from(segmentoMap.entries()).map(([segmento, count]) => ({
    segmento,
    count
  }))
}

export function getVentasRecientes(): (Venta & { cliente_nombre: string })[] {
  return ventas
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 5)
    .map(venta => {
      const cliente = clientes.find(c => c.cliente_id === venta.cliente_id)
      return {
        ...venta,
        cliente_nombre: cliente?.nombre || "Cliente Desconocido"
      }
    })
}
```

</details>

> **IMPORTANT 👇**: The file should be named `index.jsx`, not `index.js` as demonstrated in the video. This change is necessary because we've added SVG components in the constants file.

<details>
<summary><code>constants/index.jsx</code></summary>

```jsx
import { Linkedin, Github, MessageCircle, Globe } from "lucide-react";

export const features = [
  {
    id: "0",
    icon: "/images/feature-1.png",
    caption: "Fácil de usar",
    title: "Todos pueden ayudar",
    text: "RoboTap es un robot de madera diseñado como punto de recolección de tapitas ubicado en el Edificio 2 de la UNPHU. Solo debes depositarlas dentro y cada tapita se convierte en apoyo para pacientes de quimioterapia.",
    button: {
      icon: "/images/magictouch.svg",
      title: "Cómo aportar",
      to: "Impacto", 
    },
  },
  {
    id: "1",
    icon: "/images/feature-2.png",
    caption: "Impacto transparente",
    title: "Cada tapita cuenta",
    text: "Las tapitas recolectadas se entregan a organizaciones que las reciclan y utilizan los fondos para apoyar importantes tratamientos de quimioterapia, llevando ayuda a quienes más la necesitan. Pequeñas acciones, grandes cambios.",
    button: {
      icon: "/images/docs.svg",
      title: "Saber más",
      to: "Preguntas Frecuentes", 
    },
  },
];


export const details = [
  {
    id: "0",
    icon: "/images/detail-1.png",
    title: "Recolección sencilla",
  },
  {
    id: "1",
    icon: "/images/detail-2.png",
    title: "Diseño amigable",
  },
  {
    id: "2",
    icon: "/images/detail-3.png",
    title: "Causa solidaria",
  },
  {
    id: "3",
    icon: "/images/detail-4.png",
    title: "Impacto real",
  },
];


export const faq = [
  {
    id: "0",
    question: "¿Qué es RoboTap?",
    answer:
      "RoboTap es una iniciativa comunitaria que recolecta tapitas plásticas para apoyar tratamientos de quimioterapia y promover el reciclaje responsable.",
  },
  {
    id: "1",
    question: "¿Cómo puedo ayudar?",
    answer:
      "Puedes ayudar recolectando tapitas, llevándolas a nuestros puntos de recolección, compartiendo el proyecto en redes sociales o uniéndote como voluntario.",
  },
  {
    id: "2",
    question: "¿Dónde puedo llevar las tapitas?",
    answer:
      "Contamos con puntos físicos de recolección, incluyendo centros educativos y aliados comunitarios. Puedes ver la ubicación exacta en la sección de impacto.",
  },
  {
    id: "3",
    question: "¿A quién se entregan las tapitas recolectadas?",
    answer:
      "Las tapitas se entregan a fundaciones aliadas que las transforman en fondos destinados directamente a tratamientos de quimioterapia.",
  },
  {
    id: "4",
    question: "¿El proyecto es transparente?",
    answer:
      "Sí. Trabajamos con organizaciones verificadas y compartimos el impacto del proyecto a través de nuestras redes y canales oficiales.",
  },
  {
    id: "5",
    question: "¿Puedo ser voluntario?",
    answer:
      "Claro que sí. Cualquier persona puede unirse como voluntario, sin importar la edad o experiencia previa.",
  },
  {
    id: "6",
    question: "¿RoboTap está en un lugar físico?",
    answer:
      "Sí, RoboTap cuenta con un punto físico dentro de la UNPHU para facilitar la recolección.",
  },
  {
    id: "7",
    question: "¿Tienen redes sociales oficiales?",
    answer:
      "Sí. Puedes seguirnos en Instagram para ver actualizaciones, entregas y el impacto real del proyecto.",
  },
  {
    id: "8",
    question: "¿Qué tipo de tapitas se pueden donar?",
    answer:
      "Aceptamos tapitas plásticas limpias de botellas de agua, refrescos, jugos y productos similares.",
  },
  {
    id: "9",
    question: "¿Puedo colaborar como institución o empresa?",
    answer:
      "Sí. Instituciones educativas, empresas y comunidades pueden convertirse en aliados y crear nuevos puntos de recolección basados en nuestro modelo.",
  },
  {
  id: "10",
  question: "¿Cómo nació el proyecto RoboTap?",
  answer:
    "El proyecto nació como una iniciativa académica en la materia de Administración de Proyectos, por idea del director de carrera Héctor Santillán, con el objetivo de generar impacto social real desde la universidad.",
},
{
  id: "11",
  question: "¿Quiénes participan en el proyecto?",
  answer:
    "RoboTap es desarrollado por estudiantes universitarios y la docente Yorka Perez que nos oriento para maximizar el impacto y desarrollo del proyecto.",
},

];

export const plans = [
  {
    id: "0",
    title: "Tapitas Recolectadas",
    caption: "Cada tapita suma",
    buttonText: "Punto de recolección",
    buttonLink: "https://maps.app.goo.gl/1EfBtZ2N27vh17mF6",
    features: [
      "Ayuda directa a pacientes con quimioterapia",
      "Recolección en puntos comunitarios",
      "Material 100% reciclable",
      "Impacto ambiental positivo",
    ],
    icon: "/images/circle.svg",
    logo: "/images/plan-1.png",
  },
  {
    id: "1",
    title: "Organizaciones Aliadas",
    caption: "Junto a fundaciones",
    buttonText: "Síguenos y comparte",
    buttonLink: "https://www.instagram.com/tapitasxquimio/",
    features: [
      "Entrega transparente de tapitas",
      "Reciclaje responsable",
      "Fondos destinados a quimioterapia",
      "Colaboración certificada y verificada",
    ],
    icon: "/images/triangle.svg",
    logo: "/images/plan-2.png",
  },
  {
  id: "2",
  title: "Apoyo Académico",
  caption: "Comunidad educativa",
  buttonText: "Conoce la escuela",
  buttonLink: "https://www.instagram.com/unphu_tic/",
  features: [
    "Proyecto desarrollado en el entorno educativo",
    "Participación de estudiantes y docentes",
    "Innovación social",
    "Aprendizaje con impacto real",
  ],
  icon: "/images/hexagon.svg",
  logo: "/images/plan-3.png",
}
];

export const joinMessages = [
  {
    id: "0",
    message:
      "Cada tapita recolectada representa esperanza para quienes luchan contra el cáncer.",
  },
  {
    id: "1",
    message:
      "No necesitas grandes recursos para ayudar, solo ganas de aportar.",
  },
  {
    id: "2",
    message:
      "Únete a una comunidad que cree en el impacto de las pequeñas acciones.",
  },
  {
    id: "3",
    message:
      "Tu participación puede cambiar vidas y cuidar el planeta al mismo tiempo.",
  },
  {
    id: "4",
    message:
      "Ser voluntario es más que ayudar, es formar parte del cambio.",
  },
  {
    id: "5",
    message:
      "Juntos transformamos reciclaje en oportunidades de vida.",
  },
];

export const logos = [
  {
    id: "0",
    title: "Logo Unphu Informática",
    url: "/images/logos/logoInformatica.png",
    width: 156,
    height: 48,
  },
  {
    id: "1",
    title: "Tapitas x Quimio",
    url: "/images/logos/tapitasxquimio.png",
    width: 194,
    height: 48,
  },
  {
    id: "2",
    title: "UNPHU",
    url: "/images/logos/UNPHU.webp",
    width: 115,
    height: 48,
  },
];

export const Windows = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.674 2.64859L29.4077 0.0307338C30.3171 -0.165605 31.1678 0.603406 31.1678 1.63418V12.7273C31.1678 13.6272 30.5078 14.3635 29.7011 14.3635H17.9674C17.1607 14.3635 16.5006 13.6272 16.5006 12.7273V4.25204C16.5006 3.46669 16.9846 2.79585 17.674 2.64859Z"
        fill="#EAEDFF"
      />
      <path
        d="M17.674 29.3507L29.4077 31.9686C30.3171 32.1649 31.1678 31.3959 31.1678 30.3651V19.272C31.1678 18.3721 30.5078 17.6358 29.7011 17.6358H17.9674C17.1607 17.6358 16.5006 18.3721 16.5006 19.272V27.7473C16.5006 28.5326 16.9846 29.2035 17.674 29.3507Z"
        fill="#EAEDFF"
      />
      <path
        d="M11.7925 3.82676L2.99217 5.90466C2.31748 6.06827 1.8335 6.73912 1.8335 7.50811V12.7275C1.8335 13.6273 2.49352 14.3636 3.30021 14.3636H12.1005C12.9072 14.3636 13.5672 13.6273 13.5672 12.7275V5.41383C13.5672 4.38305 12.7018 3.5977 11.7925 3.82676Z"
        fill="#EAEDFF"
      />
      <path
        d="M2.99217 26.0948L11.7925 28.1727C12.7018 28.4018 13.5672 27.6164 13.5672 26.5856V19.272C13.5672 18.3721 12.9072 17.6358 12.1005 17.6358H3.30021C2.49352 17.6358 1.8335 18.3721 1.8335 19.272V24.4913C1.8335 25.2603 2.31748 25.9312 2.99217 26.0948Z"
        fill="#EAEDFF"
      />
    </svg>
  );
};

export const MapPin = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22C12 22 19 15.6863 19 10.5C19 6.35786 15.866 3 12 3C8.13401 3 5 6.35786 5 10.5C5 15.6863 12 22 12 22Z"
        stroke="#EAEDFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10.5"
        r="2.5"
        stroke="#EAEDFF"
        strokeWidth="1.8"
      />
    </svg>
  );
};

export const Web = () => {
  return (
    <svg
      width="33"
      height="32"
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5484 0.847986C11.8284 2.95995 11.3164 5.15192 10.9164 7.34388C14.6285 6.92789 18.3727 6.92789 22.0848 7.34388C21.6848 5.15192 21.1728 2.97595 20.4528 0.847986C20.4307 0.759613 20.4238 0.686493 20.4164 0.607564C20.4131 0.572174 20.4097 0.535616 20.4048 0.495992C19.1567 0.191997 17.8447 0 16.5006 0C15.1405 0 13.8445 0.191997 12.5804 0.495992C12.5741 0.546895 12.5728 0.592737 12.5715 0.637543C12.5696 0.7054 12.5677 0.770896 12.5484 0.847986Z"
        fill="#EAEDFF"
      />
      <path
        d="M24.8211 7.67982C26.8852 8.03181 28.9172 8.52781 30.9333 9.1358C29.3493 5.82385 26.6771 3.15189 23.365 1.56792C23.989 3.56789 24.485 5.61585 24.8211 7.67982Z"
        fill="#EAEDFF"
      />
      <path
        d="M9.54034 30.2556C9.51633 30.2556 9.48833 30.2636 9.46033 30.2716C9.43233 30.2796 9.40433 30.2876 9.38033 30.2876C6.27619 28.7517 3.74809 26.2077 2.19602 23.1037C2.19602 23.0797 2.20402 23.0517 2.21202 23.0237C2.22002 22.9957 2.22802 22.9677 2.22802 22.9437C4.1801 23.5197 6.19619 23.9517 8.19628 24.2877C8.54829 26.3037 8.96431 28.3037 9.54034 30.2556Z"
        fill="#EAEDFF"
      />
      <path
        d="M30.8053 23.1197C29.2213 26.3037 26.5811 28.8797 23.365 30.4316C23.973 28.3997 24.485 26.3517 24.8211 24.2877C26.8372 23.9517 28.8212 23.5197 30.7733 22.9437C30.7637 22.9823 30.7772 23.0208 30.7896 23.0558C30.7977 23.079 30.8053 23.1006 30.8053 23.1197Z"
        fill="#EAEDFF"
      />
      <path
        d="M9.54041 1.74401C8.96438 3.69598 8.54836 5.67994 8.21235 7.69591C6.14826 8.01591 4.10017 8.5279 2.06808 9.13589C3.62015 5.91994 6.19626 3.27998 9.3804 1.69601C9.4044 1.69601 9.4324 1.70801 9.4604 1.72001C9.4884 1.73201 9.51641 1.74401 9.54041 1.74401Z"
        fill="#EAEDFF"
      />
      <path
        d="M7.84432 21.5836C5.63622 21.1836 3.46013 20.6716 1.34804 19.9516C1.27094 19.9324 1.20545 19.9305 1.13759 19.9286C1.09278 19.9273 1.04693 19.926 0.996021 19.9196C0.692008 18.6557 0.5 17.3597 0.5 15.9997C0.5 14.6557 0.692008 13.3437 0.996021 12.0958C1.03565 12.0908 1.07221 12.0874 1.1076 12.0841C1.18653 12.0767 1.25966 12.0699 1.34804 12.0478C3.47613 11.3438 5.63622 10.8158 7.84432 10.4158C7.4443 14.1277 7.4443 17.8717 7.84432 21.5836Z"
        fill="#EAEDFF"
      />
      <path
        d="M32.005 19.9196C32.309 18.6557 32.501 17.3597 32.501 15.9997C32.501 14.6557 32.309 13.3597 32.005 12.0958C31.877 12.0958 31.781 12.0798 31.653 12.0478C29.5409 11.3278 27.3488 10.8158 25.1567 10.4158C25.5727 14.1277 25.5727 17.8717 25.1567 21.5836C27.3488 21.1836 29.5249 20.6556 31.653 19.9516C31.7301 19.9324 31.7956 19.9305 31.8635 19.9286C31.9083 19.9273 31.9541 19.926 32.005 19.9196Z"
        fill="#EAEDFF"
      />
      <path
        d="M22.0848 24.6554C21.6848 26.8633 21.1728 29.0393 20.4528 31.1513C20.4307 31.2396 20.4238 31.3128 20.4164 31.3917C20.4131 31.4271 20.4097 31.4636 20.4048 31.5033C19.1567 31.8073 17.8447 31.9993 16.5006 31.9993C15.1405 31.9993 13.8445 31.8073 12.5804 31.5033C12.5741 31.4524 12.5728 31.4065 12.5715 31.3617C12.5696 31.2939 12.5677 31.2284 12.5484 31.1513C11.8444 29.0233 11.3164 26.8633 10.9164 24.6554C12.7724 24.8634 14.6285 25.0074 16.5006 25.0074C18.3727 25.0074 20.2448 24.8634 22.0848 24.6554Z"
        fill="#EAEDFF"
      />
      <path
        d="M10.4793 22.0209C14.4812 22.5258 18.5205 22.5258 22.5224 22.0209C23.0274 18.0192 23.0274 13.9802 22.5224 9.97847C18.5205 9.47358 14.4812 9.47358 10.4793 9.97847C9.97434 13.9802 9.97434 18.0192 10.4793 22.0209Z"
        fill="#EAEDFF"
      />
    </svg>
  );
};

export const Instagram = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 2H17C20.3137 2 23 4.68629 23 8V16C23 19.3137 20.3137 22 17 22H7C3.68629 22 1 19.3137 1 16V8C1 4.68629 3.68629 2 7 2Z"
        stroke="#EAEDFF"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="#EAEDFF"
        strokeWidth="2"
      />
      <circle
        cx="17.5"
        cy="6.5"
        r="1.5"
        fill="#EAEDFF"
      />
    </svg>
  );
};


export const links = [
  {
    id: "0",
    title: "Instagram Tapitas x Quimio",
    icon: <Instagram />,
    url: "https://www.instagram.com/tapitasxquimio/",
  },
  {
    id: "1",
    title: "Instagram Escuela de Informática",
    icon: <Instagram />,
    url: "https://www.instagram.com/unphu_tic/",
  },
  {
    id: "2",
    title: "Ubicación RoboTap UNPHU",
    icon: <MapPin/>,
    url: "https://maps.app.goo.gl/1EfBtZ2N27vh17mF6",
  },
  {
    id: "3",
    title: "Web de la UNPHU",
    icon: <Web />,
    url: "https://unphu.edu.do/",
  },
];

export const socials = [
  {
    id: "0",
    title: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/angel-emilio-aquino/",
  },
  {
    id: "1",
    title: "GitHub",
    icon: Github,
    url: "https://github.com/AngelEmilioAquino",
  },
  {
    id: "2",
    title: "WhatsApp",
    icon: MessageCircle,
    url: "https://wa.me/18094038309?text=Hola%20Angel%20Me%20gustaría%20hablar%20sobre%20un%20proyecto.",
  },
  {
    id: "3",
    title: "Portfolio",
    icon: Globe,
    url: "https://angelaquino.vercel.app/",
  },
];
```

</details>

<details>
<summary><code>Marker.jsx</code></summary>

```jsx
const Marker = ({ fill }) => {
  return (
    <svg
      width="8"
      height="22"
      viewBox="0 0 8 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 0H0.5V4V18V22H2.5V16.25L7.63991 11.7526C8.09524 11.3542 8.09524 10.6458 7.63991 10.2474L2.5 5.75V0Z"
        fill={fill || '#2EF2FF'}
      />
    </svg>
  );
};

export default Marker;

```
