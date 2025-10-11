export interface Drink {
  id: number;
  src: string;
  name: string;
  description: string;
  ingredients: string[];
  category: string;
  price?: string;
}

export const drinks: Drink[] = [
  {
    id: 1,
    src: "/bebidas/01.jpg",
    name: "Aquariano",
    description: "Coquetel sofisticado com dupla de gins e toque floral de violeta",
    ingredients: ["Gin Beg Tropical", "Gin London Dry", "Limão", "Triple Sec", "Xarope de violeta"],
    category: "Signature"
  },
  {
    id: 2,
    src: "/bebidas/02.jpg",
    name: "Tropical 43",
    description: "Coquetel tropical com licor espanhol, maracujá e espumante",
    ingredients: ["Licor 43", "Maracujá", "Espumante Brut", "Grenadine"],
    category: "Signature"
  },
  {
    id: 3,
    src: "/bebidas/03.jpg",
    name: "Hanami",
    description: "Coquetel japonês sofisticado com vodka premium e sabores orientais",
    ingredients: ["Vodka Haku", "Purê de Yuzu", "Missô", "Bitter de Laranja", "Flor de Sabugueiro"],
    category: "Signature"
  },
  {
    id: 4,
    src: "/images/bebida4.png",
    name: "Rio Breeze",
    description: "Refrescante com caju, limão siciliano e água tônica premium",
    ingredients: ["Vodka premium", "Caju", "Limão siciliano", "Água tônica", "Manjericão"],
    category: "Refrescantes"
  },
  {
    id: 5,
    src: "/images/bebida5.png",
    name: "Samba Night",
    description: "Vibrante com frutas vermelhas, prosecco e hibisco",
    ingredients: ["Prosecco", "Frutas vermelhas", "Hibisco", "Mel", "Champagne"],
    category: "Espumantes"
  },
  {
    id: 6,
    src: "/bebidas/06.jpg",
    name: "Batuque",
    description: "Coquetel robusto com whisky bourbon, brandy e notas de pera",
    ingredients: ["Whisky Bourbon", "Brandy Jerez", "Fireball", "Purê de Pera", "Limão", "Mel"],
    category: "Signature"
  },
  {
    id: 7,
    src: "/bebidas/07.jpg",
    name: "Iça Manauara",
    description: "Coquetel amazônico com ingredientes regionais e espuma de açaí",
    ingredients: ["Cachaça de Jambu", "Maracujá", "Amora", "Elixir de Pixuri", "Espuma de Açaí"],
    category: "Signature"
  },
  {
    id: 8,
    src: "/bebidas/08.jpg",
    name: "Jabuti",
    description: "Gin refrescante com jabuticaba e notas cítricas",
    ingredients: ["Gin", "Jabuticaba", "Limão Siciliano", "Bitter Cítrico"],
    category: "Signature"
  },
  {
    id: 9,
    src: "/bebidas/09.jpg",
    name: "Renascentista",
    description: "Coquetel sofisticado com bourbon e frutas vermelhas",
    ingredients: ["Makers Mark", "Limão", "Amora", "Licor de Cassis", "Angostura"],
    category: "Signature"
  },
  {
    id: 10,
    src: "/images/bebida10.png",
    name: "Ouro Preto",
    description: "Drink dourado com rapadura, cachaça mineira e especiarias",
    ingredients: ["Cachaça mineira", "Rapadura", "Canela", "Gengibre", "Limão"],
    category: "Tradicionais"
  },
  {
    id: 11,
    src: "/bebidas/11.jpg",
    name: "Jangadinha",
    description: "Coquetel refrescante com rum especiado e notas cítricas",
    ingredients: ["Spiced Rum", "Gengibre", "Hortelã", "Limão", "Bitter de laranja"],
    category: "Signature"
  },
  {
    id: 12,
    src: "/images/bebida12.png",
    name: "Sunset Beach",
    description: "Perfeito para o final do dia com frutas cítricas e champagne",
    ingredients: ["Champagne", "Frutas cítricas", "Elderflower", "Pétalas de rosa", "Gelo seco"],
    category: "Sofisticados"
  },
  {
    id: 13,
    src: "/images/bebida13.jpg",
    name: "Urban Jungle",
    description: "Moderno e urbano com botanicals e gin premium",
    ingredients: ["Gin premium", "Botanicals urbanos", "Tônica artesanal", "Especiarias", "Garnish"],
    category: "Modernos"
  },
  {
    id: 14,
    src: "/images/bebida14.jpg",
    name: "Cabruca",
    description: "GIN BEG, campari, vermute rosso, suco de laranja e água com gás. Refrescante e amargo",
    ingredients: ["Gin Beefeater", "Campari", "Vermute rosso", "Suco de laranja", "Água com gás"],
    category: "Signature"
  }
];

export const barImages = [
  {
    id: 1,
    src: "/images/bar3.jpg",
    alt: "Vista panorâmica do ambiente",
    title: "Ambiente Sofisticado"
  },
  {
    id: 2,
    src: "/images/bar1.jpg", 
    alt: "Balcão principal com iluminação ambiente",
    title: "Balcão Central"
  },
  {
    id: 3,
    src: "/images/bar2.jpg",
    alt: "Área lounge com arte brasileira",
    title: "Espaço Lounge"
  },
  {
    id: 4,
    src: "/images/bar4.jpg",
    alt: "Galeria de arte com obras locais",
    title: "Galeria de Arte"
  }
];

export const categories = [
  "Todos",
  "Clássicos", 
  "Tropicais",
  "Autorais",
  "Refrescantes",
  "Espumantes",
  "Premium",
  "Signature"
]; 