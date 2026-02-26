import { useState, useEffect, useRef } from 'react';
import { Link } from 
'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import {
  BookOpen, Printer, Copy, Layers, CheckCircle, Star, Users, Clock, Award,
  Upload, ChevronRight, ArrowRight, Instagram, Phone, Mail, MapPin,
  Calculator, FileText, Package, Truck, Shield
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  calculatePrice, paperTypeLabels, bindingLabels,
  type PaperSize, type PaperType, type PrintColor, type PrintSide, type BindingType
} from '@/lib/pricingData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Animated Counter Component
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Price Calculator Component
function PriceCalculator() {
  const [pages, setPages] = useState(100);
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState<PaperSize>('A4');
  const [paperType, setPaperType] = useState<PaperType>('70gsm_normal');
  const [printColor, setPrintColor] = useState<PrintColor>('bw');
  const [printSide, setPrintSide] = useState<PrintSide>('double');
  const [bindingType, setBindingType] = useState<BindingType>('perfect_glue');

  const result = calculatePrice({ pages, copies, paperSize, paperType, printColor, printSide, bindingType });

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-border">
      {/* Header */}
      <div className="bg-secondary px-6 py-5">
        <div className="flex items-center gap-3">
          <Calculator className="h-6 w-6 text-primary" />
          <div>
            <h3 className="text-white font-bold text-xl">Instant Price Calculator</h3>
            <p className="text-white/60 text-sm">Get accurate quote in seconds</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pages */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Number of Pages</label>
            <input
              type="number"
              min={1}
              value={pages}
              onChange={(e) => setPages(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Copies */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Number of Copies</label>
            <input
              type="number"
              min={1}
              value={copies}
              onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Paper Size */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Paper Size</label>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value as PaperSize)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              <option value="A4">A4 (210×297mm)</option>
              <option value="B5">B5 (176×250mm)</option>
              <option value="A5">A5 (148×210mm)</option>
              <option value="6x9">6×9 inch</option>
            </select>
          </div>

          {/* Paper Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Paper Type</label>
            <select
              value={paperType}
              onChange={(e) => setPaperType(e.target.value as PaperType)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              {Object.entries(paperTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Print Color */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Print Color</label>
            <div className="flex gap-2">
              {[
                { value: 'bw', label: 'B&W' },
                { value: 'color', label: 'Color' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPrintColor(opt.value as PrintColor)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    printColor === opt.value
                      ? 'bg-primary text-primary-foreground scale-95'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Print Side */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">Printing Side</label>
            <div className="flex gap-2">
              {[
                { value: 'double', label: 'Double' },
                { value: 'single', label: 'Single' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPrintSide(opt.value as PrintSide)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    printSide === opt.value
                      ? 'bg-primary text-primary-foreground scale-95'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Binding */}
          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-semibold text-foreground mb-1">Binding Type</label>
            <select
              value={bindingType}
              onChange={(e) => setBindingType(e.target.value as BindingType)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            >
              {Object.entries(bindingLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Result */}
        <div className="mt-6 bg-secondary rounded-xl p-5 text-white">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <p className="text-white/60 text-xs">Per Page</p>
              <p className="text-xl font-bold text-primary">₹{result.pricePerPage.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs">Printing Cost</p>
              <p className="text-xl font-bold">₹{result.printingCost.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs">Binding Cost</p>
              <p className="text-xl font-bold">₹{result.bindingCost.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-xs">GST (5%)</p>
              <p className="text-xl font-bold">₹{result.gst.toFixed(2)}</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-4 flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">Total Cost (incl. GST)</p>
              <p className="text-3xl font-black text-primary">₹{result.grandTotal.toFixed(2)}</p>
            </div>
            <Link
              to="/order"
              className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Order Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  useScrollAnimation();

  const services = [
    {
      icon: BookOpen,
      title: 'Book Printing / Bulk Order',
      desc: 'Professional book printing with multiple binding options. Perfect for novels, textbooks, manuals.Bulk orders welcome with best rates.',
      color: 'text-primary',
      bg: 'bg-primary/10',
      image: 'https://th.bing.com/th/id/OIP.SPfsh9dcGhBPtXGwsdnNOQHaEK?w=297&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3',
    },
    {
      icon: Copy,
      title: 'Xerox & Photocopying',
      desc: 'High-speed black & white and color photocopying. Bulk orders welcome with best rates.',
      color: 'text-primary',
      bg: 'bg-primary/10',
      image: 'https://th.bing.com/th/id/OIP.nKgEi2YnEHetY5_U_hV-AgHaEO?w=305&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3',
    },
    {
      icon: Printer,
      title: 'Digital Printing',
      desc: 'Vibrant full-color digital printing for brochures, flyers, reports and more.',
      color: 'text-primary',
      bg: 'bg-primary/10',
      image: 'https://th.bing.com/th/id/OIP.8ThIQw5qGIQ24hpINwLCOgHaEK?w=303&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3',
    },
    {
      icon: Layers,
      title: 'Binding Services',
      desc: 'Spiral, perfect glue, hardbound, centre staple — all binding types at the best prices.',
      color: 'text-primary',
      bg: 'bg-primary/10',
      image: 'https://th.bing.com/th/id/OIP.cmxBFsm9eIcwKbqUgj6dvAHaE5?w=242&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=1.3&pid=1.7&rm=3',
    },
    
  ];


  const stats = [
    { icon: Users, value: 10000, suffix: '+', label: 'Happy Customers' },
    { icon: BookOpen, value: 50000, suffix: '+', label: 'Books Printed' },
    { icon: Clock, value: 5, suffix: '+', label: 'Years Experience' },
    { icon: Star, value: 4, suffix: '.9★', label: 'Average Rating' },
  ];

  const steps = [
    { icon: Upload, step: '01', title: 'Upload File', desc: 'Upload your PDF, DOC or image file securely' },
    { icon: Calculator, step: '02', title: 'Choose Options', desc: 'Select paper size, type, binding and quantity' },
    { icon: Shield, step: '03', title: 'Pay Securely', desc: 'Pay using Razorpay — UPI, cards, net banking' },
    { icon: Package, step: '04', title: 'We Print', desc: 'Our expert team prints and binds your order' },
    { icon: Truck, step: '05', title: 'Delivery', desc: 'Pickup from store or courier to your doorstep' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-secondary min-h-screen flex items-center overflow-hidden pt-16">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Red accent shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-2 bg-primary/20 text-white border border-primary/30 rounded-full px-4 py-2 text-sm font-medium animate-slide-up"
              >
                <Star className="h-4 w-4 text-primary" />
                India's Most Trusted Printing Partner
              </div>
              <h1 className="animate-slide-up text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight" style={{ animationDelay: '0.1s' }}>
                Where Ideas
                <span className="block text-gradient-red">Ink Themselves</span>
              </h1>
              <p className="animate-slide-up text-white/70 text-lg leading-relaxed max-w-lg" style={{ animationDelay: '0.2s' }}>
                Professional book printing, Xerox, digital printing and binding services. Upload your file, choose options, and get your prints delivered — fast, affordable, high quality.
              </p>

              <div className="animate-slide-up flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.3s' }}>
                <Link
                  to="/order"
                  className="btn-pulse flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  Order Now <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#calculator"
                  className="flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all duration-200 hover:border-white"
                >
                  Get a Quote <Calculator className="h-5 w-5" />
                </a>
              </div>

              {/* Trust badges */}
              <div className="animate-fade-in flex flex-wrap items-center gap-4 " style={{ animationDelay: '0.5s' }}>
                {['GST Invoice', 'Razorpay Secure', 'Same Day Print', 'Free Delivery*'].map((badge) => (
                  <div key={badge} className="flex items-center gap-1.5 text-white/60 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Book graphic */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative animate-float">
                {/* Stack of books visual */}
                {/* <div className="relative w-72 h-80">
                  {[
                    { bg: 'bg-primary', top: '0', left: '30px', rotate: '-8deg', h: 'h-64', w: 'w-48' },
                    { bg: 'bg-secondary border-2 border-white/20', top: '20px', left: '0', rotate: '4deg', h: 'h-72', w: 'w-52' },
                    { bg: 'bg-primary/80', top: '10px', left: '60px', rotate: '-3deg', h: 'h-60', w: 'w-44' },
                  ].map((book, i) => (
                    <div
                      key={i}
                      className={`absolute ${book.bg} ${book.h} ${book.w} rounded-lg shadow-2xl`}
                      style={{ top: book.top, left: book.left, transform: `rotate(${book.rotate})` }}
                    >
                      <div className="h-full flex flex-col items-center justify-center gap-2 p-4">
                        <BookOpen className="h-8 w-8 text-white/40" />
                        <div className="space-y-1 w-full">
                          {[...Array(5)].map((_, j) => (
                            <div key={j} className="h-1.5 bg-white/20 rounded-full" style={{ width: `${70 + j * 5}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div> */}
                     <div className="hidden lg:block relative animate-float">
             <img
  src="/img1.jpeg"
  alt="Modern digital printing press in production"
  className="w-[800px] h-[300px] mx-auto rounded-2xl shadow-2xl object-cover border-8 border-white/10"
/>
              <div className="absolute -bottom-6 -right-6 bg-primary rounded-full p-5 shadow-xl animate-pulse">
                <Printer className="h-10 w-10 text-white" />
              </div>
            </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-white/40 text-xs">Scroll to explore</p>
          <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
        </div> */}
      </section>

      {/* Stats */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-6 w-6 text-white/60 mx-auto mb-2" />
                <p className="text-3xl font-black text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* Services Section */}

     
      {/* Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
              Everything You Need to Print
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From single page photocopies to bulk book printing — we handle it all with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <div
                key={service.title}
                className="animate-on-scroll card-hover bg-white rounded-xl overflow-hidden border border-border shadow-sm group cursor-pointer flex flex-col"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className={`${service.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{service.desc}</p>
                  <Link
                    to="/order"
                    className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 hover:gap-2 transition-all duration-200"
                  >
                    Order Now <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">
              Everything You Need to Print
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              From single page photocopies to bulk book printing — we handle it all with precision and care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (

              
              <div
                key={service.title}
                className="animate-on-scroll card-hover bg-white rounded-xl p-6 border border-border shadow-sm group cursor-pointer"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                             <div className="h-48 overflow-hidden">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">


                <div className={`${service.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                <Link
                  to="/order"
                  className="inline-flex items-center gap-1 text-primary text-sm font-semibold mt-4 hover:gap-2 transition-all duration-200"
                >
                  Order Now <ChevronRight className="h-4 w-4" />
                </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>  */}

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">How It Works</h2>
            <p className="text-muted-foreground mt-3">Order your prints in 5 simple steps</p>
          </div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-20" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  className="animate-on-scroll text-center group"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300 group-hover:scale-110 shadow-lg">
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                      {step.step.slice(-1)}
                    </span>
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Price Calculator */}
      <section id="calculator" className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-on-scroll">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Calculate Your Price</h2>
            <p className="text-muted-foreground mt-3">Instant, accurate pricing based on your exact requirements</p>
          </div>
          <div className="animate-on-scroll">
            <PriceCalculator />
          </div>
        </div>
      </section>

      {/* Book Publishing Quotation */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 animate-on-scroll">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Book Publishing</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Get Book Printing Quote</h2>
            <p className="text-white/60 mt-3">Fill in the details and we'll send you a custom quotation</p>
          </div>

          <div className="animate-on-scroll bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { label: 'Your Name', type: 'text', placeholder: 'Full Name' },
                { label: 'Phone / WhatsApp', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                { label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
              ].map((field) => (
                <div key={field.label} className={field.label === 'Email Address' ? 'sm:col-span-2' : ''}>
                  <label className="block text-white/70 text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
              ))}

              {[
                {
                  label: 'Book Size',
                  type: 'select',
                  options: ['A4 (210×297mm)', 'A5 (148×210mm)', 'B5 (176×250mm)', '6×9 inch', 'Custom Size'],
                },
                {
                  label: 'Binding Type',
                  type: 'select',
                  options: ['Hardbound', 'Softbound / Paperback', 'Spiral Binding', 'Perfect Binding'],
                },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-white/70 text-sm font-medium mb-1">{field.label}</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm appearance-none">
                    {field.options.map((opt) => (
                      <option key={opt} value={opt} className="bg-secondary text-white">{opt}</option>
                    ))}
                  </select>
                </div>
              ))}

              {[
                { label: 'Total Pages', type: 'number', placeholder: 'e.g. 200' },
                { label: 'Quantity (Copies)', type: 'number', placeholder: 'e.g. 250' },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-white/70 text-sm font-medium mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                  />
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-1">Print Type</label>
                <div className="flex gap-3">
                  {['Black & White', 'Full Color'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-white text-sm cursor-pointer">
                      <input type="radio" name="printType" className="accent-primary" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-white/70 text-sm font-medium mb-1">Additional Notes</label>
                <textarea
                  rows={3}
                  placeholder="Any specific requirements or questions..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm resize-none"
                />
              </div>
            </div>

            <button className="w-full mt-6 bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-lg">
              Send Quotation Request →
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why Us</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground mt-2">Why Choose BookPrinters.in?</h2>
          </div>

            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/img1.jpeg"
              alt="High-end digital printing production line"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Best Quality', desc: 'High-resolution printing with premium paper options that make your books stand out.' },
              { icon: Clock, title: 'Fast Turnaround', desc: 'Same-day printing available. Rush orders accepted with guaranteed delivery.' },
              { icon: Shield, title: 'GST Invoice', desc: 'Get official GST invoices for every order. Perfect for business and educational institutions.' },
              { icon: Package, title: 'Bulk Discounts', desc: 'The more you print, the more you save. Tiered pricing for orders above 50 and 150 copies.' },
              { icon: Truck, title: 'Pan India Delivery', desc: 'Courier delivery across India. Pickup also available from our Delhi store.' },
              { icon: Star, title: '10,000+ Satisfied', desc: 'Trusted by students, authors, publishers and businesses across Delhi and India.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className="animate-on-scroll flex gap-4 p-6 bg-white rounded-xl border border-border hover:border-primary hover:shadow-md transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <Instagram className="h-12 w-12 text-primary mx-auto mb-4 animate-float" />
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Follow Us on Instagram
          </h2>
          <p className="text-white/60 mb-6">
            See our printed books, customer stories and behind-the-scenes at Shree Publication
          </p>
          <a
            href="https://www.instagram.com/shree_publication?igsh=MXhmY3l5dWowN24zeg=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 text-lg"
          >
            <Instagram className="h-5 w-5" />
            @shree_publication
          </a>
        </div>
      </section>

       <div className="fixed bottom-6 right-6 z-50">
  {/* Smaller Ping Ring */}
  <span className="absolute inset-0 flex items-center justify-center">
    <span className="h-12 w-12 rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
  </span>

  {/* Main Button */}
  <a
    href="https://wa.me/917230001405"
    target="_blank"
    rel="noopener noreferrer"
    className="relative inline-flex items-center justify-center 
               bg-[#25D366] text-white 
               p-3 rounded-full 
               shadow-md
               hover:scale-110 
               transition-transform duration-300"
  >
    <FaWhatsapp className="h-9 w-9" />
  </a>
</div>


      <Footer />
    </div>
  );
}
