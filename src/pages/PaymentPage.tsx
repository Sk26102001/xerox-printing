// // src/pages/order/PaymentPage.tsx
// import { Link, useNavigate } from 'react-router-dom';
// import { useCartStore } from '@/store/cartStore'; // Adjust path if your store is elsewhere
// import {
//   CreditCard,
//   IndianRupee,
//   ArrowLeft,
//   CheckCircle,
//   Info,
//   Shield,
//   Truck,
//   Package,
//   AlertCircle,
//   ArrowRight,
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// export default function PaymentPage() {
//   const navigate = useNavigate();

//   // Pull real cart data from Zustand store
//   const items = useCartStore((state) => state.items);
//   const subtotal = useCartStore((state) => state.subtotal());

//   // Delivery type – for now hardcoded (you can add to store later)
//   const deliveryType: 'pickup' | 'courier' = 'courier'; // ← change as needed or pull from state

//   // Calculate final totals
//   const gst = subtotal * 0.05;
//   const shipping = deliveryType === 'courier' ? 80 : 0; // example: ₹80 for courier
//   const grandTotal = subtotal + gst + shipping;

//   const handlePayNow = () => {
//     // Placeholder for real Razorpay integration
//     alert(
//       `Initiating secure payment of ₹${grandTotal.toFixed(
//         2
//       )} via Razorpay...\n\nOrder ID will be generated on successful payment.`
//     );

//     // In real implementation:
//     // 1. Create Razorpay order via your backend API
//     // 2. Open Razorpay checkout
//     // 3. On success → clear cart, show success page
//     // Example skeleton:
//     /*
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY,
//       amount: Math.round(grandTotal * 100),
//       currency: 'INR',
//       name: 'BookPrinters.in',
//       description: `Payment for ${items.length} print job${items.length > 1 ? 's' : ''}`,
//       handler: (response) => {
//         console.log('Payment successful:', response);
//         useCartStore.getState().clearCart();
//         navigate('/order/success');
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//     */
//   };

//   // Empty cart protection
//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="flex items-center justify-center min-h-[70vh] px-4">
//           <div className="text-center max-w-md">
//             <AlertCircle className="h-20 w-20 text-amber-500 mx-auto mb-6" />
//             <h2 className="text-3xl font-black text-foreground mb-4">
//               Your Cart is Empty
//             </h2>
//             <p className="text-muted-foreground text-lg mb-10">
//               Please add printing items to your cart before proceeding to payment.
//             </p>
//             <Link
//               to="/order"
//               className="inline-flex items-center gap-3 bg-primary text-white font-bold px-10 py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 text-lg shadow-lg hover:shadow-xl"
//             >
//               Go to Order Page <ArrowRight className="h-5 w-5" />
//             </Link>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Progress Steps */}
//       <div className="bg-secondary py-6">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="flex items-center justify-between max-w-md mx-auto">
//             {[1, 2, 3, 4].map((step) => (
//               <div key={step} className="flex items-center flex-1">
//                 <div
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
//                     step === 4
//                       ? 'bg-primary text-white ring-2 ring-primary/30'
//                       : 'bg-gray-200 text-gray-600'
//                   }`}
//                 >
//                   {step}
//                 </div>
//                 {step < 4 && (
//                   <div className={`flex-1 h-1 mx-2 ${step < 4 ? 'bg-primary' : 'bg-gray-200'}`} />
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between mt-4 text-xs md:text-sm font-medium text-center text-muted-foreground">
//             <span>Upload & Options</span>
//             <span>Delivery Details</span>
//             <span>Review Order</span>
//             <span className="font-bold text-foreground">Payment</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Payment Form Section */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h2 className="text-2xl font-black text-white flex items-center gap-3">
//                   <CreditCard className="h-7 w-7" />
//                   Secure Payment
//                 </h2>
//                 <p className="text-white/80 mt-2 text-lg">
//                   Pay ₹{grandTotal.toFixed(2)} securely with Razorpay
//                 </p>
//               </div>

//               <div className="p-6 md:p-8">
//                 {/* Amount Highlight */}
//                 <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-10 text-center border border-primary/20 shadow-inner">
//                   <p className="text-muted-foreground text-base mb-3">Total Amount Due</p>
//                   <p className="text-5xl md:text-6xl font-black text-primary tracking-tight">
//                     ₹{grandTotal.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Inclusive of GST • {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </p>
//                 </div>

//                 {/* Payment Options */}
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-bold text-foreground mb-5">Select Payment Method</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets', 'EMI', 'Cash on Delivery'].map(
//                         (method) => (
//                           <button
//                             key={method}
//                             className="p-5 border-2 border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group shadow-sm hover:shadow-md"
//                           >
//                             <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
//                               {method.includes('UPI') ? 'UPI' : method.includes('Card') ? '💳' : method.includes('Net') ? '🏦' : '💰'}
//                             </div>
//                             <span className="text-base font-semibold group-hover:text-primary transition-colors">
//                               {method}
//                             </span>
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   {/* UPI – Most Popular */}
//                   <div className="bg-muted/40 rounded-2xl p-7 border border-border">
//                     <h4 className="font-bold text-xl text-foreground mb-4 flex items-center gap-3">
//                       <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//                         <path d="M13.5 7h-3v2H9v2h1.5v6h3v-6H15v-2h-1.5z" />
//                       </svg>
//                       Quick UPI Payment
//                     </h4>

//                     <input
//                       type="text"
//                       placeholder="yourname@upi"
//                       className="w-full px-5 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg mb-6"
//                     />

//                     <button
//                       onClick={handlePayNow}
//                       className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                     >
//                       Pay ₹{grandTotal.toFixed(2)} Now <CheckCircle className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {/* Demo Notice */}
//                   <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
//                     <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
//                     <p className="text-base text-amber-800">
//                       This is a demo payment interface. In production, clicking "Pay Now" will open the real Razorpay checkout window.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Back Navigation */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate(-1)} // or '/order/review'
//                 className="flex-1 border-2 border-border text-foreground font-semibold py-5 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 text-lg"
//               >
//                 <ArrowLeft className="h-5 w-5" /> Back to Review
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-2xl border border-border sticky top-6 overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h3 className="text-xl font-black text-white flex items-center gap-3">
//                   <Package className="h-6 w-6" />
//                   Order Summary
//                 </h3>
//               </div>

//               <div className="p-6 space-y-5 text-base">
//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Items in Cart</span>
//                   <span className="font-semibold text-foreground">{items.length}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Delivery Method</span>
//                   <span className="font-semibold text-foreground">
//                     {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </span>
//                 </div>

//                 <div className="border-t border-border pt-5 mt-2 space-y-4">
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>GST (5%)</span>
//                     <span>₹{gst.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Shipping</span>
//                     <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
//                       {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-2xl font-black pt-4 border-t">
//                     <span className="text-foreground">Total Payable</span>
//                     <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="pt-6 text-sm text-muted-foreground text-center space-y-3">
//                   <div className="flex items-center justify-center gap-2">
//                     <Shield className="h-5 w-5 text-primary" />
//                     <span>100% Secure & Encrypted Payment</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <Truck className="h-5 w-5 text-primary" />
//                     <span>Pan-India Delivery • Official GST Invoice</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }


<<<<<<< HEAD












// // src/pages/order/PaymentPage.tsx
// import { Link, useNavigate } from 'react-router-dom';
// import { useCartStore } from '@/store/cartStore';
// import {
//   CreditCard,
//   IndianRupee,
//   ArrowLeft,
//   CheckCircle,
//   Info,
//   Shield,
//   Truck,
//   Package,
//   AlertCircle,
//   ArrowRight,
// } from 'lucide-react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// export default function PaymentPage() {
//   const navigate = useNavigate();

//   // Real cart data
//   const realItems = useCartStore((state) => state.items);
//   const realSubtotal = useCartStore((state) => state.subtotal());

//   // Use real data if available, otherwise fallback to dummy
//   const useDummy = realItems.length === 0;

//   const items = useDummy ? [
//     {
//       id: 'dummy-1',
//       title: 'Black & White Book Printing (A4)',
//       pages: 280,
//       copies: 5,
//       calculatedPrice: { grandTotal: 420 },
//       paperSize: 'A4',
//       printColor: 'bw',
//       printSide: 'double',
//       bindingType: 'perfect_glue',
//     },
//     {
//       id: 'dummy-2',
//       title: 'Color Textbook with Glossy Cover (6×9)',
//       pages: 180,
//       copies: 3,
//       calculatedPrice: { grandTotal: 1150 },
//       paperSize: '6x9',
//       printColor: 'color',
//       printSide: 'double',
//       bindingType: 'hard_bound',
//     },
//   ] : realItems;

//   const subtotal = useDummy ? items.reduce((sum, item) => sum + (item.calculatedPrice?.grandTotal || 0) * item.copies, 0) : realSubtotal;

//   // Delivery type – hardcoded for demo (you can make dynamic later)
//   const deliveryType: 'pickup' | 'courier' = 'courier';

//   // Dummy personal info (shown only in dummy mode)
//   const name = useDummy ? 'Sushant Kumar' : '';
//   const phone = useDummy ? '+91 98765 43210' : '';

//   const gst = subtotal * 0.05;
//   const shipping = deliveryType === 'courier' ? 80 : 0;
//   const grandTotal = subtotal + gst + shipping;

//   const handlePayNow = () => {
//     alert(
//       `Processing payment of ₹${grandTotal.toFixed(2)} via Razorpay...\n\n` +
//       `Order ID: BP${Date.now().toString().slice(-8)}\n` +
//       (useDummy ? '(This is demo data – real payment would use actual order)' : '')
//     );
//     // Real Razorpay code can go here later
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* Progress Steps */}
//       <section className="relative bg-secondary py-12 md:py-24">
//   <div className="absolute inset-0 opacity-5 pointer-events-none">
//     <div
//       className="absolute inset-0"
//       style={{
//         backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
//         backgroundSize: '20px 20px',
//       }}
//     />
//   </div>

//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
//     <div className="text-center">
//       <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
//         <CreditCard className="h-5 w-5 text-primary" />
//         Secure Payment
//       </div>
//       <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
//         Complete Your Payment
//       </h1>
//       <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
//         Review your order total and pay securely with Razorpay — your prints will be processed immediately after confirmation.
//       </p>
//     </div>
//   </div>
// </section>


//       {/* Main Content */}
//       <div className="max-w-6xl mx-auto px-4 py-12">
//         {useDummy && (
//           <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800">
//             <Info className="h-5 w-5 inline mr-2" />
//             <strong>Demo Mode Active:</strong> Showing dummy order data (real cart is empty)
//           </div>
//         )}

//         <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Payment Section */}
//           <div className="lg:col-span-2 space-y-8">
//             <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h2 className="text-2xl font-black text-white flex items-center gap-3">
//                   <CreditCard className="h-7 w-7" />
//                   Secure Payment
//                 </h2>
//                 <p className="text-white/80 mt-2 text-lg">
//                   Pay ₹{grandTotal.toFixed(2)} securely with Razorpay
//                 </p>
//               </div>

//               <div className="p-6 md:p-8">
//                 {/* Amount Highlight */}
//                 <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-10 text-center border border-primary/20 shadow-inner">
//                   <p className="text-muted-foreground text-base mb-3">Amount to Pay</p>
//                   <p className="text-5xl md:text-6xl font-black text-primary tracking-tight">
//                     ₹{grandTotal.toFixed(2)}
//                   </p>
//                   <p className="text-sm text-muted-foreground mt-4">
//                     Inclusive of GST • {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </p>
//                 </div>

//                 {/* Payment Methods */}
//                 <div className="space-y-8">
//                   <div>
//                     <h3 className="text-xl font-bold text-foreground mb-5">Select Payment Method</h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets', 'EMI', 'Cash on Delivery'].map(
//                         (method) => (
//                           <button
//                             key={method}
//                             className="p-5 border-2 border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group shadow-sm hover:shadow-md"
//                           >
//                             <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
//                               {method.includes('UPI') ? 'UPI' : method.includes('Card') ? '💳' : method.includes('Net') ? '🏦' : '💰'}
//                             </div>
//                             <span className="text-base font-semibold group-hover:text-primary transition-colors">
//                               {method}
//                             </span>
//                           </button>
//                         )
//                       )}
//                     </div>
//                   </div>

//                   {/* UPI Quick Pay */}
//                   <div className="bg-muted/40 rounded-2xl p-7 border border-border">
//                     <h4 className="font-bold text-xl text-foreground mb-4 flex items-center gap-3">
//                       <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
//                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
//                         <path d="M13.5 7h-3v2H9v2h1.5v6h3v-6H15v-2h-1.5z" />
//                       </svg>
//                       Quick UPI Payment
//                     </h4>

//                     <input
//                       type="text"
//                       placeholder="yourname@upi"
//                       className="w-full px-5 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg mb-6"
//                     />

//                     <button
//                       onClick={handlePayNow}
//                       className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
//                     >
//                       Pay ₹{grandTotal.toFixed(2)} Now <CheckCircle className="h-6 w-6" />
//                     </button>
//                   </div>

//                   {/* Demo Notice */}
//                   <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
//                     <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
//                     <p className="text-base text-amber-800">
//                       This is a demo payment interface. In production, clicking "Pay Now" will open the real Razorpay checkout window.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Back Navigation */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex-1 border-2 border-border text-foreground font-semibold py-5 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 text-lg"
//               >
//                 <ArrowLeft className="h-5 w-5" /> Back to Review
//               </button>
//             </div>
//           </div>

//           {/* Order Summary Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-2xl border border-border sticky top-6 overflow-hidden">
//               <div className="bg-secondary px-6 py-6">
//                 <h3 className="text-xl font-black text-white flex items-center gap-3">
//                   <Package className="h-6 w-6" />
//                   Order Summary
//                 </h3>
//               </div>

//               <div className="p-6 space-y-5 text-base">
//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Items in Order</span>
//                   <span className="font-semibold text-foreground">{items.length}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Name</span>
//                   <span className="font-medium truncate max-w-[60%]">{name || '—'}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Phone</span>
//                   <span className="font-medium">{phone || '—'}</span>
//                 </div>

//                 <div className="flex justify-between text-muted-foreground">
//                   <span>Delivery</span>
//                   <span className="font-medium">
//                     {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
//                   </span>
//                 </div>

//                 <div className="border-t border-border pt-5 mt-2 space-y-4">
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>GST (5%)</span>
//                     <span>₹{gst.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-muted-foreground">
//                     <span>Shipping</span>
//                     <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
//                       {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
//                     </span>
//                   </div>
//                   <div className="flex justify-between text-2xl font-black pt-4 border-t">
//                     <span className="text-foreground">Total Payable</span>
//                     <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 <div className="pt-6 text-sm text-muted-foreground text-center space-y-3">
//                   <div className="flex items-center justify-center gap-2">
//                     <Shield className="h-5 w-5 text-primary" />
//                     <span>100% Secure & Encrypted Payment</span>
//                   </div>
//                   <div className="flex items-center justify-center gap-2">
//                     <Truck className="h-5 w-5 text-primary" />
//                     <span>Pan-India Delivery • Official GST Invoice</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState<{
//         orderId: string;
//         amount: number;
//         orderNumber?: string;
//     }>({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });
    
//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     useEffect(() => {
//         // Get data from location state
//         const state = location.state as CheckoutPageProps;
        
//         console.log('CheckoutPage - Location state:', state);
        
//         if (state && state.orderId && state.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber
//             });
//             setLoading(false);
//         } else {
//             // Try to get from localStorage if not in state
//             // const savedOrder = localStorage.getItem('pendingOrder');
//             // if (savedOrder) {
//             //     const parsedOrder = JSON.parse(savedOrder);
//             //     if (parsedOrder.orderId && parsedOrder.amount) {
//             //         setOrderData(parsedOrder);
//             //         setLoading(false);
//             //         return;
//             //     }
//             // }

//             if (state && state.orderId && state.amount) {
//     setOrderData({
//         orderId: state.orderId,
//         amount: state.amount,
//         orderNumber: state.orderNumber
//     });
//     setLoading(false);
// } else {
//     console.error('❌ No order data found');
//     navigate('/cart', { replace: true });
// }
            
//             // No order data, redirect to cart
//             console.error('No order data found');
//             navigate('/cart', { 
//                 replace: true,
//                 state: { error: 'No payment information found. Please try again.' }
//             });
//         }
//     }, [location, navigate]);





//     useEffect(() => {
//     if (!orderData.orderId) return;

//     const checkStatus = async () => {
//         try {
//             const res = await getPaymentStatus(orderData.orderId);

//             // 👉 ONLY proceed if payment exists
//             if (!res) {
//                 console.log("Payment not created yet");
//                 return;
//             }

//             console.log("Payment status:", res.payment.status);
//         } catch (error) {
//             console.log("Status check skipped");
//         }
//     };

//     // 👉 delay to allow backend payment creation
//     const timer = setTimeout(checkStatus, 3000);

//     return () => clearTimeout(timer);

// }, [orderData.orderId]);

// //     useEffect(() => {
// //     // if (!orderData.orderId) return; // ✅ IMPORTANT FIX
// // if (!orderData.orderId || orderData.orderId.length < 10) return;
// //     const checkStatus = async () => {
// //         try {
// //             await getPaymentStatus(orderData.orderId);
// //         } catch (error) {
// //             console.error("Error checking payment status:", error);
// //         }
// //     };

// //     checkStatus();
// // }, [orderData.orderId]);

//     // useEffect(() => {
//     //     // Check payment status if we have orderId
//     //     if (orderData.orderId) {
//     //         const checkStatus = async () => {
//     //             try {
//     //                 await getPaymentStatus(orderData.orderId);
//     //             } catch (error) {
//     //                 console.error('Error checking payment status:', error);
//     //             }
//     //         };
//     //         checkStatus();
//     //     }
//     // }, [orderData.orderId, getPaymentStatus]);

//     const handlePaymentSuccess = (paymentId: string, orderId: string) => {
//         setPaymentCompleted(true);
//         console.log('Payment successful:', { paymentId, orderId });
//         // Clear pending order from localStorage
//         localStorage.removeItem('pendingOrder');
//     };

//     const handlePaymentError = (error: any) => {
//         console.error('Payment error:', error);
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//     };

//     const handleContactSupport = () => {
//         navigate('/contact');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading payment details...</p>
//                 </div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     // Determine if payment is already completed
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;
    
//     // Determine if payment button should be shown
//     const shouldShowPaymentButton = !isPaymentCompleted && (
//         !paymentStatus || 
//         paymentStatus === 'created' || 
//         paymentStatus === 'attempted' || 
//         paymentStatus === 'failed'
//     );
    
//     // Determine if payment status should be shown
//     const shouldShowPaymentStatus = paymentStatus && paymentStatus !== 'paid';

//     if (isPaymentCompleted) {
//         return (
//             <div className="max-w-md mx-auto mt-10">
//                 <PaymentStatus
//                     status="paid"
//                     amount={amount}
//                     paymentId={paymentDetails?.razorpayPaymentId}
//                     orderNumber={orderNumber}
//                 />
//                 <div className="mt-6 text-center">
//                     <button
//                         onClick={() => navigate('/history')}
//                         className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                     >
//                         View My Orders
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto mt-10 px-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
//                     <div className="mb-6">
//                         <div className="border-b pb-4 mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Order Number:</span>
//                                     <span className="font-medium">{orderNumber || 'N/A'}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Amount:</span>
//                                     <span className="text-xl font-bold text-purple-600">
//                                         ₹{amount.toFixed(2)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {shouldShowPaymentStatus && (
//                             <div className="mb-6">
//                                 <PaymentStatus
//                                     status={paymentStatus}
//                                     amount={amount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={handleContactSupport}
//                                 />
//                             </div>
//                         )}

//                         {shouldShowPaymentButton && (
//                             <div className="mt-6">
//                                 <RazorpayButton
//                                     orderId={orderId}
//                                     amount={amount}
//                                     onSuccess={handlePaymentSuccess}
//                                     onError={handlePaymentError}
//                                     buttonText="Pay with Razorpay"
//                                 />
//                             </div>
//                         )}

//                         <div className="mt-4 text-center text-sm text-gray-500">
//                             <p>Secure payment powered by Razorpay</p>
//                             <p className="mt-1">All major credit/debit cards, UPI, and net banking accepted</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;






// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState<{
//         orderId: string;
//         amount: number;
//         orderNumber?: string;
//     }>({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });
    
//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Get order data from location state or localStorage
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
        
//         console.log('PaymentPage - Location state:', state);
        
//         if (state && state.orderId && state.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber
//             });
//             setLoading(false);
//         } else {
//             // Try to get from localStorage
//             const savedOrder = localStorage.getItem('pendingOrder');
//             if (savedOrder) {
//                 try {
//                     const parsedOrder = JSON.parse(savedOrder);
//                     if (parsedOrder.orderId && parsedOrder.amount) {
//                         setOrderData(parsedOrder);
//                         setLoading(false);
//                         return;
//                     }
//                 } catch (e) {
//                     console.error('Error parsing saved order:', e);
//                 }
//             }
            
//             // No order data, redirect to cart
//             console.error('❌ No order data found');
//             toast.error('No payment information found. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // Check payment status periodically
//     useEffect(() => {
//         // if (!orderData.orderId) return;

//         let isMounted = true;
//         let intervalId: NodeJS.Timeout;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
                
//                 if (!isMounted) return;
                
//                 if (res && res.success && res.payment.status === 'paid') {
//                     console.log('✅ Payment is paid!');
//                     setPaymentCompleted(true);
//                     localStorage.removeItem('pendingOrder');
                    
//                     // Show success message
//                     toast.success('Payment successful!');
                    
//                     // Auto redirect after 2 seconds
//                     setTimeout(() => {
//                         if (isMounted) {
//                             navigate('/history');
//                         }
//                     }, 2000);
//                 } else if (res && res.success && res.payment.status === 'failed') {
//                     console.log('❌ Payment failed');
//                     toast.error('Payment failed. Please try again.');
//                 } else if (!res) {
//                     // Payment not created yet - this is normal
//                     console.log('⏳ Waiting for payment creation...');
//                 }
//             } catch (error) {
//                 console.error('Error checking payment status:', error);
//             }
//         };

//         // Check immediately
//         checkStatus();
        
//         // Then check every 3 seconds
//         // intervalId = setInterval(checkStatus, 3000);
        
//         return () => {
//             isMounted = false;
//             if (intervalId) clearInterval(intervalId);
//         };
//     }, [orderData.orderId, getPaymentStatus, navigate]);

//     const handlePaymentSuccess = (paymentId: string, orderId: string) => {
//         console.log('Payment successful:', { paymentId, orderId });
        
//         // Clear pending order from localStorage
//         localStorage.removeItem('pendingOrder');
        
//         // Show success message
//         toast.success('Payment successful! Redirecting...');
        
//         // Set payment completed
//         setPaymentCompleted(true);
        
//         // Auto redirect after 2 seconds
//         setTimeout(() => {
//             navigate('/history');
//         }, 2000);
//     };

//     const handlePaymentError = (error: any) => {
//         console.error('Payment error:', error);
//         toast.error('Payment failed. Please try again.');
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//     };

//     const handleContactSupport = () => {
//         navigate('/contact');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading payment details...</p>
//                 </div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     // Determine if payment is already completed
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;
    
//     // Determine if payment button should be shown
//     const shouldShowPaymentButton = !isPaymentCompleted && (
//         !paymentStatus || 
//         paymentStatus === 'created' || 
//         paymentStatus === 'attempted' || 
//         paymentStatus === 'failed'
//     );
    
//     // Determine if payment status should be shown
//     const shouldShowPaymentStatus = paymentStatus && paymentStatus !== 'paid' && !paymentCompleted;

//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={amount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 text-center flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                         >
//                             View My Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
//                         >
//                             Place New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto px-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
//                     <div className="mb-6">
//                         <div className="border-b pb-4 mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Order Number:</span>
//                                     <span className="font-medium">{orderNumber || 'N/A'}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Amount:</span>
//                                     <span className="text-xl font-bold text-purple-600">
//                                         ₹{amount.toFixed(2)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {shouldShowPaymentStatus && (
//                             <div className="mb-6">
//                                 <PaymentStatus
//                                     status={paymentStatus as any}
//                                     amount={amount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={handleContactSupport}
//                                 />
//                             </div>
//                         )}

//                         {shouldShowPaymentButton && (
//                             <div className="mt-6">
//                                 <RazorpayButton
//                                     orderId={orderId}
//                                     amount={amount}
//                                     onSuccess={handlePaymentSuccess}
//                                     onError={handlePaymentError}
//                                     buttonText="Pay with Razorpay"
//                                 />
//                             </div>
//                         )}

//                         <div className="mt-4 text-center text-sm text-gray-500">
//                             <p>Secure payment powered by Razorpay</p>
//                             <p className="mt-1">All major credit/debit cards, UPI, and net banking accepted</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;




// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { RazorpayButton } from '../components/RazorpayButton';
// import { PaymentStatus } from '../components/PaymentStatus';
// import { usePayment } from '../hooks/usePayment';
// import { toast } from 'sonner';
// import { createShipment } from "../api/shippingApi";

// interface CheckoutPageProps {
//     orderId?: string;
//     amount?: number;
//     orderNumber?: string;
// }

// const PaymentPage: React.FC<CheckoutPageProps> = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);
//     const [orderData, setOrderData] = useState<{
//         orderId: string;
//         amount: number;
//         orderNumber?: string;
//     }>({
//         orderId: '',
//         amount: 0,
//         orderNumber: ''
//     });
    
//     const [paymentCompleted, setPaymentCompleted] = useState(false);
//     const [paymentInitiated, setPaymentInitiated] = useState(false); // ✅ Track if payment was initiated
//     const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);
    
//     const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

//     // Get order data from location state or localStorage
//     useEffect(() => {
//         const state = location.state as CheckoutPageProps;
        
//         console.log('PaymentPage - Location state:', state);
        
//         if (state && state.orderId && state.amount) {
//             setOrderData({
//                 orderId: state.orderId,
//                 amount: state.amount,
//                 orderNumber: state.orderNumber
//             });
//             setLoading(false);
//         } else {
//             // Try to get from localStorage
//             const savedOrder = localStorage.getItem('pendingOrder');
//             if (savedOrder) {
//                 try {
//                     const parsedOrder = JSON.parse(savedOrder);
//                     if (parsedOrder.orderId && parsedOrder.amount) {
//                         setOrderData(parsedOrder);
//                         setLoading(false);
//                         return;
//                     }
//                 } catch (e) {
//                     console.error('Error parsing saved order:', e);
//                 }
//             }
            
//             // No order data, redirect to cart
//             console.error('❌ No order data found');
//             toast.error('No payment information found. Please try again.');
//             navigate('/cart', { replace: true });
//         }
//     }, [location, navigate]);

//     // ✅ ONLY check payment status AFTER payment has been initiated
//     useEffect(() => {
//         if (!orderData.orderId || !paymentInitiated) return;

//         let isMounted = true;

//         const checkStatus = async () => {
//             try {
//                 const res = await getPaymentStatus(orderData.orderId);
                
//                 if (!isMounted) return;
                
//                 if (res && res.success && res.payment.status === 'paid') {
//                     console.log('✅ Payment is paid!');
//                     setPaymentCompleted(true);
//                     localStorage.removeItem('pendingOrder');
                    
//                     // Stop checking once paid
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
                    
//                     toast.success('Payment successful!');
                    
//                     // Auto redirect after 2 seconds
//                     setTimeout(() => {
//                         if (isMounted) {
//                             navigate('/history');
//                         }
//                     }, 2000);
//                 } else if (res && res.success && res.payment.status === 'failed') {
//                     console.log('❌ Payment failed');
//                     toast.error('Payment failed. Please try again.');
                    
//                     // Stop checking if failed
//                     if (statusCheckIntervalRef.current) {
//                         clearInterval(statusCheckIntervalRef.current);
//                         statusCheckIntervalRef.current = null;
//                     }
//                 } else {
//                     console.log('⏳ Waiting for payment completion...');
//                 }
//             } catch (error) {
//                 console.error('Error checking payment status:', error);
//             }
//         };

//         // Start checking only after payment is initiated
//         // Check every 3 seconds
//         statusCheckIntervalRef.current = setInterval(checkStatus, 3000);
        
//         return () => {
//             isMounted = false;
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//                 statusCheckIntervalRef.current = null;
//             }
//         };
//     }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

//     // Cleanup on unmount
//     useEffect(() => {
//         return () => {
//             if (statusCheckIntervalRef.current) {
//                 clearInterval(statusCheckIntervalRef.current);
//             }
//         };
//     }, []);

//     const handlePaymentSuccess = (paymentId: string, orderId: string) => {
//         console.log('Payment successful:', { paymentId, orderId });
        
//         // Clear pending order from localStorage
//         localStorage.removeItem('pendingOrder');
        
//         // Show success message
//         toast.success('Payment successful! Redirecting...');
        
//         // Set payment completed
//         setPaymentCompleted(true);
        
//         // Stop checking
//         if (statusCheckIntervalRef.current) {
//             clearInterval(statusCheckIntervalRef.current);
//             statusCheckIntervalRef.current = null;
//         }
        
//         // Auto redirect after 2 seconds
//         setTimeout(() => {
//             navigate('/history');
//         }, 2000);
//     };

//     const handlePaymentInitiated = () => {
//         // ✅ Mark that payment has been initiated - now we can start checking status
//         console.log('Payment initiated, starting status check...');
//         setPaymentInitiated(true);
//     };

//     const handlePaymentError = (error: any) => {
//         console.error('Payment error:', error);
//         toast.error('Payment failed. Please try again.');
//         setPaymentInitiated(false); // Reset on error
//     };

//     const handleRetry = () => {
//         resetPaymentState();
//         setPaymentCompleted(false);
//         setPaymentInitiated(false); // Reset payment initiated flag
//     };

//     const handleContactSupport = () => {
//         navigate('/contact');
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
//                     <p className="mt-4 text-gray-600">Loading payment details...</p>
//                 </div>
//             </div>
//         );
//     }

//     const { orderId, amount, orderNumber } = orderData;

//     // Determine if payment is already completed
//     const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;
    
//     // Determine if payment button should be shown
//     const shouldShowPaymentButton = !isPaymentCompleted && !paymentInitiated && (
//         !paymentStatus || 
//         paymentStatus === 'created' || 
//         paymentStatus === 'attempted' || 
//         paymentStatus === 'failed'
//     );
    
//     // Show waiting state after payment initiated but before completed
//     const shouldShowWaitingState = paymentInitiated && !isPaymentCompleted;
    
//     // Determine if payment status should be shown
//     const shouldShowPaymentStatus = paymentStatus && paymentStatus !== 'paid' && !paymentCompleted && !paymentInitiated;

//     if (isPaymentCompleted) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto">
//                     <PaymentStatus
//                         status="paid"
//                         amount={amount}
//                         paymentId={paymentDetails?.razorpayPaymentId}
//                         orderNumber={orderNumber}
//                     />
//                     <div className="mt-6 text-center flex gap-4 justify-center">
//                         <button
//                             onClick={() => navigate('/history')}
//                             className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
//                         >
//                             View My Orders
//                         </button>
//                         <button
//                             onClick={() => navigate('/order')}
//                             className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
//                         >
//                             Place New Order
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (shouldShowWaitingState) {
//         return (
//             <div className="min-h-screen bg-gray-50 py-10">
//                 <div className="max-w-md mx-auto px-4">
//                     <div className="bg-white rounded-lg shadow-lg p-6 text-center">
//                         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
//                         <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing Payment</h3>
//                         <p className="text-gray-600 mb-4">
//                             Please complete the payment in the Razorpay window.
//                         </p>
//                         <p className="text-sm text-gray-500">
//                             Waiting for payment confirmation...
//                         </p>
//                         <button
//                             onClick={handleRetry}
//                             className="mt-6 text-purple-600 hover:text-purple-700 text-sm"
//                         >
//                             Cancel and try again
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-10">
//             <div className="max-w-md mx-auto px-4">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
                    
//                     <div className="mb-6">
//                         <div className="border-b pb-4 mb-4">
//                             <h3 className="text-lg font-semibold text-gray-700">Order Summary</h3>
//                             <div className="mt-2 space-y-2">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Order Number:</span>
//                                     <span className="font-medium">{orderNumber || 'N/A'}</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Total Amount:</span>
//                                     <span className="text-xl font-bold text-purple-600">
//                                         ₹{amount.toFixed(2)}
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>

//                         {shouldShowPaymentStatus && (
//                             <div className="mb-6">
//                                 <PaymentStatus
//                                     status={paymentStatus as any}
//                                     amount={amount}
//                                     paymentId={paymentDetails?.razorpayPaymentId}
//                                     orderNumber={orderNumber}
//                                     onRetry={handleRetry}
//                                     onContactSupport={handleContactSupport}
//                                 />
//                             </div>
//                         )}

//                         {shouldShowPaymentButton && (
//                             <div className="mt-6">
//                                 <RazorpayButton
//                                     orderId={orderId}
//                                     amount={amount}
//                                     onSuccess={handlePaymentSuccess}
//                                     onError={handlePaymentError}
//                                     onPaymentInitiated={handlePaymentInitiated}
//                                     buttonText="Pay with Razorpay"
//                                 />
//                             </div>
//                         )}

//                         <div className="mt-4 text-center text-sm text-gray-500">
//                             <p>Secure payment powered by Razorpay</p>
//                             <p className="mt-1">All major credit/debit cards, UPI, and net banking accepted</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PaymentPage;




import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RazorpayButton } from '../components/RazorpayButton';
import { PaymentStatus } from '../components/PaymentStatus';
import { usePayment } from '../hooks/usePayment';
import { toast } from 'sonner';
import apiClient from "../api/apiClient";

interface CheckoutPageProps {
    orderId?: string;
    amount?: number;
    orderNumber?: string;
}

const PaymentPage: React.FC<CheckoutPageProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [orderData, setOrderData] = useState({
        orderId: '',
        amount: 0,
        orderNumber: ''
    });

    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    const statusCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const { paymentStatus, paymentDetails, getPaymentStatus, resetPaymentState } = usePayment();

    // ✅ Get order data (NO localStorage)
    useEffect(() => {
        const state = location.state as CheckoutPageProps;

        if (state?.orderId && state?.amount) {
            setOrderData({
                orderId: state.orderId,
                amount: state.amount,
                orderNumber: state.orderNumber || ''
            });
            setLoading(false);
        } else {
            toast.error('Session expired. Please try again.');
            navigate('/cart', { replace: true });
        }
    }, [location, navigate]);

    // ✅ Payment Status Polling
    useEffect(() => {
        if (!orderData.orderId || !paymentInitiated) return;

        let isMounted = true;

        const checkStatus = async () => {
            try {
                const res = await getPaymentStatus(orderData.orderId);

                if (!isMounted) return;

                if (res?.success && res.payment.status === 'paid') {
                    setPaymentCompleted(true);

                    if (statusCheckIntervalRef.current) {
                        clearInterval(statusCheckIntervalRef.current);
                        statusCheckIntervalRef.current = null;
                    }

                    toast.success('Payment successful!');

                    setTimeout(() => {
                        if (isMounted) navigate('/history');
                    }, 2000);
                }

                if (res?.success && res.payment.status === 'failed') {
                    toast.error('Payment failed');

                    if (statusCheckIntervalRef.current) {
                        clearInterval(statusCheckIntervalRef.current);
                        statusCheckIntervalRef.current = null;
                    }
                }

            } catch (error) {
                console.error('Status check error:', error);
            }
        };

        statusCheckIntervalRef.current = setInterval(checkStatus, 3000);

        return () => {
            isMounted = false;
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
            }
        };
    }, [orderData.orderId, paymentInitiated, getPaymentStatus, navigate]);

    // ✅ Cleanup
    useEffect(() => {
        return () => {
            if (statusCheckIntervalRef.current) {
                clearInterval(statusCheckIntervalRef.current);
            }
        };
    }, []);

    // ✅ PRODUCTION PAYMENT SUCCESS
const handlePaymentSuccess = async (response: any) => {
    try {
        console.log("Razorpay Response:", response);

        await apiClient.post('/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
        });

        toast.success('Payment verified & order confirmed!');

        setPaymentCompleted(true);

        if (statusCheckIntervalRef.current) {
            clearInterval(statusCheckIntervalRef.current);
            statusCheckIntervalRef.current = null;
        }

        setTimeout(() => {
            navigate('/history');
        }, 2000);

    } catch (error) {
        console.error("Verification failed:", error);
        toast.error("Payment verification failed!");
    }
};

    const handlePaymentInitiated = () => {
        setPaymentInitiated(true);
    };

    const handlePaymentError = () => {
        toast.error('Payment failed. Try again.');
        setPaymentInitiated(false);
    };

    const handleRetry = () => {
        resetPaymentState();
        setPaymentCompleted(false);
        setPaymentInitiated(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-12 w-12 border-b-2 border-purple-600 rounded-full"></div>
            </div>
        );
    }

    const { orderId, amount, orderNumber } = orderData;

    const isPaymentCompleted = paymentStatus === 'paid' || paymentCompleted;

    const shouldShowPaymentButton =
        !isPaymentCompleted &&
        !paymentInitiated &&
        (!paymentStatus ||
            paymentStatus === 'created' ||
            paymentStatus === 'attempted' ||
            paymentStatus === 'failed');

    const shouldShowWaitingState = paymentInitiated && !isPaymentCompleted;

    const shouldShowPaymentStatus =
        paymentStatus && paymentStatus !== 'paid' && !paymentCompleted && !paymentInitiated;

    // ✅ SUCCESS UI
    if (isPaymentCompleted) {
        return (
            <div className="min-h-screen bg-gray-50 py-10">
                <div className="max-w-md mx-auto">
                    <PaymentStatus
                        status="paid"
                        amount={amount}
                        paymentId={paymentDetails?.razorpayPaymentId}
                        orderNumber={orderNumber}
                    />

                    <div className="mt-6 flex gap-4 justify-center">
                        <button
                            onClick={() => navigate('/history')}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg"
                        >
                            View Orders
                        </button>

                        <button
                            onClick={() => navigate('/order')}
                            className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg"
                        >
                            New Order
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ✅ WAITING UI
    if (shouldShowWaitingState) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-16 w-16 border-b-2 border-purple-600 rounded-full mx-auto"></div>
                    <p className="mt-4">Waiting for payment confirmation...</p>

                    <button
                        onClick={handleRetry}
                        className="mt-4 text-purple-600"
                    >
                        Cancel & Retry
                    </button>
                </div>
            </div>
        );
    }

    // ✅ MAIN UI
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">

                <h2 className="text-2xl font-bold mb-6">Checkout</h2>

                <div className="mb-6">
                    <p><strong>Order:</strong> {orderNumber || 'N/A'}</p>
                    <p className="text-xl font-bold text-purple-600">₹{amount.toFixed(2)}</p>
                </div>

                {shouldShowPaymentStatus && (
                    <PaymentStatus
                        status={paymentStatus as any}
                        amount={amount}
                        paymentId={paymentDetails?.razorpayPaymentId}
                        orderNumber={orderNumber}
                        onRetry={handleRetry}
                    />
                )}

                {shouldShowPaymentButton && (
                    <RazorpayButton
                        orderId={orderId}
                        amount={amount}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onPaymentInitiated={handlePaymentInitiated}
                        buttonText="Pay Now"
                    />
                )}

                <p className="text-sm text-center text-gray-500 mt-4">
                    Secure payment powered by Razorpay
                </p>
            </div>
        </div>
    );
};

export default PaymentPage;
=======
// src/pages/order/PaymentPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import {
  CreditCard,
  IndianRupee,
  ArrowLeft,
  CheckCircle,
  Info,
  Shield,
  Truck,
  Package,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentPage() {
  const navigate = useNavigate();

  // Real cart data
  const realItems = useCartStore((state) => state.items);
  const realSubtotal = useCartStore((state) => state.subtotal());

  // Use real data if available, otherwise fallback to dummy
  const useDummy = realItems.length === 0;

  const items = useDummy ? [
    {
      id: 'dummy-1',
      title: 'Black & White Book Printing (A4)',
      pages: 280,
      copies: 5,
      calculatedPrice: { grandTotal: 420 },
      paperSize: 'A4',
      printColor: 'bw',
      printSide: 'double',
      bindingType: 'perfect_glue',
    },
    {
      id: 'dummy-2',
      title: 'Color Textbook with Glossy Cover (6×9)',
      pages: 180,
      copies: 3,
      calculatedPrice: { grandTotal: 1150 },
      paperSize: '6x9',
      printColor: 'color',
      printSide: 'double',
      bindingType: 'hard_bound',
    },
  ] : realItems;

  const subtotal = useDummy ? items.reduce((sum, item) => sum + (item.calculatedPrice?.grandTotal || 0) * item.copies, 0) : realSubtotal;

  // Delivery type – hardcoded for demo (you can make dynamic later)
  const deliveryType: 'pickup' | 'courier' = 'courier';

  // Dummy personal info (shown only in dummy mode)
  const name = useDummy ? 'Sushant Kumar' : '';
  const phone = useDummy ? '+91 98765 43210' : '';

  const gst = subtotal * 0.05;
  const shipping = deliveryType === 'courier' ? 80 : 0;
  const grandTotal = subtotal + gst + shipping;

  const handlePayNow = () => {
    alert(
      `Processing payment of ₹${grandTotal.toFixed(2)} via Razorpay...\n\n` +
      `Order ID: BP${Date.now().toString().slice(-8)}\n` +
      (useDummy ? '(This is demo data – real payment would use actual order)' : '')
    );
    // Real Razorpay code can go here later
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Progress Steps */}
      <section className="relative bg-secondary py-12 md:py-24">
  <div className="absolute inset-0 opacity-5 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }}
    />
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
    <div className="text-center">
      <div className="inline-flex items-center gap-2.5 bg-primary/15 text-white border border-primary/25 rounded-full px-5 py-2 text-sm font-semibold mb-5 mt-4">
        <CreditCard className="h-5 w-5 text-primary" />
        Secure Payment
      </div>
      <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
        Complete Your Payment
      </h1>
      <p className="text-white/75 text-lg mt-4 max-w-2xl mx-auto">
        Review your order total and pay securely with Razorpay — your prints will be processed immediately after confirmation.
      </p>
    </div>
  </div>
</section>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {useDummy && (
          <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl text-center text-amber-800">
            <Info className="h-5 w-5 inline mr-2" />
            <strong>Demo Mode Active:</strong> Showing dummy order data (real cart is empty)
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-border overflow-hidden">
              <div className="bg-secondary px-6 py-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <CreditCard className="h-7 w-7" />
                  Secure Payment
                </h2>
                <p className="text-white/80 mt-2 text-lg">
                  Pay ₹{grandTotal.toFixed(2)} securely with Razorpay
                </p>
              </div>

              <div className="p-6 md:p-8">
                {/* Amount Highlight */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-10 text-center border border-primary/20 shadow-inner">
                  <p className="text-muted-foreground text-base mb-3">Amount to Pay</p>
                  <p className="text-5xl md:text-6xl font-black text-primary tracking-tight">
                    ₹{grandTotal.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    Inclusive of GST • {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
                  </p>
                </div>

                {/* Payment Methods */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-5">Select Payment Method</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {['UPI', 'Credit / Debit Card', 'Net Banking', 'Wallets', 'EMI', 'Cash on Delivery'].map(
                        (method) => (
                          <button
                            key={method}
                            className="p-5 border-2 border-border rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group shadow-sm hover:shadow-md"
                          >
                            <div className="text-3xl mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                              {method.includes('UPI') ? 'UPI' : method.includes('Card') ? '💳' : method.includes('Net') ? '🏦' : '💰'}
                            </div>
                            <span className="text-base font-semibold group-hover:text-primary transition-colors">
                              {method}
                            </span>
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* UPI Quick Pay */}
                  <div className="bg-muted/40 rounded-2xl p-7 border border-border">
                    <h4 className="font-bold text-xl text-foreground mb-4 flex items-center gap-3">
                      <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        <path d="M13.5 7h-3v2H9v2h1.5v6h3v-6H15v-2h-1.5z" />
                      </svg>
                      Quick UPI Payment
                    </h4>

                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-5 py-4 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg mb-6"
                    />

                    <button
                      onClick={handlePayNow}
                      className="w-full bg-primary text-white font-bold py-5 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] text-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      Pay ₹{grandTotal.toFixed(2)} Now <CheckCircle className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Demo Notice */}
                  <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
                    <Info className="h-6 w-6 text-amber-600 shrink-0 mt-1" />
                    <p className="text-base text-amber-800">
                      This is a demo payment interface. In production, clicking "Pay Now" will open the real Razorpay checkout window.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Navigation */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 border-2 border-border text-foreground font-semibold py-5 rounded-xl hover:bg-muted transition-all duration-200 flex items-center justify-center gap-3 text-lg"
              >
                <ArrowLeft className="h-5 w-5" /> Back to Review
              </button>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-border sticky top-6 overflow-hidden">
              <div className="bg-secondary px-6 py-6">
                <h3 className="text-xl font-black text-white flex items-center gap-3">
                  <Package className="h-6 w-6" />
                  Order Summary
                </h3>
              </div>

              <div className="p-6 space-y-5 text-base">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items in Order</span>
                  <span className="font-semibold text-foreground">{items.length}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Name</span>
                  <span className="font-medium truncate max-w-[60%]">{name || '—'}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Phone</span>
                  <span className="font-medium">{phone || '—'}</span>
                </div>

                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span className="font-medium">
                    {deliveryType === 'courier' ? 'Courier Delivery' : 'Store Pickup'}
                  </span>
                </div>

                <div className="border-t border-border pt-5 mt-2 space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-green-600 font-semibold' : ''}>
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-black pt-4 border-t">
                    <span className="text-foreground">Total Payable</span>
                    <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-6 text-sm text-muted-foreground text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>100% Secure & Encrypted Payment</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Pan-India Delivery • Official GST Invoice</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
>>>>>>> 5eb1a3a3e4ec7d52cb2b00ac95ce3a0bf9e82905
