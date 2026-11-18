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

    // Ocultar la barra de estado simulada (9:41, wifi y batería) en móviles reales (< 640px)
    // y mantenerla visible solo dentro del marco de teléfono en ordenador.
    function ajustarBarraEstadoMovil() {
        const esMovilReal = window.innerWidth < 640;
        document.querySelectorAll('.fa-battery-full').forEach(iconoBateria => {
            const barraEstado = iconoBateria.closest('.justify-between');
            if (barraEstado) {
                barraEstado.style.display = esMovilReal ? 'none' : '';
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ajustarBarraEstadoMovil);
    } else {
        ajustarBarraEstadoMovil();
    }
    window.addEventListener('resize', ajustarBarraEstadoMovil);

    
})();

// --- MÓDULO DE FEEDBACK MULTIMODAL (VISUAL + SONORO + HÁPTICO) ---
(function inicializarFeedbackMultimodal() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sacudidaHaptica {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-4px); }
            40% { transform: translateX(4px); }
            60% { transform: translateX(-3px); }
            80% { transform: translateX(3px); }
        }
        .efecto-vibracion-visual {
            animation: sacudidaHaptica 0.32s ease-in-out;
        }
    `;
    document.head.appendChild(style);

    window.dispararFeedbackMultimodal = function (tipo = 'exito') {
        // 1. Intentar vibración física (Android Chrome con interacción previa)
        let vibracionActiva = false;
        try {
            if ('vibrate' in navigator) {
                const patron = (tipo === 'victoria') ? [120, 60, 120, 60, 220] : [110, 50, 160];
                vibracionActiva = Boolean(navigator.vibrate(patron));
            }
        } catch (e) {
            vibracionActiva = false;
        }

        // 2. Respaldo háptico-visual (micro-sacudida de la interfaz para iOS y escritorio)
        const contenedor = document.querySelector('.mobile-container');
        if (contenedor) {
            contenedor.classList.remove('efecto-vibracion-visual');
            void contenedor.offsetWidth; // Reiniciar animación
            contenedor.classList.add('efecto-vibracion-visual');
        }

        // 3. Feedback sonoro (Web Audio API)
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                const ctx = new AudioCtx();
                if (ctx.state === 'suspended') ctx.resume();
                const notas = (tipo === 'victoria') ? [523.25, 659.25, 783.99, 1046.50] : [587.33, 880];
                notas.forEach((frec, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(frec, ctx.currentTime + i * 0.10);
                    gain.gain.setValueAtTime(0.16, ctx.currentTime + i * 0.10);
                    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.10 + 0.18);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(ctx.currentTime + i * 0.10);
                    osc.stop(ctx.currentTime + i * 0.10 + 0.19);
                });
            }
        } catch (e) {}

        // 4. Indicador breve de canales multimodales disparados
        if (contenedor) {
            let toast = document.getElementById('toast-multimodal-global');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'toast-multimodal-global';
                toast.className = 'fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg flex items-center space-x-2 transition-opacity duration-300 pointer-events-none';
                document.body.appendChild(toast);
            }
            const textoHaptico = vibracionActiva ? 'Háptico activo' : 'Háptico visual (iOS)';
            toast.innerHTML = `<i class="fa-solid fa-wave-square text-[#E5A996]"></i><span>Visual · Sonoro · ${textoHaptico}</span>`;
            toast.style.opacity = '1';
            clearTimeout(window._timerToastMultimodal);
            window._timerToastMultimodal = setTimeout(() => {
                toast.style.opacity = '0';
            }, 2400);
        }
    };
})();