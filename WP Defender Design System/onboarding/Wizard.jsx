// Wizard direction — classic multi-step with left step rail + progress bar.
// Step flow: Welcome → Connect WPMU DEV → Hardening → Firewalls → Run scan → Done

const WIZ_STEPS = [
  { key: "welcome",   label: "Welcome" },
  { key: "connect",   label: "Connect account" },
  { key: "hardening", label: "Hardening" },
  { key: "firewalls", label: "Firewalls" },
  { key: "scan",      label: "First scan" },
  { key: "done",      label: "All set" },
];

function WizardOnboarding({ step: extStep, setStep: extSetStep }) {
  const [internalStep, setInternalStep] = React.useState(0);
  const step = extStep ?? internalStep;
  const setStep = extSetStep ?? setInternalStep;
  const s = WIZ_STEPS[step];

  return (
    <WPShell>
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Step rail */}
        <div style={{
          width: 260, background: "#fff", borderRight: "1px solid var(--border-default)",
          padding: "30px 0", display: "flex", flexDirection: "column", flexShrink: 0,
        }}>
          <div style={{ padding: "0 24px 20px", fontSize: 11, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fg-2)" }}>
            Setup · {step + 1} of {WIZ_STEPS.length}
          </div>
          {WIZ_STEPS.map((it, i) => {
            const active = i === step;
            const done = i < step;
            return (
              <div key={it.key} onClick={() => i <= step && setStep(i)}
                style={{
                  display: "flex", alignItems: "center", gap: 12, height: 44, padding: "0 24px",
                  cursor: i <= step ? "pointer" : "default",
                  background: active ? "var(--ink-50)" : "transparent",
                  borderLeft: active ? "3px solid var(--ink-800)" : "3px solid transparent",
                  paddingLeft: active ? 21 : 24,
                }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 100,
                  background: done ? "var(--ink-800)" : active ? "#fff" : "transparent",
                  border: done ? "none" : active ? "1.5px solid var(--ink-800)" : "1.5px solid var(--border-default)",
                  color: done ? "#fff" : "var(--fg-1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 600, fontVariantNumeric: "tabular-nums",
                }}>{done ? "✓" : i + 1}</div>
                <span style={{
                  fontSize: 14, color: active ? "var(--fg-1)" : done ? "var(--fg-1)" : "var(--fg-2)",
                  fontWeight: active ? 500 : 400,
                }}>{it.label}</span>
              </div>
            );
          })}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "0 24px" }}>
            <div style={{
              height: 4, background: "var(--border-default)", borderRadius: 100, overflow: "hidden", marginBottom: 8,
            }}>
              <div style={{
                width: `${((step + 1) / WIZ_STEPS.length) * 100}%`, height: "100%",
                background: "var(--success)", transition: "width 240ms cubic-bezier(.2,0,0,1)",
              }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--fg-2)" }}>~2 min remaining</div>
          </div>
        </div>

        {/* Step content */}
        <div style={{ flex: 1, overflow: "auto", position: "relative" }}>
          {s.key === "welcome"   && <WizWelcome   onNext={() => setStep(1)} />}
          {s.key === "connect"   && <WizConnect   onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {s.key === "hardening" && <WizHardening onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {s.key === "firewalls" && <WizFirewalls onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {s.key === "scan"      && <WizScan      onNext={() => setStep(5)} onBack={() => setStep(3)} />}
          {s.key === "done"      && <WizDone      onNext={() => setStep(0)} />}
        </div>
      </div>
    </WPShell>
  );
}

// ─────────────── Steps ───────────────

function WizWelcome({ onNext }) {
  return (
    <StepBody>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <HeroShield />
        <div>
          <h1 style={{ fontSize: 32, lineHeight: "40px", fontWeight: 400, margin: 0, color: "var(--fg-1)" }}>Let's get your site protected</h1>
          <p style={{ fontSize: 16, lineHeight: "26px", color: "var(--fg-2)", margin: "10px 0 0", maxWidth: 460 }}>
            We'll harden WordPress, turn on firewalls, and run a full security scan — about 2 minutes.
          </p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, maxWidth: 680, width: "100%",
          border: "1px solid var(--border-default)", borderRadius: 16, overflow: "hidden", background: "#fff", marginTop: 10,
        }}>
          <ValueCol
            header="Always free"
            bullets={[
              "WordPress hardening (all 9)",
              "Local firewall & login protection",
              "2FA, mask login, limit attempts",
              "File-change malware scan",
              "Unlimited manual scans",
            ]}
            tone="free"
          />
          <ValueCol
            header="With free WPMU DEV account"
            bullets={[
              "Antibot Global Firewall",
              "Central IP blocklist (crowd-sourced)",
              "Vulnerability scan (CVE database)",
              "Suspicious code scan",
              "Email alerts & cross-site management",
            ]}
            tone="locked"
            divider
          />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <Button variant="solid" size="md" onClick={onNext}>Start setup <Icon name="arrow-right" size={14} color="#fff" /></Button>
          <Button variant="text" size="md" onClick={onNext}>I'll explore on my own</Button>
        </div>
      </div>
    </StepBody>
  );
}

function ValueCol({ header, bullets, tone, divider }) {
  const tint = tone === "free" ? "rgba(0,228,72,.10)" : "rgba(87,30,231,.06)";
  return (
    <div style={{
      padding: 22, borderLeft: divider ? "1px solid var(--border-default)" : "none",
      textAlign: "left", background: tint,
    }}>
      <div style={{ marginBottom: 10 }}>
        <OBPill tone={tone === "free" ? "free" : "locked"}>{header}</OBPill>
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 14, color: "var(--fg-1)" }}>
            <Icon name={tone === "free" ? "check" : "lock"} size={14} color={tone === "free" ? "var(--success-ink)" : "var(--brand-purple)"} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WizConnect({ onNext, onBack }) {
  const [mode, setMode] = React.useState("signup"); // signup | signin
  const [email, setEmail] = React.useState("sam@rocket-site.com");
  const [password, setPassword] = React.useState("••••••••");
  const [site, setSite] = React.useState("rocket-site.com");

  return (
    <StepBody footer={<WizFooter onBack={onBack} primary={<>
      <Button variant="text" size="md" onClick={onNext}>Skip — I'll sign up later</Button>
      <Button variant="solid" size="md" onClick={onNext}>{mode === "signup" ? "Create free account" : "Sign in"} <Icon name="arrow-right" size={14} color="#fff" /></Button>
    </>} />}>
      <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <StepHeader
          eyebrow="Step 2"
          title="Connect a free WPMU DEV account"
          sub="Your account unlocks Antibot Firewall, Central IP blocklist, vulnerability and suspicious-code scans — all free. Takes 30 seconds, no card needed."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, marginTop: 24 }}>
          {/* Form */}
          <div style={{ background: "#fff", border: "1px solid var(--border-default)", borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", background: "var(--ink-50)", borderRadius: 10, padding: 3, marginBottom: 20 }}>
              {[
                { key: "signup", label: "Create account" },
                { key: "signin", label: "I have one" },
              ].map(t => (
                <div key={t.key} onClick={() => setMode(t.key)} style={{
                  flex: 1, textAlign: "center", padding: "8px 0", fontSize: 13, fontWeight: 500,
                  borderRadius: 8, cursor: "pointer",
                  background: mode === t.key ? "#fff" : "transparent",
                  color: mode === t.key ? "var(--fg-1)" : "var(--fg-2)",
                  boxShadow: mode === t.key ? "0 1px 2px rgba(0,0,0,.06)" : "none",
                }}>{t.label}</div>
              ))}
            </div>
            <LabeledInput label="Email" value={email} onChange={setEmail} />
            <LabeledInput label="Password" value={password} onChange={setPassword} type="password" hint={mode === "signup" ? "At least 8 characters" : undefined} />
            {mode === "signup" && <LabeledInput label="Site URL" value={site} onChange={setSite} hint="We'll link this install to your account" />}
            {mode === "signin" && <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: -4 }}><a href="#" style={{ color: "var(--brand-indigo)" }}>Forgot password?</a></div>}
            <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 12, lineHeight: 1.5 }}>
              By {mode === "signup" ? "creating an account" : "signing in"}, you agree to the <a href="#" style={{ color: "var(--fg-1)" }}>Terms</a> and <a href="#" style={{ color: "var(--fg-1)" }}>Privacy Policy</a>.
            </div>
          </div>

          {/* Value side */}
          <div style={{
            background: "#fffdc1", border: "1px solid rgba(0,0,0,.06)", borderRadius: 16, padding: 24,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".08em", color: "#6b5a1f", marginBottom: 14 }}>
              What an account unlocks
            </div>
            <UnlockItem icon="firewall" title="Antibot Global Firewall" desc="Blocks bots using patterns from millions of WPMU DEV sites." />
            <UnlockItem icon="shield-check" title="Central IP Firewall" desc="Shared blocklist refreshed hourly — block bad actors before they hit you." />
            <UnlockItem icon="warning-triangle" title="Vulnerability scan" desc="Matches every plugin & theme against the Patchstack CVE database." />
            <UnlockItem icon="scan" title="Suspicious code scan" desc="Pattern-matches backdoors, base64 dumps and injections in PHP." />
            <div style={{ marginTop: 14, display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: "#6b5a1f" }}>
              <Icon name="check" size={12} color="#067b2a" /> Free forever · no card
            </div>
          </div>
        </div>
      </div>
    </StepBody>
  );
}

function UnlockItem({ icon, title, desc }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(0,0,0,.06)" }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: "#4a1300", display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <img src={`../assets/icons/${icon}.svg`} width="14" height="14" style={{ filter: "invert(1)" }} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "#3d2d00" }}>{title}</div>
        <div style={{ fontSize: 12, color: "#6b5a1f", lineHeight: 1.45 }}>{desc}</div>
      </div>
    </div>
  );
}

function LabeledInput({ label, value, onChange, type = "text", hint }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--fg-2)", marginBottom: 6 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        style={{
          width: "100%", height: 40, border: "1px solid rgba(26,26,26,.15)", borderRadius: 10,
          padding: "0 12px", fontFamily: "var(--font-sans)", fontSize: 14, outline: "none",
          background: "#fff", boxSizing: "border-box",
        }} />
      {hint && <div style={{ fontSize: 11, color: "var(--fg-2)", marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

function WizHardening({ onNext, onBack }) {
  const [items, setItems] = React.useState([
    { key: "xmlrpc",   label: "Disable XML-RPC & hide error reporting",  on: true },
    { key: "pingbacks", label: "Disable trackbacks & pingbacks",           on: true },
    { key: "phpexec",  label: "Prevent PHP execution & file edit",        on: true },
    { key: "discover", label: "Prevent enumeration & disclosure",         on: true },
    { key: "keys",     label: "Automatically regenerate security keys",   on: true },
    { key: "dbprefix", label: "Change database prefix",                   on: false, advanced: true },
    { key: "hidelog",  label: "Hide default login URL",                   on: false, advanced: true },
    { key: "permissions", label: "Fix file & folder permissions",         on: true },
    { key: "adminuser", label: "Check for default admin username",        on: true },
  ]);
  const count = items.filter(i => i.on).length;
  return (
    <StepBody footer={<WizFooter onBack={onBack} primary={<Button variant="solid" size="md" onClick={onNext}>Apply {count} & continue <Icon name="arrow-right" size={14} color="#fff" /></Button>} />}>
      <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <StepHeader
          eyebrow="Step 3"
          title="Harden your WordPress install"
          sub="We've pre-selected the 7 recommendations every site should have. You can revisit these anytime from the Hardening tab."
        />
        <div style={{
          background: "#fff", border: "1px solid var(--border-default)", borderRadius: 16, marginTop: 24, overflow: "hidden",
        }}>
          <div style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border-default)", background: "var(--ink-50)" }}>
            <Icon name="shield-check" size={16} color="var(--success-ink)" />
            <div style={{ fontSize: 13, flex: 1 }}>
              <b style={{ fontFamily: "var(--font-mono)" }}>{count}</b> of {items.length} recommended hardening rules enabled
            </div>
            <Button variant="line" size="sm" onClick={() => setItems(items.map(i => ({ ...i, on: true })))}>Enable all</Button>
          </div>
          {items.map((it, i) => (
            <div key={it.key} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
              borderBottom: i < items.length - 1 ? "1px solid var(--border-default)" : "none",
            }}>
              <div style={{ flex: 1, fontSize: 14 }}>
                {it.label}
                {it.advanced && <span style={{ marginLeft: 8 }}><OBPill tone="neutral">Advanced</OBPill></span>}
              </div>
              <Icon name="info-circle" size={14} color="var(--fg-2)" />
              <Toggle on={it.on} onChange={(v) => setItems(items.map((x, j) => j === i ? { ...x, on: v } : x))} />
            </div>
          ))}
        </div>
      </div>
    </StepBody>
  );
}

function WizFirewalls({ onNext, onBack }) {
  const [local, setLocal] = React.useState(true);
  const [antibot, setAntibot] = React.useState(true);
  const [central, setCentral] = React.useState(true);
  return (
    <StepBody footer={<WizFooter onBack={onBack} primary={<Button variant="solid" size="md" onClick={onNext}>Continue <Icon name="arrow-right" size={14} color="#fff" /></Button>} />}>
      <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
        <StepHeader
          eyebrow="Step 4"
          title="Turn on your firewalls"
          sub="Defender ships with three layers. All free — the two global layers need your WPMU DEV connection."
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 24 }}>
          <FwCard
            title="Local Firewall"
            icon="firewall" iconBg="#1a1a1a"
            desc="Rate-limits logins, blocks suspicious patterns locally. Works offline."
            badge={<OBPill tone="free">Free</OBPill>}
            on={local} onToggle={setLocal}
          />
          <FwCard
            title="Antibot Global Firewall"
            icon="firewall" iconBg="#4a1300"
            desc="Challenge bad bots with a frictionless fingerprint check. Patterns sourced from millions of WPMU DEV sites."
            badge={<OBPill tone="free" icon={<Icon name="user" size={10} color="#067b2a" />}>Free · account required</OBPill>}
            on={antibot} onToggle={setAntibot}
          />
          <FwCard
            title="Central IP Firewall"
            icon="shield-check" iconBg="#4a1300"
            desc="Shared IP blocklist refreshed hourly. Blocks repeat offenders before they reach your site."
            badge={<OBPill tone="free" icon={<Icon name="user" size={10} color="#067b2a" />}>Free · account required</OBPill>}
            on={central} onToggle={setCentral}
          />
        </div>
      </div>
    </StepBody>
  );
}

function FwCard({ title, icon, iconBg, desc, badge, on, onToggle }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-default)", borderRadius: 16,
      padding: 18, display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14, background: iconBg,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <img src={`../assets/icons/${icon}.svg`} width="20" height="20" style={{ filter: "invert(1)" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{title}</div>
          {badge}
        </div>
        <div style={{ fontSize: 13, color: "var(--fg-2)", lineHeight: 1.5 }}>{desc}</div>
      </div>
      <Toggle on={on} onChange={onToggle} />
    </div>
  );
}

function WizScan({ onNext, onBack }) {
  const [phase, setPhase] = React.useState("idle"); // idle | running | emailed
  const [progress, setProgress] = React.useState(0);
  const [emailNotify, setEmailNotify] = React.useState(true);
  const raf = React.useRef();
  React.useEffect(() => {
    if (phase !== "running") return;
    let p = 0;
    raf.current = setInterval(() => {
      p += 0.7 + Math.random() * 1.4;
      setProgress(Math.min(p, 62));
      if (p >= 62) clearInterval(raf.current);
    }, 120);
    return () => clearInterval(raf.current);
  }, [phase]);

  return (
    <StepBody footer={phase === "emailed" ? null : <WizFooter onBack={onBack} primary={
      phase === "idle"
        ? <Button variant="solid" size="md" onClick={() => setPhase("running")}>Start first scan <Icon name="scan" size={14} color="#fff" /></Button>
        : <Button variant="solid" size="md" onClick={() => setPhase("emailed")}>Notify me when complete <Icon name="bell" size={14} color="#fff" /></Button>
    } />}>
      <div style={{ maxWidth: 640, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <StepHeader
          eyebrow="Step 5"
          title={phase === "idle" ? "Run your first scan" : phase === "running" ? "Scanning your site…" : "You're all set"}
          sub={
            phase === "idle"
              ? "We'll check file integrity, match plugins against the vulnerability database, and look for suspicious code. Typically 3–6 minutes on a site this size."
              : phase === "running"
              ? "This runs in the background. You can close this window — we'll keep going and ping you when it's done."
              : "Scan is running in the background. We'll email you and surface results in the Defender dashboard when it's complete."
          }
        />

        {phase === "idle" && (
          <div style={{ marginTop: 30, display: "flex", justifyContent: "center" }}>
            <HeroShield orbs={false} size={140} />
          </div>
        )}

        {phase === "running" && (
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
            <ScanRing progress={progress} />
            <div style={{ background: "#fffdc1", border: "1px solid rgba(0,0,0,.06)", borderRadius: 16, padding: "16px 20px", width: "100%", textAlign: "left", display: "flex", flexDirection: "column", gap: 4 }}>
              <ScanLog done={progress > 10} label="File integrity check" />
              <ScanLog done={progress > 30} label="Plugin & theme vulnerability scan" />
              <ScanLog active={progress > 30 && progress < 55} done={progress > 55} label="Suspicious code patterns" />
              <ScanLog active={progress > 55} done={false} label="Core file verification" />
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--fg-2)", cursor: "pointer" }}>
              <input type="checkbox" checked={emailNotify} onChange={e => setEmailNotify(e.target.checked)} style={{ accentColor: "var(--ink-800)" }} />
              Email me results too (sam@rocket-site.com)
            </label>
          </div>
        )}

        {phase === "emailed" && (
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%", background: "rgba(0,228,72,.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon name="bell" size={32} color="var(--success-ink)" />
            </div>
            <div style={{
              background: "#fff", border: "1px solid var(--border-default)", borderRadius: 16,
              padding: 20, width: "100%", textAlign: "left",
            }}>
              <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>You'll know two ways:</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                <Icon name="bell" size={16} color="var(--fg-1)" />
                <div style={{ flex: 1, fontSize: 13, color: "var(--fg-2)" }}>A <b style={{ color: "var(--fg-1)" }}>dashboard notification</b> in Defender when scan completes</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <Icon name="activity" size={16} color="var(--fg-1)" />
                <div style={{ flex: 1, fontSize: 13, color: "var(--fg-2)" }}>An <b style={{ color: "var(--fg-1)" }}>email to sam@rocket-site.com</b> with a summary and action link</div>
              </div>
            </div>
            <Button variant="solid" size="md" onClick={onNext}>Take me to the dashboard <Icon name="arrow-right" size={14} color="#fff" /></Button>
          </div>
        )}
      </div>
    </StepBody>
  );
}

function ScanLog({ done, active, label }) {
  const color = done ? "var(--success-ink)" : active ? "var(--fg-1)" : "var(--fg-2)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color, fontFamily: active ? "var(--font-mono)" : "var(--font-sans)" }}>
      {done ? (
        <Icon name="check" size={14} color="var(--success-ink)" />
      ) : active ? (
        <div style={{ width: 14, height: 14, border: "2px solid var(--fg-2)", borderTopColor: "var(--fg-1)", borderRadius: "50%", animation: "spin 800ms linear infinite" }} />
      ) : (
        <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid rgba(0,0,0,.2)" }} />
      )}
      {label}
    </div>
  );
}

function ScanRing({ progress }) {
  const r = 60, C = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: 160, height: 160 }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--border-default)" strokeWidth="8" />
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--ink-800)" strokeWidth="8" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C - (C * progress) / 100}
          transform="rotate(-90 80 80)" style={{ transition: "stroke-dashoffset 160ms linear" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 34, lineHeight: 1 }}>{Math.round(progress)}<span style={{ fontSize: 18, color: "var(--fg-2)" }}>%</span></div>
        <div style={{ fontSize: 11, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: ".08em", marginTop: 4 }}>Scanning</div>
      </div>
    </div>
  );
}

function WizDone({ onNext }) {
  return (
    <StepBody>
      <div style={{ maxWidth: 640, margin: "0 auto", width: "100%", textAlign: "center" }}>
        <div style={{
          width: 96, height: 96, borderRadius: "50%", background: "rgba(0,228,72,.15)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
        }}>
          <Icon name="shield-check" size={42} color="var(--success-ink)" />
        </div>
        <h1 style={{ fontSize: 32, lineHeight: "40px", fontWeight: 400, margin: 0 }}>You're protected</h1>
        <p style={{ fontSize: 16, color: "var(--fg-2)", margin: "10px 0 24px" }}>
          Defender is hardened, firewalls are live, and your first scan is running in the background.
        </p>
        <div style={{
          background: "#fff", border: "1px solid var(--border-default)", borderRadius: 16,
          padding: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, textAlign: "left",
        }}>
          <DoneStat value="7" label="Hardening rules applied" />
          <DoneStat value="3" label="Firewalls active" />
          <DoneStat value="1" label="Scan in progress" mono />
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 24 }}>
          <Button variant="solid" size="md" onClick={onNext}>Go to dashboard</Button>
          <Button variant="line" size="md" onClick={onNext}>Review settings</Button>
        </div>
      </div>
    </StepBody>
  );
}

function DoneStat({ value, label }) {
  return (
    <div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 6 }}>{label}</div>
    </div>
  );
}

// ─────────────── Shared bits ───────────────

function StepBody({ children, footer }) {
  return (
    <>
      <div style={{ flex: 1, overflow: "auto", padding: "48px 60px" }}>{children}</div>
      {footer && <div style={{ padding: "18px 60px", borderTop: "1px solid var(--border-default)", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>{footer}</div>}
    </>
  );
}

function StepHeader({ eyebrow, title, sub }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 8 }}>{eyebrow}</div>
      <h1 style={{ fontSize: 28, lineHeight: "36px", fontWeight: 400, margin: 0 }}>{title}</h1>
      {sub && <p style={{ fontSize: 15, lineHeight: "24px", color: "var(--fg-2)", margin: "10px 0 0", maxWidth: 640 }}>{sub}</p>}
    </div>
  );
}

function WizFooter({ onBack, primary }) {
  return (
    <>
      <Button variant="text" size="md" onClick={onBack}>← Back</Button>
      <div style={{ display: "flex", gap: 8 }}>{primary}</div>
    </>
  );
}

Object.assign(window, { WizardOnboarding, WIZ_STEPS });
