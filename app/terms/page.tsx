export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 dark:from-zinc-900 dark:via-purple-900 dark:to-indigo-900 p-8">
      <div className="max-w-3xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">Terms of Service</h1>
        
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          <strong>Last updated:</strong> January 21, 2026
        </p>

        <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              Introduction
            </h2>
            <p>
              Welcome to Food Calorie AI-Scanner. By using this service, you agree to these Terms of Service. 
              Please read them carefully before using the app.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="mb-3">
              By accessing or using Food Calorie AI-Scanner, you agree to be bound by these Terms of Service 
              and our Privacy Policy. If you don't agree, please don't use the service.
            </p>
            <p>
              <strong>Important:</strong> This is a free hobby project. We reserve the right to modify, 
              suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              2. Service Description
            </h2>
            <p className="mb-3">
              Food Calorie AI-Scanner provides estimated calorie information for food based on image analysis 
              using artificial intelligence (OpenAI GPT-4o Vision).
            </p>
            <p className="mb-3">
              <strong>Key points:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Results are <strong>ESTIMATES ONLY</strong></li>
              <li>Accuracy may vary significantly based on image quality, food type, and portion size</li>
              <li>AI can make mistakes - don't rely on results for medical decisions</li>
              <li>This is NOT a medical device or nutrition consultation service</li>
            </ul>
          </section>

          {/* Medical Disclaimer */}
          <section className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3 text-red-800 dark:text-red-200">
              ⚠️ 3. Medical Disclaimer
            </h2>
            <p className="mb-3 text-red-800 dark:text-red-200">
              <strong>NOT MEDICAL ADVICE. READ THIS CAREFULLY:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-red-800 dark:text-red-200">
              <li>
                <strong>This service does NOT provide medical advice, diagnosis, or treatment</strong>
              </li>
              <li>
                Calorie estimates may be <strong>significantly inaccurate</strong>
              </li>
              <li>
                Do NOT use this service to make medical decisions, manage medical conditions, 
                or design diets for health purposes
              </li>
              <li>
                Always consult a qualified healthcare professional, registered dietitian, or nutritionist 
                for personalized dietary advice
              </li>
              <li>
                If you have diabetes, food allergies, eating disorders, or any medical condition, 
                consult your doctor before using calorie tracking tools
              </li>
              <li>
                In case of medical emergency, call emergency services immediately
              </li>
            </ul>
            <p className="mt-3 text-red-800 dark:text-red-200 font-semibold">
              By using this service, you acknowledge that you understand and accept these limitations.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              4. User Responsibilities
            </h2>
            <p className="mb-3">
              You agree to use this service responsibly:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Appropriate Use:</strong> Only upload images of food for calorie estimation
              </li>
              <li>
                <strong>No Abuse:</strong> Don't spam, overload, or attempt to hack the service
              </li>
              <li>
                <strong>No Automated Tools:</strong> Don't use bots, scrapers, or automated tools 
                to access the service
              </li>
              <li>
                <strong>No Inappropriate Content:</strong> Don't upload illegal, harmful, or 
                inappropriate images
              </li>
              <li>
                <strong>Age Requirement:</strong> You must be at least 13 years old to use this service
              </li>
              <li>
                <strong>Accuracy:</strong> Understand that results are estimates and verify important 
                information independently
              </li>
            </ul>
          </section>

          {/* Fair Use and Rate Limits */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              5. Fair Use and Rate Limits
            </h2>
            <p className="mb-3">
              To ensure service availability for all users, we implement rate limiting:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Maximum 10 image analyses per minute per user</li>
              <li>Maximum image size: 5MB</li>
              <li>Supported formats: JPEG, PNG, WebP</li>
            </ul>
            <p className="mt-3">
              We reserve the right to block users who abuse the service or violate these limits.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              6. Intellectual Property
            </h2>
            <p className="mb-3">
              <strong>Your Content:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>You retain ownership of images you upload</li>
              <li>By uploading, you grant us temporary license to process images via OpenAI API</li>
              <li>We don't store your images or use them for any other purpose</li>
            </ul>
            <p className="mb-3">
              <strong>Our Content:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The Food Calorie AI-Scanner interface, design, and code are our property</li>
              <li>You may not copy, modify, or redistribute our code without permission</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              7. Third-Party Services
            </h2>
            <p className="mb-3">
              We use third-party services that have their own terms:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>OpenAI:</strong> Image analysis is powered by OpenAI. 
                See{' '}
                <a 
                  href="https://openai.com/policies/terms-of-use" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  OpenAI Terms of Use
                </a>
              </li>
              <li>
                <strong>Vercel:</strong> Hosting provided by Vercel. 
                See{' '}
                <a 
                  href="https://vercel.com/legal/terms" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Vercel Terms
                </a>
              </li>
            </ul>
            <p className="mt-3">
              You agree to comply with the terms of these third-party services when using our app.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              8. Limitation of Liability
            </h2>
            <p className="mb-3">
              <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                This service is provided "AS IS" without warranties of any kind
              </li>
              <li>
                We are NOT liable for any damages arising from your use of this service, including:
                <ul className="list-circle list-inside ml-6 mt-2 space-y-1">
                  <li>Inaccurate calorie estimates</li>
                  <li>Health issues from following estimates</li>
                  <li>Data loss (your local storage data)</li>
                  <li>Service interruptions or downtime</li>
                  <li>Any other direct or indirect damages</li>
                </ul>
              </li>
              <li>
                You use this service entirely at your own risk
              </li>
              <li>
                Our total liability to you shall not exceed 100 DKK (Danish Kroner)
              </li>
            </ul>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold us harmless from any claims, damages, losses, or 
              expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Your use of the service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another user or third party</li>
            </ul>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              10. Service Availability
            </h2>
            <p>
              We strive to keep the service available, but we don't guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
              <li>Continuous, uninterrupted, or error-free operation</li>
              <li>That the service will always be available</li>
              <li>That results will be accurate or reliable</li>
            </ul>
            <p className="mt-3">
              We may suspend or terminate the service at any time, for any reason, without notice.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms of Service from time to time. Changes will be posted on this 
              page with an updated date. Continued use of the service after changes constitutes 
              acceptance of the new terms.
            </p>
            <p className="mt-3">
              <strong>Major changes will be announced via a banner on our website.</strong>
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              12. Termination
            </h2>
            <p className="mb-3">
              We reserve the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Suspend or terminate your access at any time without notice</li>
              <li>Remove content that violates these Terms</li>
              <li>Take legal action if necessary</li>
            </ul>
            <p className="mt-3">
              You may stop using the service at any time. Your local data can be deleted using 
              the "Clear data" button.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              13. Governing Law
            </h2>
            <p>
              These Terms are governed by the laws of Denmark. Any disputes shall be resolved 
              in Danish courts.
            </p>
            <p className="mt-3">
              For EU users: Nothing in these Terms affects your statutory rights under EU consumer 
              protection laws.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              14. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining 
              provisions will continue in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              15. Contact
            </h2>
            <p className="mb-4">
              If you have questions about these Terms, please contact us:
            </p>
            
            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6 border-2 border-zinc-200 dark:border-zinc-700">
              <a 
                href="https://tally.so/r/0QeVj0" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
              >
                📧 Open Contact Form
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-3">
                Opens in new tab.
              </p>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              TL;DR Summary
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>⚠️ <strong>This is NOT medical advice</strong> - estimates may be very inaccurate</li>
              <li>🎯 Use for general guidance only, not for medical decisions</li>
              <li>🚫 Don't abuse the service (spam, hacking, inappropriate content)</li>
              <li>📊 We're not responsible for damages from using this service</li>
              <li>🔒 Your data stays on your device (we don't store images)</li>
              <li>⏰ This is a hobby project - may be discontinued anytime</li>
              <li>✅ By using the app, you accept these terms</li>
            </ul>
          </section>
        </div>

        {/* Back to app button */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <a 
            href="/" 
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            ← Back to Food Calorie Scanner
          </a>
        </div>
      </div>
    </div>
  )
}
