import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import tools from "@/store/toolRegistry";
import { useSettingsStore } from "@/store/settingsStore";

function ToolRoute() {
  const { toolId } = useParams();
  const addRecent = useSettingsStore((s) => s.addRecent);
  const tool = tools.find((t) => t.id === toolId);

  useEffect(() => {
    if (toolId) addRecent(toolId);
  }, [toolId, addRecent]);

  if (!tool) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-secondary)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48 }}>🔧</div>
          <div style={{ fontSize: 16, marginTop: 8 }}>Tool not found</div>
        </div>
      </div>
    );
  }

  const Component = tool.component;
  return (
    <Suspense fallback={
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--text-secondary)" }}>
        Loading...
      </div>
    }>
      <Component />
    </Suspense>
  );
}

function AppLayout() {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg-primary)" }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/tools/json-formatter" replace />} />
          <Route path="/tools/:toolId" element={<ToolRoute />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
