import { groq } from 'next-sanity'
import { client, clientCDN } from './sanity.client'

// TypeScript interface for Sanity image
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

// TypeScript interface for menu items
export interface MenuItem {
  _id: string
  _createdAt: string
  _updatedAt: string
  name: string
  description: string
  image: SanityImage
  order: number
  active: boolean
}

// GROQ query to get all active menu items ordered by display order
const menuItemsQuery = groq`
  *[_type == "menuItem" && active == true] | order(order asc) {
    _id,
    _createdAt,
    _updatedAt,
    name,
    description,
    image,
    order,
    active
  }
`

// GROQ query to get a specific menu item by ID
const menuItemByIdQuery = groq`
  *[_type == "menuItem" && _id == $id][0] {
    _id,
    _createdAt,
    _updatedAt,
    name,
    description,
    image,
    order,
    active
  }
`

/**
 * Fetch all active menu items ordered by display order
 * @param useCDN - Whether to use CDN for faster cached responses
 * @returns Array of active menu items
 */
export async function getMenuItems(useCDN: boolean = true): Promise<MenuItem[]> {
  const sanityClient = useCDN ? clientCDN : client

  try {
    const items = await sanityClient.fetch<MenuItem[]>(menuItemsQuery, {}, {
      next: {
        revalidate: 60, // Revalidate every 60 seconds
        tags: ['menuItem'] // Tag for on-demand revalidation
      }
    })

    return items || []
  } catch (error) {
    console.error('Error fetching menu items from Sanity:', error)
    return []
  }
}

/**
 * Fetch a specific menu item by ID
 * @param id - Document ID
 * @returns Single menu item or null
 */
export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  try {
    const item = await client.fetch<MenuItem>(menuItemByIdQuery, { id })
    return item || null
  } catch (error) {
    console.error('Error fetching menu item by ID:', error)
    return null
  }
}

/**
 * Get the count of active menu items
 * @returns Number of active items
 */
export async function getActiveMenuItemCount(): Promise<number> {
  const countQuery = groq`count(*[_type == "menuItem" && active == true])`

  try {
    const count = await clientCDN.fetch<number>(countQuery)
    return count || 0
  } catch (error) {
    console.error('Error fetching menu item count:', error)
    return 0
  }
}
