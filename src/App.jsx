import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Shield,
  Users,
  Wrench,
  PhoneCall,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Check,
  ArrowDown,
  Clock,
  Globe,
  Award,
  MessageSquare,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';

const DriverseFoundation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentPartner, setCurrentPartner] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll testimonials carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll partners carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPartner((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after animation
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all sections with data-animate attribute
    const sections = document.querySelectorAll('section[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  // Restored original colorful icons for distinct program identification
  const programsDetailed = [
    {
      id: "health",
      title: "Health & Wellness",
      subtitle: "Prioritizing the physical and mental well-being of every driver.",
      description: "Long-haul driving takes a toll on the body and mind. Our comprehensive wellness initiatives focus on fatigue management, ergonomic practices, and mental resilience. We provide accessible resources that fit the on-the-road lifestyle.",
      points: ["Fatigue Management Strategies", "Mental Health First Aid", "Healthy Eating on the Road", "Ergonomic Driving Practices"],
      icon: <Heart className="w-6 h-6 text-red-500" />,
      image: "https://images.unsplash.com/photo-1571019614248-c5c7c1f196bb?q=80&w=2940&auto=format&fit=crop",
      align: "left"
    },
    {
      id: "safety",
      title: "Safety Training Academy",
      subtitle: "Equipping drivers with knowledge that saves lives.",
      description: "Safety is not just a policy; it's a culture. Our workshops are designed by industry veterans to address real-world challenges. From defensive driving techniques to understanding new regulations, we keep drivers prepared for any condition.",
      points: ["Defensive Driving Workshops", "Regulatory Compliance Updates", "Severe Weather Preparedness", "Vehicle Maintenance Basics"],
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2940&auto=format&fit=crop",
      align: "right"
    },
    {
      id: "community",
      title: "Peer Support Network",
      subtitle: "Building a brotherhood and sisterhood on the highway.",
      description: "Isolation is one of the biggest challenges drivers face. We create spaces—both digital and physical—where drivers can connect, share experiences, and find mentorship. No one should have to navigate the road alone.",
      points: ["24/7 Peer Support Lines", "Mentorship for New Drivers", "Community Meetups", "Family Support Groups"],
      icon: <Users className="w-6 h-6 text-green-600" />,
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop",
      align: "left"
    },
    {
      id: "newcomer",
      title: "Newcomer & Mechanic Pathways",
      subtitle: "Guiding the next generation of industry professionals.",
      description: "Entering the trucking industry can be overwhelming. We provide specialized resources for new drivers and mechanics, helping them navigate training standards, safety protocols, and career development opportunities.",
      points: ["Entry-Level Training Guides", "Safety Standards Certification", "Mechanic Apprenticeship Resources", "Industry Integration Workshops"],
      icon: <Wrench className="w-6 h-6 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=2940&auto=format&fit=crop",
      align: "right"
    },
    {
      id: "crisis",
      title: "Crisis Response Pathways",
      subtitle: "Immediate assistance when it matters most.",
      description: "Accidents, medical emergencies, or sudden hardships can happen to anyone. Our crisis pathways connect drivers directly to trusted resources, emergency funds, and urgent care networks to ensure they are never left stranded.",
      points: ["Emergency Financial Aid", "Urgent Medical Referrals", "Legal Aid Connections", "Family Emergency Coordination"],
      icon: <PhoneCall className="w-6 h-6 text-purple-600" />,
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=2940&auto=format&fit=crop",
      align: "left"
    }
  ];

  const faqs = [
    {
      question: "How can I apply for financial assistance?",
      answer: "Applications for financial assistance can be submitted directly through our 'Crisis Pathways' portal. You will need to provide proof of employment (CDL) and documentation regarding your emergency. Our team reviews requests within 48 hours."
    },
    {
      question: "Are the safety workshops free for all drivers?",
      answer: "Yes! Thanks to our generous donors and partners, all our online safety webinars and local workshops are provided at no cost to active CDL holders."
    },
    {
      question: "I am a new driver. How do I find a mentor?",
      answer: "Join our Peer Support Network by signing up on our website. We will match you with an experienced driver based on your region and haul type to guide you through your first year."
    },
    {
      question: "Is my donation tax-deductible?",
      answer: "Yes, the Driverse Foundation is a registered non-profit organization. All donations are tax-deductible to the extent allowed by law. You will receive an email receipt immediately after donating."
    }
  ];

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/20">
              D
            </div>
            <div className="flex flex-col">
              <span className={`text-2xl font-bold tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Driverse
              </span>
              <span className={`text-sm tracking-widest uppercase font-semibold ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>
                Foundation
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {['Mission', 'Programs', 'Stories', 'FAQ', 'Get Involved'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className={`text-sm font-bold uppercase tracking-wide hover:text-blue-500 transition-colors ${scrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {item}
              </a>
            ))}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center gap-2">
              Donate Now <Heart className="w-4 h-4 fill-current" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 p-6 lg:hidden flex flex-col gap-6 animate-slide-down">
            {['Mission', 'Programs', 'Stories', 'FAQ', 'Get Involved'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl font-bold text-slate-800 py-3 border-b border-slate-100 flex justify-between items-center"
              >
                {item} <ChevronRight className="w-5 h-5 text-slate-300" />
              </a>
            ))}
            <button className="bg-blue-600 text-white w-full py-4 rounded-xl font-bold text-lg mt-4 shadow-xl shadow-blue-200">
              Donate Now
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-slate-900/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/90 z-10"></div>

        {/* Hero Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 animate-slow-zoom"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506306462723-7bd06a77ae74?q=80&w=2940&auto=format&fit=crop')",
          }}
        ></div>

        <div className="relative z-20 container mx-auto px-6 max-w-5xl mt-20">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium text-sm mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Supporting Drivers Every Mile of the Way
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight animate-fade-in-up delay-100">
            Driving Change for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">Heroes of the Road</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up delay-200">
            We are dedicated to the health, safety, and well-being of truck drivers.
            Providing the resources, training, and community support needed to keep
            our supply chain moving safely.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up delay-300 px-4 sm:px-0">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1 flex items-center justify-center gap-3 group">
              Make a Donation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white hover:bg-slate-100 text-slate-900 px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center">
              Our Programs
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce text-white/50">
          <ArrowDown className="w-8 h-8" />
        </div>
      </header>

      {/* Partners Section */}

      <section data-animate className="py-8 sm:py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest text-sm mb-8">Trusted by Industry Leaders</p>

          {/* Desktop: Show all logos */}
          <div className="hidden sm:flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['LogisticsPro', 'RoadSafe', 'TruckTech', 'GlobalFreight', 'DriverUnion'].map((partner, i) => (
              <div key={i} className="text-lg sm:text-2xl font-black text-slate-400 font-serif flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
                <div className="w-8 h-8 bg-slate-300 rounded-full"></div> {partner}
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="sm:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentPartner * 100}%)` }}
            >
              {['LogisticsPro', 'RoadSafe', 'TruckTech', 'GlobalFreight', 'DriverUnion'].map((partner, i) => (
                <div key={i} className="min-w-full flex justify-center items-center py-4">
                  <div className="text-xl font-black text-slate-400 font-serif flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-300 rounded-full"></div> {partner}
                  </div>
                </div>
              ))}
            </div>
            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPartner(index)}
                  className={`w-2 h-2 rounded-full transition-all ${currentPartner === index ? 'bg-blue-600 w-6' : 'bg-slate-300'
                    }`}
                  aria-label={`Go to partner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Mission & Impact Section */}

      <section data-animate id="mission" className="py-16 sm:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-16 sm:mb-24">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full z-0 mix-blend-multiply filter blur-xl"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-orange-50 rounded-full z-0 mix-blend-multiply filter blur-xl"></div>
              <img
                src="https://images.unsplash.com/photo-1542308674-c3c2b8349257?q=80&w=2940&auto=format&fit=crop"
                alt="Truck driver sunset"
                className="relative z-10 rounded-3xl shadow-2xl w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute -bottom-10 -left-10 z-20 bg-white p-8 rounded-2xl shadow-xl border border-slate-50 max-w-xs hidden md:block">
                <p className="text-lg font-serif italic text-slate-600">
                  "The foundation was there when I had nowhere else to turn. They are family."
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">JD</div>
                  <div>
                    <p className="font-bold text-slate-900">John D.</p>
                    <p className="text-xs text-slate-500">Long-haul Driver</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Mission</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
                Bridging the Gap Between <br />the Road and Life.
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>
                  The road can be a lonely and demanding place. The Driverse Foundation exists to serve as the vital link between the relentless demands of the logistics industry and the fundamental human needs of the driver.
                </p>
                <p>
                  We believe that a healthy driver is a safe driver. From mental health support to crisis intervention, we are building a safety net for the men and women who keep our economies running. Our focus is holistic: body, mind, and professional growth.
                </p>
              </div>

              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900">Nationwide</h4>
                    <p className="text-slate-500">Access to resources across the country.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-slate-900">24/7 Support</h4>
                    <p className="text-slate-500">Available whenever the wheels are turning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-slate-100 pt-12 sm:pt-16">
            {[
              { label: "Drivers Supported", value: "500+", suffix: "" },
              { label: "Safety Workshops", value: "50", suffix: "+" },
              { label: "Crisis Interventions", value: "100", suffix: "%" },
              { label: "States Covered", value: "48", suffix: "" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.value}<span className="text-blue-400 text-2xl sm:text-3xl">{stat.suffix}</span>
                </h3>
                <p className="text-slate-500 uppercase tracking-wide font-medium text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Detailed Programs Section */}

      <section data-animate id="programs" className="bg-slate-50 py-16 sm:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Core Initiatives</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">Five Pillars of Support</h2>
            <p className="text-base sm:text-xl text-slate-600 leading-relaxed px-4 sm:px-0">
              We focus on the essential aspects of a driver's life, ensuring comprehensive support where it matters most—on and off the road.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-24">
            {programsDetailed.map((program, index) => (
              <div
                key={program.id}
                className={`flex flex-col lg:flex-row gap-8 sm:gap-16 items-center ${program.align === 'right' ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className={`absolute top-0 ${program.align === 'left' ? '-left-4' : '-right-4'} w-full h-full border-2 border-slate-200 rounded-3xl transform ${program.align === 'left' ? '-rotate-3' : 'rotate-3'} transition-transform group-hover:rotate-0`}></div>
                  <img
                    src={program.image}
                    alt={program.title}
                    className="relative z-10 rounded-3xl shadow-xl w-full h-[250px] sm:h-[350px] lg:h-[400px] object-cover"
                  />
                  <div className="absolute bottom-6 right-6 z-20 bg-white p-4 rounded-xl shadow-lg">
                    {program.icon}
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{program.title}</h3>
                  <p className="text-base sm:text-lg text-blue-600 font-medium mb-4 sm:mb-6">{program.subtitle}</p>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                    {program.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {program.points.map((point, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-slate-700 font-medium text-sm sm:text-base">{point}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#" className="inline-flex items-center text-slate-900 font-bold border-b-2 border-blue-500 hover:text-blue-600 hover:border-blue-600 transition-colors pb-1 text-lg">
                    Learn more about {program.title.split(' ')[0]} <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Testimonials Section */}

      <section data-animate id="stories" className="py-16 sm:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 -skew-x-12 translate-x-1/4"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Voices from the Road</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">Real Stories, Real Impact</h2>
            </div>
            <a href="#" className="hidden md:flex items-center text-blue-600 font-bold hover:translate-x-2 transition-transform">
              Read all stories <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>

          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                text: "After my accident, I thought my career was over. The Foundation helped me navigate the legal maze and supported my family while I recovered.",
                name: "Michael R.",
                role: "Owner Operator, 15 years",
                image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2940&auto=format&fit=crop"
              },
              {
                text: "The mental health resources kept me sane during the holidays. Knowing there's someone to talk to at 2 AM makes all the difference.",
                name: "Sarah J.",
                role: "Long-haul Driver",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop"
              },
              {
                text: "As a new driver, the mentorship program was a lifesaver. I learned more in 3 months with my mentor than I did in driving school.",
                name: "David K.",
                role: "Rookie Driver",
                image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=2787&auto=format&fit=crop"
              }
            ].map((story, i) => (
              <div key={i} className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <MessageSquare className="w-10 h-10 text-blue-100 mb-6" />
                <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed italic text-sm sm:text-base">"{story.text}"</p>
                <div className="flex items-center gap-4">
                  <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h5 className="font-bold text-slate-900">{story.name}</h5>
                    <p className="text-xs text-slate-500 uppercase font-semibold">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {[
                  {
                    text: "After my accident, I thought my career was over. The Foundation helped me navigate the legal maze and supported my family while I recovered.",
                    name: "Michael R.",
                    role: "Owner Operator, 15 years",
                    image: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=2940&auto=format&fit=crop"
                  },
                  {
                    text: "The mental health resources kept me sane during the holidays. Knowing there's someone to talk to at 2 AM makes all the difference.",
                    name: "Sarah J.",
                    role: "Long-haul Driver",
                    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop"
                  },
                  {
                    text: "As a new driver, the mentorship program was a lifesaver. I learned more in 3 months with my mentor than I did in driving school.",
                    name: "David K.",
                    role: "Rookie Driver",
                    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=2787&auto=format&fit=crop"
                  }
                ].map((story, i) => (
                  <div key={i} className="min-w-full px-2">
                    <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                      <MessageSquare className="w-10 h-10 text-blue-100 mb-6" />
                      <p className="text-slate-600 mb-6 leading-relaxed italic text-sm">"{story.text}"</p>
                      <div className="flex items-center gap-4">
                        <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h5 className="font-bold text-slate-900">{story.name}</h5>
                          <p className="text-xs text-slate-500 uppercase font-semibold">{story.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${currentTestimonial === index ? 'bg-blue-600 w-8' : 'bg-slate-300'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}

      <section data-animate id="faq" className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 sm:gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="w-8 h-8 text-blue-400" />
                <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Common Questions</h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                We know you don't have time to waste. Here are quick answers to the most common questions about our programs and assistance.
              </p>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all border border-white/10">
                Contact Support
              </button>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'bg-white/10' : ''}`}
                  >
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex justify-between items-center p-6 text-left"
                    >
                      <span className="font-bold text-base sm:text-lg pr-8">{faq.question}</span>
                      {activeAccordion === index ? <Minus className="w-5 h-5 text-blue-400" /> : <Plus className="w-5 h-5 text-slate-400" />}
                    </button>
                    <div
                      className={`px-6 text-slate-300 text-sm sm:text-base leading-relaxed overflow-hidden transition-all duration-300 ${activeAccordion === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Get Involved Section */}

      <section data-animate id="get-involved" className="py-16 sm:py-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-blue-600 rounded-2xl sm:rounded-[3rem] p-8 sm:p-12 md:p-20 relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">More Than Just a Donation.</h2>
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                  There are many ways to support the Driverse Foundation. Whether you're a fleet owner, a retired driver, or a concerned citizen, your involvement drives our mission forward.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors text-lg shadow-lg">
                    Become a Volunteer
                  </button>
                  <button className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-colors text-lg">
                    Partner With Us
                  </button>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="bg-black/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-black/20 transition-colors">
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-300" /> Corporate Sponsorship
                  </h4>
                  <p className="text-blue-100">Align your brand with road safety and driver wellness. Sponsor a workshop or a wellness kit.</p>
                </div>
                <div className="bg-black/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-black/20 transition-colors">
                  <h4 className="text-white font-bold text-xl mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-300" /> Community Ambassadorship
                  </h4>
                  <p className="text-blue-100">Spread the word at truck stops, terminals, and industry events.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Donation Section (Immersive) */}

      <section data-animate id="donate" className="py-16 sm:py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
            <Heart className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 sm:mb-8 text-blue-600 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-slate-900">Fuel the Foundation</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-500 leading-relaxed font-light px-4 sm:px-0">
              "Every mile driven is a sacrifice. Your contribution honors that sacrifice by providing safety, health, and hope to those behind the wheel."
            </p>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-200 max-w-2xl mx-auto transform hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
              {['$50', '$100', '$250'].map((amount) => (
                <button key={amount} className="border-2 border-slate-200 text-slate-500 font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all text-lg sm:text-xl">
                  {amount}
                </button>
              ))}
            </div>
            <div className="mb-6 sm:mb-8">
              <label className="block text-slate-500 text-sm font-bold mb-2 uppercase tracking-wide">Or enter custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">$</span>
                <input
                  type="number"
                  className="w-full border-2 border-slate-200 rounded-lg sm:rounded-xl py-3 sm:py-4 pl-10 pr-4 text-slate-900 text-lg sm:text-xl font-bold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 transition-all"
                  placeholder="0.00"
                />
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 sm:py-5 rounded-lg sm:rounded-xl transition-all shadow-xl hover:shadow-blue-600/30 text-lg sm:text-xl flex justify-center items-center gap-3">
              Process Secure Donation <ArrowRight className="w-6 h-6" />
            </button>
            <div className="flex justify-center items-center gap-6 mt-6 opacity-60 grayscale">
              {/* Simple representations of card logos */}
              <div className="h-8 w-12 bg-slate-200 rounded"></div>
              <div className="h-8 w-12 bg-slate-200 rounded"></div>
              <div className="h-8 w-12 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 border-t border-slate-900">

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  D
                </div>
                <span className="text-2xl font-bold text-white">
                  Driverse<span className="font-light text-blue-500">Foundation</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-8">
                A non-profit organization dedicated to the unsung heroes of our highways. Empowering truck drivers through health, wellness, and safety initiatives.
              </p>
              <div className="flex gap-5">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8">Programs</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block">Health & Wellness</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block">Safety Training</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block">Peer Support</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block">Newcomer Guide</a></li>
                <li><a href="#" className="hover:text-white hover:translate-x-2 transition-all inline-block">Crisis Pathways</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8">Get In Touch</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-600 shrink-0" />
                  <span>123 Transport Boulevard,<br />Logistics District, TC 90210</span>
                </li>
                <li className="flex items-center gap-4">
                  <PhoneCall className="w-6 h-6 text-blue-600 shrink-0" />
                  <span className="text-lg font-medium text-white">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-600 shrink-0" />
                  <span>contact@driversefoundation.org</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-8">Stay Updated</h4>
              <p className="mb-6 text-sm">Subscribe to our newsletter for the latest updates on workshops and driver resources.</p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-slate-900 border border-slate-800 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-blue-600 transition-colors"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Driverse Foundation. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm text-slate-500 font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DriverseFoundation;
