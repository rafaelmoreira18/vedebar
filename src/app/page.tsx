import { getMenuItems } from '@/lib/sanity.queries'
import { transformMenuItem } from '@/lib/imageHelpers'
import ClientPage from './page.client'

// Enable ISR - Revalidate every 60 seconds
export const revalidate = 60

// Optional: Generate static params at build time
export const dynamic = 'force-static'

export default async function Page() {
  // Fetch menu items from Sanity CMS
  const sanityMenuItems = await getMenuItems(true)

  // Transform Sanity data to match existing component interface
  const drinks = sanityMenuItems.map((item, index) =>
    transformMenuItem(
      {
        name: item.name,
        description: item.description,
        image: item.image,
        order: item.order,
        _id: item._id,
      },
      index
    )
  )

  // Fallback to hardcoded data if Sanity returns empty (for development/migration)
  const fallbackDrinks = [
    {
      id: 1,
      name: 'Aquariano',
      description: 'gin beg tropical . gin london dry . limão . triple sec . xarope de violeta',
      image: '/bebidas/01.jpg',
    },
    {
      id: 2,
      name: 'Tropical 43',
      description: 'Licor 43 . Maracuja . Espumante Brut . Grenadine',
      image: '/bebidas/02.jpg',
    },
    {
      id: 3,
      name: 'Hanami',
      description: 'Vodka Haku . Purê de Yuzu . Missô . Bitter de Laranja . Flor de Sabugueiro',
      image: '/bebidas/03.jpg',
    },
    {
      id: 6,
      name: 'Batuque',
      description: 'Whisky Burbon . Brandy Jerez . Fireball . Purê de Pera . Limão . Mel',
      image: '/bebidas/06.jpg',
    },
    {
      id: 7,
      name: 'Iça Manauara',
      description: 'Cachaça de Jambu . Maracujá . Amora . Elixir de Pixuri . Espuma de Açaí',
      image: '/bebidas/07.jpg',
    },
    {
      id: 8,
      name: 'Jabuti',
      description: 'Gin . Jabuticaba . Limão Siciliano . Bitter Citrico',
      image: '/bebidas/08.jpg',
    },
    {
      id: 9,
      name: 'Renascentista',
      description: 'Makers Mark . Limão . Amora . Licor de Cassis . Angostura',
      image: '/bebidas/09.jpg',
    },
    {
      id: 10,
      name: 'Jangadinha',
      description: 'Spiced Rum . Gengibre . Hortelã . Limão . Bitter de laranja',
      image: '/bebidas/11.jpg',
    },
  ]

  const finalDrinks = drinks.length > 0 ? drinks : fallbackDrinks

  return <ClientPage initialDrinks={finalDrinks} />
}
