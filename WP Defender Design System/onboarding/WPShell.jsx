// Override Icon globally so it resolves from onboarding/ (one level up, not two).
window.Icon = function Icon({ name, size = 16, color = "currentColor" }) {
  return <img src={`../assets/icons/${name}.svg`} width={size} height={size} style={{ display: "inline-block", color, verticalAlign: "middle" }} />;
};
const Icon = window.Icon;

// WPShell — slim WP-admin chrome just for onboarding artboards.
// Matches the Figma onboarding frame: 1240×900, black WP sidebar collapsed,
// defender-branded top strip, inner workspace 25px-radius tray on ink-50.

function WPShell({ children, showBadge = true, footer }) {
  return (
    <div style={{
      width: 1240, height: 900, background: "#1f1f1f",
      fontFamily: "var(--font-sans)", color: "var(--fg-1)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Thin WP admin top bar */}
      <div style={{
        height: 32, background: "#1d2327", display: "flex",
        alignItems: "center", gap: 14, padding: "0 14px",
        fontSize: 13, color: "rgba(255,255,255,.85)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 108 8 8 8 0 00-8-8zm6.5 9.3l-4.8-4.8 4.8 4.8zM10 3.5a6.5 6.5 0 015.5 10l-7-7.1 1.5-2.9zM3.5 10a6.5 6.5 0 0110-5.5l-1 1.9-8.8 3.5zm2 3.5l4-1.5 2 4.4a6.5 6.5 0 01-6-2.9z" /></svg>
          <span>rocket-site.com</span>
        </div>
        <span style={{ opacity: .5 }}>›</span>
        <span style={{ opacity: .85 }}>Defender</span>
        <div style={{ flex: 1 }} />
        <span style={{ opacity: .6, fontSize: 12 }}>Howdy, Sam</span>
      </div>

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Collapsed WP left rail */}
        <div style={{ width: 44, background: "#000", display: "flex", flexDirection: "column", paddingTop: 10, gap: 14, alignItems: "center" }}>
          {["M10 2l8 5v6a8 8 0 01-16 0V7l8-5z","M3 5h14v10H3z","M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z","M3 6h14M3 10h14M3 14h14","M10 2a5 5 0 015 5v3l1 3H4l1-3V7a5 5 0 015-5z"].map((d, i) => (
            <div key={i} style={{
              width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center",
              color: i === 0 ? "#fff" : "rgba(255,255,255,.4)",
              borderLeft: i === 0 ? "2px solid var(--brand-indigo)" : "2px solid transparent",
              paddingLeft: i === 0 ? 2 : 4,
            }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
            </div>
          ))}
        </div>

        {/* Workspace tray */}
        <div style={{
          flex: 1, background: "#f0eee9", padding: 20, minWidth: 0,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{
            flex: 1, background: "var(--ink-50)", borderRadius: 25, overflow: "hidden",
            display: "flex", flexDirection: "column", minHeight: 0,
          }}>
            {/* Onboarding top strip — just Defender logo + close */}
            <div style={{
              height: 60, background: "#fff", borderBottom: "1px solid var(--border-default)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 20px", flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 13.6, background: "var(--ink-800)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <img src="../assets/defender-shield.svg" width="16" height="16" style={{ filter: "invert(1)" }} />
                </div>
                <div style={{ lineHeight: 1.2 }}>
                  <div style={{ fontSize: 18, fontWeight: 400, display: "flex", gap: 6, alignItems: "center" }}>
                    Defender {showBadge && <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 6px", border: "1px solid rgba(26,26,26,.15)", borderRadius: 100, color: "var(--fg-2)" }}>Onboarding</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--fg-2)" }}>By WPMU DEV</div>
                </div>
              </div>
              {footer !== "none" && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "var(--fg-2)" }}>Need help?</span>
                  <div style={{
                    width: 30, height: 30, borderRadius: 100, border: "1px solid var(--border-default)",
                    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                    fontSize: 14, color: "var(--fg-1)",
                  }}>×</div>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Shared tiny primitives not in ui_kits (scope-safe names)
function OBPill({ children, tone = "neutral", icon }) {
  const tones = {
    neutral: { bg: "rgba(26,26,26,.06)", fg: "var(--fg-1)" },
    free:    { bg: "rgba(0,228,72,.14)", fg: "#067b2a" },
    locked:  { bg: "rgba(87,30,231,.10)", fg: "var(--brand-purple)" },
    pro:     { bg: "radial-gradient(var(--brand-purple) 0%, var(--brand-purple-soft) 100%)", fg: "#fff" },
    warn:    { bg: "rgba(255,56,0,.12)", fg: "var(--warning)" },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, height: 20, padding: "0 8px",
      borderRadius: 1020, background: t.bg, color: t.fg, fontSize: 11, fontWeight: 500,
      lineHeight: 1, whiteSpace: "nowrap",
    }}>{icon}{children}</span>
  );
}

// Defender shield + small floating plugin orbs — used as hero on Welcome screens.
function HeroShield({ size = 120, orbs = true }) {
  return (
    <div style={{ position: "relative", width: 260, height: 260 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 50, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(87,30,231,.18), transparent 70%)",
      }} />
      {/* Main shield */}
      <div style={{
        position: "absolute", left: 70, top: 70, width: size, height: size,
        borderRadius: "50%",
        background: "linear-gradient(rgb(65,65,65), rgb(4,1,0))",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
      }}>
        <img src="../assets/defender-shield.svg" width={size * 0.5} height={size * 0.5} style={{ filter: "invert(1)" }} />
      </div>
      {orbs && (
        <>
          <OrbitOrb x={20} y={50} color="#4a1300"><img src="../assets/icons/warning-triangle.svg" width="14" height="14" style={{ filter: "invert(1)" }} /></OrbitOrb>
          <OrbitOrb x={210} y={35} color="#fff" border><img src="../assets/icons/lock.svg" width="14" height="14" /></OrbitOrb>
          <OrbitOrb x={205} y={195} color="#4a1300"><img src="../assets/icons/firewall.svg" width="14" height="14" style={{ filter: "invert(1)" }} /></OrbitOrb>
          <OrbitOrb x={30} y={185} color="#fff" border><img src="../assets/icons/shield-check.svg" width="14" height="14" /></OrbitOrb>
        </>
      )}
    </div>
  );
}

function OrbitOrb({ x, y, color, border, children }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: 32, height: 32, borderRadius: 100,
      background: color, border: border ? "1px solid var(--border-default)" : "none",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,.12)",
    }}>{children}</div>
  );
}

Object.assign(window, { WPShell, OBPill, HeroShield });
