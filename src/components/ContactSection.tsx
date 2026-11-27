import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Building2,
  UserCheck,
} from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Reveal } from './Reveal';
import { ScrollScrubText } from './ScrollScrubText';

interface ContactSectionProps {
  isHeadingH1?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isHeadingH1 = false }) => {
  const { settings, submitInquiry } = useSite();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Equipment Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappDigits = settings.whatsapp.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    submitInquiry({ name, email, phone, subject, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <Reveal>
      <section id="contact" className="border-t border-black/[0.08] bg-white py-14 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10">
          {/* Header */}
          <div className="max-w-2xl mb-10 sm:mb-14">
            <p className="eyebrow-mono text-[#002FA7]">CONTACT {settings.brandName.toUpperCase()}</p>
            {isHeadingH1 ? (
              <h1 className="text-[34px] sm:text-[46px] md:text-[54px] font-extrabold leading-[1.02] swiss-tracking mt-2">
                Direct Support &
                <br />
                <span className="text-[#002FA7]">Wholesale Orders.</span>
              </h1>
            ) : (
              <ScrollScrubText
                as="h2"
                lines={['Direct Support &', 'Wholesale Orders.']}
                accentWords={['Wholesale', 'Orders.']}
                className="text-[32px] sm:text-[42px] md:text-[48px] font-extrabold leading-[1.02] swiss-tracking mt-2"
              />
            )}
            <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
              Contact <span className="font-semibold text-[#111111]">{settings.ownerName}</span> and our{' '}
              <span className="font-semibold text-[#111111]">{settings.companyLegalName}</span> team
              for bulk price quotes, brand partnerships, or product questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-6 sm:p-7 bg-[#F5F6F8] border border-black/[0.06] space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#002FA7] text-white flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow-mono text-neutral-500">Contact Person</p>
                    <p className="text-lg font-bold text-[#111111] mt-0.5">{settings.ownerName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                  <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow-mono text-neutral-500">Company</p>
                    <p className="text-base font-bold text-[#111111] mt-0.5">
                      {settings.companyLegalName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                  <div className="w-10 h-10 bg-[#002FA7] text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow-mono text-neutral-500">Telephone</p>
                    <a
                      href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                      className="text-base sm:text-lg font-bold text-[#111111] hover:text-[#002FA7] transition-colors mt-0.5 block break-words"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                  <div className="w-10 h-10 bg-[#002FA7] text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow-mono text-neutral-500">Official Email</p>
                    <a
                      href={`mailto:${settings.email}`}
                      className="text-base sm:text-lg font-bold text-[#111111] hover:text-[#002FA7] transition-colors mt-0.5 block break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                  <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow-mono text-neutral-500">Studio Address</p>
                    <p className="text-sm font-medium text-[#111111] mt-0.5">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                  <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow-mono text-neutral-500">Business Hours</p>
                    <p className="text-sm font-medium text-[#111111] mt-0.5">{settings.hours}</p>
                  </div>
                </div>

                {whatsappDigits && (
                  <div className="pt-4 border-t border-black/[0.06]">
                    <a
                      href={`https://wa.me/${whatsappDigits}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold py-3.5 transition-all hover:-translate-y-0.5"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp ({settings.whatsapp})
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="border border-black/[0.08] p-6 sm:p-8 md:p-10 bg-white">
                {submitted ? (
                  <div className="py-12 text-center space-y-4 animate-fade-up">
                    <CheckCircle2 className="w-12 h-12 text-[#002FA7] mx-auto" />
                    <h3 className="text-2xl font-bold">Message Sent</h3>
                    <p className="text-sm text-neutral-600 max-w-md mx-auto">
                      Thank you. Your message has been received and{' '}
                      <span className="font-semibold text-black">{settings.ownerName}</span> (
                      <span className="font-semibold text-black">{settings.email}</span>) will respond
                      shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="bg-[#002FA7] text-white text-xs font-semibold px-6 py-3 hover:bg-[#00227A]"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5">Full Name *</label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5">Phone Number</label>
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+966 5X XXX XXXX"
                          className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5">Topic</label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7] bg-white transition-colors"
                        >
                          <option>Equipment Inquiry</option>
                          <option>Commercial Studio Outfitting</option>
                          <option>Order Support</option>
                          <option>Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your space, equipment needs, or question..."
                        className="w-full border border-black/15 px-3.5 py-2.5 text-sm outline-none focus:border-[#002FA7] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto justify-center inline-flex items-center gap-2.5 bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold px-7 py-3.5 transition-all hover:translate-x-0.5"
                    >
                      Send Message
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
};
