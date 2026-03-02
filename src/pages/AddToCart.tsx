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

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

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
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
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
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }





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
    id: string;
    name: string;
    size: number;
    type: string;
    status: string;
  }>;
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
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <ShoppingCart className="h-20 w-20 mx-auto mb-6 text-muted-foreground/70" strokeWidth={1.2} />
            <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              You haven't added any printing orders yet.
            </p>
            <Link
              to="/order"
              className="inline-flex items-center gap-3 bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-primary/90 text-lg shadow-md"
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

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* LEFT – Items list */}
            <div className="lg:col-span-8 space-y-6">
              {/* Customer info card */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Customer & Delivery Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
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
                    </p>
                  </div>
                  {deliveryType === 'courier' && customer.address && (
                    <>
                      <div className="sm:col-span-2">
                        <span className="text-muted-foreground block">Address</span>
                        <p className="font-medium">{customer.address}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">Pincode / City</span>
                        <p className="font-medium">
                          {customer.pincode} {customer.city ? `, ${customer.city}` : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground block">State</span>
                        <p className="font-medium">{customer.state || '—'}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Order Items */}
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
                      </div>

                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <h3 className="font-bold text-lg md:text-xl leading-tight">
                            {itemTitle}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 p-1.5 -mr-1.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="text-sm text-muted-foreground mb-4 space-y-1">
                          <p className="font-medium">
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
                                    ({(f.size / 1024 / 1024).toFixed(1)} MB)
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

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
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            {/* If you passed grandTotal per item, show it – otherwise placeholder */}
                            {/* <div className="text-xl font-black text-primary"> */}
                              {/* ₹{(item.copies * 100).toFixed(2)} 
                            </div> */}
                            {/* <div className="text-xs text-muted-foreground">
                              per copy price example
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

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
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Link
                    to="/payment"
                    className="block w-full bg-primary text-white font-bold text-center py-4 rounded-xl hover:bg-primary/90 transition-all shadow-md text-lg flex items-center justify-center gap-2.5"
                  >
                    Proceed to Checkout <ArrowRight className="h-5 w-5" />
                  </Link>

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

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

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
//             </p>
//           </div>
//         </div>
//       </section>

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
//               </div>
//             </div>
//           </div>
//         </div>
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
//       </section>

//       <Footer />
//     </div>
//   );
// }