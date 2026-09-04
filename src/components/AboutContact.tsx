import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { SERVICES, CONTACT_DETAILS, FAQS } from '../data';
import Icon from './Icon';

const HERO_BG_IMAGE = "https://i.postimg.cc/yNqKXD1M/Amanda-Kingsley-Moyo-Agile-Consultancy.jpg";

interface QuoteData {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  price: number;
  turnaround: string;
  quoteNumber: string;
  date: string;
}

export default function AboutContact() {
  const { addInquiry } = useApp();
  
  // FAQs Accordion State
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  // Inquiry Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: SERVICES[0].id,
    message: ""
  });

  const [isInquirySubmitted, setIsInquirySubmitted] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<QuoteData | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace("inq-", ""); // Extract field: name, email, phone, service, message
    setFormData(prev => ({
      ...prev,
      [fieldName === "service" ? "serviceId" : fieldName]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill out all required fields.");
      return;
    }

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      serviceId: formData.serviceId,
      message: formData.message || undefined
    });

    // Find the selected service to generate the quote details
    const selectedService = SERVICES.find(s => s.id === formData.serviceId) || SERVICES[0];

    // Generate simulated quote invoice
    const quoteNo = `AG-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    setGeneratedQuote({
      clientName: formData.name,
      clientEmail: formData.email,
      serviceName: selectedService.name,
      price: selectedService.price,
      turnaround: selectedService.deliveryTime,
      quoteNumber: quoteNo,
      date: formattedDate
    });

    setIsInquirySubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewInquiry = () => {
    setIsInquirySubmitted(false);
    setGeneratedQuote(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceId: SERVICES[0].id,
      message: ""
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      {/* Page header with background image - Textured Dark Luxury with Gold Highlights */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accent/40 gold-border-gloss bg-textured-dark">
        {/* Background image layer with Amanda Kingsley Moyo */}
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BG_IMAGE}
            alt="Amanda Kingsley Moyo - Agile Consultancy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center sm:object-[center_20%] opacity-55"
          />
          {/* Subtle dark gradient overlay allowing the image to show clearly behind the words */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060c18] via-[#060c18]/65 to-[#060c18]/75 backdrop-blur-[0.5px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto px-6 py-16 sm:py-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full gold-badge font-mono text-[11px] tracking-widest uppercase font-bold shadow-md">
            <Icon name="Sparkles" size={12} className="text-gold-bright animate-pulse" />
            <span>Connect with Us</span>
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight drop-shadow-md">
            About Us & <span className="text-gold-metallic">Support Desk</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-100 leading-relaxed font-normal max-w-2xl mx-auto drop-shadow-sm">
            Agile Consultancy simplifies the maze of corporate compliance in Zimbabwe. Contact our seasoned registrars or get an instantaneous filing quotation below.
          </p>
        </div>
      </div>

      {/* Grid Layout: FAQs and Inquiries Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Left Column: FAQ Accordion */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-accent font-bold uppercase block">
              Knowledge Base
            </span>
            <h2 className="font-display font-bold text-lg sm:text-2xl text-primary dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-light leading-relaxed">
              Have a question regarding local entity setup? Learn about the standard differences and regulatory filings required for operating in compliance with government registers.
            </p>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-[#1a2b44] border-t border-b border-gray-100 dark:border-[#1a2b44]">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center text-left py-1 text-xs font-semibold text-primary dark:text-white hover:text-accent dark:hover:text-gold-bright transition-colors focus:outline-hidden cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <Icon
                    name={activeFaqIndex === idx ? "Minus" : "Plus"}
                    size={14}
                    className="text-accent shrink-0 ml-4"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaqIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11.5px] text-gray-500 dark:text-gray-300 leading-relaxed font-light pt-2 pl-1">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Map Pin and Direct Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-gray-50 dark:bg-textured-card p-5 rounded-xl border border-gray-200 dark:border-[#1d2d47] text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-primary dark:text-gold-bright font-bold">
                <Icon name="MapPin" size={13} className="text-accent" />
                <span>Headquarters</span>
              </div>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-light pl-5">
                {CONTACT_DETAILS.address}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-primary dark:text-gold-bright font-bold">
                <Icon name="Phone" size={13} className="text-accent" />
                <span>Call or WhatsApp</span>
              </div>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-light pl-5">
                {CONTACT_DETAILS.phone1} <br />
                {CONTACT_DETAILS.phone2}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-primary dark:text-gold-bright font-bold">
                <Icon name="Mail" size={13} className="text-accent" />
                <span>Support Email</span>
              </div>
              <p className="text-gray-500 dark:text-gray-300 leading-relaxed font-light pl-5">
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-accent dark:hover:text-gold-bright transition-colors font-medium">
                  {CONTACT_DETAILS.email}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form / Quote Generator */}
        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-textured-card rounded-2xl border border-gray-100 dark:border-[#1c2c47] shadow-xl p-6 relative transition-colors">
            <AnimatePresence mode="wait">
              {isInquirySubmitted && generatedQuote ? (
                /* Generated Quote / Invoice View */
                <motion.div
                  key="quote-invoice"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-1.5">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                      <Icon name="CheckCircle2" size={24} />
                    </div>
                    <h3 className="font-display font-extrabold text-base text-gray-800 dark:text-white leading-none">
                      Statutory Quote Generated
                    </h3>
                    <p className="text-[11px] text-gray-400 font-light">
                      A copy has been logged. Use this for your formal internal approval processes.
                    </p>
                  </div>

                  {/* Document Box */}
                  <div className="border border-gray-200 dark:border-[#1d2f4d] rounded-xl p-5 bg-white dark:bg-[#070e1b] space-y-4 shadow-xs font-sans text-xs">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start border-b border-gray-100 dark:border-[#18273f] pb-3">
                      <div>
                        <span className="block font-bold text-primary dark:text-white uppercase tracking-wider text-[11px]">
                          Agile Consultancy
                        </span>
                        <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-mono">
                          Corporate Registry
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-gold-bright">
                          {generatedQuote.quoteNumber}
                        </span>
                        <span className="block text-[9px] text-gray-400">
                          {generatedQuote.date}
                        </span>
                      </div>
                    </div>

                    {/* Addressed To */}
                    <div className="space-y-1 text-gray-600 dark:text-gray-300 font-light">
                      <p>
                        <span className="font-semibold text-gray-500 dark:text-gray-400">Addressed To:</span>{" "}
                        {generatedQuote.clientName}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-500 dark:text-gray-400">Contact Email:</span>{" "}
                        {generatedQuote.clientEmail}
                      </p>
                    </div>

                    {/* Table Details */}
                    <div className="border-t border-b border-gray-100 dark:border-[#18273f] py-3 my-2 bg-gray-50 dark:bg-[#0c1626] px-3 rounded-lg space-y-1.5">
                      <div className="flex justify-between font-bold text-primary dark:text-white">
                        <span>Filing Description</span>
                        <span>Filing Cost</span>
                      </div>
                      <div className="flex justify-between text-gray-600 dark:text-gray-300 font-light text-[11px]">
                        <span>{generatedQuote.serviceName}</span>
                        <span className="font-bold text-gold-bright">${generatedQuote.price}</span>
                      </div>
                      <div className="flex justify-between text-gray-400 text-[10px] italic pt-1 border-t border-gray-100/50 dark:border-[#152338]">
                        <span>Turnaround: {generatedQuote.turnaround}</span>
                        <span>State Fees Included</span>
                      </div>
                    </div>

                    {/* Estimate Fee */}
                    <div className="flex justify-between items-center font-bold text-sm text-primary dark:text-white">
                      <span>Total Estimated Fee:</span>
                      <span className="text-lg font-black text-gold-metallic">
                        ${generatedQuote.price}
                      </span>
                    </div>

                    {/* Note */}
                    <div className="text-[10px] text-gray-400 leading-normal bg-primary/5 dark:bg-accent/10 p-2 rounded border border-primary/5 dark:border-accent/20">
                      <span className="font-semibold text-primary dark:text-gold-bright block mb-0.5">Note:</span>
                      This quote is an estimation based on standard statutory rates. It remains valid for 30 calendar days.
                    </div>
                  </div>

                  {/* Quote actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handlePrint}
                      className="flex-1 bg-gray-100 dark:bg-[#14233a] hover:bg-gray-200 dark:hover:bg-[#1a2e4d] text-gray-700 dark:text-gray-200 font-bold text-xs uppercase py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer border border-gray-200 dark:border-[#223554] shadow-2xs"
                    >
                      <Icon name="FileText" size={13} />
                      <span>Print Quote / Invoice</span>
                    </button>
                    <button
                      onClick={handleNewInquiry}
                      className="flex-1 gold-gloss-btn text-xs uppercase py-3 rounded-lg transition-colors text-center cursor-pointer"
                    >
                      New Inquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Inquiry Form View */
                <motion.div
                  key="inquiry-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-1.5 border-b border-gray-100 dark:border-[#18273f] pb-3">
                    <h3 className="font-display font-bold text-base text-primary dark:text-white">
                      Consultation & Quote Inquiry
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal font-light">
                      Need a personalized quotation or custom advice? Fill in the parameters and our senior registration consultant will email or WhatsApp your document requirements.
                    </p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inq-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Your Name <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          id="inq-name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          className="w-full text-xs border border-gray-200 dark:border-[#203250] bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="inq-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Email <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          id="inq-email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full text-xs border border-gray-200 dark:border-[#203250] bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="inq-phone" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          WhatsApp Phone <span className="text-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          id="inq-phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 077 628 7179"
                          className="w-full text-xs border border-gray-200 dark:border-[#203250] bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="inq-service" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Inquiry Service <span className="text-accent">*</span>
                        </label>
                        <select
                          id="inq-service"
                          value={formData.serviceId}
                          onChange={handleInputChange}
                          className="w-full text-xs border border-gray-200 dark:border-[#203250] bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all cursor-pointer"
                        >
                          {SERVICES.map(s => (
                            <option key={s.id} value={s.id} className="bg-white dark:bg-[#0c182b] text-gray-800 dark:text-gray-100">
                              {s.name} (${s.price})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inq-message" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        How can we help? (Optional)
                      </label>
                      <textarea
                        id="inq-message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Detail any specifics, such as share holding split, trade license category or urgent timelines..."
                        className="w-full text-xs border border-gray-200 dark:border-[#203250] bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full gold-gloss-btn text-xs uppercase py-3.5 rounded-lg tracking-wider transition-all cursor-pointer shadow-md"
                    >
                      Generate Custom Quote & Submit
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
