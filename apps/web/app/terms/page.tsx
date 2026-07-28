"use client";

import LegalPageLayout from "@/components/legal/LegalPageLayout";

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Effective Date: 28 July 2026 · Last Updated: 28 July 2026"
    >
      <h2 className="text-2xl font-bold text-white">TERMS OF SERVICE</h2>

      <p>Welcome to EngineeringOS.</p>
      <p>EngineeringOS is designed around a simple proposition: engineering work should not be fragmented across disconnected tools, isolated files, informal communication channels and opaque computational processes.</p>
      <p>EngineeringOS seeks to provide an integrated digital environment in which engineers, students, researchers, designers, developers, technical teams, organisations and other authorised users can conceptualise, develop, analyse, simulate, document, collaborate on and manage engineering work.</p>
      <p>These Terms of Service (&ldquo;Terms&rdquo;) establish the legal relationship between you and EngineeringOS and govern your access to and use of the EngineeringOS platform, website, applications, software, APIs, workspaces, simulations, AI-assisted features, collaboration tools, data services and related products and services (collectively, the &ldquo;Service&rdquo;).</p>
      <p>By creating an account, accessing, browsing or using the Service, you acknowledge that you have read, understood and agreed to these Terms. If you do not agree with these Terms, you must not access or use the Service.</p>

      <h3 className="text-xl font-semibold text-white">1. Definitions</h3>
      <p>For purposes of these Terms:</p>
      <p>&ldquo;EngineeringOS&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo; refers to EngineeringOS and the legal entity that owns or operates the Service.</p>
      <p>&ldquo;User&rdquo;, &ldquo;you&rdquo; or &ldquo;your&rdquo; means any person who accesses or uses the Service.</p>
      <p>&ldquo;Account&rdquo; means the user account created to access EngineeringOS.</p>
      <p>&ldquo;Organisation&rdquo; means a company, institution, laboratory, academic group, engineering team or other entity or workspace established within EngineeringOS.</p>
      <p>&ldquo;Workspace&rdquo; means an environment within EngineeringOS in which users may organise engineering projects, files, simulations, tasks, designs, data and related activities.</p>
      <p>&ldquo;User Content&rdquo; means information, files, designs, models, drawings, datasets, documents, text, calculations, simulation configurations, prompts, project information, code and other material submitted, uploaded, generated or otherwise made available by you through the Service.</p>
      <p>&ldquo;EngineeringOS Content&rdquo; means software, interfaces, designs, documentation, trademarks, logos, databases, visual elements, system architecture, algorithms and other content belonging to or licensed to EngineeringOS.</p>
      <p>&ldquo;AI Features&rdquo; means artificial-intelligence-powered features, including AI-assisted analysis, recommendations, generation, summarisation, interpretation, assistance or other computational functionality.</p>
      <p>&ldquo;Simulation&rdquo; means any computational, numerical, mathematical, physical, engineering or technical modelling performed through or in connection with the Service.</p>

      <h3 className="text-xl font-semibold text-white">2. Purpose and Philosophy of EngineeringOS</h3>
      <p>EngineeringOS is intended to support engineering thinking, not replace it.</p>
      <p>The Service is designed to help users move from ideas to structured engineering work by bringing together tools for planning, modelling, prototyping, simulation, analysis, collaboration, documentation and technical decision-making.</p>
      <p>EngineeringOS may provide computational and AI-assisted capabilities intended to accelerate engineering workflows. These capabilities are tools for investigation and productivity. They are not a substitute for professional engineering judgement, independent verification, physical testing, regulatory approval, safety assessment or any other validation required for a particular engineering application.</p>
      <p>The existence of a feature within EngineeringOS does not constitute a representation that the feature is suitable for a particular safety-critical, regulated, commercial or professional engineering application.</p>

      <h3 className="text-xl font-semibold text-white">3. Eligibility</h3>
      <p>You must provide accurate information when creating an account and must keep your account information reasonably current.</p>
      <p>You must be legally capable of entering into these Terms.</p>
      <p>If you use EngineeringOS on behalf of an organisation, institution, company, university, laboratory or other entity, you represent that you have the authority to bind that entity to these Terms.</p>
      <p>Where an organisation establishes an EngineeringOS workspace and assigns administrative roles, the organisation may establish additional rules governing access, ownership, data and permissions within that workspace.</p>

      <h3 className="text-xl font-semibold text-white">4. Accounts and Account Security</h3>
      <p>Certain features require an account.</p>
      <p>You are responsible for:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>maintaining the confidentiality of your authentication credentials;</li>
        <li>using appropriate security practices;</li>
        <li>providing accurate registration information;</li>
        <li>promptly notifying EngineeringOS of suspected unauthorised access;</li>
        <li>ensuring that activity conducted through your account complies with these Terms.</li>
      </ul>
      <p>You must not share authentication credentials in a manner that compromises account security or knowingly permit unauthorised persons to access your account.</p>
      <p>EngineeringOS may implement security controls including authentication safeguards, access controls, rate limiting, session management, monitoring, encryption and other measures appropriate to the nature of the Service.</p>
      <p>No online system can be guaranteed to be completely secure. You acknowledge that cybersecurity involves evolving risks and that EngineeringOS cannot guarantee absolute immunity from every possible security incident.</p>

      <h3 className="text-xl font-semibold text-white">5. Organisations and Workspaces</h3>
      <p>EngineeringOS may permit users to create or participate in Organisations and Workspaces.</p>
      <p>An Organisation may designate users as owners, administrators, engineers, members, viewers or other roles.</p>
      <p>Organisation administrators may have authority to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>invite or remove members;</li>
        <li>manage access permissions;</li>
        <li>manage projects and workspaces;</li>
        <li>control organisation-level settings;</li>
        <li>access or administer organisational content where permitted by the Service;</li>
        <li>manage roles and permissions.</li>
      </ul>
      <p>If you join an Organisation controlled by another entity, your access to Organisation Content may be subject to that entity&rsquo;s policies and administrative decisions.</p>
      <p>You are responsible for ensuring that you possess the appropriate authority to upload, share or manage information within an Organisation.</p>

      <h3 className="text-xl font-semibold text-white">6. User Content</h3>
      <p>You retain ownership of User Content to the extent that you possess the legal rights to that content.</p>
      <p>EngineeringOS does not claim ownership of your underlying engineering designs, models, documents, calculations, datasets, project materials or other original content merely because you submit them to the Service.</p>
      <p>However, you grant EngineeringOS a limited, non-exclusive, worldwide licence to host, store, reproduce, process, transmit, display and technically modify User Content only as reasonably necessary to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>provide the Service;</li>
        <li>maintain and secure the Service;</li>
        <li>synchronise and display your work across authorised devices;</li>
        <li>perform requested computations or simulations;</li>
        <li>provide collaboration functionality;</li>
        <li>create backups;</li>
        <li>diagnose technical problems;</li>
        <li>prevent abuse and security threats;</li>
        <li>comply with legal obligations; and</li>
        <li>improve the reliability and operation of the Service in accordance with the Privacy Policy.</li>
      </ul>
      <p>This licence does not transfer ownership of your underlying intellectual property to EngineeringOS.</p>
      <p>You represent that you have the necessary rights, permissions and authority to submit User Content to EngineeringOS.</p>

      <h3 className="text-xl font-semibold text-white">7. Engineering Designs, Models and Technical Materials</h3>
      <p>EngineeringOS may process technical material including:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>CAD-related information;</li>
        <li>engineering models;</li>
        <li>drawings;</li>
        <li>technical specifications;</li>
        <li>mathematical models;</li>
        <li>simulation parameters;</li>
        <li>material properties;</li>
        <li>design constraints;</li>
        <li>project documentation;</li>
        <li>experimental information;</li>
        <li>source code;</li>
        <li>technical datasets;</li>
        <li>engineering calculations.</li>
      </ul>
      <p>You remain responsible for the legal status, accuracy, completeness and appropriateness of such material.</p>
      <p>You must not upload confidential, proprietary or restricted information unless you have the authority to do so and understand the applicable confidentiality obligations.</p>

      <h3 className="text-xl font-semibold text-white">8. Simulations and Computational Results</h3>
      <p>EngineeringOS may provide simulation, numerical analysis, modelling or computational functionality.</p>
      <p>Simulation results are computational outputs based on the assumptions, equations, parameters, models, data, numerical methods and implementation available to the Service.</p>
      <p>A simulation result does not automatically constitute a verified representation of physical reality.</p>
      <p>You are responsible for independently evaluating:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>assumptions;</li>
        <li>boundary conditions;</li>
        <li>input data;</li>
        <li>material properties;</li>
        <li>model selection;</li>
        <li>numerical convergence;</li>
        <li>mesh or discretisation quality;</li>
        <li>tolerances;</li>
        <li>solver limitations;</li>
        <li>uncertainty;</li>
        <li>sensitivity;</li>
        <li>physical validity;</li>
        <li>experimental correspondence; and</li>
        <li>applicable engineering standards.</li>
      </ul>
      <p>You must independently verify results before relying upon them in professional, commercial, structural, mechanical, electrical, civil, chemical, aerospace, biomedical, environmental, safety-critical or otherwise consequential applications.</p>
      <p>EngineeringOS does not represent that a simulation is suitable for certification, regulatory submission, construction, manufacturing, clinical use, public infrastructure or safety-critical deployment unless expressly stated in a separate written agreement.</p>

      <h3 className="text-xl font-semibold text-white">9. Artificial Intelligence Features</h3>
      <p>EngineeringOS may incorporate AI Features to assist users with engineering reasoning, documentation, analysis, coding, project organisation, interpretation and other activities.</p>
      <p>AI-generated output may be:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>incomplete;</li>
        <li>inaccurate;</li>
        <li>outdated;</li>
        <li>internally inconsistent;</li>
        <li>based on incorrect assumptions;</li>
        <li>computationally inappropriate;</li>
        <li>misleading;</li>
        <li>unsuitable for a particular engineering context.</li>
      </ul>
      <p>AI output must therefore be treated as an assistive output rather than an authoritative engineering determination.</p>
      <p>You remain responsible for reviewing, validating, testing and approving AI-assisted outputs before using them.</p>
      <p>You must not represent unverified AI-generated material as independently validated engineering analysis.</p>
      <p>EngineeringOS does not guarantee that AI outputs are unique, error-free or suitable for any particular purpose.</p>

      <h3 className="text-xl font-semibold text-white">10. Professional Engineering Responsibility</h3>
      <p>EngineeringOS is a technology platform.</p>
      <p>It does not, solely through the provision of software, become the engineer of record, designer of record, certifying authority, safety assessor, construction professional, medical professional, legal adviser or regulatory authority for work performed by users.</p>
      <p>Where professional registration, licensing, certification, peer review, independent checking, regulatory approval or other professional obligations apply, users remain responsible for satisfying those requirements.</p>
      <p>You must exercise professional judgement appropriate to the consequences of the work.</p>

      <h3 className="text-xl font-semibold text-white">11. Acceptable Use</h3>
      <p>You agree not to use EngineeringOS to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>violate applicable law;</li>
        <li>obtain unauthorised access to systems, accounts or data;</li>
        <li>circumvent authentication or security controls;</li>
        <li>distribute malicious software;</li>
        <li>conduct cyberattacks;</li>
        <li>interfere with the availability or integrity of the Service;</li>
        <li>scrape or systematically extract data without permission;</li>
        <li>reverse engineer protected components except where permitted by applicable law;</li>
        <li>impersonate another person or organisation;</li>
        <li>upload material that infringes intellectual-property rights;</li>
        <li>upload personal information without an appropriate lawful basis or authority;</li>
        <li>use the Service to facilitate unlawful activity;</li>
        <li>deliberately generate or distribute deceptive technical information;</li>
        <li>exploit vulnerabilities in the Service;</li>
        <li>abuse APIs, automation, rate limits or computational resources;</li>
        <li>interfere with another user&rsquo;s access to the Service.</li>
      </ul>
      <p>EngineeringOS may investigate suspected violations and take proportionate measures to protect users, the Service and third parties.</p>

      <h3 className="text-xl font-semibold text-white">12. Intellectual Property</h3>
      <p>The EngineeringOS name, brand identity, logo, software, interface, architecture, databases, documentation, designs and other proprietary materials are protected by applicable intellectual-property laws.</p>
      <p>Unless expressly permitted by EngineeringOS, you may not reproduce, distribute, modify, sell, lease, sublicense or commercially exploit EngineeringOS Content.</p>
      <p>Your use of the Service does not grant you ownership of EngineeringOS intellectual property.</p>

      <h3 className="text-xl font-semibold text-white">13. Third-Party Services and Integrations</h3>
      <p>EngineeringOS may integrate with third-party services, including identity providers, cloud infrastructure, storage systems, analytics services, AI providers, communication services, payment processors or other technical providers.</p>
      <p>Third-party services may be governed by their own terms and privacy policies.</p>
      <p>EngineeringOS is not responsible for the independent operation, availability, security or policies of third-party services outside EngineeringOS&rsquo;s reasonable control.</p>

      <h3 className="text-xl font-semibold text-white">14. Availability and Changes</h3>
      <p>EngineeringOS is continuously developed.</p>
      <p>Features may be introduced, modified, suspended or discontinued.</p>
      <p>We may perform maintenance, upgrades, security remediation or infrastructure changes that temporarily affect availability.</p>
      <p>We will endeavour to maintain a reliable Service but do not guarantee uninterrupted or error-free availability.</p>

      <h3 className="text-xl font-semibold text-white">15. Fees and Paid Services</h3>
      <p>Where EngineeringOS introduces paid services, pricing, billing periods, renewal terms, taxes, cancellation rules and refund conditions may be provided through separate commercial terms.</p>
      <p>Unless otherwise stated, access to a particular feature does not guarantee that the feature will remain free indefinitely.</p>

      <h3 className="text-xl font-semibold text-white">16. Suspension and Termination</h3>
      <p>EngineeringOS may suspend or terminate access where reasonably necessary because of:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>serious or repeated violations of these Terms;</li>
        <li>unlawful activity;</li>
        <li>security threats;</li>
        <li>fraud;</li>
        <li>abuse of computational resources;</li>
        <li>unauthorised access;</li>
        <li>non-payment of applicable fees;</li>
        <li>legal requirements;</li>
        <li>conduct that materially threatens users or the Service.</li>
      </ul>
      <p>Where reasonably practicable, EngineeringOS may provide notice and an opportunity to address the issue.</p>
      <p>You may stop using the Service at any time.</p>
      <p>Termination does not automatically extinguish provisions that by their nature should continue, including intellectual-property provisions, disclaimers, limitations of liability, dispute provisions and obligations relating to confidentiality or lawful use.</p>

      <h3 className="text-xl font-semibold text-white">17. Data and Account Closure</h3>
      <p>Upon account closure, EngineeringOS may retain certain information where necessary to satisfy legal obligations, resolve disputes, prevent fraud, maintain security, enforce agreements or comply with legitimate operational requirements.</p>
      <p>Treatment of personal information is further described in the EngineeringOS Privacy Policy.</p>
      <p>Users should maintain independent backups of important engineering materials.</p>
      <p>EngineeringOS is not intended to be the sole repository for irreplaceable professional or research records.</p>

      <h3 className="text-xl font-semibold text-white">18. Disclaimers</h3>
      <p>To the maximum extent permitted by applicable law, the Service is provided on an &ldquo;as available&rdquo; and &ldquo;as is&rdquo; basis.</p>
      <p>EngineeringOS does not guarantee that:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>every calculation will be correct;</li>
        <li>simulations will correspond perfectly to physical systems;</li>
        <li>AI output will be accurate;</li>
        <li>data will never be lost;</li>
        <li>the Service will always be available;</li>
        <li>every feature will satisfy every engineering workflow;</li>
        <li>the Service will be free from defects;</li>
        <li>the Service will meet every particular professional or commercial requirement.</li>
      </ul>
      <p>Nothing in these Terms excludes a legal right or protection that cannot lawfully be excluded under Ghanaian law.</p>

      <h3 className="text-xl font-semibold text-white">19. Limitation of Liability</h3>
      <p>To the maximum extent permitted by applicable law, EngineeringOS will not be liable for indirect, incidental, consequential, special or exemplary loss arising from use of the Service, including loss of anticipated profits, business opportunities, reputation or data, except where such exclusion is prohibited by law.</p>
      <p>EngineeringOS&rsquo;s liability, where legally permissible to limit it, shall be assessed having regard to the nature of the Service, the circumstances giving rise to the claim and applicable law.</p>
      <p>Nothing in these Terms limits liability that cannot lawfully be limited.</p>

      <h3 className="text-xl font-semibold text-white">20. Indemnity</h3>
      <p>To the extent permitted by law, you agree to indemnify and hold EngineeringOS harmless from claims, liabilities, damages, losses and reasonable expenses arising from:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>your unlawful use of the Service;</li>
        <li>your violation of these Terms;</li>
        <li>your infringement of another person&rsquo;s intellectual-property rights;</li>
        <li>your unauthorised disclosure or submission of information;</li>
        <li>your misuse of engineering outputs;</li>
        <li>your violation of applicable professional obligations.</li>
      </ul>

      <h3 className="text-xl font-semibold text-white">21. Governing Law</h3>
      <p>These Terms shall be governed by and interpreted in accordance with the laws of the Republic of Ghana.</p>
      <p>Subject to any mandatory dispute-resolution mechanism required by applicable law, disputes relating to these Terms or the Service shall fall within the jurisdiction of the competent courts of Ghana.</p>

      <h3 className="text-xl font-semibold text-white">22. Changes to These Terms</h3>
      <p>EngineeringOS may update these Terms as the Service, law, technology or business model develops.</p>
      <p>Material changes will be communicated through reasonable means where appropriate.</p>
      <p>Continued use of the Service after the effective date of revised Terms constitutes acceptance of the revised Terms to the extent permitted by law.</p>

      <h3 className="text-xl font-semibold text-white">23. Severability</h3>
      <p>If any provision of these Terms is determined to be invalid, unlawful or unenforceable, the remaining provisions shall continue in effect to the extent permitted by law.</p>

      <h3 className="text-xl font-semibold text-white">24. Entire Agreement</h3>
      <p>These Terms, together with the Privacy Policy, Disclosure &amp; Responsible Use Statement and any applicable additional terms, constitute the principal agreement governing your use of EngineeringOS.</p>

      <h3 className="text-xl font-semibold text-white">25. Contact</h3>
      <p>Questions concerning these Terms should be directed to:</p>
      <p>
        <strong>EngineeringOS</strong><br />
        Legal/Compliance: [Insert official legal email]<br />
        Registered Address: [Insert registered address]<br />
        Republic of Ghana
      </p>
      <p><strong>EngineeringOS exists to help people engineer better&mdash;not merely to provide another software interface.</strong></p>
    </LegalPageLayout>
  );
}
