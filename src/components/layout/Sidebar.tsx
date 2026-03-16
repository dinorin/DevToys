import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sun, Moon, Search, Star, Clock, Wrench } from "lucide-react";
import { useSettingsStore } from "@/store/settingsStore";
import tools from "@/store/toolRegistry";
import { ToolCategory } from "@/types/tool";
import Icon from "@/components/ui/Icon";

const CATEGORIES: ToolCategory[] = [
  "Encoders / Decoders",
  "Formatters",
  "Generators",
  "Text",
  "Testers",
  "Converters",
];

export default function Sidebar() {
  const [query, setQuery] = useState("");
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme, favorites, toggleFavorite, recentTools } = useSettingsStore();

  const filtered = query.trim()
    ? tools.filter((t) =>
        t.label.toLowerCase().includes(query.toLowerCase()) ||
        t.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : tools;

  const go = (id: string) => navigate(`/tools/${id}`);

  const Item = ({ id, label, icon }: { id: string; label: string; icon: string }) => {
    const isActive = toolId === id;
    const isFav = favorites.includes(id);
    return (
      <button
        onClick={() => go(id)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          width: "100%",
          padding: "8px 11px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: 500,
          background: isActive ? "var(--accent)" : "transparent",
          color: isActive ? "white" : "var(--text-primary)",
          textAlign: "left",
          transition: "background 0.12s",
        }}
        onMouseEnter={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
        }}
        onMouseLeave={(e) => {
          if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        <Icon name={icon} size={17} style={{ flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
        <span style={{ flex: 1 }}>{label}</span>
        <span
          onClick={(e) => { e.stopPropagation(); toggleFavorite(id); }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleFavorite(id)}
          style={{
            cursor: "pointer",
            opacity: isFav ? 1 : 0,
            padding: "0 2px",
            lineHeight: 1,
            color: isActive ? "rgba(255,255,255,0.8)" : "var(--accent)",
            transition: "opacity 0.15s",
          }}
          title={isFav ? "Unfavorite" : "Favorite"}
          className="fav-btn"
        >
          <Star size={12} fill={isFav ? "currentColor" : "none"} />
        </span>
      </button>
    );
  };

  return (
    <aside
      style={{
        width: 256,
        minWidth: 256,
        background: "var(--bg-sidebar)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Wrench size={17} style={{ color: "white" }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: "var(--text-primary)" }}>DevToys</span>
          <button
            onClick={toggleTheme}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: 7,
              cursor: "pointer",
              padding: "5px 7px",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
            }}
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <Search size={14} style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-secondary)",
            pointerEvents: "none",
          }} />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 11px 8px 32px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              fontSize: 13,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* Tool list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
        {/* Favorites */}
        {favorites.length > 0 && !query && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", padding: "2px 4px 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <Star size={10} fill="currentColor" /> Favorites
            </div>
            {tools
              .filter((t) => favorites.includes(t.id))
              .map((t) => <Item key={t.id} id={t.id} label={t.label} icon={t.icon} />)}
          </div>
        )}

        {/* Recent */}
        {recentTools.length > 0 && !query && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", padding: "2px 4px 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <Clock size={10} /> Recent
            </div>
            {recentTools
              .map((id) => tools.find((t) => t.id === id))
              .filter(Boolean)
              .map((t) => <Item key={t!.id} id={t!.id} label={t!.label} icon={t!.icon} />)}
          </div>
        )}

        {/* Category groups or search results */}
        {query ? (
          <>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", padding: "2px 4px 6px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Results ({filtered.length})
            </div>
            {filtered.map((t) => <Item key={t.id} id={t.id} label={t.label} icon={t.icon} />)}
            {filtered.length === 0 && (
              <div style={{ color: "var(--text-secondary)", fontSize: 12, padding: "8px 4px" }}>No tools found</div>
            )}
          </>
        ) : (
          CATEGORIES.map((cat) => {
            const items = filtered.filter((t) => t.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-secondary)", padding: "2px 4px 5px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  {cat}
                </div>
                {items.map((t) => <Item key={t.id} id={t.id} label={t.label} icon={t.icon} />)}
              </div>
            );
          })
        )}
      </div>

      {/* show star on hover via CSS */}
      <style>{`.fav-btn { opacity: 0 !important; } button:hover .fav-btn { opacity: 1 !important; } .fav-btn[title="Unfavorite"] { opacity: 1 !important; }`}</style>
    </aside>
  );
}
