/**
 * @file src/lib/templates.ts
 * @description Master list of templates available in the SaaS platform.
 * Digunakan sebagai Single Source of Truth untuk Admin Dashboard dan Routing.
 */

export const AVAILABLE_TEMPLATES = [
  { id: 'classic-elegant', name: 'Classic Elegant' },
  { id: 'modern-minimal', name: 'Modern Minimalist' },
  { id: 'rustic-boho', name: 'Rustic Boho' },
  { id: 'magazine-theme', name: 'Magazine Concept' },
  { id: 'cream-rabbit', name: 'Cream Rabbit' },
  { id: 'avant-garde-gallery', name: 'Avant Garde Gallery' },
  { id: 'modern-monarchy', name: 'Modern Monarchy' },
  { id: 'golden-floral-template', name: 'Golden Floral' },
  { id: 'royal-gold', name: 'Royal Gold' },
  { id: 'neon-vogue', name: 'Neon Vogue (Luxury Midnight)' },
] as const

export type TemplateId = typeof AVAILABLE_TEMPLATES[number]['id']
