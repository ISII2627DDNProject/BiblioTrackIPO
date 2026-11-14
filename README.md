# 📚 BiblioTrack — Prototipo Interactivo

Prototipo web *mobile-first* de una plataforma de gestión bibliotecaria, compra y alquiler de libros, subastas de ediciones coleccionista e identificación rápida de ejemplares mediante etiquetas **NFC / códigos QR**. Desarrollado como práctica para la asignatura **Interacción Persona-Ordenador (IPO)**.

## 🛠️ Stack Tecnológico

* **Estructura:** HTML5 semántico.
* **Estilos y diseño responsivo:** Tailwind CSS (vía CDN) + Font Awesome 6.
* **Lógica e interactividad:** JavaScript puro (Vanilla JS).
* **Persistencia de datos:** `localStorage` del navegador (favoritos, historial de lectura, autores seguidos, perfil de usuario y ajustes de accesibilidad).

## 📱 Pantallas y Funcionalidades Implementadas

* **`login.html`:** Pantalla de acceso y autenticación con redirección al flujo principal.
* **`inicio.html`:**
  * Buscador global en tiempo real (insensible a mayúsculas y tildes) por título, autor o género.
  * Barra superior de filtros interactivos sincronizados: **Favoritos**, **Historial**, **Pedidos** y **Seguidos**.
  * Carruseles horizontales con soporte táctil y arrastre con ratón.
* **`autores.html` y `autor.html`:**
  * Listado general con buscador, ordenación dinámica (popularidad / alfabético) y botón de seguimiento.
  * Plantilla de perfil de autor reutilizable mediante parámetros de URL (`autor.html?id=...`).
* **`libro.html`:**
  * Vista de detalle dinámica (`libro.html?id=...`) con portada, sinopsis, ficha técnica, valoraciones y reseñas.
  * Microinteracción en el botón de favoritos y registro automático en el historial reciente.
* **`populares.html`:** Catálogo completo filtrable en tiempo real y ordenable por popularidad, orden alfabético o menor precio.
* **`perfil.html` y `accesibilidad.js`:**
  * Gestión de datos del usuario, estadísticas en vivo y modal de pedidos/alquileres activos.
  * Módulo global de accesibilidad aplicable a toda la app: **Texto grande (A+)**, **Alto contraste** y configuración de **Escaneo NFC rápido**.

## 📂 Estructura del Proyecto

    bibliotrack/
    ├── img/                  # Portadas de libros, fotos de autores y banners
    ├── accesibilidad.js      # Módulo global de ajustes visuales (Texto A+ y Alto Contraste)
    ├── login.html            # Inicio de sesión
    ├── inicio.html           # Pantalla principal y buscador global
    ├── autores.html          # Directorio completo de autores
    ├── autor.html            # Plantilla dinámica de detalle de autor (?id=...)
    ├── libro.html            # Plantilla dinámica de detalle de libro (?id=...)
    ├── populares.html        # Catálogo completo y ordenación
    ├── perfil.html           # Perfil de usuario, pedidos y accesibilidad
    └── README.md             # Documentación del proyecto

## 🚀 Cómo ejecutarlo en local o en línea

1. **En local:** Clona el repositorio y abre `login.html` o `inicio.html` directamente en cualquier navegador moderno (no requiere servidor ni instalación de dependencias).
2. **En línea (GitHub Pages):**
   * Ve a **Settings > Pages** dentro de este repositorio.
   * En *Branch*, selecciona `main` (carpeta `/root`) y guarda los cambios.
   * GitHub generará una URL pública para probar el prototipo directamente desde el móvil o compartirlo en la evaluación.

## 🗺️ Próximos Pasos (Roadmap)

- [ ] **`escaner.html`:** Simulación de lectura de etiquetas NFC y códigos QR para ficha rápida y devolución de préstamos.
- [ ] **`carrito.html`:** Flujo completo de cesta de compra y alquiler con cálculo de importes y confirmación de pedido.
- [ ] **`subastas.html`:** Sala de pujas en tiempo real para ediciones especiales y libros descatalogados.
- [ ] Conexión de los botones de acción de `libro.html` (*Añadir al carrito*, *Alquilar* y *Añadir reseña*).

## 👥 Equipo de Desarrollo

* **Integrante 1:** [Daniel Tébar Fernández]
* **Integrante 2:** [David Ortega Carrasco]
* **Integrante 3:** [Néstor Martí Serrano]