# Tailwind CSS Migration Guide

## Обзор

Проект "Цифровой Ветер" был успешно мигрирован с кастомного CSS на Tailwind CSS v3, сохранив 100% оригинального дизайна и функциональности.

## Структура проекта

```
webapp/
├── src/
│   └── input.css              # Исходный Tailwind CSS с кастомными компонентами
├── css/
│   ├── output.css             # Скомпилированный CSS (используется в HTML)
│   ├── style.css              # Старый CSS (сохранен для справки)
│   ├── catalog.css            # Старый CSS (сохранен для справки)
│   └── pages.css              # Старый CSS (сохранен для справки)
├── tailwind.config.js         # Конфигурация Tailwind
├── postcss.config.js          # Конфигурация PostCSS
└── package.json               # NPM зависимости и scripts
```

## Кастомная тема Tailwind

### Цвета

```javascript
colors: {
  primary: {
    DEFAULT: '#0066cc',
    dark: '#0052a3',
    light: '#3399ff',
  },
  secondary: '#00ccff',
  accent: '#ff6600',
  bg: {
    DEFAULT: '#ffffff',
    secondary: '#f8fafc',
    dark: '#0f172a',
  },
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    light: '#94a3b8',
  }
}
```

### Кастомные spacing values

- `section`: 100px - padding для секций
- `section-mobile`: 60px - padding для мобильных

### Кастомные breakpoints

Используются стандартные Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px (мобильное меню)
- `lg`: 1024px (адаптивные сетки)

### Градиенты

- `bg-gradient-accent`: linear-gradient(135deg, #0066cc 0%, #00ccff 100%)
- `bg-gradient-hero`: linear-gradient(135deg, #0052a3 0%, #0066cc 50%, #00ccff 100%)

## Кастомные компоненты в @layer

### Компоненты анимаций

```css
@layer components {
  .floating-element { /* Плавающие элементы в Hero */ }
  .fade-in-up { /* Fade in анимация */ }
  .scroll-animation { /* Скролл анимации */ }
  .pulse-glow { /* Пульсирующее свечение */ }
}
```

### Компоненты навигации

```css
.nav-link::after { /* Подчеркивание при hover */ }
.section-subtitle::after { /* Декоративная линия */ }
```

### Timeline компоненты

```css
.timeline::before { /* Вертикальная линия */ }
.timeline-item::before { /* Точки timeline */ }
```

### Prize card компоненты

```css
.prize-card.gold::before { /* Золотая верхняя граница */ }
.prize-card.silver::before { /* Серебряная верхняя граница */ }
.prize-card.bronze::before { /* Бронзовая верхняя граница */ }
```

## Mapping старых классов на Tailwind

### Container & Layout

| Старый класс | Tailwind классы |
|--------------|-----------------|
| `.container` | `max-w-container mx-auto px-5` |
| `.section` | `py-section md:py-section-mobile` |
| `.section__header` | `text-center mb-[60px] relative` |

### Кнопки

| Старый класс | Tailwind классы |
|--------------|-----------------|
| `.btn` | `inline-flex items-center gap-2.5 px-7 py-3 text-base font-semibold rounded-md transition-all duration-base cursor-pointer whitespace-nowrap` |
| `.btn-primary` | `bg-gradient-accent text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-glow` |
| `.btn-secondary` | `bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white` |
| `.btn-large` | `px-9 py-4 text-lg` |

### Typography

| Старый класс | Tailwind классы |
|--------------|-----------------|
| `.section__title` | `font-display text-[42px] font-bold text-text-primary mb-5 md:text-[32px]` |
| `.section__subtitle` | `inline-block text-sm font-semibold uppercase tracking-[2px] text-primary mb-3` |

## Работа с проектом

### Development workflow

1. Запустите watch режим:
```bash
npm run watch:css
```

2. Редактируйте HTML файлы - Tailwind автоматически пересоберет CSS при обнаружении новых классов

3. Для кастомных стилей редактируйте `src/input.css`

### Production build

```bash
npm run build:css
```

Tailwind автоматически удалит неиспользуемые стили, создав минимальный CSS файл.

## Важные замечания

### Сохранение оригинальных CSS файлов

Старые CSS файлы (`style.css`, `catalog.css`, `pages.css`) сохранены для:
- Справочной информации
- Сравнения с новой реализацией
- Возможного откат (если понадобится)

### Кастомные классы vs Utility

Некоторые сложные элементы (анимации, специальные эффекты) реализованы как кастомные компоненты в `@layer components`, потому что:
- Они слишком сложны для inline utilities
- Переиспользуются в нескольких местах
- Требуют keyframes анимаций

### Responsive дизайн

Все адаптивные стили мигрированы с использованием Tailwind breakpoint prefixes:
```html
<div class="grid grid-cols-3 md:grid-cols-1">
```

## Поддержка браузеров

Благодаря Autoprefixer, сайт поддерживает:
- Chrome/Edge (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- iOS Safari (последние 2 версии)
- Android Chrome (последние 2 версии)

## Производительность

### До миграции:
- style.css: ~29KB
- catalog.css: ~10KB
- pages.css: ~14KB
- **Всего: ~53KB**

### После миграции:
- output.css: ~varies based on used utilities
- **Оптимизировано PurgeCSS**

## Дальнейшее развитие

### Рекомендуемые улучшения:

1. **Минификация в production**
```bash
NODE_ENV=production npm run build:css
```

2. **Добавление темной темы**
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...
}
```

3. **Использование Tailwind plugins**
```javascript
plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),
]
```

## Контакты

При возникновении вопросов по миграции или работе с Tailwind CSS, обращайтесь к документации:
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Customization](https://tailwindcss.com/docs/configuration)
