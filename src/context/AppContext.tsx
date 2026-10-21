import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, OrderStatus, PageRoute, PaymentMethod } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, DEMO_USERS } from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation
  currentRoute: PageRoute;
  routeParams: Record<string, string>;
  navigate: (route: PageRoute, params?: Record<string, string>) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotalItems: number;

  // Auth & User
  currentUser: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (fullName: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  quickLoginAs: (role: 'customer' | 'admin') => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    city: string;
    postalCode: string;
    notes?: string;
    shippingMethod: string;
    shippingCost: number;
    paymentMethod: PaymentMethod;
  }) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Toast
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Route state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Products state (persisted)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bioliving_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state (persisted)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bioliving_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Current user (persisted)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('bioliving_current_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // Users registry (persisted)
  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('bioliving_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEMO_USERS;
  });

  // Orders (persisted)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('bioliving_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Toast
  const [toast, setToast] = useState<Toast | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bioliving_products', JSON.stringify(products));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('bioliving_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bioliving_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bioliving_current_user');
      }
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('bioliving_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('bioliving_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [orders]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3500);
  };

  const navigate = (route: PageRoute, params: Record<string, string> = {}) => {
    setCurrentRoute(route);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = (product: Product, quantity = 1): boolean => {
    if (product.stock <= 0) {
      showToast('Mohon maaf, stok produk ini sedang habis.', 'error');
      return false;
    }

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    const currentQtyInCart = existingIndex >= 0 ? cart[existingIndex].quantity : 0;
    const requestedQty = currentQtyInCart + quantity;

    if (requestedQty > product.stock) {
      showToast(`Jumlah melebihi stok tersedia (${product.stock} unit).`, 'error');
      return false;
    }

    if (existingIndex >= 0) {
      const updated = [...cart];
      updated[existingIndex].quantity = requestedQty;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity }]);
    }

    showToast(`Berhasil menambahkan "${product.name}" ke keranjang.`, 'success');
    return true;
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const targetProduct = products.find((p) => p.id === productId);
    if (!targetProduct) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > targetProduct.stock) {
      showToast(`Jumlah maksimum sesuai stok adalah ${targetProduct.stock} unit.`, 'info');
      quantity = targetProduct.stock;
    }

    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Produk dihapus dari keranjang belanja.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Auth
  const login = (email: string, password: string): { success: boolean; error?: string } => {
    if (!email || !password) {
      return { success: false, error: 'Email dan kata sandi wajib diisi.' };
    }
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return { success: false, error: 'Akun dengan email ini tidak ditemukan.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Kata sandi minimal 6 karakter.' };
    }

    setCurrentUser(foundUser);
    showToast(`Selamat datang kembali, ${foundUser.fullName}!`, 'success');
    return { success: true };
  };

  const register = (
    fullName: string,
    email: string,
    password: string
  ): { success: boolean; error?: string } => {
    if (!fullName || !email || !password) {
      return { success: false, error: 'Semua kolom pendaftaran wajib diisi.' };
    }
    const cleanEmail = email.trim().toLowerCase();
    if (registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Email ini sudah terdaftar. Silakan masuk.' };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setRegisteredUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Pendaftaran berhasil! Selamat datang di BioLiving, ${newUser.fullName}.`, 'success');
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah keluar dari akun.', 'info');
    if (currentRoute === 'account' || currentRoute === 'admin') {
      navigate('home');
    }
  };

  const quickLoginAs = (role: 'customer' | 'admin') => {
    const target = DEMO_USERS.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
      showToast(`Masuk sebagai ${target.fullName} (${role === 'admin' ? 'Admin SUDP' : 'Customer'})`, 'success');
      if (role === 'admin') {
        navigate('admin');
      } else {
        navigate('account');
      }
    }
  };

  // Orders
  const createOrder = (orderData: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    city: string;
    postalCode: string;
    notes?: string;
    shippingMethod: string;
    shippingCost: number;
    paymentMethod: PaymentMethod;
  }): Order | null => {
    if (cart.length === 0) {
      showToast('Keranjang belanja kosong. Silakan pilih produk terlebih dahulu.', 'error');
      return null;
    }

    // Verify stock availability
    for (const item of cart) {
      const p = products.find((prod) => prod.id === item.product.id);
      if (!p || p.stock < item.quantity) {
        showToast(`Stok untuk ${item.product.name} tidak mencukupi.`, 'error');
        return null;
      }
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderRef = `BIO-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderReference: orderRef,
      userId: currentUser?.id,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      shippingAddress: orderData.shippingAddress,
      city: orderData.city,
      postalCode: orderData.postalCode,
      notes: orderData.notes,
      shippingMethod: orderData.shippingMethod,
      paymentMethod: orderData.paymentMethod,
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.image,
        category: c.product.category
      })),
      subtotal: cartSubtotal,
      shippingCost: orderData.shippingCost,
      total: cartSubtotal + orderData.shippingCost,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date().toLocaleString('id-ID', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    // Deduct stock from products
    setProducts((prev) =>
      prev.map((p) => {
        const inCart = cart.find((c) => c.product.id === p.id);
        if (inCart) {
          const newStock = Math.max(0, p.stock - inCart.quantity);
          return {
            ...p,
            stock: newStock,
            availability: newStock === 0 ? 'Habis' : newStock <= 10 ? 'Stok Menipis' : 'Tersedia'
          };
        }
        return p;
      })
    );

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart
    clearCart();

    showToast(`Pesanan ${orderRef} berhasil dibuat!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Status pesanan diperbarui menjadi: ${status}`, 'success');
  };

  // Product Management (Admin)
  const addProduct = (productInput: Omit<Product, 'id' | 'slug'>) => {
    const slug = productInput.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const newProd: Product = {
      ...productInput,
      id: `prod-${Date.now()}`,
      slug
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Produk "${newProd.name}" berhasil ditambahkan ke katalog.`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Produk "${updated.name}" berhasil diperbarui.`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Also remove from cart if present
    setCart((prev) => prev.filter((c) => c.product.id !== id));
    showToast('Produk berhasil dihapus dari katalog.', 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('bioliving_products');
    showToast('Katalog produk direset kembali ke data bawaan prototipe.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigate,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartTotalItems,
        currentUser,
        login,
        register,
        logout,
        quickLoginAs,
        orders,
        createOrder,
        updateOrderStatus,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
