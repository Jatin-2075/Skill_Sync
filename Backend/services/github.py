"""
Fetches public GitHub data for a username using the REST API (no auth required
for public data, 60 req/hr unauthenticated).
"""

from datetime import datetime, timezone
import httpx

GITHUB_API = "https://api.github.com"
HEADERS = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}


async def fetch_github_stats(username: str) -> dict:
    """
    Returns a dict with:
      stars, repos, languages (dict), contributions_approx
    Raises httpx.HTTPStatusError on 404 / rate limit.
    """
    async with httpx.AsyncClient(headers=HEADERS, timeout=10) as client:
        # User info
        user_res = await client.get(f"{GITHUB_API}/users/{username}")
        user_res.raise_for_status()
        user_data = user_res.json()

        public_repos: int = user_data.get("public_repos", 0)

        # Repos list (up to 100, sorted by updated)
        repos_res = await client.get(
            f"{GITHUB_API}/users/{username}/repos",
            params={"per_page": 100, "sort": "updated", "type": "owner"},
        )
        repos_res.raise_for_status()
        repos = repos_res.json()

        total_stars = sum(r.get("stargazers_count", 0) for r in repos)

        # Aggregate languages
        lang_counts: dict[str, int] = {}
        for repo in repos[:20]:   # limit to avoid too many requests
            lang = repo.get("language")
            if lang:
                lang_counts[lang] = lang_counts.get(lang, 0) + 1

        # Sort and keep top 6
        top_langs = dict(
            sorted(lang_counts.items(), key=lambda x: x[1], reverse=True)[:6]
        )

        return {
            "github_stars": total_stars,
            "github_repos": public_repos,
            "github_languages": top_langs,
            "github_contributions": user_data.get("public_gists", 0) + public_repos,
            "github_synced_at": datetime.now(timezone.utc),
        }


async def fetch_repo_stats(github_url: str) -> dict:
    """
    Given a full GitHub URL like https://github.com/owner/repo,
    returns commit/contributor/issue data.
    """
    # Parse owner/repo from URL
    parts = github_url.rstrip("/").split("/")
    if len(parts) < 2:
        return {}
    owner, repo = parts[-2], parts[-1]
    if repo.endswith(".git"):
        repo = repo[:-4]

    async with httpx.AsyncClient(headers=HEADERS, timeout=10) as client:
        # Stars + info
        repo_res = await client.get(f"{GITHUB_API}/repos/{owner}/{repo}")
        if repo_res.status_code != 200:
            return {}
        repo_data = repo_res.json()

        stars: int = repo_data.get("stargazers_count", 0)
        last_push: str | None = repo_data.get("pushed_at")

        # Contributors count
        contrib_res = await client.get(
            f"{GITHUB_API}/repos/{owner}/{repo}/contributors",
            params={"per_page": 1, "anon": "false"},
        )
        # GitHub returns contributor count via Link header, use list length as fallback
        contributors = len(contrib_res.json()) if contrib_res.status_code == 200 else 0

        # Commit activity (last week)
        activity_res = await client.get(f"{GITHUB_API}/repos/{owner}/{repo}/stats/participation")
        weekly_commits = 0
        if activity_res.status_code == 200:
            data = activity_res.json()
            all_weeks = data.get("all", [])
            weekly_commits = all_weeks[-1] if all_weeks else 0

        # Closed issues (last page trick for count)
        issues_res = await client.get(
            f"{GITHUB_API}/repos/{owner}/{repo}/issues",
            params={"state": "closed", "per_page": 1},
        )
        issues_closed = 0
        if issues_res.status_code == 200:
            link = issues_res.headers.get("Link", "")
            if 'rel="last"' in link:
                import re
                m = re.search(r'page=(\d+)>; rel="last"', link)
                issues_closed = int(m.group(1)) if m else 1
            else:
                issues_closed = len(issues_res.json())

        last_commit_at = None
        if last_push:
            try:
                last_commit_at = datetime.fromisoformat(last_push.replace("Z", "+00:00"))
            except ValueError:
                pass

        return {
            "stars": stars,
            "commits_this_week": weekly_commits,
            "contributors_count": contributors,
            "issues_closed": issues_closed,
            "last_commit_at": last_commit_at,
        }


def compute_activity_badge(
    commits_this_week: int,
    contributors_count: int,
    issues_closed: int,
    last_commit_at: datetime | None,
) -> tuple[str, float]:
    """
    Returns (badge, score).
    badge: trending | active | low | dead
    """
    score = 0.0

    score += min(commits_this_week * 5, 40)
    score += min(contributors_count * 3, 20)
    score += min(issues_closed * 0.5, 15)

    if last_commit_at:
        now = datetime.now(timezone.utc)
        days_ago = (now - last_commit_at).days
        if days_ago < 7:
            score += 25
        elif days_ago < 30:
            score += 15
        elif days_ago < 90:
            score += 5
        else:
            score -= 10

    score = max(0.0, min(100.0, score))

    if score >= 60:
        badge = "trending"
    elif score >= 30:
        badge = "active"
    elif score >= 10:
        badge = "low"
    else:
        badge = "dead"

    return badge, round(score, 2)
