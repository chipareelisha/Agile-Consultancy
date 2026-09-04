import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import { CONTACT_DETAILS } from '../data';
import Icon from './Icon';

export default function ShoppingCart() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    placeOrder
  } = useApp();

  const [cartStep, setCartStep] = useState<"cart" | "checkout" | "success">("cart");
  const [orderRefId, setOrderRefId] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    companyNames: "",
    notes: "",
    agreedToTerms: true
  });

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!isCartOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCheckoutForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset state after drawer slide-out animation completes (300ms)
    setTimeout(() => {
      setCartStep("cart");
      setCheckoutForm({
        name: "",
        email: "",
        phone: "",
        companyNames: "",
        notes: "",
        agreedToTerms: true
      });
      setOrderRefId("");
    }, 300);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.email || !checkoutForm.phone) {
      alert("Please fill out all required fields.");
      return;
    }

    const res = placeOrder({
      name: checkoutForm.name,
      email: checkoutForm.email,
      phone: checkoutForm.phone,
      companyNames: checkoutForm.companyNames || undefined,
      notes: checkoutForm.notes || undefined
    });

    if (res.success) {
      setOrderRefId(res.orderId);
      setCartStep("success");
    }
  };

  // Checks if we have PLC or PBC in the cart to dynamically request proposed names
  const hasCompanyRegistration = cart.some(item =>
    ["private-limited-company", "private-business-corporation"].includes(item.product.id)
  );

  // Generates the customized text payload to trigger direct WhatsApp chats
  const getWhatsAppMsg = () => {
    const itemsList = cart.length > 0
      ? cart.map(item => `• ${item.product.name} (Qty: ${item.quantity})`).join("%0A")
      : "Our selected services";
    
    return `Hello Agile Consultancy! I just submitted an order on your portal.%0A%0A*Order Details:*%0A*Order Reference:* ${orderRefId}%0A*Client:* ${checkoutForm.name}%0A*Phone:* ${checkoutForm.phone}%0A*Items:*%0A${itemsList}%0A*Total Fee:* $${subtotal}%0A%0APlease let me know the next steps to begin processing our registration. Thank you!`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div
          onClick={handleClose}
          className="absolute inset-0 bg-primary/40 backdrop-blur-xs transition-opacity cursor-pointer"
          aria-hidden="true"
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="pointer-events-auto w-screen max-w-md bg-white dark:bg-textured-dark shadow-2xl flex flex-col h-full border-l border-gray-100 dark:border-[#1d2f4d] text-left transition-colors"
          >
            {/* Header - Textured Executive Navy */}
            <div className="px-6 py-5 border-b border-accent/20 flex items-center justify-between bg-textured-navy text-white">
              <div className="flex items-center gap-2.5">
                <Icon name="ShoppingBag" className="text-gold-bright" size={18} />
                <h2 className="text-base font-bold font-display tracking-wide text-white" id="slide-over-title">
                  {cartStep === "cart" && `Your Cart (${totalItems})`}
                  {cartStep === "checkout" && "Checkout Particulars"}
                  {cartStep === "success" && "Order Initiated!"}
                </h2>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cartStep === "cart" && (
                <>
                  {cart.length === 0 ? (
                    /* Empty Cart State */
                    <div className="h-full flex flex-col items-center justify-center text-center py-20 px-4">
                      <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-[#091322] flex items-center justify-center text-gray-400 mb-4 border border-gray-100 dark:border-[#192a43]">
                        <Icon name="ShoppingBag" size={24} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Your cart is empty</h3>
                      <p className="text-xs text-gray-400 mt-1.5 max-w-[240px] font-light leading-relaxed">
                        Choose from our professional services to formalize your business today.
                      </p>
                      <button
                        onClick={handleClose}
                        className="mt-6 gold-gloss-btn text-xs tracking-wider uppercase py-2.5 px-6 rounded-md cursor-pointer"
                      >
                        Browse Services
                      </button>
                    </div>
                  ) : (
                    /* Cart Items List State */
                    <div className="space-y-6">
                      <div className="divide-y divide-gray-100 dark:divide-[#18273f]">
                        {cart.map((item) => (
                          <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                            <div className="w-11 h-11 rounded-lg bg-primary/5 dark:bg-accent/15 border border-primary/10 dark:border-accent/30 flex items-center justify-center text-primary dark:text-gold-bright shrink-0 mt-0.5">
                              <Icon name={item.product.icon} size={18} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-xs font-bold text-gray-800 dark:text-white leading-snug">
                                  {item.product.name}
                                </h4>
                                <span className="text-xs font-black text-primary dark:text-gold-bright shrink-0">
                                  ${item.product.price * item.quantity}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-400 truncate mt-0.5">
                                Turnaround: {item.product.deliveryTime}
                              </p>

                              {/* Conditional Company Details Note */}
                              {["private-limited-company", "private-business-corporation"].includes(item.product.id) && (
                                <div className="mt-2.5 bg-gray-50/70 dark:bg-[#070e1b] rounded-md p-2 border border-gray-100 dark:border-[#1a2b44] text-[10px] text-gray-500 dark:text-gray-300 font-light">
                                  <span className="font-semibold text-primary dark:text-gold-bright block mb-0.5">
                                    Company Details Preview:
                                  </span>
                                  <span className="block italic">
                                    Proposed name options requested at checkout step
                                  </span>
                                </div>
                              )}

                              {/* Item Quantity Actions */}
                              <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-50 dark:border-[#18273f]">
                                <div className="flex items-center gap-1 border border-gray-200 dark:border-[#213554] rounded-md bg-gray-50 dark:bg-[#0b1626]">
                                  <button
                                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-gold-bright transition-colors cursor-pointer"
                                  >
                                    <Icon name="Minus" size={11} />
                                  </button>
                                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 px-1 w-6 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-primary dark:hover:text-gold-bright transition-colors cursor-pointer"
                                  >
                                    <Icon name="Plus" size={11} />
                                  </button>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-xs text-red-500 hover:text-red-400 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  <Icon name="Trash2" size={12} />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Security compliance benefit note */}
                      <div className="bg-[#0a1931]/5 dark:bg-accent/10 rounded-lg p-3.5 border border-[#0a1931]/10 dark:border-accent/25 flex gap-3 text-left">
                        <Icon name="ShieldCheck" className="text-accent dark:text-gold-bright shrink-0 mt-0.5" size={16} />
                        <div>
                          <h5 className="text-[11px] font-bold text-primary dark:text-gold-bright leading-none">
                            100% Compliant Filing
                          </h5>
                          <p className="text-[10px] text-gray-500 dark:text-gray-300 leading-relaxed mt-1 font-light">
                            Every document is scrutinized by certified experts to ensure perfect alignment with government registrar requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Checkout Form Step */}
              {cartStep === "checkout" && (
                <form onSubmit={handleSubmitOrder} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                      Order Information
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-light">
                      Please enter your contact details. Our representative will immediately reach out via WhatsApp to guide you on document submission.
                    </p>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <label htmlFor="checkout-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Contact Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="checkout-name"
                        name="name"
                        required
                        value={checkoutForm.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className="w-full text-xs border border-gray-200 dark:border-[#213554] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="checkout-email" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          id="checkout-email"
                          name="email"
                          required
                          value={checkoutForm.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com"
                          className="w-full text-xs border border-gray-200 dark:border-[#213554] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100"
                        />
                      </div>
                      <div>
                        <label htmlFor="checkout-phone" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          WhatsApp Phone <span className="text-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          id="checkout-phone"
                          name="phone"
                          required
                          value={checkoutForm.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. 077 628 7179"
                          className="w-full text-xs border border-gray-200 dark:border-[#213554] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    {/* Conditional Name Proposal Field */}
                    {hasCompanyRegistration && (
                      <div>
                        <label htmlFor="checkout-names" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Proposed Company Names (Up to 3 Options)
                        </label>
                        <textarea
                          id="checkout-names"
                          name="companyNames"
                          rows={2}
                          value={checkoutForm.companyNames}
                          onChange={handleInputChange}
                          placeholder={`1. Apex Logistics Ltd\n2. Apex Haulage Ltd\n3. Apex Supply Chain Ltd`}
                          className="w-full text-xs border border-gray-200 dark:border-[#213554] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 font-light"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 leading-snug font-light">
                          Having multiple choices ensures speedier name approval if your first choice is taken.
                        </p>
                      </div>
                    )}

                    <div>
                      <label htmlFor="checkout-notes" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Additional Information / Requests
                      </label>
                      <textarea
                        id="checkout-notes"
                        name="notes"
                        rows={2}
                        value={checkoutForm.notes}
                        onChange={handleInputChange}
                        placeholder="Any specific requests or instructions..."
                        className="w-full text-xs border border-gray-200 dark:border-[#213554] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-gray-50/50 dark:bg-[#070e1b] text-gray-800 dark:text-gray-100 font-light"
                      />
                    </div>

                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="checkout-agreed"
                        name="agreedToTerms"
                        checked={checkoutForm.agreedToTerms}
                        onChange={e => setCheckoutForm(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
                        className="mt-0.5 accent-accent"
                        required
                      />
                      <label htmlFor="checkout-agreed" className="text-[10px] text-gray-500 dark:text-gray-300 leading-normal font-light">
                        I authorize Agile Consultancy to submit statutory filings. All provided records are accurate.
                      </label>
                    </div>
                  </div>
                </form>
              )}

              {/* Order Success Confirmation Step */}
              {cartStep === "success" && (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-emerald-500 flex items-center justify-center mb-5 animate-bounce shadow-xs">
                    <Icon name="CheckCircle2" size={26} />
                  </div>
                  
                  <h3 className="font-display font-bold text-base text-gray-800 dark:text-white">
                    Order Initiated Successfully!
                  </h3>
                  
                  <p className="text-xs text-gray-400 mt-1 font-light">
                    Order Ref: <span className="font-mono font-bold text-gray-700 dark:text-gold-bright">{orderRefId}</span>
                  </p>

                  <div className="my-6 bg-gray-50 dark:bg-[#070e1b] rounded-xl p-4.5 border border-gray-100 dark:border-[#1d2f4d] text-left w-full max-w-sm space-y-3">
                    <h4 className="text-[11px] font-bold text-primary dark:text-gold-bright uppercase tracking-wider border-b border-gray-200 dark:border-[#192a43] pb-1.5 leading-none">
                      Next Step: Instant Activation
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed font-light">
                      To fast-track processing, click the button below to connect with us on WhatsApp. We will request your ID copies and start preparation immediately.
                    </p>
                    <a
                      href={`https://wa.me/${CONTACT_DETAILS.phone1Raw}?text=${getWhatsAppMsg()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors cursor-pointer border border-white/5 shadow-xs"
                    >
                      <Icon name="Phone" size={13} />
                      <span>Send to WhatsApp</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-gray-400 max-w-[280px] leading-normal font-light">
                    You can also email your documents directly to{" "}
                    <a href={`mailto:${CONTACT_DETAILS.email}`} className="text-accent underline font-medium">
                      {CONTACT_DETAILS.email}
                    </a>
                    .
                  </p>

                  <button
                    onClick={handleClose}
                    className="mt-8 text-xs text-primary dark:text-gold-bright hover:text-accent font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Icon name="ArrowLeft" size={12} />
                    <span>Return to Portal</span>
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Subtotal Bar */}
            {cartStep !== "success" && cart.length > 0 && (
              <div className="border-t border-gray-100 dark:border-[#18273f] bg-gray-50 dark:bg-[#070d18] px-6 py-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Subtotal</span>
                  <span className="text-base font-black text-primary dark:text-gold-bright">${subtotal}</span>
                </div>
                
                <div className="flex justify-between items-center text-xs text-gray-400 border-b border-gray-200 dark:border-[#18273f] pb-3">
                  <span className="font-light">Professional Consultation</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 uppercase text-[10px]">
                    Included Free
                  </span>
                </div>

                <div className="pt-1">
                  {cartStep === "cart" ? (
                    <button
                      type="button"
                      onClick={() => setCartStep("checkout")}
                      className="w-full gold-gloss-btn py-3 px-4 rounded-md text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Checkout Particulars</span>
                      <Icon name="ArrowRight" size={12} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitOrder}
                      disabled={!checkoutForm.agreedToTerms}
                      className="w-full gold-gloss-btn disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 rounded-md text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Icon name="ShieldCheck" size={14} />
                      <span>Place Order</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
