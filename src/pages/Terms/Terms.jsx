import Container from "../../components/Shared/Container";

const Terms = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-red-50/30 py-20">
      <Container>
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-12 shadow-xl border border-slate-100">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-black text-[#1D3658] mb-4">
              Terms & Conditions
            </h1>
            <p className="text-slate-600">Last updated: December 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed">
                By accessing and using Vein's blood donation platform, you
                accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                2. User Responsibilities
              </h2>
              <p className="leading-relaxed mb-3">
                As a user of Vein, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and truthful information</li>
                <li>
                  Maintain the confidentiality of your account credentials
                </li>
                <li>Use the platform only for lawful purposes</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Not misuse or abuse the platform in any way</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                3. Donor Eligibility
              </h2>
              <p className="leading-relaxed">
                Donors must meet standard blood donation eligibility criteria,
                including age requirements (typically 18-65 years), weight
                requirements (minimum 50kg), and health conditions. Vein is not
                responsible for medical screening - this is conducted by
                authorized medical facilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                4. Platform Usage
              </h2>
              <p className="leading-relaxed mb-3">Users agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Not create false donation requests</li>
                <li>Respond promptly to donation requests they accept</li>
                <li>Update their availability status accurately</li>
                <li>Report any suspicious or fraudulent activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                5. Privacy and Data Protection
              </h2>
              <p className="leading-relaxed">
                We are committed to protecting your privacy. Personal
                information collected through Vein will be used solely for
                facilitating blood donations and improving our services. Please
                refer to our Privacy Policy for detailed information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                6. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                Vein acts as a platform to connect donors and recipients. We are
                not responsible for the actual blood donation process, medical
                procedures, or any health complications that may arise. All
                medical procedures should be conducted at authorized medical
                facilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                7. Account Termination
              </h2>
              <p className="leading-relaxed">
                We reserve the right to terminate or suspend accounts that
                violate these terms, engage in fraudulent activity, or misuse
                the platform. Users may also delete their accounts at any time
                through their profile settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                8. Changes to Terms
              </h2>
              <p className="leading-relaxed">
                Vein reserves the right to modify these terms at any time. Users
                will be notified of significant changes via email or platform
                notifications. Continued use of the platform after changes
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#1D3658] mb-4">
                9. Contact Information
              </h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms & Conditions, please
                contact us at vein@support.com or call +880 123 456789.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Terms;
