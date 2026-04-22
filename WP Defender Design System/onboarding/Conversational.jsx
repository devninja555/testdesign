// Conversational direction — one friendly card at a time, warm + concierge.
// Big type, single focus per screen, playful but calm.

const CONV_STEPS = ["welcome", "plan", "connect", "harden", "firewall", "scan", "done"];

function ConversationalOnboarding({ step: extStep, setStep: extSetStep }) {
  const [internalStep, setInternalStep] = React.useState(0);
  const step = extStep ?? internalStep;
  const setStep = extSetStep ?? setInternalStep;
  const s = CONV_STEPS[step];

  return (
    <WPShell footer="none">
      <div style={{
        flex: 1, background: "linear-gradient(180deg, var(--ink-50), #fff)",
        display: "flex", flexDirection: "column", minHeight: 0,
      }}>
        {/* Top dots progress */}
        <div style={{ padding: "20px 40px 0", display: "flex", alignItems: "center", gap: 8 }}>
          {CONV_STEPS.map((k, i) => (
            <div key={k} style={{
              flex: 1, height: 3, borderRadius: 100,
              background: i <= step ? "var(--ink-800)" : "rgba(0,0,0,.08)",
              transition: "background 240ms",
            }} />
          ))}
        </div>

        <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
          <div key={s} style={{ width: "100%", maxWidth: 720, animation: "fadeIn 320ms ease" }}>
            {s === "welcome"  && <ConvWelcome onNext={() => setStep(1)} />}
            {s === "plan"     && <ConvPlan onNext={() => setStep(2)} onBack={() => setStep(0)} />}
            {s === "connect"  && <ConvConnect onNext={() => setStep(3)} onBack={() => setStep(1)} onSkip={() => setStep(3)} />}
            {s === "harden"   && <ConvHarden onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {s === "firewall" && <ConvFirewall onNext={() => setStep(5)} onBack={() => setStep(3)} />}
            {s === "scan"     && <ConvScan onNext={() => setStep(6)} onBack={() => setStep(4)} />}
            {s === "done"     && <ConvDone onNext={() => setStep(0)} />}
          </div>
        </div>
      </div>
    </WPShell>
  );
}

function ConvCard({ children }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-default)", borderRadius: 24,
      padding: "44px 52px", boxShadow: "0 20px 60px rgba(0,0,0,.04)",
    }}>{children}</div>
  );
}

function ConvWelcome({ onNext }) {
  return (
    <ConvCard>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
        <HeroShield size={120} />
        <div>
          <h1 style={{ fontSize: 40, lineHeight: "48px", fontWeight: 400, margin: 0, letterSpacing: "-0.5px" }}>
            Hi — let's get your site<br />protected in a few minutes.
          </h1>
          <p style={{ fontSize: 17, lineHeight: "28px", color: "var(--fg-2)", margin: "16px 0 0" }}>
            I'm Defender. I'll walk you through it, one step at a time.<br />You can skip anything and come back later.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <Button variant="solid" size="md" onClick={onNext}>Sounds good <Icon name="arrow-right" size={14} color="#fff" /></Button>
        </div>
      </div>
    </ConvCard>
  );
}

function ConvPlan({ onNext, onBack }) {
  return (
    <ConvCard>
      <ConvHeader eyebrow="Here's the plan" title="Four things, ~5 minutes." />
      <div style={{ display: "grid", gap: 12, margin: "28px 0 24px" }}>
        <PlanItem n={1} title="Connect a free WPMU DEV account" sub="Unlocks global firewalls and deep scans. No card." />
        <PlanItem n={2} title="Harden WordPress" sub="Apply 7 recommended settings in one click." />
        <PlanItem n={3} title="Turn on firewalls" sub="Local + Antibot Global + Central IP blocklist." />
        <PlanItem n={4} title="Run your first scan" sub="Runs in the background. We'll ping you when done." />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" size="md" onClick={onBack}>← Back</Button>
        <Button variant="solid" size="md" onClick={onNext}>Let's start <Icon name="arrow-right" size={14} color="#fff" /></Button>
      </div>
    </ConvCard>
  );
}

function PlanItem({ n, title, sub }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: 14, border: "1px solid var(--border-default)", borderRadius: 14 }}>
      <div style={{
        width: 30, height: 30, borderRadius: 100, background: "var(--ink-800)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-mono)", fontSize: 14, flexShrink: 0,
      }}>{n}</div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 13, color: "var(--fg-2)", marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function ConvConnect({ onNext, onBack, onSkip }) {
  return (
    <ConvCard>
      <ConvHeader
        eyebrow="Step 1 of 4 · Free account"
        title="Connect to WPMU DEV"
        sub="Free, always. It's the switch that turns on Antibot Firewall, Central IP blocklist, and deep scans."
      />
      <div style={{ margin: "24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <input placeholder="Email" defaultValue="sam@rocket-site.com" style={convInput} />
        <input placeholder="Password" type="password" defaultValue="••••••••" style={convInput} />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <Button variant="solid" size="md" onClick={onNext}>Create free account <Icon name="arrow-right" size={14} color="#fff" /></Button>
        <Button variant="line" size="md" onClick={onNext}>I have one</Button>
      </div>
      <div style={{ background: "#fffdc1", borderRadius: 14, padding: 16, fontSize: 13, color: "#3d2d00", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 16 }}>
        <Icon name="info-circle" size={14} color="#6b5a1f" />
        <div>
          <b>What it unlocks:</b> Antibot Global Firewall · Central IP Firewall · Vulnerability scan · Suspicious code scan. All free — the account just lets us serve you the shared data.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" size="md" onClick={onBack}>← Back</Button>
        <Button variant="text" size="md" onClick={onSkip}>Skip for now</Button>
      </div>
    </ConvCard>
  );
}

function ConvHarden({ onNext, onBack }) {
  const [n, setN] = React.useState(7);
  return (
    <ConvCard>
      <ConvHeader
        eyebrow="Step 2 of 4 · Hardening"
        title={<><span style={{ fontFamily: "var(--font-mono)" }}>{n}</span> quick WordPress tweaks, one click.</>}
        sub="These close the common holes attackers look for. Every rule is reversible."
      />
      <div style={{ margin: "24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
        {["Disable XML-RPC", "Disable trackbacks", "Prevent PHP execution", "Prevent enumeration", "Regenerate security keys", "Fix file permissions", "Default admin check"].map(r => (
          <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 14 }}>
            <Icon name="check" size={14} color="var(--success-ink)" />{r}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" size="md" onClick={onBack}>← Back</Button>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="line" size="md">Customize</Button>
          <Button variant="solid" size="md" onClick={onNext}>Apply all {n} <Icon name="arrow-right" size={14} color="#fff" /></Button>
        </div>
      </div>
    </ConvCard>
  );
}

function ConvFirewall({ onNext, onBack }) {
  return (
    <ConvCard>
      <ConvHeader
        eyebrow="Step 3 of 4 · Firewalls"
        title="Three layers of defense."
        sub="Each one blocks a different kind of attacker. Leave all three on — that's the recommendation."
      />
      <div style={{ display: "grid", gap: 12, margin: "24px 0" }}>
        <ConvFwRow title="Local Firewall" desc="Handles rate-limits and local rules" on />
        <ConvFwRow title="Antibot Global Firewall" desc="Challenges bad bots using global patterns" on />
        <ConvFwRow title="Central IP Firewall" desc="Hourly-refreshed IP blocklist" on />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" size="md" onClick={onBack}>← Back</Button>
        <Button variant="solid" size="md" onClick={onNext}>Turn them on <Icon name="arrow-right" size={14} color="#fff" /></Button>
      </div>
    </ConvCard>
  );
}

function ConvFwRow({ title, desc, on }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: 14,
      border: "1px solid var(--border-default)", borderRadius: 14,
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 12, background: "#4a1300", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="../assets/icons/firewall.svg" width="16" height="16" style={{ filter: "invert(1)" }} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{title}</div>
        <div style={{ fontSize: 12, color: "var(--fg-2)" }}>{desc}</div>
      </div>
      <Toggle on={on} onChange={() => {}} />
    </div>
  );
}

function ConvScan({ onNext, onBack }) {
  const [phase, setPhase] = React.useState("ask"); // ask | scanning | done
  React.useEffect(() => {
    if (phase !== "scanning") return;
    const t = setTimeout(() => {}, 60000);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "done") {
    return (
      <ConvCard>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,228,72,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="bell" size={32} color="var(--success-ink)" />
          </div>
          <h1 style={{ fontSize: 32, lineHeight: "40px", fontWeight: 400, margin: 0 }}>Got it. I'll ping you.</h1>
          <p style={{ fontSize: 15, color: "var(--fg-2)", maxWidth: 440, margin: 0 }}>
            Scan keeps running in the background. You'll get a <b style={{ color: "var(--fg-1)" }}>dashboard notification</b> and an <b style={{ color: "var(--fg-1)" }}>email to sam@rocket-site.com</b> when it's done — usually 3–6 minutes.
          </p>
          <Button variant="solid" size="md" onClick={onNext}>Continue to dashboard <Icon name="arrow-right" size={14} color="#fff" /></Button>
        </div>
      </ConvCard>
    );
  }
  if (phase === "scanning") {
    return (
      <ConvCard>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <ScanRing progress={42} />
          <h1 style={{ fontSize: 26, lineHeight: "34px", fontWeight: 400, margin: 0 }}>Scanning your site…</h1>
          <p style={{ fontSize: 14, color: "var(--fg-2)", maxWidth: 440, margin: 0 }}>
            File integrity · vulnerability database · suspicious patterns.<br />
            Takes a few minutes — no need to wait here.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="solid" size="md" onClick={() => setPhase("done")}>
              <Icon name="bell" size={14} color="#fff" />Notify me when complete
            </Button>
            <Button variant="text" size="md" onClick={() => setPhase("done")}>I'll wait here</Button>
          </div>
        </div>
      </ConvCard>
    );
  }
  return (
    <ConvCard>
      <ConvHeader
        eyebrow="Step 4 of 4 · First scan"
        title="One more thing — a full scan."
        sub="Files, vulnerabilities, suspicious code. Starts now, runs in the background."
      />
      <div style={{ background: "var(--ink-50)", borderRadius: 14, padding: 16, display: "flex", gap: 14, alignItems: "center", margin: "24px 0" }}>
        <Icon name="clock" size={18} color="var(--fg-1)" />
        <div style={{ flex: 1, fontSize: 13, color: "var(--fg-1)" }}>
          <b>Takes 3–6 minutes.</b> You don't have to wait — close the window whenever, we'll notify you in-app + by email when it's done.
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" size="md" onClick={onBack}>← Back</Button>
        <Button variant="solid" size="md" onClick={() => setPhase("scanning")}>
          <Icon name="scan" size={14} color="#fff" />Start scan
        </Button>
      </div>
    </ConvCard>
  );
}

function ConvDone({ onNext }) {
  return (
    <ConvCard>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div style={{ width: 96, height: 96, borderRadius: "50%", background: "rgba(0,228,72,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="shield-check" size={42} color="var(--success-ink)" />
        </div>
        <h1 style={{ fontSize: 40, lineHeight: "48px", fontWeight: 400, margin: 0, letterSpacing: "-0.5px" }}>
          You're protected.
        </h1>
        <p style={{ fontSize: 16, color: "var(--fg-2)", margin: 0, maxWidth: 460 }}>
          Hardening is on. Firewalls are live. Scan is running — I'll ping you when it's done.
        </p>
        <Button variant="solid" size="md" onClick={onNext}>Go to dashboard <Icon name="arrow-right" size={14} color="#fff" /></Button>
        <Button variant="text" size="sm" onClick={onNext}>Restart the tour</Button>
      </div>
    </ConvCard>
  );
}

function ConvHeader({ eyebrow, title, sub }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 10 }}>{eyebrow}</div>
      <h1 style={{ fontSize: 32, lineHeight: "40px", fontWeight: 400, margin: 0, letterSpacing: "-0.3px" }}>{title}</h1>
      {sub && <p style={{ fontSize: 15, lineHeight: "24px", color: "var(--fg-2)", margin: "12px 0 0", maxWidth: 560 }}>{sub}</p>}
    </div>
  );
}

const convInput = {
  height: 44, border: "1px solid rgba(26,26,26,.15)", borderRadius: 12,
  padding: "0 14px", fontFamily: "var(--font-sans)", fontSize: 14, outline: "none", background: "#fff",
};

Object.assign(window, { ConversationalOnboarding });
