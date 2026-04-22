// Issues, Firewalls, Hardening, Settings
function IssuesView() {
  const [rows, setRows] = React.useState([
    { id: 1, severity: "critical", title: "Suspicious file detected", path: "wp-content/uploads/2024/x.php", hint: "Known malware signature" },
    { id: 2, severity: "critical", title: "Modified core file", path: "wp-includes/load.php", hint: "Checksum mismatch" },
    { id: 3, severity: "warning", title: "Outdated plugin", path: "akismet 4.2.1 → 5.3.2", hint: "Known vulnerability" },
    { id: 4, severity: "warning", title: "Admin user 'admin' in use", path: "users", hint: "Rename recommended" },
    { id: 5, severity: "warning", title: "WP version exposed in header", path: "/wp-json", hint: "Hide generator" },
  ]);
  const act = (id) => setRows(rs => rs.filter(r => r.id !== id));

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontSize: 24, fontWeight: 700 }}>Issues</div>
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid var(--border-default)" }}>
        {["All (" + rows.length + ")", "Ignored", "Quarantined"].map((t, i) => (
          <div key={t} style={{
            padding: "10px 14px", fontSize: 14, cursor: "pointer",
            borderBottom: i === 0 ? "2px solid var(--ink-800)" : "2px solid transparent",
            fontWeight: i === 0 ? 500 : 400, color: i === 0 ? "var(--fg-1)" : "var(--fg-2)",
            marginBottom: -1,
          }}>{t}</div>
        ))}
      </div>
      <Card pad={0}>
        {rows.length === 0 && (
          <div style={{ padding: 40, textAlign: "center", color: "var(--fg-2)" }}>
            No issues — nice work.
          </div>
        )}
        {rows.map((r, i) => (
          <div key={r.id} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "16px 20px",
            borderTop: i === 0 ? "none" : "1px solid var(--border-default)",
          }}>
            <Tag kind={r.severity === "critical" ? "danger" : "warn"}>{r.severity}</Tag>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{r.title}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-2)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.path}</div>
            </div>
            <div style={{ fontSize: 12, color: "var(--fg-2)" }}>{r.hint}</div>
            <Button variant="line" size="sm" onClick={() => act(r.id)}>Ignore</Button>
            <Button variant="solid" size="sm" onClick={() => act(r.id)} danger={r.severity === "critical"}>
              {r.severity === "critical" ? "Quarantine" : "Fix"}
            </Button>
          </div>
        ))}
      </Card>
    </div>
  );
}

function HardeningView() {
  const [items, setItems] = React.useState([
    { id: "xmlrpc", title: "Disable XML-RPC", body: "Close a common attack surface unless you rely on it.", on: true, pro: false },
    { id: "gen", title: "Hide WordPress version", body: "Remove generator meta and readme.html exposure.", on: true, pro: false },
    { id: "php", title: "Disable PHP execution in uploads", body: "Prevent arbitrary script execution in wp-content/uploads.", on: false, pro: false },
    { id: "admin", title: "Prevent access to sensitive files", body: "Block direct access to wp-config.php, .htaccess, debug.log.", on: true, pro: false },
    { id: "2fa", title: "Two-factor authentication", body: "Require TOTP for admin accounts.", on: false, pro: true },
    { id: "ssl", title: "Force SSL on login", body: "Redirect wp-login.php over HTTPS.", on: true, pro: false },
  ]);
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 700 }}>Hardening</div>
        <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 4 }}>Close common attack surfaces with one-click recommendations.</div>
      </div>
      <Card pad={0}>
        {items.map((it, i) => (
          <div key={it.id} style={{
            display: "flex", alignItems: "center", gap: 16, padding: "18px 20px",
            borderTop: i === 0 ? "none" : "1px solid var(--border-default)",
          }}>
            <div style={{ width: 30, height: 30, borderRadius: 12, background: it.on ? "rgba(0,228,72,.18)" : "var(--ink-100)", display: "flex", alignItems: "center", justifyContent: "center", color: it.on ? "#067b2a" : "var(--fg-2)" }}>
              <Icon name={it.on ? "check" : "lock"} size={14} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{it.title}</div>
                {it.pro && <Tag kind="pro">Pro</Tag>}
              </div>
              <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 2 }}>{it.body}</div>
            </div>
            <Toggle on={it.on} disabled={it.pro} onChange={v => setItems(xs => xs.map(x => x.id === it.id ? { ...x, on: v } : x))} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function FirewallsView() {
  const [rules, setRules] = React.useState([
    { id: "login", title: "Login lockout", body: "Ban IPs after 5 failed logins.", on: true },
    { id: "404", title: "404 lockout", body: "Ban IPs triggering 20 404s in 5 minutes.", on: true },
    { id: "geo", title: "Country blocklist", body: "Block requests from 3 countries.", on: false, pro: true },
    { id: "useragent", title: "Bad user-agent blocklist", body: "Block known malicious bots.", on: true },
    { id: "masklogin", title: "Mask login URL", body: "Move wp-login.php to a custom path.", on: false, pro: true },
  ]);
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>Firewalls</div>
          <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 4 }}>Automated rules that block attacks before they reach your site.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="line" size="sm">View banned IPs</Button>
          <Button variant="solid" size="sm">Add rule</Button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
        {rules.map(r => (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.title}</div>
                  {r.pro && <Tag kind="pro">Pro</Tag>}
                </div>
                <div style={{ fontSize: 12, color: "var(--fg-2)", marginTop: 4, lineHeight: "18px" }}>{r.body}</div>
              </div>
              <Toggle on={r.on} disabled={r.pro} onChange={v => setRules(xs => xs.map(x => x.id === r.id ? { ...x, on: v } : x))} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SimpleView({ title, sub }) {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto" }}>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 14, color: "var(--fg-2)", marginTop: 4 }}>{sub}</div>
      <Card style={{ marginTop: 20, padding: 60, textAlign: "center", color: "var(--fg-2)" }}>
        <img src="../../assets/defender-shield.svg" width="40" height="40" style={{ opacity: .3 }} />
        <div style={{ marginTop: 12, fontSize: 14 }}>View stub · see Figma source for full layout.</div>
      </Card>
    </div>
  );
}

Object.assign(window, { IssuesView, HardeningView, FirewallsView, SimpleView });
