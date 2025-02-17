export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Welcome to information-sharing.online ("we," "our," or "us"). We
            respect your privacy and are committed to protecting your personal
            data. This privacy policy will inform you about how we handle your
            personal data when you visit our website and tell you about your
            privacy rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h2>
          <p>We collect and process the following types of personal data:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Identity Data: name, username</li>
            <li>Contact Data: email address</li>
            <li>
              Technical Data: IP address, browser type and version, time zone
              setting
            </li>
            <li>Usage Data: information about how you use our website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            How We Use Your Information
          </h2>
          <p>We use your personal data for the following purposes:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our service
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your
            personal data from being accidentally lost, used, accessed, altered,
            or disclosed in an unauthorized way.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p>
            Under certain circumstances, you have rights under data protection
            laws in relation to your personal data, including the right to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, you can contact
            us at:
            <br />
            Email: privacy@information-sharing.online
          </p>
        </section>
      </div>
    </div>
  );
}
