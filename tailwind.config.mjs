/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-mode="noche"]'],
  theme: {
    extend: {
      colors: {
        cine: {
          dark: '#07090E',
          surface: '#0D121F',
          card: '#121826',
          border: 'rgba(255, 255, 255, 0.08)',
          cyan: '#00F5A0',
          blue: '#3D5AFE',
          violet: '#8B5CF6',
          amber: '#FFB300',
          red: '#FF4565'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'beam': 'beam 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'flare': 'flare 10s ease-in-out infinite alternate'
      },
      keyframes: {
        beam: {
          '0%, 100%': { transform: 'translateX(-20%)', opacity: 0.3 },
          '50%': { transform: 'translateX(20%)', opacity: 0.7 }
        },
        pulseSubtle: {
          '0%': { transform: 'scale(0.8)', opacity: 0.8 },
          '100%': { transform: 'scale(1.5)', opacity: 0 }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        flare: {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: 0.4 },
          '100%': { transform: 'scale(1.15) rotate(5deg)', opacity: 0.7 }
        }
      }
    },
  },
  plugins: [],
};
