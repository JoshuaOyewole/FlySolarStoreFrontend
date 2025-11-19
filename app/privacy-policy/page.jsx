import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            
            <div className="space-y-6 text-gray-700">
                <section>
                    <p className="text-sm text-gray-600 mb-4">
                        Last Updated: 15th Nov. 2025
                    </p>
                    <p>
                        This Privacy Policy describes how FlySolarStore collects, uses, and shares your personal information when you visit or make a purchase from our website.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                    <p className="mb-2">We collect the following types of information:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Personal Information:</strong> Name, email address, shipping address, billing address, phone number</li>
                        <li><strong>Payment Information:</strong> Credit card details (processed securely by our payment processor)</li>
                        <li><strong>Device Information:</strong> IP address, browser type, device identifiers</li>
                        <li><strong>Usage Information:</strong> Pages visited, products viewed, time spent on site</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Process and fulfill your orders</li>
                        <li>Communicate with you about your orders and customer service inquiries</li>
                        <li>Send promotional emails (with your consent)</li>
                        <li>Improve our website and services</li>
                        <li>Prevent fraud and enhance security</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Sharing Your Information</h2>
                    <p className="mb-2">We may share your information with:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Service Providers:</strong> Payment processors, shipping companies, email service providers</li>
                        <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                        <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Cookies and Tracking</h2>
                    <p>
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookies through your browser settings.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
                    <p className="mb-2">You have the right to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Access the personal information we hold about you</li>
                        <li>Request correction of inaccurate information</li>
                        <li>Request deletion of your personal information</li>
                        <li>Opt-out of marketing communications</li>
                        <li>Object to processing of your information</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Data Security</h2>
                    <p>
                        We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Children's Privacy</h2>
                    <p>
                        Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <p className="mt-2">
                        Email: privacy@flysolarstore.com<br />
                        Address: No 12, Adeola Odeku Street, Victoria Island, Lagos Nigeria
                    </p>
                </section>
            </div>
        </div>
    );
}