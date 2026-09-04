export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: string;
  requirements: string[];
  icon: string;
}

export interface CartItem {
  product: Service;
  quantity: number;
  customDetails?: {
    companyNames?: string;
    notes?: string;
  };
}

export interface BillingDetails {
  name: string;
  email: string;
  phone: string;
  companyNames?: string;
  notes?: string;
}

export interface Order {
  orderId: string;
  items: CartItem[];
  total: number;
  billing: BillingDetails;
  date: string;
  status: 'Processing' | 'Completed' | 'Cancelled';
}

export interface Testimonial {
  id: string;
  name: string;
  companyName?: string;
  rating: number;
  text: string;
  date: string;
  avatarInitials: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  message?: string;
  date: string;
}

export interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
  cart: CartItem[];
  addToCart: (product: Service, quantity: number, customDetails?: { companyNames?: string; notes?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'date'>) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'date'>) => void;
  placedOrders: Order[];
  placeOrder: (billing: BillingDetails) => { success: boolean; orderId: string };
}
