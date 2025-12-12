/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066cc',
          dark: '#0052a3',
          light: '#3399ff',
        },
        secondary: {
          DEFAULT: '#00ccff',
        },
        accent: {
          DEFAULT: '#ff6600',
        },
        bg: {
          DEFAULT: '#ffffff',
          secondary: '#f8fafc',
          dark: '#0f172a',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          light: '#94a3b8',
        },
        border: {
          DEFAULT: '#e2e8f0',
        }
      },
      fontFamily: {
        primary: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      spacing: {
        'section': '100px',
        'section-mobile': '60px',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 30px rgba(0, 102, 204, 0.3)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '300ms',
        'slow': '500ms',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #0066cc 0%, #00ccff 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0052a3 0%, #0066cc 50%, #00ccff 100%)',
      },
    },
  },
  plugins: [],
}
