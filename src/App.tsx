import { useState, type ReactNode } from "react";

type View = "landing" | "merchant" | "creator" | "discover" | "campaign-detail";
type IconName =
  | "arrow"
  | "campaign"
  | "check"
  | "chevron"
  | "close"
  | "download"
  | "eye"
  | "grid"
  | "link"
  | "menu"
  | "money"
  | "play"
  | "plus"
  | "spark"
  | "upload"
  | "wallet";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M19 12H5m6-6-6 6 6 6" />,
    campaign: <><path d="m3 11 18-5v12L3 14z" /><path d="M11.6 16.4 13 21H8l-1.5-6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    download: <><path d="M12 3v12m-5-5 5 5 5-5" /><path d="M5 21h14" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    money: <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="M7 10h.01M17 14h.01" /><circle cx="12" cy="12" r="2" /></>,
    play: <path d="m9 7 8 5-8 5z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    spark: <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Zm6 11 .7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14Z" />,
    upload: <><path d="M12 16V4m-5 5 5-5 5 5" /><path d="M5 20h14" /></>,
    wallet: <><path d="M4 6h15a2 2 0 0 1 2 2v11H5a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h11" /><path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-mark" aria-label="TopUp">
      <span className="brand-icon"><span>ت</span></span>
      {!compact && <span className="brand-name">توب أپ</span>}
    </div>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "soft";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return <button type={type} className={`btn btn-${variant} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>;
}

function Header({ view, setView }: { view: View; setView: (view: View) => void }) {
  const [open, setOpen] = useState(false);
  const goTo = (id: string) => {
    if (view !== "landing") {
      setView("landing");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <button className="logo-button" onClick={() => setView("landing")} aria-label="العودة للرئيسية"><BrandMark /></button>
        <nav className={`main-nav ${open ? "nav-open" : ""}`}>
          <button className={view === "discover" ? "active" : ""} onClick={() => setView("discover")}>استكشف الحملات</button>
          <button onClick={() => goTo("how-it-works")}>كيف تعمل المنصة</button>
          <button onClick={() => goTo("features")}>المميزات</button>
          <button onClick={() => goTo("pricing")}>حاسبة الأسعار</button>
          <button onClick={() => goTo("faq")}>الأسئلة الشائعة</button>
        </nav>
        <div className="nav-actions">
          <Button variant="ghost" onClick={() => setView("creator")}>تسجيل الدخول</Button>
          <Button onClick={() => setView("merchant")}>ابدأ الآن</Button>
        </div>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="فتح القائمة"><Icon name={open ? "close" : "menu"} /></button>
      </div>
    </header>
  );
}

const campaigns = [
  { id: 1, brand: "نواة", title: "إطلاق مجموعة الصيف الحصرية", tag: "أزياء وموضة", cpm: "١٨", budget: "٨,٤٥٠", views: "٤٨٢,١٠٠", spent: "٦,٣٢٠", progress: 68, color: "coral", status: "نشطة", cover: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800" },
  { id: 2, brand: "بُن", title: "قهوة مختصة في بيتك بكل سهولة", tag: "أطعمة ومشروبات", cpm: "٢٢", budget: "٥,٢٨٠", views: "٢١٤,٨٠٠", spent: "٤,٧٢٠", progress: 84, color: "brown", status: "نشطة", cover: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800" },
  { id: 3, brand: "لمعة", title: "روتين العناية المسائي للبشرة", tag: "جمال وعناية", cpm: "٢٠", budget: "١١,٢٠٠", views: "٦٢٩,٤٠٠", spent: "٣,٨٠٠", progress: 36, color: "purple", status: "نشطة", cover: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=800" },
];

/* Page: Discover */
function DiscoverPage({ setView, setSelectedCampaign }: { setView: (v: View) => void; setSelectedCampaign: (c: typeof campaigns[0]) => void }) {
  const [tab, setTab] = useState("لك");
  const categories = ["الكل", "👗 أزياء وموضة", "☕ أطعمة ومشروبات", "💄 جمال وعناية", "🎮 ألعاب وإلكترونيات", "🎁 عطور واكسسوارات"];

  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container">
        {/* Banner Section */}
        <div className="discover-hero">
          <div>
            <span className="eyebrow"><Icon name="spark" size={14} /> حملة مميزة للأسبوع</span>
            <h1 style={{ fontSize: "38px", margin: "16px 0 8px", color: "white" }}>نواة x تشكيلة الصيف الجديدة</h1>
            <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>سعر الـ CPM أعد خصيصاً للمبدعين: <strong>١٨ ر.س / ألف مشاهدة</strong> مع ميزانية مفتوحة للسحب.</p>
            <Button onClick={() => { setSelectedCampaign(campaigns[0]); setView("campaign-detail"); }}>عرض التفاصيل الان <Icon name="arrow" /></Button>
          </div>
          <div style={{ width: "240px", height: "140px", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border-glow)" }}>
            <img src={campaigns[0].cover} alt="Featured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>

        {/* Top Tabs & Filter */}
        <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div className="audience-tabs" style={{ margin: 0 }}>
            {["لك", "الترند حالياً", "أعلى CPM", "وصلت حديثاً", "الكل"].map((t) => (
              <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* Category Chips */}
        <div className="category-chips">
          {categories.map((c, i) => (
            <span key={c} className={`chip ${i === 0 ? "active" : ""}`}>{c}</span>
          ))}
        </div>

        {/* Campaigns Grid */}
        <div className="campaigns-grid">
          {campaigns.map((c) => (
            <article className="campaign-card" key={c.id}>
              <div className="campaign-cover">
                <img src={c.cover} alt={c.title} />
                <span className="eyebrow" style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)" }}>CPM {c.cpm} ر.س</span>
              </div>
              <div className="campaign-body">
                <span style={{ color: "var(--purple)", fontSize: "12px", fontWeight: 700 }}>{c.brand} · {c.tag}</span>
                <h3 style={{ fontSize: "18px", margin: "8px 0 14px", color: "white" }}>{c.title}</h3>
                <div style={{ display: "flex", justifyBetween: "space-between", fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
                  <span>الميزانية المتبقية: <strong style={{ color: "white" }}>{c.budget} ر.س</strong></span>
                </div>
                <Button variant="soft" className="full" onClick={() => { setSelectedCampaign(c); setView("campaign-detail"); }}>استعرض التفاصيل <Icon name="arrow" /></Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Page: Campaign Detail View */
function CampaignDetailPage({ campaign, setView }: { campaign: typeof campaigns[0]; setView: (v: View) => void }) {
  const [calcViews, setCalcViews] = useState(50000);
  const estimatedEarn = Math.round((calcViews / 1000) * Number(campaign.cpm));
  const [copied, setCopied] = useState(false);

  return (
    <div style={{ padding: "40px 0 100px" }}>
      <div className="container">
        {/* Navigation back */}
        <Button variant="ghost" onClick={() => setView("discover")} className="" style={{ marginBottom: "20px" }}>
          ← العودة لاستكشاف الحملات
        </Button>

        {/* Main Banner */}
        <div className="detail-banner-card">
          <div className="detail-banner-img">
            <img src={campaign.cover} alt={campaign.title} />
            <div className="detail-banner-overlay">
              <div>
                <span className="eyebrow" style={{ background: "rgba(0,184,148,0.2)", color: "var(--green)", borderColor: "var(--green)" }}>🇸🇦 حملة مرخصة وموثقة</span>
                <h1 style={{ fontSize: "36px", color: "white", margin: "12px 0 6px" }}>{campaign.title}</h1>
                <p style={{ color: "var(--text-muted)", margin: 0 }}>العلامة التجارية: <strong>{campaign.brand}</strong> · التصنيف: <strong>{campaign.tag}</strong></p>
              </div>
              <Button onClick={() => alert("تم الانضمام للحملة بنجاح!")}>انضم للحملة وابدأ المونتاج</Button>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="detail-grid-layout">
          <div>
            {/* Rates Per Platform */}
            <h3 style={{ fontSize: "20px", marginBottom: "16px", color: "white" }}>عائد المشاهدات حسب المنصة (CPM)</h3>
            <div className="payout-platforms-grid">
              {["TikTok", "Instagram Reels", "Snapchat", "YouTube Shorts"].map((p) => (
                <div key={p} className="platform-card">
                  <strong>{p}</strong>
                  <div className="platform-card-metrics">
                    <div><small style={{ color: "var(--text-muted)", display: "block" }}>لكل 1K</small><strong style={{ color: "var(--green)" }}>{campaign.cpm} ر.س</strong></div>
                    <div><small style={{ color: "var(--text-muted)", display: "block" }}>أقل تحويل</small><strong>٥٠ ر.س</strong></div>
                    <div><small style={{ color: "var(--text-muted)", display: "block" }}>أعلى سحب</small><strong>٥,٠٠٠ ر.س</strong></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Saudi Interactive Earnings Estimator */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-glow)", borderRadius: "24px", padding: "28px", marginTop: "24px" }}>
              <span className="eyebrow"><Icon name="spark" size={14} /> حاسبة أرباحك المتوقعة</span>
              <h3 style={{ fontSize: "20px", margin: "12px 0 8px", color: "white" }}>كم تتوقع أن يحقق مقطعك من مشاهدات؟</h3>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>حرك الشريط لمعرفة العائد المالي المباشر الذي سيُحكَم لرصيدك.</p>
              
              <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "center", margin: "20px 0" }}>
                <div><span style={{ color: "var(--text-muted)", fontSize: "14px" }}>المشاهدات: </span><strong style={{ fontSize: "24px", color: "white" }}>{new Intl.NumberFormat("ar-SA").format(calcViews)}</strong></div>
                <div style={{ textAlign: "left" }}><span style={{ color: "var(--text-muted)", fontSize: "14px" }}>الأرباح المباشرة: </span><strong style={{ fontSize: "28px", color: "var(--green)" }}>{new Intl.NumberFormat("ar-SA").format(estimatedEarn)} ر.س</strong></div>
              </div>

              <input className="budget-slider" type="range" min="5000" max="500000" step="5000" value={calcViews} onChange={(e) => setCalcViews(Number(e.target.value))} />
            </div>

            {/* One-Click Copy Assets & Instructions */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "24px", padding: "28px", marginTop: "24px" }}>
              <h3 style={{ fontSize: "20px", color: "white", marginBottom: "16px" }}>إرشادات المحتوى والوسوم المعتمدة</h3>
              <ul style={{ color: "var(--text-muted)", paddingRight: "20px", lineHeight: "1.8" }}>
                <li>أظهر المنتج أو العلامة خلال أول ٣ ثوانٍ من الفيديو.</li>
                <li>تأكد من اختيار نبرة محتوى عفوية وغير متكلفة.</li>
                <li>استخدم الوسوم المطلوبة أدناه للتحقق الآلي من مقطعك.</li>
              </ul>

              <span style={{ fontSize: "13px", fontWeight: 700, color: "white", display: "block", marginTop: "20px" }}>الوسوم والكابشن المعتمد:</span>
              <div className="copy-box">
                <code style={{ color: "var(--purple)" }}>#{campaign.brand}_صيف #ستايلك_معنا #توب_أپ</code>
                <Button variant="soft" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
                  {copied ? "تم النسخ ✓" : "نسخ الكابشن"}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar Metrics */}
          <div>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "24px", padding: "24px", marginBottom: "20px" }}>
              <span className="eyebrow" style={{ background: "rgba(0,184,148,0.1)", color: "var(--green)" }}>⚡ سرعة اعتماد وسحب فائقة</span>
              <div style={{ marginTop: "16px", fontSize: "14px", color: "var(--text-muted)" }}>
                <p>⏱️ **متوسط مراجعة الفيديو:** خلال ٣ ساعات</p>
                <p>💳 **إيداع الأرباح:** تلقائي للرصيد فور الاعتماد</p>
                <p>📍 **المناطق المستهدفة:** كافة مناطق المملكة</p>
              </div>
            </div>

            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "24px", padding: "24px" }}>
              <h4 style={{ fontSize: "16px", color: "white", marginBottom: "16px" }}>المواد الخام والمحتمعية</h4>
              <Button variant="secondary" className="full" style={{ marginBottom: "12px" }}><Icon name="download" /> تحميل فيديو المواد الخام (82MB)</Button>
              <Button variant="ghost" className="full"><Icon name="link" /> رابط متجر {campaign.brand}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const howSteps = {
  merchant: [
    { icon: "campaign" as IconName, label: "٠١", title: "أنشئ حملتك", text: "ارفع المقاطع الخام، حدد الإرشادات والميزانية المناسبة لك.", art: "campaign" },
    { icon: "play" as IconName, label: "٠٢", title: "ينشر المبدعون", text: "يختار صناع المحتوى حملتك وينشرون محتوى أصيلاً لجمهورهم.", art: "creator" },
    { icon: "money" as IconName, label: "٠٣", title: "ادفع مقابل الأثر", text: "يُخصم المبلغ تلقائياً حسب المشاهدات الحقيقية فقط.", art: "payout" },
  ],
  creator: [
    { icon: "grid" as IconName, label: "٠١", title: "اختر حملتك", text: "تصفح الفرص واختر العلامة التي تناسب محتواك وجمهورك.", art: "campaign" },
    { icon: "download" as IconName, label: "٠٢", title: "حمّل وابتكر", text: "حمّل المواد الخام، اصنع الفيديو بأسلوبك، ثم انشره.", art: "creator" },
    { icon: "wallet" as IconName, label: "٠٣", title: "شاهد أرباحك تنمو", text: "كل ألف مشاهدة معتمدة تتحول إلى رصيد قابل للسحب.", art: "payout" },
  ],
};

function HowItWorksSection() {
  const [audience, setAudience] = useState<"merchant" | "creator">("merchant");
  return (
    <section className="how-section" id="how-it-works">
      <div className="container">
        <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="eyebrow">بسيطة من أول خطوة</span>
          <h2>كيف تعمل توب أپ؟</h2>
          <p style={{ color: "var(--text-muted)" }}>مسار واضح، سواء كنت تبحث عن الانتشار أو تحول إبداعك إلى دخل.</p>
        </div>
        <div className="audience-tabs" role="tablist" aria-label="اختر نوع الحساب">
          <button className={audience === "merchant" ? "active" : ""} onClick={() => setAudience("merchant")} role="tab" aria-selected={audience === "merchant"}><Icon name="campaign" size={17} /> للمتاجر الإلكترونية</button>
          <button className={audience === "creator" ? "active" : ""} onClick={() => setAudience("creator")} role="tab" aria-selected={audience === "creator"}><Icon name="play" size={17} /> لصناع المحتوى</button>
        </div>
        <div className="how-cards" key={audience}>
          {howSteps[audience].map((step) => (
            <article className="how-card" key={step.title}>
              <div className="how-visual">
                <span className="brand-icon" style={{ width: 48, height: 48 }}><Icon name={step.icon} size={24} /></span>
              </div>
              <div className="how-copy">
                <span style={{ color: "var(--purple)", fontWeight: 700 }}>{step.label}</span>
                <h3>{step.title}</h3>
                <p style={{ color: "var(--text-muted)" }}>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ setView }: { setView: (view: View) => void }) {
  const [budget, setBudget] = useState(15000);
  const estimatedViews = Math.round((budget / 15) * 1000);
  const formatArabic = (value: number) => new Intl.NumberFormat("ar-SA").format(value);
  const tiers = [
    { name: "الانطلاقة", subtitle: "لأول تجربة أداء", cpm: "١٨", budget: "من ١,٠٠٠ ر.س", features: ["حتى ٣ صناع محتوى", "تتبع مباشر للمشاهدات", "دعم عبر المحادثة"], tone: "plain" },
    { name: "النمو", subtitle: "للأعمال المتسارعة", cpm: "١٥", budget: "من ١٠,٠٠٠ ر.س", features: ["صناع محتوى بلا حدود", "فلتر جمهور سعودي", "تقارير أداء متقدمة"], tone: "featured" },
    { name: "الشركات", subtitle: "للفرق والحملات الكبرى", cpm: "مخصص", budget: "حسب احتياجك", features: ["مدير حساب مخصص", "صلاحيات وأدوار للفريق", "تقارير وربط مخصص"], tone: "dark" },
  ];
  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="eyebrow">شفافية من دون رسوم مخفية</span>
          <h2>أسعار عادلة بناءً على نتائج المشاهدات الحقيقية</h2>
          <p style={{ color: "var(--text-muted)" }}>اختر ميزانيتك، واعرف فوراً حجم الوصول المتوقع لحملتك.</p>
        </div>
        <div className="calculator-card">
          <div className="calculator-copy">
            <span className="eyebrow"><Icon name="spark" size={16} /> حاسبة الوصول</span>
            <h3 style={{ margin: "16px 0 8px" }}>كم تريد أن تستثمر في حملتك؟</h3>
            <p style={{ color: "var(--text-muted)" }}>التقدير مبني على سعر ١٥ ر.س لكل ألف مشاهدة معتمدة.</p>
            <div className="budget-display" style={{ margin: "20px 0" }}><strong>{formatArabic(budget)}</strong> <span style={{ color: "var(--text-muted)" }}>ر.س</span></div>
            <input className="budget-slider" type="range" min="1000" max="100000" step="1000" value={budget} onChange={(event) => setBudget(Number(event.target.value))} aria-label="ميزانية الحملة بالريال السعودي" />
          </div>
          <div className="estimate-result">
            <span className="brand-icon" style={{ width: 50, height: 50 }}><Icon name="eye" size={26} /></span>
            <span style={{ color: "var(--text-muted)", marginTop: "12px" }}>الوصول التقديري المضمون</span>
            <strong style={{ fontSize: "36px", margin: "8px 0", color: "white" }}>{formatArabic(estimatedViews)}</strong>
            <small style={{ color: "var(--green)" }}>مشاهدة حقيقية</small>
          </div>
        </div>
        <div className="pricing-cards">
          {tiers.map((tier) => (
            <article className={`pricing-card ${tier.tone}`} key={tier.name}>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>{tier.subtitle}</span>
              <h3 style={{ fontSize: "24px", margin: "8px 0" }}>{tier.name}</h3>
              <strong style={{ fontSize: "32px", color: "white", margin: "16px 0" }}>{tier.cpm} <small style={{ fontSize: "14px" }}>ر.س</small></strong>
              <ul>{tier.features.map((f) => <li key={f}><Icon name="check" size={16} /> {f}</li>)}</ul>
              <Button variant={tier.tone === "featured" ? "primary" : "secondary"} className="full" onClick={() => setView("merchant")}>ابدأ الآن</Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { question: "كيف تضمن المنصة أن المشاهدات حقيقية ومن جمهور سعودي؟", answer: "نتصل مباشرة بواجهات TikTok وInstagram وSnapchat الرسمية، ثم نمرر البيانات عبر نظام كشف آلي يستبعد الزيارات الوهمية والتكرار غير الطبيعي." },
  { question: "كيف ومتى يتسلم صانع المحتوى أرباحه؟", answer: "تُضاف الأرباح إلى رصيد صانع المحتوى بعد اعتماد الفيديو والتحقق من المشاهدات ويمكن طلب السحب إلى الحساب البنكي." },
  { question: "هل المنصة متوافقة مع الأنظمة السعودية والربط الضريبي؟", answer: "نعم. تصدر توب أپ مستندات مالية متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك." },
  { question: "ما هو الحد الأدنى لشحن محفظة المتجر؟", answer: "الحد الأدنى لشحن المحفظة هو ١,٠٠٠ ر.س عبر مدى أو Apple Pay." },
];

function FaqSection() {
  const [openItem, setOpenItem] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <span className="eyebrow">كل ما تحتاج معرفته</span>
          <h2 style={{ fontSize: "36px", margin: "16px 0" }}>الأسئلة الشائعة</h2>
          <p style={{ color: "var(--text-muted)" }}>إجابات واضحة تساعدك تبدأ بثقة. وإذا لم تجد سؤالك، فريقنا قريب منك.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article className={openItem === index ? "open" : ""} key={item.question}>
              <button onClick={() => setOpenItem(openItem === index ? -1 : index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.question}</strong>
                <Icon name={openItem === index ? "close" : "plus"} size={18} />
              </button>
              {openItem === index && <div className="faq-answer"><p>{item.answer}</p></div>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveSpreadSection({ setView }: { setView: (view: View) => void }) {
  return (
    <section className="live-spread-section">
      <div className="container">
        <div className="live-spread-heading">
          <div>
            <span className="eyebrow"><Icon name="spark" size={14} /> انتشار مباشر وموثق</span>
            <h2 style={{ fontSize: "36px", marginTop: "12px" }}>خريطة الانتشار الحي بالسعودية (3D)</h2>
          </div>
          <p style={{ color: "var(--text-muted)" }}>تتبع المحتوى الحقيقي من لحظة النشر حتى آخر مشاهدة، ببيانات موثوقة من المنصات.</p>
        </div>

        <div className="spread-map-card">
          <div className="map-card-head">
            <div>
              <span className="eyebrow"><i /> مباشر الآن</span>
              <h3 style={{ marginTop: "12px" }}>خريطة التغطية التفاعلية</h3>
            </div>
            <div>
              <span style={{ color: "var(--text-muted)" }}>المشاهدات اليوم</span>
              <strong style={{ fontSize: "28px", display: "block", color: "var(--green)" }}>١,٨٤٢,٦٧٠</strong>
            </div>
          </div>

          <div className="saudi-map-wrap">
            <svg className="saudi-map" viewBox="0 0 620 410">
              <defs>
                <linearGradient id="saudiFill3D" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7868ef" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00b894" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path className="saudi-shape" d="M119 79 205 42l71 27 82-10 61 45 64 18 18 61-41 36-9 78-72 31-48 50-84-18-38-55-73-28-12-63-47-49 42-86Z" fill="url(#saudiFill3D)" stroke="#7868ef" strokeWidth="2" />
              <g transform="translate(354 184)"><circle r="8" fill="#00b894" /><text x="12" y="5" fill="#fff" fontSize="12">الرياض</text></g>
              <g transform="translate(172 184)"><circle r="8" fill="#7868ef" /><text x="-35" y="5" fill="#fff" fontSize="12">جدة</text></g>
              <g transform="translate(452 205)"><circle r="8" fill="#00b894" /><text x="12" y="5" fill="#fff" fontSize="12">الدمام</text></g>
            </svg>

            <div className="social-toast toast-views">
              <span className="brand-icon" style={{ width: 30, height: 30 }}><Icon name="eye" size={16} /></span>
              <div><strong>متجر عطور حقق ١٢٠,٠٠٠ مشاهدة</strong><small style={{ color: "var(--text-muted)" }}>قبل ٥ دقائق في الرياض</small></div>
            </div>
            <div className="social-toast toast-payout">
              <span className="brand-icon" style={{ width: 30, height: 30, background: "var(--green)" }}><Icon name="money" size={16} /></span>
              <div><strong>صانع المحتوى أحمد سحب ٨٥٠ ر.س</strong><small style={{ color: "var(--text-muted)" }}>أرباح معتمدة</small></div>
            </div>
          </div>

          <div className="map-activity-row">
            <div><span><small style={{ color: "var(--text-muted)" }}>فيديوهات اليوم</small><strong style={{ display: "block" }}>٢٤٨ فيديو</strong></span></div>
            <div><span><small style={{ color: "var(--text-muted)" }}>حملات نشطة</small><strong style={{ display: "block" }}>٦٤ حملة</strong></span></div>
            <div><span><small style={{ color: "var(--text-muted)" }}>أرباح دُفعت</small><strong style={{ display: "block" }}>٧٨,٤٢٠ ر.س</strong></span></div>
            <Button onClick={() => setView("merchant")}>أطلق حملتك <Icon name="arrow" /></Button>
          </div>
        </div>

        <div className="conversion-bento">
          <article className="bento-card process-bento">
            <span className="eyebrow">من الفكرة إلى الانتشار</span>
            <h3 style={{ fontSize: "22px", margin: "12px 0" }}>ثلاث خطوات، ونتائج بلا تعقيد</h3>
            <div className="process-line">
              <div><span className="step-orb"><Icon name="plus" /></span><strong>أنشئ حملتك</strong></div>
              <i style={{ background: "var(--line)", height: 2 }} />
              <div><span className="step-orb"><Icon name="download" /></span><strong>يبدأ الإبداع</strong></div>
              <i style={{ background: "var(--line)", height: 2 }} />
              <div><span className="step-orb"><Icon name="money" /></span><strong>ادفع حسب الأثر</strong></div>
            </div>
          </article>
          <article className="bento-card security-bento">
            <span className="eyebrow">طبقة الثقة</span>
            <h3 style={{ fontSize: "22px", margin: "12px 0" }}>كل مشاهدة موثّقة</h3>
            <p style={{ color: "var(--text-muted)" }}>تكاملات رسمية وفلاتر ذكية تحمي ميزانيتك.</p>
            <div className="platform-stack">
              <span><b>T</b> TikTok API</span>
              <span><b>R</b> Instagram Reels API</span>
              <span><b>S</b> Snapchat</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Landing({ setView, setSelectedCampaign }: { setView: (view: View) => void; setSelectedCampaign: (c: typeof campaigns[0]) => void }) {
  return (
    <>
      <Header view="landing" setView={setView} />
      <main>
        <section className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><Icon name="spark" size={16} /> منصة نمو المحتوى الأولى في السعودية</div>
              <h1>محتواك يتصدر القمة..<br /><span>وأرباحك تُحسب</span></h1>
              <p>نربط المتاجر الطموحة بأفضل صناع المحتوى، ونحوّل كل مشاهدة حقيقية إلى نمو يمكن قياسه.</p>
              <div className="hero-actions">
                <Button onClick={() => setView("merchant")}>أنا متجر إلكتروني <Icon name="arrow" /></Button>
                <Button variant="secondary" onClick={() => setView("creator")}>أنا صانع محتوى <Icon name="play" /></Button>
              </div>
              <div className="trust-row">
                <div className="avatars"><span>ن</span><span>س</span><span>م</span><span>+</span></div>
                <div><strong>+٢,٤٠٠</strong><small style={{ color: "var(--text-muted)" }}>صانع محتوى نشط</small></div>
                <div className="trust-divider" />
                <div><strong>٤.٩ / ٥</strong><small style={{ color: "var(--text-muted)" }}>رضا العلامات التجارية</small></div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="creator-card">
                <img src="https://images.unsplash.com/photo-1692380864909-d4711221ccef?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900" alt="صانع محتوى" />
                <div className="creator-gradient" />
                <div className="creator-meta"><span className="live-dot" /> محتوى قيد الانتشار</div>
              </div>
              <div className="float-card earnings-float">
                <span className="brand-icon" style={{ background: "var(--green)" }}><Icon name="money" size={20} /></span>
                <div><small style={{ color: "var(--text-muted)" }}>أرباح الأسبوع</small><strong>٢,٨٤٠ ر.س</strong></div>
              </div>
              <div className="float-card cpm-float">
                <span style={{ color: "var(--purple)", fontWeight: 700 }}>CPM</span>
                <strong style={{ display: "block", fontSize: "22px" }}>١٨ ر.س</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Discover Preview Section */}
        <section style={{ padding: "60px 0", background: "var(--bg-card)", borderTop: "1px solid var(--border-subtle)" }}>
          <div className="container">
            <div style={{ display: "flex", justifyBetween: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
              <div>
                <span className="eyebrow"><Icon name="spark" size={14} /> فرصة صانعي المحتوى</span>
                <h2 style={{ fontSize: "32px", color: "white", marginTop: "12px" }}>استكشف أحدث الحملات المتاحة</h2>
              </div>
              <Button variant="secondary" onClick={() => setView("discover")}>استعرض جميع الحملات ←</Button>
            </div>
            <div className="campaigns-grid">
              {campaigns.slice(0, 3).map((c) => (
                <article className="campaign-card" key={c.id}>
                  <div className="campaign-cover">
                    <img src={c.cover} alt={c.title} />
                    <span className="eyebrow" style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.7)" }}>CPM {c.cpm} ر.س</span>
                  </div>
                  <div className="campaign-body">
                    <span style={{ color: "var(--purple)", fontSize: "12px", fontWeight: 700 }}>{c.brand} · {c.tag}</span>
                    <h3 style={{ fontSize: "18px", margin: "8px 0 14px", color: "white" }}>{c.title}</h3>
                    <Button variant="soft" className="full" onClick={() => { setSelectedCampaign(c); setView("campaign-detail"); }}>تفاصيل الحملة <Icon name="arrow" /></Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <LiveSpreadSection setView={setView} />

        <section className="logos-section">
          <div className="container">
            <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>يثق بنا أكثر من ٣٢٠ متجراً سعودياً</p>
            <div className="logo-cloud"><span>سلة</span><span>تمارا</span><span>جاهز</span><span>نون</span><span>مرسول</span></div>
          </div>
        </section>

        <HowItWorksSection />
        <PricingSection setView={setView} />

        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading" style={{ textAlign: "center", marginBottom: "40px" }}>
              <span className="eyebrow">نمو أذكى</span>
              <h2>كل ما تحتاجه لتصنع تأثيراً حقيقياً</h2>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <span className="brand-icon"><Icon name="money" /></span>
                <h3 style={{ margin: "16px 0 8px" }}>دفع مقابل النتائج</h3>
                <p style={{ color: "var(--text-muted)" }}>حدد سعر CPM وادفع فقط مقابل المشاهدات الحقيقية.</p>
              </article>
              <article className="feature-card">
                <span className="brand-icon" style={{ background: "var(--green)" }}><Icon name="campaign" /></span>
                <h3 style={{ margin: "16px 0 8px" }}>وصول عضوي أقوى</h3>
                <p style={{ color: "var(--text-muted)" }}>محتوى أصيل بصوت صناع يعرفون جمهورهم.</p>
              </article>
              <article className="feature-card">
                <span className="brand-icon"><Icon name="eye" /></span>
                <h3 style={{ margin: "16px 0 8px" }}>تتبع تلقائي وشفاف</h3>
                <p style={{ color: "var(--text-muted)" }}>قراءة مباشرة للمشاهدات عبر واجهات المنصات.</p>
              </article>
            </div>
          </div>
        </section>

        <FaqSection />

        <section style={{ padding: "80px 0" }}>
          <div className="container cta-panel">
            <div><h2>ابدأ حملة يصنعها جمهورك</h2><p style={{ opacity: 0.8 }}>اشحن محفظتك، أطلق حملتك، وشاهد الأثر لحظة بلحظة.</p></div>
            <Button variant="secondary" onClick={() => setView("merchant")}>أنشئ حملتك مجاناً <Icon name="arrow" /></Button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div><BrandMark /><p style={{ color: "var(--text-muted)", margin: "16px 0" }}>منصة سعودية تربط المتاجر بصناع المحتوى.</p></div>
          <div><strong>المنصة</strong><p style={{ color: "var(--text-muted)", marginTop: "8px" }}>كيف تعمل · المميزات · الأسعار</p></div>
          <div><strong>الدعم</strong><p style={{ color: "var(--text-muted)", marginTop: "8px" }}>الأسئلة الشائعة · سياسة الخصوصية</p></div>
          <div><strong>موثوق محلياً</strong><p style={{ color: "var(--text-muted)", marginTop: "8px" }}>متوافق مع هيئة الزكاة والضريبة</p></div>
        </div>
        <div className="container footer-bottom">
          <span>© ٢٠٢٥ توب أپ. جميع الحقوق محفوظة</span>
          <span>صُنع بفخر في الرياض، المملكة العربية السعودية</span>
        </div>
      </footer>
    </>
  );
}

function DashboardShell({ view, setView, children }: { view: View; setView: (v: View) => void; children: ReactNode }) {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <button className="logo-button" onClick={() => setView("landing")}><BrandMark /></button>
        <div className="side-nav">
          <button className="active"><Icon name="grid" /> نظرة عامة</button>
          <button onClick={() => setView("discover")}><Icon name="spark" /> استكشف الحملات</button>
          <button><Icon name="campaign" /> الحملات</button>
          <button><Icon name="wallet" /> المحفظة</button>
        </div>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}

function MerchantDashboard({ setView }: { setView: (v: View) => void }) {
  const [modal, setModal] = useState(false);
  return (
    <DashboardShell view="merchant" setView={setView}>
      <div className="dash-heading">
        <div><h1>صباح الخير، فريق أثير</h1><p style={{ color: "var(--text-muted)" }}>نظرة سريعة على أداء حملاتك اليوم.</p></div>
        <Button onClick={() => setModal(true)}><Icon name="plus" /> إنشاء حملة جديدة</Button>
      </div>
      <div className="merchant-overview">
        <div className="wallet-card">
          <span>رصيد المحفظة</span>
          <strong style={{ fontSize: "28px", display: "block", margin: "12px 0" }}>٢٤,٨٥٠.٠٠ ر.س</strong>
          <Button variant="secondary">شحن المحفظة</Button>
        </div>
        <div className="stat-card"><div><span>إجمالي المشاهدات</span><strong style={{ fontSize: "22px", display: "block" }}>١.٨ مليون</strong></div></div>
        <div className="stat-card"><div><span>الإنفاق هذا الشهر</span><strong style={{ fontSize: "22px", display: "block" }}>١٤,٨٤٠ ر.س</strong></div></div>
        <div className="stat-card"><div><span>محتوى تم نشره</span><strong style={{ fontSize: "22px", display: "block" }}>٧٢ فيديو</strong></div></div>
      </div>
      <div className="campaign-table">
        <h3 style={{ marginBottom: "16px" }}>الحملات النشطة</h3>
        {campaigns.map((item) => (
          <div className="table-row" key={item.title}>
            <strong>{item.title}</strong>
            <span style={{ color: "var(--green)" }}>{item.status}</span>
            <span>{item.views} مشاهدة</span>
            <span>{item.spent} ر.س</span>
            <span>{item.budget} ر.س</span>
            <span>{item.progress}٪</span>
          </div>
        ))}
      </div>
      {modal && <Modal onClose={() => setModal(false)}><h2>إنشاء حملة جديدة</h2><p style={{ color: "var(--text-muted)", margin: "12px 0 24px" }}>ارفع المقاطع الخام وحدد الميزانية.</p><Button onClick={() => setModal(false)}>إغلاق</Button></Modal>}
    </DashboardShell>
  );
}

function CreatorDashboard({ setView, setSelectedCampaign }: { setView: (v: View) => void; setSelectedCampaign: (c: typeof campaigns[0]) => void }) {
  return (
    <DashboardShell view="creator" setView={setView}>
      <div className="dash-heading">
        <div><h1>أهلاً عمر، وش راح تبدع اليوم؟</h1></div>
        <div style={{ background: "var(--bg-card)", padding: "12px 20px", borderRadius: "16px", border: "1px solid var(--border-subtle)" }}>
          <small style={{ color: "var(--text-muted)" }}>الرصيد المتاح: </small><strong>٤,٢٨٠.٥٠ ر.س</strong>
        </div>
      </div>
      <div className="campaign-table">
        <h3 style={{ marginBottom: "16px" }}>حملات بانتظار إبداعك</h3>
        {campaigns.map((item) => (
          <div className="table-row" key={item.title}>
            <strong>{item.title} ({item.brand})</strong>
            <span>CPM {item.cpm} ر.س</span>
            <span>الميزانية: {item.budget} ر.س</span>
            <Button variant="soft" onClick={() => { setSelectedCampaign(item); setView("campaign-detail"); }}>عرض التفاصيل</Button>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}

function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal" onClick={(e) => e.stopPropagation()}>{children}</div></div>;
}

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0]>(campaigns[0]);

  return (
    <div dir="rtl" style={{ background: "var(--bg-dark)", color: "var(--text-main)", minHeight: "100vh" }}>
      {view === "landing" ? (
        <Landing setView={setView} setSelectedCampaign={setSelectedCampaign} />
      ) : view === "discover" ? (
        <>
          <Header view={view} setView={setView} />
          <DiscoverPage setView={setView} setSelectedCampaign={setSelectedCampaign} />
        </>
      ) : view === "campaign-detail" ? (
        <>
          <Header view={view} setView={setView} />
          <CampaignDetailPage campaign={selectedCampaign} setView={setView} />
        </>
      ) : view === "merchant" ? (
        <MerchantDashboard setView={setView} />
      ) : (
        <CreatorDashboard setView={setView} setSelectedCampaign={setSelectedCampaign} />
      )}
    </div>
  );
}