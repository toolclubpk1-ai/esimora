import React, { useState } from 'react';
import { Order, CurrencyConfig } from '../types';
import { eSIMService } from '../services/eSIMService';
import { CheckCircle2, Download, Copy, Check, ArrowRight, Smartphone, Mail, ShieldCheck } from 'lucide-react';

interface OrderSuccessViewProps {
  order: Order;
  onGoToMyESIMs: () => void;
  onDone: () => void;
  currentCurrency: CurrencyConfig;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({
  order,
  onGoToMyESIMs,
  onDone,
  currentCurrency
}) => {
  const [copiedLpa, setCopiedLpa] = useState(false);
  const [copiedIccid, setCopiedIccid] = useState(false);

  const qrSvgUrl = eSIMService.getQRCode(order.lpaActivationCode);

  const handleCopyLpa = () => {
    navigator.clipboard.writeText(order.lpaActivationCode);
    setCopiedLpa(true);
    setTimeout(() => setCopiedLpa(false), 2000);
  };

  const handleCopyIccid = () => {
    navigator.clipboard.writeText(order.iccid);
    setCopiedIccid(true);
    setTimeout(() => setCopiedIccid(false), 2000);
  };

  const handleDownloadQR = () => {
    // Open in print / download window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>ESIMORA eSIM QR Code - ${order.orderNumber}</title>
            <style>
              body { font-family: sans-serif; text-align: center; padding: 40px; color: #0F172A; }
              .card { max-width: 480px; margin: 0 auto; border: 2px solid #E2E8F0; padding: 30px; border-radius: 20px; }
              img { width: 240px; height: 240px; margin: 20px 0; }
              .code { font-family: monospace; font-size: 11px; background: #F1F5F9; padding: 10px; border-radius: 8px; word-break: break-all; }
            </style>
          </head>
          <body>
            <div class="card">
              <h2>ESIMORA Digital eSIM</h2>
              <p><strong>${order.destinationName}</strong> · ${order.data} · ${order.validityDays} Days</p>
              <img src="${qrSvgUrl}" alt="eSIM QR Code" />
              <p>Scan with your phone camera in Cellular Settings to install.</p>
              <div class="code">LPA Activation Code: ${order.lpaActivationCode}</div>
              <p style="font-size: 11px; color: #64748B; margin-top: 20px;">Order: ${order.orderNumber} · Customer: ${order.customerName}</p>
            </div>
            <script>window.onload = function() { window.print(); }</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F0F4F8] min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Success Banner */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00B67A] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#00B67A] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Confirmed & Delivered
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-['Space_Grotesk']">
            Your eSIM is Ready!
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            We've sent your eSIM activation instructions and receipt to <strong>{order.customerEmail}</strong>.
          </p>
        </div>

        {/* QR Code Activation Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          
          {/* Order Snapshot Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{order.countryFlag}</span>
              <div>
                <h3 className="text-lg font-bold text-[#0B192C] font-['Space_Grotesk']">{order.planName}</h3>
                <div className="text-xs text-slate-500">
                  {order.destinationName} · {order.data} · Valid {order.validityDays} Days
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Order Number</span>
              <span className="font-mono text-sm font-bold text-[#0B192C]">{order.orderNumber}</span>
            </div>
          </div>

          {/* QR Code Display & Quick Scan */}
          <div className="flex flex-col md:flex-row items-center gap-8 py-2">
            
            {/* SVG QR Code */}
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm shrink-0 flex flex-col items-center">
              <img
                src={qrSvgUrl}
                alt="eSIM QR Code"
                className="w-48 h-48 sm:w-56 sm:h-56"
              />
              <span className="text-[11px] font-semibold text-slate-400 mt-2">
                Scan with device camera
              </span>
            </div>

            {/* Installation Instructions */}
            <div className="space-y-4 flex-1">
              <div>
                <h4 className="text-sm font-bold text-[#0B192C] uppercase tracking-wide mb-1 font-['Space_Grotesk']">
                  How to Install Your eSIM
                </h4>
                <p className="text-xs text-slate-500">
                  You can install now before your flight. The data validity clock will only start once you land overseas.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="p-2.5 rounded-xl bg-[#F0F4F8]/60 border border-blue-100 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#3B82F6] font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <span><strong>On iPhone:</strong> Go to Settings → Cellular → Add eSIM → Use QR Code.</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F0F4F8]/60 border border-blue-100 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#3B82F6] font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <span><strong>On Android:</strong> Go to Settings → Network & Internet → SIMs → Download SIM.</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F0F4F8]/60 border border-blue-100 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-[#3B82F6] font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <span>Upon arrival, turn on <strong>Data Roaming</strong> on this eSIM line.</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={handleDownloadQR}
                  className="px-4 py-2 text-xs font-bold text-[#0B192C] bg-[#F0F4F8] hover:bg-blue-100/60 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Print QR</span>
                </button>

                <button
                  onClick={onGoToMyESIMs}
                  className="px-5 py-2.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full shadow-md shadow-[#FF6B35]/30 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>View in My eSIMs</span>
                </button>
              </div>

            </div>

          </div>

          {/* Manual Activation Code Box */}
          <div className="p-4 rounded-2xl bg-[#F0F4F8]/60 border border-blue-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0B192C] uppercase tracking-wide">
                  Manual Activation String (SM-DP+ & Code)
                </span>
                <p className="text-[11px] text-slate-500">
                  Can't scan the QR? Copy and paste this code manually into your device settings.
                </p>
              </div>

              <button
                onClick={handleCopyLpa}
                className="px-3 py-1.5 text-xs font-semibold text-[#3B82F6] bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1 cursor-pointer"
              >
                {copiedLpa ? <Check className="w-3.5 h-3.5 text-[#00B67A]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLpa ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <div className="p-2.5 bg-white border border-slate-200 rounded-xl font-mono text-xs text-slate-700 break-all select-all">
              {order.lpaActivationCode}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>ICCID Identifier: <strong className="font-mono text-slate-700">{order.iccid}</strong></span>
              <button
                onClick={handleCopyIccid}
                className="text-[#3B82F6] hover:underline cursor-pointer"
              >
                {copiedIccid ? 'Copied ICCID!' : 'Copy ICCID'}
              </button>
            </div>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onDone}
              className="text-xs font-semibold text-slate-500 hover:text-[#0B192C] cursor-pointer"
            >
              ← Back to Homepage
            </button>

            <button
              onClick={onGoToMyESIMs}
              className="px-5 py-2.5 text-xs font-bold text-[#0B192C] bg-[#F0F4F8] hover:bg-blue-100/60 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Go to My eSIMs Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
