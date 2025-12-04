import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item (Bebida)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome da Bebida',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      description: 'Nome do drink (ex: Aquariano, Tropical 43)',
    }),
    defineField({
      name: 'description',
      title: 'Descrição / Ingredientes',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(500),
      description: 'Lista de ingredientes separados por ponto (ex: gin beg tropical . limão . triple sec)',
    }),
    defineField({
      name: 'image',
      title: 'Imagem da Bebida',
      type: 'image',
      options: {
        hotspot: true, // Permite recorte e foco da imagem
      },
      validation: (Rule) => Rule.required(),
      description: 'Faça upload da foto da bebida (formato recomendado: quadrado, mínimo 800x800px)',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1).max(8),
      description: 'Posição no cardápio (1-8). Cada bebida deve ter uma ordem única.',
      initialValue: 1,
    }),
    defineField({
      name: 'active',
      title: 'Ativo no Cardápio',
      type: 'boolean',
      description: 'Desmarque para ocultar temporariamente do cardápio',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      image: 'image',
      order: 'order',
      active: 'active',
    },
    prepare({ title, subtitle, image, order, active }) {
      return {
        title: `${order}. ${title}${!active ? ' (Inativo)' : ''}`,
        subtitle: subtitle?.substring(0, 80) + '...',
        media: image, // Mostra a imagem na preview
      }
    },
  },
  orderings: [
    {
      title: 'Ordem de Exibição',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nome',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
