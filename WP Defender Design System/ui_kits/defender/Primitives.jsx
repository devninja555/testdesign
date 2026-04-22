// Primitives — buttons, tags, toggles, cards
function Icon({ name, size = 16, color = "currentColor" }) {
  return <img src={`../../assets/icons/${name}.svg`} width={size} height={size} style={{ display: "inline-block", color, verticalAlign: "middle" }} />;
}

function Button({ variant = "line", size = "md", children, onClick, disabled, danger }) {
  const base = {
    fontFamily: "var(--font-sans)", fontWeight: 500, borderRadius: 10, border: 0, cursor: disabled ? "not-allowed" : "pointer",
    display: "inline-flex", alignItems: "center", gap: 7, transition: "background 120ms",
    padding: size === "sm" ? "0 12px" : "0 15px",
    height: size === "sm" ? 30 : 40,
    fontSize: size === "sm" ? 14 : 14,
  };
  let style = { ...base };
  if (danger) style = { ...style, background: "var(--danger)", color: "#fff" };
  else if (variant === "solid") style = { ...style, background: "var(--ink-800)", color: "#fff" };
  else if (variant === "solid-w") style = { ...style, background: "#fff", color: "var(--ink-800)", border: "1px solid var(--ink-800-15)" };
  else if (variant === "text") style = { ...style, background: "transparent", color: "var(--ink-800)" };
  else style = { ...style, background: "transparent", color: "var(--ink-800)", border: "1px solid var(--ink-800-15)" };
  if (disabled) style = { ...style, background: "var(--ink-100)", color: "var(--ink-200)" };
  return <button style={style} onClick={disabled ? undefined : onClick}>{children}</button>;
}

function Toggle({ on, onChange, disabled }) {
  const bg = disabled ? "var(--ink-100)" : on ? "var(--success)" : "var(--ink-200)";
  return (
    <span onClick={() => !disabled && onChange?.(!on)} style={{
      width: 40, height: 20, borderRadius: 100, background: bg, position: "relative", display: "inline-block",
      cursor: disabled ? "not-allowed" : "pointer", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", width: 16, height: 16, borderRadius: 100, background: "#fff",
        top: 2, left: on ? 22 : 2, transition: "left 200ms cubic-bezier(0.2,0,0,1)",
      }} />
    </span>
  );
}

function Tag({ kind = "black", children }) {
  const styles = {
    black: { background: "var(--ink-800)", color: "#fff" },
    pro: { background: "radial-gradient(var(--brand-purple) 0%, var(--brand-purple-soft) 100%)", color: "#fff", border: "1px solid var(--brand-purple-tint)" },
    new: { background: "var(--success-ink)", color: "#fff" },
    danger: { background: "var(--danger-10)", color: "var(--danger)" },
    ok: { background: "rgba(0,228,72,.18)", color: "#067b2a" },
    warn: { background: "rgba(255,56,0,.12)", color: "var(--warning)" },
  };
  return <span style={{
    display: "inline-flex", alignItems: "center", height: 18, padding: "0 7px", borderRadius: 1020,
    fontSize: 11, letterSpacing: ".1px", lineHeight: "16px", ...styles[kind],
  }}>{children}</span>;
}

function Card({ children, style, pad = 20 }) {
  return <div style={{
    background: "#fff", border: "1px solid var(--border-default)", borderRadius: 20, padding: pad, ...style,
  }}>{children}</div>;
}

Object.assign(window, { Icon, Button, Toggle, Tag, Card });
