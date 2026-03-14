import { useState } from "react"

type Message = {
    id: string
    user: string
    content: string
    channelId: string
}

type Channel = {
    id: string
    name: string
}

const CHANNELS: Channel[] = [
    { id: "global", name: "global" },
    { id: "ai", name: "ai" },
    { id: "web-dev", name: "web-dev" },
    { id: "dsa", name: "dsa" }
]

export default function CommunityChat() {

    const [activeChannel, setActiveChannel] = useState("global")

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            user: "Jatin",
            content: "Welcome to SkillSync community 🚀",
            channelId: "global"
        }
    ])

    const [input, setInput] = useState("")

    const channelMessages = messages.filter(
        m => m.channelId === activeChannel
    )

    const sendMessage = () => {

        if (!input.trim()) return

        const newMsg: Message = {
            id: Date.now().toString(),
            user: "Jatin",
            content: input,
            channelId: activeChannel
        }

        setMessages(prev => [...prev, newMsg])
        setInput("")
    }

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Channel sidebar */}
            <div style={{ width: 200, borderRight: "1px solid #ddd", padding: 10 }}>
                <h3>Channels</h3>

                {CHANNELS.map(ch => (
                    <div
                        key={ch.id}
                        onClick={() => setActiveChannel(ch.id)}
                        style={{
                            padding: 8,
                            cursor: "pointer",
                            background: activeChannel === ch.id ? "#eee" : "transparent"
                        }}
                    >
                        #{ch.name}
                    </div>
                ))}
            </div>

            {/* Chat area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                <div style={{ padding: 10, borderBottom: "1px solid #ddd" }}>
                    <b>#{activeChannel}</b>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
                    {channelMessages.map(msg => (
                        <div key={msg.id} style={{ marginBottom: 8 }}>
                            <b>{msg.user}</b>: {msg.content}
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div style={{ display: "flex", padding: 10, borderTop: "1px solid #ddd" }}>
                    <input
                        style={{ flex: 1 }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Message #${activeChannel}`}
                    />

                    <button onClick={sendMessage}>
                        Send
                    </button>
                </div>

            </div>
        </div>
    )
}