import React, { useState } from 'react';
import { X, MessageSquare, Mail, Phone, CheckCircle2, Search, ArrowRight, ShieldCheck } from 'lucide-react';
import { AppStorage } from '../services/storage';

interface SupportSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUPPORT_ARTICLES = [
  { title: 'How to install an eSIM on iOS (iPhone 11 - 16)', cat: 'Installation', time: '2 min read' },
  { title: 'How to install an eSIM on Samsung Galaxy (S20 - S24)', cat: 'Installation', time: '2 min read' },
  { title: 'What to do if data does not connect automatically upon landing', cat: 'Troubleshooting', time: '3 min read' },
  { title: 'Enabling Data Roaming on your eSIM profile', cat: 'Activation', time: '1 min read' },
  { title: 'How to request a 100% refund for unused packages', cat: 'Refunds', time: '2 min read' },
  { title: 'Checking device carrier unlock status', cat: 'Compatibility', time: '2 min read' }
];

export const SupportSection: React.FC<SupportSectionProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formOrder, setFormOrder] = useState('');
  const [formCategory, setFormCategory] = useState('Installation');
  const [formMsg, setFormMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [searchArticle, setSearchArticle] = useState('');

  const filteredArticles = searchArticle.trim()
    ? SUPPORT_ARTICLES.filter(a =>
        a.title.toLowerCase().includes(searchArticle.toLowerCase()) ||
        a.cat.toLowerCase().includes(searchArticle.toLowerCase())
      )
    : SUPPORT_ARTICLES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSubmitting(true);
    setTimeout(() => {
      AppStorage.addTicket({
        id: `tkt-${Date.now()}`,
        name: formName,
        email: formEmail,
        orderNumber: formOrder,
        category: formCategory,
        message: formMsg,
        status: 'open',
        createdAt: new Date().toISOString()
      });
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#F0F4F8]">
          <div>
            <h3 className="text-lg font-bold text-[#0B192C] font-['Space_Grotesk']">ESIMORA Help & Support Center</h3>
            <p className="text-xs text-slate-500">24/7 dedicated assistance for global connectivity</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
          
          {/* Quick Contact Channels */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Direct Contact Options
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <a
                href="https://wa.me/18005550199?text=Hello%20ESIMORA%20Support"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-50 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00B67A] text-white flex items-center justify-center font-bold shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-950">WhatsApp Support</div>
                  <div className="text-[11px] text-[#00B67A] font-semibold">Average reply &lt; 2 min</div>
                </div>
              </a>

              <a
                href="mailto:support@esimora.io?subject=eSIM%20Assistance"
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/80 hover:bg-blue-50 transition-colors group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-bold shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Email Support</div>
                  <div className="text-[11px] text-[#3B82F6] font-semibold">support@esimora.io</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-[#0B192C] text-white flex items-center justify-center font-bold shadow-xs">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Live Chat</div>
                  <div className="text-[11px] text-slate-500 font-medium">Available 24/7 online</div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Knowledge Base Articles */}
          <div className="p-5 rounded-2xl bg-[#F0F4F8] border border-blue-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-['Space_Grotesk']">
                Knowledge Base & Setup Guides
              </span>
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={searchArticle}
                  onChange={(e) => setSearchArticle(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-3 pr-3 py-1.5 focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {filteredArticles.map((art, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white rounded-xl border border-slate-200 hover:border-[#3B82F6]/40 transition-colors cursor-pointer flex flex-col justify-between"
                >
                  <span className="font-semibold text-slate-800 line-clamp-1">{art.title}</span>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-[#3B82F6] font-medium">{art.cat}</span>
                    <span>{art.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="border-t border-slate-100 pt-5">
            <h4 className="text-sm font-bold text-[#0B192C] mb-1 font-['Space_Grotesk']">
              Send a Support Message
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Have an issue or question regarding your order? Fill out the ticket below.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-[#00B67A] mx-auto" />
                <h5 className="text-sm font-bold text-emerald-900">Message Received</h5>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you! Our technical support team has received your ticket and will respond to <strong>{formEmail}</strong> within 15 minutes.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormMsg('');
                  }}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Order Number (Optional)</label>
                    <input
                      type="text"
                      value={formOrder}
                      onChange={(e) => setFormOrder(e.target.value)}
                      placeholder="e.g. ESM-2026-8831"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                    >
                      <option value="Installation">Installation & QR Code</option>
                      <option value="Activation">Activation upon Arrival</option>
                      <option value="Troubleshooting">No Cellular Connection</option>
                      <option value="Compatibility">Phone Compatibility</option>
                      <option value="Refund">Refund / Cancellation</option>
                      <option value="Other">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">How can we help? *</label>
                  <textarea
                    required
                    rows={3}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00B67A]" />
                    <span>Never share credit card numbers or passwords</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-md shadow-[#FF6B35]/25 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
