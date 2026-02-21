
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Menu, 
  X, 
  ChevronRight, 
  CheckCircle2,
  Star,
  Hammer,
  Leaf,
  Truck,
  Clock,
  ShieldCheck,
  Zap,
  LayoutGrid,
  Info,
  ArrowUpRight,
  ArrowLeft,
  ChevronDown,
  Camera,
  ArrowRight,
  Quote
} from 'lucide-react';
import { 
  BUSINESS_INFO, 
  ELECTRICAL_SERVICES, 
  OTHER_SERVICES, 
  PORTFOLIO_ITEMS, 
  TESTIMONIALS 
} from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'portfolio' | string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Electrical Fault Finding',
    message: ''
  });

  // Dynamic SEO and Schema Injection
  useEffect(() => {
    let title = "Carlos Electrical | 24/7 Electrician Cape Town";
    let description = "Expert 24/7 electrical repairs, DB board upgrades, and maintenance in Cape Town. Call Carlos now for reliable service.";

    if (currentPage === 'portfolio') {
      title = "Our Projects | Carlos Electrical Portfolio";
      description = "View our gallery of successfully completed electrical and handyman projects across Cape Town.";
    } else if (currentPage.startsWith('service-')) {
      const serviceId = currentPage.replace('service-', '');
      const service = ELECTRICAL_SERVICES.find(s => s.id === serviceId);
      if (service) {
        title = `${service.title} in Cape Town | Carlos Electrical`;
        description = service.shortDescription;
      }
    }

    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // JSON-LD Schema Injection
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": BUSINESS_INFO.name,
      "image": "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=2000",
      "@id": "https://carloselectrical.co.za",
      "url": "https://carloselectrical.co.za",
      "telephone": BUSINESS_INFO.phone,
      "email": BUSINESS_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": BUSINESS_INFO.address.split(',')[0],
        "addressLocality": "Parkwood",
        "addressRegion": "Cape Town",
        "postalCode": "7700",
        "addressCountry": "ZA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -33.9859569,
        "longitude": 18.472282
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        `https://wa.me/${BUSINESS_INFO.whatsapp}`
      ],
      "priceRange": "$$"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    window.scrollTo(0, 0); 
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [currentPage]);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setActiveCategory('All'); 
    window.scrollTo(0, 0);
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(
      `Hi Carlos,\n\nMy name is *${formData.name}*.\nI need help with: *${formData.service}*.\n\nDetails:\n${formData.message}\n\nMy phone number: ${formData.phone}`
    );
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredPortfolio = activeCategory === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === activeCategory);

  // Dedicated Portfolio Page Component
  const PortfolioPage = () => (
    <main className="animate-in fade-in duration-500">
      <header className="relative py-32 bg-charcoal text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <img src="https://images.unsplash.com/photo-1541888941257-23393b7083a2?auto=format&fit=crop&q=80&w=2000" alt="Carlos Electrical Completed Projects Gallery" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <button onClick={() => navigateTo('home')} className="inline-flex items-center gap-2 text-blue-400 font-bold mb-8 hover:text-white transition-colors group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-5xl md:text-8xl font-black mb-8 uppercase tracking-tighter">Project <span className="text-blue-500">Gallery</span></h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium">Real results from real jobs. See why Carlos Electrical is the preferred choice for 24/7 electrical repairs in Cape Town.</p>
        </div>
      </header>

      <nav className="py-20 bg-white sticky top-[60px] md:top-[70px] z-40 border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {['All', 'Electrical', 'Handyman', 'Garden'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-2 ${activeCategory === cat ? 'bg-blue-600 border-blue-600 text-white shadow-xl' : 'bg-transparent border-gray-100 text-gray-400 hover:border-blue-200 hover:text-blue-600'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredPortfolio.map((item, i) => (
              <article key={i} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={item.image} alt={`${item.category} - ${item.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-blue-600 shadow-lg">{item.category}</span>
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black mb-4 text-charcoal">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-lg">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );

  // Service Detail Page Component
  const ServiceDetailPage = ({ serviceId }: { serviceId: string }) => {
    const service = ELECTRICAL_SERVICES.find(s => s.id === serviceId);
    if (!service) return null;

    // Logic to find relevant testimonials
    const getRelevantTestimonials = () => {
      const keywords: Record<string, string[]> = {
        domestic: ['lighting', 'wiring', 'socket', 'house'],
        construction: ['site', 'industrial', 'construction'],
        faultfinding: ['fault', 'diagnostics', 'trip'],
        dbboard: ['db board', 'distribution board', 'panel'],
        emergency: ['blackout', 'emergency', '2 AM', 'rapid'],
        maintenance: ['maintenance', 'inspection']
      };

      const currentKeywords = keywords[serviceId] || [];
      const matches = TESTIMONIALS.filter(t => 
        currentKeywords.some(kw => t.comment.toLowerCase().includes(kw.toLowerCase()))
      );

      // Return matches or general if none found
      return matches.length > 0 ? matches : [TESTIMONIALS[1]]; // Sarah is general
    };

    const relevantTestimonials = getRelevantTestimonials();

    return (
      <main className="animate-in fade-in duration-500">
        <header className="relative py-24 bg-charcoal text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2000" alt={`${service.title} Expert Technician at Work`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <nav>
              <button onClick={() => navigateTo('home')} className="inline-flex items-center gap-2 text-blue-400 font-bold mb-8 hover:text-white transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </button>
            </nav>
            <div className="max-w-4xl">
              <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                {service.icon}
              </div>
              <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">{service.title}</h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium mb-10">
                Professional {service.title} services in Cape Town and surrounding areas.
              </p>
            </div>
          </div>
        </header>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-12">
                <article className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100 shadow-sm">
                  <h2 className="text-3xl font-black text-charcoal mb-8">Service Overview</h2>
                  <p className="text-gray-600 text-xl leading-relaxed mb-10">{service.longDescription}</p>
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-charcoal">Key Features & Benefits:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                          <CheckCircle2 className="text-blue-600 w-6 h-6 flex-shrink-0" />
                          <span className="font-bold text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>

                {/* Relevant Testimonials Section */}
                <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Quote className="w-32 h-32" />
                  </div>
                  <h3 className="text-2xl font-black mb-10 flex items-center gap-3">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    Success Stories
                  </h3>
                  <div className="space-y-12">
                    {relevantTestimonials.map((t, i) => (
                      <div key={i} className="relative z-10">
                        <p className="text-xl italic font-medium leading-relaxed mb-6">"{t.comment}"</p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-black">
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold">{t.name}</p>
                            <p className="text-xs text-blue-200 uppercase tracking-widest">{t.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="sticky top-32">
                <div className="bg-charcoal p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
                  <h3 className="text-3xl font-black mb-6">Book {service.title}</h3>
                  <p className="text-gray-400 mb-10 text-lg">Contact Carlos for a free, no-obligation quote or same-day emergency assistance.</p>
                  <div className="space-y-6 mb-12">
                    <div className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="bg-blue-600 p-4 rounded-xl"><Phone className="w-6 h-6" /></div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Direct Line</p>
                        <p className="text-2xl font-black">{BUSINESS_INFO.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button onClick={() => { setFormData(prev => ({ ...prev, service: service.title })); scrollToSection('contact'); }} className="w-full bg-yellow-400 hover:bg-yellow-500 text-charcoal font-black py-6 rounded-2xl text-xl shadow-xl transition-all">GET A FREE QUOTE</button>
                    <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(`Hi Carlos, I'm interested in: ${service.title}`)}`} target="_blank" className="w-full bg-[#25D366] hover:bg-[#1ebd5e] text-white font-black py-6 rounded-2xl text-xl shadow-xl transition-all flex items-center justify-center gap-3">
                      <MessageCircle className="w-7 h-7" /> WHATSAPP US
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-charcoal mb-12">Related Electrical Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ELECTRICAL_SERVICES.filter(s => s.id !== serviceId).map((s) => (
                <article key={s.id} onClick={() => navigateTo(`service-${s.id}`)} className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer flex flex-col h-full">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">{s.icon}</div>
                  <h3 className="text-xl font-black mb-3 text-charcoal">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{s.shortDescription}</p>
                  <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest gap-2">Learn More <ArrowUpRight className="w-4 h-4" /></div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || currentPage !== 'home' ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="bg-blue-600 p-2 rounded shadow-lg">
              <span className="text-white font-black text-2xl tracking-tighter">CE</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-xl leading-none ${(scrolled || currentPage !== 'home') ? 'text-charcoal' : 'text-white'}`}>
                {BUSINESS_INFO.name}
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-semibold ${(scrolled || currentPage !== 'home') ? 'text-blue-600' : 'text-yellow-400'}`}>
                Professional Services
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <div className="relative">
              <button onMouseEnter={() => setIsServicesDropdownOpen(true)} className={`font-semibold hover:text-blue-600 transition-colors flex items-center gap-1 ${(scrolled || currentPage !== 'home') ? 'text-gray-700' : 'text-white'}`}>
                Services <ChevronDown className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesDropdownOpen && (
                <div onMouseLeave={() => setIsServicesDropdownOpen(false)} className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-2xl p-4 border border-gray-100 mt-2 animate-in slide-in-from-top-2 duration-200">
                  {ELECTRICAL_SERVICES.map(s => (
                    <button key={s.id} onClick={() => navigateTo(`service-${s.id}`)} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 font-bold transition-colors block text-sm mb-1">{s.title}</button>
                  ))}
                  <div className="h-px bg-gray-100 my-2"></div>
                  <button onClick={() => scrollToSection('services')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-50 text-blue-600 font-black text-xs uppercase tracking-widest">All Services</button>
                </div>
              )}
            </div>
            <button onClick={() => navigateTo('portfolio')} className={`font-semibold hover:text-blue-600 transition-colors ${(scrolled || currentPage !== 'home') ? 'text-gray-700' : 'text-white'}`}>Portfolio</button>
            <button onClick={() => scrollToSection('about')} className={`font-semibold hover:text-blue-600 transition-colors ${(scrolled || currentPage !== 'home') ? 'text-gray-700' : 'text-white'}`}>Why Us</button>
            <button onClick={() => scrollToSection('contact')} className={`font-semibold hover:text-blue-600 transition-colors ${(scrolled || currentPage !== 'home') ? 'text-gray-700' : 'text-white'}`}>Contact</button>
            <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="bg-yellow-400 hover:bg-yellow-500 text-charcoal px-6 py-2 rounded-full font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className={`w-8 h-8 ${(scrolled || currentPage !== 'home') ? 'text-charcoal' : 'text-white'}`} /> : <Menu className={`w-8 h-8 ${(scrolled || currentPage !== 'home') ? 'text-charcoal' : 'text-white'}`} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[60] flex flex-col pt-24 px-8 lg:hidden animate-in slide-in-from-right duration-300">
            <button className="absolute top-6 right-6 p-2" onClick={() => setIsMenuOpen(false)}><X className="w-10 h-10 text-charcoal" /></button>
            <div className="flex flex-col gap-6">
              <div className="border-b pb-4">
                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Our Services</p>
                <div className="grid grid-cols-1 gap-2">
                  {ELECTRICAL_SERVICES.map(s => <button key={s.id} onClick={() => navigateTo(`service-${s.id}`)} className="text-left font-bold text-gray-700 hover:text-blue-600 py-2">{s.title}</button>)}
                </div>
              </div>
              <button onClick={() => navigateTo('portfolio')} className="text-2xl font-bold text-charcoal border-b pb-4 text-left">Portfolio</button>
              <button onClick={() => scrollToSection('about')} className="text-2xl font-bold text-charcoal border-b pb-4 text-left">Why Us</button>
              <button onClick={() => scrollToSection('contact')} className="text-2xl font-bold text-charcoal border-b pb-4 text-left">Contact</button>
            </div>
          </div>
        )}
      </nav>

      {currentPage === 'home' && (
        <main className="animate-in fade-in duration-700">
          {/* Hero */}
          <section id="home" className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden bg-charcoal">
            <div className="absolute inset-0 opacity-40"><img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=2000" alt="Professional Electrician Working on Site in Cape Town" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent"></div></div>
            <div className="container mx-auto px-4 relative z-10 text-white">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-blue-600/30 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 border border-blue-400/30"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span></span><span className="text-sm font-bold tracking-wide uppercase">Emergency Electrician Cape Town - 24/7</span></div>
                <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1]">Reliable <span className="text-blue-500">Power</span> Solutions.</h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-medium">Carlos Electrical: Your first choice for 24-hour electricians in Cape Town. Fast response, professional workmanship, and affordable rates.</p>
                <div className="flex flex-col sm:flex-row gap-5">
                  <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="bg-yellow-400 hover:bg-yellow-500 text-charcoal px-10 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(251,191,36,0.2)] transition-all"> <Phone className="w-7 h-7" /> CALL NOW - 24/7</a>
                  <button onClick={() => scrollToSection('services')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 border border-white/20 transition-all">OUR SERVICES</button>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section id="services" className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-2xl"><div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-[0.2em] mb-4"><Zap className="w-5 h-5 fill-current" /> Expert Licensed Electricians</div><h2 className="text-4xl md:text-6xl font-black text-charcoal mb-6 leading-tight">Professional <span className="text-blue-600">Electrical</span> Services</h2><p className="text-gray-600 text-xl leading-relaxed">Specializing in fault finding, DB board upgrades, and domestic installations across Cape Town.</p></div>
                <div className="bg-red-600/10 p-6 rounded-3xl border border-red-200"><p className="text-red-600 font-black flex items-center gap-2 mb-2"><Clock className="w-5 h-5" /> EMERGENCY STANDBY</p><a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="text-2xl font-black text-charcoal block hover:text-red-600 transition-colors">{BUSINESS_INFO.phone}</a></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {ELECTRICAL_SERVICES.map((s) => (
                  <article key={s.id} onClick={() => navigateTo(`service-${s.id}`)} className="group bg-white p-12 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col h-full hover:-translate-y-2">
                    <div className="bg-blue-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-blue-200 shadow-2xl group-hover:animate-icon-pulse transition-all">{s.icon}</div>
                    <h3 className="text-2xl font-black mb-4 text-charcoal group-hover:text-blue-600 transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-lg leading-relaxed mb-10 flex-grow">{s.shortDescription}</p>
                    <div className="pt-8 border-t flex items-center justify-between text-blue-600 font-black text-sm uppercase tracking-widest">Explore service <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Portfolio Section */}
          <section id="portfolio-featured" className="py-32 bg-charcoal text-white relative overflow-hidden">
             <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
                   <div>
                      <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">Recent <span className="text-blue-500">Work</span></h2>
                      <p className="text-gray-400 max-w-lg text-lg font-medium leading-relaxed">View our high-quality project results in Constantia, Sea Point, and the Southern Suburbs.</p>
                   </div>
                   <button onClick={() => navigateTo('portfolio')} className="bg-white/10 hover:bg-white/20 border border-white/20 px-10 py-5 rounded-2xl font-black text-lg transition-all group">
                      VIEW FULL GALLERY <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-2 transition-transform" />
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                   {PORTFOLIO_ITEMS.slice(0, 3).map((item, i) => (
                     <article key={i} className="group relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 hover:border-blue-500 transition-all duration-500">
                        <div className="aspect-[4/3] overflow-hidden"><img src={item.image} alt={`Carlos Electrical Project: ${item.title}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                        <div className="p-8">
                           <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-2 block">{item.category}</span>
                           <h4 className="text-2xl font-black mb-3">{item.title}</h4>
                           <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                        </div>
                     </article>
                   ))}
                </div>
             </div>
          </section>

          {/* Handyman etc */}
          <section className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <header className="mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-charcoal mb-6">Home Maintenance Solutions</h2>
                <p className="text-gray-500 text-xl font-medium">Top-rated handyman, garden, and transport services in Cape Town.</p>
              </header>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <article className="bg-gray-50 rounded-[3rem] p-10 border border-gray-200 h-full">
                  <div className="flex items-center gap-5 mb-10"><div className="bg-charcoal p-4 rounded-2xl text-white shadow-xl"><Hammer className="w-8 h-8" /></div><h3 className="text-3xl font-black text-charcoal">Handyman</h3></div>
                  <ul className="space-y-4">{OTHER_SERVICES.handyman.map((item, i) => (<li key={i} className="flex items-center gap-4 text-lg font-bold text-gray-700 bg-white p-5 rounded-2xl shadow-sm"><span className="text-blue-600">{item.icon}</span> {item.title}</li>))}</ul>
                </article>
                <article className="bg-gray-50 rounded-[3rem] p-10 border border-gray-200 h-full">
                  <div className="flex items-center gap-5 mb-10"><div className="bg-green-600 p-4 rounded-2xl text-white shadow-xl"><Leaf className="w-8 h-8" /></div><h3 className="text-3xl font-black text-charcoal">Garden</h3></div>
                  <ul className="space-y-4">{OTHER_SERVICES.garden.map((item, i) => (<li key={i} className="flex items-center gap-4 text-lg font-bold text-gray-700 bg-white p-5 rounded-2xl shadow-sm"><span className="text-green-600">{item.icon}</span> {item.title}</li>))}</ul>
                </article>
                <article className="bg-gray-50 rounded-[3rem] p-10 border border-gray-200 h-full">
                  <div className="flex items-center gap-5 mb-10"><div className="bg-orange-600 p-4 rounded-2xl text-white shadow-xl"><Truck className="w-8 h-8" /></div><h3 className="text-3xl font-black text-charcoal">Transport</h3></div>
                  <ul className="space-y-4">{OTHER_SERVICES.transport.map((item, i) => (<li key={i} className="flex items-center gap-4 text-lg font-bold text-gray-700 bg-white p-5 rounded-2xl shadow-sm"><span className="text-orange-600">{item.icon}</span> {item.title}</li>))}</ul>
                </article>
              </div>
            </div>
          </section>

          {/* About */}
          <section id="about" className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <article>
                  <div className="bg-blue-600 h-2 w-24 mb-10"></div>
                  <h2 className="text-4xl md:text-6xl font-black mb-10 leading-tight text-charcoal">Why Choose <span className="text-blue-600">Carlos</span> Electrical?</h2>
                  <div className="space-y-10">
                    <div className="flex gap-8 group">
                      <div className="flex-shrink-0 bg-blue-50 p-6 rounded-[2rem] h-fit group-hover:bg-blue-600 transition-colors duration-300"><Clock className="w-10 h-10 text-blue-600 group-hover:text-white" /></div>
                      <div><h3 className="text-2xl font-black mb-3 text-charcoal">24/7 Availability</h3><p className="text-gray-500 text-lg leading-relaxed">The only 24-hour electrician in Cape Town you can trust for immediate response.</p></div>
                    </div>
                    <div className="flex gap-8 group">
                      <div className="flex-shrink-0 bg-blue-50 p-6 rounded-[2rem] h-fit group-hover:bg-blue-600 transition-colors duration-300"><ShieldCheck className="w-10 h-10 text-blue-600 group-hover:text-white" /></div>
                      <div><h3 className="text-2xl font-black mb-3 text-charcoal">Certified & Insured</h3><p className="text-gray-500 text-lg leading-relaxed">Our licensed electricians ensure all work meets South African safety standards.</p></div>
                    </div>
                  </div>
                </article>
                <aside className="relative"><img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000" alt="Our Professional Technician Team" className="rounded-[4rem] relative z-10 shadow-2xl" /><div className="absolute top-20 -right-10 bg-yellow-400 text-charcoal p-10 rounded-[2.5rem] z-20 shadow-2xl max-w-xs md:block hidden animate-bounce-slow"><p className="text-6xl font-black mb-2">15+</p><p className="font-black text-sm uppercase tracking-wider">Years Serving Cape Town</p></div></aside>
              </div>
            </div>
          </section>

          {/* Testimonials Home Section */}
          <section id="testimonials" className="py-32 bg-gray-50">
            <div className="container mx-auto px-4">
              <header className="text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-black text-charcoal mb-6">Trusted by <span className="text-blue-600">Cape Town</span> Homeowners</h2>
                <p className="text-gray-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">Read real feedback from our clients across the city. We pride ourselves on reliability and clean workmanship.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {TESTIMONIALS.map((t, i) => (
                  <article key={i} className="bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative group">
                    <div className="absolute top-10 right-10 text-blue-50/50 group-hover:text-blue-100 transition-colors">
                      <Quote className="w-20 h-20" />
                    </div>
                    <div className="flex gap-1 mb-8 relative z-10">
                      {[...Array(5)].map((_, star) => (
                        <Star key={star} className={`w-6 h-6 ${star < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 text-xl italic font-medium leading-relaxed mb-10 flex-grow relative z-10">"{t.comment}"</p>
                    <div className="flex items-center gap-5 pt-8 border-t border-gray-50 relative z-10">
                      <div className="w-16 h-16 bg-blue-600 rounded-[1.25rem] flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-blue-200">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-black text-xl text-charcoal leading-tight">{t.name}</h4>
                        <p className="text-sm text-blue-500 font-bold uppercase tracking-widest">{t.location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="py-32 bg-white">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                <article>
                  <h2 className="text-4xl md:text-7xl font-black text-charcoal mb-10 leading-[1]">Get a <span className="text-blue-600">Quote</span></h2>
                  <p className="text-gray-500 mb-16 text-xl leading-relaxed">Contact us for any electrical emergency or planned maintenance in the Southern Suburbs and Cape Town CBD.</p>
                  <div className="space-y-6">
                    <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="flex items-center gap-8 p-8 bg-gray-50 rounded-[2.5rem] hover:bg-blue-50 border border-transparent hover:border-blue-100 group"><div className="bg-blue-600 p-5 rounded-2xl text-white group-hover:scale-110 shadow-xl"><Phone className="w-8 h-8" /></div><div><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Direct Line</p><p className="text-3xl font-black text-charcoal">{BUSINESS_INFO.phone}</p></div></a>
                    <div className="flex items-center gap-8 p-8 bg-gray-50 rounded-[2.5rem] hover:bg-blue-50 group border border-transparent hover:border-blue-100"><div className="bg-charcoal p-5 rounded-2xl text-white shadow-xl group-hover:scale-110"><Mail className="w-8 h-8" /></div><div><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email</p><p className="text-xl font-black text-charcoal">{BUSINESS_INFO.email}</p></div></div>
                  </div>
                  <div className="mt-16 p-2 bg-gray-100 rounded-[3rem] overflow-hidden h-[350px] shadow-inner relative border-4 border-white"><iframe title="Carlos Electrical Cape Town Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.197921935824!2d18.472282!3d-33.9859569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc42e5828ecf4f%3A0x6b8d4f48b11b5e5!2sParkwood%2C%20Cape%20Town!5e0!3m2!1sen!2sza!4v1680000000000" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe></div>
                </article>
                <aside className="bg-charcoal p-12 md:p-20 rounded-[4rem] shadow-2xl relative overflow-hidden"><div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div><h3 className="text-4xl font-black text-white mb-10 relative z-10 leading-tight">Fast Service Request</h3><form className="space-y-8 relative z-10" onSubmit={handleFormSubmit}><div className="grid grid-cols-1 md:grid-cols-2 gap-8"><input aria-label="Name" required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-7 py-5 text-white focus:outline-none focus:border-blue-500 font-bold" placeholder="Full Name" /><input aria-label="Phone" required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-7 py-5 text-white focus:outline-none focus:border-blue-500 font-bold" placeholder="082 123 4567" /></div><div><select aria-label="Service" name="service" value={formData.service} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl px-7 py-5 text-white appearance-none cursor-pointer font-bold">{ELECTRICAL_SERVICES.map(s => (<option key={s.id} className="bg-charcoal" value={s.title}>{s.title}</option>))}<option className="bg-charcoal" value="Handyman / General Service">Handyman / General Service</option></select></div><div><textarea aria-label="Details" required name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-7 py-5 text-white focus:outline-none focus:border-blue-500 font-bold" placeholder="Briefly describe your electrical issue..."></textarea></div><button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-7 rounded-[2rem] shadow-xl transition-all hover:scale-[1.02] text-xl uppercase flex items-center justify-center gap-3"> <MessageCircle className="w-6 h-6" /> REQUEST WHATSAPP QUOTE</button></form></aside>
              </div>
            </div>
          </section>
        </main>
      )}

      {currentPage === 'portfolio' && <PortfolioPage />}
      {currentPage.startsWith('service-') && <ServiceDetailPage serviceId={currentPage.replace('service-', '')} />}

      {/* Footer */}
      <footer className="bg-charcoal text-white pt-32 pb-16 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
            <div><div className="flex items-center gap-3 mb-10"><div className="bg-blue-600 p-3 rounded-2xl shadow-xl"><span className="text-white font-black text-2xl tracking-tighter">CE</span></div><span className="font-black text-2xl uppercase tracking-tight">{BUSINESS_INFO.name}</span></div><p className="text-gray-400 leading-relaxed text-lg font-medium mb-10">Carlos Electrical: Reliable 24-hour electricians serving Constantia, Sea Point, and the Southern Suburbs since 2008.</p><div className="flex gap-4"><a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-[#25D366] transition-all border border-white/10" aria-label="Contact via WhatsApp"><MessageCircle className="w-6 h-6" /></a></div></div>
            <div><h4 className="text-xs font-black mb-10 uppercase tracking-[0.3em] text-blue-500">Service Links</h4><ul className="space-y-4 text-gray-400 font-bold text-lg">{ELECTRICAL_SERVICES.slice(0, 5).map(s => (<li key={s.id} onClick={() => navigateTo(`service-${s.id}`)} className="hover:text-white transition-colors cursor-pointer">{s.title}</li>))}</ul></div>
            <div><h4 className="text-xs font-black mb-10 uppercase tracking-[0.3em] text-blue-500">Navigation</h4><ul className="space-y-4 text-gray-400 font-bold text-lg"><li><button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">Home</button></li><li><button onClick={() => navigateTo('portfolio')} className="hover:text-white transition-colors">Project Portfolio</button></li><li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact Us</button></li></ul></div>
            <div><h4 className="text-xs font-black mb-10 uppercase tracking-[0.3em] text-blue-500">Cape Town Office</h4><ul className="space-y-8"><li className="flex gap-5"><MapPin className="text-blue-500 w-6 h-6 flex-shrink-0" /><span className="text-gray-400 font-bold text-lg">{BUSINESS_INFO.address}</span></li><li className="flex gap-5"><Phone className="text-blue-500 w-6 h-6 flex-shrink-0" /><a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="text-2xl font-black hover:text-blue-400 transition-colors">{BUSINESS_INFO.phone}</a></li><li className="flex gap-5 bg-white/5 p-6 rounded-3xl border border-white/10"><Clock className="text-yellow-400 w-8 h-8 flex-shrink-0 animate-pulse" /><div><p className="text-white font-black text-xl leading-tight">24/7 Support Active</p></div></li></ul></div>
          </div>
          <div className="pt-16 border-t border-white/5 text-center text-gray-500 text-sm font-black flex flex-col md:flex-row justify-between items-center gap-6"><p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. Licensed Electrician Cape Town.</p></div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-12 right-12 z-[1000] hidden lg:block group">
        {showTooltip && (
          <aside className="absolute bottom-full right-0 mb-8 bg-charcoal text-white px-8 py-5 rounded-[2rem] text-sm font-bold whitespace-nowrap shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4"><div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center animate-pulse"><Zap className="w-5 h-5 text-white fill-current" /></div><div><p className="text-blue-400 text-[10px] uppercase tracking-widest mb-1">24/7 Live Support</p><p className="text-base">Need a fast electrical quote?</p></div></div>
            <div className="absolute top-full right-10 w-4 h-4 bg-charcoal transform rotate-45 -translate-y-2 border-r border-b border-white/10"></div>
            <button onClick={() => setShowTooltip(false)} className="absolute -top-3 -right-3 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-charcoal"><X className="w-4 h-4" /></button>
          </aside>
        )}
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full animate-radiate -z-10 scale-125 opacity-40"></div>
          <a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" className="bg-[#25D366] hover:bg-[#1ebd5e] text-white w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-[0_30px_60px_rgba(37,211,102,0.4)] transition-all hover:scale-110 active:scale-95 group-hover:rotate-[15deg] duration-500 relative" aria-label="Chat with Carlos on WhatsApp"><MessageCircle className="w-12 h-12 fill-current" /></a>
        </div>
      </div>

      {/* Mobile Bar */}
      <nav className="fixed bottom-6 left-6 right-6 lg:hidden flex gap-4 z-40">
        <a href={`tel:${BUSINESS_INFO.phoneFormatted}`} className="flex-[3] bg-blue-600 text-white py-6 rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-2xl animate-bounce-slow" aria-label="Call Carlos Electrical Now"><Phone className="w-6 h-6" /> CALL 24/7 NOW</a>
        <div className="relative flex-1"><a href={`https://wa.me/${BUSINESS_INFO.whatsapp}`} target="_blank" className="bg-[#25D366] text-white w-full h-full py-6 rounded-[1.5rem] flex items-center justify-center shadow-2xl" aria-label="WhatsApp Carlos Electrical"><MessageCircle className="w-8 h-8 fill-current" /></a></div>
      </nav>

      <style>{`
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes icon-pulse { 0%, 100% { transform: scale(1.1); filter: brightness(1.2); } 50% { transform: scale(1.25); filter: brightness(1.4); } }
        @keyframes radiate { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(1.8); opacity: 0; } }
        .animate-bounce-slow { animation: bounce-slow 5s infinite ease-in-out; }
        .animate-icon-pulse { animation: icon-pulse 1.5s infinite ease-in-out; }
        .animate-radiate { animation: radiate 2.5s infinite ease-out; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #1f2937; }
        ::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
    </div>
  );
};

export default App;
