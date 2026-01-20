export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">1. Information We Collect</h2>
            <p>
              Food Calorie AI-Scanner collects and processes the following information:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Images:</strong> Photos of food you upload are sent to OpenAI's API for analysis and are not stored on our servers.</li>
              <li><strong>Calorie Data:</strong> Analysis results are stored locally in your browser using localStorage. We do not have access to this data.</li>
              <li><strong>Cookies:</strong> We use cookies for Google AdSense advertising (see Cookie Policy below).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">2. How We Use Your Information</h2>
            <ul className="list-disc ml-6 space-y-1">
              <li>To analyze food images and provide calorie estimates</li>
              <li>To display personalized advertisements via Google AdSense</li>
              <li>To improve our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">3. Third-Party Services</h2>
            <p className="mb-2">We use the following third-party services:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><strong>OpenAI:</strong> Images are processed by OpenAI's GPT-4 Vision API. See <a href="https://openai.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI's Privacy Policy</a>.</li>
              <li><strong>Google AdSense:</strong> We display ads via Google AdSense. See <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
              <li><strong>Vercel:</strong> Our hosting provider. See <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">4. Data Storage</h2>
            <p>
              All calorie tracking data is stored locally in your browser's localStorage. We do not store this data on our servers. 
              You can delete this data at any time by clicking "Clear data" in the app or clearing your browser's localStorage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">5. Cookies</h2>
            <p>
              We use cookies for:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Google AdSense advertising</li>
              <li>Storing your cookie consent preference</li>
            </ul>
            <p className="mt-2">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">6. Your Rights (GDPR)</h2>
            <p>If you are in the EU/EEA, you have the right to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Delete your personal data</li>
              <li>Object to processing</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-2">
              Since we don't store your data on our servers, you can delete all local data by clearing your browser's localStorage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">7. Contact</h2>
            <p>
              For privacy concerns, please contact: [Your Email]
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Last updated: January 20, 2026.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:underline">← Back to App</a>
        </div>
      </div>
    </div>
  )
}
