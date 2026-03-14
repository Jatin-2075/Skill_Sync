import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <div style={{ display: "flex", height: "100vh", width: "100%" }}>

            <aside
                style={{
                    width: "90px",
                    backgroundColor: "#111",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "20px",
                    gap: "20px",
                }}
            >
                <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "10px" }} />
                <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "10px" }} />
                <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "10px" }} />
                <div style={{ width: "50px", height: "50px", background: "#333", borderRadius: "10px" }} />
            </aside>

            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

                <header
                    style={{
                        height: "60px",
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "20px",
                        fontSize: "18px",
                    }}
                >
                    SkillSync
                </header>

                <main
                    style={{
                        flex: 1,
                        backgroundColor: "#f4f4f4",
                        padding: "20px",
                    }}
                >
                    <Outlet />
                </main>

            </div>
        </div>
    )
}

export default MainLayout