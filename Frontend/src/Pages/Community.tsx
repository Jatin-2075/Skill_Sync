import { useState, useRef, useEffect } from "react";

type Message = {
  id: string;
  user: string;
  content: string;
  channelId: string;
  timestamp: Date;
};

type Channel = {
  id: string;
  name: string;
  icon: string;
};

const CHANNELS: Channel[] = [
  { id: "global", name: "global", icon: "🌍" },
  { id: "ai", name: "ai-ml", icon: "🤖" },
  { id: "web-dev", name: "web-dev", icon: "🌐" },
  { id: "dsa", name: "dsa", icon: "🧮" },
  { id: "careers", name: "careers", icon: "💼" },
];

const SEED_MSGS: Message[] = [
  { id: "1", user: "Jatin", content: "Welcome to SkillSync community 🚀", channelId: "global", timestamp: new Date(Date.now() - 3600000) },
  { id: "2", user: "Priya", content: "Anyone working on FastAPI + React stack?", channelId: "global", timestamp: new Date(Date.now() - 1800000) },
  { id: "3", user: "Rohan", content: "LLMs are wild right now, fine-tuned a model on coding tasks", channelId: "ai", timestamp: new Date(Date.now() - 900000) },
];

const C = {
  bg: "rgba(13,22,36,0.97)",
  border: "rgba(255,255,255,0.08)",
  sidebar: "#080f1c",
  green: "#86efac",
  greenDim: "rgba(134,239,172,0.1)",
  greenBorder: "rgba(134,239,172,0.25)",
  muted: "#64748b",
  text: "#f1f5f9",
  sub: "#94a3b8",
};

function fmt(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function CommunityChat() {
  const myName = localStorage.getItem("username") ?? "You";
  const [activeChannel, setActiveChannel] = useState("global");
  const [messages, setMessages] = useState<Message[]>(SEED_MSGS);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const channelMessages = messages.filter((m) => m.channelId === activeChannel);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages.length]);

  const send = () => {
    const txt = input.trim();
    if (!txt) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), user: myName, content: txt, channelId: activeChannel, timestamp: new Date() },
    ]);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 52px)", fontFamily: "'DM Sans', sans-serif", color: C.sub }}>

      {/* Channel sidebar */}
      <div style={{
        width: 200, flexShrink: 0,
        background: C.sidebar,
        borderRight: `1px solid ${C.border}`,
        padding: "16px 8px",
        overflowY: "auto",
      }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0 8px", marginBottom: 8 }}>
          Channels
        </p>
        {CHANNELS.map((ch) => {
          const active = activeChannel === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 8,
                padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                background: active ? C.greenDim : "transparent",
                color: active ? C.green : C.muted,
                fontFamily: "monospace", fontSize: 13, textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <span>{ch.icon}</span>
              <span style={{ fontWeight: active ? 600 : 400 }}>#{ch.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Channel header */}
        <div style={{
          padding: "12px 20px", borderBottom: `1px solid ${C.border}`,
          background: C.bg, display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
        }}>
          <span style={{ fontSize: 16 }}>{CHANNELS.find((c) => c.id === activeChannel)?.icon}</span>
          <span style={{ fontFamily: "monospace", fontWeight: 600, color: C.text, fontSize: 14 }}>
            #{CHANNELS.find((c) => c.id === activeChannel)?.name}
          </span>
          <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 11, color: C.muted }}>
            {channelMessages.length} messages
          </span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
          {channelMessages.length === 0 && (
            <div style={{ textAlign: "center", color: C.muted, fontFamily: "monospace", fontSize: 13, marginTop: 40 }}>
              No messages yet. Start the conversation!
            </div>
          )}
          {channelMessages.map((msg, i) => {
            const isMe = msg.user === myName;
            const showName = i === 0 || channelMessages[i - 1].user !== msg.user;
            return (
              <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start" }}>
                {showName && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3, marginTop: 10 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      background: isMe ? "linear-gradient(135deg,#7c3aed,#db2777)" : "linear-gradient(135deg,#0ea5e9,#6366f1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: 10, fontWeight: 700,
                    }}>
                      {msg.user[0].toUpperCase()}
                    </div>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: C.muted, fontWeight: 600 }}>
                      {isMe ? "You" : msg.user}
                    </span>
                    <span style={{ fontFamily: "monospace", fontSize: 10, color: "#334155" }}>{fmt(msg.timestamp)}</span>
                  </div>
                )}
                <div style={{
                  maxWidth: "72%",
                  background: isMe ? C.greenDim : "rgba(255,255,255,0.04)",
                  border: isMe ? `1px solid ${C.greenBorder}` : `1px solid ${C.border}`,
                  borderRadius: isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  padding: "8px 14px",
                  color: isMe ? C.green : C.sub,
                  fontSize: 14, lineHeight: 1.5,
                  wordBreak: "break-word",
                }}>
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 20px", borderTop: `1px solid ${C.border}`,
          background: C.bg, display: "flex", gap: 10, alignItems: "flex-end", flexShrink: 0,
        }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={`Message #${CHANNELS.find((c) => c.id === activeChannel)?.name}…`}
            rows={1}
            style={{
              flex: 1, resize: "none", maxHeight: 120,
              background: "rgba(6,12,22,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, color: "#cbd5e1", fontSize: 14,
              padding: "10px 14px", outline: "none", fontFamily: "inherit",
              transition: "border-color 0.15s",
            }}
          />
          <button
            onClick={send}
            style={{
              padding: "10px 18px", borderRadius: 10, border: "none", cursor: "pointer",
              background: input.trim() ? C.greenDim : "rgba(255,255,255,0.03)",
              borderTop: input.trim() ? `1px solid ${C.greenBorder}` : "1px solid transparent",
              color: input.trim() ? C.green : C.muted,
              fontFamily: "monospace", fontWeight: 600, fontSize: 13,
              transition: "all 0.15s", flexShrink: 0,
            }}
          >
            Send →
          </button>
        </div>
      </div>
    </div>
  );
}
