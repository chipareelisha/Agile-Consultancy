import { motion } from 'motion/react';
import { useApp } from '../App';
import { SERVICES, CONTACT_DETAILS } from '../data';
import Icon from './Icon';

// High-quality corporate professional portrait
const CONSULTANT_IMAGE = "https://i.postimg.cc/mrx4NPZx/494481140-10006451832805375-5306596983996882060-n.jpg";

export default function Home() {
  const { setActivePage, addToCart } = useApp();

  // Selected core services to display on the Home page
  const coreServices = SERVICES.filter(service => 
    ["private-limited-company", "tin-registration", "clearance-tax", "vendor-number"].includes(service.id)
  );

  const navigateTo = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-textured-dark overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center border-b border-accent/30 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(229,184,59,0.12),transparent_50%)]" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text and Highlights */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 gold-badge rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
              >
                <Icon name="Sparkles" size={13} className="text-gold-bright animate-pulse" />
                <span>Certified Corporate Agency • Zimbabwe</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                  Company <br />
                  <span className="text-gold-metallic relative inline-block mt-1">
                    Registration
                    <span className="absolute bottom-1.5 left-0 w-full h-1.5 gold-gradient rounded-full shadow-sm" />
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-200 max-w-lg leading-relaxed font-normal">
                  Let us help you formalize your business with ease. We navigate the legal requirements and clear the bureaucracy so you can focus entirely on growth.
                </p>
              </motion.div>

              {/* Three key highlight bullets */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4.5 pt-4"
              >
                <div className="bg-[#0b1626]/80 border border-white/10 hover:border-accent/50 rounded-lg p-4 space-y-2 transition-all group backdrop-blur-xs shadow-md">
                  <div className="w-8 h-8 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Icon name="ShieldCheck" size={16} className="text-gold-bright" />
                  </div>
                  <h3 className="text-xs font-bold text-white">100% Compliant</h3>
                  <p className="text-[10.5px] text-gray-300 leading-snug font-light">
                    Full compliance with all statutory registration requirements.
                  </p>
                </div>

                <div className="bg-[#0b1626]/80 border border-white/10 hover:border-accent/50 rounded-lg p-4 space-y-2 transition-all group backdrop-blur-xs shadow-md">
                  <div className="w-8 h-8 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Icon name="Clock" size={16} className="text-gold-bright" />
                  </div>
                  <h3 className="text-xs font-bold text-white">Fast & Reliable</h3>
                  <p className="text-[10.5px] text-gray-300 leading-snug font-light">
                    Quick turnarounds to keep your enterprise moving forward.
                  </p>
                </div>

                <div className="bg-[#0b1626]/80 border border-white/10 hover:border-accent/50 rounded-lg p-4 space-y-2 transition-all group backdrop-blur-xs shadow-md">
                  <div className="w-8 h-8 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <Icon name="Users" size={16} className="text-gold-bright" />
                  </div>
                  <h3 className="text-xs font-bold text-white">Trusted Experts</h3>
                  <p className="text-[10.5px] text-gray-300 leading-snug font-light">
                    Vetted corporate consultants providing professional advice.
                  </p>
                </div>
              </motion.div>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button
                  onClick={() => navigateTo("products")}
                  className="gold-gloss-btn text-xs tracking-wider uppercase py-3.5 px-7 rounded-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Services Catalog</span>
                  <Icon name="ArrowRight" size={13} className="text-[#070d18]" />
                </button>
                <a
                  href={`https://wa.me/${CONTACT_DETAILS.phone1Raw}?text=${encodeURIComponent("Hi Agile Consultancy, I would like to consult about registering a new company.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-accent/40 hover:border-accent hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase py-3.5 px-6 rounded-md transition-all flex items-center gap-2 backdrop-blur-xs"
                >
                  <Icon name="Phone" size={13} className="text-gold-bright" />
                  <span>Chat on WhatsApp</span>
                </a>
              </motion.div>
            </div>

            {/* Hero Image Side */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative mx-auto max-w-sm lg:max-w-none aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-[#070d18] shadow-2xl border-2 border-accent/50 gold-border-gloss"
              >
                <img
                  src={CONSULTANT_IMAGE}
                  alt="Professional Consultant Smiling"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top brightness-100"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-[#070e1b]/95 border border-accent/40 p-4.5 rounded-xl backdrop-blur-md z-20 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest text-gold-bright uppercase font-bold">
                      Active Consultations
                    </span>
                  </div>
                  <p className="text-xs text-white font-normal mt-1.5 leading-normal italic">
                    "Helping Zimbabwean entrepreneurs launch successfully with 100% compliant statutory registration packages."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Core Offerings Catalog */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-3.5 max-w-xl mx-auto mb-12">
          <span className="font-mono text-[10px] tracking-widest text-accent font-bold uppercase block">
            Statutory Services
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3.5xl text-primary dark:text-white tracking-tight">
            Our Core Offerings
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
            Fully certified compliance packages built to accelerate your corporate setup in full alignment with national registration parameters.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-textured-card rounded-xl border border-gray-100 dark:border-[#1d2d47] hover:border-accent/40 dark:hover:border-accent/60 hover:shadow-xl hover:shadow-accent/5 transition-all p-5 flex flex-col justify-between group"
            >
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 dark:bg-accent/10 group-hover:bg-accent/15 flex items-center justify-center text-primary dark:text-gold-bright group-hover:text-accent transition-colors">
                    <Icon name={service.icon} size={18} />
                  </div>
                  <span className="text-[9px] font-mono tracking-wider font-semibold uppercase bg-gray-50 dark:bg-[#070e1b] border border-gray-100 dark:border-[#1c2c47] text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                    {service.category}
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-primary dark:text-white group-hover:text-accent dark:group-hover:text-gold-bright transition-colors line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-[11.5px] text-gray-500 dark:text-gray-300 leading-normal line-clamp-3 font-light">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-4.5 mt-4.5 border-t border-gray-100 dark:border-[#19273f] flex items-center justify-between">
                <div className="text-left">
                  <span className="block text-[10px] text-gray-400 dark:text-gray-400 leading-none">Total Filing Fee</span>
                  <span className="text-sm font-black text-primary dark:text-gold-bright">${service.price}</span>
                </div>
                <button
                  onClick={() => addToCart(service, 1)}
                  className="bg-primary dark:bg-[#0f1d33] hover:bg-[#142a4d] dark:hover:bg-accent dark:hover:text-[#070d18] text-white dark:text-gray-200 border border-transparent dark:border-accent/30 py-1.5 px-3.5 rounded-md text-[10px] font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Icon name="Plus" size={11} className="text-accent" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={() => navigateTo("products")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary dark:text-gold-bright hover:text-accent dark:hover:text-accent-light transition-colors uppercase tracking-wider cursor-pointer"
          >
            <span>Browse All 8 Statutory Services</span>
            <Icon name="ArrowRight" size={12} />
          </button>
        </div>
      </section>

      {/* Simplified Flow Steps */}
      <section className="bg-gray-100/60 dark:bg-[#070d19] py-16 border-y border-gray-200/70 dark:border-[#16253c] transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-3 max-w-xl mx-auto mb-14">
            <span className="font-mono text-[10px] tracking-widest text-accent font-bold uppercase block">
              Simplified Workflow
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-primary dark:text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-light">
              We have condensed company registration into three quick, fully managed stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="relative space-y-3.5 text-center bg-white dark:bg-textured-card border border-gray-200 dark:border-[#1d2d47] p-6.5 rounded-xl shadow-xs">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a1931] text-gold-bright flex items-center justify-center font-display font-bold text-sm border-2 border-accent/40 shadow-md">
                1
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white pt-3">Configure & Buy</h3>
              <p className="text-[11.5px] text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                Select your statutory services online, fill in your desired company names, and submit your secure order.
              </p>
            </div>

            <div className="relative space-y-3.5 text-center bg-white dark:bg-textured-card border border-gray-200 dark:border-[#1d2d47] p-6.5 rounded-xl shadow-xs">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a1931] text-gold-bright flex items-center justify-center font-display font-bold text-sm border-2 border-accent/40 shadow-md">
                2
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white pt-3">Submit Documents</h3>
              <p className="text-[11.5px] text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                Connect on WhatsApp to instantly send director ID copies and complete our brief, frictionless profiling questionnaire.
              </p>
            </div>

            <div className="relative space-y-3.5 text-center bg-white dark:bg-textured-card border border-gray-200 dark:border-[#1d2d47] p-6.5 rounded-xl shadow-xs">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full gold-gradient text-[#070d18] flex items-center justify-center font-display font-black text-sm border-2 border-white/40 shadow-md">
                3
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-white pt-3">Statutory Papers Issued</h3>
              <p className="text-[11.5px] text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                We manage the state filings, procure the certified government stamps, and deliver your ready papers digitally & physically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-textured-navy rounded-2xl p-8 sm:p-12 border border-accent/30 text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(229,184,59,0.15),transparent_50%)]" />
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h2 className="font-display font-bold text-xl sm:text-3xl text-white tracking-tight leading-snug">
              Ready to Establish Your Corporate Legitimacy?
            </h2>
            <p className="text-xs text-gray-200 leading-relaxed font-light">
              Don’t let registration bottlenecks freeze your business trajectory. Get 100% compliant filings backed by vetted regulatory consultants today.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap justify-center items-center gap-4.5 pt-2">
            <button
              onClick={() => navigateTo("products")}
              className="gold-gloss-btn text-xs tracking-wider uppercase py-3.5 px-7 rounded-md shadow-md cursor-pointer"
            >
              Get Registered Instantly
            </button>
            <a
              href={`https://wa.me/${CONTACT_DETAILS.phone2Raw}?text=${encodeURIComponent("Hi Agile Consultancy, I am on your website and want to ask some questions about company incorporation.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-accent/40 hover:border-accent hover:bg-white/10 text-white font-medium text-xs tracking-wider uppercase py-3.5 px-6 rounded-md transition-all flex items-center gap-2 backdrop-blur-xs"
            >
              <Icon name="Phone" size={13} className="text-gold-bright" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
