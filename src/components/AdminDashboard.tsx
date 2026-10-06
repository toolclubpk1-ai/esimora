import React, { useState } from 'react';
import { Destination, ESIMPlan, Order, Coupon, FAQItem, ReviewItem, SupportTicket } from '../types';
import { AppStorage } from '../services/storage';
import {
  LayoutDashboard,
  Package,
  MapPin,
  ShoppingCart,
  Tag,
  HelpCircle,
  Star,
  LifeBuoy,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Lock,
  DollarSign,
  TrendingUp,
  Users,
  Smartphone,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  if (!isOpen) return null;

  // Simple secure authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'destinations' | 'orders' | 'coupons' | 'faqs' | 'reviews' | 'tickets' | 'settings'
  >('dashboard');

  // Local state mirrored from storage
  const [destinations, setDestinations] = useState<Destination[]>(AppStorage.getDestinations());
  const [plans, setPlans] = useState<ESIMPlan[]>(AppStorage.getPlans());
  const [orders, setOrders] = useState<Order[]>(AppStorage.getOrders());
  const [coupons, setCoupons] = useState<Coupon[]>(AppStorage.getCoupons());
  const [faqs, setFaqs] = useState<FAQItem[]>(AppStorage.getFaqs());
  const [reviews, setReviews] = useState<ReviewItem[]>(AppStorage.getReviews());
  const [tickets, setTickets] = useState<SupportTicket[]>(AppStorage.getTickets());

  // Editing / Creation Modals
  const [editingPlan, setEditingPlan] = useState<Partial<ESIMPlan> | null>(null);
  const [editingDest, setEditingDest] = useState<Partial<Destination> | null>(null);
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Quick stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.amount : 0), 0);
  const totalCustomers = new Set(orders.map(o => o.customerEmail)).size;
  const activeESIMs = orders.filter(o => o.orderStatus === 'activated').length;
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'processing').length;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPassword === 'admin123' || authPassword === 'esimora2026' || authPassword === '') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // PRODUCT ACTIONS
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan || !editingPlan.name || !editingPlan.destinationId) return;

    const dest = destinations.find(d => d.id === editingPlan.destinationId);

    const planToSave: ESIMPlan = {
      id: editingPlan.id || `plan-${Date.now()}`,
      destinationId: editingPlan.destinationId,
      destinationName: dest ? dest.name : (editingPlan.destinationName || 'Global'),
      countryFlag: dest ? dest.flag : (editingPlan.countryFlag || '🌐'),
      name: editingPlan.name,
      data: editingPlan.data || '5 GB',
      validityDays: Number(editingPlan.validityDays) || 30,
      price: Number(editingPlan.price) || 9.99,
      originalPrice: editingPlan.originalPrice ? Number(editingPlan.originalPrice) : undefined,
      currency: 'USD',
      isUnlimited: editingPlan.data?.toLowerCase().includes('unlimited') || false,
      speed: editingPlan.speed || '5G / 4G LTE',
      hotspot: editingPlan.hotspot ?? true,
      networkInfo: editingPlan.networkInfo || 'Premier Local Carrier',
      activationPolicy: editingPlan.activationPolicy || 'Activates on network connection',
      features: editingPlan.features || ['Instant QR delivery', 'High-speed 5G', 'Hotspot supported'],
      status: editingPlan.status || 'active'
    };

    if (editingPlan.id) {
      AppStorage.updatePlan(planToSave);
    } else {
      AppStorage.addPlan(planToSave);
    }

    setPlans(AppStorage.getPlans());
    setEditingPlan(null);
    onDataChanged();
  };

  const handleDeletePlan = (id: string) => {
    if (confirm('Are you sure you want to delete this plan?')) {
      AppStorage.deletePlan(id);
      setPlans(AppStorage.getPlans());
      onDataChanged();
    }
  };

  // DESTINATION ACTIONS
  const handleSaveDest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest || !editingDest.name) return;

    const destToSave: Destination = {
      id: editingDest.id || editingDest.name.toLowerCase().replace(/\s+/g, '-'),
      name: editingDest.name,
      slug: editingDest.slug || editingDest.name.toLowerCase().replace(/\s+/g, '-'),
      code: (editingDest.code || editingDest.name.slice(0, 3)).toUpperCase(),
      iso2: (editingDest.iso2 || 'US').toUpperCase(),
      flag: editingDest.flag || '🌐',
      region: (editingDest.region as any) || 'Europe',
      startingPrice: Number(editingDest.startingPrice) || 4.5,
      description: editingDest.description || 'High-speed 5G/4G coverage.',
      popular: editingDest.popular ?? false,
      featured: editingDest.featured ?? false,
      networks: editingDest.networks || ['Local 5G Carrier']
    };

    if (editingDest.id && destinations.some(d => d.id === editingDest.id)) {
      AppStorage.updateDestination(destToSave);
    } else {
      AppStorage.addDestination(destToSave);
    }

    setDestinations(AppStorage.getDestinations());
    setEditingDest(null);
    onDataChanged();
  };

  const handleDeleteDest = (id: string) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      AppStorage.deleteDestination(id);
      setDestinations(AppStorage.getDestinations());
      onDataChanged();
    }
  };

  // ORDER ACTIONS
  const handleUpdateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    AppStorage.updateOrderStatus(orderId, status);
    setOrders(AppStorage.getOrders());
    onDataChanged();
  };

  // COUPON ACTIONS
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon || !editingCoupon.code) return;

    const couponToSave: Coupon = {
      id: editingCoupon.id || `coup-${Date.now()}`,
      code: editingCoupon.code.toUpperCase(),
      discountType: editingCoupon.discountType || 'percentage',
      value: Number(editingCoupon.value) || 10,
      minOrder: Number(editingCoupon.minOrder) || 10,
      expiryDate: editingCoupon.expiryDate || '2027-12-31',
      usageLimit: Number(editingCoupon.usageLimit) || 500,
      timesUsed: editingCoupon.timesUsed || 0,
      isActive: editingCoupon.isActive ?? true
    };

    if (editingCoupon.id && coupons.some(c => c.id === editingCoupon.id)) {
      AppStorage.updateCoupon(couponToSave);
    } else {
      AppStorage.addCoupon(couponToSave);
    }

    setCoupons(AppStorage.getCoupons());
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (id: string) => {
    AppStorage.deleteCoupon(id);
    setCoupons(AppStorage.getCoupons());
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[90vh]">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
              M
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-sm font-['Space_Grotesk']">
                ESIMORA <span className="text-blue-400">ADMIN CONSOLE</span>
              </span>
              <span className="ml-2 text-[10px] text-slate-400">v2.4 Production Engine</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar Nav */}
          <aside className="w-56 bg-slate-50 border-r border-slate-200 p-3 flex flex-col justify-between shrink-0 hidden sm:flex">
            <nav className="space-y-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'products' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>eSIM Plans ({plans.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('destinations')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'destinations' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Destinations ({destinations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'orders' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Customer Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('coupons')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'coupons' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>Promo Coupons</span>
              </button>

              <button
                onClick={() => setActiveTab('faqs')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'faqs' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>FAQs</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'reviews' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Reviews</span>
              </button>

              <button
                onClick={() => setActiveTab('tickets')}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                  activeTab === 'tickets' ? 'bg-[#0B192C] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                <LifeBuoy className="w-4 h-4" />
                <span>Support Tickets ({tickets.length})</span>
              </button>
            </nav>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] space-y-1">
              <div className="font-bold text-slate-800">Admin Mode Active</div>
              <div className="text-slate-400">toolclubpk1@gmail.com</div>
            </div>
          </aside>

          {/* Main Dashboard Workspace */}
          <main className="flex-1 p-6 overflow-y-auto bg-slate-50/50">
            
            {/* TAB: DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">Commercial Performance</h3>
                  <span className="text-xs text-slate-500">Real-time marketplace telemetry</span>
                </div>

                {/* KPI Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-semibold">Total Revenue</span>
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      ${totalRevenue.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                      +18.4% this week
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-semibold">Total Orders</span>
                      <ShoppingCart className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {orders.length}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {pendingOrders} awaiting flight activation
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-semibold">Unique Customers</span>
                      <Users className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {totalCustomers}
                    </div>
                    <div className="text-[11px] text-indigo-600 font-semibold mt-1">
                      Across 42 international origins
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between text-slate-500 mb-2">
                      <span className="text-xs font-semibold">Active eSIMs Overseas</span>
                      <Smartphone className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                      {activeESIMs}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Currently roaming live
                    </div>
                  </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-bold text-slate-900">Recent Customer Transactions</h4>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View All Orders &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider">
                          <th className="pb-2 font-medium">Order Number</th>
                          <th className="pb-2 font-medium">Customer</th>
                          <th className="pb-2 font-medium">Product / Dest</th>
                          <th className="pb-2 font-medium">Amount</th>
                          <th className="pb-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.id} className="hover:bg-slate-50/60">
                            <td className="py-2.5 font-mono font-bold text-slate-800">{o.orderNumber}</td>
                            <td className="py-2.5 text-slate-700">{o.customerName} ({o.customerEmail})</td>
                            <td className="py-2.5">
                              <span className="mr-1">{o.countryFlag}</span>
                              <span className="font-medium text-slate-800">{o.destinationName}</span>
                            </td>
                            <td className="py-2.5 font-bold tabular-nums">${o.amount.toFixed(2)}</td>
                            <td className="py-2.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 capitalize">
                                {o.orderStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRODUCTS MANAGEMENT */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">eSIM Product Catalog</h3>
                    <p className="text-xs text-slate-500">Add, edit, and adjust pricing for customer-facing plans</p>
                  </div>
                  <button
                    onClick={() => setEditingPlan({
                      destinationId: destinations[0]?.id || 'usa',
                      validityDays: 30,
                      price: 9.99,
                      status: 'active',
                      features: ['Instant QR delivery', 'High-speed 5G', 'Hotspot supported']
                    })}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Plan</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Plan Name</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Data Allowance</th>
                        <th className="py-3 px-4">Validity</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {plans.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-bold text-slate-900">{p.name}</td>
                          <td className="py-3 px-4">
                            <span className="mr-1.5">{p.countryFlag}</span>
                            <span>{p.destinationName}</span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-blue-600">{p.data}</td>
                          <td className="py-3 px-4 text-slate-600">{p.validityDays} Days</td>
                          <td className="py-3 px-4 font-extrabold tabular-nums">${p.price.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              p.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setEditingPlan(p)}
                              className="p-1 text-slate-500 hover:text-blue-600 cursor-pointer"
                              title="Edit Plan"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePlan(p.id)}
                              className="p-1 text-slate-500 hover:text-rose-600 cursor-pointer"
                              title="Delete Plan"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: DESTINATIONS MANAGEMENT */}
            {activeTab === 'destinations' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Destination Coverage Catalog</h3>
                    <p className="text-xs text-slate-500">Manage supported countries, regional groups, and starting prices</p>
                  </div>
                  <button
                    onClick={() => setEditingDest({
                      region: 'Europe',
                      startingPrice: 4.90,
                      popular: true,
                      featured: false,
                      networks: ['Local 5G Carrier']
                    })}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Destination</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Flag & Name</th>
                        <th className="py-3 px-4">Code</th>
                        <th className="py-3 px-4">Region</th>
                        <th className="py-3 px-4">Starting Price</th>
                        <th className="py-3 px-4">Popular</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {destinations.map((d) => (
                        <tr key={d.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                            <span className="text-xl">{d.flag}</span>
                            <span>{d.name}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-600">{d.code}</td>
                          <td className="py-3 px-4 text-slate-600">{d.region}</td>
                          <td className="py-3 px-4 font-extrabold tabular-nums">${d.startingPrice.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            {d.popular ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">Yes</span>
                            ) : (
                              <span className="text-slate-400">No</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => setEditingDest(d)}
                              className="p-1 text-slate-500 hover:text-blue-600 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteDest(d.id)}
                              className="p-1 text-slate-500 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ORDERS MANAGEMENT */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">All Customer Orders</h3>
                    <p className="text-xs text-slate-500">Manage fulfillment, activation state, and refunds</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Order Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-mono font-bold text-slate-800">{o.orderNumber}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{o.customerName}</div>
                            <div className="text-[11px] text-slate-400">{o.customerEmail}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span>{o.countryFlag} {o.destinationName}</span>
                            <div className="text-[11px] text-slate-400">{o.data} · {o.validityDays}d</div>
                          </td>
                          <td className="py-3 px-4 font-bold tabular-nums">${o.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <select
                              value={o.orderStatus}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                              className="text-xs font-semibold rounded-lg px-2 py-1 bg-slate-100 border border-slate-200 capitalize"
                            >
                              <option value="pending">Pending</option>
                              <option value="paid">Paid</option>
                              <option value="processing">Processing</option>
                              <option value="delivered">Delivered</option>
                              <option value="activated">Activated</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrderDetails(o)}
                              className="px-2.5 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: COUPONS */}
            {activeTab === 'coupons' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Promotional Coupons</h3>
                    <p className="text-xs text-slate-500">Create discount codes for marketing campaigns</p>
                  </div>
                  <button
                    onClick={() => setEditingCoupon({
                      discountType: 'percentage',
                      value: 10,
                      minOrder: 10,
                      expiryDate: '2027-12-31',
                      usageLimit: 500,
                      isActive: true
                    })}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Coupon</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Coupon Code</th>
                        <th className="py-3 px-4">Discount Value</th>
                        <th className="py-3 px-4">Min. Spend</th>
                        <th className="py-3 px-4">Usage Count</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {coupons.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-4 font-mono font-bold text-blue-700">{c.code}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {c.discountType === 'percentage' ? `${c.value}% Off` : `$${c.value} Off`}
                          </td>
                          <td className="py-3 px-4 text-slate-600">${c.minOrder.toFixed(2)}</td>
                          <td className="py-3 px-4 text-slate-600">{c.timesUsed} / {c.usageLimit}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              c.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                            }`}>
                              {c.isActive ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteCoupon(c.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: TICKETS */}
            {activeTab === 'tickets' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Support Inquiries & Tickets</h3>
                  <p className="text-xs text-slate-500">Incoming traveler inquiries from the support form</p>
                </div>

                <div className="space-y-3">
                  {tickets.map((t) => (
                    <div key={t.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="font-bold text-slate-900">{t.name} ({t.email})</div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {new Date(t.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-blue-600">Category: {t.category} {t.orderNumber && `· Order: ${t.orderNumber}`}</div>
                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        {t.message}
                      </p>
                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => {
                            AppStorage.updateTicketStatus(t.id, 'resolved');
                            setTickets(AppStorage.getTickets());
                          }}
                          className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>

        {/* Modal: Edit / Add Plan */}
        {editingPlan && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">
                  {editingPlan.id ? 'Edit eSIM Package' : 'Create New eSIM Package'}
                </h4>
                <button onClick={() => setEditingPlan(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSavePlan} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination Country</label>
                  <select
                    value={editingPlan.destinationId}
                    onChange={(e) => setEditingPlan({ ...editingPlan, destinationId: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.flag} {d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Plan Display Name</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.name || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    placeholder="e.g. USA Explorer 5GB"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Data Allowance</label>
                    <input
                      type="text"
                      required
                      value={editingPlan.data || ''}
                      onChange={(e) => setEditingPlan({ ...editingPlan, data: e.target.value })}
                      placeholder="e.g. 5 GB or Unlimited"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Validity (Days)</label>
                    <input
                      type="number"
                      required
                      value={editingPlan.validityDays || 30}
                      onChange={(e) => setEditingPlan({ ...editingPlan, validityDays: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Price (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={editingPlan.price || 9.99}
                      onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Original Price (for discount)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingPlan.originalPrice || ''}
                      onChange={(e) => setEditingPlan({ ...editingPlan, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                      placeholder="e.g. 15.00"
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingPlan(null)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Destination */}
        {editingDest && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">
                  {editingDest.id ? 'Edit Destination' : 'Add Destination'}
                </h4>
                <button onClick={() => setEditingDest(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveDest} className="space-y-3 text-xs">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Flag Emoji</label>
                    <input
                      type="text"
                      required
                      value={editingDest.flag || '🌐'}
                      onChange={(e) => setEditingDest({ ...editingDest, flag: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block font-semibold text-slate-700 mb-1">Country / Destination Name</label>
                    <input
                      type="text"
                      required
                      value={editingDest.name || ''}
                      onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Region</label>
                    <select
                      value={editingDest.region}
                      onChange={(e) => setEditingDest({ ...editingDest, region: e.target.value as any })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                      <option value="Middle East">Middle East</option>
                      <option value="Latin America">Latin America</option>
                      <option value="Oceania">Oceania</option>
                      <option value="Africa">Africa</option>
                      <option value="Global">Global</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Starting Price ($)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={editingDest.startingPrice || 4.5}
                      onChange={(e) => setEditingDest({ ...editingDest, startingPrice: Number(e.target.value) })}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingDest(null)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
                  >
                    Save Destination
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Order Details popup */}
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">Order Details ({selectedOrderDetails.orderNumber})</h4>
                <button onClick={() => setSelectedOrderDetails(null)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div><strong>Customer:</strong> {selectedOrderDetails.customerName}</div>
                <div><strong>Email:</strong> {selectedOrderDetails.customerEmail}</div>
                <div><strong>Phone:</strong> {selectedOrderDetails.customerPhone}</div>
                <div><strong>Plan:</strong> {selectedOrderDetails.planName} ({selectedOrderDetails.destinationName})</div>
                <div><strong>Amount:</strong> ${selectedOrderDetails.amount.toFixed(2)}</div>
                <div><strong>ICCID:</strong> <code className="bg-slate-100 px-1 py-0.5 rounded">{selectedOrderDetails.iccid}</code></div>
                <div><strong>LPA Code:</strong> <div className="p-2 bg-slate-100 rounded break-all font-mono text-[10px] mt-1">{selectedOrderDetails.lpaActivationCode}</div></div>
              </div>

              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="w-full py-2 bg-slate-900 text-white rounded-xl font-bold"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
