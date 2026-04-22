// Dashboard — scan state + issues summary
function Dashboard({ pro }) {
  const [scanState, setScanState] = React.useState("idle"); // idle | scanning | complete
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (scanState !== "scanning") return;
    const t = setInterval(() => setProgress(p => {
      if (p >= 100) { clearInterval(t); setScanState("complete"); return 100; }
      return p + 4;
    }), 120);
    return () => clearInterval(t);
  }, [scanState]);

  const runScan = () => { setProgress(0); setScanState("scanning"); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Dashboard</div>
          <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 4 }}>
            Keep an eye on your site's security. Review issues and harden your setup.
          </div>
        </div>
        <Button variant="line" size="sm"><Icon name="settings-cog" size={14} />Configure</Button>
      </div>

      {/* Hero scan card */}
      <Card pad={30} style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ width: 140, height: 140, position: "relative" }}>
          <svg viewBox="0 0 120 120" width={140} height={140}>
            <circle cx="60" cy="60" r="54" stroke="var(--ink-100)" strokeWidth="8" fill="none" />
            <circle cx="60" cy="60" r="54" stroke={scanState === "complete" ? "var(--success)" : "var(--ink-800)"}
              strokeWidth="8" fill="none"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={2 * Math.PI * 54 * (1 - (scanState === "scanning" ? progress / 100 : scanState === "complete" ? 1 : 0))}
              transform="rotate(-90 60 60)"
              style={{ transition: "stroke-dashoffset 120ms linear" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 32, fontWeight: 500 }}>
              {scanState === "scanning" ? `${progress}%` : scanState === "complete" ? "0" : "—"}
            </div>
            <div style={{ fontSize: 11, color: "var(--fg-2)" }}>
              {scanState === "complete" ? "issues" : scanState === "scanning" ? "scanning" : "not scanned"}
            </div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 500 }}>
            {scanState === "idle" && "Ready to scan your site"}
            {scanState === "scanning" && "Scanning files and database…"}
            {scanState === "complete" && "Your site is clean"}
          </div>
          <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 6, lineHeight: "22px" }}>
            {scanState === "idle" && "Defender will check core files, themes, plugins and known vulnerabilities."}
            {scanState === "scanning" && "This usually takes 1–2 minutes. You can keep working."}
            {scanState === "complete" && `Last scanned just now · next scheduled in 24h.`}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <Button variant="solid" onClick={runScan} disabled={scanState === "scanning"}>
              <Icon name="scan" size={14} color="#fff" />
              {scanState === "scanning" ? "Scanning…" : "Run scan"}
            </Button>
            <Button variant="line">View scan log</Button>
          </div>
        </div>
      </Card>

      {/* 3-up summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 15 }}>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 12, background: "var(--danger-10)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--danger)" }}>
              <Icon name="warning-triangle" size={14} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Issues</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 50, fontWeight: 500, marginTop: 8, lineHeight: 1 }}>9</div>
          <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>2 critical · 7 warnings</div>
        </Card>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 12, background: "var(--ink-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="lock" size={14} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Hardening</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 50, fontWeight: 500, marginTop: 8, lineHeight: 1 }}>12<span style={{ fontSize: 20, color: "var(--fg-2)" }}>/16</span></div>
          <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>4 recommendations left</div>
        </Card>
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 12, background: "var(--ink-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="clock" size={14} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Last scan</div>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 50, fontWeight: 500, marginTop: 8, lineHeight: 1 }}>2h</div>
          <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4 }}>today at 12:04 PM</div>
        </Card>
      </div>

      {/* Pro bubble */}
      {!pro && (
        <div style={{
          background: "var(--cream-deep)", color: "#fff", borderRadius: 20, padding: "20px 24px",
          display: "flex", alignItems: "center", gap: 20, boxShadow: "var(--shadow-xs)",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <Tag kind="pro">Pro</Tag>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)" }}>Unlock more with Defender Pro</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 500 }}>Scheduled scans, firewall rules, audit logs, 2FA.</div>
          </div>
          <Button variant="solid-w">Upgrade</Button>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Dashboard });
