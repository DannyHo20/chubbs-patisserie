export type Category = "Cake" | "Tart";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  /** One-line flavour note shown on cards. */
  note: string;
  headline: string;
  description: string;
  /** Layers from top to bottom, as labelled on the brand's cross-section photos. */
  layers: string[];
  image: string;
  layersImage: string;
  gallery: string[];
  /** Price text exactly as it should be shown, e.g. "RM 128 · 6 inch". Leave undefined to show "Price on enquiry". */
  price?: string;
};

export const products: Product[] = [
  {
    slug: "matcha-jasmine-grape-cake",
    name: "Matcha Jasmine Grape Cake",
    category: "Cake",
    note: "Earthy matcha, jasmine cream, glazed green grapes",
    headline: "Matcha, jasmine & grape for the lovers of fresh flavours.",
    description:
      "A beautiful balance of earthy matcha, with each layer made to satisfy your craving.",
    layers: [
      "Glazed Green Grapes",
      "Matcha Whipped Ganache",
      "Jasmine Chantilly Cream",
      "Matcha Pastry Cream",
      "Matcha Chiffon Sponge",
      "Matcha Pudding",
      "Fresh Green Grapes",
    ],
    image: "/images/matcha-jasmine-grape-cake.jpg",
    layersImage: "/images/matcha-jasmine-grape-cake-layers.jpg",
    gallery: ["/images/matcha-cover.jpg"],
  },
  {
    slug: "black-forest-cake",
    name: "Black Forest Cake",
    category: "Cake",
    note: "Callebaut dark chocolate, glazed cherries, vanilla chantilly",
    headline: "Chocolate & cherry in perfect harmony.",
    description:
      "A classic combination of rich chocolate, sweet cherries and smooth cream in every bite.",
    layers: [
      "Callebaut Dark Chocolate",
      "Glazed Cherries",
      "Vanilla Chantilly",
      "Chocolate Whipped Ganache",
      "Cherry Compote",
      "Chocolate Chiffon",
      "Chocolate Pudding",
    ],
    image: "/images/black-forest-cake.jpg",
    layersImage: "/images/black-forest-cake-layers.jpg",
    gallery: ["/images/black-forest-cake-cover.jpg"],
  },
  {
    slug: "hojicha-cake",
    name: "Hojicha Cake",
    category: "Cake",
    note: "Roasted hojicha, white chantilly, crunchy feuilletine",
    headline: "Hojicha with layers of toasty goodness.",
    description:
      "Earthy hojicha, creamy layers and a delicate roasted aroma in every bite, finished with a crunchy base for added texture.",
    layers: [
      "White Chantilly",
      "Hojicha Whipped Ganache",
      "Hojicha Chiffon",
      "Hojicha Pastry Cream",
      "Hojicha Pudding",
      "Hojicha Feuilletine",
    ],
    image: "/images/hojicha-cake.jpg",
    layersImage: "/images/hojicha-cake-layers.jpg",
    gallery: [],
  },
  {
    slug: "dark-chocolate-cake",
    name: "Dark Chocolate Cake",
    category: "Cake",
    note: "Chocolate chiffon, pudding and feuilletine, all the way down",
    headline: "All chocolate, all the way.",
    description:
      "Made for true chocolate lovers, with every layer bringing its own touch of chocolatey goodness.",
    layers: [
      "Chocolate Whipped Ganache",
      "Chocolate Chiffon",
      "Chocolate Pastry Cream",
      "Chocolate Chantilly",
      "Chocolate Pudding",
      "Chocolate Feuilletine",
    ],
    image: "/images/dark-chocolate-cake.jpg",
    layersImage: "/images/dark-chocolate-cake-layers.jpg",
    gallery: [],
  },
  {
    slug: "tiramisu-tart",
    name: "Tiramisu Tart",
    category: "Tart",
    note: "Mascarpone ganache, coffee-soaked lady fingers",
    headline: "A little taste of Italy in every bite.",
    description:
      "Rich coffee notes meet smooth, creamy mascarpone for a lovely balance of bold flavours and delicate sweetness.",
    layers: [
      "Mascarpone Whipped Ganache",
      "Coffee-soaked Lady Finger Sponge",
      "Coffee Pastry Cream",
      "Chocolate Pâte Sucrée",
    ],
    image: "/images/tiramisu-tart.jpg",
    layersImage: "/images/tiramisu-tart-layers.jpg",
    gallery: [],
  },
  {
    slug: "black-forest-tart",
    name: "Black Forest Tart",
    category: "Tart",
    note: "Cherry mousse, vanilla chantilly, chocolate pâte sucrée",
    headline: "A timeless pairing of rich chocolate, cherries and cream.",
    description:
      "A refined take on the classic Black Forest, bringing together layers of indulgent flavours in every bite.",
    layers: [
      "Callebaut Chocolate Shavings",
      "Glazed Cherries",
      "Vanilla Chantilly",
      "Cherry Mousse",
      "Chocolate Pâte Sucrée",
      "Chocolate Almond Cream",
    ],
    image: "/images/black-forest-tart.jpg",
    layersImage: "/images/black-forest-tart-layers.jpg",
    gallery: ["/images/black-forest-tart-overhead.jpg"],
  },
  {
    slug: "pear-tart",
    name: "Pear Tart",
    category: "Tart",
    note: "Vanilla-soaked pears, almond cream, buttery pâte sucrée",
    headline: "Baked to golden perfection with a nutty finish.",
    description:
      "A buttery, crisp tart with tender pears and delicate almond cream in every bite.",
    layers: ["Pâte Sucrée (Sweet Tart)", "Soaked Pear & Vanilla Beans", "Almond Cream"],
    image: "/images/pear-almond-tart.jpg",
    layersImage: "/images/pear-almond-tart-layers.jpg",
    gallery: [],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function orderMessage(p: Product) {
  return `Hi Chubbs! I’d like to order the ${p.name}.`;
}
