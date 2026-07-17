/* @ds-bundle: {"format":3,"namespace":"RevolutDesignSystem_782733","components":[],"sourceHashes":{"assets/icons-sprite.js":"8cdd16008813","ui_kits/marketing-site/Hero.jsx":"536928607f0c","ui_kits/marketing-site/NavBar.jsx":"54c0b5f76004","ui_kits/marketing-site/Sections.jsx":"5b1c688539b6","ui_kits/marketing-site/components-core.jsx":"459fb1c11cd0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RevolutDesignSystem_782733 = window.RevolutDesignSystem_782733 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/icons-sprite.js
try { (() => {
/* Revolut DS icon sprite — self-injecting.
   Include with <script src="PATH/icons-sprite.js"></script>, then use:
     <svg class="ds-icon"><use href="#icon-card"></use></svg>
   Same-document <use> renders reliably across browsers + capture tools. */
(function () {
  var MARKUP = "<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" style=\"position:absolute;width:0;height:0;overflow:hidden\">\n  <symbol id=\"icon-card\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <rect x=\"2.5\" y=\"5\" width=\"19\" height=\"14\" rx=\"2.5\"></rect>\n    <line x1=\"2.5\" y1=\"9.5\" x2=\"21.5\" y2=\"9.5\"></line>\n    <line x1=\"6\" y1=\"15\" x2=\"10\" y2=\"15\"></line>\n  </symbol>\n  <symbol id=\"icon-wallet\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M3 7.5C3 6 4 5 5.5 5H18a3 3 0 0 1 3 3v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7.5Z\"></path>\n    <path d=\"M21 10h-4a2 2 0 0 0 0 4h4\"></path>\n  </symbol>\n  <symbol id=\"icon-vault\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2.5\"></rect>\n    <circle cx=\"11\" cy=\"12\" r=\"4\"></circle>\n    <line x1=\"11\" y1=\"12\" x2=\"11\" y2=\"9.5\"></line>\n    <line x1=\"18\" y1=\"8\" x2=\"18\" y2=\"16\"></line>\n  </symbol>\n  <symbol id=\"icon-savings\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M4 12a6 6 0 0 1 6-6h2a7 7 0 0 1 7 7c0 2-1 3.5-2.5 4.5V20H14v-1.5h-2V20H8.5v-2A6 6 0 0 1 4 12Z\"></path>\n    <line x1=\"4\" y1=\"11\" x2=\"2.5\" y2=\"10\"></line>\n    <circle cx=\"9\" cy=\"11\" r=\"0.6\" fill=\"currentColor\" stroke=\"none\"></circle>\n  </symbol>\n  <symbol id=\"icon-transfer\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M4 8h13l-3.5-3.5\"></path>\n    <path d=\"M20 16H7l3.5 3.5\"></path>\n  </symbol>\n  <symbol id=\"icon-exchange\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"8\" cy=\"8\" r=\"4.5\"></circle>\n    <circle cx=\"16\" cy=\"16\" r=\"4.5\"></circle>\n    <path d=\"M14 5.5h3.5V9\"></path>\n    <path d=\"M10 18.5H6.5V15\"></path>\n  </symbol>\n  <symbol id=\"icon-send\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M20 4 3.5 11l6.5 2.2L12.5 20 20 4Z\"></path>\n    <line x1=\"10\" y1=\"13.2\" x2=\"14\" y2=\"8.5\"></line>\n  </symbol>\n  <symbol id=\"icon-request\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M12 4v11\"></path>\n    <path d=\"M7.5 10.5 12 15l4.5-4.5\"></path>\n    <path d=\"M5 19h14\"></path>\n  </symbol>\n  <symbol id=\"icon-split\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"12\" cy=\"5.5\" r=\"2.5\"></circle>\n    <circle cx=\"5.5\" cy=\"18\" r=\"2.5\"></circle>\n    <circle cx=\"18.5\" cy=\"18\" r=\"2.5\"></circle>\n    <path d=\"M12 8v3M12 11 6.5 15.5M12 11l5.5 4.5\"></path>\n  </symbol>\n  <symbol id=\"icon-tap\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M9 11V6a2 2 0 0 1 4 0v6\"></path>\n    <path d=\"M13 9.5a2 2 0 0 1 4 0V14a6 6 0 0 1-6 6h-1a5 5 0 0 1-3.8-1.8L4 15c-.8-1 .6-2.6 1.7-1.8L8 15\"></path>\n  </symbol>\n  <symbol id=\"icon-stocks\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M4 16l5-5 3 3 7-7\"></path>\n    <path d=\"M15 7h4v4\"></path>\n  </symbol>\n  <symbol id=\"icon-crypto\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle>\n    <path d=\"M10 8h3.5a2 2 0 0 1 0 4H10m0 0h4a2 2 0 0 1 0 4H10m0-8v8m1.5-9.5V8m0 8v1.5m-2-1.5V8\"></path>\n  </symbol>\n  <symbol id=\"icon-chart\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <line x1=\"5\" y1=\"20\" x2=\"5\" y2=\"11\"></line>\n    <line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"5\"></line>\n    <line x1=\"19\" y1=\"20\" x2=\"19\" y2=\"14\"></line>\n  </symbol>\n  <symbol id=\"icon-shield\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6l7-2.5Z\"></path>\n    <path d=\"M9 12l2 2 4-4\"></path>\n  </symbol>\n  <symbol id=\"icon-lock\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <rect x=\"5\" y=\"10.5\" width=\"14\" height=\"9.5\" rx=\"2.5\"></rect>\n    <path d=\"M8 10.5V8a4 4 0 0 1 8 0v2.5\"></path>\n    <circle cx=\"12\" cy=\"15\" r=\"1.2\" fill=\"currentColor\" stroke=\"none\"></circle>\n  </symbol>\n  <symbol id=\"icon-globe\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"12\" cy=\"12\" r=\"8.5\"></circle>\n    <path d=\"M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17\"></path>\n  </symbol>\n  <symbol id=\"icon-bell\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M6 10a6 6 0 0 1 12 0c0 5 1.5 6 1.5 6h-15S6 15 6 10Z\"></path>\n    <path d=\"M10 19.5a2 2 0 0 0 4 0\"></path>\n  </symbol>\n  <symbol id=\"icon-settings\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"12\" cy=\"12\" r=\"3\"></circle>\n    <path d=\"M12 2.5v2.5M12 19v2.5M4.2 7l2.2 1.3M17.6 15.7l2.2 1.3M4.2 17l2.2-1.3M17.6 8.3l2.2-1.3\"></path>\n  </symbol>\n  <symbol id=\"icon-user\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"12\" cy=\"8\" r=\"4\"></circle>\n    <path d=\"M4.5 20a7.5 7.5 0 0 1 15 0\"></path>\n  </symbol>\n  <symbol id=\"icon-qr\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <rect x=\"4\" y=\"4\" width=\"6\" height=\"6\" rx=\"1\"></rect>\n    <rect x=\"14\" y=\"4\" width=\"6\" height=\"6\" rx=\"1\"></rect>\n    <rect x=\"4\" y=\"14\" width=\"6\" height=\"6\" rx=\"1\"></rect>\n    <path d=\"M14 14h2v2M20 14v6M16 20h4M18 16v0\"></path>\n  </symbol>\n  <symbol id=\"icon-plus\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <line x1=\"12\" y1=\"5\" x2=\"12\" y2=\"19\"></line>\n    <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\"></line>\n  </symbol>\n  <symbol id=\"icon-search\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <circle cx=\"11\" cy=\"11\" r=\"6.5\"></circle>\n    <line x1=\"16\" y1=\"16\" x2=\"20.5\" y2=\"20.5\"></line>\n  </symbol>\n  <symbol id=\"icon-chevron-right\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M9 5l7 7-7 7\"></path>\n  </symbol>\n  <symbol id=\"icon-chevron-down\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M5 9l7 7 7-7\"></path>\n  </symbol>\n  <symbol id=\"icon-arrow-up-right\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M7 17 17 7\"></path>\n    <path d=\"M8 7h9v9\"></path>\n  </symbol>\n  <symbol id=\"icon-close\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n    <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n  </symbol>\n  <symbol id=\"icon-menu\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <line x1=\"4\" y1=\"7\" x2=\"20\" y2=\"7\"></line>\n    <line x1=\"4\" y1=\"12\" x2=\"20\" y2=\"12\"></line>\n    <line x1=\"4\" y1=\"17\" x2=\"20\" y2=\"17\"></line>\n  </symbol>\n  <symbol id=\"icon-check\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n    <path d=\"M5 12.5 10 17.5 19.5 7\"></path>\n  </symbol>\n</svg>";
  function inject() {
    if (document.getElementById('__revolut_icon_sprite')) return;
    var holder = document.createElement('div');
    holder.id = '__revolut_icon_sprite';
    holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    holder.innerHTML = MARKUP;
    (document.body || document.documentElement).insertBefore(holder, (document.body || document.documentElement).firstChild);
  }
  if (document.body) {
    inject();
  } else {
    document.addEventListener('DOMContentLoaded', inject);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/icons-sprite.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
// Phone mockup — a recreated Revolut-style app home screen used as the hero object.
function PhoneMockup() {
  const tx = [{
    name: "Apple",
    sub: "Today, 09:24",
    amt: "-£4.99",
    color: "var(--ink)",
    icon: "card"
  }, {
    name: "Salary",
    sub: "Yesterday",
    amt: "+£2,400.00",
    color: "var(--accent-light-green)",
    icon: "request",
    pos: true
  }, {
    name: "Tesco",
    sub: "Yesterday",
    amt: "-£38.20",
    color: "var(--accent-teal)",
    icon: "card"
  }, {
    name: "Transfer to Sam",
    sub: "Mon",
    amt: "-£25.00",
    color: "var(--accent-pink)",
    icon: "send"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "phone-notch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "phone-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scr-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scr-ava"
  }, "A"), /*#__PURE__*/React.createElement("div", {
    className: "scr-top-icons"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scr-bal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cur"
  }, "Personal \xB7 GBP"), /*#__PURE__*/React.createElement("div", {
    className: "amt"
  }, "\xA32,540.00")), /*#__PURE__*/React.createElement("div", {
    className: "scr-actions"
  }, [["plus", "Add"], ["exchange", "Exchange"], ["send", "Send"], ["chart", "More"]].map(([ic, lab]) => /*#__PURE__*/React.createElement("div", {
    className: "scr-act",
    key: lab
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    className: "lab"
  }, lab)))), /*#__PURE__*/React.createElement("div", {
    className: "scr-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, "Revolut"), /*#__PURE__*/React.createElement("div", {
    className: "chip"
  }), /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, "\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4827")), /*#__PURE__*/React.createElement("div", {
    className: "scr-list"
  }, /*#__PURE__*/React.createElement("h4", null, "Recent"), tx.map((t, i) => /*#__PURE__*/React.createElement("div", {
    className: "scr-tx",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "dot",
    style: {
      background: t.color
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 18,
    color: "#fff"
  })), /*#__PURE__*/React.createElement("div", {
    className: "m"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, t.name), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, t.sub)), /*#__PURE__*/React.createElement("div", {
    className: "v" + (t.pos ? " pos" : "")
  }, t.amt))))));
}

// Hero band — content switches with the active nav tab.
const HERO_CONTENT = {
  Personal: {
    h1: "Banking & Beyond",
    lead: "Spend, save, exchange and invest — all in one app. Join the 70+ million people already using Revolut.",
    cta: "Get started"
  },
  Business: {
    h1: "Business, simplified",
    lead: "Multi-currency accounts, expense management and global payments built for teams of every size.",
    cta: "Open a business account"
  },
  Company: {
    h1: "Building the future of finance",
    lead: "We're on a mission to build the world's first truly global financial superapp. Come build it with us.",
    cta: "View open roles"
  }
};
function Hero({
  tab,
  onGetStarted
}) {
  const c = HERO_CONTENT[tab] || HERO_CONTENT.Personal;
  return /*#__PURE__*/React.createElement("section", {
    className: "band band-dark hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "t-display-xl"
  }, c.h1), /*#__PURE__*/React.createElement("p", {
    className: "lead t-body-lg"
  }, c.lead), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onGetStarted
  }, c.cta), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-dark"
  }, "See all plans")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, "70M+"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "customers worldwide")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, "150+"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "currencies supported")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "n"
  }, "30+"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "countries")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-art"
  }, /*#__PURE__*/React.createElement(PhoneMockup, null))));
}
Object.assign(window, {
  Hero,
  PhoneMockup
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/NavBar.jsx
try { (() => {
// Top navigation bar — 64px, true black, sticky.
function NavBar({
  tab,
  setTab,
  onGetStarted,
  onLogin
}) {
  const [open, setOpen] = React.useState(false);
  const tabs = ["Personal", "Business", "Company"];
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement(Logo, {
    onClick: () => setTab("Personal")
  }), /*#__PURE__*/React.createElement("div", {
    className: "nav-center"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    className: "nav-tab" + (tab === t ? " active" : ""),
    onClick: () => setTab(t)
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "nav-lang"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "globe",
    size: 18
  }), " EN"), /*#__PURE__*/React.createElement("button", {
    className: "nav-link",
    onClick: onLogin
  }, "Log in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: onGetStarted
  }, "Get started"), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    onClick: () => setOpen(o => !o),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? "close" : "menu"
  })))));
}
Object.assign(window, {
  NavBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Sections.jsx
try { (() => {
// Feature grid — white catalogue band, 3-up cards. Accent colors used on icons only.
function FeatureGrid() {
  const feats = [{
    icon: "exchange",
    color: "var(--accent-teal)",
    t: "Exchange 150+ currencies",
    p: "Hold and convert money at great rates with no hidden fees, in 150+ currencies."
  }, {
    icon: "stocks",
    color: "var(--accent-light-green)",
    t: "Invest from £1",
    p: "Buy and sell stocks, ETFs and commodities directly from the app, commission-free."
  }, {
    icon: "crypto",
    color: "var(--accent-warning)",
    t: "Explore crypto",
    p: "Discover 100+ tokens and track the market 24/7, all from one place."
  }, {
    icon: "shield",
    color: "var(--accent-light-blue)",
    t: "Security you control",
    p: "Freeze your card, set spending limits and get instant alerts on every transaction."
  }, {
    icon: "savings",
    color: "var(--accent-pink)",
    t: "Save with Vaults",
    p: "Set money aside automatically and earn interest with flexible savings Vaults."
  }, {
    icon: "globe",
    color: "var(--primary)",
    t: "Spend anywhere",
    p: "Pay like a local in 30+ countries with no markup on weekday exchange."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "band band-light features"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-display-lg"
  }, "One app, all things money"), /*#__PURE__*/React.createElement("p", {
    className: "sub t-body-lg"
  }, "Everything you need to manage your money \u2014 spending, saving, investing and more."), /*#__PURE__*/React.createElement("div", {
    className: "feat-grid"
  }, feats.map((f, i) => /*#__PURE__*/React.createElement("div", {
    className: "feat-card",
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic",
    style: {
      background: "color-mix(in srgb, " + f.color + " 12%, #fff)",
      color: f.color
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 26
  })), /*#__PURE__*/React.createElement("h3", null, f.t), /*#__PURE__*/React.createElement("p", null, f.p))))));
}

// Plan grid — dark band, 4-up cards with cobalt featured tier + billing toggle.
const PLANS = [{
  name: "Standard",
  m: "Free",
  a: "Free",
  sub: "",
  feats: ["Spend in 150+ currencies", "Fee-free everyday banking", "1 free card"]
}, {
  name: "Plus",
  m: "£3.99",
  a: "£2.99",
  sub: "per month",
  feats: ["Everything in Standard", "Purchase protection", "Priority support"]
}, {
  name: "Premium",
  m: "£7.99",
  a: "£6.99",
  sub: "per month",
  featured: true,
  badge: "Most popular",
  feats: ["Everything in Plus", "Higher exchange limits", "Global express delivery", "Airport lounge access"]
}, {
  name: "Metal",
  m: "£14.99",
  a: "£12.99",
  sub: "per month",
  feats: ["Everything in Premium", "Exclusive metal card", "1% cashback abroad"]
}];
function PlanGrid({
  onChoose
}) {
  const [annual, setAnnual] = React.useState(true);
  return /*#__PURE__*/React.createElement("section", {
    className: "band band-dark plans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "plans-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-display-lg"
  }, "Choose your subscription"), /*#__PURE__*/React.createElement("div", {
    className: "billing-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: annual ? "active" : "",
    onClick: () => setAnnual(true)
  }, "Annual"), /*#__PURE__*/React.createElement("button", {
    className: !annual ? "active" : "",
    onClick: () => setAnnual(false)
  }, "Monthly"))), /*#__PURE__*/React.createElement("div", {
    className: "plan-grid"
  }, PLANS.map(p => /*#__PURE__*/React.createElement("div", {
    className: "plan-card" + (p.featured ? " featured" : ""),
    key: p.name
  }, p.badge && /*#__PURE__*/React.createElement("span", {
    className: "plan-badge"
  }, p.badge), /*#__PURE__*/React.createElement("h3", null, p.name), /*#__PURE__*/React.createElement("div", {
    className: "plan-price"
  }, p.m === "Free" ? /*#__PURE__*/React.createElement("b", null, "Free") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("b", null, annual ? p.a : p.m))), /*#__PURE__*/React.createElement("div", {
    className: "plan-sub"
  }, p.m === "Free" ? "No monthly fee" : p.sub + (annual ? ", billed annually" : "")), /*#__PURE__*/React.createElement("ul", {
    className: "plan-feats"
  }, p.feats.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18
  }), f))), /*#__PURE__*/React.createElement(Button, {
    variant: p.featured ? "primary" : "outline-dark",
    onClick: onChoose
  }, p.name === "Standard" ? "Get started" : "Choose " + p.name))))));
}

// FAQ — white band accordion.
const FAQS = [{
  q: "How do I open an account?",
  a: "Download the app, enter your details and verify your identity with a photo of your ID and a selfie. Most accounts are ready in minutes — no branch visit, no paperwork."
}, {
  q: "Is my money safe with Revolut?",
  a: "Your money is held with regulated partner banks and protected by industry-standard security. You can freeze your card, set limits and get instant alerts on every transaction."
}, {
  q: "What does it cost?",
  a: "The Standard plan is free forever. Paid plans — Plus, Premium and Metal — add higher limits, perks and protections. You can change or cancel your plan at any time."
}, {
  q: "Can I use Revolut abroad?",
  a: "Yes. Spend like a local in 30+ countries and exchange 150+ currencies at great rates, with no markup on weekday exchange up to your plan's monthly limit."
}];
function FAQ() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("section", {
    className: "band band-light faq"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-display-md"
  }, "Frequently asked questions"), FAQS.map((f, i) => /*#__PURE__*/React.createElement("div", {
    className: "faq-item" + (open === i ? " open" : ""),
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    className: "faq-q",
    onClick: () => setOpen(open === i ? -1 : i)
  }, f.q, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    className: "faq-a"
  }, /*#__PURE__*/React.createElement("p", null, f.a))))));
}

// Footer — dark, download tiles + link columns + regulatory disclosure.
function Footer() {
  const cols = {
    Company: ["About", "Careers", "Newsroom", "Investors"],
    Products: ["Personal", "Business", "Cards", "Savings"],
    Help: ["Support", "Status", "Community", "Security"],
    Legal: ["Privacy", "Terms", "Cookies", "Licences"]
  };
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-cols"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-logo",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoWordmark || "../../assets/logo-wordmark.svg",
    alt: "Revolut"
  })), /*#__PURE__*/React.createElement("div", {
    className: "dl-tiles"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dl-tile"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    className: "tt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, "Download on the"), /*#__PURE__*/React.createElement("div", {
    className: "b"
  }, "App Store"))), /*#__PURE__*/React.createElement("div", {
    className: "dl-tile"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    className: "tt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, "Get it on"), /*#__PURE__*/React.createElement("div", {
    className: "b"
  }, "Google Play"))))), Object.entries(cols).map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    className: "footer-col",
    key: h
  }, /*#__PURE__*/React.createElement("h5", null, h), links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l
  }, l))))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("p", {
    className: "footer-disc"
  }, "This is a design-system recreation of the Revolut marketing canvas for prototyping purposes and is not affiliated with Revolut Ltd. Revolut is a trademark of its respective owner. \xA9 ", new Date().getFullYear(), " Revolut Design System."))));
}

// Signup modal — email + password using the text-input component, then a success state.
function SignupModal({
  onClose
}) {
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-scrim",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 22
  })), done ? /*#__PURE__*/React.createElement("div", {
    className: "modal-done"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 32
  })), /*#__PURE__*/React.createElement("h3", null, "You're in"), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Check your inbox to verify your email and finish setting up your account."), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    onClick: onClose
  }, "Done")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", null, "Get started"), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, "Create your free account in minutes."), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "you@example.com",
    defaultValue: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Create a password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    onClick: () => setDone(true)
  }, "Create account"))));
}
Object.assign(window, {
  FeatureGrid,
  PlanGrid,
  FAQ,
  Footer,
  SignupModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/components-core.jsx
try { (() => {
// Core helpers: Icon, Button, Logo
function Icon({
  name,
  size = 24,
  color,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "ds-icon " + (className || ""),
    style: {
      width: size,
      height: size,
      color,
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("use", {
    href: "#icon-" + name
  }));
}
function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  style
}) {
  const cls = "btn btn-" + variant + (size === "sm" ? " btn-pill-sm" : "");
  return /*#__PURE__*/React.createElement("button", {
    className: cls,
    onClick: onClick,
    style: style
  }, children);
}
function Logo({
  onClick
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "nav-logo",
    onClick: onClick
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.logoWordmark || "../../assets/logo-wordmark.svg",
    alt: "Revolut"
  }));
}
Object.assign(window, {
  Icon,
  Button,
  Logo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/components-core.jsx", error: String((e && e.message) || e) }); }

})();
