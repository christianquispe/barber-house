'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { BARBERS_DATA } from '@/lib/barbers';
import {
  Scissors,
  Sparkles,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Menu,
  ArrowRight,
  ShoppingBag,
  Camera,
  ThumbsUp,
  Award
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Service = {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  description: string;
  icon: LucideIcon;
  popular: boolean;
};

const SERVICES_DATA: Service[] = [
  {
    id: 's1',
    title: 'CORTE DE AUTOR',
    category: 'corte',
    duration: '45 MIN',
    price: 30,
    description: 'Diagnóstico de visagismo, corte adaptado a fisonomía con máquina/tijera, doble lavado tonificante y peinado profesional con pomada mate.',
    icon: Scissors,
    popular: true
  },
  {
    id: 's2',
    title: 'RITUAL DE BARBA',
    category: 'barba',
    duration: '35 MIN',
    price: 20,
    description: 'Perfilado de barba con simetría milimétrica, aceites esenciales de cedro, doble toalla caliente vaporizada y afeitado tradicional a navaja.',
    icon: Sparkles,
    popular: false
  },
  {
    id: 's3',
    title: 'EXPERIENCIA FULL HOUSE',
    category: 'combos',
    duration: '75 MIN',
    price: 50,
    description: 'Servicio VIP completo: Corte de Autor + Ritual de Barba completo + Exfoliación hidro-facial + Masaje capilar con bebida premium.',
    icon: Award,
    popular: true
  },
  // {
  //   id: 's4',
  //   title: 'TRATAMIENTO HIDRO-FACIAL',
  //   category: 'tratamientos',
  //   duration: '30 MIN',
  //   price: 18,
  //   description: 'Limpieza profunda con mascarilla de carbón activado, exfoliación suave de poros y suero de ácido hialurónico reparador.',
  //   icon: Sparkles,
  //   popular: false
  // },
  // {
  //   id: 's5',
  //   title: 'CAMUFLAJE DE CANAS',
  //   category: 'tratamientos',
  //   duration: '30 MIN',
  //   price: 22,
  //   description: 'Tonalización de matizado orgánico sin amoníaco para barba o cabello. Resultado de aspecto 100% natural y rejuvenecida.',
  //   icon: Sliders,
  //   popular: false
  // },
  // {
  //   id: 's6',
  //   title: 'CORTE JUNIOR HOUSE',
  //   category: 'corte',
  //   duration: '35 MIN',
  //   price: 18,
  //   description: 'Corte de alta precisión para jóvenes menores de 12 años. Trabajo paciente y estilo vanguardista personalizado.',
  //   icon: Scissors,
  //   popular: false
  // }
];

const LOOKBOOK_DATA = [
  { id: 1, category: 'cortes', title: 'HIGH FADE CROP', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&q=80&w=800' },
  { id: 2, category: 'barbas', title: 'PERFILADO ESCULPIDO', img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800' },
  { id: 3, category: 'cortes', title: 'CLASSIC SLICK BACK', img: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800' },
  { id: 4, category: 'barbas', title: 'FULL BEARD CARE', img: 'https://images.unsplash.com/photo-1517832606589-7150a6d828a2?auto=format&fit=crop&q=80&w=800' },
  { id: 5, category: 'rituales', title: 'HOT TOWEL SHAVE', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800' },
  { id: 6, category: 'rituales', title: 'FACIAL DETOX VIP', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800' }
];

const PRODUCTS_DATA = [
  {
    id: 'p1',
    name: 'POMADA MATE HIGH HOLD',
    price: 22,
    size: '100g',
    desc: 'Fijación fuerte con acabado opaco mate. Soluble en agua de fácil aclarado.',
    img: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'p2',
    name: 'ACEITE ORGÁNICO DE BARBA',
    price: 19,
    size: '50ml',
    desc: 'Fórmula hidratante enriquecida con aceite de jojoba, argan y esencia pura de cedro.',
    img: 'https://images.unsplash.com/photo-1608248597261-833258657640?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'p3',
    name: 'SHAMPOO CAPILAR REFRESH',
    price: 18,
    size: '250ml',
    desc: 'Efecto mentolado que estimula el cuero cabelludo y elimina residuos sin resecar.',
    img: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600'
  }
];

export default function HomePage() {
  // Navigation State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Filters State
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('todos');
  const [selectedLookbookCategory, setSelectedLookbookCategory] = useState('todos');

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const filteredServices = selectedServiceCategory === 'todos'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === selectedServiceCategory);

  const filteredLookbook = selectedLookbookCategory === 'todos'
    ? LOOKBOOK_DATA
    : LOOKBOOK_DATA.filter(l => l.category === selectedLookbookCategory);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white">

      <div className="bg-black text-white text-[11px] font-medium py-2 px-4 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-x-4 gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Atendiendo Hoy: 10:00 AM - 8:00 PM
            </span>
            <span className="hidden md:inline-block text-zinc-600">|</span>
            <span className="hidden md:inline-block text-zinc-300">
              <MapPin className="inline w-3 h-3 mr-1 text-zinc-400" /> Av. Principal 450, Miraflores
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="tel:+51912345678" className="hover:text-zinc-300 transition-colors font-semibold flex items-center gap-1">
              <Phone className="w-3 h-3" /> +51 912 345 678
            </a>
          </div>
        </div>
      </div>


      <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 transition-all duration-300 ${isScrolled ? 'shadow-sm py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <a href="/" className="group">
              <Logo />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-9 text-xs font-semibold tracking-wider uppercase text-zinc-900">
              <a href="#servicios" className="hover:text-zinc-500 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">Servicios</a>
              <a href="#experiencia" className="hover:text-zinc-500 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">Experiencia</a>
              <a href="#barberos" className="hover:text-zinc-500 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">Barberos</a>
              <a href="#lookbook" className="hover:text-zinc-500 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">Lookbook</a>
              <a href="#productos" className="hover:text-zinc-500 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">Grooming</a>
              <a href="#contacto" className="hover:text-zinc-500 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-black hover:after:w-full after:transition-all">Contacto</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center space-x-4">
              <Link
                href="/calendar"
                className="px-6 py-3 text-xs font-display text-white bg-black hover:bg-zinc-800 transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <span>AGENDAR CITA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-zinc-900 p-2 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
            <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="block text-sm font-display text-zinc-900">Servicios</a>
            <a href="#experiencia" onClick={() => setIsMenuOpen(false)} className="block text-sm font-display text-zinc-900">La Experiencia</a>
            <a href="#barberos" onClick={() => setIsMenuOpen(false)} className="block text-sm font-display text-zinc-900">Barberos</a>
            <a href="#lookbook" onClick={() => setIsMenuOpen(false)} className="block text-sm font-display text-zinc-900">Lookbook</a>
            <a href="#productos" onClick={() => setIsMenuOpen(false)} className="block text-sm font-display text-zinc-900">Grooming</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-sm font-display text-zinc-900">Contacto</a>
            <Link
              href="/calendar"
              onClick={() => setIsMenuOpen(false)}
              className="w-full mt-4 py-3 text-xs font-display text-white bg-black flex items-center justify-center gap-2"
            >
              <span>AGENDAR CITA</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </header>


      <section className="relative min-h-[85vh] flex items-center bg-grid-lines pt-8 pb-16 overflow-hidden">
        {/* Barber Pole Decorative Top Strip */}
        <div className="absolute top-0 left-0 w-full h-1 barber-pole-border opacity-70"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 z-10">

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-900 uppercase tracking-widest">
                <Scissors className="w-3.5 h-3.5 text-zinc-900" />
                Barbería Clásica & Visagismo Moderno
              </div>

              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-zinc-900 leading-[0.92] tracking-tighter">
                CORTE & ESTILO<br />
                <span className="text-zinc-400">DE PRECISIÓN.</span>
              </h1>

              <p className="text-zinc-600 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                Un espacio conceptualizado para el hombre contemporáneo. Combinamos el ritual clásico de navaja y toalla caliente con técnicas vanguardistas de arquitectura capilar.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/calendar"
                  className="px-8 py-4 text-xs font-display text-white bg-black hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>AGENDAR MI CITA</span>
                </Link>

                <a
                  href="#servicios"
                  className="px-8 py-4 text-xs font-display text-zinc-900 bg-white border border-zinc-200 hover:bg-zinc-100 transition-all text-center"
                >
                  VER CARTA DE SERVICIOS
                </a>
              </div>

              {/* Key Features Icons */}
              <div className="pt-8 border-t border-zinc-200 grid grid-cols-3 gap-6 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-200">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-900">Toalla Caliente</h4>
                    <p className="text-[10px] text-zinc-500">Ritual Botánico</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-200">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-900">Grooming VIP</h4>
                    <p className="text-[10px] text-zinc-500">Afeitado Navaja</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-200">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-zinc-900">Sillón Takara</h4>
                    <p className="text-[10px] text-zinc-500">Máximo Confort</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">

                <div className="relative bg-black border border-zinc-200 p-3 shadow-2xl">
                  <div className="aspect-[4/5] relative overflow-hidden bg-zinc-900">
                    <img
                      src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900"
                      alt="Barber House Master Barber"
                      className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Floating Overlay Tag */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-white border border-zinc-200 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest block">ESTUDIO DE BARBERÍA</span>
                      <h3 className="font-display text-sm text-zinc-900">MAESTROS BARBEROS</h3>
                    </div>
                    <div className="w-8 h-8 bg-black text-white flex items-center justify-center text-xs">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Back Geometric Box Accent */}
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-black -z-10 hidden sm:block"></div>
              </div>
            </div>

          </div>
        </div>
      </section>


      <section id="servicios" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">Carta Oficial</span>
              <h2 className="font-display text-4xl sm:text-5xl text-zinc-900">SERVICIOS & TARIFA</h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {[
                { id: 'todos', label: 'TODOS' },
                { id: 'corte', label: 'CORTES' },
                { id: 'barba', label: 'BARBA' },
                { id: 'combos', label: 'COMBOS' },
                { id: 'tratamientos', label: 'TRATAMIENTOS' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedServiceCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-display transition-all ${selectedServiceCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className={`p-8 transition-all duration-300 flex flex-col justify-between group ${service.popular
                      ? 'bg-black text-white border-2 border-black shadow-xl relative'
                      : 'bg-white text-zinc-900 border border-zinc-200 hover:border-black'
                    }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 right-6 bg-white text-black text-[9px] font-display uppercase tracking-widest px-3 py-1 border border-black">
                      POPULAR
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`w-10 h-10 border flex items-center justify-center ${service.popular
                          ? 'border-zinc-800 bg-zinc-900 text-white'
                          : 'border-zinc-200 bg-zinc-100 text-zinc-900 group-hover:bg-black group-hover:text-white'
                        }`}>
                        <IconComp className="w-4 h-4" />
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 ${service.popular ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-500'
                        }`}>
                        {service.duration}
                      </span>
                    </div>

                    <h3 className="font-display text-xl mb-2">{service.title}</h3>
                    <p className={`text-xs leading-relaxed font-normal mb-8 ${service.popular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {service.description}
                    </p>
                  </div>

                  <div className={`pt-6 border-t flex justify-between items-center ${service.popular ? 'border-zinc-800' : 'border-zinc-200'}`}>
                    <div>
                      <span className={`text-[10px] uppercase block font-semibold ${service.popular ? 'text-zinc-400' : 'text-zinc-400'}`}>PRECIO</span>
                      <span className="font-display text-2xl">S/ {service.price}.00</span>
                    </div>
                    <Link
                      href="/calendar"
                      className={`px-5 py-2.5 text-xs font-display transition-colors inline-flex items-center ${service.popular
                          ? 'bg-white text-black hover:bg-zinc-200'
                          : 'border border-zinc-200 text-zinc-900 hover:bg-black hover:text-white hover:border-black'
                        }`}
                    >
                      AGENDAR
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      <section id="experiencia" className="py-24 bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-5 space-y-6">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block">NUESTRA FILOSOFÍA</span>
              <h2 className="font-display text-4xl sm:text-5xl text-zinc-900 leading-tight">
                EL RITUAL DE LO SIMPLE & BIEN HECHO.
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed font-normal">
                En <strong className="text-zinc-900 font-semibold">BARBER HOUSE</strong> concebimos la barbería como una ceremonia de pausa y renovación masculina. No aceleramos procesos; dominamos los detalles.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-5 bg-white border border-zinc-200 flex items-start gap-4">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 text-xs font-bold font-display">01</span>
                  <div>
                    <h4 className="font-display text-sm text-zinc-900">Visagismo de Precisión</h4>
                    <p className="text-xs text-zinc-500 mt-1">Estudio técnico de proporciones craneales y facciones antes del primer trazo.</p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-zinc-200 flex items-start gap-4">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 text-xs font-bold font-display">02</span>
                  <div>
                    <h4 className="font-display text-sm text-zinc-900">Sanitización Germicida UV</h4>
                    <p className="text-xs text-zinc-500 mt-1">Instrumental esterilizado individualmente bajo estrictos estándares clínicos.</p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-zinc-200 flex items-start gap-4">
                  <span className="w-8 h-8 bg-black text-white flex items-center justify-center shrink-0 text-xs font-bold font-display">03</span>
                  <div>
                    <h4 className="font-display text-sm text-zinc-900">Experiencia Lounge VIP</h4>
                    <p className="text-xs text-zinc-500 mt-1">Café espresso recién molido o degustación de whisky cortesía de la casa.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] bg-zinc-900 border border-zinc-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=600"
                      alt="Barber Shop Tools"
                      className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="bg-black text-white p-6 border border-zinc-800">
                    <span className="font-display text-3xl block">100%</span>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest block mt-1">Afeitado Tradicional</span>
                  </div>
                </div>

                <div className="space-y-4 pt-8">
                  <div className="bg-white border border-zinc-200 p-6">
                    <span className="font-display text-3xl text-zinc-900 block">4.9 ★</span>
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest block mt-1">+1,200 Valoraciones</span>
                  </div>
                  <div className="aspect-[3/4] bg-zinc-900 border border-zinc-200 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600"
                      alt="Beard Sculpting"
                      className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      <section id="barberos" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">EQUIPO</span>
            <h2 className="font-display text-4xl sm:text-5xl text-zinc-900">MAESTROS BARBEROS</h2>
            <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BARBERS_DATA.map((barber) => (
              <div key={barber.id} className="border border-zinc-200 bg-white p-6 hover:border-black transition-all group">
                <div className="aspect-[4/5] bg-zinc-900 overflow-hidden mb-6 relative">
                  <img
                    src={barber.img}
                    alt={barber.name}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white text-black px-2.5 py-1 text-[10px] font-display">
                    ★ {barber.rating}
                  </div>
                </div>

                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">{barber.role}</span>
                <h3 className="font-display text-xl text-zinc-900 mt-1">{barber.name}</h3>
                <p className="text-zinc-500 text-xs font-normal mt-2 leading-relaxed">
                  {barber.specialty} ({barber.experience}).
                </p>

                <Link
                  href={`/calendar?barber=${barber.id}`}
                  className="w-full mt-6 py-3 text-xs font-display text-zinc-900 bg-zinc-100 hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <span>RESERVAR CON {barber.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section id="lookbook" className="py-24 bg-zinc-100 border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">PORTAFOLIO</span>
              <h2 className="font-display text-4xl sm:text-5xl text-zinc-900">LOOKBOOK MONOCROMÁTICO</h2>
            </div>

            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {[
                { id: 'todos', label: 'TODOS' },
                { id: 'cortes', label: 'CORTES' },
                { id: 'barbas', label: 'BARBAS' },
                { id: 'rituales', label: 'RITUALES' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedLookbookCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-display transition-all ${selectedLookbookCategory === cat.id
                      ? 'bg-black text-white'
                      : 'bg-white text-zinc-900 hover:border-black border border-zinc-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLookbook.map((item) => (
              <div key={item.id} className="bg-white border border-zinc-200 p-3 group cursor-pointer">
                <div className="aspect-square bg-zinc-900 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">{item.category}</span>
                    <h4 className="font-display text-lg">{item.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      <section id="productos" className="py-24 bg-white border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-zinc-200">
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">TIENDA EXCLUSIVA</span>
              <h2 className="font-display text-4xl sm:text-5xl text-zinc-900">LINEA DE GROOMING</h2>
            </div>
            <p className="text-xs text-zinc-500 max-w-xs mt-4 md:mt-0 font-normal">
              Formulaciones de nivel profesional creadas para mantener la salud capilar y facial diariamente en casa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS_DATA.map((product) => (
              <div key={product.id} className="border border-zinc-200 bg-white p-6 hover:border-black transition-all flex flex-col justify-between group">
                <div>
                  <div className="aspect-square bg-zinc-100 border border-zinc-200 overflow-hidden mb-6 relative">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-black text-white text-[10px] font-display px-2.5 py-1">
                      {product.size}
                    </span>
                  </div>

                  <h3 className="font-display text-lg text-zinc-900">{product.name}</h3>
                  <p className="text-zinc-500 text-xs font-normal mt-2 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-200 flex justify-between items-center mt-6">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase block font-semibold">PRECIO</span>
                    <span className="font-display text-2xl text-zinc-900">S/ {product.price}.00</span>
                  </div>
                  <button
                    onClick={() => triggerToast(`Añadido ${product.name} al carrito`)}
                    className="px-4 py-2.5 text-xs font-display text-zinc-900 border border-zinc-200 hover:bg-black hover:text-white hover:border-black transition-colors flex items-center gap-2"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>COMPRAR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


{showToast && (
        <div className="fixed bottom-6 left-6 right-6 sm:left-auto z-50 bg-black text-white p-4 flex items-center gap-4 sm:max-w-sm shadow-2xl border border-zinc-800 animate-in slide-in-from-bottom duration-300">
          <div className="w-8 h-8 bg-white text-black font-bold flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-display uppercase">NOTIFICACIÓN</h5>
            <p className="text-[11px] font-normal text-zinc-300 mt-0.5">{toastMessage}</p>
          </div>
        </div>
      )}


      <footer id="contacto" className="bg-black text-white border-t border-zinc-800 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

            <div className="md:col-span-5 space-y-6">
              <div className="inline-block p-3 bg-white">
                <Logo size="sm" />
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-normal">
                Barbería masculina de alta precisión. Estética minimalista, cortes atemporales e higiene sin concesiones.
              </p>
              <div className="flex space-x-3 pt-2">
                <a href="#" className="w-9 h-9 border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" aria-label="Instagram">
                  <Camera className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 border border-zinc-800 bg-zinc-900 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors" aria-label="Facebook">
                  <ThumbsUp className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <h4 className="font-display text-xs text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Ubicación & Citas</h4>
              <ul className="space-y-3 text-xs text-zinc-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span>Av. Principal 450, Miraflores, Lima</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>+51 912 345 678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>contacto@barberhouse.pe</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h4 className="font-display text-xs text-white uppercase tracking-wider border-b border-zinc-800 pb-2">Horario de Atenciones</h4>
              <ul className="space-y-2.5 text-xs text-zinc-400">
                <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                  <span>Lunes a Viernes:</span>
                  <span className="text-white font-medium">10:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-zinc-800/50 pb-2">
                  <span>Sábados:</span>
                  <span className="text-white font-medium">09:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingos:</span>
                  <span className="text-zinc-600">Cerrado</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-500 uppercase tracking-wider font-medium">
            <p>&copy; 2026 BARBER HOUSE. TODOS LOS DERECHOS RESERVADOS.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">TÉRMINOS</a>
              <a href="#" className="hover:text-white transition-colors">PRIVACIDAD</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}