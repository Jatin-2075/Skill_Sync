import "./style/page2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/Api";

type Usernames = {
  cfusername: string;
  stackusername: string;
  gitusername: string;
};

type ConnectionStatus = {
  cf: "idle" | "loading" | "connected" | "error";
  git: "idle" | "loading" | "connected" | "error";
  stack: "idle" | "loading" | "connected" | "error";
};

export default function Page2() {
  const [usernames, setUsernames] = useState<Usernames>({
    cfusername: "",
    stackusername: "",
    gitusername: "",
  });

  const navigate = useNavigate();

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    cf: "idle",
    git: "idle",
    stack: "idle",
  });

  const [results, setResults] = useState<any>({
    cf: null,
    git: null,
    stack: null,
  });

  const handleCodeforces = async () => {
    if (!usernames.cfusername.trim()) {
      alert("Please enter a Codeforces username");
      return;
    }

    setConnectionStatus((prev) => ({ ...prev, cf: "loading" }));

    try {
      const res = await fetch(
        `https://codeforces.com/api/user.info?handles=${usernames.cfusername}`
      );
      const data = await res.json();

      if (data.status === "OK") {
        setResults((prev: any) => ({ ...prev, cf: data.result[0] }));
        setConnectionStatus((prev) => ({ ...prev, cf: "connected" }));
      } else {
        setConnectionStatus((prev) => ({ ...prev, cf: "error" }));
        alert("Codeforces user not found");
      }
    } catch {
      setConnectionStatus((prev) => ({ ...prev, cf: "error" }));
      alert("Failed to connect to Codeforces");
    }
  };

  const handleGitHub = async () => {
    if (!usernames.gitusername.trim()) {
      alert("Please enter a GitHub username");
      return;
    }

    setConnectionStatus((prev) => ({ ...prev, git: "loading" }));

    try {
      const res = await fetch(
        `https://api.github.com/users/${usernames.gitusername}`
      );

      if (res.ok) {
        const data = await res.json();
        setResults((prev: any) => ({ ...prev, git: data }));
        setConnectionStatus((prev) => ({ ...prev, git: "connected" }));
      } else {
        setConnectionStatus((prev) => ({ ...prev, git: "error" }));
        alert("GitHub user not found");
      }
    } catch {
      setConnectionStatus((prev) => ({ ...prev, git: "error" }));
      alert("Failed to connect to GitHub");
    }
  };

  const handleStackOverflow = async () => {
    if (!usernames.stackusername.trim()) {
      alert("Please enter a Stack Overflow user ID");
      return;
    }

    setConnectionStatus((prev) => ({ ...prev, stack: "loading" }));

    try {
      const res = await fetch(
        `https://api.stackexchange.com/2.3/users/${usernames.stackusername}?site=stackoverflow`
      );
      const data = await res.json();

      if (data.items?.length) {
        setResults((prev: any) => ({ ...prev, stack: data.items[0] }));
        setConnectionStatus((prev) => ({ ...prev, stack: "connected" }));
      } else {
        setConnectionStatus((prev) => ({ ...prev, stack: "error" }));
        alert("Stack Overflow user not found");
      }
    } catch {
      setConnectionStatus((prev) => ({ ...prev, stack: "error" }));
      alert("Failed to connect to Stack Overflow");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsernames((prev) => ({ ...prev, [name]: value }));
  };

  const getButtonText = (status: string) => {
    if (status === "loading") return "Connecting...";
    if (status === "connected") return "Connected ✓";
    if (status === "error") return "Retry";
    return "Connect";
  };

  const handlenext = async () => {
    console.log(usernames)
    try {
      const res = await API("POST", "/auth/usernamesave/", { usernames })
      const data = await res.json()

      console.log(data)
      if (data.success) {
        navigate("/pagethree")
      }
      if (!data.success) {
        alert("some err occured")
      }
    } catch (err) {
      console.error(err);
      alert("some err occurred");
    }
  }

  return (
    <div className="page2-root">
      <header className="page2-header">
        <div className="page2-brand">
          <div className="page2-logo" />
          <span className="page2-brand-title">SkillRank</span>
        </div>

        <div className="page2-header-right">
          <button className="page2-help-link">
            <span className="page2-help-icon">?</span>
            Help
          </button>
        </div>
      </header>

      <main className="page2-main-content">
        <div className="page2-form-container">
          <section className="page2-progress-section">
            <div className="page2-progress-info">
              <span className="page2-phase-text">
                Phase 2 : Link Your Profiles
              </span>
              <span className="page2-completion-text">40% Completed</span>
            </div>

            <div className="page2-progress-bar">
              <div
                className="page2-progress-fill"
                style={{ width: "40%" }}
              />
            </div>
          </section>

          <section className="page2-heading-section">
            <h1 className="page2-main-title">Build Your Skill Matrix</h1>
            <p className="page2-description">
              Link your external profiles to automatically calculate your global
              ranking vectors. Our algorithms analyze your activity to generate
              your skill scores.
            </p>

            <div className="page2-secure-pill">
              <span className="material-symbols-outlined">lock</span>
              Secure • Read-only access
            </div>
          </section>

          <div className="page2-cards-stack">
            {/* Codeforces */}
            <article
              className={`page2-platform-card ${connectionStatus.cf === "loading" ? "verifying" : ""
                }`}
            >
              {connectionStatus.cf === "loading" && (
                <div className="page2-loading-line" />
              )}

              <div className="page2-platform-icon dark-bg">
                <span className="material-symbols-outlined">code</span>
              </div>

              <div className="page2-card-body">
                <h3 className="page2-platform-name">Codeforces</h3>
                <p className="page2-sub-text">
                  Maps to <strong>(Problem Solving)</strong> &{" "}
                  <strong>(Algorithms)</strong>.

                </p>

                <div className="page2-input-row">
                  <div className="page2-input-wrapper">
                    <span className="page2-input-prefix">
                      codeforces.com/profile/
                    </span>
                    <input
                      type="text"
                      name="cfusername"
                      className="page2-text-input"
                      placeholder="username"
                      value={usernames.cfusername}
                      onChange={handleInputChange}
                      disabled={
                        connectionStatus.cf === "loading" ||
                        connectionStatus.cf === "connected"
                      }
                    />
                  </div>

                  <button
                    className={`page2-btn-connect-solid ${connectionStatus.cf === "connected" ? "connected" : ""
                      }`}
                    onClick={handleCodeforces}
                    disabled={connectionStatus.cf === "loading"}
                  >
                    {connectionStatus.cf === "loading" && (
                      <div className="page2-spinner-dot" />
                    )}
                    {getButtonText(connectionStatus.cf)}
                  </button>
                </div>

                <p className="page2-input-hint">
                  {connectionStatus.cf === "connected" && results.cf
                    ? `Connected as ${results.cf.handle} (Rating: ${results.cf.rating || "N/A"
                    })`
                    : "We only fetch public profile and submission data."}
                </p>
              </div>
            </article>

            {/* GitHub */}
            <article
              className={`page2-platform-card ${connectionStatus.git === "loading" ? "verifying" : ""
                }`}
            >
              {connectionStatus.git === "loading" && (
                <div className="page2-loading-line" />
              )}

              <div className="page2-platform-icon dark-bg">
                <span className="material-symbols-outlined">terminal</span>
              </div>

              <div className="page2-card-body">
                <h3 className="page2-platform-name">GitHub</h3>
                <p className="page2-sub-text">
                  Maps to <strong>(Projects)</strong> &{" "}
                  <strong>(Collaboration)</strong>.
                </p>

                <div className="page2-input-row">
                  <div className="page2-input-wrapper">
                    <span className="page2-input-prefix">github.com/</span>
                    <input
                      type="text"
                      name="gitusername"
                      className="page2-text-input"
                      placeholder="username"
                      value={usernames.gitusername}
                      onChange={handleInputChange}
                      disabled={
                        connectionStatus.git === "loading" ||
                        connectionStatus.git === "connected"
                      }
                    />
                  </div>

                  <button
                    className={`page2-btn-connect-solid ${connectionStatus.git === "connected" ? "connected" : ""
                      }`}
                    onClick={handleGitHub}
                    disabled={connectionStatus.git === "loading"}
                  >
                    {connectionStatus.git === "loading" && (
                      <div className="page2-spinner-dot" />
                    )}
                    {getButtonText(connectionStatus.git)}
                  </button>
                </div>

                <p className="page2-input-hint">
                  {connectionStatus.git === "connected" && results.git
                    ? `Connected as ${results.git.login} (${results.git.public_repos} public repos)`
                    : "We only fetch public repositories and contribution graphs."}
                </p>
              </div>
            </article>

            {/* Stack Overflow */}
            <article
              className={`page2-platform-card ${connectionStatus.stack === "loading" ? "verifying" : ""
                }`}
            >
              {connectionStatus.stack === "loading" && (
                <div className="page2-loading-line" />
              )}

              <div className="page2-platform-icon orange-bg">
                <span className="material-symbols-outlined">forum</span>
              </div>

              <div className="page2-card-body">
                <h3 className="page2-platform-name">Stack Overflow</h3>
                <p className="page2-sub-text">
                  Maps to <strong>(Knowledge Sharing)</strong>.
                </p>

                <div className="page2-input-row">
                  <div className="page2-input-wrapper">
                    <span className="page2-input-prefix">
                      stackoverflow.com/users/
                    </span>
                    <input
                      type="text"
                      name="stackusername"
                      className="page2-text-input"
                      placeholder="user ID"
                      value={usernames.stackusername}
                      onChange={handleInputChange}
                      disabled={
                        connectionStatus.stack === "loading" ||
                        connectionStatus.stack === "connected"
                      }
                    />
                  </div>

                  <button
                    className={`page2-btn-connect-solid ${connectionStatus.stack === "connected" ? "connected" : ""
                      }`}
                    onClick={handleStackOverflow}
                    disabled={connectionStatus.stack === "loading"}
                  >
                    {connectionStatus.stack === "loading" && (
                      <div className="page2-spinner-dot" />
                    )}
                    {getButtonText(connectionStatus.stack)}
                  </button>
                </div>

                <p className="page2-input-hint">
                  {connectionStatus.stack === "connected" && results.stack
                    ? `Connected as ${results.stack.display_name} (Reputation: ${results.stack.reputation})`
                    : "Enter your Stack Overflow user ID (e.g., 58291)."}
                </p>
              </div>
            </article>
          </div>

          <footer className="page2-footer-nav">
            <button
              onClick={() => navigate("/pageone")} className="page4-btn-back">
              Back
            </button>
            <button onClick={handlenext} className="page4-btn-continue">
              Save & Continue →
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}
