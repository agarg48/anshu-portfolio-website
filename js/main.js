/* ==========================================================================
   ANSHUMALI GARG — PORTFOLIO · behaviour
   --------------------------------------------------------------------------
   Each feature is a self-contained init function, called at the bottom:
     initWhatsAppLinks()  → builds every WhatsApp link from SITE settings
     initNav()            → scrolled state, active link, mobile menu
     initReveal()         → fade-up on scroll
     initNameRing()       → 3D swirling name in the hero
     initAboutWords()     → About text lights up word by word on scroll
     initSkills()         → interactive dial + holographic panel
     initCarousel()       → projects carousel
     initForm()           → "Book a call" form
     initGlass()          → cursor highlight on liquid-glass cards
   Content lives in js/data.js — you normally don't need to edit this file.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const pad = (n) => String(n).padStart(2, "0");
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const SITE = window.SITE || {};
  const waLink = (text) =>
    `https://wa.me/${SITE.whatsappNumber || ""}?text=${encodeURIComponent(text || "")}`;

  document.documentElement.classList.remove("no-js");


  /* ========================================================================
     WhatsApp links — any element with [data-whatsapp]
     ======================================================================== */
  function initWhatsAppLinks() {
    $$("[data-whatsapp]").forEach((a) => {
      a.href = waLink(SITE.whatsappMessage);
    });
  }


  /* ========================================================================
     NAVIGATION
     ======================================================================== */
  function initNav() {
    const nav = $("#nav");
    const toggle = $("#nav-toggle");
    const menu = $("#mobile-menu");
    const links = $$(".nav__links a[data-nav]");
    const indicator = $(".nav__indicator");

    // background gets stronger once the page is scrolled
    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // mobile menu
    const setMenu = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.hidden = !open;
    };
    toggle.addEventListener("click", () => setMenu(menu.hidden));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

    // sliding pill under the active link
    const moveIndicator = (link) => {
      if (!link || !indicator) { if (indicator) indicator.style.opacity = "0"; return; }
      indicator.style.opacity = "1";
      indicator.style.width = link.offsetWidth + "px";
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };

    // highlight the link of the section in view
    const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          let activeLink = null;
          $$("[data-nav]").forEach((l) => {
            const on = l.getAttribute("href") === id;
            l.classList.toggle("is-active", on);
            if (on && l.closest(".nav__links")) activeLink = l;
          });
          moveIndicator(activeLink);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    // hero in view → no active link
    const hero = $("#home");
    if (hero) {
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            $$("[data-nav]").forEach((l) => l.classList.remove("is-active"));
            moveIndicator(null);
          }
        },
        { rootMargin: "-45% 0px -50% 0px" }
      ).observe(hero);
    }

    // "Book a call" links → scroll to form, then focus the first field
    $$("[data-book-call]").forEach((a) =>
      a.addEventListener("click", () => {
        setTimeout(() => { const f = $("#f-name"); if (f) f.focus({ preventScroll: true }); }, 800);
      })
    );
  }


  /* ========================================================================
     SCROLL REVEAL
     ======================================================================== */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => io.observe(el));
  }


  /* ========================================================================
     HERO — 3D swirling name
     ------------------------------------------------------------------------
     The text (data-text, written twice) is laid around a cylinder.
     Every character gets two spans:
       • front: rotateY(θ) translateZ(+R)  → faces outwards, solid
       • back : rotateY(-θ) translateZ(-R) → faces inwards, outlined,
                reads left-to-right on the far side and moves the other way
     backface-visibility hides each layer when it faces away, which gives the
     solid-front / outlined-back look from the reference.
     ======================================================================== */
  const STAR_SVG =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z"/></svg>';

  function initNameRing() {
    const root = $("[data-name-ring]");
    if (!root) return;
    const spin = $(".name3d__spin", root);
    const unit = root.dataset.text || "ANSHUMALI GARG *";
    const chars = Array.from(unit + unit);   // two copies → one on each side
    let lastSize = 0;

    function build() {
      const fs = parseFloat(getComputedStyle(root).fontSize);
      if (!fs || fs === lastSize) return;
      lastSize = fs;
      spin.textContent = "";

      // measure each character in the real font
      const meas = document.createElement("span");
      meas.className = "name3d__l";
      meas.style.cssText = "position:absolute;visibility:hidden;margin:0;transform:none;";
      root.appendChild(meas);
      const gap = fs * 0.035;
      const widths = chars.map((c) => {
        if (c === "*") return fs * 0.9;
        meas.textContent = c;
        return meas.getBoundingClientRect().width;
      });
      meas.remove();

      const total = widths.reduce((sum, w) => sum + w + gap, 0);
      const R = total / (2 * Math.PI);
      root.style.setProperty("--R", R.toFixed(1) + "px");

      // centre the first copy of the name (without the separator) on the front
      const nameLen = unit.replace(/\s*\*\s*$/, "").length;
      let acc = 0;
      let nameStart = 0;
      let nameEnd = 0;
      const frag = document.createDocumentFragment();

      chars.forEach((c, i) => {
        if (i === 0) nameStart = acc;
        const centre = acc + widths[i] / 2;
        acc += widths[i] + gap;
        if (i === nameLen - 1) nameEnd = acc - gap;
        const deg = (centre / total) * 360;

        ["front", "back"].forEach((side) => {
          const s = document.createElement("span");
          s.className = `name3d__l name3d__l--${side}` + (c === "*" ? " name3d__l--star" : "");
          if (c === "*") s.innerHTML = STAR_SVG;
          else s.textContent = c;
          s.style.width = widths[i] + "px";
          s.style.marginLeft = -widths[i] / 2 + "px";
          s.style.transform =
            side === "front"
              ? `rotateY(${deg.toFixed(3)}deg) translateZ(${R.toFixed(2)}px)`
              : `rotateY(${(-deg).toFixed(3)}deg) translateZ(${(-R).toFixed(2)}px)`;
          frag.appendChild(s);
        });
      });

      spin.appendChild(frag);
      const startDeg = -(((nameStart + nameEnd) / 2 / total) * 360);
      root.style.setProperty("--start", startDeg.toFixed(2) + "deg");
    }

    const run = () => build();
    run();
    // re-measure once the web font has loaded (letter widths change)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { lastSize = 0; run(); });
    }

    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(run, 150); });
  }


  /* ========================================================================
     ABOUT — words light up as the paragraph scrolls through the viewport
     ======================================================================== */
  // Phrases that light up in the gradient colour (taken from the About text)
  const ABOUT_KEY_PHRASES = [
    "banking domain expertise",
    "business analysis capabilities",
    "Mainframe technology experience",
    "operational excellence"
  ];

  function initAboutWords() {
    const el = $("[data-words]");
    if (!el) return;
    const text = el.textContent.replace(/\s+/g, " ").trim();
    const words = text.split(" ");

    // mark words that belong to a key phrase
    const keyIdx = new Set();
    ABOUT_KEY_PHRASES.forEach((phrase) => {
      const p = phrase.split(" ");
      for (let i = 0; i <= words.length - p.length; i++) {
        if (p.every((w, k) => words[i + k].replace(/[.,]/g, "").toLowerCase() === w.toLowerCase())) {
          for (let k = 0; k < p.length; k++) keyIdx.add(i + k);
        }
      }
    });

    el.setAttribute("aria-label", text);
    el.innerHTML = words
      .map((w, i) => `<span class="w${keyIdx.has(i) ? " is-key" : ""}" aria-hidden="true">${esc(w)}</span>`)
      .join(" ");
    const spans = $$(".w", el);

    if (reducedMotion) { spans.forEach((s) => s.classList.add("is-lit")); return; }

    let ticking = false;
    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height), 0, 1);
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("is-lit", i < lit));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }


  /* ========================================================================
     SKILLS — dial + holographic panel
     ------------------------------------------------------------------------
     • Click / tap a node, use the arrows, the step bars, arrow keys,
       or drag the ring to spin it.
     • Auto-advances every AUTO_MS while the section is on screen.
       Pauses on hover and for a while after the visitor interacts.
     ======================================================================== */
  const AUTO_MS = 7000;        // time each skill stays on screen
  const IDLE_RESUME_MS = 15000; // pause after a manual interaction

  function initSkills() {
    const skills = window.SKILLS || [];
    const dial = $("#dial");
    const ring = $("#dial-ring");
    const body = $("#sp-body");
    if (!dial || !ring || !body || !skills.length) return;

    const N = skills.length;
    const STEP = 360 / N;
    const coreIcon = $("#dial-core-icon");
    const coreIndex = $("#dial-core-index");
    const progressBar = $("#dial-progress");
    const stepsWrap = $("#sp-steps");
    const panel = $("#skill-panel");
    const section = $("#skills");

    $("#dial-core-total").textContent = pad(N);
    $("#sp-total").textContent = pad(N);

    // tick marks on the outer scale
    const scale = $(".dial__scale", dial);
    let ticks = '<circle cx="100" cy="100" r="99"/>';
    for (let i = 0; i < 120; i++) {
      const a = (i * 3 * Math.PI) / 180;
      const major = i % 10 === 0;
      const r1 = major ? 91 : 93.5;
      const r2 = 96.5;
      ticks += `<line class="${major ? "is-major" : ""}" x1="${(100 + r1 * Math.cos(a)).toFixed(2)}" y1="${(100 + r1 * Math.sin(a)).toFixed(2)}" x2="${(100 + r2 * Math.cos(a)).toFixed(2)}" y2="${(100 + r2 * Math.sin(a)).toFixed(2)}"/>`;
    }
    scale.innerHTML = ticks;

    // nodes
    const nodes = skills.map((s, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "dial-node";
      b.id = `skill-tab-${i}`;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "sp-body");
      b.setAttribute("aria-label", s.title);
      b.style.setProperty("--a", i * STEP + "deg");
      b.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${esc(s.icon)}"/></svg><span class="dial-node__num" aria-hidden="true">${pad(i + 1)}</span>`;
      b.addEventListener("click", () => { if (!suppressClick) go(i, true); });
      ring.appendChild(b);
      return b;
    });

    // step bars in the panel footer
    const steps = skills.map((s, i) => {
      const el = document.createElement("span");
      el.className = "sp-step";
      el.innerHTML = '<span class="sp-step__fill"></span>';
      el.addEventListener("click", () => go(i, true));
      stepsWrap.appendChild(el);
      return el;
    });

    let current = -1;
    let rot = 0;
    let swapTimer = null;
    let elapsed = 0;
    let pausedUntil = 0;
    let hovering = false;
    let inView = false;
    let suppressClick = false;

    const setRot = (deg) => { rot = deg; dial.style.setProperty("--rot", rot + "deg"); };

    function go(i, byUser, keepRot) {
      i = ((i % N) + N) % N;
      if (byUser) pausedUntil = performance.now() + IDLE_RESUME_MS;
      if (!keepRot) {
        // rotate the shortest way so node i lands on the pointer (0° = right)
        const target = -i * STEP;
        const diff = ((((target - rot) % 360) + 540) % 360) - 180;
        setRot(rot + diff);
      }
      if (i === current) return;
      const first = current === -1;
      current = i;
      elapsed = 0;

      nodes.forEach((n, k) => {
        const on = k === i;
        n.classList.toggle("is-active", on);
        n.setAttribute("aria-selected", String(on));
        n.tabIndex = on ? 0 : -1;
      });
      steps.forEach((s, k) => {
        s.classList.toggle("is-active", k === i);
        s.classList.toggle("is-done", k < i);
        $(".sp-step__fill", s).style.transform = "scaleX(0)";
      });
      body.setAttribute("aria-labelledby", nodes[i].id);

      const s = skills[i];
      coreIcon.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${esc(s.icon)}"/></svg>`;
      coreIcon.classList.remove("is-swap"); void coreIcon.offsetWidth; coreIcon.classList.add("is-swap");
      coreIndex.textContent = pad(i + 1);
      $("#sp-index").textContent = pad(i + 1);
      $("#sp-slug").textContent = s.slug || "";

      renderPanel(s, i, first);
    }

    // builds the panel content; every [data-anim] fades in with its own delay
    function renderPanel(s, i, first) {
      const D = (t) => `style="--d:${t.toFixed(2)}s"`;
      const build = () => {
        let html =
          `<div class="sp-title-row" data-anim ${D(0)}>` +
            `<span class="sp-icon"><svg class="icon" aria-hidden="true"><use href="#i-${esc(s.icon)}"/></svg></span>` +
            `<div><p class="sp-kicker mono">Module ${pad(i + 1)}</p><h3 class="sp-title">${esc(s.title)}</h3></div>` +
          `</div>` +
          `<p class="sp-label" data-anim ${D(0.12)}>${esc(s.lead || "Focus areas")}</p>` +
          `<ul class="sp-chips">` +
            (s.chips || []).map((c, k) =>
              `<li class="sp-chip" data-anim ${D(0.2 + k * 0.08)}><span class="sp-chip__dot" aria-hidden="true"></span>${esc(c)}</li>`
            ).join("") +
          `</ul>`;

        if (s.outcome) {
          const base = 0.3 + (s.chips || []).length * 0.08;
          html +=
            `<div class="sp-outcome" data-anim ${D(base)}>` +
              `<p class="sp-label">${esc(s.outcomeLabel || "Outcome")}</p>` +
              `<p class="sp-outcome__text">` +
                s.outcome.split(" ").map((w, k) => `<span class="wd" data-anim ${D(base + 0.15 + k * 0.035)}>${esc(w)}</span>`).join(" ") +
              `</p>` +
            `</div>`;
        }

        body.innerHTML = html;
        body.classList.remove("is-out", "is-in");
        void body.offsetWidth;                 // commit the hidden state first
        body.classList.add("is-in");
      };

      clearTimeout(swapTimer);
      if (first) build();
      else {
        body.classList.remove("is-in");
        body.classList.add("is-out");
        swapTimer = setTimeout(build, 360);
      }
    }

    // arrows + keyboard
    $("#sp-prev").addEventListener("click", () => go(current - 1, true));
    $("#sp-next").addEventListener("click", () => go(current + 1, true));
    ring.addEventListener("keydown", (e) => {
      const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      if (e.key in map) {
        e.preventDefault();
        go(current + map[e.key], true);
        nodes[current].focus({ preventScroll: true });
      } else if (e.key === "Home") { e.preventDefault(); go(0, true); nodes[0].focus(); }
      else if (e.key === "End") { e.preventDefault(); go(N - 1, true); nodes[N - 1].focus(); }
    });

    // drag to spin the ring (touchscreen feel)
    let drag = null;
    const angleOf = (e) => Math.atan2(e.clientY - drag.cy, e.clientX - drag.cx) * 180 / Math.PI;
    const norm = (d) => ((((d % 360) + 540) % 360) - 180);

    dial.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      const r = dial.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      if (Math.hypot(e.clientX - cx, e.clientY - cy) < r.width * 0.22) return; // centre button
      drag = { cx, cy, last: 0, total: 0, startRot: rot, moved: false, id: e.pointerId };
      drag.last = angleOf(e);
    });
    window.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const a = angleOf(e);
      drag.total += norm(a - drag.last);
      drag.last = a;
      if (!drag.moved && Math.abs(drag.total) > 4) {
        drag.moved = true;
        dial.classList.add("is-dragging");
        try { dial.setPointerCapture(e.pointerId); } catch (_) {}
      }
      if (drag.moved) setRot(drag.startRot + drag.total);
    });
    const endDrag = (e) => {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      if (drag.moved) {
        dial.classList.remove("is-dragging");
        const snapped = Math.round(rot / STEP) * STEP;
        setRot(snapped);
        const idx = ((Math.round(-snapped / STEP) % N) + N) % N;
        go(idx, true, true);
        suppressClick = true;
        setTimeout(() => { suppressClick = false; }, 60);
      }
      drag = null;
    };
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    // pause on hover; only run while visible
    const layout = $(".skills__layout");
    layout.addEventListener("mouseenter", () => { hovering = true; });
    layout.addEventListener("mouseleave", () => { hovering = false; });
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0.35 }).observe(dial);

    // subtle 3D parallax on the panel (desktop only)
    const desktop = window.matchMedia("(min-width: 1025px)");
    section.addEventListener("mousemove", (e) => {
      if (!desktop.matches || reducedMotion) return;
      const r = section.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      panel.style.setProperty("--ry", (-11 + x * 8).toFixed(2) + "deg");
      panel.style.setProperty("--rx", (3 - y * 6).toFixed(2) + "deg");
    });
    section.addEventListener("mouseleave", () => {
      panel.style.removeProperty("--ry");
      panel.style.removeProperty("--rx");
    });

    // autoplay loop (drives the core progress ring + active step bar)
    let last = performance.now();
    function tick(now) {
      const dt = now - last;
      last = now;
      if (inView && !document.hidden) {
        const paused = reducedMotion || hovering || drag || now < pausedUntil;
        if (!paused) {
          elapsed += dt;
          if (elapsed >= AUTO_MS) go(current + 1, false);
        }
        const p = clamp(elapsed / AUTO_MS, 0, 1);
        progressBar.style.strokeDashoffset = (100 - p * 100).toFixed(2);
        const fill = steps[current] && $(".sp-step__fill", steps[current]);
        if (fill) fill.style.transform = `scaleX(${p.toFixed(3)})`;
      }
      requestAnimationFrame(tick);
    }

    go(0, false);
    requestAnimationFrame(tick);
  }


  /* ========================================================================
     PROJECTS — carousel (cards built from window.PROJECTS)
     ======================================================================== */
  const PROJECT_HUES = [325, 25, 265, 200, 345, 45, 285, 175]; // placeholder orb colours

  function initCarousel() {
    const data = window.PROJECTS || [];
    const track = $("#carousel-track");
    const dotsWrap = $("#carousel-dots");
    if (!track || !data.length) return;
    const N = data.length;
    $("#carousel-total").textContent = pad(N);

    let current = 0;
    let dragMoved = false;

    const cards = data.map((p, i) => {
      const card = document.createElement("article");
      card.className = "pcard";
      card.setAttribute("aria-roledescription", "slide");
      card.setAttribute("aria-label", `${i + 1} of ${N}: ${p.name}`);
      const hasLink = p.link && p.link !== "#";
      const media = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.name)} — screenshot" loading="lazy">`
        : `<div class="pcard__ph" style="--h:${PROJECT_HUES[i % PROJECT_HUES.length]}"><span class="pcard__orb"></span><span class="pcard__ph-label">IMAGE PLACEHOLDER</span></div>`;

      card.innerHTML =
        `<div class="pcard__media">${media}</div>` +
        `<div class="pcard__body">` +
          `<div class="pcard__top"><span class="pcard__num">PROJECT ${pad(i + 1)}</span>${p.placeholder ? '<span class="pcard__badge">Placeholder</span>' : ""}</div>` +
          `<h3 class="pcard__title">${esc(p.name)}</h3>` +
          `<p class="pcard__desc">${esc(p.description)}</p>` +
          `<p class="pcard__stack-label">Tech stack</p>` +
          `<ul class="pcard__stack">${(p.stack || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` +
          `<a class="btn btn--ghost pcard__link" href="${esc(p.link || "#")}"${hasLink ? ' target="_blank" rel="noopener"' : ""}>View project <svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg></a>` +
        `</div>`;

      card.addEventListener("click", (e) => {
        if (dragMoved) { e.preventDefault(); return; }
        if (i !== current) { e.preventDefault(); go(i); }
      });
      track.appendChild(card);
      return card;
    });

    const dots = data.map((p, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "carousel__dot";
      d.setAttribute("role", "tab");
      d.setAttribute("aria-label", `Go to project ${i + 1}`);
      d.addEventListener("click", () => go(i));
      dotsWrap.appendChild(d);
      return d;
    });

    function layout(dx = 0) {
      cards.forEach((card, i) => {
        let off = i - current;
        if (off > N / 2) off -= N;
        if (off < -N / 2) off += N;
        const abs = Math.abs(off);
        const scale = abs === 0 ? 1 : abs === 1 ? 0.84 : 0.7;
        const opacity = abs === 0 ? 1 : abs === 1 ? 0.45 : 0;
        card.style.transform = `translateX(calc(${off * 86}% + ${dx}px)) scale(${scale})`;
        card.style.opacity = opacity;
        card.style.zIndex = String(10 - abs);
        card.style.filter = abs === 0 ? "none" : "saturate(.6) brightness(.8)";
        card.style.visibility = abs > 2 ? "hidden" : "visible";
        card.setAttribute("aria-hidden", String(abs !== 0));
        $$("a", card).forEach((a) => { a.tabIndex = abs === 0 ? 0 : -1; });
      });
      dots.forEach((d, i) => {
        d.classList.toggle("is-active", i === current);
        d.setAttribute("aria-selected", String(i === current));
      });
      $("#carousel-index").textContent = pad(current + 1);
    }

    function go(i) {
      current = ((i % N) + N) % N;
      layout();
    }

    $("#carousel-prev").addEventListener("click", () => go(current - 1));
    $("#carousel-next").addEventListener("click", () => go(current + 1));
    $("#carousel").addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(current - 1);
      if (e.key === "ArrowRight") go(current + 1);
    });

    // swipe / drag
    let start = null;
    track.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
      dragMoved = false;
    });
    track.addEventListener("pointermove", (e) => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x;
      if (!dragMoved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - start.y)) {
        dragMoved = true;
        track.classList.add("is-dragging");
        try { track.setPointerCapture(e.pointerId); } catch (_) {}
      }
      if (dragMoved) layout(dx);
    });
    const end = (e) => {
      if (!start || e.pointerId !== start.id) return;
      const dx = e.clientX - start.x;
      track.classList.remove("is-dragging");
      if (dragMoved) {
        if (dx < -60) go(current + 1);
        else if (dx > 60) go(current - 1);
        else layout();
        setTimeout(() => { dragMoved = false; }, 60);
      }
      start = null;
    };
    track.addEventListener("pointerup", end);
    track.addEventListener("pointercancel", end);

    layout();
  }


  /* ========================================================================
     BOOK A CALL FORM
     ------------------------------------------------------------------------
     • If SITE.formEndpoint is set (e.g. Formspree) → sends the form there.
     • Otherwise → opens WhatsApp with the visitor's details pre-filled.
     ======================================================================== */
  function initForm() {
    const form = $("#book-call");
    if (!form) return;
    const status = $("#form-status");
    const btn = $("button[type=submit]", form);
    const label = $(".btn__label", btn);

    const rules = {
      name: (v) => v.trim().length >= 2 || "Please enter your name.",
      phone: (v) => /^[+\d][\d\s()-]{6,}$/.test(v.trim()) || "Please enter a valid phone number.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
      requirement: (v) => v.trim().length >= 10 || "Please add a short brief (at least 10 characters)."
    };

    const setError = (input, msg) => {
      const field = input.closest(".field");
      let err = $(".field__error", field);
      field.classList.toggle("is-invalid", !!msg);
      input.setAttribute("aria-invalid", msg ? "true" : "false");
      if (msg) {
        if (!err) {
          err = document.createElement("span");
          err.className = "field__error";
          err.id = input.id + "-err";
          field.appendChild(err);
          input.setAttribute("aria-describedby", err.id);
        }
        err.textContent = msg;
      } else if (err) err.remove();
    };

    $$(".field__input", form).forEach((input) =>
      input.addEventListener("input", () => {
        if (input.closest(".field").classList.contains("is-invalid")) {
          const ok = rules[input.name](input.value);
          setError(input, ok === true ? "" : ok);
        }
      })
    );

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      let firstBad = null;
      const values = {};
      Object.keys(rules).forEach((name) => {
        const input = form.elements[name];
        values[name] = input.value.trim();
        const ok = rules[name](input.value);
        setError(input, ok === true ? "" : ok);
        if (ok !== true && !firstBad) firstBad = input;
      });
      if (firstBad) { firstBad.focus(); return; }

      // 1) form service configured → send it
      if (SITE.formEndpoint) {
        btn.disabled = true;
        label.textContent = "Sending…";
        try {
          const res = await fetch(SITE.formEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(values)
          });
          if (!res.ok) throw new Error(res.status);
          form.reset();
          status.textContent = "Thank you — your request has been sent. I'll be in touch to schedule the call.";
          status.classList.add("is-ok");
        } catch (err) {
          status.textContent = "Sorry, something went wrong. Please message me on WhatsApp instead.";
          status.classList.add("is-err");
        } finally {
          btn.disabled = false;
          label.textContent = "Book a call";
        }
        return;
      }

      // 2) no form service yet → hand the details over via WhatsApp
      const msg =
        `Hi Anshumali, I'd like to book a call.\n\n` +
        `Name: ${values.name}\nPhone: ${values.phone}\nEmail: ${values.email}\n\n` +
        `Requirement: ${values.requirement}`;
      window.open(waLink(msg), "_blank", "noopener");
      status.textContent = "Opening WhatsApp with your details — just press send.";
      status.classList.add("is-ok");
    });
  }


  /* ========================================================================
     LIQUID GLASS — highlight follows the cursor
     ======================================================================== */
  function initGlass() {
    $$("[data-glass]").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }


  /* ---------- boot ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  initWhatsAppLinks();
  initNav();
  initReveal();
  initNameRing();
  initAboutWords();
  initSkills();
  initCarousel();
  initForm();
  initGlass();
})();
