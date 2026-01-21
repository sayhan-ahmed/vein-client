// ================= [ PRIVACY POLICY ] ================= //
// > Data handling, protection, and user privacy standards.
import Container from "../../components/Shared/Container";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50/30 py-20">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-slate-100">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-black text-[#1D3658] mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600">Last updated: December 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                1. Information We Collect
              </h2>
              <p className="leading-relaxed mb-3">
                We collect the following types of information:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Personal Information:</strong> Name, email address,
                  phone number, blood group, location
                </li>
                <li>
                  <strong>Account Information:</strong> Username, password
                  (encrypted), profile picture
                </li>
                <li>
                  <strong>Donation History:</strong> Past donations, requests
                  made, and responses
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with our
                  platform, pages visited, features used
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                2. How We Use Your Information
              </h2>
              <p className="leading-relaxed mb-3">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Connect donors with recipients efficiently</li>
                <li>Send notifications about donation requests and updates</li>
                <li>Improve our platform and user experience</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Communicate important updates and announcements</li>
                <li>Generate anonymous statistics and insights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                3. Information Sharing
              </h2>
              <p className="leading-relaxed mb-3">
                We share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>With Recipients:</strong> When you respond to a
                  donation request, your contact information is shared with the
                  recipient
                </li>
                <li>
                  <strong>With Donors:</strong> When you create a request, your
                  information is visible to potential donors
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect rights and safety
                </li>
                <li>
                  <strong>Service Providers:</strong> With trusted third parties
                  who help operate our platform (under strict confidentiality
                  agreements)
                </li>
              </ul>
              <p className="leading-relaxed mt-3">
                We never sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                4. Data Security
              </h2>
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information, including encryption, secure servers, and
                regular security audits. However, no method of transmission over
                the internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                5. Cookies and Tracking
              </h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to enhance your
                experience, remember your preferences, and analyze platform
                usage. You can control cookie settings through your browser, but
                disabling cookies may limit some platform features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                6. Your Rights
              </h2>
              <p className="leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                7. Data Retention
              </h2>
              <p className="leading-relaxed">
                We retain your personal information for as long as your account
                is active or as needed to provide services. If you delete your
                account, we will remove your personal information within 30
                days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                8. Children's Privacy
              </h2>
              <p className="leading-relaxed">
                Our platform is not intended for users under 18 years of age. We
                do not knowingly collect personal information from children. If
                we discover that a child has provided us with personal
                information, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                9. Changes to Privacy Policy
              </h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any significant changes via email or platform
                notifications. Your continued use of Vein after changes
                indicates acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                10. Contact Us
              </h2>
              <p className="leading-relaxed">
                If you have questions or concerns about this Privacy Policy or
                how we handle your data, please contact us at:
              </p>
              <ul className="list-none space-y-2 mt-3 ml-4">
                <li>
                  <strong>Email:</strong> vein@support.com
                </li>
                <li>
                  <strong>Phone:</strong> +880 123 456789
                </li>
                <li>
                  <strong>Address:</strong> 456 Anywhere St, Dhaka, Bangladesh
                </li>
              </ul>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Privacy;
