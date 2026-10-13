/**
 * MARKORA™ MARKETING AGENCY DASHBOARD — CORE JAVASCRIPT ENGINE
 * Pure Vanilla JavaScript • Zero External Dependencies • LocalStorage Persistence • HTML5 Canvas
 * All rights reserved © 2026 MARKORA
 */

(function () {
  "use strict";

  /* ==========================================================================
     1. LOCAL STORAGE & DATA STATE INITIALIZATION
     ========================================================================== */
  const STORAGE_KEYS = {
    CAMPAIGNS: "markora_campaigns",
    CLIENTS: "markora_clients",
    LEADS: "markora_leads",
    TASKS: "markora_tasks",
    CONTENT: "markora_content",
    EVENTS: "markora_events",
    TEAM: "markora_team",
    NOTIFS: "markora_notifications",
    MESSAGES: "markora_messages",
    SETTINGS: "markora_settings",
    THEME: "markora_theme",
    COMPACT: "markora_compact",
    AUTH: "markora_auth"
  };

  const storage = {
    get: (key, fallback) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (e) {
        console.warn("LocalStorage read error for", key, e);
        return fallback;
      }
    },
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn("LocalStorage write error for", key, e);
      }
    }
  };

  /* Initial Realistic Demo Datasets */
  const DEFAULT_CAMPAIGNS = [
    { id: "cmp-1", name: "Summer Growth Acceleration", client: "Apex Global SaaS", status: "Active", budget: 35000, spent: 22400, leads: 1840, conversions: 246, roi: 3.8 },
    { id: "cmp-2", name: "Brand Awareness & Reach 2026", client: "Lumina Cloud Corp", status: "Active", budget: 20000, spent: 14200, leads: 960, conversions: 112, roi: 2.9 },
    { id: "cmp-3", name: "Google Search Expansion B2B", client: "Vantage Commerce", status: "Active", budget: 45000, spent: 38100, leads: 2450, conversions: 380, roi: 4.1 },
    { id: "cmp-4", name: "Social Viral Retargeting", client: "NovaHealth Tech", status: "Review", budget: 18000, spent: 6500, leads: 620, conversions: 78, roi: 2.4 },
    { id: "cmp-5", name: "Q3 E-Commerce Funnel Max", client: "Solaria Retail Co", status: "Paused", budget: 28000, spent: 19800, leads: 1420, conversions: 195, roi: 3.2 },
    { id: "cmp-6", name: "LinkedIn Executive Outreach", client: "Meridian Capital", status: "Completed", budget: 15000, spent: 15000, leads: 820, conversions: 144, roi: 4.6 }
  ];

  const DEFAULT_CLIENTS = [
    { id: "cli-1", company: "Apex Global SaaS", industry: "SaaS & Cloud", manager: "Sarah Jenkins", activeCampaigns: 4, monthlySpend: 24500, totalRevenue: 98000, status: "Active" },
    { id: "cli-2", company: "Lumina Cloud Corp", industry: "SaaS & Cloud", manager: "Liam Thorne", activeCampaigns: 2, monthlySpend: 16000, totalRevenue: 64000, status: "Active" },
    { id: "cli-3", company: "Vantage Commerce", industry: "E-Commerce", manager: "Sarah Jenkins", activeCampaigns: 5, monthlySpend: 38000, totalRevenue: 152000, status: "Active" },
    { id: "cli-4", company: "NovaHealth Tech", industry: "Healthcare", manager: "Marcus Vance", activeCampaigns: 1, monthlySpend: 12500, totalRevenue: 45000, status: "Review" },
    { id: "cli-5", company: "Solaria Retail Co", industry: "E-Commerce", manager: "Elena Rostova", activeCampaigns: 3, monthlySpend: 21000, totalRevenue: 84000, status: "Onboarding" },
    { id: "cli-6", company: "Meridian Capital", industry: "Fintech", manager: "Marcus Vance", activeCampaigns: 2, monthlySpend: 32000, totalRevenue: 128000, status: "Active" }
  ];

  const DEFAULT_LEADS = [
    { id: "ld-1", name: "David Henderson", company: "Acrobatics Media", source: "Google Ads", campaign: "Google Search Expansion B2B", status: "Qualified", value: 36000, owner: "Sarah Jenkins", lastContact: "Today, 10:24 AM" },
    { id: "ld-2", name: "Helena Zhou", company: "Nexura Logistics", source: "LinkedIn", campaign: "LinkedIn Executive Outreach", status: "Proposal", value: 52000, owner: "Marcus Vance", lastContact: "Yesterday" },
    { id: "ld-3", name: "Oliver Sterling", company: "Zenith Payments", source: "Meta Ads", campaign: "Brand Awareness & Reach 2026", status: "New", value: 24000, owner: "Liam Thorne", lastContact: "2 hours ago" },
    { id: "ld-4", name: "Beatrice Thorne", company: "Aura BioTech", source: "Organic Search", campaign: "SEO Content Inbound", status: "Contacted", value: 45000, owner: "Chloe Bennett", lastContact: "Sep 09, 2026" },
    { id: "ld-5", name: "Julian Rossi", company: "Starlight Hospitality", source: "Referral", campaign: "Executive Network", status: "Won", value: 84000, owner: "Marcus Vance", lastContact: "Sep 08, 2026" },
    { id: "ld-6", name: "Kavita Patel", company: "Hyperion Solar", source: "Google Ads", campaign: "Summer Growth Acceleration", status: "Qualified", value: 31000, owner: "Sarah Jenkins", lastContact: "Sep 07, 2026" }
  ];

  const DEFAULT_TASKS = [
    { id: "tsk-1", title: "Review Q4 Meta Ads target ROAS benchmarks", priority: "Urgent", column: "inprogress", assignee: "Liam Thorne", dueDate: "2026-09-18", completed: false },
    { id: "tsk-2", title: "Build conversion landing page for Apex Global", priority: "High", column: "todo", assignee: "Chloe Bennett", dueDate: "2026-09-22", completed: false },
    { id: "tsk-3", title: "Audit negative keyword list on Google Search", priority: "Medium", column: "review", assignee: "Sarah Jenkins", dueDate: "2026-09-15", completed: false },
    { id: "tsk-4", title: "Prepare monthly executive performance report", priority: "High", column: "completed", assignee: "Marcus Vance", dueDate: "2026-09-10", completed: true },
    { id: "tsk-5", title: "Optimize TikTok short-form video hooks", priority: "Medium", column: "todo", assignee: "Elena Rostova", dueDate: "2026-09-25", completed: false },
    { id: "tsk-6", title: "Deploy schema markup across client blogs", priority: "Low", column: "inprogress", assignee: "Alex Chen", dueDate: "2026-09-20", completed: false }
  ];

  const DEFAULT_CONTENT = [
    { id: "cnt-1", title: "10 B2B Enterprise Growth Hacks for 2026", type: "Blog", platform: "Agency Blog & Medium", author: "Chloe Bennett", status: "Published", date: "Sep 04, 2026", performance: "14.2K views • 840 reads" },
    { id: "cnt-2", title: "High-Converting Google Ads Blueprint (Video)", type: "Video", platform: "YouTube & LinkedIn", author: "Liam Thorne", status: "Scheduled", date: "Sep 16, 2026", performance: "Queued for distribution" },
    { id: "cnt-3", title: "Customer Acquisition Cost Benchmark Report", type: "Email", platform: "Newsletter (18K Subs)", author: "Marcus Vance", status: "Published", date: "Sep 08, 2026", performance: "48.2% Open • 12.4% CTR" },
    { id: "cnt-4", title: "Meta Retargeting Dynamic Carousel Creative", type: "Ad Creative", platform: "Meta Ads & Instagram", author: "Elena Rostova", status: "Review", date: "Sep 18, 2026", performance: "Under A/B Creative Test" },
    { id: "cnt-5", title: "Next-Gen SaaS Inbound Playbook", type: "Landing Page", platform: "Direct / SEO", author: "Alex Chen", status: "Draft", date: "Sep 28, 2026", performance: "In copywriting draft" }
  ];

  const DEFAULT_EVENTS = [
    { id: "evt-1", title: "Summer Campaign Review", type: "event-campaign", day: 12 },
    { id: "evt-2", title: "Apex Executive Strategy Call", type: "event-meeting", day: 15 },
    { id: "evt-3", title: "Q3 Benchmark Report Launch", type: "event-content", day: 18 },
    { id: "evt-4", title: "Ad Spend Mid-Month Recalibration", type: "event-deadline", day: 22 },
    { id: "evt-5", title: "Vantage Commerce Growth Sync", type: "event-meeting", day: 26 }
  ];

  const DEFAULT_TEAM = [
    { id: "tm-1", name: "Marcus Vance", role: "Managing Director", projects: 8, tasks: 4, rating: "4.9 / 5.0", status: "Active" },
    { id: "tm-2", name: "Sarah Jenkins", role: "Lead Growth Strategist", projects: 6, tasks: 9, rating: "4.8 / 5.0", status: "Active" },
    { id: "tm-3", name: "Liam Thorne", role: "Senior Paid Ads Specialist", projects: 5, tasks: 7, rating: "4.9 / 5.0", status: "Active" },
    { id: "tm-4", name: "Elena Rostova", role: "Social & Creative Director", projects: 4, tasks: 6, rating: "4.7 / 5.0", status: "Active" },
    { id: "tm-5", name: "Chloe Bennett", role: "Content & SEO Architect", projects: 5, tasks: 5, rating: "4.8 / 5.0", status: "Active" },
    { id: "tm-6", name: "Alex Chen", role: "Full-Stack Web & Tracking Dev", projects: 7, tasks: 8, rating: "5.0 / 5.0", status: "Active" }
  ];

  const DEFAULT_NOTIFS = [
    { id: "nt-1", title: "New Qualified Lead Received", desc: "David Henderson submitted proposal request ($36,000)", time: "10 mins ago", read: false },
    { id: "nt-2", title: "Campaign Target Surpassed", desc: "Google Search Expansion hit 2,450 leads (114% of goal)", time: "1 hour ago", read: false },
    { id: "nt-3", title: "Budget Threshold Warning", desc: "Vantage Commerce spent 84.6% of allocated budget", time: "3 hours ago", read: false },
    { id: "nt-4", title: "New Client Onboarded", desc: "Solaria Retail Co contract verified and activated", time: "Yesterday", read: true }
  ];

  const DEFAULT_CONVERSATIONS = [
    { id: "cv-1", name: "Elena Rostova", role: "Social Director", avatar: "ER", online: true, messages: [
      { sender: "them", text: "Marcus, the new Instagram reel set has generated 240+ inbound DMs this morning.", time: "09:42 AM" },
      { sender: "me", text: "Outstanding velocity Elena. Let's scale the ad boost on the top 2 videos immediately.", time: "09:50 AM" },
      { sender: "them", text: "Will do! Adjusting daily budget by +$500 across Meta & TikTok now.", time: "09:52 AM" }
    ]},
    { id: "cv-2", name: "Liam Thorne", role: "Paid Ads Specialist", avatar: "LT", online: true, messages: [
      { sender: "them", text: "Google search expansion CPA dropped from $28 down to $16.40 after the keyword pruning.", time: "Yesterday" },
      { sender: "me", text: "Perfect timing before the Apex Global board review. Log that in the executive report.", time: "Yesterday" }
    ]},
    { id: "cv-3", name: "Sarah Jenkins", role: "Growth Strategist", avatar: "SJ", online: false, messages: [
      { sender: "them", text: "Proposal for Meridian Capital submitted. Target deal size is $128K ARR.", time: "2 days ago" }
    ]}
  ];

  // Active state holders
  let appData = {
    campaigns: storage.get(STORAGE_KEYS.CAMPAIGNS, DEFAULT_CAMPAIGNS),
    clients: storage.get(STORAGE_KEYS.CLIENTS, DEFAULT_CLIENTS),
    leads: storage.get(STORAGE_KEYS.LEADS, DEFAULT_LEADS),
    tasks: storage.get(STORAGE_KEYS.TASKS, DEFAULT_TASKS),
    content: storage.get(STORAGE_KEYS.CONTENT, DEFAULT_CONTENT),
    events: storage.get(STORAGE_KEYS.EVENTS, DEFAULT_EVENTS),
    team: storage.get(STORAGE_KEYS.TEAM, DEFAULT_TEAM),
    notifs: storage.get(STORAGE_KEYS.NOTIFS, DEFAULT_NOTIFS),
    conversations: storage.get(STORAGE_KEYS.MESSAGES, DEFAULT_CONVERSATIONS),
    currentPeriod: "30d",
    currentChartRange: "30d",
    activeChatId: "cv-1"
  };

  /* ==========================================================================
     2. TOAST NOTIFICATION ENGINE
     ========================================================================== */
  function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    if (type === "danger") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else if (type === "warning") {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    }

    toast.innerHTML = `
      <div style="color: ${type === 'danger' ? 'var(--rose)' : type === 'warning' ? 'var(--amber)' : 'var(--emerald)'}; flex-shrink: 0;">${iconSvg}</div>
      <div style="flex: 1; font-size: 0.85rem; font-weight: 500;">${message}</div>
      <button style="color: var(--text-muted); cursor: pointer; padding: 2px;" aria-label="Close">&times;</button>
    `;

    toast.querySelector("button").addEventListener("click", () => toast.remove());
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(40px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  /* ==========================================================================
     3. NAVIGATION & VIEW ROUTING
     ========================================================================== */
  function navigateToView(viewId) {
    // Map view IDs to valid sections
    const cleanId = viewId.replace(/^#/, "").toLowerCase();
    const targetSection = document.getElementById(`view-${cleanId}`);
    
    if (!targetSection) {
      console.warn("View not found:", cleanId);
      return;
    }

    // Update active class on nav links
    document.querySelectorAll(".sidebar-nav .nav-item").forEach(link => {
      if (link.getAttribute("data-view") === cleanId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update view sections
    document.querySelectorAll(".view-section").forEach(sec => sec.classList.remove("active"));
    targetSection.classList.add("active");

    // Close mobile drawer if open
    const sidebar = document.getElementById("appSidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    if (sidebar) sidebar.classList.remove("mobile-open");
    if (backdrop) backdrop.style.display = "none";

    // Scroll top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Refresh charts if entering overview or analytics
    if (cleanId === "overview") {
      setTimeout(renderRevenueChart, 50);
    } else if (cleanId === "analytics") {
      setTimeout(renderCacLtvChart, 50);
    }
  }

  function setupRouting() {
    // Listen to hash changes
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash || "#overview";
      navigateToView(hash);
    });

    // Handle clicks on nav-item
    document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const targetView = item.getAttribute("data-view");
        window.location.hash = targetView;
        navigateToView(targetView);
      });
    });

    // Initial navigation
    const initialHash = window.location.hash || "#overview";
    navigateToView(initialHash);
  }

  /* ==========================================================================
     4. TOP HEADER CONTROLS (SEARCH, DATE FILTER, DROPDOWNS)
     ========================================================================== */
  function setupHeaderControls() {
    // Sidebar Collapse
    const sidebar = document.getElementById("appSidebar");
    const collapseBtn = document.getElementById("sidebarCollapseBtn");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sidebarBackdrop = document.getElementById("sidebarBackdrop");

    if (collapseBtn && sidebar) {
      collapseBtn.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        showToast(sidebar.classList.contains("collapsed") ? "Sidebar collapsed" : "Sidebar expanded", "success");
      });
    }

    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("mobile-open");
      });
    }

    // Quick Add Dropdown
    const quickAddBtn = document.getElementById("quickAddBtn");
    const quickAddMenu = document.getElementById("quickAddMenu");
    if (quickAddBtn && quickAddMenu) {
      quickAddBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllDropdowns(quickAddMenu);
        quickAddMenu.classList.toggle("active");
      });
    }

    // Quick Add Actions
    document.getElementById("qaNewCampaign")?.addEventListener("click", () => {
      closeAllDropdowns();
      openCampaignModal();
    });
    document.getElementById("qaNewClient")?.addEventListener("click", () => {
      closeAllDropdowns();
      openClientModal();
    });
    document.getElementById("qaNewLead")?.addEventListener("click", () => {
      closeAllDropdowns();
      openLeadModal();
    });
    document.getElementById("qaNewTask")?.addEventListener("click", () => {
      closeAllDropdowns();
      openTaskModal();
    });
    document.getElementById("qaNewEvent")?.addEventListener("click", () => {
      closeAllDropdowns();
      openEventModal();
    });

    // Profile Dropdown
    const profileTrigger = document.getElementById("profileTriggerBtn");
    const profileDropdown = document.getElementById("profileDropdown");
    if (profileTrigger && profileDropdown) {
      profileTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllDropdowns(profileDropdown);
        profileDropdown.classList.toggle("active");
      });
    }

    document.getElementById("profileSettingsBtn")?.addEventListener("click", () => {
      closeAllDropdowns();
      window.location.hash = "#settings";
      navigateToView("settings");
    });

    document.getElementById("themeToggleQuickBtn")?.addEventListener("click", () => {
      toggleTheme();
    });

    document.getElementById("profileLogoutBtn")?.addEventListener("click", () => {
      closeAllDropdowns();
      openAuthModal();
    });

    // Notifications Panel
    const notifBtn = document.getElementById("headerNotifBtn");
    const notifPanel = document.getElementById("notificationPanel");
    if (notifBtn && notifPanel) {
      notifBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeAllDropdowns(notifPanel);
        notifPanel.classList.toggle("active");
      });
    }

    document.getElementById("markAllNotifsReadBtn")?.addEventListener("click", () => {
      appData.notifs.forEach(n => n.read = true);
      storage.set(STORAGE_KEYS.NOTIFS, appData.notifs);
      renderNotifications();
      showToast("All notifications marked as read", "success");
    });

    // Messages quick header button
    document.getElementById("headerMsgBtn")?.addEventListener("click", () => {
      window.location.hash = "#messages";
      navigateToView("messages");
    });

    // Global Header Search (dynamic filter & jump)
    const headerSearch = document.getElementById("globalHeaderSearch");
    if (headerSearch) {
      headerSearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          openSpotlightSearch(headerSearch.value);
        }
      });
    }

    // Keyboard shortcut Ctrl + K
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSpotlightSearch();
      }
    });

    // Date Range Filter Toolbar
    const dateBtns = document.querySelectorAll("#dateFilterToolbar .date-btn");
    dateBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        dateBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const period = btn.getAttribute("data-period");
        appData.currentPeriod = period;
        updateKpisForPeriod(period);
        showToast(`Dashboard updated for period: ${btn.innerText}`, "success");
      });
    });

    // Close dropdowns on outside click
    document.addEventListener("click", () => {
      closeAllDropdowns();
    });
  }

  function closeAllDropdowns(except = null) {
    const dropdowns = [
      document.getElementById("quickAddMenu"),
      document.getElementById("profileDropdown"),
      document.getElementById("notificationPanel")
    ];
    dropdowns.forEach(d => {
      if (d && d !== except) d.classList.remove("active");
    });
  }

  /* ==========================================================================
     5. KPI CARDS & PERIOD DYNAMIC CALCULATIONS
     ========================================================================== */
  function updateKpisForPeriod(period) {
    const totalRevEl = document.getElementById("kpiTotalRevenue");
    const spendEl = document.getElementById("kpiCampaignSpend");
    const leadsEl = document.getElementById("kpiLeadsGen");
    const convEl = document.getElementById("kpiConvRate");
    const roiEl = document.getElementById("kpiROI");
    const activeCmpEl = document.getElementById("kpiActiveCampaigns");
    const clientAccountsEl = document.getElementById("kpiClientAccounts");
    const qualLeadsEl = document.getElementById("kpiQualifiedLeads");

    let multipliers = {
      today: { rev: 0.035, spend: 0.038, leads: 0.032, roi: 3.1, conv: "8.12%" },
      "7d": { rev: 0.28, spend: 0.26, leads: 0.25, roi: 3.3, conv: "8.45%" },
      "30d": { rev: 1.0, spend: 1.0, leads: 1.0, roi: 3.42, conv: "8.64%" },
      "90d": { rev: 2.85, spend: 2.74, leads: 2.92, roi: 3.58, conv: "8.92%" },
      custom: { rev: 1.45, spend: 1.38, leads: 1.5, roi: 3.48, conv: "8.75%" }
    };

    const m = multipliers[period] || multipliers["30d"];

    if (totalRevEl) totalRevEl.innerText = `$${Math.round(248560 * m.rev).toLocaleString()}`;
    if (spendEl) spendEl.innerText = `$${Math.round(72840 * m.spend).toLocaleString()}`;
    if (leadsEl) leadsEl.innerText = Math.round(18426 * m.leads).toLocaleString();
    if (convEl) convEl.innerText = m.conv;
    if (roiEl) roiEl.innerText = `${m.roi}x`;
    if (activeCmpEl) activeCmpEl.innerText = appData.campaigns.filter(c => c.status === "Active").length;
    if (clientAccountsEl) clientAccountsEl.innerText = appData.clients.length;
    if (qualLeadsEl) qualLeadsEl.innerText = Math.round(7248 * m.leads).toLocaleString();

    renderRevenueChart();
  }

  /* ==========================================================================
     6. HIGH-PRECISION CANVAS CHARTS (REVENUE & CAC/LTV)
     ========================================================================== */
  function renderRevenueChart() {
    const canvas = document.getElementById("revenueAnalyticsCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 35, left: 55 };

    ctx.clearRect(0, 0, width, height);

    // Chart Data depending on range
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revenueData = [140, 165, 182, 175, 210, 228, 245, 260, 248, 275, 290, 315];
    const spendData = [45, 52, 58, 55, 68, 74, 80, 78, 72, 85, 92, 98];
    const profitData = revenueData.map((rev, i) => rev - spendData[i]);

    const maxVal = 350;
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    // Grid lines & Y axis
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    ctx.font = "11px -apple-system, sans-serif";
    ctx.fillStyle = "#64748b";

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const labelVal = `$${Math.round(maxVal - (maxVal / 4) * i)}k`;
      ctx.fillText(labelVal, 10, y + 4);
    }

    // Helper: Draw smooth curve
    function drawCurve(data, strokeColor, fillColor = null) {
      const step = chartW / (data.length - 1);
      const points = data.map((val, idx) => ({
        x: padding.left + idx * step,
        y: padding.top + chartH - (val / maxVal) * chartH
      }));

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2;
        const yc = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

      if (fillColor) {
        ctx.save();
        ctx.lineTo(points[points.length - 1].x, padding.top + chartH);
        ctx.lineTo(points[0].x, padding.top + chartH);
        ctx.closePath();
        ctx.fillStyle = fillColor;
        ctx.fill();
        ctx.restore();
      }

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw points
      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#080a0f";
        ctx.fill();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      });
    }

    // Revenue Gradient Fill
    const revGrad = ctx.createLinearGradient(0, padding.top, 0, height);
    revGrad.addColorStop(0, "rgba(99, 102, 241, 0.35)");
    revGrad.addColorStop(1, "rgba(99, 102, 241, 0.0)");

    drawCurve(revenueData, "#6366f1", revGrad);
    drawCurve(spendData, "#f43f5e");
    drawCurve(profitData, "#10b981");

    // X Axis Labels
    ctx.fillStyle = "#94a3b8";
    const step = chartW / (labels.length - 1);
    labels.forEach((lbl, idx) => {
      const x = padding.left + idx * step;
      ctx.fillText(lbl, x - 10, height - 10);
    });
  }

  function renderCacLtvChart() {
    const canvas = document.getElementById("cacLtvChartCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 20, right: 20, bottom: 35, left: 50 };

    ctx.clearRect(0, 0, width, height);

    const labels = ["Q1-25", "Q2-25", "Q3-25", "Q4-25", "Q1-26", "Q2-26", "Q3-26"];
    const ltvData = [4200, 4800, 5400, 6100, 6900, 7800, 8600];
    const cacData = [1450, 1380, 1250, 1180, 1050, 940, 890];

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;
    const maxVal = 10000;

    // Grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
    }

    // Step lines
    const step = chartW / (labels.length - 1);

    function plotLine(data, color) {
      ctx.beginPath();
      data.forEach((val, idx) => {
        const x = padding.left + idx * step;
        const y = padding.top + chartH - (val / maxVal) * chartH;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    plotLine(ltvData, "#10b981");
    plotLine(cacData, "#f43f5e");

    ctx.fillStyle = "#94a3b8";
    labels.forEach((lbl, idx) => {
      ctx.fillText(lbl, padding.left + idx * step - 14, height - 10);
    });
  }

  /* ==========================================================================
     7. CHANNELS, CAMPAIGNS & LEADS RENDERING & ACTIONS
     ========================================================================== */
  function renderOverviewChannels() {
    const container = document.getElementById("overviewChannelList");
    if (!container) return;

    const channels = [
      { name: "Google Ads (Search & Display)", share: 38, revenue: "$94,450", color: "var(--primary)" },
      { name: "Meta Ads (Instagram & Facebook)", share: 29, revenue: "$72,080", color: "var(--secondary)" },
      { name: "LinkedIn B2B Sponsored", share: 16, revenue: "$39,770", color: "var(--purple-accent)" },
      { name: "Organic Search & SEO", share: 11, revenue: "$27,340", color: "var(--emerald)" },
      { name: "TikTok Viral Paid", share: 6, revenue: "$14,920", color: "var(--rose)" }
    ];

    container.innerHTML = channels.map(ch => `
      <div class="channel-item">
        <div class="channel-info-row">
          <span class="channel-name">
            <span class="legend-dot" style="background: ${ch.color};"></span>
            ${ch.name}
          </span>
          <span><strong>${ch.revenue}</strong> (${ch.share}%)</span>
        </div>
        <div class="channel-bar-bg">
          <div class="channel-bar-fill" style="width: ${ch.share * 2}%; background: ${ch.color};"></div>
        </div>
      </div>
    `).join("");
  }

  function renderCampaigns() {
    const mainBody = document.getElementById("campaignsTableBody");
    const overviewBody = document.getElementById("overviewCampaignsBody");
    const countDisplay = document.getElementById("campaignsCountDisplay");
    const badge = document.getElementById("navActiveCampaignsBadge");

    const activeCount = appData.campaigns.filter(c => c.status === "Active").length;
    if (badge) badge.innerText = activeCount;
    if (countDisplay) countDisplay.innerText = appData.campaigns.length;

    // Render Main Campaigns Table
    if (mainBody) {
      if (appData.campaigns.length === 0) {
        mainBody.innerHTML = `<tr><td colspan="10"><div class="empty-state"><div class="empty-title">No campaigns yet</div><p class="empty-desc">Create your first marketing campaign to track budgets and leads.</p><button class="btn btn-primary" onclick="document.getElementById('openAddCampaignModalBtn').click()">Create Campaign</button></div></td></tr>`;
      } else {
        mainBody.innerHTML = appData.campaigns.map(c => {
          const pct = Math.min(100, Math.round((c.spent / c.budget) * 100));
          const badgeClass = `badge-${c.status.toLowerCase()}`;
          return `
            <tr>
              <td>
                <div style="font-weight: 700; color: var(--text-primary);">${c.name}</div>
              </td>
              <td>${c.client}</td>
              <td><span class="badge ${badgeClass}">${c.status}</span></td>
              <td>$${c.budget.toLocaleString()}</td>
              <td>$${c.spent.toLocaleString()}</td>
              <td style="min-width: 110px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; margin-bottom: 3px;">
                  <span>${pct}%</span>
                </div>
                <div class="channel-bar-bg">
                  <div class="channel-bar-fill" style="width: ${pct}%; background: ${pct > 90 ? 'var(--rose)' : 'var(--primary)'};"></div>
                </div>
              </td>
              <td><strong>${c.leads.toLocaleString()}</strong></td>
              <td>${c.conversions.toLocaleString()}</td>
              <td><span style="color: var(--emerald); font-weight: 700;">${c.roi}x</span></td>
              <td>
                <div class="table-actions">
                  <button class="btn-icon-table" title="Edit Campaign" onclick="window.markoraEditCampaign('${c.id}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                  </button>
                  <button class="btn-icon-table" title="${c.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}" onclick="window.markoraToggleCampaignStatus('${c.id}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      ${c.status === 'Active' ? '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>' : '<polygon points="5 3 19 12 5 21 5 3"></polygon>'}
                    </svg>
                  </button>
                  <button class="btn-icon-table delete-btn" title="Delete Campaign" onclick="window.markoraDeleteCampaign('${c.id}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join("");
      }
    }

    // Render Overview Top Campaigns
    if (overviewBody) {
      overviewBody.innerHTML = appData.campaigns.slice(0, 4).map(c => `
        <tr>
          <td><strong>${c.name}</strong><div style="font-size: 0.72rem; color: var(--text-muted);">${c.client}</div></td>
          <td><span class="badge badge-${c.status.toLowerCase()}">${c.status}</span></td>
          <td>$${c.budget.toLocaleString()}</td>
          <td>$${c.spent.toLocaleString()}</td>
          <td>${c.leads.toLocaleString()}</td>
          <td>${((c.conversions / (c.leads || 1)) * 100).toFixed(1)}%</td>
          <td><strong style="color: var(--emerald);">${c.roi}x</strong></td>
          <td>
            <button class="btn btn-outline btn-sm" onclick="window.location.hash='#campaigns'">Manage</button>
          </td>
        </tr>
      `).join("");
    }
  }

  function renderClients() {
    const container = document.getElementById("clientsGridContainer");
    const countDisplay = document.getElementById("clientsCountDisplay");
    if (countDisplay) countDisplay.innerText = appData.clients.length;

    if (!container) return;

    if (appData.clients.length === 0) {
      container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><div class="empty-title">No client accounts yet</div><p class="empty-desc">Add your enterprise clients to oversee revenue and ongoing campaigns.</p><button class="btn btn-primary" onclick="document.getElementById('openAddClientModalBtn').click()">Add Client</button></div>`;
      return;
    }

    container.innerHTML = appData.clients.map(cli => `
      <div class="client-card">
        <div>
          <div class="card-meta-row">
            <span class="badge badge-active">${cli.status}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${cli.industry}</span>
          </div>
          <h3 class="card-title">${cli.company}</h3>
          <p class="card-subtitle">Account Manager: <strong>${cli.manager}</strong></p>
          
          <div class="card-stats-grid">
            <div class="stat-item">
              <span class="stat-label">Active Campaigns</span>
              <span class="stat-value">${cli.activeCampaigns}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Monthly Spend</span>
              <span class="stat-value">$${cli.monthlySpend.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Total Revenue</span>
              <span class="stat-value" style="color: var(--emerald);">$${cli.totalRevenue.toLocaleString()}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Health Score</span>
              <span class="stat-value" style="color: var(--primary-light);">98%</span>
            </div>
          </div>
        </div>

        <div class="card-footer-actions">
          <button class="btn btn-secondary btn-sm" onclick="window.markoraMessageClient('${cli.company}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Message</span>
          </button>
          <div style="display: flex; gap: 4px;">
            <button class="btn-icon-table" title="Edit Client" onclick="window.markoraEditClient('${cli.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon-table delete-btn" title="Delete Client" onclick="window.markoraDeleteClient('${cli.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    `).join("");
  }

  function renderLeads() {
    const tbody = document.getElementById("leadsTableBody");
    const countDisplay = document.getElementById("leadsCountDisplay");
    if (countDisplay) countDisplay.innerText = appData.leads.length;

    if (!tbody) return;

    if (appData.leads.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><div class="empty-title">No leads in pipeline</div><p class="empty-desc">Capture incoming leads or add one manually to start tracking conversion.</p><button class="btn btn-primary" onclick="document.getElementById('openAddLeadModalBtn').click()">Add Lead</button></div></td></tr>`;
      return;
    }

    tbody.innerHTML = appData.leads.map(ld => {
      let statusClass = "badge-active";
      if (ld.status === "New") statusClass = "badge-review";
      if (ld.status === "Proposal") statusClass = "badge-completed";
      if (ld.status === "Won") statusClass = "badge-active";
      if (ld.status === "Lost") statusClass = "badge-danger";

      return `
        <tr>
          <td>
            <div class="table-avatar-cell">
              <div class="table-avatar">${ld.name.split(" ").map(n => n[0]).join("")}</div>
              <div>
                <div style="font-weight: 700;">${ld.name}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${ld.company}</div>
              </div>
            </div>
          </td>
          <td>${ld.company}</td>
          <td><span class="badge badge-gray">${ld.source}</span></td>
          <td><span style="font-size: 0.8rem; color: var(--text-secondary);">${ld.campaign}</span></td>
          <td>
            <select class="select-filter-field" style="height: 28px; padding: 2px 8px; font-size: 0.75rem;" onchange="window.markoraUpdateLeadStatus('${ld.id}', this.value)">
              <option value="New" ${ld.status === 'New' ? 'selected' : ''}>New</option>
              <option value="Contacted" ${ld.status === 'Contacted' ? 'selected' : ''}>Contacted</option>
              <option value="Qualified" ${ld.status === 'Qualified' ? 'selected' : ''}>Qualified</option>
              <option value="Proposal" ${ld.status === 'Proposal' ? 'selected' : ''}>Proposal</option>
              <option value="Won" ${ld.status === 'Won' ? 'selected' : ''}>Won</option>
              <option value="Lost" ${ld.status === 'Lost' ? 'selected' : ''}>Lost</option>
            </select>
          </td>
          <td><strong style="color: var(--emerald);">$${ld.value.toLocaleString()}</strong></td>
          <td>${ld.owner}</td>
          <td style="font-size: 0.76rem; color: var(--text-muted);">${ld.lastContact}</td>
          <td>
            <div class="table-actions">
              <button class="btn-icon-table" title="Edit Lead" onclick="window.markoraEditLead('${ld.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="btn-icon-table delete-btn" title="Delete Lead" onclick="window.markoraDeleteLead('${ld.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  /* ==========================================================================
     8. SOCIAL MEDIA, SEO, CONTENT & TASKS RENDERING
     ========================================================================== */
  function renderSocialMedia() {
    const grid = document.getElementById("socialCardsGrid");
    const postsBody = document.getElementById("topSocialPostsBody");
    if (!grid) return;

    const platforms = [
      { name: "Instagram", followers: "148,200", growth: "+14.8%", reach: "840K", eng: "5.4%", color: "#E1306C" },
      { name: "LinkedIn", followers: "42,600", growth: "+22.4%", reach: "320K", eng: "6.8%", color: "#0077B5" },
      { name: "TikTok", followers: "284,500", growth: "+38.2%", reach: "1.9M", eng: "8.2%", color: "#00F2FE" },
      { name: "YouTube", followers: "68,900", growth: "+8.9%", reach: "480K", eng: "7.1%", color: "#FF0000" },
      { name: "Facebook", followers: "92,400", growth: "+3.4%", reach: "510K", eng: "3.2%", color: "#1877F2" },
      { name: "X (Twitter)", followers: "36,800", growth: "+11.2%", reach: "240K", eng: "4.1%", color: "#1DA1F2" }
    ];

    grid.innerHTML = platforms.map(p => `
      <div class="social-card">
        <div class="social-card-top">
          <div class="social-brand">
            <div class="social-icon-badge" style="background: ${p.color};">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle></svg>
            </div>
            <span>${p.name}</span>
          </div>
          <span class="badge badge-active">${p.growth}</span>
        </div>
        <div>
          <div style="font-size: 1.6rem; font-weight: 800;">${p.followers}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">Audience Size</div>
        </div>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 8px; font-size: 0.78rem;">
          <span>Monthly Reach: <strong>${p.reach}</strong></span>
          <span>Eng. Rate: <strong style="color: var(--emerald);">${p.eng}</strong></span>
        </div>
      </div>
    `).join("");

    if (postsBody) {
      postsBody.innerHTML = `
        <tr>
          <td><strong>How We Scaled SaaS Leads by 340% (Infographic)</strong></td>
          <td><span class="badge badge-review">LinkedIn</span></td>
          <td>184,000</td>
          <td>295,000</td>
          <td><span style="color: var(--emerald); font-weight: 700;">8.4%</span></td>
          <td>1,240</td>
          <td><strong style="color: var(--emerald);">+$14,200</strong></td>
        </tr>
        <tr>
          <td><strong>Behind the Scenes: High-Volume Ad Creative Sprint</strong></td>
          <td><span class="badge badge-completed">Instagram</span></td>
          <td>210,000</td>
          <td>340,000</td>
          <td><span style="color: var(--emerald); font-weight: 700;">6.2%</span></td>
          <td>3,840</td>
          <td><strong style="color: var(--emerald);">+$8,900</strong></td>
        </tr>
        <tr>
          <td><strong>Stop Wasting Budget on Low-Intent Keywords (Shorts)</strong></td>
          <td><span class="badge badge-danger">YouTube</span></td>
          <td>95,000</td>
          <td>162,000</td>
          <td><span style="color: var(--emerald); font-weight: 700;">9.1%</span></td>
          <td>890</td>
          <td><strong style="color: var(--emerald);">+$19,400</strong></td>
        </tr>
      `;
    }
  }

  function renderSeo() {
    const tbody = document.getElementById("seoKeywordsBody");
    if (!tbody) return;

    const keywords = [
      { kw: "b2b saas marketing agency", pos: 1, vol: "14,800", diff: "Hard (78)", traffic: "5,820", change: "+2", intent: "Commercial" },
      { kw: "best marketing dashboard software", pos: 2, vol: "22,400", diff: "Medium (54)", traffic: "7,400", change: "+4", intent: "Transactional" },
      { kw: "enterprise client acquisition strategy", pos: 3, vol: "8,900", diff: "Medium (61)", traffic: "2,980", change: "+1", intent: "Informational" },
      { kw: "google ads conversion rate benchmark 2026", pos: 4, vol: "18,200", diff: "Hard (82)", traffic: "4,610", change: "-1", intent: "Informational" },
      { kw: "performance marketing agency pricing", pos: 1, vol: "11,500", diff: "Hard (74)", traffic: "4,900", change: "+3", intent: "Commercial" }
    ];

    tbody.innerHTML = keywords.map(k => `
      <tr>
        <td><strong>${k.kw}</strong></td>
        <td><span class="badge badge-active">#${k.pos}</span></td>
        <td>${k.vol}</td>
        <td>${k.diff}</td>
        <td><strong>${k.traffic}</strong></td>
        <td><span style="color: ${k.change.startsWith('+') ? 'var(--emerald)' : 'var(--rose)'}; font-weight: 700;">${k.change}</span></td>
        <td><span class="badge badge-gray">${k.intent}</span></td>
      </tr>
    `).join("");
  }

  function renderContent() {
    const tbody = document.getElementById("contentTableBody");
    const countDisplay = document.getElementById("contentCountDisplay");
    if (countDisplay) countDisplay.innerText = appData.content.length;
    if (!tbody) return;

    if (appData.content.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-title">No content published yet</div><button class="btn btn-primary" onclick="document.getElementById('openAddContentModalBtn').click()">Create Content</button></div></td></tr>`;
      return;
    }

    tbody.innerHTML = appData.content.map(c => `
      <tr>
        <td><strong>${c.title}</strong></td>
        <td><span class="badge badge-review">${c.type}</span></td>
        <td>${c.platform}</td>
        <td>${c.author}</td>
        <td><span class="badge badge-${c.status === 'Published' ? 'active' : c.status === 'Scheduled' ? 'completed' : 'paused'}">${c.status}</span></td>
        <td style="font-size: 0.78rem; color: var(--text-muted);">${c.date}</td>
        <td style="font-size: 0.8rem;">${c.performance}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon-table" title="Preview" onclick="window.markoraPreviewContent('${c.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
            <button class="btn-icon-table" title="Edit" onclick="window.markoraEditContent('${c.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon-table delete-btn" title="Delete" onclick="window.markoraDeleteContent('${c.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  function renderTasks() {
    const container = document.getElementById("tasksColumnsContainer");
    const countDisplay = document.getElementById("tasksRemainingDisplay");
    const navBadge = document.getElementById("navPendingTasksBadge");

    const remaining = appData.tasks.filter(t => !t.completed).length;
    if (countDisplay) countDisplay.innerText = remaining;
    if (navBadge) navBadge.innerText = remaining;

    if (!container) return;

    const columns = [
      { id: "todo", title: "To Do / Backlog", badge: "var(--text-muted)" },
      { id: "inprogress", title: "In Progress", badge: "var(--secondary)" },
      { id: "review", title: "Review & Quality", badge: "var(--amber)" },
      { id: "completed", title: "Completed", badge: "var(--emerald)" }
    ];

    container.innerHTML = columns.map(col => {
      const colTasks = appData.tasks.filter(t => t.column === col.id);
      return `
        <div class="task-column">
          <div class="task-col-header">
            <span class="task-col-title">
              <span class="legend-dot" style="background: ${col.badge};"></span>
              ${col.title}
            </span>
            <span class="badge badge-gray">${colTasks.length}</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; min-height: 120px;">
            ${colTasks.length === 0 ? `<div style="font-size: 0.75rem; color: var(--text-dim); text-align: center; padding: 20px 0;">No tasks in this lane</div>` : ''}
            ${colTasks.map(t => `
              <div class="task-card" style="${t.completed ? 'opacity: 0.65;' : ''}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <span class="task-priority priority-${t.priority.toLowerCase()}">${t.priority}</span>
                  <div style="display: flex; gap: 4px;">
                    <button class="btn-icon-table" style="width: 22px; height: 22px;" title="Edit" onclick="window.markoraEditTask('${t.id}')">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="btn-icon-table delete-btn" style="width: 22px; height: 22px;" title="Delete" onclick="window.markoraDeleteTask('${t.id}')">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                  </div>
                </div>

                <div class="task-card-title" style="${t.completed ? 'text-decoration: line-through;' : ''}">${t.title}</div>

                <div class="task-footer">
                  <label class="task-checkbox-row" style="cursor: pointer;">
                    <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="window.markoraToggleTaskComplete('${t.id}')">
                    <span>${t.completed ? 'Done' : 'Mark Done'}</span>
                  </label>
                  <span>Due ${t.dueDate || 'Soon'}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");
  }

  function renderCalendar() {
    const grid = document.getElementById("calendarDaysGrid");
    if (!grid) return;

    let cellsHtml = "";
    // Render 35 calendar cells (September 2026 starts on Tuesday, day 2)
    const daysInMonth = 30;
    const startDayOffset = 2; // Tuesday

    // Previous month filler
    for (let i = 0; i < startDayOffset; i++) {
      cellsHtml += `<div class="calendar-day-cell other-month"><span class="day-number">${31 - startDayOffset + i + 1}</span></div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = appData.events.filter(e => e.day === day);
      const isToday = day === 11; // Demo today
      cellsHtml += `
        <div class="calendar-day-cell ${isToday ? 'today' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="day-number" style="${isToday ? 'color: var(--primary-light); font-weight: 800;' : ''}">${day} ${isToday ? '• Today' : ''}</span>
            <button style="font-size: 0.75rem; color: var(--text-muted); cursor: pointer;" title="Add event here" onclick="window.markoraQuickAddEventToDay(${day})">+</button>
          </div>
          ${dayEvents.map(e => `
            <div class="calendar-event-tag ${e.type}" title="${e.title} (Click to remove)" onclick="window.markoraDeleteEvent('${e.id}')">
              ${e.title}
            </div>
          `).join("")}
        </div>
      `;
    }

    // Next month filler
    const totalRendered = startDayOffset + daysInMonth;
    const remainingFiller = 35 - totalRendered;
    for (let i = 1; i <= remainingFiller; i++) {
      cellsHtml += `<div class="calendar-day-cell other-month"><span class="day-number">${i}</span></div>`;
    }

    grid.innerHTML = cellsHtml;
  }

  function renderAdvertising() {
    const tbody = document.getElementById("adChannelsTableBody");
    if (!tbody) return;

    const channels = [
      { name: "Google Ads (Performance Max & Search)", spend: 38100, reach: "940,000", clicks: "48,200", ctr: "5.12%", conv: 380, cpa: "$100.20", rev: "$152,000", roi: "3.98x" },
      { name: "Meta Ads (Instagram Carousel & Reels)", spend: 22400, reach: "1,240,000", clicks: "39,100", ctr: "3.15%", conv: 246, cpa: "$91.05", rev: "$85,120", roi: "3.80x" },
      { name: "LinkedIn Sponsored InMail & Feed", spend: 15000, reach: "210,000", clicks: "9,800", ctr: "4.66%", conv: 144, cpa: "$104.10", rev: "$69,000", roi: "4.60x" },
      { name: "TikTok Spark Ads & Creator Boost", spend: 6500, reach: "1,820,000", clicks: "41,000", ctr: "2.25%", conv: 78, cpa: "$83.30", rev: "$15,600", roi: "2.40x" }
    ];

    tbody.innerHTML = channels.map(c => `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>$${c.spend.toLocaleString()}</td>
        <td>${c.reach}</td>
        <td>${c.clicks}</td>
        <td>${c.ctr}</td>
        <td><strong>${c.conv}</strong></td>
        <td>${c.cpa}</td>
        <td><strong style="color: var(--emerald);">${c.rev}</strong></td>
        <td><span class="badge badge-active">${c.roi}</span></td>
      </tr>
    `).join("");
  }

  function renderTeam() {
    const tbody = document.getElementById("teamTableBody");
    if (!tbody) return;

    tbody.innerHTML = appData.team.map(m => `
      <tr>
        <td>
          <div class="table-avatar-cell">
            <div class="table-avatar">${m.name.split(" ").map(n => n[0]).join("")}</div>
            <div>
              <div style="font-weight: 700;">${m.name}</div>
            </div>
          </div>
        </td>
        <td>${m.role}</td>
        <td><strong>${m.projects}</strong> clients</td>
        <td>${m.tasks} tasks</td>
        <td><span style="color: var(--primary-light); font-weight: 700;">★ ${m.rating}</span></td>
        <td><span class="badge badge-active">${m.status}</span></td>
        <td>
          <div class="table-actions">
            <button class="btn-icon-table" title="Edit Member" onclick="window.markoraEditMember('${m.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="btn-icon-table delete-btn" title="Remove" onclick="window.markoraDeleteMember('${m.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  function renderReports() {
    const container = document.getElementById("reportsGridContainer");
    if (!container) return;

    const reports = [
      { id: "rep-camp", title: "Campaign ROI & Spend Report", desc: "Comprehensive breakdown of multi-channel conversions, CAC and net ROAS.", type: "Campaign" },
      { id: "rep-cli", title: "Client Monthly Performance Brief", desc: "Executive presentation format with lead volume and revenue growth metrics.", type: "Client" },
      { id: "rep-rev", title: "Agency Revenue & Margin Audit", desc: "Consolidated agency retainers, media commissions, and profit margins.", type: "Revenue" },
      { id: "rep-seo", title: "Search Engine Optimization Audit", desc: "Keyword movements, backlinks velocity, and domain authority status.", type: "SEO" },
      { id: "rep-soc", title: "Social Media Growth Intelligence", desc: "Cross-platform audience expansion, viral rate, and engagement benchmarks.", type: "Social" },
      { id: "rep-ad", title: "Paid Advertising Attribution", desc: "First-touch, last-touch, and linear model comparisons across Google & Meta.", type: "Advertising" }
    ];

    container.innerHTML = reports.map(r => `
      <div class="panel-card">
        <span class="badge badge-completed" style="width: fit-content; margin-bottom: 12px;">${r.type} Intelligence</span>
        <h3 style="font-size: 1.15rem; margin-bottom: 6px;">${r.title}</h3>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 18px; flex: 1;">${r.desc}</p>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" onclick="window.markoraPreviewReport('${r.type}')">Preview</button>
          <button class="btn btn-primary btn-sm" onclick="window.markoraDownloadReport('${r.type}')">Download CSV</button>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     9. MESSAGES INTERFACE
     ========================================================================== */
  function renderConversations() {
    const list = document.getElementById("conversationsList");
    if (!list) return;

    list.innerHTML = appData.conversations.map(conv => {
      const lastMsg = conv.messages[conv.messages.length - 1];
      const isActive = conv.id === appData.activeChatId;
      return `
        <div class="conv-item ${isActive ? 'active' : ''}" onclick="window.markoraSelectChat('${conv.id}')">
          <div class="conv-avatar">
            ${conv.avatar}
            ${conv.online ? '<div class="online-dot"></div>' : ''}
          </div>
          <div class="conv-details">
            <div class="conv-top-row">
              <span class="conv-name">${conv.name}</span>
              <span class="conv-time">${lastMsg ? lastMsg.time : ''}</span>
            </div>
            <div class="conv-preview">${lastMsg ? lastMsg.text : 'No messages yet'}</div>
          </div>
        </div>
      `;
    }).join("");

    renderActiveChat();
  }

  function renderActiveChat() {
    const conv = appData.conversations.find(c => c.id === appData.activeChatId) || appData.conversations[0];
    if (!conv) return;

    const headerName = document.getElementById("chatHeaderName");
    const headerAvatar = document.getElementById("chatHeaderAvatar");
    const headerStatus = document.getElementById("chatHeaderStatus");
    const body = document.getElementById("chatMessageBody");

    if (headerName) headerName.innerText = conv.name;
    if (headerAvatar) headerAvatar.innerText = conv.avatar;
    if (headerStatus) headerStatus.innerText = conv.online ? `Online • ${conv.role}` : `Offline • ${conv.role}`;

    if (body) {
      body.innerHTML = conv.messages.map(m => `
        <div class="msg-bubble ${m.sender === 'me' ? 'msg-sent' : 'msg-received'}">
          <div>${m.text}</div>
          <div class="msg-meta">${m.time}</div>
        </div>
      `).join("");
      body.scrollTop = body.scrollHeight;
    }
  }

  /* ==========================================================================
     10. NOTIFICATIONS SYSTEM
     ========================================================================== */
  function renderNotifications() {
    const container = document.getElementById("notifListContainer");
    const countEl = document.getElementById("unreadNotifCount");
    const dot = document.getElementById("notifBadgeDot");

    const unreadCount = appData.notifs.filter(n => !n.read).length;
    if (countEl) countEl.innerText = unreadCount;
    if (dot) dot.style.display = unreadCount > 0 ? "block" : "none";

    if (!container) return;

    if (appData.notifs.length === 0) {
      container.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">No notifications right now</div>`;
      return;
    }

    container.innerHTML = appData.notifs.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}">
        <div class="notif-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        </div>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="notif-time">${n.time}</span>
            <div class="notif-actions-row">
              ${!n.read ? `<button class="notif-btn-mini" onclick="window.markoraMarkNotifRead('${n.id}')">Mark read</button>` : ''}
              <button class="notif-btn-mini" style="color: var(--rose);" onclick="window.markoraDeleteNotif('${n.id}')">Dismiss</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  /* ==========================================================================
     11. MODAL MANAGEMENT SYSTEM
     ========================================================================== */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("active");
    // Focus first input
    const firstInput = modal.querySelector("input, select, textarea");
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("active");
  }

  function setupModals() {
    // Universal close triggers
    document.querySelectorAll(".modal-close-trigger").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.closest(".modal-overlay")?.classList.remove("active");
      });
    });

    // Close on backdrop click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("active");
      });
    });

    // ESC key closes modals
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.active").forEach(m => m.classList.remove("active"));
        document.querySelectorAll(".dropdown-menu.active").forEach(d => d.classList.remove("active"));
      }
    });

    // Modal Trigger Buttons
    document.getElementById("openAddCampaignModalBtn")?.addEventListener("click", () => openCampaignModal());
    document.getElementById("overviewNewCampaignBtn")?.addEventListener("click", () => openCampaignModal());
    document.getElementById("openAddClientModalBtn")?.addEventListener("click", () => openClientModal());
    document.getElementById("openAddLeadModalBtn")?.addEventListener("click", () => openLeadModal());
    document.getElementById("openAddTaskModalBtn")?.addEventListener("click", () => openTaskModal());
    document.getElementById("openAddContentModalBtn")?.addEventListener("click", () => openContentModal());
    document.getElementById("openAddEventModalBtn")?.addEventListener("click", () => openEventModal());
    document.getElementById("openAddMemberModalBtn")?.addEventListener("click", () => {
      showToast("Team invitation form opened", "success");
    });

    // Forms Submissions
    document.getElementById("campaignForm")?.addEventListener("submit", handleCampaignSubmit);
    document.getElementById("clientForm")?.addEventListener("submit", handleClientSubmit);
    document.getElementById("leadForm")?.addEventListener("submit", handleLeadSubmit);
    document.getElementById("taskForm")?.addEventListener("submit", handleTaskSubmit);
    document.getElementById("contentForm")?.addEventListener("submit", handleContentSubmit);
    document.getElementById("eventForm")?.addEventListener("submit", handleEventSubmit);
    document.getElementById("chatMessageForm")?.addEventListener("submit", handleChatSubmit);
    document.getElementById("authForm")?.addEventListener("submit", handleAuthSubmit);
    document.getElementById("demoDirectLoginBtn")?.addEventListener("click", () => {
      closeModal("authOverlay");
      showToast("Signed in as Marcus Vance (Managing Director)", "success");
    });
  }

  /* Form Handlers */
  function openCampaignModal(campaignToEdit = null) {
    const form = document.getElementById("campaignForm");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("campaignModalTitle");
    const idEl = document.getElementById("campaignFormId");

    if (campaignToEdit) {
      titleEl.innerText = "Edit Marketing Campaign";
      idEl.value = campaignToEdit.id;
      document.getElementById("campaignName").value = campaignToEdit.name;
      document.getElementById("campaignClient").value = campaignToEdit.client;
      document.getElementById("campaignStatus").value = campaignToEdit.status;
      document.getElementById("campaignBudget").value = campaignToEdit.budget;
      document.getElementById("campaignSpent").value = campaignToEdit.spent;
      document.getElementById("campaignLeads").value = campaignToEdit.leads;
      document.getElementById("campaignRoi").value = campaignToEdit.roi;
    } else {
      titleEl.innerText = "Create Marketing Campaign";
      idEl.value = "";
    }
    openModal("campaignModal");
  }

  function handleCampaignSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("campaignFormId").value;
    const name = document.getElementById("campaignName").value.trim();
    const client = document.getElementById("campaignClient").value.trim();
    const status = document.getElementById("campaignStatus").value;
    const budget = parseFloat(document.getElementById("campaignBudget").value) || 10000;
    const spent = parseFloat(document.getElementById("campaignSpent").value) || 0;
    const leads = parseInt(document.getElementById("campaignLeads").value) || 0;
    const roi = parseFloat(document.getElementById("campaignRoi").value) || 3.0;

    if (!name || !client) {
      showToast("Please fill in required fields", "warning");
      return;
    }

    if (id) {
      const idx = appData.campaigns.findIndex(c => c.id === id);
      if (idx !== -1) {
        appData.campaigns[idx] = { ...appData.campaigns[idx], name, client, status, budget, spent, leads, roi };
        showToast("Campaign updated successfully", "success");
      }
    } else {
      const newCamp = {
        id: "cmp-" + Date.now(),
        name,
        client,
        status,
        budget,
        spent,
        leads,
        conversions: Math.round(leads * 0.12),
        roi
      };
      appData.campaigns.unshift(newCamp);
      showToast(`Campaign "${name}" launched!`, "success");
    }

    storage.set(STORAGE_KEYS.CAMPAIGNS, appData.campaigns);
    renderCampaigns();
    closeModal("campaignModal");
  }

  function openClientModal(clientToEdit = null) {
    const form = document.getElementById("clientForm");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("clientModalTitle");
    const idEl = document.getElementById("clientFormId");

    if (clientToEdit) {
      titleEl.innerText = "Edit Client Account";
      idEl.value = clientToEdit.id;
      document.getElementById("clientCompany").value = clientToEdit.company;
      document.getElementById("clientIndustry").value = clientToEdit.industry;
      document.getElementById("clientManager").value = clientToEdit.manager;
      document.getElementById("clientSpend").value = clientToEdit.monthlySpend;
      document.getElementById("clientRevenue").value = clientToEdit.totalRevenue;
      document.getElementById("clientStatus").value = clientToEdit.status;
    } else {
      titleEl.innerText = "Add New Client Account";
      idEl.value = "";
    }
    openModal("clientModal");
  }

  function handleClientSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("clientFormId").value;
    const company = document.getElementById("clientCompany").value.trim();
    const industry = document.getElementById("clientIndustry").value;
    const manager = document.getElementById("clientManager").value.trim() || "Marcus Vance";
    const monthlySpend = parseFloat(document.getElementById("clientSpend").value) || 10000;
    const totalRevenue = parseFloat(document.getElementById("clientRevenue").value) || 40000;
    const status = document.getElementById("clientStatus").value;

    if (!company) {
      showToast("Company name is required", "warning");
      return;
    }

    if (id) {
      const idx = appData.clients.findIndex(c => c.id === id);
      if (idx !== -1) {
        appData.clients[idx] = { ...appData.clients[idx], company, industry, manager, monthlySpend, totalRevenue, status };
        showToast("Client account updated", "success");
      }
    } else {
      const newCli = {
        id: "cli-" + Date.now(),
        company,
        industry,
        manager,
        activeCampaigns: 1,
        monthlySpend,
        totalRevenue,
        status
      };
      appData.clients.unshift(newCli);
      showToast(`Client "${company}" added!`, "success");
    }

    storage.set(STORAGE_KEYS.CLIENTS, appData.clients);
    renderClients();
    closeModal("clientModal");
  }

  function openLeadModal(leadToEdit = null) {
    const form = document.getElementById("leadForm");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("leadModalTitle");
    const idEl = document.getElementById("leadFormId");

    if (leadToEdit) {
      titleEl.innerText = "Edit Lead Opportunity";
      idEl.value = leadToEdit.id;
      document.getElementById("leadName").value = leadToEdit.name;
      document.getElementById("leadCompany").value = leadToEdit.company;
      document.getElementById("leadSource").value = leadToEdit.source;
      document.getElementById("leadStatus").value = leadToEdit.status;
      document.getElementById("leadValue").value = leadToEdit.value;
      document.getElementById("leadOwner").value = leadToEdit.owner;
    } else {
      titleEl.innerText = "Capture New Lead";
      idEl.value = "";
    }
    openModal("leadModal");
  }

  function handleLeadSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("leadFormId").value;
    const name = document.getElementById("leadName").value.trim();
    const company = document.getElementById("leadCompany").value.trim();
    const source = document.getElementById("leadSource").value;
    const status = document.getElementById("leadStatus").value;
    const value = parseFloat(document.getElementById("leadValue").value) || 20000;
    const owner = document.getElementById("leadOwner").value.trim() || "Marcus Vance";

    if (!name || !company) {
      showToast("Please enter lead name & company", "warning");
      return;
    }

    if (id) {
      const idx = appData.leads.findIndex(l => l.id === id);
      if (idx !== -1) {
        appData.leads[idx] = { ...appData.leads[idx], name, company, source, status, value, owner };
        showToast("Lead updated", "success");
      }
    } else {
      const newLead = {
        id: "ld-" + Date.now(),
        name,
        company,
        source,
        campaign: "Inbound Capture",
        status,
        value,
        owner,
        lastContact: "Just now"
      };
      appData.leads.unshift(newLead);
      showToast(`Lead for "${name}" captured!`, "success");
    }

    storage.set(STORAGE_KEYS.LEADS, appData.leads);
    renderLeads();
    closeModal("leadModal");
  }

  function openTaskModal(taskToEdit = null) {
    const form = document.getElementById("taskForm");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("taskModalTitle");
    const idEl = document.getElementById("taskFormId");

    if (taskToEdit) {
      titleEl.innerText = "Edit Task";
      idEl.value = taskToEdit.id;
      document.getElementById("taskTitle").value = taskToEdit.title;
      document.getElementById("taskPriority").value = taskToEdit.priority;
      document.getElementById("taskColumn").value = taskToEdit.column;
      document.getElementById("taskAssignee").value = taskToEdit.assignee;
      document.getElementById("taskDueDate").value = taskToEdit.dueDate;
    } else {
      titleEl.innerText = "Create Team Task";
      idEl.value = "";
    }
    openModal("taskModal");
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("taskFormId").value;
    const title = document.getElementById("taskTitle").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const column = document.getElementById("taskColumn").value;
    const assignee = document.getElementById("taskAssignee").value.trim() || "Marcus Vance";
    const dueDate = document.getElementById("taskDueDate").value || "2026-09-30";

    if (!title) {
      showToast("Task description required", "warning");
      return;
    }

    if (id) {
      const idx = appData.tasks.findIndex(t => t.id === id);
      if (idx !== -1) {
        appData.tasks[idx] = { ...appData.tasks[idx], title, priority, column, assignee, dueDate };
        showToast("Task updated", "success");
      }
    } else {
      const newTask = {
        id: "tsk-" + Date.now(),
        title,
        priority,
        column,
        assignee,
        dueDate,
        completed: column === "completed"
      };
      appData.tasks.push(newTask);
      showToast("New task created", "success");
    }

    storage.set(STORAGE_KEYS.TASKS, appData.tasks);
    renderTasks();
    closeModal("taskModal");
  }

  function openContentModal(contentToEdit = null) {
    const form = document.getElementById("contentForm");
    if (!form) return;
    form.reset();

    const titleEl = document.getElementById("contentModalTitle");
    const idEl = document.getElementById("contentFormId");

    if (contentToEdit) {
      titleEl.innerText = "Edit Content Piece";
      idEl.value = contentToEdit.id;
      document.getElementById("contentTitle").value = contentToEdit.title;
      document.getElementById("contentType").value = contentToEdit.type;
      document.getElementById("contentPlatform").value = contentToEdit.platform;
      document.getElementById("contentAuthor").value = contentToEdit.author;
      document.getElementById("contentStatus").value = contentToEdit.status;
    } else {
      titleEl.innerText = "Create Content Piece";
      idEl.value = "";
    }
    openModal("contentModal");
  }

  function handleContentSubmit(e) {
    e.preventDefault();
    const id = document.getElementById("contentFormId").value;
    const title = document.getElementById("contentTitle").value.trim();
    const type = document.getElementById("contentType").value;
    const platform = document.getElementById("contentPlatform").value.trim();
    const author = document.getElementById("contentAuthor").value.trim();
    const status = document.getElementById("contentStatus").value;

    if (!title) {
      showToast("Content title required", "warning");
      return;
    }

    if (id) {
      const idx = appData.content.findIndex(c => c.id === id);
      if (idx !== -1) {
        appData.content[idx] = { ...appData.content[idx], title, type, platform, author, status };
        showToast("Content piece updated", "success");
      }
    } else {
      const newPiece = {
        id: "cnt-" + Date.now(),
        title,
        type,
        platform,
        author,
        status,
        date: "Sep 2026",
        performance: "Draft queued"
      };
      appData.content.unshift(newPiece);
      showToast("Content asset created", "success");
    }

    storage.set(STORAGE_KEYS.CONTENT, appData.content);
    renderContent();
    closeModal("contentModal");
  }

  function openEventModal(defaultDay = 15) {
    const form = document.getElementById("eventForm");
    if (!form) return;
    form.reset();
    document.getElementById("eventDay").value = defaultDay;
    openModal("eventModal");
  }

  function handleEventSubmit(e) {
    e.preventDefault();
    const title = document.getElementById("eventTitle").value.trim();
    const type = document.getElementById("eventType").value;
    const day = parseInt(document.getElementById("eventDay").value) || 15;

    if (!title) return;

    const newEvt = { id: "evt-" + Date.now(), title, type, day };
    appData.events.push(newEvt);
    storage.set(STORAGE_KEYS.EVENTS, appData.events);
    renderCalendar();
    closeModal("eventModal");
    showToast(`Milestone scheduled for Sep ${day}`, "success");
  }

  function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("chatTextInput");
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    const conv = appData.conversations.find(c => c.id === appData.activeChatId);
    if (!conv) return;

    const nowStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    conv.messages.push({ sender: "me", text, time: nowStr });
    input.value = "";
    renderActiveChat();
    renderConversations();

    // Simulate realistic intelligent agent reply after 1s
    setTimeout(() => {
      const replies = [
        "Received loud and clear! Updating the creative flight and ROAS targets accordingly.",
        "Confirmed. I have logged these metrics into our client reporting sync.",
        "Understood Marcus. Running the A/B variation now to optimize conversion rate.",
        "Great directive. Will have the updated creative assets posted within the hour."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      conv.messages.push({ sender: "them", text: randomReply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) });
      storage.set(STORAGE_KEYS.MESSAGES, appData.conversations);
      renderActiveChat();
      renderConversations();
    }, 1000);
  }

  function openAuthModal() {
    openModal("authOverlay");
  }

  function handleAuthSubmit(e) {
    e.preventDefault();
    closeModal("authOverlay");
    showToast("Signed in as Marcus Vance (Managing Director)", "success");
  }

  /* ==========================================================================
     12. SPOTLIGHT SEARCH (Ctrl + K)
     ========================================================================== */
  function openSpotlightSearch(initialQuery = "") {
    openModal("searchModal");
    const input = document.getElementById("spotlightSearchInput");
    if (input) {
      input.value = initialQuery;
      input.focus();
      runSpotlightSearch(initialQuery);
    }
  }

  function runSpotlightSearch(query = "") {
    const resultsBox = document.getElementById("spotlightResultsBox");
    if (!resultsBox) return;

    const q = query.toLowerCase().trim();
    const matches = [];

    // Search campaigns
    appData.campaigns.forEach(c => {
      if (!q || c.name.toLowerCase().includes(q) || c.client.toLowerCase().includes(q)) {
        matches.push({ title: c.name, sub: `Campaign • ${c.client} • $${c.budget.toLocaleString()}`, type: "Campaign", view: "campaigns" });
      }
    });

    // Search clients
    appData.clients.forEach(cli => {
      if (!q || cli.company.toLowerCase().includes(q) || cli.industry.toLowerCase().includes(q)) {
        matches.push({ title: cli.company, sub: `Client • ${cli.industry} • ${cli.manager}`, type: "Client", view: "clients" });
      }
    });

    // Search leads
    appData.leads.forEach(ld => {
      if (!q || ld.name.toLowerCase().includes(q) || ld.company.toLowerCase().includes(q)) {
        matches.push({ title: ld.name, sub: `Lead • ${ld.company} • $${ld.value.toLocaleString()}`, type: "Lead", view: "leads" });
      }
    });

    // Search tasks
    appData.tasks.forEach(t => {
      if (!q || t.title.toLowerCase().includes(q)) {
        matches.push({ title: t.title, sub: `Task • Priority: ${t.priority} • Due: ${t.dueDate}`, type: "Task", view: "tasks" });
      }
    });

    if (matches.length === 0) {
      resultsBox.innerHTML = `<div style="padding: 24px; text-align: center; color: var(--text-muted);">No matching records found for "${query}"</div>`;
      return;
    }

    resultsBox.innerHTML = matches.slice(0, 10).map(m => `
      <div class="search-result-row" onclick="window.markoraJumpToResult('${m.view}')">
        <div class="result-main">
          <span class="result-type-tag">${m.type}</span>
          <div>
            <div class="result-title">${m.title}</div>
            <div class="result-subtitle">${m.sub}</div>
          </div>
        </div>
        <span style="font-size: 0.75rem; color: var(--primary-light);">Jump →</span>
      </div>
    `).join("");
  }

  /* ==========================================================================
     13. REPORT PREVIEWS & CLIENT-SIDE CSV/TXT EXPORTS
     ========================================================================== */
  function previewReport(type) {
    const modalTitle = document.getElementById("reportPreviewTitle");
    const content = document.getElementById("reportPreviewContent");
    if (!modalTitle || !content) return;

    modalTitle.innerText = `${type} Performance Report`;

    let generatedText = `=======================================================
MARKORA™ MARKETING INTELLIGENCE — EXECUTIVE AUDIT
Document Type: ${type} Comprehensive Review
Generated At: ${new Date().toUTCString()}
Agency: MARKORA Global Media • Status: Verified Confidential
=======================================================\n\n`;

    if (type === "Campaign") {
      generatedText += `CAMPAIGN PERFORMANCE SUMMARY (ACTIVE COHORT):
-------------------------------------------------------
Total Active Campaigns: ${appData.campaigns.length}
Aggregated Budget: $${appData.campaigns.reduce((a, b) => a + b.budget, 0).toLocaleString()}
Aggregated Spend:  $${appData.campaigns.reduce((a, b) => a + b.spent, 0).toLocaleString()}
Total Leads Generated: ${appData.campaigns.reduce((a, b) => a + b.leads, 0).toLocaleString()}
Average Account ROI: 3.64x\n\nCAMPAIGN LEDGER:\n`;
      appData.campaigns.forEach(c => {
        generatedText += `• [${c.status}] ${c.name} | Client: ${c.client} | Budget: $${c.budget.toLocaleString()} | Spent: $${c.spent.toLocaleString()} | Leads: ${c.leads} | ROI: ${c.roi}x\n`;
      });
    } else if (type === "Client") {
      generatedText += `CLIENT PORTFOLIO OVERVIEW:\n-------------------------------------------------------\nTotal Retained Clients: ${appData.clients.length}\n`;
      appData.clients.forEach(cli => {
        generatedText += `• ${cli.company} (${cli.industry}) | Monthly: $${cli.monthlySpend.toLocaleString()} | Total Rev: $${cli.totalRevenue.toLocaleString()} | Mgr: ${cli.manager}\n`;
      });
    } else {
      generatedText += `FINANCIAL & KPI OVERVIEW:\n-------------------------------------------------------\nGross Revenue: $248,560\nTotal Advertising Spend: $72,840\nNet Operating Profit: $175,720\nAverage Return On Ad Spend: 3.42x\nRetention Rate: 98.2%\nConversion Rate Benchmark: 8.64%\n`;
    }

    generatedText += `\n=======================================================\nEND OF REPORT — MARKORA INTELLIGENCE ENGINE 2026\n=======================================================`;

    content.innerText = generatedText;
    openModal("reportPreviewModal");
  }

  function downloadReportFile(type = "Executive") {
    let csvContent = "data:text/csv;charset=utf-8,Category,Metric,Value,Status\n";
    csvContent += `Overview,Gross Revenue,$248560,Verified\n`;
    csvContent += `Overview,Ad Spend,$72840,Optimized\n`;
    csvContent += `Overview,Leads Generated,18426,Surpassed\n`;
    csvContent += `Overview,ROI,3.42x,Above Benchmark\n`;

    appData.campaigns.forEach(c => {
      csvContent += `Campaign,"${c.name} - ${c.client}",$${c.spent} spent,${c.status}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MARKORA_${type}_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloaded MARKORA_${type}_Report.csv`, "success");
  }

  /* ==========================================================================
     14. SETTINGS & THEME MANAGEMENT
     ========================================================================== */
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    storage.set(STORAGE_KEYS.THEME, newTheme);

    const settingThemeToggle = document.getElementById("settingThemeToggle");
    if (settingThemeToggle) settingThemeToggle.checked = newTheme === "dark";

    renderRevenueChart();
    showToast(`Switched to ${newTheme.toUpperCase()} theme`, "success");
  }

  function setupSettings() {
    // Theme initialization
    const savedTheme = storage.get(STORAGE_KEYS.THEME, "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
    const settingThemeToggle = document.getElementById("settingThemeToggle");
    if (settingThemeToggle) settingThemeToggle.checked = savedTheme === "dark";

    settingThemeToggle?.addEventListener("change", (e) => {
      const theme = e.target.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);
      storage.set(STORAGE_KEYS.THEME, theme);
      renderRevenueChart();
      showToast(`Visual theme set to ${theme.toUpperCase()}`, "success");
    });

    // Compact density toggle
    const compactToggle = document.getElementById("settingCompactToggle");
    const savedCompact = storage.get(STORAGE_KEYS.COMPACT, false);
    if (compactToggle) {
      compactToggle.checked = savedCompact;
      document.documentElement.setAttribute("data-compact", savedCompact ? "true" : "false");
      compactToggle.addEventListener("change", (e) => {
        document.documentElement.setAttribute("data-compact", e.target.checked ? "true" : "false");
        storage.set(STORAGE_KEYS.COMPACT, e.target.checked);
        showToast(e.target.checked ? "Compact mode enabled" : "Standard mode enabled", "success");
      });
    }

    // Sidebar collapse toggle in settings
    const collapseToggle = document.getElementById("settingCollapseToggle");
    if (collapseToggle) {
      collapseToggle.addEventListener("change", (e) => {
        const sidebar = document.getElementById("appSidebar");
        if (sidebar) {
          if (e.target.checked) sidebar.classList.add("collapsed");
          else sidebar.classList.remove("collapsed");
        }
      });
    }

    // Settings Navigation Tabs
    const tabBtns = document.querySelectorAll(".settings-nav-btn");
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tabKey = btn.getAttribute("data-tab");
        document.querySelectorAll(".settings-content-card").forEach(c => c.style.display = "none");
        const activeCard = document.getElementById(`settingsTab-${tabKey}`);
        if (activeCard) activeCard.style.display = "block";
      });
    });

    // Save Settings
    document.getElementById("saveAgencySettingsBtn")?.addEventListener("click", () => {
      const agencyName = document.getElementById("settingAgencyName")?.value;
      const agencyEmail = document.getElementById("settingAgencyEmail")?.value;
      const currency = document.getElementById("settingCurrency")?.value;
      const timezone = document.getElementById("settingTimezone")?.value;

      storage.set(STORAGE_KEYS.SETTINGS, { agencyName, agencyEmail, currency, timezone });
      showToast("Agency preferences saved successfully", "success");
    });

    // Export Data JSON
    document.getElementById("exportDataJsonBtn")?.addEventListener("click", () => {
      const exportObj = {
        campaigns: appData.campaigns,
        clients: appData.clients,
        leads: appData.leads,
        tasks: appData.tasks,
        content: appData.content,
        events: appData.events,
        team: appData.team,
        exportedAt: new Date().toISOString()
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
      const dlAnchor = document.createElement("a");
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `markora_backup_${Date.now()}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast("All workspace data exported to JSON", "success");
    });

    // Reset to Original Demo Data
    document.getElementById("resetToDemoDataBtn")?.addEventListener("click", () => {
      if (confirm("Reset all custom records and restore default demo state?")) {
        localStorage.clear();
        appData.campaigns = DEFAULT_CAMPAIGNS;
        appData.clients = DEFAULT_CLIENTS;
        appData.leads = DEFAULT_LEADS;
        appData.tasks = DEFAULT_TASKS;
        appData.content = DEFAULT_CONTENT;
        appData.events = DEFAULT_EVENTS;
        appData.team = DEFAULT_TEAM;
        appData.notifs = DEFAULT_NOTIFS;
        appData.conversations = DEFAULT_CONVERSATIONS;

        renderCampaigns();
        renderClients();
        renderLeads();
        renderTasks();
        renderContent();
        renderCalendar();
        renderTeam();
        renderConversations();
        renderNotifications();
        renderRevenueChart();
        showToast("Demo datasets restored cleanly", "success");
      }
    });
  }

  /* ==========================================================================
     15. GLOBAL EXPOSED WINDOW ACTIONS (For Inline HTML Handlers)
     ========================================================================== */
  window.markoraEditCampaign = function (id) {
    const c = appData.campaigns.find(item => item.id === id);
    if (c) openCampaignModal(c);
  };

  window.markoraToggleCampaignStatus = function (id) {
    const c = appData.campaigns.find(item => item.id === id);
    if (c) {
      c.status = c.status === "Active" ? "Paused" : "Active";
      storage.set(STORAGE_KEYS.CAMPAIGNS, appData.campaigns);
      renderCampaigns();
      showToast(`Campaign status changed to ${c.status}`, "success");
    }
  };

  window.markoraDeleteCampaign = function (id) {
    if (confirm("Are you sure you want to delete this campaign?")) {
      appData.campaigns = appData.campaigns.filter(item => item.id !== id);
      storage.set(STORAGE_KEYS.CAMPAIGNS, appData.campaigns);
      renderCampaigns();
      showToast("Campaign deleted", "danger");
    }
  };

  window.markoraEditClient = function (id) {
    const cli = appData.clients.find(item => item.id === id);
    if (cli) openClientModal(cli);
  };

  window.markoraDeleteClient = function (id) {
    if (confirm("Delete this client account and all related records?")) {
      appData.clients = appData.clients.filter(item => item.id !== id);
      storage.set(STORAGE_KEYS.CLIENTS, appData.clients);
      renderClients();
      showToast("Client account removed", "danger");
    }
  };

  window.markoraMessageClient = function (company) {
    window.location.hash = "#messages";
    navigateToView("messages");
    showToast(`Connecting to ${company} channel...`, "success");
  };

  window.markoraEditLead = function (id) {
    const ld = appData.leads.find(item => item.id === id);
    if (ld) openLeadModal(ld);
  };

  window.markoraUpdateLeadStatus = function (id, newStatus) {
    const ld = appData.leads.find(item => item.id === id);
    if (ld) {
      ld.status = newStatus;
      storage.set(STORAGE_KEYS.LEADS, appData.leads);
      renderLeads();
      showToast(`Lead pipeline updated to: ${newStatus}`, "success");
    }
  };

  window.markoraDeleteLead = function (id) {
    if (confirm("Delete this lead?")) {
      appData.leads = appData.leads.filter(item => item.id !== id);
      storage.set(STORAGE_KEYS.LEADS, appData.leads);
      renderLeads();
      showToast("Lead removed from pipeline", "danger");
    }
  };

  window.markoraEditTask = function (id) {
    const t = appData.tasks.find(item => item.id === id);
    if (t) openTaskModal(t);
  };

  window.markoraToggleTaskComplete = function (id) {
    const t = appData.tasks.find(item => item.id === id);
    if (t) {
      t.completed = !t.completed;
      if (t.completed) t.column = "completed";
      else t.column = "todo";
      storage.set(STORAGE_KEYS.TASKS, appData.tasks);
      renderTasks();
      showToast(t.completed ? "Task marked complete!" : "Task reopened", "success");
    }
  };

  window.markoraDeleteTask = function (id) {
    appData.tasks = appData.tasks.filter(item => item.id !== id);
    storage.set(STORAGE_KEYS.TASKS, appData.tasks);
    renderTasks();
    showToast("Task removed", "danger");
  };

  window.markoraEditContent = function (id) {
    const c = appData.content.find(item => item.id === id);
    if (c) openContentModal(c);
  };

  window.markoraPreviewContent = function (id) {
    const c = appData.content.find(item => item.id === id);
    if (c) {
      alert(`PREVIEW: ${c.title}\n\nType: ${c.type}\nPlatform: ${c.platform}\nAuthor: ${c.author}\nStatus: ${c.status}\nMetrics: ${c.performance}`);
    }
  };

  window.markoraDeleteContent = function (id) {
    if (confirm("Delete this content piece?")) {
      appData.content = appData.content.filter(item => item.id !== id);
      storage.set(STORAGE_KEYS.CONTENT, appData.content);
      renderContent();
      showToast("Content piece deleted", "danger");
    }
  };

  window.markoraQuickAddEventToDay = function (day) {
    openEventModal(day);
  };

  window.markoraDeleteEvent = function (id) {
    if (confirm("Remove this calendar milestone?")) {
      appData.events = appData.events.filter(item => item.id !== id);
      storage.set(STORAGE_KEYS.EVENTS, appData.events);
      renderCalendar();
      showToast("Event removed from calendar", "danger");
    }
  };

  window.markoraSelectChat = function (id) {
    appData.activeChatId = id;
    renderConversations();
  };

  window.markoraMarkNotifRead = function (id) {
    const n = appData.notifs.find(item => item.id === id);
    if (n) {
      n.read = true;
      storage.set(STORAGE_KEYS.NOTIFS, appData.notifs);
      renderNotifications();
    }
  };

  window.markoraDeleteNotif = function (id) {
    appData.notifs = appData.notifs.filter(item => item.id !== id);
    storage.set(STORAGE_KEYS.NOTIFS, appData.notifs);
    renderNotifications();
    showToast("Notification dismissed", "success");
  };

  window.markoraPreviewReport = function (type) {
    previewReport(type);
  };

  window.markoraDownloadReport = function (type) {
    downloadReportFile(type);
  };

  window.markoraJumpToResult = function (view) {
    closeModal("searchModal");
    window.location.hash = `#${view}`;
    navigateToView(view);
  };

  window.markoraEditMember = function (id) {
    showToast("Team member profile editor opened", "success");
  };

  window.markoraDeleteMember = function (id) {
    if (confirm("Remove team member from workspace?")) {
      appData.team = appData.team.filter(m => m.id !== id);
      storage.set(STORAGE_KEYS.TEAM, appData.team);
      renderTeam();
      showToast("Team member removed", "danger");
    }
  };

  /* ==========================================================================
     16. INITIALIZATION HOOK
     ========================================================================== */
  document.addEventListener("DOMContentLoaded", () => {
    setupRouting();
    setupHeaderControls();
    setupModals();
    setupSettings();

    // Render all modules
    updateKpisForPeriod("30d");
    renderOverviewChannels();
    renderCampaigns();
    renderClients();
    renderLeads();
    renderSocialMedia();
    renderSeo();
    renderContent();
    renderTasks();
    renderCalendar();
    renderAdvertising();
    renderTeam();
    renderReports();
    renderConversations();
    renderNotifications();

    // Spotlight search listener
    document.getElementById("spotlightSearchInput")?.addEventListener("input", (e) => {
      runSpotlightSearch(e.target.value);
    });

    // Handle window resize for charts
    window.addEventListener("resize", () => {
      renderRevenueChart();
      renderCacLtvChart();
    });

    // Calendar Prev/Next Navigation
    document.getElementById("calPrevMonthBtn")?.addEventListener("click", () => {
      document.getElementById("calendarMonthTitle").innerText = "August 2026";
      renderCalendar();
      showToast("Viewing August 2026", "success");
    });
    document.getElementById("calNextMonthBtn")?.addEventListener("click", () => {
      document.getElementById("calendarMonthTitle").innerText = "October 2026";
      renderCalendar();
      showToast("Viewing October 2026", "success");
    });
    document.getElementById("calTodayBtn")?.addEventListener("click", () => {
      document.getElementById("calendarMonthTitle").innerText = "September 2026";
      renderCalendar();
      showToast("Viewing September 2026 (Current)", "success");
    });

    // Audit and Sync buttons
    document.getElementById("runSeoAuditBtn")?.addEventListener("click", () => {
      showToast("Running organic SEO deep crawl...", "warning");
      setTimeout(() => showToast("Audit complete: 4,812 indexed keywords verified (100% crawl health)", "success"), 1200);
    });
    document.getElementById("syncSocialAccountsBtn")?.addEventListener("click", () => {
      showToast("Syncing real-time social metrics across 6 networks...", "warning");
      setTimeout(() => showToast("Social sync updated: +2,400 new impressions recorded", "success"), 1000);
    });
    document.getElementById("exportOverviewPdfBtn")?.addEventListener("click", () => {
      previewReport("Revenue");
    });
    document.getElementById("downloadReportFileBtn")?.addEventListener("click", () => {
      downloadReportFile("Executive");
      closeModal("reportPreviewModal");
    });
    document.getElementById("downloadAnalyticsCsvBtn")?.addEventListener("click", () => {
      downloadReportFile("Analytics");
    });
    document.getElementById("adNewBudgetBtn")?.addEventListener("click", () => {
      openCampaignModal();
    });
    document.getElementById("generateNewReportBtn")?.addEventListener("click", () => {
      previewReport("Campaign");
    });

    console.log("MARKORA™ Marketing Agency Dashboard successfully initialized.");
  });

})();
