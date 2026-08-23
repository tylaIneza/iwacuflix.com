'use client';
import { useState } from 'react';
import { submitContact } from '@/lib/api';
import { FiSend, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

type Category = 'general' | 'copyright' | 'business';

interface FormState {
  name: string;
  email: string;
  category: Category;
  subject: string;
  message: string;
  website: string; // honeypot — must stay empty
}

const defaultForm: FormState = {
  name: '', email: '', category: 'general', subject: '', message: '', website: '',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const subject = form.subject.trim();
  const message = form.message.trim();

  if (name.length < 2 || name.length > 150) errors.name = 'Name must be between 2 and 150 characters.';
  if (!EMAIL_RE.test(email) || email.length > 255) errors.email = 'Please enter a valid email address.';
  if (subject.length < 3 || subject.length > 200) errors.subject = 'Subject must be between 3 and 200 characters.';
  if (message.length < 10 || message.length > 5000) errors.message = 'Message must be between 10 and 5000 characters.';

  return errors;
}

const inputCls = 'w-full bg-[#111] border border-[#2a2a2a] text-white rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#E50914] transition-colors placeholder-gray-600';
const errCls   = 'border-red-500/60 focus:border-red-500';

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  const set = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');

    const clientErrors = validate(form);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        category: form.category,
        website: form.website, // honeypot
      });
      setStatus('success');
      setStatusMsg(res?.message || 'Your message has been sent. We will get back to you soon.');
      setForm(defaultForm);
      setErrors({});
    } catch (err: unknown) {
      const response = (err as { response?: { data?: { message?: string; errors?: Record<string, string> } } })?.response;
      if (response?.data?.errors) {
        setErrors(response.data.errors as Partial<Record<keyof FormState, string>>);
      }
      setStatus('error');
      setStatusMsg(response?.data?.message || 'Something went wrong. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {status === 'success' && (
        <div className="flex items-start gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg" role="status">
          <FiCheckCircle className="mt-0.5 flex-shrink-0" /> {statusMsg}
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg" role="alert">
          <FiAlertCircle className="mt-0.5 flex-shrink-0" /> {statusMsg}
        </div>
      )}

      {/* Honeypot — hidden from real users, catches naive bots */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={form.website} onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="text-gray-400 text-xs uppercase tracking-wide block mb-1.5">
            Full Name<span className="text-[#E50914] ml-0.5">*</span>
          </label>
          <input
            id="name" type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
            placeholder="Jane Doe" required minLength={2} maxLength={150}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${inputCls} ${errors.name ? errCls : ''}`}
          />
          {errors.name && <p id="name-error" className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-gray-400 text-xs uppercase tracking-wide block mb-1.5">
            Email Address<span className="text-[#E50914] ml-0.5">*</span>
          </label>
          <input
            id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
            placeholder="you@example.com" required maxLength={255}
            aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${inputCls} ${errors.email ? errCls : ''}`}
          />
          {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="category" className="text-gray-400 text-xs uppercase tracking-wide block mb-1.5">
          Inquiry Type
        </label>
        <select
          id="category" value={form.category}
          onChange={(e) => set('category', e.target.value as Category)}
          className={inputCls}
        >
          <option value="general">General Inquiry</option>
          <option value="copyright">Copyright / DMCA</option>
          <option value="business">Business / Partnership</option>
        </select>
      </div>

      <div>
        <label htmlFor="subject" className="text-gray-400 text-xs uppercase tracking-wide block mb-1.5">
          Subject<span className="text-[#E50914] ml-0.5">*</span>
        </label>
        <input
          id="subject" type="text" value={form.subject} onChange={(e) => set('subject', e.target.value)}
          placeholder="What is this about?" required minLength={3} maxLength={200}
          aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={`${inputCls} ${errors.subject ? errCls : ''}`}
        />
        {errors.subject && <p id="subject-error" className="text-red-400 text-xs mt-1.5">{errors.subject}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-gray-400 text-xs uppercase tracking-wide block mb-1.5">
          Message<span className="text-[#E50914] ml-0.5">*</span>
        </label>
        <textarea
          id="message" value={form.message} onChange={(e) => set('message', e.target.value)}
          rows={6} placeholder="Tell us more…" required minLength={10} maxLength={5000}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${inputCls} resize-none ${errors.message ? errCls : ''}`}
        />
        <div className="flex justify-between mt-1.5">
          {errors.message ? (
            <p id="message-error" className="text-red-400 text-xs">{errors.message}</p>
          ) : <span />}
          <p className="text-gray-600 text-[11px]">{form.message.length}/5000</p>
        </div>
      </div>

      <button
        type="submit" disabled={submitting}
        className="flex items-center gap-2 bg-[#E50914] hover:bg-[#c40812] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? <><FiLoader className="animate-spin" size={15} /> Sending…</> : <><FiSend size={15} /> Send Message</>}
      </button>
    </form>
  );
}
