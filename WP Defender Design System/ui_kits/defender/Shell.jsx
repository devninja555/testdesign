// Shell — WP admin chrome + Defender sub-nav + top toolbar
function Shell({ route, setRoute, children, pro }) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "hardening", label: "Hardening" },
    { key: "audit", label: "Audit Log" },
    { key: "firewalls", label: "Firewalls" },
    { key: "login", label: "Login & Access" },
    { key: "settings", label: "Settings" },
  ];
  return (
    <div style={{
      width: 1800, height: 990, overflow: "hidden", borderRadius: 25, background: "var(--ink-50)",
      position: "relative", display: "flex", fontFamily: "var(--font-sans)", color: "var(--fg-1)",
      boxShadow: "0 20px 60px rgba(0,0,0,.12)",
    }}>
      {/* Black left WP sidebar */}
      <div style={{ width: 160, background: "#000", display: "flex", flexDirection: "column" }}>
        <div style={{ height: 300 }} />
        {/* Defender plugin tab */}
        <div style={{
          height: 32, background: "var(--brand-indigo)", color: "#fff", display: "flex", alignItems: "center",
          padding: "0 12px", gap: 6, fontSize: 14, position: "relative",
        }}>
          <img src="../../assets/defender-shield.svg" width="16" height="16" style={{ filter: "invert(1)" }} />
          <span>Defender</span>
          {pro && <Tag kind="pro">Pro</Tag>}
          <div style={{
            position: "absolute", right: 0, top: "50%", transform: "translate(50%,-50%) rotate(45deg)",
            width: 10, height: 10, background: "var(--ink-50)",
          }} />
        </div>
        {items.map(it => {
          const active = route === it.key;
          return (
            <div key={it.key} onClick={() => setRoute(it.key)} style={{
              height: 32, padding: "0 12px 0 22px", display: "flex", alignItems: "center",
              color: active ? "#fff" : "rgba(255,255,255,.55)",
              fontSize: 14, cursor: "pointer",
              background: active ? "rgba(255,255,255,.06)" : "transparent",
              borderLeft: active ? "3px solid #fff" : "3px solid transparent",
              paddingLeft: active ? 19 : 22,
            }}>{it.label}</div>
          );
        })}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* WP top strip */}
        <div style={{ height: 30, background: "var(--ink-700)" }} />
        {/* Defender top toolbar */}
        <div style={{
          height: 60, borderBottom: "1px solid var(--border-default)", display: "flex",
          alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: "#fff",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 13.6, background: "var(--ink-800)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <img src="../../assets/defender-shield.svg" width="16" height="16" style={{ filter: "invert(1)" }} />
            </div>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontSize: 18, fontWeight: 400, display: "flex", gap: 5, alignItems: "center" }}>
                Defender {pro && <Tag kind="pro">Pro</Tag>}
              </div>
              <div style={{ fontSize: 11, color: "var(--fg-2)" }}>By WPMU DEV</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
            {!pro && <Button variant="solid" size="sm">Upgrade to Pro</Button>}
            <Button variant="line" size="sm"><img src="../../assets/wpmudev-logo.svg" width="14" height="12" />WPMU DEV</Button>
            <div style={{ width: 1, height: 20, background: "var(--border-default)" }} />
            {["bell", "info-circle", "activity"].map(n => (
              <div key={n} style={{ width: 30, height: 30, borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Icon name={n} size={16} />
              </div>
            ))}
            <div style={{
              height: 30, borderRadius: 100, background: "#fff", border: "1px solid var(--border-default)",
              display: "flex", alignItems: "center", gap: 5, paddingRight: 8,
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 100, background: "var(--ink-800)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="user" size={14} color="#fff" />
              </div>
              <Icon name="caret-down" size={14} />
            </div>
          </div>
        </div>

        {/* Main + right rail */}
        <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
          <div style={{ flex: 1, overflow: "auto", padding: "30px 60px" }}>{children}</div>
          <RightRail />
        </div>
      </div>
    </div>
  );
}

function RightRail() {
  const items = [
    { icon: "settings-cog", title: "Welcome to Defender", when: "1m ago" },
    { icon: "shield-check", title: "Scan complete — 0 issues", when: "2h ago" },
    { icon: "warning-triangle", title: "New hardening recommendation", when: "1d ago" },
  ];
  return (
    <div style={{ width: 340, borderLeft: "1px solid var(--border-default)", background: "#fff", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 50, borderBottom: "1px solid var(--border-default)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, position: "relative" }}>
        <div style={{ position: "absolute", left: 15, top: 10, width: 30, height: 30, borderRadius: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="activity" />
        </div>
        Activity log
      </div>
      <div style={{ padding: 15, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            background: "var(--ink-100)", borderRadius: 20, padding: 15, display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 12,
              background: "linear-gradient(rgb(188,188,188), rgb(163,163,163))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}><Icon name={it.icon} size={14} color="#fff" /></div>
            <div style={{ flex: 1, fontSize: 14 }}>{it.title}</div>
            <div style={{ fontSize: 11, color: "var(--fg-2)" }}>{it.when}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Shell });
