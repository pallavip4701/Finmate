import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
  
} from "recharts";
import {
  
  BarChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
 
} from "recharts";

import {
  Menu,
  Search,
  Plus,
  Gift,
  Bell,
  MessageCircle,
  ChevronDown,
  LayoutDashboard,
  ArrowLeftRight,
  Receipt,
  TrendingUp,
  Wallet,
  PiggyBank,
  Users,
  BellRing,
  RefreshCw,
  Target,
  BarChart3,
  LineChart as LineChartIcon,
  Settings,
  Lock,
  Calendar,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Film,
  X,
  Sparkles,
  Crown,
  ArrowUp,
  ArrowDown,
  ArrowDownToLine,
  ArrowUpFromLine,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronRight,
  Check,
  AlertTriangle,
} from "lucide-react";



/* ---------------------------------- helpers ---------------------------------- */

const fmt = (n) => "₹" + Math.round(Math.abs(n)).toLocaleString("en-IN");

const uid = () => Math.random().toString(36).slice(2, 10);

const todayPlus = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const CATEGORY_META = {
  "Food & Dining": { icon: Utensils, color: "#f43f5e" },
  Rent: { icon: Home, color: "#3b82f6" },
  Transport: { icon: Car, color: "#f59e0b" },
  Shopping: { icon: ShoppingBag, color: "#a855f7" },
  Entertainment: { icon: Film, color: "#ef4444" },
  Income: { icon: ArrowDownToLine, color: "#22c55e" },
  Subscriptions: { icon: RefreshCw, color: "#ec4899" },
  Others: { icon: Wallet, color: "#64748b" },
};

const catColor = (c) => CATEGORY_META[c]?.color || "#64748b";
const catIcon = (c) => CATEGORY_META[c]?.icon || Wallet;

/* ---------------------------------- seed data ---------------------------------- */

const seedTransactions = [
  {
    id: uid(),
    name: "Swiggy",
    category: "Food & Dining",
    date: todayPlus(-1),
    amount: -450,
  },
  {
    id: uid(),
    name: "Salary",
    category: "Income",
    date: todayPlus(-2),
    amount: 50000,
  },
  {
    id: uid(),
    name: "Netflix",
    category: "Subscriptions",
    date: todayPlus(-3),
    amount: -649,
  },
  {
    id: uid(),
    name: "Amazon Shopping",
    category: "Shopping",
    date: todayPlus(-4),
    amount: -1850,
  },
  {
    id: uid(),
    name: "Uber Ride",
    category: "Transport",
    date: todayPlus(-5),
    amount: -320,
  },
];

const seedBudgets = [
  { category: "Food & Dining", spent: 7470, limit: 10000 },
  { category: "Rent", spent: 5338, limit: 8000 },
  { category: "Transport", spent: 3203, limit: 5000 },
  { category: "Shopping", spent: 2135, limit: 4000 },
  { category: "Entertainment", spent: 1708, limit: 3000 },
];

const seedGoals = [
  {
    id: uid(),
    name: "Buy a New Bike",
    current: 72000,
    target: 150000,
    icon: "🏍️",
  },
  { id: uid(), name: "Europe Trip", current: 25000, target: 80000, icon: "✈️" },
  {
    id: uid(),
    name: "Emergency Fund",
    current: 40000,
    target: 100000,
    icon: "🛡️",
  },
];

const seedShared = [
  { id: uid(), name: "You", amount: 12000, status: "paid" },
  { id: uid(), name: "Pooja", amount: 2000, status: "owes" },
  { id: uid(), name: "Adavi", amount: 2000, status: "owes" },
  { id: uid(), name: "Dora", amount: 2000, status: "owes" },
];

const seedBills = [
  {
    id: uid(),
    name: "Room Rent",
    amount: 6000,
    due: todayPlus(2),
    status: "upcoming",
  },
  {
    id: uid(),
    name: "Internet Bill",
    amount: 1200,
    due: todayPlus(5),
    status: "upcoming",
  },
  {
    id: uid(),
    name: "Electricity Bill",
    amount: 2150,
    due: todayPlus(7),
    status: "upcoming",
  },
  {
    id: uid(),
    name: "SIP - Mutual Fund",
    amount: 5000,
    due: todayPlus(1),
    status: "upcoming",
  },
];

const seedSubs = [
  {
    id: uid(),
    name: "Netflix",
    amount: 649,
    renew: "May 25",
    iconBg: "#e50914",
  },
  {
    id: uid(),
    name: "Spotify",
    amount: 119,
    renew: "May 18",
    iconBg: "#1db954",
  },
  {
    id: uid(),
    name: "Amazon Prime",
    amount: 1499,
    renew: "May 28",
    iconBg: "#00a8e1",
  },
  {
    id: uid(),
    name: "YouTube Premium",
    amount: 129,
    renew: "May 30",
    iconBg: "#ff0000",
  },
];

const cashFlowData = [
  { day: "May 18", income: 8000, expenses: 4200, net: 3800 },
  { day: "May 19", income: 5000, expenses: 5100, net: -100 },
  { day: "May 20", income: 9000, expenses: 3400, net: 5600 },
  { day: "May 21", income: 4000, expenses: 6200, net: -2200 },
  { day: "May 22", income: 12000, expenses: 4000, net: 8000 },
  { day: "May 23", income: 6000, expenses: 2900, net: 3100 },
  { day: "May 24", income: 6000, expenses: 3550, net: 2450 },
];

const sparkUp = [
  { v: 4 },
  { v: 6 },
  { v: 5 },
  { v: 8 },
  { v: 7 },
  { v: 10 },
  { v: 9 },
  { v: 12 },
];
const sparkDown = [
  { v: 10 },
  { v: 8 },
  { v: 9 },
  { v: 6 },
  { v: 7 },
  { v: 4 },
  { v: 5 },
  { v: 3 },
];

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { key: "expenses", label: "Expenses", icon: Receipt },
  { key: "income", label: "Income", icon: TrendingUp },
  { key: "budgets", label: "Budgets", icon: Wallet },
  { key: "shared", label: "Shared Expenses", icon: Users },
  { key: "bills", label: "Bills & Reminders", icon: BellRing },
  { key: "subscriptions", label: "Subscriptions", icon: RefreshCw },
  { key: "goals", label: "Goals", icon: Target },
  { key: "analytics", label: "Analytics & Reports", icon: BarChart3 },
  // { key: "investments", label: "Investments", icon: LineChartIcon },
  { key: "settings", label: "Settings & Profile", icon: Settings },
];


const monthlyComparisonData = [
  { month: "Jan", income: 3200, expenses: 1800, savings: 1400 },
  { month: "Feb", income: 3400, expenses: 1900, savings: 1500 },
  { month: "Mar", income: 3600, expenses: 2000, savings: 1600 },
  { month: "Apr", income: 3800, expenses: 2100, savings: 1700 },
  { month: "May", income: 4000, expenses: 1900, savings: 2100 },
  { month: "Jun", income: 3900, expenses: 2000, savings: 1900 },
];

const financialHealthData = [
  { subject: "Savings", value: 82 },
  { subject: "Budget", value: 74 },
  { subject: "Investments", value: 71 },
  { subject: "Credit", value: 90 },
  { subject: "Emergency", value: 80 },
  { subject: "Goals", value: 76 },
];

const savingsGrowthData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 2200 },
  { month: "Mar", value: 3600 },
  { month: "Apr", value: 5200 },
  { month: "May", value: 7200 },
  { month: "Jun", value: 9200 },
];

const heatmapData = [
  [2,3,1,4,5,3,2,1,4,5,3,2],
  [3,4,2,5,4,2,3,4,5,3,2,4],
  [5,4,3,2,5,4,3,2,4,5,4,3],
  [1,2,3,4,2,5,4,3,2,3,5,4],
  [2,4,5,3,2,4,5,4,3,2,4,5],
  [3,5,4,2,3,5,4,2,5,4,2,3],
];

const portfolioAllocation = [
  { name: "Stocks", value: 35 },
  { name: "Mutual Funds", value: 25 },
  { name: "Gold", value: 15 },
  { name: "Crypto", value: 15 },
  { name: "FD", value: 10 },
];

const portfolioColors = [
  "#6366F1",
  "#8B5CF6",
  "#F59E0B",
  "#06B6D4",
  "#22C55E",
];


const investmentGrowthData = [
  { month: "Jan", value: 520000 },
  { month: "Feb", value: 545000 },
  { month: "Mar", value: 570000 },
  { month: "Apr", value: 610000 },
  { month: "May", value: 655000 },
  { month: "Jun", value: 705000 },

];



/* ---------------------------------- small UI atoms ---------------------------------- */

function Card({ children, className = "", title, action, onAction }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[var(--card)] ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between px-1 pb-2">
          <h3
            className="text-[15px] font-semibold"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h3>
          {action && (
            <button
              onClick={onAction}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              {action} <ChevronRight size={14} />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${Math.min(pct, 100)}%`, background: color }}
      />
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/10 bg-[#101a2e] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs font-medium text-slate-400 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500";

/* ---------------------------------- main app ---------------------------------- */

export default function FinMateDashboard() {
  const [theme, setTheme] = useState("dark");
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);

  const [transactions, setTransactions] = useState(seedTransactions);
  const [budgets, setBudgets] = useState(seedBudgets);
  const [goals, setGoals] = useState(seedGoals);
  const [shared, setShared] = useState(seedShared);
  const [bills, setBills] = useState(seedBills);
  const [subs, setSubs] = useState(seedSubs);

  const [modal, setModal] = useState(null); // 'income' | 'expense' | 'goal' | 'reminder' | 'subscription' | 'split'

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  /* ---------- derived totals ---------- */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.amount > 0)
        .reduce((s, t) => s + t.amount, 0),
    [transactions],
  );
  const totalExpenses = useMemo(
    () =>
      Math.abs(
        transactions
          .filter((t) => t.amount < 0)
          .reduce((s, t) => s + t.amount, 0),
      ),
    [transactions],
  );
  const balance = totalIncome - totalExpenses;
  const savings = Math.max(balance, 0);

  const spendingByCategory = useMemo(() => {
    const map = {};
    transactions
      .filter((t) => t.amount < 0 && t.category !== "Subscriptions")
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
      });
    const total = Object.values(map).reduce((a, b) => a + b, 0) || 1;
    return Object.entries(map)
      .map(([name, value]) => ({
        name,
        value,
        pct: Math.round((value / total) * 100),
        color: catColor(name),
      }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  /* ---------- actions ---------- */
  function addTransaction({ name, category, amount, isIncome }) {
    const amt = Math.abs(Number(amount) || 0) * (isIncome ? 1 : -1);
    const tx = { id: uid(), name, category, date: todayPlus(0), amount: amt };
    setTransactions((p) => [tx, ...p]);
    if (!isIncome) {
      setBudgets((p) => {
        const exists = p.find((b) => b.category === category);
        if (exists)
          return p.map((b) =>
            b.category === category
              ? { ...b, spent: b.spent + Math.abs(amt) }
              : b,
          );
        return [
          ...p,
          { category, spent: Math.abs(amt), limit: Math.abs(amt) * 2 || 5000 },
        ];
      });
    }
    notify(`${isIncome ? "Income" : "Expense"} added: ${name}`);
  }

  function addGoal({ name, target, current }) {
    setGoals((p) => [
      ...p,
      {
        id: uid(),
        name,
        target: Number(target) || 0,
        current: Number(current) || 0,
        icon: "🎯",
      },
    ]);
    notify(`Goal "${name}" created`);
  }

  function contributeToGoal(id, amount) {
    setGoals((p) =>
      p.map((g) =>
        g.id === id
          ? { ...g, current: Math.min(g.current + amount, g.target) }
          : g,
      ),
    );
    notify("Contribution added to goal");
  }

  function addBill({ name, amount, due }) {
    setBills((p) => [
      ...p,
      {
        id: uid(),
        name,
        amount: Number(amount) || 0,
        due: due || todayPlus(7),
        status: "upcoming",
      },
    ]);
    notify(`Reminder "${name}" added`);
  }

  function addSub({ name, amount, renew }) {
    setSubs((p) => [
      ...p,
      {
        id: uid(),
        name,
        amount: Number(amount) || 0,
        renew: renew || "Next month",
        iconBg: "#6366f1",
      },
    ]);
    notify(`Subscription "${name}" added`);
  }

  function splitExpense({ name, amount, people }) {
    const share = Math.round((Number(amount) || 0) / (people.length + 1));
    setShared((p) => [
      { id: uid(), name: "You", amount: Number(amount) || 0, status: "paid" },
      ...people.map((n) => ({
        id: uid(),
        name: n,
        amount: share,
        status: "owes",
      })),
      ...p,
    ]);
    addTransaction({ name, category: "Others", amount, isIncome: false });
    notify(`Split "${name}" among ${people.length + 1} people`);
  }

  function payBill(id) {
    setBills((p) => p.map((b) => (b.id === id ? { ...b, status: "paid" } : b)));
    notify("Bill marked as paid");
  }

  function markGoalDone(id) {
    setGoals((p) => p.filter((g) => g.id !== id));
  }

  const filteredTransactions = useMemo(() => {
    if (!search.trim()) return transactions;
    const q = search.toLowerCase();
    return transactions.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
  }, [transactions, search]);

  const isLight = theme === "light";

  return (
    <div
      style={{
        "--bg": isLight ? "#f1f5f9" : "#0a1220",
        "--sidebar": isLight ? "#ffffff" : "#0d1626",
        "--card": isLight ? "#ffffff" : "#101c30",
        "--text": isLight ? "#0f172a" : "#f1f5f9",
        "--subtext": isLight ? "#64748b" : "#94a3b8",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        className="min-h-screen w-full flex"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        {/* ---------------- SIDEBAR ---------------- */}
        <aside
          className={`hidden md:flex flex-col shrink-0 border-r border-white/10 transition-all duration-200 ${collapsed ? "w-[76px]" : "w-[248px]"}`}
          style={{ background: "var(--sidebar)" }}
        >
          <div className="flex items-center gap-2 px-5 h-16 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0">
              <PiggyBank size={18} className="text-white" />
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <div
                  className="font-bold text-[15px]"
                  style={{ color: "var(--text)" }}
                >
                  FinMate
                </div>
                <div
                  className="text-[10px]"
                  style={{ color: "var(--subtext)" }}
                >
                  Smart Finance, Better Future
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = page === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setPage(item.key)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                    active
                      ? "bg-indigo-600 text-white font-medium"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {!collapsed && (
            <div className="px-3 pb-3 space-y-3">
              <div className="rounded-2xl p-4 bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border border-violet-500/20">
                <Crown size={18} className="text-amber-400 mb-1" />
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Upgrade to Pro
                </div>
                <div
                  className="text-[11px] mb-2"
                  style={{ color: "var(--subtext)" }}
                >
                  Unlock premium features and manage your finances like a pro.
                </div>
                <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2">
                  Upgrade Now
                </button>
              </div>

              <div className="rounded-2xl p-4 border border-white/10">
                <div
                  className="text-[11px]"
                  style={{ color: "var(--subtext)" }}
                >
                  Total Balance
                </div>
                <div
                  className="text-lg font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {fmt(balance)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 mb-1">
                  <ArrowUp size={12} /> 12.5% vs last month
                </div>
                <ResponsiveContainer width="100%" height={36}>
                  <AreaChart data={sparkUp}>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="#6366f1"
                      fill="url(#sgrad)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="sgrad" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="100%"
                          stopColor="#6366f1"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <button
                onClick={() => setPage("settings")}
                className="w-full flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  D
                </div>
                <div className="text-left leading-tight">
                  <div
                    className="text-xs font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    Dora
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: "var(--subtext)" }}
                  >
                    dora@email.com
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
                <Lock size={14} className="text-emerald-400 shrink-0" />
                <span
                  className="text-[10px]"
                  style={{ color: "var(--subtext)" }}
                >
                  Your data is encrypted and secure.
                </span>
              </div>
            </div>
          )}
        </aside>

        {/* ---------------- MAIN ---------------- */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* topbar */}
          <header
            className="h-16 shrink-0 flex items-center gap-3 px-4 md:px-6 border-b border-white/10"
            style={{ background: "var(--sidebar)" }}
          >
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="p-2 rounded-lg hover:bg-white/10 shrink-0"
              style={{ color: "var(--text)" }}
            >
              <Menu size={20} />
            </button>

            <div className="relative flex-1 max-w-md hidden sm:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "var(--subtext)" }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search anything..."
                className="w-full rounded-xl bg-white/5 border border-white/10 pl-9 pr-12 py-2 text-sm outline-none focus:border-indigo-500"
                style={{ color: "var(--text)" }}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded border border-white/10"
                style={{ color: "var(--subtext)" }}
              >
                ⌘K
              </span>
            </div>

            <div className="flex-1" />

            <div className="relative hidden lg:block">
              <button
                onClick={() => setQuickOpen((o) => !o)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-xl"
              >
                <Plus size={16} /> Add
              </button>
              {quickOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#101c30] shadow-xl py-1 z-30">
                  {[
                    ["Add Income", () => setModal("income")],
                    ["Add Expense", () => setModal("expense")],
                    ["Add Goal", () => setModal("goal")],
                    ["Add Reminder", () => setModal("reminder")],
                    ["Split Expense", () => setModal("split")],
                  ].map(([label, fn]) => (
                    <button
                      key={label}
                      onClick={() => {
                        fn();
                        setQuickOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setTheme(isLight ? "dark" : "light")}
              className="p-2 rounded-lg hover:bg-white/10"
              style={{ color: "var(--text)" }}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              className="p-2 rounded-lg hover:bg-white/10 hidden sm:block"
              style={{ color: "var(--text)" }}
            >
              <Gift size={18} />
            </button>
            <button
              className="relative p-2 rounded-lg hover:bg-white/10 hidden sm:block"
              style={{ color: "var(--text)" }}
            >
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-[9px] text-white rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button
              className="p-2 rounded-lg hover:bg-white/10 hidden sm:block"
              style={{ color: "var(--text)" }}
            >
              <MessageCircle size={18} />
            </button>

            <div className="relative">
              <button
                onClick={() => setAvatarOpen((o) => !o)}
                className="flex items-center gap-2 pl-1"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  D
                </div>
                <div className="hidden md:block text-left leading-tight">
                  <div
                    className="text-xs font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    Dora
                  </div>
                  <div className="text-[10px] text-amber-400">Premium User</div>
                </div>
                <ChevronDown size={14} style={{ color: "var(--subtext)" }} />
              </button>
              {avatarOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#101c30] shadow-xl py-1 z-30">
                  <button
                    onClick={() => {
                      setPage("settings");
                      setAvatarOpen(false);
                    }}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    <User size={14} /> Profile & Settings
                  </button>
                  <button
                    onClick={() => notify("Signed out (demo)")}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    <LogOut size={14} /> Log out
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* page body */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
            {page === "dashboard" && (
              <DashboardPage
                balance={balance}
                totalIncome={totalIncome}
                totalExpenses={totalExpenses}
                savings={savings}
                spendingByCategory={spendingByCategory}
                budgets={budgets}
                bills={bills}
                transactions={filteredTransactions}
                goals={goals}
                shared={shared}
                subs={subs}
                setModal={setModal}
                setPage={setPage}
                payBill={payBill}
              />
            )}
            {page === "transactions" && (
              <ListPage title="All Transactions" items={filteredTransactions} />
            )}
            {page === "expenses" && (
              <ListPage
                title="Expenses"
                items={filteredTransactions.filter((t) => t.amount < 0)}
              />
            )}
            {page === "income" && (
              <ListPage
                title="Income"
                items={filteredTransactions.filter((t) => t.amount > 0)}
              />
            )}
            {page === "budgets" && <BudgetsPage budgets={budgets} />}
            {page === "shared" && (
              <SharedPage shared={shared} onAdd={() => setModal("split")} />
            )}
            {page === "bills" && (
              <BillsPage
                bills={bills}
                onAdd={() => setModal("reminder")}
                payBill={payBill}
              />
            )}
            {page === "subscriptions" && (
              <SubsPage subs={subs} onAdd={() => setModal("subscription")} />
            )}
            {page === "goals" && (
              <GoalsPage
                goals={goals}
                onAdd={() => setModal("goal")}
                contributeToGoal={contributeToGoal}
                markGoalDone={markGoalDone}
              />
            )}
           {page === "analytics" && (
  <Card className="p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl">

    {/* Header */}

    <div className="flex items-center justify-between mb-8">

      <div>

        <h2
          className="text-3xl font-bold"
          style={{ color: "var(--text)" }}
        >
          Analytics & Reports
        </h2>

        <p
          className="mt-1 text-sm"
          style={{ color: "var(--subtext)" }}
        >
          Deep insights into your financial performance
        </p>

      </div>

    </div>

    {/* ====================== ROW 1 ====================== */}

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

      {/* Monthly Comparison */}

      <div className="xl:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5">

        <div className="flex items-center justify-between mb-5">

          <h3
            className="font-semibold text-lg"
            style={{ color: "var(--text)" }}
          >
            Monthly Comparison
          </h3>

          <span
            className="text-xs px-3 py-1 rounded-full"
            style={{
              background: "rgba(99,102,241,.15)",
              color: "#818cf8",
            }}
          >
            Last 6 Months
          </span>

        </div>

        <ResponsiveContainer width="100%" height={290}>

          <BarChart
            data={monthlyComparisonData}
            barGap={8}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,.08)"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "var(--subtext)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "var(--subtext)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(99,102,241,.08)" }}
              contentStyle={{
                background: "#171b2e",
                border: "1px solid #2d3350",
                borderRadius: 12,
              }}
            />

            <Legend />

            <Bar
              dataKey="income"
              radius={[8, 8, 0, 0]}
              fill="#22c55e"
            />

            <Bar
              dataKey="expenses"
              radius={[8, 8, 0, 0]}
              fill="#ef4444"
            />

            <Bar
              dataKey="savings"
              radius={[8, 8, 0, 0]}
              fill="#6366f1"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Financial Health */}

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-5 flex flex-col">

        <h3
          className="font-semibold text-lg mb-5"
          style={{ color: "var(--text)" }}
        >
          Financial Health
        </h3>

        <div className="flex-1">

          <ResponsiveContainer
            width="100%"
            height={250}
          >

            <RadarChart data={financialHealthData}>

              <PolarGrid stroke="rgba(255,255,255,.08)" />

              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fill: "var(--subtext)",
                  fontSize: 11,
                }}
              />

              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={false}
              />

              <Radar
                dataKey="value"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.45}
              />

            </RadarChart>

          </ResponsiveContainer>

        </div>

        <div className="text-center mt-2">

          <h2
            className="text-3xl font-bold"
            style={{ color: "var(--text)" }}
          >
            78/100
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: "var(--subtext)" }}
          >
            Overall Financial Score
          </p>

        </div>

      </div>

    </div>

   
    
    {/* ====================== ROW 2 ====================== */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

  {/* Savings Growth */}

  <div
    className="rounded-2xl border border-[var(--border)] p-5"
    style={{ background: "var(--panel)" }}
  >

    <div className="flex items-center justify-between mb-5">

      <h3
        className="font-semibold text-lg"
        style={{ color: "var(--text)" }}
      >
        Savings Growth
      </h3>

      <span
        className="text-xs px-3 py-1 rounded-full"
        style={{
          background: "rgba(99,102,241,.15)",
          color: "#818cf8",
        }}
      >
        +18.5%
      </span>

    </div>

    <ResponsiveContainer
      width="100%"
      height={250}
    >

      <AreaChart data={savingsGrowthData}>

        <defs>

          <linearGradient
            id="savingGradient"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >

            <stop
              offset="5%"
              stopColor="#6366f1"
              stopOpacity={0.65}
            />

            <stop
              offset="95%"
              stopColor="#6366f1"
              stopOpacity={0}
            />

          </linearGradient>

        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,.08)"
        />

        <XAxis
          dataKey="month"
          tick={{
            fill: "var(--subtext)",
            fontSize: 12,
          }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{
            fill: "var(--subtext)",
            fontSize: 12,
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            background: "#171b2e",
            borderRadius: 12,
            border: "1px solid #2d3350",
          }}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          strokeWidth={3}
          fill="url(#savingGradient)"
        />

      </AreaChart>

    </ResponsiveContainer>

  </div>

  {/* Expense Heatmap */}

  <div
    className="rounded-2xl border border-[var(--border)] p-5"
    style={{ background: "var(--panel)" }}
  >

    <div className="flex items-center justify-between mb-5">

      <h3
        className="font-semibold text-lg"
        style={{ color: "var(--text)" }}
      >
        Expense Heatmap
      </h3>

      <span
        className="text-xs"
        style={{ color: "var(--subtext)" }}
      >
        Last 12 Weeks
      </span>

    </div>

    <div className="space-y-2">

      {heatmapData.map((row, rowIndex) => (

        <div
          key={rowIndex}
          className="flex gap-2"
        >

          {row.map((value, colIndex) => {

            const colors = [
              "#1e1b4b",
              "#312e81",
              "#4338ca",
              "#6366f1",
              "#818cf8",
            ];

            return (

              <div
                key={colIndex}
                className="flex-1 rounded-md transition-all duration-300 hover:scale-110"
                style={{
                  height: 14,
                  background: colors[value - 1],
                }}
              />

            );

          })}

        </div>

      ))}

    </div>

    <div className="flex items-center gap-3 mt-6 text-xs">

      <span style={{ color: "var(--subtext)" }}>
        Less
      </span>

      <div className="flex gap-2">

        {[
          "#1e1b4b",
          "#312e81",
          "#4338ca",
          "#6366f1",
          "#818cf8",
        ].map((c) => (

          <div
            key={c}
            className="w-4 h-4 rounded"
            style={{ background: c }}
          />

        ))}

      </div>

      <span style={{ color: "var(--subtext)" }}>
        More
      </span>

    </div>

  </div>

</div>


{/* ====================== ROW 3 ====================== */}

<div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-6">

  {[
    {
      title: "Weekly Report",
      value: "₹12,540",
      change: "+8.4%",
      color: "#22c55e",
      icon: "📈",
    },
    {
      title: "Monthly Report",
      value: "₹48,320",
      change: "+14.2%",
      color: "#6366f1",
      icon: "📊",
    },
    {
      title: "Yearly Report",
      value: "₹5.82L",
      change: "+28.6%",
      color: "#f59e0b",
      icon: "💰",
    },
    {
      title: "Net Worth",
      value: "₹12.4L",
      change: "+18.1%",
      color: "#06b6d4",
      icon: "🏆",
    },
  ].map((report) => (
    <div
      key={report.title}
      className="rounded-2xl border border-[var(--border)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{ background: "var(--panel)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-3xl">{report.icon}</span>

        <span
          className="text-xs px-2 py-1 rounded-full font-semibold"
          style={{
            background: `${report.color}20`,
            color: report.color,
          }}
        >
          {report.change}
        </span>
      </div>

      <p
        className="text-sm"
        style={{ color: "var(--subtext)" }}
      >
        {report.title}
      </p>

      <h2
        className="text-3xl font-bold mt-2"
        style={{ color: "var(--text)" }}
      >
        {report.value}
      </h2>
    </div>
  ))}

</div>

{/* ====================== ROW 4 ====================== */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

  {/* Cash Flow */}

  <div
    className="xl:col-span-2 rounded-2xl border border-[var(--border)] p-5"
    style={{ background: "var(--panel)" }}
  >

    <div className="flex justify-between items-center mb-5">

      <h3
        className="font-semibold text-lg"
        style={{ color: "var(--text)" }}
      >
        Cash Flow Trend
      </h3>

      <span
        className="text-xs px-3 py-1 rounded-full"
        style={{
          background: "rgba(34,197,94,.15)",
          color: "#22c55e",
        }}
      >
        Healthy
      </span>

    </div>

    <ResponsiveContainer
      width="100%"
      height={260}
    >

      <LineChart data={monthlyComparisonData}>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,.08)"
        />

        <XAxis
          dataKey="month"
          tick={{
            fill: "var(--subtext)",
          }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{
            fill: "var(--subtext)",
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            background: "#171b2e",
            borderRadius: 12,
            border: "1px solid #2d3350",
          }}
        />

        <Line
          type="monotone"
          dataKey="income"
          stroke="#22c55e"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#ef4444"
          strokeWidth={3}
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  {/* Financial Summary */}

  <div
    className="rounded-2xl border border-[var(--border)] p-5"
    style={{ background: "var(--panel)" }}
  >

    <h3
      className="font-semibold text-lg mb-6"
      style={{ color: "var(--text)" }}
    >
      Financial Summary
    </h3>

    {[
      ["Income", "₹3,24,000", "#22c55e"],
      ["Expenses", "₹1,68,000", "#ef4444"],
      ["Savings", "₹1,56,000", "#6366f1"],
      ["Investments", "₹84,000", "#06b6d4"],
      ["EMI", "₹22,500", "#f59e0b"],
    ].map(([label, value, color]) => (
      <div
        key={label}
        className="flex justify-between items-center py-4 border-b border-[var(--border)] last:border-none"
      >
        <div className="flex items-center gap-3">

          <div
            className="w-3 h-3 rounded-full"
            style={{ background: color }}
          />

          <span
            style={{ color: "var(--subtext)" }}
          >
            {label}
          </span>

        </div>

        <span
          className="font-semibold"
          style={{ color: "var(--text)" }}
        >
          {value}
        </span>
      </div>
    ))}

  </div>

</div>

{/* ====================== REPORTS ====================== */}

<div
  className="rounded-2xl border border-[var(--border)] p-6"
  style={{ background: "var(--panel)" }}
>

  <div className="flex justify-between items-center mb-6">

    <div>

      <h2
        className="text-2xl font-bold"
        style={{ color: "var(--text)" }}
      >
        Reports
      </h2>

      <p
        className="text-sm mt-1"
        style={{ color: "var(--subtext)" }}
      >
        Download financial reports for any period.
      </p>

    </div>

    <div className="flex gap-3">

      <button className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition">

        Export PDF

      </button>

      <button className="px-5 py-2 rounded-xl border border-[var(--border)] hover:bg-white/5 transition">

        Export CSV

      </button>

    </div>

  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {[
      {
        title: "Weekly",
        desc: "Summary of weekly cash flow.",
      },
      {
        title: "Monthly",
        desc: "Income vs expenses with trends.",
      },
      {
        title: "Yearly",
        desc: "Complete financial performance.",
      },
    ].map((report) => (

      <div
        key={report.title}
        className="rounded-xl border border-[var(--border)] p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >

        <h3
          className="font-semibold text-lg mb-2"
          style={{ color: "var(--text)" }}
        >
          {report.title}
        </h3>

        <p
          className="text-sm mb-5"
          style={{ color: "var(--subtext)" }}
        >
          {report.desc}
        </p>

        <button className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white py-2 transition">
          Generate Report
        </button>

      </div>

    ))}

  </div>

</div>

</Card>
)}
 

    

            {page === "settings" && (
              <Card className="p-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
                {" "}
                {/* Header */}{" "}
                <div className="mb-8">
                  {" "}
                  <h2
                    className="text-3xl font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    {" "}
                    Settings & Profile{" "}
                  </h2>{" "}
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--subtext)" }}
                  >
                    {" "}
                    Preferences, security and connected accounts{" "}
                  </p>{" "}
                </div>{" "}
                {/* Profile */}{" "}
                <div className="rounded-xl border border-[var(--border)] p-5 mb-6">
                  {" "}
                  <div className="flex items-center justify-between">
                    {" "}
                    <div className="flex items-center gap-4">
                      {" "}
                      <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
                        {" "}
                        D{" "}
                      </div>{" "}
                      <div>
                        {" "}
                        <h3
                          className="font-semibold text-lg"
                          style={{ color: "var(--text)" }}
                        >
                          {" "}
                          Dora{" "}
                        </h3>{" "}
                        <p
                          className="text-sm"
                          style={{ color: "var(--subtext)" }}
                        >
                          {" "}
                          dora@email.com{" "}
                        </p>{" "}
                        <span className="text-xs text-yellow-400 font-medium">
                          {" "}
                          ★ Premium User{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                    <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white">
                      {" "}
                      Edit{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
                {/* Grid */}{" "}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {" "}
                  {/* Preferences */}{" "}
                  <div className="rounded-xl border border-[var(--border)] p-5">
                    {" "}
                    <h3
                      className="font-semibold mb-5"
                      style={{ color: "var(--text)" }}
                    >
                      {" "}
                      Preferences{" "}
                    </h3>{" "}
                    <div className="space-y-4">
                      {" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Currency{" "}
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>
                          INR (₹)
                        </span>{" "}
                      </div>{" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Language{" "}
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>
                          English
                        </span>{" "}
                      </div>{" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          Theme
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>Dark</span>{" "}
                      </div>{" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Timezone{" "}
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>
                          {" "}
                          Asia/Kolkata{" "}
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Security */}{" "}
                  <div className="rounded-xl border border-[var(--border)] p-5">
                    {" "}
                    <h3
                      className="font-semibold mb-5"
                      style={{ color: "var(--text)" }}
                    >
                      {" "}
                      Security{" "}
                    </h3>{" "}
                    <div className="space-y-4">
                      {" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Password{" "}
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>
                          {" "}
                          Last changed 12 days ago{" "}
                        </span>{" "}
                      </div>{" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Two-Factor Auth{" "}
                        </span>{" "}
                        <span className="text-green-400">Enabled</span>{" "}
                      </div>{" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Login Alerts{" "}
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>On</span>{" "}
                      </div>{" "}
                      <div className="flex justify-between">
                        {" "}
                        <span style={{ color: "var(--subtext)" }}>
                          {" "}
                          Data Backup{" "}
                        </span>{" "}
                        <span style={{ color: "var(--text)" }}>
                          Weekly
                        </span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Notifications */}{" "}
                  <div className="rounded-xl border border-[var(--border)] p-5">
                    {" "}
                    <h3
                      className="font-semibold mb-5"
                      style={{ color: "var(--text)" }}
                    >
                      {" "}
                      Notifications{" "}
                    </h3>{" "}
                    <div className="space-y-4">
                      {" "}
                      {[
                        "Bill reminders",
                        "Budget alerts",
                        "Subscription renewals",
                        "Weekly summary",
                        "Investment updates",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between"
                        >
                          {" "}
                          <span style={{ color: "var(--text)" }}>
                            {item}
                          </span>{" "}
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-5 h-5 accent-indigo-600"
                          />{" "}
                        </div>
                      ))}{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Connected Accounts */}{" "}
                  <div className="rounded-xl border border-[var(--border)] p-5">
                    {" "}
                    <h3
                      className="font-semibold mb-5"
                      style={{ color: "var(--text)" }}
                    >
                      {" "}
                      Connected Accounts{" "}
                    </h3>{" "}
                    <div className="space-y-4">
                      {" "}
                      {["HDFC Bank", "ICICI Bank", "Zerodha", "PhonePe"].map(
                        (bank) => (
                          <div
                            key={bank}
                            className="flex justify-between items-center"
                          >
                            {" "}
                            <span style={{ color: "var(--text)" }}>
                              {bank}
                            </span>{" "}
                            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">
                              {" "}
                              Connected{" "}
                            </span>{" "}
                          </div>
                        ),
                      )}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </Card>
            )}
          </main>
        </div>
      </div>

      {/* ---------------- toast ---------------- */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] bg-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2">
          <Check size={16} /> {toast}
        </div>
      )}

      {/* ---------------- modals ---------------- */}
      <IncomeExpenseModal
        open={modal === "income"}
        isIncome
        onClose={() => setModal(null)}
        onSubmit={addTransaction}
      />
      <IncomeExpenseModal
        open={modal === "expense"}
        isIncome={false}
        onClose={() => setModal(null)}
        onSubmit={addTransaction}
      />
      <GoalModal
        open={modal === "goal"}
        onClose={() => setModal(null)}
        onSubmit={addGoal}
      />
      <ReminderModal
        open={modal === "reminder"}
        onClose={() => setModal(null)}
        onSubmit={addBill}
      />
      <SubModal
        open={modal === "subscription"}
        onClose={() => setModal(null)}
        onSubmit={addSub}
      />
      <SplitModal
        open={modal === "split"}
        onClose={() => setModal(null)}
        onSubmit={splitExpense}
      />
    </div>
  );
}

/* ================================================================== DASHBOARD PAGE ================================================================== */

function DashboardPage({
  balance,
  totalIncome,
  totalExpenses,
  savings,
  spendingByCategory,
  budgets,
  bills,
  transactions,
  goals,
  shared,
  subs,
  setModal,
  setPage,
  payBill,
}) {
  const stats = [
    {
      label: "Total Balance",
      value: balance,
      icon: Wallet,
      iconBg: "#6366f1",
      delta: "+12.5%",
      up: true,
      spark: sparkUp,
      sparkColor: "#6366f1",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: ArrowDownToLine,
      iconBg: "#22c55e",
      delta: "+15.8%",
      up: true,
      spark: sparkUp,
      sparkColor: "#22c55e",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: ArrowUpFromLine,
      iconBg: "#ef4444",
      delta: "-8.6%",
      up: false,
      spark: sparkDown,
      sparkColor: "#ef4444",
    },
    {
      label: "Savings This Month",
      value: savings,
      icon: PiggyBank,
      iconBg: "#0ea5e9",
      delta: "+20.4%",
      up: true,
      spark: sparkUp,
      sparkColor: "#0ea5e9",
    },
  ];

  return (
    <>
      {/* welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1
            className="text-xl md:text-2xl font-bold flex items-center gap-2"
            style={{ color: "var(--text)" }}
          >
            Welcome back, Dora
          </h1>
          <p className="text-sm" style={{ color: "var(--subtext)" }}>
            Here's what's happening with your finances today.
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-sm w-fit"
          style={{ color: "var(--text)" }}
        >
          <Calendar size={15} /> May 18 — May 24, 2024
        </div>
      </div>

      {/* stat cards + quick actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-4 grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-[var(--card)] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: s.iconBg + "30" }}
                >
                  <s.icon size={17} style={{ color: s.iconBg }} />
                </div>
                <span className="text-xs" style={{ color: "var(--subtext)" }}>
                  {s.label}
                </span>
              </div>
              <div
                className="text-xl font-bold mb-1"
                style={{ color: "var(--text)" }}
              >
                {fmt(s.value)}
              </div>
              <div
                className={`text-[11px] flex items-center gap-1 mb-1 ${s.up ? "text-emerald-400" : "text-red-400"}`}
              >
                {s.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}{" "}
                {s.delta} from last month
              </div>
              <ResponsiveContainer width="100%" height={30}>
                <AreaChart data={s.spark}>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={s.sparkColor}
                    fill={s.sparkColor}
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <div
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--text)" }}
          >
            Quick Actions
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              [
                "Add Income",
                ArrowDownToLine,
                "#22c55e",
                () => setModal("income"),
              ],
              [
                "Add Expense",
                ArrowUpFromLine,
                "#ef4444",
                () => setModal("expense"),
              ],
              ["Add Goal", Target, "#a855f7", () => setModal("goal")],
              ["Add Reminder", BellRing, "#f59e0b", () => setModal("reminder")],
              ["Split Expense", Users, "#0ea5e9", () => setModal("split")],
            ].map(([label, Icon, color, fn]) => (
              <button
                key={label}
                onClick={fn}
                className="flex flex-col items-center gap-1 rounded-xl border border-white/10 p-2 hover:bg-white/5"
                title={label}
              >
                <Icon size={16} style={{ color }} />
                <span
                  className="text-[9px] text-center leading-tight"
                  style={{ color: "var(--subtext)" }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div
            className="text-[11px] font-medium mb-2"
            style={{ color: "var(--subtext)" }}
          >
            Shortcuts
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              ["View Analytics", BarChart3, () => setPage("analytics")],
              ["Manage Bills", Receipt, () => setPage("bills")],
              ["Subscriptions", RefreshCw, () => setPage("subscriptions")],
              ["Reports", LineChartIcon, () => setPage("analytics")],
            ].map(([label, Icon, fn]) => (
              <button
                key={label}
                onClick={fn}
                className="flex items-center gap-2 text-xs rounded-lg border border-white/10 px-2 py-1.5 hover:bg-white/5"
                style={{ color: "var(--text)" }}
              >
                <Icon size={13} className="text-indigo-400" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* spending / cashflow / budget / reminders */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 xl:col-span-1">
          <h3
            className="text-[15px] font-semibold mb-2"
            style={{ color: "var(--text)" }}
          >
            Spending Overview
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative w-[130px] h-[130px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingByCategory}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={62}
                    paddingAngle={2}
                  >
                    {spendingByCategory.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v) => fmt(v)}
                    contentStyle={{
                      background: "#101c30",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span
                  className="text-[10px]"
                  style={{ color: "var(--subtext)" }}
                >
                  Total
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--text)" }}
                >
                  {fmt(totalExpenses)}
                </span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 min-w-0">
              {spendingByCategory.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between text-[11px]"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: c.color }}
                    />
                    <span className="truncate" style={{ color: "var(--text)" }}>
                      {c.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span style={{ color: "var(--subtext)" }}>{c.pct}%</span>
                    <span
                      className="font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {fmt(c.value)}
                    </span>
                  </div>
                </div>
              ))}
              {spendingByCategory.length === 0 && (
                <div className="text-xs" style={{ color: "var(--subtext)" }}>
                  No expenses yet.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 xl:col-span-1">
          <h3
            className="text-[15px] font-semibold mb-1"
            style={{ color: "var(--text)" }}
          >
            Cash Flow
          </h3>
          <div className="text-xl font-bold" style={{ color: "var(--text)" }}>
            {fmt(totalIncome - totalExpenses)}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 mb-1">
            <ArrowUp size={11} /> 12.5% from last month
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <ComposedChart data={cashFlowData} margin={{ left: -20, top: 5 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 9, fill: "var(--subtext)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(d) => d.split(" ")[1]}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "var(--subtext)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                formatter={(v) => fmt(v)}
                contentStyle={{
                  background: "#101c30",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="income"
                fill="#22c55e"
                radius={[3, 3, 0, 0]}
                barSize={8}
              />
              <Bar
                dataKey="expenses"
                fill="#ef4444"
                radius={[3, 3, 0, 0]}
                barSize={8}
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#ffffff"
                strokeDasharray="4 3"
                strokeWidth={1.5}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 xl:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Budget Overview
            </h3>
            <button
              onClick={() => setPage("budgets")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3 mt-1">
            {budgets.slice(0, 5).map((b) => {
              const Icon = catIcon(b.category);
              const pct = Math.round((b.spent / b.limit) * 100);
              return (
                <div key={b.category}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <div className="flex items-center gap-1.5">
                      <Icon size={12} style={{ color: catColor(b.category) }} />
                      <span style={{ color: "var(--text)" }}>{b.category}</span>
                    </div>
                    <span style={{ color: "var(--subtext)" }}>
                      {fmt(b.spent)} / {fmt(b.limit)}
                    </span>
                  </div>
                  <ProgressBar pct={pct} color={catColor(b.category)} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4 xl:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Upcoming Reminders
            </h3>
            <button
              onClick={() => setPage("bills")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-2.5 mt-1">
            {bills
              .filter((b) => b.status !== "paid")
              .slice(0, 4)
              .map((b) => (
                <div key={b.id} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
                    <BellRing size={14} className="text-red-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-xs font-medium truncate"
                      style={{ color: "var(--text)" }}
                    >
                      {b.name}
                    </div>
                    <div
                      className="text-[10px]"
                      style={{ color: "var(--subtext)" }}
                    >
                      {b.due}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div
                      className="text-xs font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      - {fmt(b.amount)}
                    </div>
                    <button
                      onClick={() => payBill(b.id)}
                      className="text-[9px] text-indigo-400 hover:underline"
                    >
                      Mark paid
                    </button>
                  </div>
                </div>
              ))}
            {bills.filter((b) => b.status !== "paid").length === 0 && (
              <div className="text-xs" style={{ color: "var(--subtext)" }}>
                All caught up!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* bottom row of cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Recent Transactions
            </h3>
            <button
              onClick={() => setPage("transactions")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3 mt-1">
            {transactions.slice(0, 5).map((t) => {
              const Icon = catIcon(t.category);
              return (
                <div key={t.id} className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: catColor(t.category) + "25" }}
                  >
                    <Icon size={14} style={{ color: catColor(t.category) }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-xs font-medium truncate"
                      style={{ color: "var(--text)" }}
                    >
                      {t.name}
                    </div>
                    <div
                      className="text-[10px]"
                      style={{ color: "var(--subtext)" }}
                    >
                      {t.category} · {t.date}
                    </div>
                  </div>
                  <div
                    className={`text-xs font-semibold shrink-0 ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {t.amount > 0 ? "+" : "-"} {fmt(t.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Financial Goals
            </h3>
            <button
              onClick={() => setPage("goals")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3 mt-1">
            {goals.slice(0, 3).map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              return (
                <div key={g.id} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-base shrink-0">
                    {g.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className="font-medium truncate"
                        style={{ color: "var(--text)" }}
                      >
                        {g.name}
                      </span>
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--subtext)" }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <ProgressBar pct={pct} color="#6366f1" />
                    <div
                      className="text-[10px] mt-0.5"
                      style={{ color: "var(--subtext)" }}
                    >
                      {fmt(g.current)} / {fmt(g.target)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setModal("goal")}
            className="w-full mt-3 flex items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 py-2 text-xs hover:bg-white/5"
            style={{ color: "var(--subtext)" }}
          >
            <Plus size={13} /> Add New Goal
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Shared Expenses
            </h3>
            <button
              onClick={() => setPage("shared")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="text-[10px] mb-2" style={{ color: "var(--subtext)" }}>
            Flatmates
          </div>
          <div className="space-y-3">
            {shared.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{ color: "var(--text)" }}
                >
                  {p.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-xs font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {p.name}
                  </div>
                  <div
                    className={`text-[10px] ${p.status === "paid" ? "" : "text-amber-400"}`}
                    style={
                      p.status === "paid" ? { color: "var(--subtext)" } : {}
                    }
                  >
                    {p.status === "paid"
                      ? `Paid ${fmt(p.amount)}`
                      : `Owes you ${fmt(p.amount)}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setModal("split")}
            className="w-full mt-3 flex items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 py-2 text-xs hover:bg-white/5"
            style={{ color: "var(--subtext)" }}
          >
            <Plus size={13} /> Add Expense
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <h3
            className="text-[15px] font-semibold mb-2"
            style={{ color: "var(--text)" }}
          >
            Bills & Reminders
          </h3>
          <div
            className="flex items-center gap-3 text-[10px] mb-2"
            style={{ color: "var(--subtext)" }}
          >
            <span className="text-emerald-400 font-medium">Upcoming</span>{" "}
            <span>Paid</span> <span>Overdue</span>
          </div>
          <div className="space-y-2.5">
            {bills.slice(0, 4).map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-medium" style={{ color: "var(--text)" }}>
                    {b.name}
                  </div>
                  <div
                    className="text-[10px]"
                    style={{
                      color: b.status === "paid" ? "#22c55e" : "var(--subtext)",
                    }}
                  >
                    {b.status === "paid" ? "Paid" : `Due ${b.due}`}
                  </div>
                </div>
                <span
                  className="font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {fmt(b.amount)}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setModal("reminder")}
            className="w-full mt-3 flex items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 py-2 text-xs hover:bg-white/5"
            style={{ color: "var(--subtext)" }}
          >
            <Plus size={13} /> Add Reminder
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Subscriptions
            </h3>
            <button
              onClick={() => setPage("subscriptions")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {subs.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: s.iconBg + "30" }}
                >
                  <RefreshCw size={13} style={{ color: s.iconBg }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-xs font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {s.name}
                  </div>
                  <div
                    className="text-[10px]"
                    style={{ color: "var(--subtext)" }}
                  >
                    Renews on {s.renew}
                  </div>
                </div>
                <div
                  className="text-xs font-semibold shrink-0"
                  style={{ color: "var(--text)" }}
                >
                  {fmt(s.amount)}
                  <span
                    className="text-[9px]"
                    style={{ color: "var(--subtext)" }}
                  >
                    /mo
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setModal("subscription")}
            className="w-full mt-3 flex items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 py-2 text-xs hover:bg-white/5"
            style={{ color: "var(--subtext)" }}
          >
            <Plus size={13} /> Add Subscription
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
          <div className="flex items-center justify-between mb-2">
            <h3
              className="text-[15px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              Goals
            </h3>
            <button
              onClick={() => setPage("goals")}
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {goals.slice(0, 3).map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              return (
                <div key={g.id}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span
                      className="flex items-center gap-1.5 font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      <span>{g.icon}</span>
                      {g.name}
                    </span>
                    <span style={{ color: "var(--subtext)" }}>{pct}%</span>
                  </div>
                  <ProgressBar pct={pct} color="#6366f1" />
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setModal("goal")}
            className="w-full mt-3 flex items-center justify-center gap-1 rounded-lg border border-dashed border-white/15 py-2 text-xs hover:bg-white/5"
            style={{ color: "var(--subtext)" }}
          >
            <Plus size={13} /> Add Goal
          </button>
        </div>
      </div>
    </>
  );
}

/* ================================================================== SUB PAGES ================================================================== */

function ListPage({ title, items }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
      <h3
        className="text-[15px] font-semibold mb-2"
        style={{ color: "var(--text)" }}
      >
        {title}
      </h3>
      <div className="space-y-1 mt-2">
        {items.length === 0 && (
          <div
            className="text-sm py-6 text-center"
            style={{ color: "var(--subtext)" }}
          >
            Nothing here yet.
          </div>
        )}
        {items.map((t) => {
          const Icon = catIcon(t.category);
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: catColor(t.category) + "25" }}
              >
                <Icon size={16} style={{ color: catColor(t.category) }} />
              </div>
              <div className="min-w-0 flex-1">
                <div
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--text)" }}
                >
                  {t.name}
                </div>
                <div className="text-xs" style={{ color: "var(--subtext)" }}>
                  {t.category} · {t.date}
                </div>
              </div>
              <div
                className={`text-sm font-semibold shrink-0 ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}
              >
                {t.amount > 0 ? "+" : "-"} {fmt(t.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BudgetsPage({ budgets }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
      <h3
        className="text-[15px] font-semibold mb-2"
        style={{ color: "var(--text)" }}
      >
        Budgets
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {budgets.map((b) => {
          const Icon = catIcon(b.category);
          const pct = Math.round((b.spent / b.limit) * 100);
          const over = pct > 100;
          return (
            <div
              key={b.category}
              className="rounded-xl border border-white/10 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon size={16} style={{ color: catColor(b.category) }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {b.category}
                  </span>
                </div>
                {over && (
                  <span className="text-[10px] text-red-400 flex items-center gap-1">
                    <AlertTriangle size={11} /> Over budget
                  </span>
                )}
              </div>
              <ProgressBar pct={pct} color={catColor(b.category)} />
              <div
                className="flex justify-between text-xs mt-1.5"
                style={{ color: "var(--subtext)" }}
              >
                <span>{fmt(b.spent)} spent</span>
                <span>{fmt(b.limit)} limit</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SharedPage({ shared, onAdd }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-[15px] font-semibold"
          style={{ color: "var(--text)" }}
        >
          Shared Expenses — Flatmates
        </h3>
        <button
          onClick={onAdd}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
        >
          Add Expense <ChevronRight size={14} />
        </button>
      </div>
      <div className="space-y-2 mt-2">
        {shared.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
          >
            <div
              className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center text-xs font-bold shrink-0"
              style={{ color: "var(--text)" }}
            >
              {p.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                {p.name}
              </div>
              <div
                className={`text-xs ${p.status === "paid" ? "" : "text-amber-400"}`}
                style={p.status === "paid" ? { color: "var(--subtext)" } : {}}
              >
                {p.status === "paid" ? "Settled up" : "Owes you"}
              </div>
            </div>
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--text)" }}
            >
              {fmt(p.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BillsPage({ bills, onAdd, payBill }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-[15px] font-semibold"
          style={{ color: "var(--text)" }}
        >
          Bills & Reminders
        </h3>
        <button
          onClick={onAdd}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
        >
          Add Reminder <ChevronRight size={14} />
        </button>
      </div>
      <div className="space-y-2 mt-2">
        {bills.map((b) => (
          <div
            key={b.id}
            className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
          >
            <div className="w-9 h-9 rounded-lg bg-red-500/15 flex items-center justify-center shrink-0">
              <BellRing size={16} className="text-red-400" />
            </div>
            <div className="flex-1">
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                {b.name}
              </div>
              <div
                className="text-xs"
                style={{
                  color: b.status === "paid" ? "#22c55e" : "var(--subtext)",
                }}
              >
                {b.status === "paid" ? "Paid" : `Due ${b.due}`}
              </div>
            </div>
            <div className="text-right">
              <div
                className="text-sm font-semibold"
                style={{ color: "var(--text)" }}
              >
                {fmt(b.amount)}
              </div>
              {b.status !== "paid" && (
                <button
                  onClick={() => payBill(b.id)}
                  className="text-[10px] text-indigo-400 hover:underline"
                >
                  Mark paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubsPage({ subs, onAdd }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-[15px] font-semibold"
          style={{ color: "var(--text)" }}
        >
          Subscriptions
        </h3>
        <button
          onClick={onAdd}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
        >
          Add Subscription <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
        {subs.map((s) => (
          <div
            key={s.id}
            className="flex items-center gap-3 rounded-xl border border-white/10 p-3"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: s.iconBg + "30" }}
            >
              <RefreshCw size={16} style={{ color: s.iconBg }} />
            </div>
            <div className="flex-1">
              <div
                className="text-sm font-medium"
                style={{ color: "var(--text)" }}
              >
                {s.name}
              </div>
              <div className="text-xs" style={{ color: "var(--subtext)" }}>
                Renews on {s.renew}
              </div>
            </div>
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--text)" }}
            >
              {fmt(s.amount)}
              <span className="text-[10px]" style={{ color: "var(--subtext)" }}>
                /mo
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalsPage({ goals, onAdd, contributeToGoal, markGoalDone }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--card)] p-4">
      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-[15px] font-semibold"
          style={{ color: "var(--text)" }}
        >
          Financial Goals
        </h3>
        <button
          onClick={onAdd}
          className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
        >
          Add Goal <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {goals.map((g) => {
          const pct = Math.round((g.current / g.target) * 100);
          const done = pct >= 100;
          return (
            <div key={g.id} className="rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{g.icon}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {g.name}
                  </span>
                </div>
                {done && <Check size={16} className="text-emerald-400" />}
              </div>
              <ProgressBar pct={pct} color={done ? "#22c55e" : "#6366f1"} />
              <div
                className="flex justify-between text-xs mt-1.5 mb-3"
                style={{ color: "var(--subtext)" }}
              >
                <span>{fmt(g.current)} saved</span>
                <span>{fmt(g.target)} goal</span>
              </div>
              {!done ? (
                <button
                  onClick={() => contributeToGoal(g.id, 5000)}
                  className="text-xs rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 font-medium"
                >
                  + Add ₹5,000
                </button>
              ) : (
                <button
                  onClick={() => markGoalDone(g.id)}
                  className="text-xs rounded-lg border border-white/15 px-3 py-1.5 font-medium"
                  style={{ color: "var(--text)" }}
                >
                  Archive goal
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================== MODALS ================================================================== */

function IncomeExpenseModal({ open, isIncome, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(
    isIncome ? "Income" : "Food & Dining",
  );
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (open) {
      setName("");
      setAmount("");
      setCategory(isIncome ? "Income" : "Food & Dining");
    }
  }, [open, isIncome]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;
    onSubmit({ name, category, amount, isIncome });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isIncome ? "Add Income" : "Add Expense"}
    >
      <form onSubmit={submit}>
        <Field label="Name">
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={
              isIncome ? "e.g. Freelance Payment" : "e.g. Grocery Store"
            }
            autoFocus
          />
        </Field>
        {!isIncome && (
          <Field label="Category">
            <select
              className={inputCls}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {[
                "Food & Dining",
                "Rent",
                "Transport",
                "Shopping",
                "Entertainment",
                "Others",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
        )}
        <Field label="Amount (₹)">
          <input
            className={inputCls}
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </Field>
        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5"
        >
          {isIncome ? "Add Income" : "Add Expense"}
        </button>
      </form>
    </Modal>
  );
}

function GoalModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  useEffect(() => {
    if (open) {
      setName("");
      setTarget("");
      setCurrent("");
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !target) return;
    onSubmit({ name, target, current });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Goal">
      <form onSubmit={submit}>
        <Field label="Goal Name">
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. New Laptop"
            autoFocus
          />
        </Field>
        <Field label="Target Amount (₹)">
          <input
            className={inputCls}
            type="number"
            min="0"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="0"
          />
        </Field>
        <Field label="Already Saved (₹)">
          <input
            className={inputCls}
            type="number"
            min="0"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="0"
          />
        </Field>
        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5"
        >
          Create Goal
        </button>
      </form>
    </Modal>
  );
}

function ReminderModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [due, setDue] = useState("");
  useEffect(() => {
    if (open) {
      setName("");
      setAmount("");
      setDue("");
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;
    onSubmit({ name, amount, due });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Reminder">
      <form onSubmit={submit}>
        <Field label="Bill Name">
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Water Bill"
            autoFocus
          />
        </Field>
        <Field label="Amount (₹)">
          <input
            className={inputCls}
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </Field>
        <Field label="Due Date">
          <input
            className={inputCls}
            type="text"
            value={due}
            onChange={(e) => setDue(e.target.value)}
            placeholder="e.g. May 30, 2024"
          />
        </Field>
        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5"
        >
          Add Reminder
        </button>
      </form>
    </Modal>
  );
}

function SubModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [renew, setRenew] = useState("");
  useEffect(() => {
    if (open) {
      setName("");
      setAmount("");
      setRenew("");
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;
    onSubmit({ name, amount, renew });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Subscription">
      <form onSubmit={submit}>
        <Field label="Service Name">
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Disney+ Hotstar"
            autoFocus
          />
        </Field>
        <Field label="Monthly Amount (₹)">
          <input
            className={inputCls}
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </Field>
        <Field label="Renews On">
          <input
            className={inputCls}
            type="text"
            value={renew}
            onChange={(e) => setRenew(e.target.value)}
            placeholder="e.g. June 5"
          />
        </Field>
        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5"
        >
          Add Subscription
        </button>
      </form>
    </Modal>
  );
}

function SplitModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [peopleStr, setPeopleStr] = useState("");
  useEffect(() => {
    if (open) {
      setName("");
      setAmount("");
      setPeopleStr("");
    }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return;
    const people = peopleStr
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({ name, amount, people: people.length ? people : ["Roommate"] });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Split Expense">
      <form onSubmit={submit}>
        <Field label="Expense Name">
          <input
            className={inputCls}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Dinner Out"
            autoFocus
          />
        </Field>
        <Field label="Total Amount (₹)">
          <input
            className={inputCls}
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
        </Field>
        <Field label="Split With (comma separated)">
          <input
            className={inputCls}
            value={peopleStr}
            onChange={(e) => setPeopleStr(e.target.value)}
            placeholder="e.g. Pooja, Adavi"
          />
        </Field>
        <button
          type="submit"
          className="w-full mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2.5"
        >
          Split Expense
        </button>
      </form>
    </Modal>
  );
}
