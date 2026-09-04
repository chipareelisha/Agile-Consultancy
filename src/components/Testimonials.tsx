import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../App';
import Icon from './Icon';

export default function Testimonials() {
  const { testimonials, addTestimonial } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    name: "",
    companyName: "",
    rating: 5,
    text: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.name || !feedback.text) {
      alert("Please fill out the name and feedback fields.");
      return;
    }

    // Generate initials for the avatar
    const initials = feedback.name
      .split(" ")
      .map(part => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

    addTestimonial({
      name: feedback.name,
      companyName: feedback.companyName || undefined,
      rating: feedback.rating,
      text: feedback.text,
      avatarInitials: initials
    });

    setShowSuccess(true);
    setFeedback({ name: "", companyName: "", rating: 5, text: "" });

    // Close the form after 2.5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setIsFormOpen(false);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="font-mono text-[10px] tracking-widest text-accent font-bold uppercase block">
          Client Success
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4.5xl text-primary dark:text-white tracking-tight">
          What Our Clients Say
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">
          We pride ourselves on professional execution, accurate documentation, and dedicated assistance. Read reviews from verified local business owners we have formalized.
        </p>
      </div>

      {/* Aggregate Score & Submit CTA Block */}
      <div className="bg-white dark:bg-textured-card rounded-2xl p-6 border border-gray-100 dark:border-[#1d2d47] flex flex-col md:flex-row justify-between items-center gap-6 shadow-xs text-left transition-colors">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-full gold-badge flex items-center justify-center font-display font-black text-xl shadow-xs">
            4.9
          </div>
          <div>
            <div className="flex text-accent gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Icon key={i} name="Star" size={14} className="fill-accent stroke-accent" />
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-300 font-light mt-1">
              Based on 150+ verified corporate registrations and statutory filings.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full md:w-auto gold-gloss-btn text-xs tracking-wider uppercase py-3 px-6 rounded-lg cursor-pointer"
        >
          Share Your Feedback
        </button>
      </div>

      {/* Feedback Submission Slide-down Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-gray-50 dark:bg-textured-card rounded-2xl border border-gray-200 dark:border-[#1d2d47]"
          >
            <div className="p-6 text-left max-w-xl mx-auto">
              {showSuccess ? (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-10 text-center space-y-3.5"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 text-emerald-500 flex items-center justify-center mx-auto">
                    <Icon name="Check" size={20} />
                  </div>
                  <h3 className="font-display font-bold text-base text-gray-800 dark:text-white">
                    Feedback Submitted Successfully!
                  </h3>
                  <p className="text-xs text-gray-400 font-light">
                    Thank you for your valuable response. Your testimony has been registered.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 dark:border-[#1d2d47] pb-2">
                    <h3 className="font-display font-bold text-sm text-primary dark:text-white">
                      Leave a Verified Review
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="f-name" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="f-name"
                        required
                        value={feedback.name}
                        onChange={e => setFeedback({ ...feedback, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full text-xs border border-gray-200 dark:border-[#203250] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-white dark:bg-[#070e1b] text-gray-800 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="f-company" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Company / Business Name
                      </label>
                      <input
                        type="text"
                        id="f-company"
                        value={feedback.companyName}
                        onChange={e => setFeedback({ ...feedback, companyName: e.target.value })}
                        placeholder="e.g. Apex Logistics Ltd"
                        className="w-full text-xs border border-gray-200 dark:border-[#203250] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-white dark:bg-[#070e1b] text-gray-800 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Experience Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setFeedback({ ...feedback, rating: starValue })}
                          className="text-2xl transition-transform hover:scale-110 cursor-pointer"
                        >
                          <Icon
                            name="Star"
                            size={20}
                            className={
                              feedback.rating >= starValue
                                ? "fill-accent stroke-accent"
                                : "text-gray-200 dark:text-gray-700 stroke-gray-300 dark:stroke-gray-600"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="f-text" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Your Feedback / Review *
                    </label>
                    <textarea
                      id="f-text"
                      required
                      rows={3}
                      value={feedback.text}
                      onChange={e => setFeedback({ ...feedback, text: e.target.value })}
                      placeholder="Share your experience working with Agile Consultancy..."
                      className="w-full text-xs border border-gray-200 dark:border-[#203250] rounded-md p-2.5 focus:border-accent focus:outline-hidden transition-all bg-white dark:bg-[#070e1b] text-gray-800 dark:text-gray-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full gold-gloss-btn text-xs uppercase py-3 rounded-lg cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-textured-card rounded-2xl p-6 border border-gray-100 dark:border-[#1d2e4a] shadow-xs flex flex-col justify-between text-left hover:border-accent/40 dark:hover:border-accent/60 transition-all"
          >
            <div className="space-y-4">
              {/* Rating stars & Date */}
              <div className="flex justify-between items-center">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < test.rating ? "fill-accent stroke-accent" : "text-gray-200 dark:text-gray-700 stroke-gray-300 dark:stroke-gray-600"}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  {test.date}
                </span>
              </div>

              {/* Text */}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-light italic">
                "{test.text}"
              </p>
            </div>

            {/* Author details block */}
            <div className="flex items-center gap-3 pt-5 mt-5 border-t border-gray-100 dark:border-[#18273f]">
              <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-accent/15 border border-primary/10 dark:border-accent/30 flex items-center justify-center font-display font-bold text-primary dark:text-gold-bright text-xs shrink-0">
                {test.avatarInitials}
              </div>
              <div>
                <h4 className="text-xs font-bold text-primary dark:text-white leading-none">
                  {test.name}
                </h4>
                <p className="text-[10px] text-gray-400 mt-1">
                  {test.companyName ? `Founder, ${test.companyName}` : "Registered Proprietor"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
