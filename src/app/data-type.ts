export interface signUp {
    name: string,
    password: string,
    email: string
}

export interface login {
    password: string,
    email: string
}

export interface Seller {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface Product {
    id: string;
    sellerEmail: string;
    name: string;
    price: number;
    mrp: number;
    discountPercent?: number;
    rating?: number;
    ratingCount?: number;
    stock: number;
    color: string;
    category: string;
    description: string;
    url: string;
    quantity?: number;
}

export interface CartItem {
    id: string;
    productId: string;
    userId: string;
    name: string;
    price: number;
    mrp?: number;
    color: string;
    category: string;
    description: string;
    url: string;
    quantity: number;
}

export type OrderStatus = 'Placed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
    productId: string;
    name: string;
    url: string;
    price: number;
    quantity: number;
    color: string;
}

export interface Order {
    id: string;
    userId: string;
    email: string;
    address: string;
    contact: string;
    totalPrice: number;
    status: OrderStatus;
    items: OrderItem[];
    placedAt: string;
}
