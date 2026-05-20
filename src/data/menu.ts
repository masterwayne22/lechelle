import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // Chef's Specials
  {
    id: 'spec-1',
    name: 'Heritage Osso Buco',
    description: '24-hour slow-braised veal shank, marrow-infused jus, saffron risotto Milanese, lemon-parsley gremolata.',
    price: 68,
    category: 'chef-specials',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    signature: true,
    tags: ['Signature', 'Heritage', 'Gluten-Free']
  },
  {
    id: 'spec-3',
    name: 'L\'Échelle Grand Cacao',
    description: '72% Single-origin chocolate sphere, warm salted butter caramel reduction, roasted cocoa nib infusion, edible 24k gold.',
    price: 24,
    category: 'chef-specials',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
    tags: ['Dessert', 'Award-Winning']
  },

  // Italian
  {
    id: 'ital-1',
    name: 'Linguine all\'Astice',
    description: 'Fresh blue lobster, crushed San Marzano datterini, aged pecorino, artisan hand-pulled pasta.',
    price: 48,
    category: 'italian',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    tags: ['Seafood', 'Handmade']
  },
  {
    id: 'ital-2',
    name: 'Risotto ai Porcini',
    description: 'Acquerello aged carnaroli rice, pan-roasted wild porcini mushrooms, 36-month Parmigiano Reggiano, micro-herbs.',
    price: 36,
    category: 'italian',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&auto=format&fit=crop&q=80',
    tags: ['Vegetarian', 'Gluten-Free']
  },

  // French
  {
    id: 'fren-1',
    name: 'Coq au Vin Tradition',
    description: 'Grand Burgundy red-wine braised poulet rouge, pearl onion glaze, crispy smoked farm pig lardons, silky pomme purée.',
    price: 44,
    category: 'french',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80',
    tags: ['Classic', 'Slow-Cooked']
  },
  {
    id: 'fren-2',
    name: 'Canard à l\'Orange',
    description: 'Crispy pan-seared duck breast, bitter Grand Marnier reduction, heirloom honey-glazed baby carrots, parsnip cloud.',
    price: 52,
    category: 'french',
    image: 'https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800&auto=format&fit=crop&q=80',
    tags: ['Heritage', 'Local Poultry']
  },
  {
    id: 'fren-3',
    name: 'Bouillabaisse Marseillaise',
    description: 'Traditional saffron-accented sea broth, red mullet, local monkfish, wild mussels, crispy croûte with spiced rouille.',
    price: 58,
    category: 'french',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
    tags: ['Seafood', 'Provencal']
  },
  {
    id: 'fren-4',
    name: 'Chef\'s Cut Faux-Filet',
    description: 'The Butcher\'s Selection — dry-aged black Angus ribeye with bone marrow jus, house Béarnaise, truffle hand-cut frites.',
    price: 75,
    category: 'french',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1000&auto=format&fit=crop&q=80',
    signature: true,
    tags: ['Direct From Lyon', 'Dry-Aged']
  },

  // Continental
  {
    id: 'cont-1',
    name: 'Viennese Veal',
    description: 'Delicately crisp milk-fed veal cutlet, mountain wild cranberries, warm Austrian kartoffelsalat (potato salad), fresh parsley.',
    price: 46,
    category: 'continental',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
    tags: ['Classic', 'Savoury']
  },
  {
    id: 'cont-3',
    name: 'Wild Sea Bass',
    description: 'Line-caught French sea bass, blistered heritage asparagus shoots, double-emulsified lemon-caper luxury beurre blanc, dill-pressed herb oil.',
    price: 49,
    category: 'continental',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80',
    tags: ['Seafood', 'Light']
  }
];
