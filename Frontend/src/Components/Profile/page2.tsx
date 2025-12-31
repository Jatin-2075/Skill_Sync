import "./style/page2.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Usernames = {
  cfusername: string;
  stackusername: string;
  gitusername: string;
}

type ConnectionStatus = {
  cf: 'idle' | 'loading' | 'connected' | 'error';
  git: 'idle' | 'loading' | 'connected' | 'error';
  stack: 'idle' | 'loading' | 'connected' | 'error';
}

export default function Page2() {
  const [usernames, setUsernames] = useState<Usernames>({
    cfusername: "",
    stackusername: "",
    gitusername: "",
  });


  const navigate = useNavigate()
  

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    cf: 'idle',
    git: 'idle',
    stack: 'idle'
  });

  const [results, setResults] = useState<any>({
    cf: null,
    git: null,
    stack: null
  });

  const handleCodeforces = async () => {
    if (!usernames.cfusername.trim()) {
      alert("Please enter a Codeforces username");
      return;
    }

    setConnectionStatus(prev => ({ ...prev, cf: 'loading' }));
    
    try {
      const res = await fetch(`https://codeforces.com/api/user.info?handles=${usernames.cfusername}`);
      const data = await res.json();
      
      if (data.status === "OK") {
        console.log("Codeforces data:", data);
        setResults(prev => ({ ...prev, cf: data.result[0] }));
        setConnectionStatus(prev => ({ ...prev, cf: 'connected' }));
      } else {
        setConnectionStatus(prev => ({ ...prev, cf: 'error' }));
        alert("Codeforces user not found");
      }
    } catch (error) {
      console.error("Error fetching Codeforces data:", error);
      setConnectionStatus(prev => ({ ...prev, cf: 'error' }));
      alert("Failed to connect to Codeforces");
    }
  };

  const handleGitHub = async () => {
    if (!usernames.gitusername.trim()) {
      alert("Please enter a GitHub username");
      return;
    }

    setConnectionStatus(prev => ({ ...prev, git: 'loading' }));
    
    try {
      const res = await fetch(`https://api.github.com/users/${usernames.gitusername}`);
      
      if (res.ok) {
        const data = await res.json();
        console.log("GitHub data:", data);
        setResults(prev => ({ ...prev, git: data }));
        setConnectionStatus(prev => ({ ...prev, git: 'connected' }));
      } else {
        setConnectionStatus(prev => ({ ...prev, git: 'error' }));
        alert("GitHub user not found");
      }
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      setConnectionStatus(prev => ({ ...prev, git: 'error' }));
      alert("Failed to connect to GitHub");
    }
  };

  const handleStackOverflow = async () => {
    if (!usernames.stackusername.trim()) {
      alert("Please enter a Stack Overflow user ID");
      return;
    }

    setConnectionStatus(prev => ({ ...prev, stack: 'loading' }));
    
    try {
      const res = await fetch(`https://api.stackexchange.com/2.3/users/${usernames.stackusername}?site=stackoverflow`);
      const data = await res.json();
      
      if (data.items && data.items.length > 0) {
        console.log("Stack Overflow data:", data);
        setResults(prev => ({ ...prev, stack: data.items[0] }));
        setConnectionStatus(prev => ({ ...prev, stack: 'connected' }));
      } else {
        setConnectionStatus(prev => ({ ...prev, stack: 'error' }));
        alert("Stack Overflow user not found");
      }
    } catch (error) {
      console.error("Error fetching Stack Overflow data:", error);
      setConnectionStatus(prev => ({ ...prev, stack: 'error' }));
      alert("Failed to connect to Stack Overflow");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsernames((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getButtonText = (status: string) => {
    switch (status) {
      case 'loading':
        return 'Connecting...';
      case 'connected':
        return 'Connected ✓';
      case 'error':
        return 'Retry';
      default:
        return 'Connect';
    }
  };

  const handleBack =() => {
    navigate("/pageone");
  }

  const handleContinue = () => {
    console.log('Continuing to Phase 3');
    navigate("/pagethree");
  };

  return (
    <div className="page-root">
      <header className="header">
        <div className="brand">
          <div className="logo" />
          <span className="brand-title">SkillRank</span>
        </div>

        <div className="header-right">
          <a className="help-link">
            <span className="help-icon">?</span>
            Help
          </a>
        </div>
      </header>

      <main className="main-content">
        <div className="form-container">
          <section className="progress-section">
            <div className="progress-info">
                <span className="phase-text">Phase 2 : Link Your Profiles  </span>
                <span className="completion-text">40% Completed</span>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: "40%" }} />
            </div>
            </section>

          <section className="heading-section">
            <h1 className="main-title">Build Your Skill Matrix</h1>
            <p className="description">
              Link your external profiles to automatically calculate your global ranking vectors. 
              Our algorithms analyze your activity to generate your skill scores.
            </p>
            <div className="secure-pill">
              <span className="material-symbols-outlined">lock</span>
              Secure • Read-only access
            </div>
          </section>

          <div className="cards-stack">
            {/* Codeforces Card */}
            <article className={`platform-card ${connectionStatus.cf === 'loading' ? 'verifying' : ''}`}>
                {connectionStatus.cf === 'loading' && <div className="loading-line"></div>}
                <div className="platform-icon dark-bg">
                <span className="material-symbols-outlined">code</span>
                </div>
                <div className="card-body">
                <h3 className="platform-name">Codeforces</h3>
                <p className="sub-text">Maps to <strong>(Problem Solving)</strong> & <strong>(Algorithms)</strong>.</p>
                <div className="input-row">
                    <div className="input-wrapper">
                    <span className="input-prefix">codeforces.com/profile/</span>
                    <input 
                        type="text"
                        name="cfusername"
                        className="text-input"
                        placeholder="username" 
                        value={usernames.cfusername}
                        onChange={handleInputChange}
                        disabled={connectionStatus.cf === 'loading' || connectionStatus.cf === 'connected'}
                    />
                    </div>
                    <button 
                    className={`btn-connect-solid ${connectionStatus.cf === 'connected' ? 'connected' : ''}`}
                    onClick={handleCodeforces}
                    disabled={connectionStatus.cf === 'loading'}
                    >
                    {connectionStatus.cf === 'loading' && <div className="spinner-dot"></div>}
                    {getButtonText(connectionStatus.cf)}
                    </button>
                </div>
                <p className="input-hint">
                    {connectionStatus.cf === 'connected' && results.cf
                    ? `Connected as ${results.cf.handle} (Rating: ${results.cf.rating || 'N/A'})`
                    : "We only fetch public profile and submission data."}
                </p>
                </div>
            </article>

            {/* GitHub Card */}
            <article className={`platform-card ${connectionStatus.git === 'loading' ? 'verifying' : ''}`}>
                {connectionStatus.git === 'loading' && <div className="loading-line"></div>}
                <div className="platform-icon dark-bg">
                <span className="material-symbols-outlined">terminal</span>
                </div>
                <div className="card-body">
                <h3 className="platform-name">GitHub</h3>
                <p className="sub-text">Maps to <strong>(Projects)</strong> & <strong>(Collaboration)</strong>.</p>
                <div className="input-row">
                    <div className="input-wrapper">
                    <span className="input-prefix">github.com/</span>
                    <input 
                        type="text"
                        name="gitusername"
                        className="text-input"
                        placeholder="username" 
                        value={usernames.gitusername}
                        onChange={handleInputChange}
                        disabled={connectionStatus.git === 'loading' || connectionStatus.git === 'connected'}
                    />
                    </div>
                    <button 
                    className={`btn-connect-solid ${connectionStatus.git === 'connected' ? 'connected' : ''}`}
                    onClick={handleGitHub}
                    disabled={connectionStatus.git === 'loading'}
                    >
                    {connectionStatus.git === 'loading' && <div className="spinner-dot"></div>}
                    {getButtonText(connectionStatus.git)}
                    </button>
                </div>
                <p className="input-hint">
                    {connectionStatus.git === 'connected' && results.git
                    ? `Connected as ${results.git.login} (${results.git.public_repos} public repos)`
                    : "We only fetch public repositories and contribution graphs."}
                </p>
                </div>
            </article>

            {/* Stack Overflow Card */}
            <article className={`platform-card ${connectionStatus.stack === 'loading' ? 'verifying' : ''}`}>
                {connectionStatus.stack === 'loading' && <div className="loading-line"></div>}
                <div className="platform-icon orange-bg">
                <span className="material-symbols-outlined">forum</span>
                </div>
                <div className="card-body">
                <h3 className="platform-name">Stack Overflow</h3>
                <p className="sub-text">Maps to <strong>(Knowledge Sharing)</strong>.</p>
                <div className="input-row">
                    <div className="input-wrapper">
                    <span className="input-prefix">stackoverflow.com/users/</span>
                    <input 
                        type="text"
                        name="stackusername"
                        className="text-input"
                        placeholder="user ID" 
                        value={usernames.stackusername}
                        onChange={handleInputChange}
                        disabled={connectionStatus.stack === 'loading' || connectionStatus.stack === 'connected'}
                    />
                    </div>
                    <button 
                    className={`btn-connect-solid ${connectionStatus.stack === 'connected' ? 'connected' : ''}`}
                    onClick={handleStackOverflow}
                    disabled={connectionStatus.stack === 'loading'}
                    >
                    {connectionStatus.stack === 'loading' && <div className="spinner-dot"></div>}
                    {getButtonText(connectionStatus.stack)}
                    </button>
                </div>
                <p className="input-hint">
                    {connectionStatus.stack === 'connected' && results.stack
                    ? `Connected as ${results.stack.display_name} (Reputation: ${results.stack.reputation})`
                    : "Enter your Stack Overflow user ID (e.g., 58291)."}
                </p>
                </div>
            </article>
            </div>

          <footer className="footer-nav">
            <button onClick={handleBack} className="btn-back">Back to Phase 1</button>
            <button onClick={handleContinue} className="btn-continue">Save & Continue →</button>
          </footer>
        </div>
      </main>
    </div>
  );
}