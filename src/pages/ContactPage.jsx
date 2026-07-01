import { motion } from 'framer-motion';
import { Phone, Mail, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  {
    q: '1) Is Riyasewana.com free?',
    a: 'Browsing ads and posting registered (used) vehicle ads is free. Unregistered (new/showroom) vehicle ads have a small posting fee. All other categories (spare parts, bicycles, etc.) are free.',
  },
  {
    q: '2) Why are my ads pending?',
    a: "If this is your first ad, please send an SMS with your name to confirm your phone number. Check your account area for details.",
  },
  {
    q: '3) Are there any hidden fees when sending the SMS?',
    a: 'No, only standard mobile SMS charges apply.',
  },
  {
    q: '4) I sent the SMS but my ad is still pending. Why?',
    a: 'Ads are approved usually within 30 minutes. During peak times it can take up to 2 hours.',
  },
  {
    q: '5) How long does my ad stay visible?',
    a: "Ads remain active for approximately 3 months. You can use the 'Bump Up' feature to move your ad back to the top of listings at any time.",
  },
  {
    q: '6) Can I edit or delete my ad after posting?',
    a: 'Yes. Log in to your account, go to "My Ads", and you can edit details or delete the ad.',
  },
  {
    q: '7) What is "Bump Up" and "Top Ad"?',
    a: '"Bump Up" moves your ad back to the front of search results. "Top Ad" places your ad in the premium featured section for extra visibility. Both are optional paid features.',
  },
  {
    q: '8) I forgot my account password. How do I reset it?',
    a: 'Go to the login page and click "Forgot password?". Enter your registered email and we\'ll send you a reset link.',
  },
  {
    q: '9) How do I contact Riyasewana?',
    a: 'Call us at 077 444 6565 or email info@riyasewana.com with the ad link. We\'ll review and take action promptly.',
  },
  {
    q: '10) How do I report a suspicious ad?',
    a: 'Call us at 077 444 6565 or email info@riyasewana.com with the ad link. We\'ll review and take action promptly.',
  },
  {
    q: '11) Can I post spare parts or bicycles?',
    a: 'Yes. When posting an ad, select "Spare Parts" or "Bicycles" as the vehicle type. These categories are also free.',
  },
];

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-3 text-left"
      >
        <span className="text-[14px] font-semibold text-gray-800">{faq.q}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-gray-400 mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-[13px] text-gray-600 mt-2 leading-relaxed"
        >
          {faq.a}
        </motion.p>
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="py-8">
      <div className="page-container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card p-8 mb-6">
            <h1 className="text-[24px] font-bold text-gray-800 mb-6">We&apos;d Love to Hear from You!</h1>

            {/* Illustration */}
            <div className="flex justify-center mb-6">
              <img
                src="/contact-illustration.webp"
                alt="Contact us illustration"
                className="max-h-48 object-contain"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>

            {/* Contact info */}
            <div className="flex flex-wrap gap-6 mb-8 justify-center">
              <a
                href="tel:0774446565"
                className="flex items-center gap-2 text-[14px] text-gray-700 hover:text-[#00b4d8] transition-colors"
              >
                <Phone size={18} className="text-[#00b4d8]" />
                077 444 6565 (10 AM – 4 PM)
              </a>
              <a
                href="mailto:info@riyasewana.com"
                className="flex items-center gap-2 text-[14px] text-gray-700 hover:text-[#00b4d8] transition-colors"
              >
                <Mail size={18} className="text-[#00b4d8]" />
                info@riyasewana.com
              </a>
            </div>

            {/* FAQs */}
            <h2 className="text-[18px] font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <div>
              {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
