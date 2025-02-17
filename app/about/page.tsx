export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p>
            Founded in 2024, SharinG emerged from a vision to create a platform
            where ideas could flow freely and knowledge could be shared
            seamlessly. Our journey began when a team of passionate developers
            and content creators came together with a shared mission: to build a
            space where both writers and readers could thrive.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            At SharinG, we believe in the power of words to inspire, educate,
            and connect. Our platform is designed to:
          </p>
          <ul className="mt-4">
            <li>Empower writers to share their knowledge and experiences</li>
            <li>
              Create a community of engaged readers and thoughtful contributors
            </li>
            <li>
              Provide a modern, accessible platform for content creation and
              consumption
            </li>
            <li>Foster meaningful discussions and connections</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Technology & Innovation
          </h2>
          <p>
            Built with cutting-edge technologies like Next.js, Supabase, and
            TailwindCSS, our platform represents the perfect blend of
            performance, security, and user experience. We're constantly
            evolving and improving our features to better serve our community.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p>
            Whether you're a writer looking to share your voice or a reader
            seeking quality content, SharinG is your destination. We're more
            than just a blogging platform – we're a community of individuals
            passionate about sharing knowledge and stories.
          </p>
        </section>
      </div>
    </div>
  );
}
