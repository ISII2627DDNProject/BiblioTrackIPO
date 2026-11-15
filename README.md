# 📚 BiblioTrack — Prototipo Interactivo

Prototipo web *mobile-first* de una plataforma de gestión bibliotecaria, compra y alquiler de libros, subastas de ediciones coleccionista e identificación rápida de ejemplares mediante etiquetas **NFC / códigos QR**. Desarrollado como práctica para la asignatura **Interacción Persona-Ordenador (IPO)**.

## 🛠️ Stack Tecnológico

- **Estructura:** HTML5 semántico.
- **Estilos y diseño responsivo:** Tailwind CSS (vía CDN) + Font Awesome 6.
- **Lógica e interactividad:** JavaScript puro (Vanilla JS).
- **APIs Web y Persistencia:** `localStorage` del navegador (carrito, subastas, reseñas, pedidos, favoritos, historial, autores seguidos, perfil y accesibilidad), Web NFC (`NDEFReader`), `BarcodeDetector` (QR), `MediaDevices` (cámara), Web Audio API y Vibration API.

## 📱 Pantallas y Funcionalidades Implementadas

- **`login.html`:** Pantalla de acceso y autenticación con redirección al flujo principal.
- **`inicio.html`:**
  * Buscador global en tiempo real (insensible a mayúsculas y tildes) por título, autor o género.
  * Barra superior de filtros interactivos sincronizados: **Favoritos**, **Historial**, **Pedidos** y **Seguidos**.
  * Carruseles horizontales con soporte táctil y arrastre con ratón.
- **`autores.html` y `autor.html`:**
  * Listado general con buscador, ordenación dinámica (popularidad / alfabético) y botón de seguimiento.
  * Plantilla de perfil de autor reutilizable mediante parámetros de URL (`autor.html?id=...`).
- **`libro.html`:**
  * Vista de detalle dinámica (`libro.html?id=...`) con código de ejemplar (`BT-001` a `BT-009`), portada, sinopsis y ficha técnica.
  * **Alquiler por plazos:** selector desplegable de **7, 14 y 30 días** con tarifas diferenciadas por libro.
  * **Acciones conectadas al carrito:** añadir compra o alquiler con aviso visual de confirmación en la propia pantalla sin forzar redirección, además de compra directa y gestión de favoritos/historial.
  * **Sistema de reseñas interactivo:** formulario desplegable para valorar de **1 a 5 estrellas**, añadir título y opinión con persistencia en `localStorage` y recálculo automático de la nota media y el desglose.
- **`subastas.html`:**
  * Sala de pujas en vivo dividida en *Ediciones especiales* y *De lector a lector* aplicando agrupación **Gestalt** (máximo 2 tarjetas visibles por bloque por defecto para reducir la carga cognitiva).
  * Modal de puja interactivo con **codificación redundante** para daltonismo (*Subasta en curso*, temporizadores destacados), botones de incremento rápido y **feedback multimodal** (visual, sonoro y háptico) al pujar o ganar.
  * Publicación de nuevos libros en subasta y simulación de adjudicación conectada directamente al carrito.
- **`escaner.html`:**
  * Interfaz dual de lectura **NFC** (compatible con lectura en segundo plano en iOS mediante URL `?nfc=...` y lectura directa en Android con Web NFC) y cámara **QR**, más búsqueda manual por código o título.
  * **Feedback multimodal:** pantalla de confirmación (*Escaneo exitoso*) acompañada de señal sonora (Web Audio API) y vibración háptica (Vibration API).
- **`carrito.html`:**
  * Separación visual entre **Subastas ganadas** (pago obligatorio no eliminable con codificación redundante accesible para daltonismo) y **Elegidos por ti** (compras y alquileres opcionales con selector de plazo y eliminación).
  * Flujo completo de **Resumen de pago**, **Pantalla de pago** (Visa, PayPal y Apple Pay) y **Confirmación con envío de ticket** al correo.
- **`populares.html`:** Catálogo completo filtrable en tiempo real y ordenable por popularidad, orden alfabético o menor precio.
- **`perfil.html` y `accesibilidad.js`:**
  * Gestión de datos del usuario, estadísticas en vivo e historial dinámico de pedidos y alquileres sincronizado tras el pago.
  * Módulo global de accesibilidad aplicable a toda la app: **Texto grande (A+)**, **Alto contraste** y configuración de **Escaneo NFC rápido**.

## 📂 Estructura del Proyecto

    bibliotrack/
    ├── img/                  # Portadas de libros, fotos de autores y banners
    ├── accesibilidad.js      # Módulo global de ajustes visuales (Texto A+ y Alto Contraste)
    ├── login.html            # Inicio de sesión
    ├── inicio.html           # Pantalla principal y buscador global
    ├── autores.html          # Directorio completo de autores
    ├── autor.html            # Plantilla dinámica de detalle de autor (?id=...)
    ├── libro.html            # Detalle de libro, alquiler por plazos y reseñas (?id=...)
    ├── populares.html        # Catálogo completo y ordenación
    ├── subastas.html         # Sala de subastas en vivo, pujas y publicación
    ├── escaner.html          # Lector NFC / QR con feedback multimodal
    ├── carrito.html          # Carrito, pasarela de pago y ticket
    ├── perfil.html           # Perfil de usuario, pedidos y accesibilidad
    └── README.md             # Documentación del proyecto

## 🚀 Cómo ejecutarlo en local o en línea

1. **En local:** Clona el repositorio y abre `login.html` o `inicio.html` directamente en cualquier navegador moderno (no requiere servidor ni instalación de dependencias).
2. **En línea (GitHub Pages):**
   * Ve a **Settings > Pages** dentro de este repositorio.
   * En *Branch*, selecciona `main` (carpeta `/root`) y guarda los cambios.
   * GitHub generará una URL pública para probar el prototipo directamente desde el móvil o compartirlo en la evaluación.

## 👥 Equipo de Desarrollo

- **Integrante 1:** Daniel Tébar Fernández
- **Integrante 2:** David Ortega Carrasco
- **Integrante 3:** Néstor Martí Serrano