import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Building2,
  UserCheck,
} from 'lucide-react';
import { useSite } from '../store/siteStore';
import { Reveal } from '../components/Reveal';

export const ContactPage: React.FC = () => {
  const { settings, submitInquiry, faqs } = useSite();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Equipment Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id ?? null);

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
    <main className="bg-white min-h-[75vh] py-16">
      <div className="max-w-[1360px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 animate-fade-up">
          <p className="eyebrow-mono text-[#002FA7]">CONTACT {settings.brandName.toUpperCase()}</p>
          <h1 className="text-[42px] md:text-[54px] font-extrabold leading-[1.02] swiss-tracking mt-2">
            Direct Support &
            <br />
            <span className="text-[#002FA7]">Studio Outfitting.</span>
          </h1>
          <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
            Reach <span className="font-semibold text-[#111111]">{settings.ownerName}</span> and our{' '}
            <span className="font-semibold text-[#111111]">{settings.companyLegalName}</span> team
            for private gym commissions, commercial orders, or product guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-5 animate-fade-up-delay-1">
            <div className="p-7 bg-[#F5F6F8] border border-black/[0.06] space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#002FA7] text-white flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="eyebrow-mono text-neutral-500">Contact Person</p>
                  <p className="text-lg font-bold text-[#111111] mt-0.5">{settings.ownerName}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
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
                <div>
                  <p className="eyebrow-mono text-neutral-500">Telephone</p>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                    className="text-lg font-bold text-[#111111] hover:text-[#002FA7] transition-colors mt-0.5 block"
                  >
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                <div className="w-10 h-10 bg-[#002FA7] text-white flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="eyebrow-mono text-neutral-500">Official Email</p>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-lg font-bold text-[#111111] hover:text-[#002FA7] transition-colors mt-0.5 block"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="eyebrow-mono text-neutral-500">Studio Address</p>
                  <p className="text-sm font-medium text-[#111111] mt-0.5">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-4 border-t border-black/[0.06]">
                <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
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
          <div className="lg:col-span-7 animate-fade-up-delay-2">
            <div className="border border-black/[0.08] p-8 md:p-10 bg-white">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fade-up">
                  <CheckCircle2 className="w-12 h-12 text-[#002FA7] mx-auto" />
                  <h2 className="text-2xl font-bold">Message Sent</h2>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto">
                    Thank you. Your inquiry has been recorded in the Admin Panel inbox and{' '}
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
                    className="inline-flex items-center gap-2.5 bg-[#002FA7] hover:bg-[#00227A] text-white text-xs font-semibold px-7 py-3.5 transition-all hover:translate-x-0.5"
                  >
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ANIMATED FAQS SECTION */}
        <Reveal className="mt-20 pt-16 border-t border-black/[0.08]">
          <section id="faqs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-3">
                <p className="eyebrow-mono text-[#002FA7]">FREQUENTLY ASKED QUESTIONS</p>
                <h2 className="text-[34px] font-extrabold leading-[1.05] swiss-tracking">
                  Everything You
                  <br />
                  Need to Know.
                </h2>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Answers about {settings.brandName} shipping, custom studio outfitting, warranties, and support.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-3">
                {faqs.map((faq) => {
                  const isOpen = openFaqId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`border transition-colors duration-300 ${
                        isOpen ? 'border-[#002FA7] bg-[#F5F6F8]/60' : 'border-black/10 bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                      >
                        <div>
                          <span className="eyebrow-mono text-[#002FA7] block mb-1">{faq.category}</span>
                          <span className="text-[15px] font-bold text-[#111111]">{faq.question}</span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-[#002FA7] flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="px-6 pb-5 text-sm text-neutral-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Reveal>
      </div>
    </main>
  );
};
