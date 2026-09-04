import { Service, Testimonial } from './types';

export const CONTACT_DETAILS = {
  phone1: "+263 77 628 7179",
  phone1Raw: "263776287179",
  phone2: "+263 78 995 7113",
  phone2Raw: "263789957113",
  email: "info@agileconsultancy.com",
  address: "Suite 402, 4th Floor, Jubilee Centre, Harare, Zimbabwe",
  whatsappMessage: "Hello Agile Consultancy, I would like to inquire about your services."
};

export const SERVICES: Service[] = [
  {
    id: "private-limited-company",
    name: "Private Limited Company (PLC)",
    description: "Fully compliant registration of your private limited company with Memorandum & Articles of Association, Share Certificates, and Certificate of Incorporation.",
    price: 120,
    deliveryTime: "5-7 business days",
    category: "Registration",
    requirements: [
      "Proposed company name (up to 3 options)",
      "ID copies/passports of directors (minimum 2)",
      "Physical & postal address of the company",
      "Contact details of directors (email & phone)"
    ],
    icon: "Building2"
  },
  {
    id: "tin-registration",
    name: "TIN Registration",
    description: "Obtain your official Business Tax Identification Number (TIN) to enable commercial banking and regulatory tax reporting.",
    price: 45,
    deliveryTime: "2-3 business days",
    category: "Compliance",
    requirements: [
      "Certificate of Incorporation",
      "Directors' ID copies",
      "Proof of company bank account or physical address"
    ],
    icon: "FileText"
  },
  {
    id: "private-business-corporation",
    name: "Private Business Corporation (PBC)",
    description: "A simpler, cost-effective alternative to a Private Limited Company. Perfect for small businesses, sole proprietors, and small partnerships.",
    price: 60,
    deliveryTime: "3-4 business days",
    category: "Registration",
    requirements: [
      "Proposed PBC name",
      "ID copy/passport of members (maximum 20 members)",
      "Physical address of business",
      "Contribution percentage of members"
    ],
    icon: "Briefcase"
  },
  {
    id: "vendor-number",
    name: "Vendor Number Registration",
    description: "Register as an official supplier with government entities, councils, and major corporate purchasing systems to win tenders.",
    price: 85,
    deliveryTime: "4-5 business days",
    category: "Compliance",
    requirements: [
      "Company Registration Documents (PLC or PBC)",
      "Valid Tax Clearance Certificate",
      "Company Profile",
      "Bank details confirmation letter"
    ],
    icon: "FileCheck"
  },
  {
    id: "change-of-directors",
    name: "Change of Directors / CR14 Update",
    description: "Update director profiles, resignations, appointments, or share allocations quickly. Get updated CR14 (or CR6) forms.",
    price: 55,
    deliveryTime: "3-5 business days",
    category: "Registration",
    requirements: [
      "Original Certificate of Incorporation & CR14",
      "ID copies of outgoing and incoming directors",
      "Resignation letters / written consent of incoming directors"
    ],
    icon: "Users"
  },
  {
    id: "clearance-tax",
    name: "Tax Clearance Certificate (ITF263)",
    description: "We assist with complete tax assessment, submission, and procurement of your official Tax Clearance Certificate. Crucial for bidding on tenders.",
    price: 75,
    deliveryTime: "2-4 business days",
    category: "Compliance",
    requirements: [
      "Company Tax ID (TIN)",
      "Up-to-date business records",
      "Directors' personal tax numbers (if registered)"
    ],
    icon: "ShieldCheck"
  },
  {
    id: "vat-registration",
    name: "VAT Registration",
    description: "Register your business for Value Added Tax (VAT) with the revenue authority, ensuring full compliance and eligibility for tax refunds.",
    price: 90,
    deliveryTime: "3-5 business days",
    category: "Compliance",
    requirements: [
      "Company Certificate of Incorporation & CR14/CR6",
      "TIN Certificate",
      "Sales invoices proving threshold requirements met or voluntary application reasons",
      "Bank Statement showing recent operations"
    ],
    icon: "Receipt"
  },
  {
    id: "council-licenses",
    name: "Council Business Licenses",
    description: "Acquire your official municipal shop, office, or trading licenses. We navigate the local council bureaucratic procedures on your behalf.",
    price: 110,
    deliveryTime: "7-10 business days",
    category: "Licensing",
    requirements: [
      "Company Incorporation documents",
      "Health Inspector report (for food/medical)",
      "Lease agreement or proof of premises",
      "Zoning approval (where applicable)"
    ],
    icon: "Award"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Tinashe Maposa",
    companyName: "Apex Logistics Ltd",
    rating: 5,
    text: "Agile Consultancy assisted us with company registration and our vendor number in Harare. Their turnaround was incredibly fast, and their team was communicative throughout. Highly professional!",
    date: "2026-05-12",
    avatarInitials: "TM"
  },
  {
    id: "t2",
    name: "Sarah Ndlovu",
    companyName: "Glow Bio Beauty",
    rating: 5,
    text: "I was struggling to get my tax clearance (ITF263) done on time for a tender. Agile Consultancy stepped in and sorted out our TIN and Tax Clearance in just 3 days! Excellent and accurate service.",
    date: "2026-06-03",
    avatarInitials: "SN"
  },
  {
    id: "t3",
    name: "Emmanuel Sibanda",
    companyName: "SibaTech Solutions",
    rating: 4,
    text: "Registered our Private Business Corporation with them. The process was straightforward, and the pricing was clear with no hidden fees. Definitely recommending them to my entrepreneurial friends.",
    date: "2026-06-25",
    avatarInitials: "ES"
  },
  {
    id: "t4",
    name: "Ruvarashe Zhou",
    companyName: "Ruva Organics",
    rating: 5,
    text: "The absolute best in Zim! Fast and reliable. Got our council license and VAT registration handled seamlessly. Friendly consultants on WhatsApp.",
    date: "2026-07-02",
    avatarInitials: "RZ"
  }
];

export const FAQS = [
  {
    q: "What is the key difference between a PLC and a PBC?",
    a: "A Private Limited Company (PLC) is governed by directors and shareholders, requiring a memorandum & articles of association. It is best suited for growing businesses looking to raise capital. A Private Business Corporation (PBC) is a simpler structure for up to 20 members, has fewer statutory reporting requirements, and is highly cost-effective for small partnerships or sole proprietors."
  },
  {
    q: "Why is a Vendor Number registration crucial?",
    a: "A Vendor Number is your official clearance to supply goods or services to government entities, local municipalities, state universities, and major blue-chip corporates. Without it, you are excluded from public and private supply tenders."
  },
  {
    q: "What is the ITF263 Tax Clearance Certificate?",
    a: "The ITF263 is issued by the tax authorities to confirm that your company’s tax filings and payments are up to date. Having a valid tax clearance ensures that customers do not withhold 30% tax on payments made to you, and is mandatory for bidding on government contracts."
  },
  {
    q: "Can non-residents or foreigners register companies?",
    a: "Yes. Non-residents can be directors and shareholders of companies registered in Zimbabwe. However, at least one director must have a valid local residential address to act as the corporate registrar’s physical correspondent."
  },
  {
    q: "What are the ongoing compliance requirements?",
    a: "After incorporation, your company must file Annual Returns, submit quarterly/annual tax returns, maintain an updated register of beneficial ownership, and renew municipal council business licenses annually."
  }
];
