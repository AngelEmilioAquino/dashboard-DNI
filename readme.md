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


Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/AngelEmilioAquino/RoboTap.git
cd robotap
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```jsx
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        p1: '#2EF2FF',
        p2: '#3C52D9',
        p3: '#C8EA80',
        p4: '#EAEDFF',
        p5: '#C4CBF5',
        s1: '#080D27',
        s2: '#0C1838',
        s3: '#334679',
        s4: '#1959AD',
        s5: '#263466',
        black: {
          DEFAULT: '#000000',
          100: '#05091D',
        },
      },
      boxShadow: {
        100: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 16px 24px rgba(0, 0, 0, 0.25), inset 0px 3px 6px #1959AD',
        200: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 16px 24px rgba(0, 0, 0, 0.25), inset 0px 4px 10px #3391FF',
        300: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 16px 24px rgba(0, 0, 0, 0.25), inset 0px 3px 6px #1959AD',
        400: 'inset 0px 2px 4px 0 rgba(255, 255, 255, 0.05)',
        500: '0px 16px 24px rgba(0, 0, 0, 0.25), 0px -14px 48px rgba(40, 51, 111, 0.7)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      transitionProperty: {
        borderColor: 'border-color',
      },
      spacing: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '3/20': '15%',
        '7/20': '35%',
        '9/20': '45%',
        '11/20': '55%',
        '13/20': '65%',
        '15/20': '75%',
        '17/20': '85%',
        '19/20': '95%',
        22: '88px',
        100: '100px',
        512: '512px',
        330: '330px',
        388: '388px',
        400: '400px',
        440: '440px',
        640: '640px',
        960: '960px',
        1230: '1230px',
      },
      zIndex: {
        1: '1',
        2: '2',
        4: '4',
      },
      lineHeight: {
        12: '48px',
      },
      borderRadius: {
        14: '14px',
        20: '20px',
        40: '40px',
        half: '50%',
        '7xl': '40px',
      },
      flex: {
        50: '0 0 50%',
        320: '1px 0 320px',
        300: '0 0 300px',
        540: '0 0 540px',
        280: '0 0 280px',
        256: '0 0 256px',
        100: '0 0 100%',
      },
    },
  },
  plugins: [],
};
```

</details>

<details>
<summary><code>index.css</code></summary>

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    @apply bg-s1;
  }

  body {
    @apply font-poppins text-[16px] tracking-[-0.03em] text-p5;
  }

  a {
    @apply no-underline;
  }

  img {
    @apply block max-w-full;
  }

  button {
    @apply bg-none tracking-[-0.03em];
  }

  input {
    @apply tracking-[-0.03em];
  }
}

@layer utilities {
  /* START of Typography */
  .h-num {
    @apply font-inter text-[72px] font-bold leading-[84px];
  }

  .h1 {
    @apply text-[84px] font-black leading-[84px] tracking-[-0.03em];
  }

  .h2 {
    @apply text-[64px] font-black leading-[64px];
  }

  .h3 {
    @apply text-[48px] font-semibold leading-[56px] tracking-[-0.02em];
  }

  .h4 {
    @apply text-[40px] font-semibold leading-[52px];
  }

  .h5 {
    @apply text-[32px] font-semibold leading-[40px];
  }

  .h6 {
    @apply text-[24px] font-medium leading-[36px];
  }

  .body-1 {
    @apply text-[22px] leading-[36px];
  }

  .body-2 {
    @apply text-[18px] font-semibold leading-[32px];
  }

  .body-3 {
    @apply text-[16px] leading-[28px] tracking-[0.02em];
  }

  .base {
    @apply text-[16px] font-medium leading-[24px] tracking-[0.03em];
  }

  .base-bold {
    @apply text-[16px] font-bold leading-[24px];
  }

  .base-small {
    @apply text-[14px] font-semibold leading-[18px] tracking-[0.03em];
  }

  .small-1 {
    @apply text-[14px] font-semibold leading-[18px] tracking-[0.03em];
  }

  .small-2 {
    @apply text-[12px] font-bold leading-[16px] tracking-[0.3em];
  }

  .small-compact {
    @apply text-[12px] font-semibold leading-[18px] tracking-[0.03em];
  }

  /* END of Typography */
  /* START of Gradients */
  .g1 {
    background: linear-gradient(rgba(196, 203, 245, 0.5), transparent);
  }

  .g2 {
    background: linear-gradient(#3062a3, #19549f);
  }

  .g3 {
    background: linear-gradient(#3c52d9, #0c1838);
  }

  .g4 {
    background: linear-gradient(#253575, #162561);
  }

  .g5 {
    background: linear-gradient(#334679, #162561);
  }

  .g6 {
    background: linear-gradient(#334679, #0c1838);
  }

  .g7 {
    background: linear-gradient(#1b275a, #0e1434);
  }

  .g8 {
    background: linear-gradient(to right, transparent, #2ef2ff, transparent);
  }

  .g9 {
    background: linear-gradient(#080d27, transparent);
  }

  /* END of Gradients */
  /* START of Common */
  .container {
    @apply mx-auto max-w-[1252px] px-16 max-xl:px-10 max-lg:px-6 max-sm:px-4;
  }

  .caption {
    @apply small-2 mb-5 uppercase text-p3;
  }

  .scroll-hide::-webkit-scrollbar {
    display: none;
  }

  .scroll-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  /* END of Common */
  /* START of Header */
  .nav-active {
    @apply text-p3;
  }

  .nav-li {
    @apply relative flex flex-1 items-center justify-between max-lg:flex-col max-lg:items-start;
  }

  .nav-logo {
    @apply relative flex flex-1 items-center justify-center;
  }

  .dot {
    @apply size-1.5 rounded-full bg-p2 max-lg:hidden;
  }

  .sidebar-before {
    @apply max-lg:before:absolute max-lg:before:-right-64 max-lg:before:top-2/5 max-lg:before:h-[440px] max-lg:before:w-[252px] max-lg:before:bg-s4 max-lg:before:blur-[200px] max-lg:before:content-[''];
  }

  /* END of Header */
  /* START of Hero */
  .hero-img_res {
    @apply max-lg:-top-40 max-lg:left-[calc(50%-280px)] max-lg:w-[1160px] max-md:bottom-[-590px] max-md:left-[calc(50%-390px)] max-md:top-auto;
  }

  /* END of Hero */
  /*START of Custom Button*/
  .inner-before {
    @apply before:g7 before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500 before:content-[''];
  }

  .glow-before {
    @apply before:g8 before:absolute before:left-2/5 before:top-0 before:z-4 before:h-0.5 before:w-3/5 before:opacity-0 before:transition-all before:duration-500 before:content-[''] group-hover:before:left-4 group-hover:before:opacity-40;
  }

  .glow-after {
    @apply after:g8 after:absolute after:bottom-0 after:left-4 after:z-4 after:h-0.5 after:w-7/20 after:opacity-0 after:transition-all after:duration-500 after:content-[''] group-hover:after:left-3/5 group-hover:after:opacity-40;
  }

  /*END of Custom Button*/
  /* START of Feature */
  .feature-after {
    @apply after:g1 after:absolute after:right-0 after:top-0 after:h-full after:w-1/2 after:mix-blend-soft-light after:content-[''] max-md:after:hidden;
  }

  /* END of Feature */
  /* START of Pricing */
  .pricing-head_before {
    @apply before:absolute before:-bottom-44 before:left-1/5 before:h-96 before:w-13/20 before:bg-s4/50 before:blur-[200px] before:content-[''];
  }

  .pricing-head_btn {
    @apply base-bold relative z-2 h-16 flex-1 uppercase text-p5 transition-colors duration-500 hover:text-p4;
  }

  .pricing-head_btn_before {
    @apply before:absolute before:-top-16 before:left-9 before:right-9 before:bg-s4 before:blur-xl before:content-[""];
  }

  .pricing-bg {
    @apply pointer-events-none absolute -bottom-16 left-[calc(50%-480px)] z-2 mx-auto w-960;
  }

  .pricing-plan_first {
    @apply first:rounded-bl-3xl first:rounded-tl-3xl lg:first:border-r-0;
  }

  .pricing-plan_last {
    @apply last:rounded-br-3xl last:rounded-tr-3xl lg:last:border-l-0;
  }

  .pricing-plan_odd {
    @apply odd:border-s3 odd:bg-s1 lg:odd:mt-12;
  }

  .pricing-plan_even {
    @apply even:g7 even:rounded-bl-3xl even:rounded-br-3xl even:rounded-tl-3xl even:rounded-tr-3xl even:border-s4;
  }

  /* END of Pricing */
  /* START of FAQ */
  .faq-line_after {
    @apply after:absolute after:-top-1.5 after:left-[calc(50%-5px)] after:z-4 after:size-2.5 after:rounded-half after:border-2 after:border-s2 after:bg-s1 after:content-[''];
  }

  .faq-glow_before {
    @apply before:absolute before:left-[calc(50%-160px)] before:top-[-160px] before:size-[320px] before:bg-s4/25 before:mix-blend-soft-light before:blur-[200px] before:content-[''];
  }

  .faq-icon {
    @apply before:absolute before:h-0.5 before:w-3 before:bg-p3 before:content-[''] after:absolute after:h-0.5 after:w-3 after:rotate-90 after:bg-p3 after:transition-all after:duration-500 after:content-[''];
  }

  /* END of FAQ */
  /* START of Testimonials */
  .testimonials_head-res {
    @apply max-2xl:mr-6 max-xl:mr-3 max-lg:mx-auto max-lg:mb-36 max-lg:max-w-330 max-lg:text-center max-md:mb-24 max-md:max-w-52;
  }

  .testimonials_inner-before {
    @apply before:pointer-events-none before:absolute before:-top-28 before:left-[calc(50%-1px)] before:h-[calc(100%+218px)] before:w-0.5 before:bg-s2 before:content-[''] before:max-lg:top-0 before:max-lg:h-full before:max-md:hidden;
  }

  .testimonials_inner-after {
    @apply after:pointer-events-none after:absolute after:-bottom-52 after:left-[calc(50%-1px)] after:h-24 after:w-0.5 after:bg-s5 after:content-[''] after:max-lg:-bottom-24 after:max-md:hidden;
  }

  .testimonials_group-after {
    @apply after:pointer-events-none after:absolute after:-bottom-[212px] after:left-[calc(50%-5px)] after:z-2 after:size-2.5 after:rounded-half after:border-2 after:border-s5 after:bg-s1 after:content-[''] max-lg:after:-bottom-[102px] max-md:after:hidden;
  }

  /* END of Testimonials */
  /*  START of Download*/
  .download_tech-link_last-before {
    @apply last:relative last:before:pointer-events-none last:before:absolute last:before:left-full last:before:top-[calc(50%-1px)] last:before:mr-6 last:before:h-0.5 last:before:w-[140px] last:before:bg-s5 last:before:content-[''] last:before:max-xl:w-[105px] last:before:max-lg:w-[80px] last:before:max-md:hidden;
  }

  .download_tech-link_last-after {
    @apply last:after:pointer-events-none last:after:absolute last:after:left-[223px] last:after:top-[calc(50%-5px)] last:after:z-2 last:after:size-2.5 last:after:rounded-half last:after:border-2 last:after:border-s5 last:after:bg-s1 last:after:content-[''] last:after:max-xl:left-[187px] last:after:max-lg:left-[163px] last:after:max-md:hidden;
  }

  .download_tech-icon {
    @apply relative z-2 flex size-full items-center justify-center transition-all duration-500;
  }

  .download_tech-icon_before {
    @apply before:absolute before:inset-1.5 before:rounded-half before:bg-s2 before:content-[''] hover:border-s4;
  }

  .download_tech-link:hover .download_tech-icon svg path {
    @apply fill-p1;
  }

  .download_preview-before {
    @apply before:g8 before:absolute before:-top-0.5 before:right-6 before:h-0.5 before:w-[63.2%] before:opacity-40 before:content-[''];
  }

  .download_preview-after {
    @apply after:g8 after:absolute after:-bottom-0.5 after:left-6 after:h-0.5 after:w-[42.2%] after:opacity-40 after:content-[''];
  }

  .download_preview-dot {
    @apply absolute top-6 size-2.5 rounded-half;
  }

  /*  END of Download*/
  /*  START of Footer */
  .legal-after {
    @apply after:absolute after:-right-5 after:top-[calc(50%-1px)] after:h-0.5 after:w-0.5 after:rounded-half after:bg-p2 after:content-[''];
  }

  .social-icon {
    @apply flex size-10 items-center justify-center rounded-full border-2 border-s4/25 bg-s1/5 transition-all duration-500 hover:border-s4;
  }

  /*  END of Footer*/
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
