export type ProductCategory = 
  | 'Shopping Bags'
  | 'Pouches and Handbags'
  | 'Accessories'
  | 'Home Decor';

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: ProductCategory;
  price: number; // in IDR
  stock: number;
  image: string;
  availability: 'Tersedia' | 'Stok Menipis' | 'Habis' | 'Pre-Order';
  materialInfo: string;
  specs: {
    material: string;
    intendedUse: string;
    shelfLifeEstimate?: string;
    dimensions?: string;
  };
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export type OrderStatus = 
  | 'Menunggu Konfirmasi'
  | 'Diproses'
  | 'Dikirim'
  | 'Selesai'
  | 'Dibatalkan';

export type PaymentMethod = 
  | 'Cash on Delivery (Simulasi)'
  | 'Transfer Bank Manual (Simulasi)';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  orderReference: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  postalCode: string;
  notes?: string;
  shippingMethod: string;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

export interface EducationArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: {
    intro: string;
    sections: Array<{
      heading: string;
      body: string[];
    }>;
    keyTakeaways: string[];
    references: string[];
  };
}

export type PageRoute = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'learn'
  | 'article-detail'
  | 'about'
  | 'contact'
  | 'login'
  | 'register'
  | 'account'
  | 'admin';
