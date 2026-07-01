import { motion } from 'framer-motion';

export default function ContributePage() {
  return (
    <div className="py-8">
      <div className="page-container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="card p-8">
            <h1 className="text-[22px] font-bold text-gray-800 mb-4">Contribute to Our Service</h1>

            <p className="text-[14px] text-gray-600 leading-relaxed mb-3">
              Riyasewana has grown thanks to the support of our community. Every visit, listing, and share helps keep this
              platform free and accessible to everyone in Sri Lanka. By contributing, you help us maintain our servers, improve
              site features, and continue offering a trusted space for buying and selling vehicles.
            </p>

            <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
              You can contribute financially, share valuable feedback, or simply spread the word among your friends and social
              media circles. Every bit counts — whether it's a small donation, a helpful suggestion, or a kind word. Together, we
              can keep Riyasewana strong, independent, and focused on helping people find the perfect vehicle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seylan Bank */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-[15px] font-bold text-gray-800 mb-3">Seylan Bank Details</h3>
                <div className="space-y-1.5 text-[13px] text-gray-600">
                  <p><span className="font-semibold text-gray-700">Account Name:</span> Riyasewana Lanka (Pvt) Ltd.</p>
                  <p><span className="font-semibold text-gray-700">Account No:</span> 0820011020001</p>
                </div>
              </div>

              {/* Sampath Bank */}
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h3 className="text-[15px] font-bold text-gray-800 mb-3">Sampath Bank Details</h3>
                <div className="space-y-1.5 text-[13px] text-gray-600">
                  <p><span className="font-semibold text-gray-700">Account Name:</span> Riyasewana Lanka (Pvt) Ltd.</p>
                  <p><span className="font-semibold text-gray-700">Account No:</span> 1008146 1987</p>
                </div>
              </div>
            </div>

            <p className="text-[12px] text-gray-400 mt-6 text-center">
              After making a transfer, please email us at{' '}
              <a href="mailto:info@riyasewana.com" className="text-[#00b4d8] hover:underline">info@riyasewana.com</a>{' '}
              with your name and amount so we can acknowledge your contribution.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
