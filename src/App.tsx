import { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AppContextType,
  CartItem,
  Service,
  Testimonial,
  Inquiry,
  BillingDetails,
  Order
} from './types';
import { SERVICES, TESTIMONIALS } from './data';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import ServicesPage from './components/Services';
import TestimonialsPage from './components/Testimonials';
import AboutContactPage from './components/AboutContact';
import ShoppingCart from './components/ShoppingCart';

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

export default function App() {
  // Theme State with Local Storage Load
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem("agile_theme");
    if (saved === "light" || saved === "dark") return saved;
    // Check user's system preference default if not explicitly saved
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem("agile_theme", theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Page Routing State
  const [activePage, setActivePage] = useState<string>(() => {
    return localStorage.getItem("agile_active_page") || "home";
  });

  // Cart State with Local Storage Load
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("agile_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Cart Drawer open/close state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Testimonials State with Local Storage Load
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem("agile_testimonials");
    return saved ? JSON.parse(saved) : TESTIMONIALS;
  });

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem("agile_inquiries");
    return saved ? JSON.parse(saved) : [];
  });

  // Orders State
  const [placedOrders, setPlacedOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("agile_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist states to Local Storage
  useEffect(() => {
    localStorage.setItem("agile_active_page", activePage);
  }, [activePage]);

  useEffect(() => {
    localStorage.setItem("agile_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("agile_testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem("agile_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem("agile_orders", JSON.stringify(placedOrders));
  }, [placedOrders]);

  // Cart Operations
  const addToCart = (product: Service, quantity: number, customDetails?: { companyNames?: string; notes?: string }) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx !== -1) {
        const updated = [...prev];
        const newQty = updated[existingIdx].quantity + quantity;
        if (newQty <= 0) {
          updated.splice(existingIdx, 1);
        } else {
          updated[existingIdx].quantity = newQty;
          if (customDetails) {
            updated[existingIdx].customDetails = {
              ...updated[existingIdx].customDetails,
              ...customDetails
            };
          }
        }
        return updated;
      } else {
        if (quantity <= 0) return prev;
        return [...prev, { product, quantity, customDetails }];
      }
    });
    // Open the cart drawer automatically to give instant visual feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.product.id !== productId);
      }
      return prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Testimonial Operation
  const addTestimonial = (testimonial: Omit<Testimonial, 'id' | 'date'>) => {
    const newTest: Testimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setTestimonials(prev => [newTest, ...prev]);
  };

  // Inquiry Operation
  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'date'>) => {
    const newInq: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toISOString()
    };
    setInquiries(prev => [newInq, ...prev]);
  };

  // Checkout Operation
  const placeOrder = (billing: BillingDetails) => {
    const orderRef = `AG-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const newOrder: Order = {
      orderId: orderRef,
      items: [...cart],
      total: subtotal,
      billing,
      date: new Date().toISOString(),
      status: "Processing"
    };

    setPlacedOrders(prev => [newOrder, ...prev]);
    // Clear cart after a successful transaction
    clearCart();

    return { success: true, orderId: orderRef };
  };

  // Router switcher mapping
  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "products":
        return <ServicesPage />;
      case "testimonials":
        return <TestimonialsPage />;
      case "about":
        return <AboutContactPage />;
      default:
        return <Home />;
    }
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        activePage,
        setActivePage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        testimonials,
        addTestimonial,
        inquiries,
        addInquiry,
        placedOrders,
        placeOrder
      }}
    >
      <div
        className={`min-h-screen flex flex-col justify-between font-sans antialiased transition-colors duration-300 ${
          theme === 'dark'
            ? 'bg-textured-dark text-slate-100 selection:bg-accent selection:text-[#050b14]'
            : 'bg-[#f8f9fa] text-gray-800 selection:bg-accent selection:text-[#050b14]'
        }`}
      >
        {/* Core Header Navigation */}
        <Header />

        {/* Dynamic Route View Stage with Key Transitions */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {renderActivePage()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Standard Footer Branding */}
        <Footer />

        {/* Global Slide-Over Shopping Cart Side Drawer */}
        <AnimatePresence>
          {isCartOpen && <ShoppingCart />}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}
