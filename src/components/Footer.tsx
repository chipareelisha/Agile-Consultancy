import { useApp } from '../App';
import { CONTACT_DETAILS } from '../data';
import Icon from './Icon';

export default function Footer() {
  const { setActivePage } = useApp();

  const handleLinkClick = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <footer className="bg-textured-dark text-gray-300 pt-16 pb-8 border-t-2 border-accent/40 gold-border-gloss">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Column */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gold-badge flex items-center justify-center shadow-xs">
              <span className="font-display font-black text-gold-bright text-lg tracking-widest">
                A
              </span>
            </div>
            <div>
              <span className="block font-display font-black text-base text-white tracking-tight leading-none">
                Agile <span className="text-gold-metallic">Consultancy</span>
              </span>
              <span className="block text-[9px] font-mono uppercase tracking-widest text-gold-bright mt-1">
                Corporate Services
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed pt-2">
            Professional business formalization, company registration, licensing and compliance agency. We make legalities simple, transparent, and prompt.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href={`https://wa.me/${CONTACT_DETAILS.phone1Raw}?text=${encodeURIComponent(CONTACT_DETAILS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/15 flex items-center justify-center text-gold-bright transition-all shadow-xs"
              title="WhatsApp Chat 1"
            >
              <Icon name="Phone" size={14} />
            </a>
            <a
              href={`https://wa.me/${CONTACT_DETAILS.phone2Raw}?text=${encodeURIComponent(CONTACT_DETAILS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/15 flex items-center justify-center text-gold-bright transition-all shadow-xs"
              title="WhatsApp Chat 2"
            >
              <Icon name="Phone" size={14} />
            </a>
            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="w-9 h-9 rounded-full bg-white/5 border border-accent/20 hover:border-accent hover:bg-accent/15 flex items-center justify-center text-gold-bright transition-all shadow-xs"
              title="Official Email"
            >
              <Icon name="Mail" size={14} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-2">
            Navigations
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li>
              <button
                onClick={() => handleLinkClick("home")}
                className="hover:text-gold-bright transition-colors cursor-pointer text-left font-light"
              >
                Home Portal
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("products")}
                className="hover:text-gold-bright transition-colors cursor-pointer text-left font-light"
              >
                Services & Filing Catalog
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("testimonials")}
                className="hover:text-gold-bright transition-colors cursor-pointer text-left font-light"
              >
                Client Testimonials
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLinkClick("about")}
                className="hover:text-gold-bright transition-colors cursor-pointer text-left font-light"
              >
                About Us & Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Direct Contacts Column */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-2">
            Direct Contacts
          </h4>
          <ul className="space-y-3 text-xs text-gray-400 font-light leading-relaxed">
            <li className="flex items-start gap-2.5">
              <Icon name="MapPin" size={14} className="text-gold-bright shrink-0 mt-0.5" />
              <span>{CONTACT_DETAILS.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="Mail" size={14} className="text-gold-bright shrink-0" />
              <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-gold-bright transition-colors">
                {CONTACT_DETAILS.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Icon name="Phone" size={14} className="text-gold-bright shrink-0" />
              <a href={`https://wa.me/${CONTACT_DETAILS.phone1Raw}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-bright transition-colors">
                {CONTACT_DETAILS.phone1}
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Regulatory Notice */}
        <div className="space-y-4 text-left">
          <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white border-b border-white/10 pb-2">
            Regulatory Compliance
          </h4>
          <p className="text-xs text-gray-400 leading-relaxed font-light">
            We assist with fully legal registrations in Zimbabwe & regional jurisdictions. We act as your private filings representative with the Department of Deeds, Companies and Intellectual Property.
          </p>
          <div className="gold-badge rounded-lg p-2.5 flex items-center gap-2 text-[10px] text-primary font-bold uppercase tracking-wider shadow-xs">
            <Icon name="ShieldCheck" size={14} className="text-primary" />
            <span>100% Certified Agency</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-light">
        <p>© {new Date().getFullYear()} Agile Consultancy Services. All Rights Reserved.</p>
        <p>Providing Zimbabwe Enterprise Formalization Stamps & Filings Since 2020.</p>
      </div>
    </footer>
  );
}
