import { useState, useEffect } from "react";
import { useProjects } from "../hooks/useProjects";
import type { Project, ActivityFilter, ActivitySort } from "../Config/Types";
import "../Css/dashboard.css";

export default function Dashboard() {
  const { projects, loading, error, fetchAll, syncOne } = useProjects();
  const [filter, setFilter] = useState<ActivityFilter>("all");
  const [sort, setSort] = useState<ActivitySort>("score");

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const displayed = projects
    .filter((p) => filter === "all" || p.activity_badge === filter)
    .sort((a, b) => {
      if (sort === "last_commit_at") {
        return (
          new Date(b.last_commit_at ?? 0).getTime() -
          new Date(a.last_commit_at ?? 0).getTime()
        );
      }
      return (b as Record<string, number>)[sort] - (a as Record<string, number>)[sort];
    });

  return (
    <div className="pa-root">
      {/* Header */}
      <div className="pa-header">
        <h2 className="pa-title">Project Activity</h2>
        <button
          className="pa-btn pa-btn--refresh"
          onClick={fetchAll}
          disabled={loading}
        >
          {loading ? <span className="pa-spinner" /> : "↺"}{" "}
          {loading ? "Syncing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <p style={{ color: "#f87171", fontFamily: "monospace", fontSize: 13, marginBottom: 16 }}>
          ⚠ {error}
        </p>
      )}

      {/* Filters */}
      <div className="pa-toolbar">
        <div className="pa-filters">
          {(["all", "trending", "active", "low", "dead"] as ActivityFilter[]).map((f) => (
            <button
              key={f}
              className={`pa-filter-btn${filter === f ? " pa-filter-btn--active" : ""} pa-filter-btn--${f}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <select
          className="pa-sort"
          value={sort}
          onChange={(e) => setSort(e.target.value as ActivitySort)}
        >
          <option value="score">Sort: Score</option>
          <option value="commits_this_week">Sort: Weekly Commits</option>
          <option value="last_commit_at">Sort: Last Commit</option>
        </select>
      </div>

      {/* Projects */}
      <div className="pa-grid">
        {displayed.length === 0 && !loading && (
          <p className="pa-empty">
            {projects.length === 0
              ? "No projects yet. Post one under Projects!"
              : "No projects match this filter."}
          </p>
        )}

        {displayed.map((p: Project, i) => (
          <div key={p.id} className={`pa-card pa-card--${p.activity_badge}`}>
            <div className="pa-card__head">
              <div className="pa-card__rank">#{i + 1}</div>
              <div className="pa-card__info">
                <h3 className="pa-card__name">{p.title}</h3>
                <p className="pa-card__desc">{p.description}</p>
              </div>
              <span className={`pa-badge pa-badge--${p.activity_badge}`}>
                {p.activity_badge}
              </span>
            </div>

            <div className="pa-card__stats">
              <div className="pa-stat">
                <span className="pa-stat__label">Score</span>
                <span className="pa-stat__value">{Math.round(p.score)}</span>
              </div>
              <div className="pa-stat">
                <span className="pa-stat__label">Weekly Commits</span>
                <span className="pa-stat__value">{p.commits_this_week}</span>
              </div>
              <div className="pa-stat">
                <span className="pa-stat__label">Contributors</span>
                <span className="pa-stat__value">{p.contributors_count}</span>
              </div>
              <div className="pa-stat">
                <span className="pa-stat__label">Issues Closed</span>
                <span className="pa-stat__value">{p.issues_closed}</span>
              </div>
            </div>

            <div className="pa-card__actions">
              {p.github_url && (
                <a
                  className="pa-btn pa-btn--github"
                  href={p.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  ↗ GitHub
                </a>
              )}
              <button
                className="pa-btn pa-btn--sync"
                onClick={() => syncOne(p.id)}
              >
                ⟳ Sync
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
