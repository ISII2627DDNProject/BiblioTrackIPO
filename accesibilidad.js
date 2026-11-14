(function () {
    // 1. Inyectar reglas CSS globales de accesibilidad
    const estilo = document.createElement('style');
    estilo.id = 'bibliotrack-accesibilidad-css';
    estilo.textContent = `
        /* Escalado global de tipografía (afecta a todas las clases rem de Tailwind) */
        html.texto-grande {
            font-size: 18.5px;
        }

        /* Modo Alto Contraste global para todas las pantallas */
        html.alto-contraste body {
            background-color: #e5e7eb !important;
        }
        html.alto-contraste .mobile-container {
            border-color: #000000 !important;
        }
        html.alto-contraste .text-gray-400,
        html.alto-contraste .text-gray-500,
        html.alto-contraste .text-gray-600,
        html.alto-contraste .texto-secundario {
            color: #111827 !important;
        }
        html.alto-contraste .text-gray-700,
        html.alto-contraste .text-gray-800 {
            color: #000000 !important;
        }
        html.alto-contraste .border-gray-100,
        html.alto-contraste .border-gray-200,
        html.alto-contraste .border-gray-300,
        html.alto-contraste .tarjeta-perfil {
            border-color: #111827 !important;
            border-width: 1.5px !important;
        }
        html.alto-contraste .divide-gray-100 > :not([hidden]) ~ :not([hidden]) {
            border-color: #111827 !important;
        }
        html.alto-contraste .bg-gray-50,
        html.alto-contraste .bg-gray-100 {
            background-color: #f3f4f6 !important;
            border: 1.5px solid #111827 !important;
        }
        html.alto-contraste input::placeholder {
            color: #374151 !important;
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(estilo);

    // 2. Leer preferencias de localStorage y aplicarlas a <html>
    window.aplicarAccesibilidadGlobal = function () {
        const html = document.documentElement;
        const tamanoTexto = localStorage.getItem('bibliotrack_texto') || 'normal';
        const altoContraste = localStorage.getItem('bibliotrack_contraste') === 'true';

        html.classList.toggle('texto-grande', tamanoTexto === 'grande');
        html.classList.toggle('alto-contraste', altoContraste);
    };

    // Ejecutar inmediatamente al cargar el <head> para evitar parpadeos
    window.aplicarAccesibilidadGlobal();
})();