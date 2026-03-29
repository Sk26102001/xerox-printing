<<<<<<< HEAD






// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Loader2
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//   }>;
// }

// interface CartData {
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
// }

// // ✅ API with auth header
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   // ✅ Fetch cart on mount
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
//       console.log("Fetched cart:", response.data);
//       setCartData(response.data);
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Calculate price for a single item using the same pricing function as order page
//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   // ✅ Update quantity
//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     setIsUpdating(true);
//     try {
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
//       setCartData(response.data);
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Remove item
//   const removeItem = async (_id: string) => {
//     setIsUpdating(true);
//     try {
//       await API.delete(`/cart/item/${_id}`);
//       const response = await API.get('/cart');
//       const updatedCart = response.data;
      
//       if (updatedCart.items && updatedCart.items.length > 0) {
//         setCartData(updatedCart);
//         toast.success("Item removed");
//       } else {
//         setCartData(null);
//         toast.success("Item removed");
//       }
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       toast.error("Failed to remove item");
//       fetchCart();
//     } finally {
//       setIsUpdating(false);
//     }
//   };


// const handleCheckout = async () => {
//   try {
//     if (!cartData) {
//       toast.error("Cart is empty");
//       return;
//     }

//     const payload = {
//       items: cartData.items,
//       customer: cartData.customer,
//       deliveryType: cartData.deliveryType,
//       orderMode: cartData.orderMode,
//       totalAmount: calculatedTotals?.grandTotal || total // ✅ FIXED KEY
//     };

//     console.log("Creating order with payload:", payload);

//     const res = await API.post('/order/create-from-cart', payload);

//     const orderData = res.data;

//     console.log("Created Order:", orderData);

//     // ✅ FIX: correct structure
//     const order = orderData.order;

//     if (!order?._id) {
//       throw new Error("Order ID missing from response");
//     }

//     // ✅ Save for payment page
//     localStorage.setItem("pendingOrder", JSON.stringify({
//       orderId: order._id,
//       amount: order.totalAmount,
//       orderNumber: order.orderNumber
//     }));

//     navigate('/checkout', {
//       state: {
//         orderId: order._id,
//         amount: order.totalAmount,
//         orderNumber: order.orderNumber
//       }
//     });

//   } catch (error: any) {
//     console.error("Checkout failed:", error);
//     toast.error(error.response?.data?.message || "Checkout failed");
//   }
// };



//   // ✅ Clear entire cart
//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     setIsUpdating(true);
//     try {
//       await API.delete('/cart');
//       setCartData(null);
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       toast.error("Failed to clear cart");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Check if cart has items
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // ✅ Show empty state when no items
//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const total = cartData?.totals?.totalWithDelivery || 0;
//   const printingCost = cartData?.totals?.printingCost || 0;
//   const gst = cartData?.totals?.gst || 0;
//   const isBulk = cartData?.orderMode === 'bulk';
//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};

//   // Calculate totals using actual pricing function
//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });
=======
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useLocation } from "react-router-dom";
// import { useCartStore } from '@/store/cartStore';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, IndianRupee,
//   Shield, Truck, CheckCircle, Printer, AlertCircle,Package 
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface CartItem {
//   id: number;
//   title: string;
//   specs: string;           // e.g., "A4 • 70gsm • Double • Perfect Binding"
//   pages: number;
//   copies: number;
//   unitPrice: number;
//   image?: string;
// }

// export default function Cart() {

// const location = useLocation();
// const orderData = location.state;

// const {
//   item = [],
//   orderMode = "single",
//   itemPrices = [],
//   totalPrintingCost = 0,
//   totalGst = 0,
//   totalWithDelivery = 0,
//   deliveryType = "pickup",
//   paperTypeLabels = {},
//   bindingLabels = {}
// } = orderData || {};

//   const [items, setItems] = useState<CartItem[]>([
//     {
//       id: 1,
//       title: "Black & White Novel / Thesis Print",
//       specs: "A4 • 70gsm Normal • Double Sided • Perfect Glue Binding",
//       pages: 200,
//       copies: 3,
//       unitPrice: 480,
//       // image: "/images/book-bw-placeholder.jpg", // Replace with real asset
//     },
//     {
//       id: 2,
//       title: "Color Textbook with Laminated Cover",
//       specs: "6×9 inch • 80gsm Maplitho • Color Cover + B&W Interior • Hard Binding",
//       pages: 160,
//       copies: 2,
//       unitPrice: 1250,
//       // image: "/images/book-color-placeholder.jpg",
//     },
//   ]);

//   const updateQuantity = (id: number, newQty: number) => {
//     if (newQty < 1) return;
//     setItems(prev =>
//       prev.map(item =>
//         item.id === id ? { ...item, copies: newQty } : item
//       )
//     );
//   };

//   const removeItem = (id: number) => {
//     setItems(prev => prev.filter(item => item.id !== id));
//   };

//   const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.copies, 0);
//   const gst = subtotal * 0.05;
//   const shipping = subtotal > 2000 ? 0 : 150; // Free shipping over ₹2000 example
//   const grandTotal = subtotal + gst + shipping;
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

<<<<<<< HEAD
//       {/* Header Section */}
//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
=======
//       {/* Header */}
//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
//               backgroundSize: '20px 20px',
//             }}
//           />
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5 text-primary " />
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
//             </p>
//           </div>
//         </div>
//       </section>

<<<<<<< HEAD
//       {/* Main Content */}
//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             {/* LEFT - Items List */}
//             <div className="lg:col-span-8 space-y-6">
              
//               {/* Customer & Delivery Info Card */}
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
//                   <Package className="h-5 w-5 text-primary" />
//                   Customer & Delivery Details
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && customer.address && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Order Items */}
//               {cartData?.items && cartData.items.length > 0 && cartData.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div
//                     key={item._id}
//                     className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       {/* Thumbnail/Icon */}
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             disabled={isUpdating}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors disabled:opacity-50"
//                             aria-label="Remove item"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {/* Uploaded files list */}
//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={isUpdating || item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               disabled={isUpdating}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page • ₹{priceData.bindingCost.toFixed(2)} binding
=======
//       {/* Cart Body */}
//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {items.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-xl border border-border p-12 text-center">
//               <ShoppingCart className="h-20 w-20 text-muted-foreground/70 mx-auto mb-6" strokeWidth={1.2} />
//               <h2 className="text-3xl font-black text-foreground mb-4">Your cart is empty</h2>
//               <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
//                 Start adding your documents, books or bulk printing orders to get fast quotes and delivery.
//               </p>
//               <Link
//                 to="/order"
//                 className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all text-lg shadow-md hover:shadow-lg"
//               >
//                 Start New Order <ArrowRight className="h-5 w-5" />
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
//               {/* Items List */}
//               <div className="lg:col-span-8 space-y-6">
//                 {items.map((item) => {
//                   const itemTotal = item.unitPrice * item.copies;

//                   return (
//                     <div
//                       key={item.id}
//                       className="bg-white rounded-xl shadow-md border border-border overflow-hidden hover:shadow-lg transition-shadow"
//                     >
//                       <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                         {/* Thumbnail */}
//                         <div className="w-full sm:w-32 md:w-40 h-40 sm:h-auto bg-muted/40 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
//                           {item.image ? (
//                             <img
//                               src={item.image}
//                               alt={item.title}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <Printer className="h-12 w-12 text-muted-foreground/50" />
//                           )}
//                         </div>

//                         {/* Content */}
//                         <div className="flex-1 flex flex-col">
//                           <div className="flex justify-between items-start gap-4 mb-3">
//                             <h3 className="font-bold text-lg md:text-xl text-foreground leading-tight">
//                               {item.title}
//                             </h3>
//                             <button
//                               onClick={() => removeItem(item.id)}
//                               className="text-red-600 hover:text-red-700 transition-colors p-1.5 -mr-1.5"
//                               aria-label="Remove item"
//                             >
//                               <Trash2 className="h-5 w-5" />
//                             </button>
//                           </div>

//                           <p className="text-sm text-muted-foreground mb-4">
//                             {item.specs} • {item.pages} pages × {item.copies} copies
//                           </p>

//                           <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
//                             <div className="flex items-center border border-border rounded-lg overflow-hidden">
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.copies - 1)}
//                                 className="px-3 py-2 bg-muted hover:bg-muted/80 text-foreground transition-colors disabled:opacity-50"
//                                 disabled={item.copies <= 1}
//                               >
//                                 <Minus className="h-4 w-4" />
//                               </button>
//                               <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
//                                 {item.copies}
//                               </span>
//                               <button
//                                 onClick={() => updateQuantity(item.id, item.copies + 1)}
//                                 className="px-3 py-2 bg-muted hover:bg-muted/80 text-foreground transition-colors"
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </button>
//                             </div>

//                             <div className="text-right">
//                               <div className="text-sm text-muted-foreground">
//                                 ₹{item.unitPrice.toFixed(2)} / copy
//                               </div>
//                               <div className="text-xl font-black text-primary mt-0.5">
//                                 ₹{itemTotal.toFixed(2)}
//                               </div>
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
<<<<<<< HEAD
//                   </div>
//                 );
//               })}

//               {/* Footer Actions */}
//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   disabled={isUpdating}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT - Order Summary */}
//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <div className="flex justify-between py-2 border-t">
//                       <span className="text-muted-foreground">Delivery Charges</span>
//                       <span className="font-semibold text-green-600">Free</span>
//                     </div>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{calculatedTotals?.grandTotal.toFixed(2) || total.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   {/* <button
//                     // onClick={() => navigate('/checkout')}
// //                     

//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group"
//                   >
//                     Proceed to Checkout 
//                     <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                   </button> */}

//                   <button
//   onClick={handleCheckout}
//   disabled={isUpdating}
//   className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group"
// >
//   Proceed to Checkout 
//   <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
// </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Pan-India delivery • Tracking provided</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
=======
//                   );
//                 })}

//                 <div className="flex justify-center sm:justify-start mt-6">
//                   <Link
//                     to="/order"
//                     className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-base"
//                   >
//                     <ArrowRight className="h-4 w-4 rotate-180" />
//                     Continue Adding Orders
//                   </Link>
//                 </div>
//               </div>

//               {/* Summary Sidebar */}
//               <div className="lg:col-span-4">
//                 <div className="bg-white rounded-xl shadow-lg border border-border p-6 md:p-8 sticky top-6">
//                   <h2 className="text-2xl font-black text-foreground mb-6">Order Summary</h2>

//                   <div className="space-y-4 text-sm">
//                     <div className="flex justify-between text-muted-foreground">
//                       <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
//                       <span>₹{subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-muted-foreground">
//                       <span>GST (5%)</span>
//                       <span>₹{gst.toFixed(2)}</span>
//                     </div>
//                     {/* <div className="flex justify-between text-muted-foreground">
//                       <span>Shipping Estimate</span>
//                       <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
//                     </div> */}
//                     <div className="border-t border-border pt-5 mt-2 flex justify-between text-base font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-xl">₹{grandTotal.toFixed(2)}</span>
//                     </div>
//                   </div>
                  



// <div className="lg:col-span-1">
//   <div className="sticky top-24 bg-white rounded-xl border border-border shadow-sm overflow-hidden">

//     <div className="bg-secondary p-4">
//       <h3 className="text-white font-bold flex items-center gap-2">
//         <Package className="h-4 w-4 text-primary" />
//         Order Summary
//         {orderMode === 'bulk' && (
//           <span className="text-white/60 text-xs font-normal">
//             ({items.length} items)
//           </span>
//         )}
//       </h3>
//     </div>

//     <div className="p-4 space-y-3 text-sm max-h-[70vh] overflow-y-auto">

//       {/* BULK MODE */}
//       {orderMode === 'bulk' ? (
//         <>
//           {items.map((item: any, i: number) => {
//             const p = itemPrices[i] || {};
//             return (
//               <div
//                 key={item.id}
//                 className="p-3 rounded-lg border border-border"
//               >
//                 <div className="flex justify-between items-center mb-1">
//                   <span className="font-bold text-foreground text-xs">
//                     Item {i + 1}
//                   </span>
//                   <span className="font-bold text-primary text-sm">
//                     ₹{p.grandTotal?.toFixed(2) || "0.00"}
//                   </span>
//                 </div>

//                 <div className="text-xs text-muted-foreground space-y-0.5">
//                   <p>{item.pages} pages × {item.copies} copies • {item.paperSize}</p>
//                   <p>
//                     {paperTypeLabels[item.paperType]?.split(' ').slice(0,3).join(' ')} • 
//                     {item.printColor === 'bw' ? 'B&W' : 'Color'} • 
//                     {item.printSide === 'double' ? 'Double' : 'Single'}
//                   </p>
//                   <p>
//                     {bindingLabels[item.bindingType]?.split('(')[0].trim()}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}

//           <div className="border-t border-border pt-3 space-y-2">
//             <div className="flex justify-between text-muted-foreground">
//               <span>Subtotal</span>
//               <span>₹{totalPrintingCost.toFixed(2)}</span>
//             </div>

//             <div className="flex justify-between text-muted-foreground">
//               <span>GST (5%)</span>
//               <span>₹{totalGst.toFixed(2)}</span>
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           {/* SINGLE ITEM MODE */}
//           {items[0] && (
//             <>
//               {[
//                 { label: 'Pages', value: `${item[0].pages} pages` },
//                 { label: 'Copies', value: `${item[0].copies} copies` },
//                 { label: 'Paper Size', value: item[0].paperSize },
//                 { label: 'Paper Type', value: paperTypeLabels[item[0].paperType]?.split(' ').slice(0, 3).join(' ') },
//                 { label: 'Print Color', value: item[0].printColor === 'bw' ? 'B&W' : 'Color' },
//                 { label: 'Printing Side', value: item[0].printSide === 'double' ? 'Double Side' : 'Single Side' },
//                 { label: 'Binding', value: bindingLabels[item[0].bindingType]?.split('(')[0].trim() },
//                 { label: 'Delivery', value: deliveryType === 'courier' ? 'Courier' : 'Store Pickup' },
//               ].map((row) => (
//                 <div key={row.label} className="flex justify-between">
//                   <span className="text-muted-foreground">{row.label}</span>
//                   <span className="font-medium text-foreground text-right">
//                     {row.value}
//                   </span>
//                 </div>
//               ))}
//             </>
//           )}
//         </>
//       )}

//       {/* TOTAL SECTION */}
//       <div className="border-t border-border pt-3 flex justify-between items-center">
//         <span className="font-bold text-foreground">Total</span>
//         <span className="font-black text-primary text-xl">
//           ₹{totalWithDelivery.toFixed(2)}
//         </span>
//       </div>

//       <div className="pt-2 text-xs text-muted-foreground text-center">
//         Inclusive of all taxes
//       </div>

//     </div>
//   </div>
// </div>

//                   <div className="mt-8 space-y-4">
//                     <Link
//                       to="/payment"
//                       className="block w-full bg-primary text-white font-bold text-center py-4 rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg text-lg flex items-center justify-center gap-2.5"
//                     >
//                       Proceed to Checkout <ArrowRight className="h-5 w-5" />
//                     </Link>

//                     <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                       <Shield className="h-4 w-4 text-primary" />
//                       Secure checkout with Razorpay
//                     </div>
//                   </div>

//                   <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground space-y-2">
//                     <div className="flex items-start gap-2">
//                       <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                       <span>GST invoice provided for every order</span>
//                     </div>
//                     <div className="flex items-start gap-2">
//                       <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                       <span>Pan-India delivery • Tracking provided</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }





<<<<<<< HEAD



import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
  CheckCircle, Printer, Package, FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
import { toast } from 'sonner';

interface CartItem {
  _id: string;
=======
import { useState} from 'react';
import { useLocation, } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, CheckCircle, Printer, Package, FileText
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { paperTypeLabels, bindingLabels } from '@/lib/pricingData';  // ← import here

interface CartItem {
  id: string;
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
  pages: number;
  copies: number;
  paperSize?: string;
  paperType?: string;
  printColor?: 'bw' | 'color';
  printSide?: 'single' | 'double';
  bindingType?: string;
  lamination?: string;
  instructions?: string;
  files?: Array<{
<<<<<<< HEAD
    _id: string;
=======
    id: string;
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
    name: string;
    size: number;
    type: string;
    status: string;
  }>;
<<<<<<< HEAD
}

interface CartData {
  items: CartItem[];
  customer: {
    name?: string;
    phone?: string;
    address?: string;
    pincode?: string;
    city?: string;
    state?: string;
  };
  orderMode: 'single' | 'bulk';
  deliveryType: 'pickup' | 'courier';
  totals: {
    printingCost: number;
    gst: number;
    totalWithDelivery: number;
  };
}

// ✅ API with auth header
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function Cart() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cartData, setCartData] = useState<CartData | null>(null);

  // ✅ Fetch cart on mount only
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await API.get('/cart');
      console.log("Fetched cart:", response.data);
      
      if (response.data && response.data.items && response.data.items.length > 0) {
        setCartData(response.data);
      } else {
        setCartData(null);
      }
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
      toast.error("Failed to load cart");
      setCartData(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Calculate price for a single item
  const calculateItemPrice = (item: CartItem) => {
    try {
      const priceData = calculatePrice({
        pages: item.pages,
        copies: item.copies,
        paperSize: item.paperSize as any,
        paperType: item.paperType as any,
        printColor: item.printColor as any,
        printSide: item.printSide as any,
        bindingType: item.bindingType as any,
      });
      return priceData;
    } catch (error) {
      console.error("Error calculating price:", error);
      return {
        totalCost: 0,
        grandTotal: 0,
        pricePerPage: 0,
        printingCost: 0,
        bindingCost: 0,
        gst: 0
      };
    }
  };

  // ✅ Update quantity - No page refresh, just update local state
  const updateQuantity = async (_id: string, newQty: number) => {
    if (newQty < 1) return;
    
    // Store current cart data before update
    const previousCartData = cartData;
    
    try {
      // Immediately update UI (optimistic update)
      if (cartData) {
        const updatedItems = cartData.items.map(item => 
          item._id === _id ? { ...item, copies: newQty } : item
        );
        setCartData({ ...cartData, items: updatedItems });
      }
      
      // Make API call
      const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
      
      // Update with server response (only if needed)
      if (response.data && response.data.items) {
        setCartData(response.data);
      }
      
      toast.success("Quantity updated");
    } catch (error: any) {
      console.error("Update failed:", error);
      // Revert to previous state on error
      setCartData(previousCartData);
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // ✅ Remove item - Smooth removal without refresh
  const removeItem = async (_id: string) => {
    // Store current cart data before update
    const previousCartData = cartData;
    
    try {
      // Immediately update UI (optimistic update)
      if (cartData) {
        const updatedItems = cartData.items.filter(item => item._id !== _id);
        if (updatedItems.length > 0) {
          setCartData({ ...cartData, items: updatedItems });
        } else {
          setCartData(null);
        }
      }
      
      // Make API call
      await API.delete(`/cart/item/${_id}`);
      toast.success("Item removed");
    } catch (error: any) {
      console.error("Delete failed:", error);
      // Revert to previous state on error
      setCartData(previousCartData);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const handleCheckout = async () => {
    try {
      if (!cartData) {
        toast.error("Cart is empty");
        return;
      }

      const payload = {
        items: cartData.items,
        customer: cartData.customer,
        deliveryType: cartData.deliveryType,
        orderMode: cartData.orderMode,
        totalAmount: calculatedTotals?.grandTotal || total
      };

      const res = await API.post('/order/create-from-cart', payload);
      const orderData = res.data;
      const order = orderData.order;

      if (!order?._id) {
        throw new Error("Order ID missing from response");
      }

      localStorage.setItem("pendingOrder", JSON.stringify({
        orderId: order._id,
        amount: order.totalAmount,
        orderNumber: order.orderNumber
      }));

      navigate('/checkout', {
        state: {
          orderId: order._id,
          amount: order.totalAmount,
          orderNumber: order.orderNumber
        }
      });

    } catch (error: any) {
      console.error("Checkout failed:", error);
      toast.error(error.response?.data?.message || "Checkout failed");
    }
  };

  // ✅ Clear entire cart
  const clearCart = async () => {
    if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
    // Store current cart data before update
    const previousCartData = cartData;
    
    try {
      // Immediately clear UI
      setCartData(null);
      
      // Make API call
      await API.delete('/cart');
      toast.success("Cart cleared");
    } catch (error: any) {
      console.error("Clear failed:", error);
      // Revert to previous state on error
      setCartData(previousCartData);
      toast.error("Failed to clear cart");
    }
  };

  // ✅ Recalculate totals whenever cartData changes (without refetching)
  const calculatedTotals = cartData?.items.reduce((sum, item) => {
    const price = calculateItemPrice(item);
    return {
      printingCost: sum.printingCost + price.printingCost,
      bindingCost: sum.bindingCost + price.bindingCost,
      totalCost: sum.totalCost + price.totalCost,
      gst: sum.gst + price.gst,
      grandTotal: sum.grandTotal + price.grandTotal
    };
  }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });

  const total = cartData?.totals?.totalWithDelivery || 0;
  const deliveryType = cartData?.deliveryType || 'pickup';
  const customer = cartData?.customer || {};
  const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col mt-28">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Show empty state when no items
  if (!hasItems) {
    return (
      <div className="min-h-screen bg-background flex flex-col mt-28">
        <Navbar />
=======
  // grandTotal?: number;     // optional – if passed from order page
}

export default function Cart() {
  const location = useLocation();
  const orderData = location.state as any;

  // Safely destructure with good defaults
  const {
    item = [],
    orderMode = 'single',
    deliveryType = 'pickup',
    customer = {},
    totalPrintingCost = 0,
    totalGst = 0,
    totalWithDelivery = 0,
    // itemPrices = [],         // if you want to use per-item pricing
  } = orderData || {};

  const [localItems, setLocalItems] = useState<CartItem[]>(item);

  const isBulk = orderMode === 'bulk';
  const hasItems = localItems.length > 0;

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setLocalItems(prev =>
      prev.map(it => (it.id === id ? { ...it, copies: newQty } : it))
    );
    // TODO: if you want live price update → recalculate here or call backend
  };

  const removeItem = (id: string) => {
    setLocalItems(prev => prev.filter(it => it.id !== id));
  };

  // Show friendly empty state if no data arrived
  if (!orderData || !hasItems) {
    return (
      <div className="min-h-screen bg-background flex flex-col mt-28">
        <Navbar />
        
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              You haven't added any printing orders yet.
            </p>
            <Link
              to="/order"
<<<<<<< HEAD
              className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
=======
              className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md"
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
            >
              Start New Order <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

<<<<<<< HEAD
      {/* Header Section */}
=======
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
      <section className="relative bg-secondary py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
              <ShoppingCart className="h-5 w-5" />
              Your Order Cart
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
              Review Your Printing Order
            </h1>
            <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
              Modify quantities, remove items, or proceed to secure checkout
            </p>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Main Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT - Items List */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Customer & Delivery Info Card */}
              <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
=======
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* LEFT – Items list */}
            <div className="lg:col-span-8 space-y-6">
              {/* Customer info card */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Customer & Delivery Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
<<<<<<< HEAD
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
                    <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
                    <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
                    <p className="font-medium text-foreground mt-1 flex items-center gap-2">
                      {deliveryType === 'courier' ? (
                        <>
                          <Truck className="h-4 w-4 text-primary" />
                          Courier Delivery
                        </>
                      ) : (
                        <>
                          <Package className="h-4 w-4 text-primary" />
                          Store Pickup
                        </>
                      )}
=======
                    <span className="text-muted-foreground block">Name</span>
                    <p className="font-medium">{customer.name || '—'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Phone</span>
                    <p className="font-medium">{customer.phone || '—'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground block">Delivery Method</span>
                    <p className="font-medium">
                      {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                    </p>
                  </div>
                  {deliveryType === 'courier' && customer.address && (
                    <>
                      <div className="sm:col-span-2">
<<<<<<< HEAD
                        <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
                        <p className="font-medium text-foreground mt-1">{customer.address}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
                        <p className="font-medium text-foreground mt-1">
=======
                        <span className="text-muted-foreground block">Address</span>
                        <p className="font-medium">{customer.address}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Pincode / City</span>
                        <p className="font-medium">
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                          {customer.pincode} {customer.city ? `, ${customer.city}` : ''}
                        </p>
                      </div>
                      <div>
<<<<<<< HEAD
                        <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
                        <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
=======
                        <span className="text-muted-foreground block">State</span>
                        <p className="font-medium">{customer.state || '—'}</p>
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Order Items */}
<<<<<<< HEAD
              {cartData?.items.map((item, index) => {
                const itemTitle = item.paperSize
                  ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
                  : `Custom Print Job ${index + 1}`;
                
                const files = item.files || [];
                const priceData = calculateItemPrice(item);

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
                      {/* Thumbnail/Icon */}
                      <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
=======
              {localItems.map((item, index) => {
                // Fallback title
                const itemTitle = item.paperSize
                  ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
                  : `Custom Print Job ${index + 1}`;

                const files = item.files || [];

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
                      {/* Thumbnail placeholder */}
                      <div className="w-full sm:w-32 md:w-40 h-40 bg-muted/40 rounded-lg flex items-center justify-center shrink-0">
                        <Printer className="h-12 w-12 text-muted-foreground/50" />
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4 mb-3">
<<<<<<< HEAD
                          <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
                            {itemTitle}
                          </h3>
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors"
=======
                          <h3 className="font-bold text-lg md:text-xl leading-tight">
                            {itemTitle}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 p-1.5 -mr-1.5"
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="text-sm text-muted-foreground mb-4 space-y-1">
<<<<<<< HEAD
                          <p className="font-medium text-foreground">
=======
                          <p className="font-medium">
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                            {item.pages} pages × {item.copies} copies
                          </p>
                          <p>
                            {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
                            {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
                            {item.printSide === 'double' ? 'Double' : 'Single'} sided
                          </p>
                          <p>
                            Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
                          </p>
                          {item.lamination && item.lamination !== 'none' && (
<<<<<<< HEAD
                            <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
                          )}
                        </div>

                        {/* Uploaded files list */}
                        {files.length > 0 && (
                          <div className="mb-4 text-xs">
                            <p className="text-muted-foreground mb-1 flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              Uploaded Files:
                            </p>
                            <ul className="space-y-1">
                              {files.map(f => (
                                <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
                                  <FileText className="h-3 w-3 text-primary/70" />
                                  <span className="truncate max-w-[200px]">{f.name}</span>
                                  <span className="text-xs">
=======
                            <p>Lamination: {item.lamination}</p>
                          )}
                        </div>

                        {/* Uploaded files list (small) */}
                        {files.length > 0 && (
                          <div className="mb-4 text-xs">
                            <p className="text-muted-foreground mb-1">Files:</p>
                            <ul className="space-y-1">
                              {files.map(f => (
                                <li key={f.id} className="flex items-center gap-2">
                                  <FileText className="h-3.5 w-3.5 text-primary/70" />
                                  <span className="truncate max-w-[220px]">{f.name}</span>
                                  <span className="text-muted-foreground">
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                                    ({(f.size / 1024 / 1024).toFixed(1)} MB)
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

<<<<<<< HEAD
                        <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
                          <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
                            <button
                              onClick={() => updateQuantity(item._id, item.copies - 1)}
                              disabled={item.copies <= 1}
                              className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
                              {item.copies}
                            </span>
                            <button
                              onClick={() => updateQuantity(item._id, item.copies + 1)}
                              className="px-4 py-2 hover:bg-muted transition-colors"
=======
                        <div className="mt-auto flex flex-wrap justify-between items-center gap-4">
                          <div className="flex border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.id, item.copies - 1)}
                              className="px-3 py-2 bg-muted hover:bg-muted/80 disabled:opacity-50"
                              disabled={item.copies <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                              {item.copies}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.copies + 1)}
                              className="px-3 py-2 bg-muted hover:bg-muted/80"
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
<<<<<<< HEAD
                            <div className="text-lg font-bold text-primary">
                              ₹{priceData.grandTotal.toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ₹{priceData.pricePerPage.toFixed(2)}/page • ₹{priceData.bindingCost.toFixed(2)} binding
                            </div>
=======
                            {/* If you passed grandTotal per item, show it – otherwise placeholder */}
                            {/* <div className="text-xl font-black text-primary"> */}
                              {/* ₹{(item.copies * 100).toFixed(2)} 
                            </div> */}
                            {/* <div className="text-xs text-muted-foreground">
                              per copy price example
                            </div> */}
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

<<<<<<< HEAD
              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-4">
                <Link
                  to="/order"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
                >
                  <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Continue Adding Orders
                </Link>
                
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Package className="h-6 w-6 text-primary" />
                  Order Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-semibold">{cartData?.items.length || 0}</span>
                  </div>

                  <div className="flex justify-between py-2 border-t">
                    <span className="text-muted-foreground">Printing Cost</span>
                    <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Binding Cost</span>
                    <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">GST (5%)</span>
                    <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
                  </div>

                  {deliveryType === 'courier' && (
                    <div className="flex justify-between py-2 border-t">
                      <span className="text-muted-foreground">Delivery Charges</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-5 mt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span className="text-foreground">Total Amount</span>
                      <span className="text-primary text-2xl font-black">
                        ₹{calculatedTotals?.grandTotal.toFixed(2) || total.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Inclusive of all taxes
                    </p>
=======
              <div className="flex justify-center sm:justify-start mt-6">
                <Link
                  to="/order"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Continue Adding Orders
                </Link>
              </div>
            </div>

            {/* RIGHT – Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
                <h2 className="text-2xl font-black mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Items</span>
                    <span>{localItems.length}</span>
                  </div>

                  {isBulk ? (
                    <>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Printing Cost</span>
                        <span>₹{totalPrintingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>GST (5%)</span>
                        <span>₹{totalGst.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-muted-foreground italic text-sm">
                      Detailed breakdown shown at checkout
                    </div>
                  )}

                  <div className="border-t border-border pt-5 mt-2 flex justify-between items-center text-base font-bold">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-primary text-xl">
                      ₹{totalWithDelivery.toFixed(2)}
                    </span>
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
                  </div>
                </div>

                <div className="mt-8 space-y-4">
<<<<<<< HEAD
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group"
                  >
                    Proceed to Checkout 
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
=======
                  <Link
                    to="/payment"
                    className="block w-full bg-primary text-white font-bold text-center py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5"
                  >
                    Proceed to Checkout <ArrowRight className="h-5 w-5" />
                  </Link>
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905

                  <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    Secure checkout with Razorpay
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>GST invoice provided for every order</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Pan-India delivery • Tracking provided</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

<<<<<<< HEAD















// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, Shield, Truck, 
//   CheckCircle, Printer, Package, FileText, Loader2
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { paperTypeLabels, bindingLabels, calculatePrice } from '@/lib/pricingData';
// import { toast } from 'sonner';

// interface CartItem {
//   _id: string;
//   pages: number;
//   copies: number;
//   paperSize?: string;
//   paperType?: string;
//   printColor?: 'bw' | 'color';
//   printSide?: 'single' | 'double';
//   bindingType?: string;
//   lamination?: string;
//   instructions?: string;
//   files?: Array<{
//     _id: string;
//     name: string;
//     size: number;
//     type: string;
//     status: string;
//     url?: string;
//   }>;
// }

// interface CartData {
//   _id: string;
//   items: CartItem[];
//   customer: {
//     name?: string;
//     phone?: string;
//     address?: string;
//     pincode?: string;
//     city?: string;
//     state?: string;
//   };
//   orderMode: 'single' | 'bulk';
//   deliveryType: 'pickup' | 'courier';
//   totals: {
//     printingCost: number;
//     gst: number;
//     totalWithDelivery: number;
//   };
//   status?: string;
//   payment?: {
//     status: string;
//   };
// }

// // ✅ API with auth header
// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default function Cart() {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isCreatingOrder, setIsCreatingOrder] = useState(false);

//   // ✅ Fetch cart on mount
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get('/cart');
//       console.log("Fetched cart:", response.data);
//       setCartData(response.data);
//     } catch (error: any) {
//       console.error("Error fetching cart:", error);
//       if (error.response?.status === 401) {
//         navigate('/login');
//       }
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Calculate price for a single item
//   const calculateItemPrice = (item: CartItem) => {
//     try {
//       const priceData = calculatePrice({
//         pages: item.pages,
//         copies: item.copies,
//         paperSize: item.paperSize as any,
//         paperType: item.paperType as any,
//         printColor: item.printColor as any,
//         printSide: item.printSide as any,
//         bindingType: item.bindingType as any,
//       });
//       return priceData;
//     } catch (error) {
//       console.error("Error calculating price:", error);
//       return {
//         totalCost: 0,
//         grandTotal: 0,
//         pricePerPage: 0,
//         printingCost: 0,
//         bindingCost: 0,
//         gst: 0
//       };
//     }
//   };

//   // ✅ Create order from cart and proceed to checkout
//   const createOrderAndProceedToCheckout = async () => {
//     if (!cartData || !cartData.items || cartData.items.length === 0) {
//       toast.error("Your cart is empty");
//       return;
//     }

//     setIsCreatingOrder(true);
//     const loadingToast = toast.loading("Creating order...");

//     try {
//       // Calculate total amount from cart items
//       const calculatedTotals = cartData.items.reduce((sum, item) => {
//         const price = calculateItemPrice(item);
//         return {
//           grandTotal: sum.grandTotal + price.grandTotal
//         };
//       }, { grandTotal: 0 });

//       const totalAmount = cartData.totals?.totalWithDelivery || calculatedTotals.grandTotal;

//       // Format order data exactly as backend expects
//       const orderData = {
//         items: cartData.items.map(item => ({
//           pages: item.pages,
//           copies: item.copies,
//           paperSize: item.paperSize || "A4",
//           paperType: item.paperType || "70gsm_normal",
//           printColor: item.printColor || "bw",
//           printSide: item.printSide || "double",
//           bindingType: item.bindingType || "perfect_glue",
//           lamination: item.lamination || "none",
//           instructions: item.instructions || "",
//           files: item.files?.map(file => ({
//             name: file.name,
//             size: file.size,
//             type: file.type,
//             url: file.url || ""
//           })) || []
//         })),
//         customer: {
//           name: cartData.customer?.name || "",
//           phone: cartData.customer?.phone || "",
//           address: cartData.customer?.address || "",
//           pincode: cartData.customer?.pincode || "",
//           city: cartData.customer?.city || "",
//           state: cartData.customer?.state || ""
//         },
//         orderMode: cartData.orderMode || "single",
//         deliveryType: cartData.deliveryType || "pickup",
//         totalAmount: totalAmount,
//         cartId: cartData._id // Send cart ID to clear after order creation
//       };

//       console.log("📦 Creating order from cart:", JSON.stringify(orderData, null, 2));

//       // Create order via API
//       const response = await API.post('/order/create-from-cart', orderData);
      
//       toast.dismiss(loadingToast);
      
//       if (response.data && response.data.success) {
//         const order = response.data.order;
        
//         const orderInfo = {
//           orderId: order._id,
//           amount: order.totalAmount,
//           orderNumber: order.orderNumber || `ORD-${order._id.slice(-6)}`
//         };
        
//         // Store order info for payment
//         localStorage.setItem('pendingOrder', JSON.stringify(orderInfo));
        
//         // Navigate to checkout with order data
//         navigate('/checkout', { 
//           state: orderInfo
//         });
//       } else {
//         throw new Error(response.data?.message || 'Failed to create order');
//       }
//     } catch (error: any) {
//       toast.dismiss(loadingToast);
//       console.error("❌ Error creating order:", error);
//       console.error("❌ Error response:", error.response?.data);
      
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error || 
//                           "Failed to create order. Please try again.";
//       toast.error(errorMessage);
//     } finally {
//       setIsCreatingOrder(false);
//     }
//   };

//   // ✅ Update quantity
//   const updateQuantity = async (_id: string, newQty: number) => {
//     if (newQty < 1) return;
    
//     setIsUpdating(true);
//     try {
//       const response = await API.put(`/cart/item/${_id}`, { copies: newQty });
//       setCartData(response.data);
//       toast.success("Quantity updated");
//     } catch (error: any) {
//       console.error("Update failed:", error);
//       toast.error(error.response?.data?.message || "Failed to update quantity");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Remove item
//   const removeItem = async (_id: string) => {
//     setIsUpdating(true);
//     try {
//       await API.delete(`/cart/item/${_id}`);
//       const response = await API.get('/cart');
//       const updatedCart = response.data;
      
//       if (updatedCart.items && updatedCart.items.length > 0) {
//         setCartData(updatedCart);
//         toast.success("Item removed");
//       } else {
//         setCartData(null);
//         toast.success("Item removed");
//       }
//     } catch (error: any) {
//       console.error("Delete failed:", error);
//       toast.error("Failed to remove item");
//       fetchCart();
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Clear entire cart
//   const clearCart = async () => {
//     if (!window.confirm('Are you sure you want to clear your cart?')) return;
    
//     setIsUpdating(true);
//     try {
//       await API.delete('/cart');
//       setCartData(null);
//       toast.success("Cart cleared");
//     } catch (error: any) {
//       console.error("Clear failed:", error);
//       toast.error("Failed to clear cart");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // ✅ Check if cart has items
//   const hasItems = cartData !== null && cartData.items && cartData.items.length > 0;

//   // Show loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center">
//             <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
//             <p className="text-muted-foreground">Loading your cart...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // ✅ Show empty state when no items
//   if (!hasItems) {
//     return (
//       <div className="min-h-screen bg-background flex flex-col mt-28">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-8">
//           <div className="text-center max-w-md">
//             <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
//             <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
//             <p className="text-muted-foreground mb-8">
//               You haven't added any printing orders yet.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md transition-all duration-300 hover:scale-105"
//             >
//               Start New Order <ArrowRight className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const total = cartData?.totals?.totalWithDelivery || 0;
//   const deliveryType = cartData?.deliveryType || 'pickup';
//   const customer = cartData?.customer || {};

//   // Calculate totals using actual pricing function
//   const calculatedTotals = cartData?.items.reduce((sum, item) => {
//     const price = calculateItemPrice(item);
//     return {
//       printingCost: sum.printingCost + price.printingCost,
//       bindingCost: sum.bindingCost + price.bindingCost,
//       totalCost: sum.totalCost + price.totalCost,
//       gst: sum.gst + price.gst,
//       grandTotal: sum.grandTotal + price.grandTotal
//     };
//   }, { printingCost: 0, bindingCost: 0, totalCost: 0, gst: 0, grandTotal: 0 });
=======
// import { Link } from 'react-router-dom';
// import { useCartStore } from '@/store/cartStore';
// import {
//   ShoppingCart, Trash2, Plus, Minus, ArrowRight, IndianRupee,
//   Shield, Truck, CheckCircle, Printer, FileText
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// export default function Cart() {
//   // Pull real data from Zustand
//   const { items, removeItem, updateItem } = useCartStore();

//   const handleQuantityChange = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     updateItem(id, { copies: newQuantity });
//   };

//   // Calculate totals using store getter (or fallback calculation)
//   const subtotal = useCartStore(state => state.subtotal());
//   const gst = subtotal * 0.05;
//   const shipping = subtotal > 2000 ? 0 : 150;
//   const grandTotal = subtotal + gst + shipping;
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

<<<<<<< HEAD
//       {/* Header Section */}
//       <section className="relative bg-secondary py-12 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//               <ShoppingCart className="h-5 w-5" />
//               Your Order Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//               Modify quantities, remove items, or proceed to secure checkout
=======
//       {/* Header */}
//       <section className="relative bg-secondary py-12 md:py-20">
//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <div
//             className="absolute inset-0"
//             style={{
//               backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
//               backgroundSize: '20px 20px',
//             }}
//           />
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="text-center">
//             <div className="inline-flex items-center gap-3 bg-primary/15 text-white border border-primary/25 rounded-full px-6 py-2.5 text-sm font-semibold mb-6">
//               <ShoppingCart className="h-6 w-6 text-primary" />
//               Your Cart
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
//               Review Your Printing Order
//             </h1>
//             <p className="text-white/80 text-lg max-w-2xl mx-auto">
//               Adjust quantities, remove items, or proceed securely to checkout.
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
//             </p>
//           </div>
//         </div>
//       </section>

<<<<<<< HEAD
//       {/* Main Content */}
//       <section className="py-12 md:py-16 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
//             {/* LEFT - Items List */}
//             <div className="lg:col-span-8 space-y-6">
              
//               {/* Customer & Delivery Info Card */}
//               <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
//                 <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
//                   <Package className="h-5 w-5 text-primary" />
//                   Customer & Delivery Details
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Name</span>
//                     <p className="font-medium text-foreground mt-1">{customer.name || '—'}</p>
//                   </div>
//                   <div>
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Phone</span>
//                     <p className="font-medium text-foreground mt-1">{customer.phone || '—'}</p>
//                   </div>
//                   <div className="sm:col-span-2">
//                     <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Method</span>
//                     <p className="font-medium text-foreground mt-1 flex items-center gap-2">
//                       {deliveryType === 'courier' ? (
//                         <>
//                           <Truck className="h-4 w-4 text-primary" />
//                           Courier Delivery
//                         </>
//                       ) : (
//                         <>
//                           <Package className="h-4 w-4 text-primary" />
//                           Store Pickup
//                         </>
//                       )}
//                     </p>
//                   </div>
//                   {deliveryType === 'courier' && customer.address && (
//                     <>
//                       <div className="sm:col-span-2">
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Delivery Address</span>
//                         <p className="font-medium text-foreground mt-1">{customer.address}</p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">Pincode / City</span>
//                         <p className="font-medium text-foreground mt-1">
//                           {customer.pincode} {customer.city ? `, ${customer.city}` : ''}
//                         </p>
//                       </div>
//                       <div>
//                         <span className="text-muted-foreground block text-xs uppercase tracking-wide">State</span>
//                         <p className="font-medium text-foreground mt-1">{customer.state || '—'}</p>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Order Items */}
//               {cartData?.items && cartData.items.length > 0 && cartData.items.map((item, index) => {
//                 const itemTitle = item.paperSize
//                   ? `${item.paperSize} • ${item.printColor?.toUpperCase()} • ${item.printSide} side`
//                   : `Custom Print Job ${index + 1}`;
                
//                 const files = item.files || [];
//                 const priceData = calculateItemPrice(item);

//                 return (
//                   <div
//                     key={item._id}
//                     className="bg-white rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300"
//                   >
//                     <div className="p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-6">
//                       {/* Thumbnail/Icon */}
//                       <div className="w-full sm:w-32 md:w-40 h-40 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center shrink-0">
//                         <Printer className="h-12 w-12 text-primary/60" strokeWidth={1.5} />
//                       </div>

//                       <div className="flex-1 flex flex-col">
//                         <div className="flex justify-between items-start gap-4 mb-3">
//                           <h3 className="font-bold text-lg md:text-xl leading-tight text-foreground">
//                             {itemTitle}
//                           </h3>
//                           <button
//                             onClick={() => removeItem(item._id)}
//                             disabled={isUpdating}
//                             className="text-red-500 hover:text-red-700 p-1.5 -mr-1.5 transition-colors disabled:opacity-50"
//                             aria-label="Remove item"
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
//                         </div>

//                         <div className="text-sm text-muted-foreground mb-4 space-y-1">
//                           <p className="font-medium text-foreground">
//                             {item.pages} pages × {item.copies} copies
//                           </p>
//                           <p>
//                             {paperTypeLabels[item.paperType || ''] || item.paperType || '—'} •{' '}
//                             {item.printColor === 'bw' ? 'B&W' : 'Color'} •{' '}
//                             {item.printSide === 'double' ? 'Double' : 'Single'} sided
//                           </p>
//                           <p>
//                             Binding: {bindingLabels[item.bindingType || ''] || item.bindingType || '—'}
//                           </p>
//                           {item.lamination && item.lamination !== 'none' && (
//                             <p>Lamination: {item.lamination.charAt(0).toUpperCase() + item.lamination.slice(1)}</p>
//                           )}
//                         </div>

//                         {/* Uploaded files list */}
//                         {files.length > 0 && (
//                           <div className="mb-4 text-xs">
//                             <p className="text-muted-foreground mb-1 flex items-center gap-1">
//                               <FileText className="h-3 w-3" />
//                               Uploaded Files:
//                             </p>
//                             <ul className="space-y-1">
//                               {files.map(f => (
//                                 <li key={f._id} className="flex items-center gap-2 text-muted-foreground">
//                                   <FileText className="h-3 w-3 text-primary/70" />
//                                   <span className="truncate max-w-[200px]">{f.name}</span>
//                                   <span className="text-xs">
//                                     ({(f.size / 1024 / 1024).toFixed(1)} MB)
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                           </div>
//                         )}

//                         <div className="mt-auto flex flex-wrap justify-between items-center gap-4 pt-2">
//                           <div className="flex border border-border rounded-lg overflow-hidden bg-muted/30">
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies - 1)}
//                               disabled={isUpdating || item.copies <= 1}
//                               className="px-4 py-2 hover:bg-muted transition-colors disabled:opacity-50"
//                             >
//                               <Minus className="h-4 w-4" />
//                             </button>
//                             <span className="px-5 py-2 font-semibold min-w-[3.5rem] text-center bg-white">
//                               {item.copies}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item._id, item.copies + 1)}
//                               disabled={isUpdating}
//                               className="px-4 py-2 hover:bg-muted transition-colors"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </button>
//                           </div>

//                           <div className="text-right">
//                             <div className="text-lg font-bold text-primary">
//                               ₹{priceData.grandTotal.toFixed(2)}
//                             </div>
//                             <div className="text-xs text-muted-foreground">
//                               ₹{priceData.pricePerPage.toFixed(2)}/page • ₹{priceData.bindingCost.toFixed(2)} binding
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}

//               {/* Footer Actions */}
//               <div className="flex justify-between items-center pt-4">
//                 <Link
//                   to="/order"
//                   className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 group"
//                 >
//                   <ArrowRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
//                   Continue Adding Orders
//                 </Link>
                
//                 <button
//                   onClick={clearCart}
//                   disabled={isUpdating}
//                   className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50 transition-colors"
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>

//             {/* RIGHT - Order Summary */}
//             <div className="lg:col-span-4">
//               <div className="bg-white rounded-xl shadow-lg border p-6 md:p-8 sticky top-6">
//                 <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
//                   <Package className="h-6 w-6 text-primary" />
//                   Order Summary
//                 </h2>

//                 <div className="space-y-4 text-sm">
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Items</span>
//                     <span className="font-semibold">{cartData?.items.length || 0}</span>
//                   </div>

//                   <div className="flex justify-between py-2 border-t">
//                     <span className="text-muted-foreground">Printing Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.printingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Binding Cost</span>
//                     <span className="font-semibold">₹{calculatedTotals?.bindingCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="font-semibold">₹{calculatedTotals?.totalCost.toFixed(2) || '0.00'}</span>
//                   </div>
                  
//                   <div className="flex justify-between py-2">
//                     <span className="text-muted-foreground">GST (5%)</span>
//                     <span className="font-semibold">₹{calculatedTotals?.gst.toFixed(2) || '0.00'}</span>
//                   </div>

//                   {deliveryType === 'courier' && (
//                     <div className="flex justify-between py-2 border-t">
//                       <span className="text-muted-foreground">Delivery Charges</span>
//                       <span className="font-semibold text-green-600">Free</span>
//                     </div>
//                   )}

//                   <div className="border-t border-border pt-5 mt-4">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Total Amount</span>
//                       <span className="text-primary text-2xl font-black">
//                         ₹{calculatedTotals?.grandTotal.toFixed(2) || total.toFixed(2)}
//                       </span>
//                     </div>
//                     <p className="text-xs text-muted-foreground text-center mt-2">
//                       Inclusive of all taxes
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-8 space-y-4">
//                   <button
//                     onClick={createOrderAndProceedToCheckout}
//                     disabled={isCreatingOrder}
//                     className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5 group disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isCreatingOrder ? (
//                       <>
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                         Creating Order...
//                       </>
//                     ) : (
//                       <>
//                         Proceed to Checkout 
//                         <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                       </>
//                     )}
//                   </button>

//                   <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                     <Shield className="h-4 w-4" />
//                     Secure checkout with Razorpay
//                   </div>
//                 </div>

//                 <div className="mt-6 pt-6 border-t text-xs text-muted-foreground space-y-2">
//                   <div className="flex items-start gap-2">
//                     <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>GST invoice provided for every order</span>
//                   </div>
//                   <div className="flex items-start gap-2">
//                     <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                     <span>Pan-India delivery • Tracking provided</span>
//                   </div>
//                 </div>
=======
//       {/* Cart Content */}
//       <section className="py-12 md:py-20 bg-background">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {items.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-2xl border border-border p-12 md:p-16 text-center">
//               <ShoppingCart className="h-24 w-24 text-muted-foreground/60 mx-auto mb-8" strokeWidth={1} />
//               <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
//                 Your cart is empty
//               </h2>
//               <p className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto">
//                 Looks like you haven’t added any printing orders yet.
//               </p>
//               <Link
//                 to="/order"
//                 className="inline-flex items-center gap-3 bg-primary text-white font-bold px-10 py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
//               >
//                 Start New Order <ArrowRight className="h-5 w-5" />
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
//               {/* Items List */}
//               <div className="lg:col-span-8 space-y-6">
//               // Inside the items.map loop
// {items.map((item) => {
//   // We NEVER use item.title because it doesn't exist
//   const displayTitle = `${item.printColor === 'bw' ? 'Black & White' : 'Full Color'} Print • ${item.paperSize}`;

//   const unitPrice = item.calculatedPrice?.grandTotal || 0;
//   const itemTotal = unitPrice * item.copies;

//   return (
//     <div
//       key={item.id}
//       className="bg-white rounded-xl shadow-md border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
//     >
//       <div className="p-5 md:p-7 flex flex-col sm:flex-row gap-6">
//         {/* Thumbnail */}
//         <div className="w-full sm:w-40 md:w-48 h-48 sm:h-auto bg-muted/40 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
//           {item.files.length > 0 ? (
//             <div className="text-center p-4">
//               <FileText className="h-10 w-10 text-primary/70 mx-auto mb-2" />
//               <p className="text-xs text-muted-foreground">
//                 {item.files.length} file{item.files.length !== 1 ? 's' : ''}
//               </p>
//             </div>
//           ) : (
//             <Printer className="h-16 w-16 text-muted-foreground/50" strokeWidth={1.2} />
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex-1 flex flex-col">
//           <div className="flex justify-between items-start gap-4 mb-4">
//             <h3 className="font-bold text-xl text-foreground leading-tight">
//               {displayTitle}
//             </h3>
//             <button
//               onClick={() => removeItem(item.id)}
//               className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
//               aria-label="Remove item"
//             >
//               <Trash2 className="h-6 w-6" />
//             </button>
//           </div>

//           {/* Rest of the item details */}
//           <div className="text-sm text-muted-foreground mb-5 space-y-1">
//             <p>
//               {item.pages} pages × {item.copies} copies • {item.paperSize}
//             </p>
//             <p>
//               {item.paperType.replace(/_/g, ' ').toUpperCase()} •{' '}
//               {item.printColor === 'bw' ? 'Black & White' : 'Full Color'} •{' '}
//               {item.printSide === 'double' ? 'Double Sided' : 'Single Sided'}
//             </p>
//             <p>
//               Binding: {item.bindingType.replace(/_/g, ' ').toUpperCase()} • Lamination:{' '}
//               {item.lamination === 'none' ? 'None' : item.lamination}
//             </p>
//             {item.instructions && (
//               <p className="text-xs italic mt-2 text-amber-700">
//                 Note: {item.instructions}
//               </p>
//             )}
//           </div>

//           {/* Quantity + Price */}
//           <div className="mt-auto flex flex-wrap items-center justify-between gap-6">
//             <div className="flex items-center border border-border rounded-lg overflow-hidden bg-white">
//               <button
//                 onClick={() => handleQuantityChange(item.id, item.copies - 1)}
//                 className="px-4 py-3 bg-muted hover:bg-muted/80 transition-colors disabled:opacity-40"
//                 disabled={item.copies <= 1}
//               >
//                 <Minus className="h-4 w-4" />
//               </button>
//               <span className="px-6 py-3 font-semibold text-lg min-w-[4rem] text-center">
//                 {item.copies}
//               </span>
//               <button
//                 onClick={() => handleQuantityChange(item.id, item.copies + 1)}
//                 className="px-4 py-3 bg-muted hover:bg-muted/80 transition-colors"
//               >
//                 <Plus className="h-4 w-4" />
//               </button>
//             </div>

//             <div className="text-right">
//               <div className="text-sm text-muted-foreground">
//                 ₹{unitPrice.toFixed(2)} per copy
//               </div>
//               <div className="text-2xl font-black text-primary mt-1">
//                 ₹{itemTotal.toFixed(2)}
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
//               </div>
//             </div>
//           </div>
//         </div>
<<<<<<< HEAD
=======
//       </div>
//     </div>
//   );
// })}

//                 <div className="mt-8 text-center sm:text-left">
//                   <Link
//                     to="/order"
//                     className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-base"
//                   >
//                     <ArrowRight className="h-4 w-4 rotate-180" />
//                     Continue Adding More Orders
//                   </Link>
//                 </div>
//               </div>

//               {/* Summary */}
//               <div className="lg:col-span-4">
//                 <div className="bg-white rounded-xl shadow-2xl border border-border p-7 md:p-9 sticky top-6">
//                   <h2 className="text-2xl font-black text-foreground mb-7 flex items-center gap-3">
//                     <IndianRupee className="h-6 w-6 text-primary" />
//                     Order Summary
//                   </h2>

//                   <div className="space-y-4 text-sm mb-8">
//                     <div className="flex justify-between text-muted-foreground">
//                       <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
//                       <span>₹{subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-muted-foreground">
//                       <span>GST (5%)</span>
//                       <span>₹{gst.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-muted-foreground">
//                       <span>Shipping</span>
//                       <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
//                         {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
//                       </span>
//                     </div>
//                     <div className="border-t border-border pt-5 mt-3 flex justify-between items-center text-lg font-bold">
//                       <span className="text-foreground">Grand Total</span>
//                       <span className="text-primary text-2xl">₹{grandTotal.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <div className="space-y-5">
//                     <Link
//                       to="/checkout"
//                       className="block w-full bg-primary text-white font-bold text-center py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center justify-center gap-3"
//                     >
//                       Proceed to Checkout <ArrowRight className="h-5 w-5" />
//                     </Link>

//                     <div className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
//                       <Shield className="h-4 w-4 text-primary" />
//                       Secure payment via Razorpay
//                     </div>
//                   </div>

//                   <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground space-y-3">
//                     <div className="flex items-start gap-2.5">
//                       <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                       <span>GST invoice included with every order</span>
//                     </div>
//                     <div className="flex items-start gap-2.5">
//                       <Truck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
//                       <span>Pan-India tracked delivery • Free pickup in Ajmer</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
//       </section>

//       <Footer />
//     </div>
//   );
<<<<<<< HEAD
// }
















=======
// }
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
