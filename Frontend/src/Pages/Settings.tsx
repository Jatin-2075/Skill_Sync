import { useState, useEffect } from "react";
import { API } from "../Config/Api";
import type { PersonalOut, HandlesOut, SaveStatus } from "../Config/Types";
import "../Css/setting.css";

type NotifKey = "emailUpdates" | "weeklyDigest" | "newMatches" | "messages";

interface Notifications {
  emailUpdates: boolean;
  weeklyDigest: boolean;
  newMatches: boolean;
  messages: boolean;
}

const NOTIF_LABELS: Record<NotifKey, string> = {
  emailUpdates: "Email Updates",
  weeklyDigest: "Weekly Digest",
  newMatches: "New Matches",
  messages: "Messages",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="st-section">
      <h2 className="st-section__title">{title}</h2>
      <div className="st-card">{children}</div>
    </section>
  );
}

function ProfileSection() {
  const [form, setForm] = useState<PersonalOut>({ name: "", email: "", country: "", gender: "", bio: "" });
  const [editMode, setEdit] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    API<PersonalOut>("GET", "/profile/personal/").then(setForm).catch(() => {});
  }, []);

  const set =
    (k: keyof PersonalOut) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    setStatus("loading");
    try {
      await API("POST", "/profile/personal/", form);
      setStatus("ok");
      setEdit(false);
    } catch {
      setStatus("err");
    }
  };

  const saveLbl =
    status === "loading" ? "Saving…" : status === "ok" ? "✓ Saved" : status === "err" ? "Retry" : "Save Changes";

  return (
    <Section title="Profile">
      {!editMode ? (
        <div className="st-profile-view">
          <div className="st-profile-rows">
            {(
              [
                ["Name", form.name],
                ["Email", form.email],
                ["Country", form.country],
                ["Gender", form.gender],
              ] as [string, string | null][]
            ).map(([label, val]) => (
              <div key={label} className="st-row">
                <span className="st-row__label">{label}</span>
                <span className="st-row__value">{val || <span className="st-empty">—</span>}</span>
              </div>
            ))}
            <div className="st-row st-row--bio">
              <span className="st-row__label">Bio</span>
              <span className="st-row__value">{form.bio || <span className="st-empty">—</span>}</span>
            </div>
          </div>
          <button className="st-btn st-btn--secondary" onClick={() => setEdit(true)}>
            ✏ Edit Profile
          </button>
        </div>
      ) : (
        <div className="st-form">
          <div className="st-form-grid">
            <div className="st-field">
              <label className="st-label">Full Name</label>
              <input className="st-input" placeholder="John Doe" value={form.name ?? ""} onChange={set("name")} maxLength={60} />
            </div>
            <div className="st-field">
              <label className="st-label">Email</label>
              <input className="st-input" type="email" placeholder="john@example.com" value={form.email ?? ""} onChange={set("email")} />
            </div>
            <div className="st-field">
              <label className="st-label">Country</label>
              <input className="st-input" placeholder="India" value={form.country ?? ""} onChange={set("country")} maxLength={50} />
            </div>
            <div className="st-field">
              <label className="st-label">Gender</label>
              <select className="st-input" value={form.gender ?? ""} onChange={set("gender")}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="st-field">
            <label className="st-label">Bio</label>
            <textarea
              className="st-input st-textarea"
              placeholder="Tell us about yourself… (max 200 chars)"
              value={form.bio ?? ""}
              onChange={set("bio")}
              maxLength={200}
              rows={3}
            />
            <span className="st-char-count">{(form.bio ?? "").length} / 200</span>
          </div>
          <div className="st-form-actions">
            <button className="st-btn st-btn--ghost" onClick={() => setEdit(false)}>Cancel</button>
            <button
              className={`st-btn st-btn--primary${status === "ok" ? " st-btn--ok" : status === "err" ? " st-btn--err" : ""}`}
              onClick={save}
              disabled={status === "loading"}
            >
              {saveLbl}
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

function HandlesSection() {
  const [form, setForm] = useState<HandlesOut>({ git: "", codeforces: "", leetcode: "" });
  const [editMode, setEdit] = useState(false);
  const [status, setStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    API<HandlesOut>("GET", "/profile/handles/").then(setForm).catch(() => {});
  }, []);

  const set =
    (k: keyof HandlesOut) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const save = async () => {
    setStatus("loading");
    try {
      await API("POST", "/profile/handles/", form);
      setStatus("ok");
      setEdit(false);
    } catch {
      setStatus("err");
    }
  };

  const platforms: { key: keyof HandlesOut; label: string; prefix: string }[] = [
    { key: "git", label: "GitHub", prefix: "github.com/" },
    { key: "codeforces", label: "Codeforces", prefix: "codeforces.com/profile/" },
    { key: "leetcode", label: "LeetCode", prefix: "leetcode.com/u/" },
  ];

  const saveLbl =
    status === "loading" ? "Saving…" : status === "ok" ? "✓ Saved" : status === "err" ? "Retry" : "Save Changes";

  return (
    <Section title="Coding Links">
      {!editMode ? (
        <div className="st-profile-view">
          <div className="st-profile-rows">
            {platforms.map(({ key, label, prefix }) => (
              <div key={key} className="st-row">
                <span className="st-row__label">{label}</span>
                <span className="st-row__value">
                  {form[key] ? (
                    <a className="st-link" href={`https://${prefix}${form[key]}`} target="_blank" rel="noreferrer">
                      {form[key]}
                    </a>
                  ) : (
                    <span className="st-empty">—</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <button className="st-btn st-btn--secondary" onClick={() => setEdit(true)}>✏ Edit Handles</button>
        </div>
      ) : (
        <div className="st-form">
          {platforms.map(({ key, label, prefix }) => (
            <div key={key} className="st-field">
              <label className="st-label">{label}</label>
              <div className="st-prefixed">
                <span className="st-prefixed__pre">{prefix}</span>
                <input
                  className="st-input st-prefixed__field"
                  placeholder="username"
                  value={form[key] ?? ""}
                  onChange={set(key)}
                  maxLength={60}
                />
              </div>
            </div>
          ))}
          <div className="st-form-actions">
            <button className="st-btn st-btn--ghost" onClick={() => setEdit(false)}>Cancel</button>
            <button
              className={`st-btn st-btn--primary${status === "ok" ? " st-btn--ok" : status === "err" ? " st-btn--err" : ""}`}
              onClick={save}
              disabled={status === "loading"}
            >
              {saveLbl}
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

function NotificationsSection() {
  const [notifs, setNotifs] = useState<Notifications>({
    emailUpdates: true,
    weeklyDigest: false,
    newMatches: true,
    messages: true,
  });

  const toggle = (k: NotifKey) => setNotifs((p) => ({ ...p, [k]: !p[k] }));

  return (
    <Section title="Notifications">
      <div className="st-toggles">
        {(Object.keys(notifs) as NotifKey[]).map((k) => (
          <div key={k} className="st-toggle-row">
            <span className="st-toggle-label">{NOTIF_LABELS[k]}</span>
            <button
              className={`st-toggle${notifs[k] ? " st-toggle--on" : ""}`}
              onClick={() => toggle(k)}
              role="switch"
              aria-checked={notifs[k]}
            >
              <span className="st-toggle__thumb" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

function LegalSection() {
  return (
    <Section title="Legal">
      <div className="st-legal-links">
        <a className="st-legal-btn" href="/privacy" target="_blank" rel="noreferrer">Privacy Policy ↗</a>
        <a className="st-legal-btn" href="/terms" target="_blank" rel="noreferrer">Terms of Service ↗</a>
      </div>
    </Section>
  );
}

function DangerSection() {
  const [confirm, setConfirm] = useState(false);

  const deleteAccount = async () => {
    try {
      await API("DELETE", "/auth/delete-account/");
      localStorage.clear();
      window.location.href = "/";
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  };

  return (
    <Section title="Danger Zone">
      {!confirm ? (
        <div className="st-danger-row">
          <div>
            <p className="st-danger-title">Delete Account</p>
            <p className="st-danger-desc">Permanently remove your account and all data. Cannot be undone.</p>
          </div>
          <button className="st-btn st-btn--danger" onClick={() => setConfirm(true)}>Delete Account</button>
        </div>
      ) : (
        <div className="st-danger-confirm">
          <p className="st-danger-title">Are you absolutely sure?</p>
          <p className="st-danger-desc">This will permanently delete your account, projects, and all data.</p>
          <div className="st-form-actions">
            <button className="st-btn st-btn--ghost" onClick={() => setConfirm(false)}>Cancel</button>
            <button className="st-btn st-btn--danger-solid" onClick={deleteAccount}>
              Yes, Delete My Account
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}

export default function Settings() {
  return (
    <div className="st-root">
      <div className="st-shell">
        <div className="st-top">
          <h1 className="st-heading">Settings</h1>
          <p className="st-subheading">Manage your account, notifications and preferences</p>
        </div>
        <ProfileSection />
        <HandlesSection />
        <NotificationsSection />
        <LegalSection />
        <DangerSection />
      </div>
    </div>
  );
}
