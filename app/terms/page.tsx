export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">Terms of Service</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Food Calorie AI-Scanner, you accept and agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">2. Description of Service</h2>
            <p>
              Food Calorie AI-Scanner is a free web application that uses artificial intelligence to analyze food images 
              and provide estimated calorie and nutritional information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">3. Disclaimer - Not Medical Advice</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 my-4">
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">IMPORTANT:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1 text-yellow-800 dark:text-yellow-200">
                <li>This service provides <strong>estimates only</strong> and may be inaccurate</li>
                <li>Results are <strong>not medical or nutritional advice</strong></li>
                <li>Do not use this service for medical decisions or dietary planning without consulting a healthcare professional</li>
                <li>AI-generated estimates can contain errors</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">4. Accuracy of Information</h2>
            <p>
              We strive to provide accurate calorie estimates, but we make no warranties or guarantees about:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>The accuracy of calorie estimates</li>
              <li>The completeness of nutritional information</li>
              <li>The suitability of the information for your specific needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">5. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Use the service for lawful purposes only</li>
              <li>Not upload inappropriate or offensive content</li>
              <li>Not attempt to reverse engineer or exploit the service</li>
              <li>Verify information independently before making important decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">6. Intellectual Property</h2>
            <p>
              Images you upload remain your property. By using the service, you grant us permission to process 
              your images through third-party AI services (OpenAI) for the purpose of providing the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Food Calorie AI-Scanner and its operators shall not be liable for:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Any damages arising from use of the service</li>
              <li>Inaccurate calorie or nutritional estimates</li>
              <li>Health issues resulting from reliance on the service</li>
              <li>Service interruptions or data loss</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">8. Third-Party Services</h2>
            <p>
              This service uses third-party APIs (OpenAI, Google AdSense). Your use is also subject to their terms of service:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><a href="https://openai.com/policies/terms-of-use" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">OpenAI Terms</a></li>
              <li><a href="https://policies.google.com/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Terms</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">9. Service Availability</h2>
            <p>
              We provide the service "as is" without guarantees of availability, uptime, or continued operation. 
              We reserve the right to modify or discontinue the service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">10. Changes to Terms</h2>
            <p>
              We may update these Terms of Service at any time. Continued use of the service constitutes acceptance of updated terms.
            </p>
            <p className="mt-2">
              Last updated: January 20, 2026
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">11. Contact</h2>
            <p>
              For questions about these terms, please contact: [Your Email]
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
