import React, { useState } from 'react';
import { Order, CurrencyConfig } from '../types';
import { AppStorage } from '../services/storage';
import { eSIMService } from '../services/eSIMService';
import { Smartphone, QrCode, RefreshCw, CheckCircle, Wifi, ArrowRight, X, Copy, Check, Clock, Plus } from 'lucide-react';

interface MyESIMsViewProps {
  orders: Order[];
  onClose: () => void;
  onBrowsePlans: () => void;
  currentCurrency: CurrencyConfig;
}

export const MyESIMsView: React.FC<MyESIMsViewProps> = ({
  orders,
  onClose,
  onBrowsePlans,
  currentCurrency
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [topUpOrder, setTopUpOrder] = useState<Order | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [topUpSuccess, setTopUpSuccess] = useState(false);

  const activeOrders = orders.filter(o => o.orderStatus === 'activated' || o.orderStatus === 'delivered');
  const pastOrders = orders.filter(o => o.orderStatus !== 'activated' && o.orderStatus !== 'delivered');

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleConfirmTopUp = (orderId: string, addGB: number) => {
    const orderList = AppStorage.getOrders().map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          totalDataGB: (o.totalDataGB || 5) + addGB,
          data: `${((o.totalDataGB || 5) + addGB)} GB`,
          orderStatus: 'activated' as const
        };
      }
      return o;
    });
    AppStorage.saveOrders(orderList);
    setTopUpSuccess(true);
    setTimeout(() => {
      setTopUpSuccess(false);
      setTopUpOrder(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-[#F0F4F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B82F6] text-white flex items-center justify-center shadow-md shadow-[#3B82F6]/25">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B192C] font-['Space_Grotesk']">My eSIMs & Orders</h3>
              <p className="text-xs text-slate-500">Manage your active digital lines, monitor data, and retrieve QR codes</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-8 max-h-[78vh] overflow-y-auto">
          
          {/* Active eSIMs Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active & Ready Profiles ({activeOrders.length})
              </h4>
              <button
                onClick={onBrowsePlans}
                className="text-xs font-semibold text-[#FF6B35] hover:underline cursor-pointer"
              >
                + Add Another eSIM
              </button>
            </div>

            {activeOrders.length === 0 ? (
              <div className="p-8 text-center bg-[#F0F4F8] rounded-2xl border border-dashed border-blue-200">
                <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">No active eSIM profiles yet.</p>
                <p className="text-xs text-slate-400 mt-0.5">Explore 200+ global destinations with instant activation.</p>
                <button
                  onClick={onBrowsePlans}
                  className="mt-4 px-6 py-2.5 text-xs font-extrabold text-white bg-[#FF6B35] hover:bg-[#E8551E] rounded-full transition-all shadow-md shadow-[#FF6B35]/30 cursor-pointer"
                >
                  Browse Destinations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeOrders.map((ord) => {
                  const used = ord.dataUsedGB || 0;
                  const total = ord.totalDataGB || 5;
                  const pctUsed = Math.min(100, Math.round((used / total) * 100));

                  return (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-[#3B82F6]/40 transition-all space-y-4 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top destination info */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="text-3xl">{ord.countryFlag}</span>
                            <div>
                              <div className="text-sm font-bold text-[#0B192C]">{ord.destinationName}</div>
                              <div className="text-xs text-slate-500">{ord.planName}</div>
                            </div>
                          </div>

                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            ord.orderStatus === 'activated'
                              ? 'bg-emerald-50 text-[#00B67A] border border-emerald-200'
                              : 'bg-orange-50 text-[#FF6B35] border border-orange-200'
                          }`}>
                            {ord.orderStatus === 'activated' ? 'Connected' : 'Ready to Scan'}
                          </span>
                        </div>

                        {/* Data Usage Bar */}
                        <div className="mt-4 space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-500 font-medium">Data Allowance</span>
                            <span className="font-bold text-[#0B192C] tabular-nums">
                              {used.toFixed(1)} GB / {total.toFixed(0)} GB ({pctUsed}%)
                            </span>
                          </div>

                          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-[#3B82F6] rounded-full transition-all duration-500"
                              style={{ width: `${pctUsed}%` }}
                            />
                          </div>
                        </div>

                        {/* Validity & ICCID info */}
                        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>Valid: {ord.validityDays} Days</span>
                          </span>
                          <span className="font-mono text-[10px]">
                            {ord.orderNumber}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="flex-1 py-2 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#3B82F6]" />
                          <span>View QR Code</span>
                        </button>

                        <button
                          onClick={() => setTopUpOrder(ord)}
                          className="px-3 py-2 text-xs font-bold text-[#FF6B35] bg-[#FFF0EB] hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Top Up</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Complete Order History Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              Order History ({orders.length})
            </h4>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Plan / Data</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-gray-800">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-4">
                        <span className="mr-1.5 text-base">{ord.countryFlag}</span>
                        <span className="font-semibold text-gray-900">{ord.destinationName}</span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {ord.data} ({ord.validityDays}d)
                      </td>
                      <td className="py-3 px-4 text-gray-500 tabular-nums">
                        {new Date(ord.purchaseDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-900 tabular-nums">
                        ${ord.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-[#00B67A] capitalize">
                          {ord.orderStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="text-xs font-semibold text-[#3B82F6] hover:underline cursor-pointer"
                        >
                          View eSIM
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal: View QR Code popup */}
        {selectedOrder && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedOrder.countryFlag}</span>
                  <div className="font-bold text-slate-900 text-sm">{selectedOrder.planName}</div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code image */}
              <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <img
                  src={eSIMService.getQRCode(selectedOrder.lpaActivationCode)}
                  alt="eSIM QR Code"
                  className="w-48 h-48 mx-auto"
                />
                <span className="text-[11px] text-slate-500 mt-2 block">
                  Scan in Settings &gt; Cellular &gt; Add eSIM
                </span>
              </div>

              {/* LPA Code */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-gray-500">
                  <span className="font-semibold">Manual Activation Code:</span>
                  <button
                    onClick={() => handleCopyCode(selectedOrder.lpaActivationCode)}
                    className="text-[#3B82F6] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-[#00B67A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-2 bg-gray-100 rounded-lg font-mono text-[11px] break-all select-all text-gray-700">
                  {selectedOrder.lpaActivationCode}
                </div>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-2.5 text-xs font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal: Top-up Data popup */}
        {topUpOrder && (
          <div className="fixed inset-0 z-60 bg-gray-900/60 flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-gray-200 shadow-2xl space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h4 className="font-bold text-gray-900 text-base font-['Space_Grotesk']">Top-Up Data</h4>
                  <p className="text-xs text-gray-500">{topUpOrder.destinationName} ({topUpOrder.orderNumber})</p>
                </div>
                <button
                  onClick={() => setTopUpOrder(null)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {topUpSuccess ? (
                <div className="p-6 text-center text-emerald-700 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                  <CheckCircle className="w-8 h-8 text-[#00B67A] mx-auto" />
                  <p className="font-bold text-sm">Data Added Successfully!</p>
                  <p className="text-xs text-[#00B67A]">Your profile is updated immediately.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">
                    Add extra high-speed gigabytes to your existing profile without installing a new QR code:
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleConfirmTopUp(topUpOrder.id, 3)}
                      className="p-3 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#3B82F6]/40 rounded-xl transition-all cursor-pointer"
                    >
                      <div className="font-bold text-slate-900 text-sm">+3 GB Data</div>
                      <div className="text-xs text-slate-500">Extend 15 Days</div>
                      <div className="text-[#3B82F6] font-extrabold text-sm mt-2">$8.00</div>
                    </button>

                    <button
                      onClick={() => handleConfirmTopUp(topUpOrder.id, 5)}
                      className="p-3 text-left bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#3B82F6]/40 rounded-xl transition-all cursor-pointer"
                    >
                      <div className="font-bold text-slate-900 text-sm">+5 GB Data</div>
                      <div className="text-xs text-slate-500">Extend 30 Days</div>
                      <div className="text-[#3B82F6] font-extrabold text-sm mt-2">$12.50</div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
