export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'chef-specials' | 'italian' | 'french' | 'continental';
  image: string;
  tags?: string[];
  signature?: boolean;
}

export interface ReservationDetails {
  date: string;
  time: string;
  guests: number;
  phone: string;
  name: string;
  specialRequests: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customization?: string;
}

export type ViewTab = 'menu' | 'reservations' | 'ordering' | 'story';
