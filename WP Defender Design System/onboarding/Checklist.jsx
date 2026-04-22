// Checklist direction — single-page, everything visible, tick off as you go.
// Same 6 steps, but shown as expandable rows on ONE page.

function ChecklistOnboarding() {
  const [connected, setConnected] = React.useState(false);
  const [hardening, setHardening] = React.useState(false);
  const [firewalls, setFirewalls] = React.useState(false);
  const [scan, setScan] = React.useState("none"); // none | running | notified
  const [open, setOpen] = React.useState("connect");

  const items = [
    { key: "connect",   n: 1, label: "Connect WPMU DEV account",  done: connected,  badge: connected ? "Connected" : "Unlocks 4 features" },
    { key: "hardening", n: 2, label: "WordPress hardening",       done: hardening,  badge: hardening ? "7 rules active" : "Recommended" },
    { key: "firewalls", n: 3, label: "Firewalls",                 done: firewalls,  badge: firewalls ? "3 layers active" : "3 layers" },
    { key: "scan",      n: 4, label: "Run first scan",            done: scan === "notified", badge: scan === "running" ? "Running…" : scan === "notified" ? "Notified" : "~4 min" },
  ];
  const pct = items.filter(i => i.done).length / items.length * 100;

  return (
    <WPShell>
      <div style={{ flex: 1, overflow: "auto", background: "var(--ink-50)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "36px 48px 60px" }}>

          {/* Hero */}
          <div style={{ display: "flex", gap: 28, alignItems: "center", marginBottom: 28 }}>
            <HeroShield size={88} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--fg-2)", marginBottom: 6 }}>Getting started</div>
              <h1 style={{ fontSize: 30, lineHeight: "38px", fontWeight: 400, margin: 0 }}>Let's get your site protected</h1>
              <p style={{ fontSize: 14, color: "var(--fg-2)", margin: "8px 0 0", maxWidth: 520 }}>
                Four quick steps. You can stop any time — your progress is saved.
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            background: "#fff", border: "1px solid var(--border-default)", borderRadius: 14,
            padding: "14px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, minWidth: 50 }}>{items.filter(i => i.done).length}<span style={{ color: "var(--fg-2)" }}>/{items.length}</span></div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 6, background: "var(--ink-50)", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "var(--success)", transition: "width 320ms cubic-bezier(.2,0,0,1)" }} />
              </div>
              <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 6 }}>{pct === 100 ? "All done — you're protected" : `~${Math.max(1, 5 - Math.round(pct / 20))} min remaining`}</div>
            </div>
          </div>

          {/* Free vs. Account banner */}
          {!connected && (
            <div style={{
              background: "#fffdc1", border: "1px solid rgba(0,0,0,.06)", borderRadius: 14,
              padding: 16, display: "flex", gap: 14, alignItems: "center", marginBottom: 14,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 100, background: "#4a1300", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 700, letterSpacing: "-.5px" }}>
                W
              </div>
              <div style={{ flex: 1, fontSize: 13, color: "#3d2d00", lineHeight: 1.5 }}>
                <b>Everything on this page is free.</b> Some features (Antibot FW, Central IP, Vulnerability + Suspicious-code scans) just need a free WPMU DEV account. No card, 30 seconds.
              </div>
            </div>
          )}

          {/* Checklist rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map(it => (
              <CLRow key={it.key} item={it} open={open === it.key} onToggle={() => setOpen(open === it.key ? null : it.key)}>
                {it.key === "connect"   && <ConnectPanel connected={connected} onConnect={() => { setConnected(true); setOpen("hardening"); }} />}
                {it.key === "hardening" && <HardeningPanel done={hardening} onApply={() => { setHardening(true); setOpen("firewalls"); }} />}
                {it.key === "firewalls" && <FirewallsPanel connected={connected} done={firewalls} onApply={() => { setFirewalls(true); setOpen("scan"); }} />}
                {it.key === "scan"      && <ScanPanel connected={connected} scan={scan} setScan={setScan} />}
              </CLRow>
            ))}
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 8 }}>
            <Button variant="text" size="sm">Skip setup — take me to the dashboard</Button>
          </div>
        </div>
      </div>
    </WPShell>
  );
}

function CLRow({ item, open, onToggle, children }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--border-default)", borderRadius: 16, overflow: "hidden",
    }}>
      <div onClick={onToggle} style={{
        padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
        background: item.done ? "rgba(0,228,72,.04)" : "#fff",
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 100,
          background: item.done ? "var(--success)" : "#fff",
          border: item.done ? "none" : "1.5px solid var(--border-default)",
          color: item.done ? "#fff" : "var(--fg-2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 600, fontFamily: "var(--font-mono)", flexShrink: 0,
        }}>{item.done ? "✓" : item.n}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
            {item.label}
            {item.done && <OBPill tone="free">{item.badge}</OBPill>}
          </div>
          {!item.done && <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{item.badge}</div>}
        </div>
        <Icon name="caret-down" size={16} color="var(--fg-2)" />
      </div>
      {open && <div style={{ borderTop: "1px solid var(--border-default)", padding: 20 }}>{children}</div>}
    </div>
  );
}

function ConnectPanel({ connected, onConnect }) {
  if (connected) return <div style={{ fontSize: 14, color: "var(--fg-2)" }}>Connected as <b style={{ color: "var(--fg-1)" }}>sam@rocket-site.com</b> · <a href="#" style={{ color: "var(--brand-indigo)" }}>Disconnect</a></div>;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div>
        <div style={{ display: "grid", gap: 10 }}>
          <input placeholder="Email" defaultValue="sam@rocket-site.com" style={inputStyle} />
          <input placeholder="Password" type="password" defaultValue="••••••••" style={inputStyle} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button variant="solid" size="md" onClick={onConnect}>Create free account</Button>
          <Button variant="text" size="md" onClick={onConnect}>I have one</Button>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "var(--fg-2)" }}>
        <div style={{ fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--fg-1)", marginBottom: 8 }}>Unlocks (all free)</div>
        <div style={{ display: "grid", gap: 6 }}>
          {["Antibot Global Firewall", "Central IP Firewall", "Vulnerability scan", "Suspicious code scan"].map(x => (
            <div key={x} style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="check" size={12} color="var(--success-ink)" />{x}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HardeningPanel({ done, onApply }) {
  const rules = [
    "Disable XML-RPC", "Disable trackbacks", "Prevent PHP execution", "Prevent enumeration",
    "Regenerate security keys", "Fix file permissions", "Default admin check",
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 20px", marginBottom: 14 }}>
        {rules.map(r => (
          <div key={r} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
            <Icon name="check" size={14} color="var(--success-ink)" />{r}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="solid" size="md" onClick={onApply}>{done ? "Applied" : "Apply all 7"}</Button>
        <Button variant="line" size="md">Customize</Button>
      </div>
    </div>
  );
}

function FirewallsPanel({ connected, done, onApply }) {
  return (
    <div>
      <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
        <FwMini title="Local Firewall" tone="free" />
        <FwMini title="Antibot Global Firewall" tone={connected ? "free" : "locked"} locked={!connected} />
        <FwMini title="Central IP Firewall" tone={connected ? "free" : "locked"} locked={!connected} />
      </div>
      <Button variant="solid" size="md" onClick={onApply} disabled={!connected}>{done ? "Active" : connected ? "Enable all 3" : "Connect account first"}</Button>
    </div>
  );
}

function FwMini({ title, tone, locked }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 12px",
      border: "1px solid var(--border-default)", borderRadius: 12,
      background: locked ? "var(--ink-50)" : "#fff",
    }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: locked ? "#c4c4c4" : "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="../assets/icons/firewall.svg" width="14" height="14" style={{ filter: "invert(1)" }} />
      </div>
      <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: locked ? "var(--fg-2)" : "var(--fg-1)" }}>{title}</div>
      {locked ? <OBPill tone="locked" icon={<Icon name="lock" size={10} color="var(--brand-purple)" />}>Account</OBPill> : <OBPill tone="free">Ready</OBPill>}
    </div>
  );
}

function ScanPanel({ connected, scan, setScan }) {
  React.useEffect(() => {
    if (scan === "running") {
      const t = setTimeout(() => {}, 0);
      return () => clearTimeout(t);
    }
  }, [scan]);

  if (scan === "notified") {
    return (
      <div>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
          <Icon name="bell" size={20} color="var(--success-ink)" />
          <div style={{ fontSize: 14 }}>We'll notify you in the dashboard and email <b>sam@rocket-site.com</b> when scan completes.</div>
        </div>
      </div>
    );
  }
  if (scan === "running") {
    return (
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid var(--border-default)", borderTopColor: "var(--ink-800)", borderRadius: "50%", animation: "spin 900ms linear infinite", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500 }}>Scanning your site…</div>
          <div style={{ fontSize: 12, color: "var(--fg-2)" }}>File integrity, vulnerability database, suspicious code — typically 3–6 min.</div>
        </div>
        <Button variant="solid" size="md" onClick={() => setScan("notified")}><Icon name="bell" size={14} color="#fff" />Notify when complete</Button>
      </div>
    );
  }
  return (
    <div>
      <p style={{ fontSize: 13, color: "var(--fg-2)", margin: "0 0 12px" }}>
        Starts now, runs in the background. You'll get a dashboard notification + email when complete.
      </p>
      <Button variant="solid" size="md" onClick={() => setScan("running")} disabled={!connected}>
        <Icon name="scan" size={14} color="#fff" />{connected ? "Start scan" : "Connect account to enable full scan"}
      </Button>
    </div>
  );
}

const inputStyle = {
  height: 40, border: "1px solid rgba(26,26,26,.15)", borderRadius: 10,
  padding: "0 12px", fontFamily: "var(--font-sans)", fontSize: 14, outline: "none", background: "#fff",
};

Object.assign(window, { ChecklistOnboarding });
