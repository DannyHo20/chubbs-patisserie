export const site = {
  name: "Chubbs Pâtisserie",
  legalName: "Chubb’s Pastry Lab",
  tagline: "Where sweet meets chubby.",
  description:
    "Chubbs Pâtisserie is a small pastry lab in Petaling Jaya making layered cakes and tarts, for pickup and delivery. Order on WhatsApp.",
  established: 2026,
  location: "PJS 5, Petaling Jaya",
  fulfilment: "Online-based · pickup & delivery",
  whatsapp: {
    number: "60102192332",
    display: "+60 10-219 2332",
  },
  instagram: {
    handle: "@chubbs.pastrylab",
    url: "https://www.instagram.com/chubbs.pastrylab/",
  },
  linktree: "https://linktr.ee/chubbspastrylab",
} as const;

export function whatsappLink(message = "Hi Chubbs! I’d like to place an order.") {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
