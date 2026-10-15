import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { ImagePlaceholder } from '../components/ImagePlaceholder';
import { PageHero } from '../components/PageHero';
import { club } from '../data/club';
import { CheckCircle, Facebook, Mail, Phone, Pin } from '../components/Icons';

const socials = [
  { label: 'Facebook', href: club.social.facebook, Icon: Facebook },
];

export function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Masters FC';
  }, []);

  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Contact Masters FC"
        title={<>Get in <span className="text-lime-brand">Touch</span></>}
        description="Partnerships, media, academy enquiries or general questions — we would love to hear from you."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container-fc grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-pitch-950">
              Send us a <span className="text-pitch-700">message</span>
            </h2>
            <p className="mt-2 text-pitch-800/70">
              Fill in the form below and our team will come back to you shortly.
            </p>

            {submitted ? (
              <div className="mt-8 rounded-3xl bg-pitch-50 border border-pitch-700/30 p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-pitch-700 text-lime-brand flex items-center justify-center">
                  <CheckCircle width={22} height={22} />
                </div>
                <p className="mt-4 font-display font-bold text-xl text-pitch-950">Thanks for reaching out!</p>
                <p className="mt-1 text-sm text-pitch-800/70">
                  Your message has been received. We will reply as soon as possible.
                </p>
                <div className="mt-6">
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>Send another message</Button>
                </div>
              </div>
            ) : (
              <form
                className="mt-8 grid sm:grid-cols-2 gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <Field label="Full Name" id="name" type="text" required />
                <Field label="Email Address" id="email" type="email" required />
                <Field label="Phone" id="phone" type="tel" />
                <Field label="Subject" id="subject" type="text" required />
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-pitch-950 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs text-pitch-800/60">
                    By sending this message you agree to our communications policy.
                  </p>
                  <Button type="submit" variant="primary" size="lg">Send Message</Button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <aside className="lg:col-span-2 space-y-5">
            <div className="rounded-3xl bg-pitch-950 text-white p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-pitch-stripes opacity-30" aria-hidden />
              <div className="relative space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime-brand">Reach us</p>
                  <h3 className="mt-2 font-display font-bold text-2xl">Masters Football Club</h3>
                </div>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <Mail className="text-lime-brand mt-0.5" />
                    <a href={`mailto:${club.contact.email}`} className="text-pitch-100/90 hover:text-white break-all">
                      {club.contact.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="text-lime-brand mt-0.5" />
                    <span className="text-pitch-100/90">{club.contact.phone}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Pin className="text-lime-brand mt-0.5" />
                    <span className="text-pitch-100/90">{club.contact.address}</span>
                  </li>
                </ul>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-lime-brand mb-3">Follow us</p>
                  <div className="flex items-center gap-3">
                    {socials.map(({ label, href, Icon }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/15 hover:border-lime-brand hover:text-lime-brand transition"
                      >
                        <Icon width={16} height={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ImagePlaceholder
              type="map"
              title="Club Location Map"
              helper="Replace with embedded map"
              aspectRatio="4/3"
            />
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, type, required }: { label: string; id: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-widest text-pitch-950 mb-2">
        {label} {required && <span className="text-pitch-700">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-2xl bg-pitch-50 border border-pitch-900/10 px-4 py-3 text-sm text-pitch-950 placeholder:text-pitch-800/40 focus:border-pitch-700/40 focus:outline-none"
        placeholder={label}
      />
    </div>
  );
}

export default ContactPage;
