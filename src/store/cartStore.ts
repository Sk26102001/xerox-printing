<<<<<<< HEAD
// src/store/cartStore.ts
import { create } from "zustand";
import { persist, PersistOptions, createJSONStorage } from "zustand/middleware";
import { 
  fetchCart, 
  saveCartToServer, 
  removeCartItemFromServer, 
  updateCartItemQuantityOnServer,
  clearCartOnServer
} from "../api/cartApi";
import { CartData } from "../types/cart";

interface CartState {
  cart: CartData | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  loadCart: () => Promise<void>;
  saveCart: (cartData: CartData) => Promise<CartData>;
  updateQuantity: (itemId: string, copies: number) => Promise<CartData>;
  removeItem: (itemId: string) => Promise<CartData>;
  clearCart: () => Promise<void>;
  getItemCount: () => number;
  getTotal: () => number;
  getPrintingCost: () => number;
  getGst: () => number;
}

type CartPersist = PersistOptions<CartState, Pick<CartState, 'cart'>>;
=======
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { PaperSize, PaperType, PrintColor, PrintSide, BindingType } from '@/lib/pricingData';

export interface CartItem {
  id: string;
  files: Array<{
    name: string;
    size: number;
    type: string;
    // you can store File only temporarily – better to upload to server and keep only URLs
  }>;
  pages: number;
  copies: number;
  paperSize: PaperSize;
  paperType: PaperType;
  printColor: PrintColor;
  printSide: PrintSide;
  bindingType: BindingType;
  lamination: 'none' | 'glossy' | 'matt' | 'velvate';
  instructions: string;
  // optional: calculated price snapshot
  calculatedPrice?: {
    pricePerPage: number;
    printingCost: number;
    bindingCost: number;
    gst: number;
    grandTotal: number;
  };
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
}
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
<<<<<<< HEAD
      cart: null,
      loading: false,
      error: null,

      loadCart: async () => {
        set({ loading: true, error: null });
        try {
          const cart = await fetchCart();
          set({ cart, loading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          console.error("Failed to load cart:", error);
        }
      },

      saveCart: async (cartData: CartData) => {
        set({ loading: true, error: null });
        try {
          const updatedCart = await saveCartToServer(cartData);
          set({ cart: updatedCart, loading: false });
          return updatedCart;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      updateQuantity: async (itemId: string, copies: number) => {
        set({ loading: true, error: null });
        try {
          const updatedCart = await updateCartItemQuantityOnServer(itemId, copies);
          set({ cart: updatedCart, loading: false });
          return updatedCart;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        set({ loading: true, error: null });
        try {
          const updatedCart = await removeCartItemFromServer(itemId);
          set({ cart: updatedCart, loading: false });
          return updatedCart;
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      clearCart: async () => {
        set({ loading: true, error: null });
        try {
          await clearCartOnServer();
          set({ cart: null, loading: false });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.error || error.message, 
            loading: false 
          });
          throw error;
        }
      },

      getItemCount: () => {
        const { cart } = get();
        return cart?.items?.length || 0;
      },

      getTotal: () => {
        const { cart } = get();
        return cart?.totals?.totalWithDelivery || 0;
      },

      getPrintingCost: () => {
        const { cart } = get();
        return cart?.totals?.printingCost || 0;
      },

      getGst: () => {
        const { cart } = get();
        return cart?.totals?.gst || 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }),
    } as CartPersist
=======
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: crypto.randomUUID(), // or Date.now().toString() + Math.random()
            },
          ],
        })),

      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((it) =>
            it.id === id ? { ...it, ...updates } : it
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((it) => it.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.length,

      subtotal: () => {
        // If you store calculatedPrice → sum it
        // Otherwise re-calculate using calculatePrice()
        return get().items.reduce((sum, item) => {
          // Option A: use stored price (recommended)
          if (item.calculatedPrice) return sum + item.calculatedPrice.grandTotal;
          
          // Option B: re-calculate on the fly (less performant but always fresh)
          // const price = calculatePrice({ pages: item.pages, copies: item.copies, ... });
          // return sum + price.grandTotal;
          
          return sum;
        }, 0);
      },
    }),
    {
      name: 'bookprinters-cart',               // key in localStorage
      storage: createJSONStorage(() => localStorage),
      // partialize: (state) => ({ items: state.items }), // if you want to save only items
    }
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
  )
);