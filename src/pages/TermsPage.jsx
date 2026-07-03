import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TERMS_SECTIONS = [
  {
    title: 'General',
    content: `Riyasewana is operated by Riyasewana Lanka (Pvt) Ltd. since 2009. By using this website you agree to these terms in full. If you disagree with any part of these terms and conditions, do not use this website. Riyasewana reserves the right to amend these terms at any time without notice.`,
  },
  {
    title: 'What You Can Advertise',
    content: `You may advertise vehicles for sale that are legally owned by you or that you have authority to sell. Only vehicles registered or intended to be registered in Sri Lanka may be advertised. You may not advertise stolen vehicles, vehicles with finance outstanding without disclosure, or any vehicle in a manner that misrepresents its condition.`,
  },
  {
    title: 'Free & Paid Advertisements',
    content: `Browsing ads and posting registered (used) vehicle ads is free of charge. Unregistered (brand new, showroom) vehicle ads are subject to a small fee as detailed on the posting page. Spare parts and bicycle ads are free. All ad approvals are at Riyasewana's sole discretion.`,
  },
  {
    title: 'Things You Are Not Allowed To Do',
    content: `You may not post false, misleading, or fraudulent listings. You may not use the platform to scam, defraud, or harm other users. You may not post the same vehicle in multiple listings simultaneously. You may not scrape, copy, or redistribute content from Riyasewana without written permission. Commercial dealers must not post under personal accounts.`,
  },
  {
    title: 'Riyasewana Accounts',
    content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Riyasewana reserves the right to terminate accounts at its discretion, especially if these terms are violated.`,
  },
  {
    title: 'Ad Ads',
    content: `Riyasewana displays third-party advertisements. We are not responsible for the content of external advertisements. By using this website you consent to the display of advertisements alongside content.`,
  },
  {
    title: 'Limitation',
    content: `Riyasewana acts only as an advertising platform and is not a party to any transaction between buyers and sellers. We do not guarantee the accuracy, completeness, or quality of any listing. All transactions are solely between buyer and seller.`,
  },
  {
    title: 'Returns/Availability',
    content: `Riyasewana does not guarantee the availability of any vehicle listed. Listings may be removed at any time without notice. Any vehicle purchase agreement is solely between the buyer and seller.`,
  },
  {
    title: 'Social Communication',
    content: `Comments and messages sent via our platform must be respectful and lawful. We reserve the right to remove any content that we determine to be offensive, misleading, or in violation of these terms.`,
  },
  {
    title: 'Disclaimer / Limitations',
    content: `This website is provided "as is" without any representations or warranties, express or implied. Riyasewana Lanka (Pvt) Ltd. makes no representations or warranties about the accuracy or completeness of this website's content or the content of any websites linked to this website.`,
  },
  {
    title: 'Certification of Domain Name',
    content: `The domain riyasewana.com is the sole official website of Riyasewana Lanka (Pvt) Ltd. Any other similar domains are not affiliated with us.`,
  },
  {
    title: 'Violation',
    content: `Any violation of these terms may result in immediate account suspension, removal of ads, and where applicable, reporting to relevant authorities. Riyasewana reserves all rights to take legal action for serious violations.`,
  },
  {
    title: 'Indemnification',
    content: `You agree to indemnify and hold harmless Riyasewana Lanka (Pvt) Ltd. and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses arising from your use of the platform or violation of these terms.`,
  },
  {
    title: 'Advertising Laws',
    content: `All advertisements must comply with Sri Lankan consumer protection, advertising standards, and motor vehicle laws. Riyasewana reserves the right to remove any ad that, in its sole judgement, violates applicable law.`,
  },
  {
    title: 'Governing Law',
    content: `These terms shall be governed by and construed in accordance with the laws of Sri Lanka. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.`,
  },
];

export default function TermsPage() {
  return (
    <div className="py-8">
      <div className="page-container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-[22px] font-bold text-gray-800">Terms &amp; Conditions</h1>
              <Link to="/contact" className="text-[12px] text-[#00b4d8] hover:underline">Contact Us</Link>
            </div>

            <p className="text-[13px] text-gray-500 mb-6">
              Last updated: January 2026. By using Riyasewana.com you agree to these terms.
            </p>

            <div className="space-y-5">
              {TERMS_SECTIONS.map((section, i) => (
                <div key={i}>
                  <h3 className="text-[15px] font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-[12px] text-gray-400">
                For questions about these terms, please <Link to="/contact" className="text-[#00b4d8] hover:underline">contact us</Link>.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
