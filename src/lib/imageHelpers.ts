import imageUrlBuilder from '@sanity/image-url'
import { SanityImage } from './sanity.queries'
import { client } from './sanity.client'

// Create image URL builder
const builder = imageUrlBuilder(client)

/**
 * Generate optimized URL from Sanity image asset
 * @param source - Sanity image object
 * @param width - Optional width for responsive images
 * @returns Optimized image URL
 */
export function urlForImage(source: SanityImage, width?: number) {
  const imageBuilder = builder.image(source)

  if (width) {
    return imageBuilder.width(width).url()
  }

  // Default: optimize for web with auto format
  return imageBuilder
    .auto('format')
    .fit('max')
    .url()
}

/**
 * Transform MenuItem from Sanity to include the image URL
 */
export interface MenuItemWithImage {
  id: number
  name: string
  description: string
  image: string
}

export function transformMenuItem(
  sanityItem: { name: string; description: string; image: SanityImage; order: number; _id: string },
  index: number
): MenuItemWithImage {
  return {
    id: sanityItem.order || index + 1,
    name: sanityItem.name,
    description: sanityItem.description,
    image: urlForImage(sanityItem.image, 800), // 800px width for drinks grid
  }
}
