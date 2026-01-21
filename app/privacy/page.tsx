export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 dark:from-zinc-900 dark:via-purple-900 dark:to-indigo-900 p-8">
      <div className="max-w-3xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-black dark:text-white">Privacy Policy</h1>
        
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
              Food Calorie AI-Scanner ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we handle your information when you use our service.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              1. Data We Collect
            </h2>
            <p className="mb-3">
              <strong>Short answer: We collect almost nothing.</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Images:</strong> Food photos you upload are sent to OpenAI API for analysis. 
                We do NOT store these images on our servers. OpenAI processes them temporarily according 
                to their data retention policy (typically 30 days).
              </li>
              <li>
                <strong>Calorie History:</strong> Your calorie log is stored ONLY in your browser's 
                localStorage. This data never leaves your device and we cannot access it.
              </li>
              <li>
                <strong>Cookie Consent:</strong> We store your cookie consent choice in localStorage 
                (not in cookies).
              </li>
              <li>
                <strong>Technical Data:</strong> Our hosting provider (Vercel) may collect standard 
                web analytics like IP address, browser type, and visit timestamps for security and 
                performance monitoring.
              </li>
            </ul>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              2. How We Use Your Data
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To analyze food images and provide calorie estimates</li>
              <li>To improve service performance and prevent abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              <strong>We do NOT:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Sell your data to third parties</li>
              <li>Use your images for training our own AI models</li>
              <li>Track you across other websites</li>
              <li>Share your data with advertisers (when/if we add ads in the future)</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              3. Third-Party Services
            </h2>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2 text-black dark:text-white">OpenAI API</h3>
              <p>
                We use OpenAI's GPT-4o Vision API to analyze food images. Images are sent to OpenAI 
                for processing. Please review{' '}
                <a 
                  href="https://openai.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  OpenAI's Privacy Policy
                </a>{' '}
                for details on how they handle data.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2 text-black dark:text-white">Vercel (Hosting)</h3>
              <p>
                Our website is hosted on Vercel. They may collect standard web server logs 
                (IP addresses, request times, etc.) for security and performance. See{' '}
                <a 
                  href="https://vercel.com/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Vercel's Privacy Policy
                </a>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-black dark:text-white">Google AdSense (Future)</h3>
              <p>
                We may add Google AdSense advertising in the future. If we do, we will update this 
                policy and notify users. AdSense uses cookies to show relevant ads. You can opt-out 
                at{' '}
                <a 
                  href="https://adssettings.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Google Ad Settings
                </a>.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              4. Cookies and Local Storage
            </h2>
            <p className="mb-3">
              We use browser localStorage (not cookies) to store:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Your calorie history (only on your device)</li>
              <li>Your cookie consent preference</li>
            </ul>
            <p className="mt-3">
              <strong>You can delete this data at any time</strong> by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Clicking "Clear data" button in the app</li>
              <li>Clearing your browser's localStorage/cache</li>
            </ul>
          </section>

          {/* Your Rights (GDPR) */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              5. Your Rights (GDPR)
            </h2>
            <p className="mb-3">
              If you're in the EU, you have these rights:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Right to Access:</strong> Request what data we have (spoiler: almost nothing server-side)</li>
              <li><strong>Right to Deletion:</strong> Request deletion of your data</li>
              <li><strong>Right to Portability:</strong> Export your localStorage data from your browser</li>
              <li><strong>Right to Object:</strong> Object to data processing (decline cookies)</li>
            </ul>
            <p className="mt-3">
              Since we store minimal data server-side, most of your data is already under your control 
              in your browser.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              6. Data Retention
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Images:</strong> Deleted immediately after OpenAI processes them. OpenAI may 
                retain for up to 30 days for abuse monitoring.
              </li>
              <li>
                <strong>Calorie History:</strong> Stored in your browser until you delete it.
              </li>
              <li>
                <strong>Server Logs:</strong> Vercel retains logs for security purposes (typically 30 days).
              </li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              7. Children's Privacy
            </h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect data 
              from children. If you believe a child has used our service, please contact us.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              8. Security
            </h2>
            <p>
              We implement security measures including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>HTTPS encryption for all data transmission</li>
              <li>Rate limiting to prevent abuse</li>
              <li>Image validation to block malicious uploads</li>
              <li>No server-side data storage (minimizes breach risk)</li>
            </ul>
            <p className="mt-3">
              However, no internet transmission is 100% secure. Use at your own risk.
            </p>
          </section>

          {/* International Users */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              9. International Users
            </h2>
            <p>
              Our servers are located in the United States (via Vercel). By using our service, 
              you consent to data transfer to the US. We comply with GDPR for EU users.
            </p>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this policy occasionally. We'll post the new version here with an 
              updated date. Major changes will be announced via a banner on our website.
            </p>
          </section>

          {/* Contact - MED DIT TALLY LINK */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              11. Contact Us
            </h2>
            <p className="mb-4">
              This is a personal hobby project. Since we don't collect or store your personal data 
              server-side (everything is on your device), there's typically no need to contact us.
            </p>
            <p className="mb-4">
              However, if you have privacy questions, data deletion requests, or GDPR inquiries, 
              you can reach us via this contact form:
            </p>
            
            {/* KONTAKTFORMULAR KNAP MED DIT LINK */}
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
                Opens in new tab. Powered by Tally (privacy-friendly form service).
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <p className="text-sm">
                <strong>Quick reminders:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                <li>Your calorie history is stored only in your browser (we can't access it)</li>
                <li>Uploaded images are processed by OpenAI and not stored by us</li>
                <li>You can delete all local data using the "Clear data" button in the app</li>
              </ul>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">
              TL;DR Summary
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>✅ We don't store your images</li>
              <li>✅ Your calorie history is only on YOUR device</li>
              <li>✅ We don't sell your data</li>
              <li>✅ We use OpenAI API (they see your images temporarily)</li>
              <li>✅ We may add Google Ads later (will notify you)</li>
              <li>✅ You can delete all your data anytime</li>
              <li>✅ Contact us via form if you have privacy questions</li>
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
