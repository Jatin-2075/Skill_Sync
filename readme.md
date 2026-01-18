# Skill_Sync - Developer Skills Rating System

## API Reference

- **Universities**: http://universities.hipolabs.com/search?name=middle

## Overview

Skill_Sync maps developer signals across platforms (CodeForces, GitHub, StackOverflow) to 5 core competencies.

---

## Phase 1: Core Skills

| Skill | Description |
|-------|-------------|
| S1 | Problem Solving (Algorithms/CP) |
| S2 | Development (Projects) |
| S3 | Knowledge Sharing (Q&A/Teaching) |
| S4 | Consistency & Discipline |
| S5 | Real-World Impact |

---

## Phase 2: Platform Signal Mapping

### 2.1 Data Points by Platform

**CodeForces**: rating, max_rating, contest_count, last_contest_date

-- last 3-4 contest and get users avg for percentile 

**GitHub**: public_repos, stars, forks, commit_count (12mo), languages_used, repo_age

**StackOverflow**: reputation, accepted_answers, answer_count, tag_diversity

### 2.2 Signal-to-Skill Contribution

- **Problem Solving**: CodeForces/LeetCode ratings & consistency
- **Software Engineering**: GitHub quality, activity, language diversity
- **Knowledge Sharing**: StackOverflow answers & reputation
- **Consistency**: Cross-platform activity patterns
- **Real-World Impact**: GitHub stars (log-scaled), repo usage

---

## Phase 3: Data Extraction Pipeline

**User Flow**: Sign up → Connect profiles → Verify username → Fetch & cache data → Compute score → Render UI

**Supported APIs**:
| Platform | Method |
|----------|--------|
| CodeForces | Public REST |
| GitHub | OAuth + REST/GraphQL |
| StackOverflow | Stack Exchange API |

---

## Phase 4: Implementation Example

```javascript
async function fetchUserProfile(username) {
    const output = document.getElementById("output");
    try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        const commitCount = await getLast12MonthCommits(username);
        
        output.innerHTML = `
            <img src="${userData.avatar_url}" width="120"><br><br>
            <strong>Username:</strong> ${userData.login}<br>
            <strong>Name:</strong> ${userData.name || "N/A"}<br>
            <strong>Public Repos:</strong> ${userData.public_repos}<br>
            <strong>Followers:</strong> ${userData.followers}<br>
            <strong>Commits (12mo):</strong> ${commitCount}
        `;
    } catch (err) {
        output.innerHTML = "User not found or API limit exceeded";
    }
}

async function getLast12MonthCommits(username) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    let totalCommits = 0;

    const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
    );
    if (!reposRes.ok) return 0;

    const repos = await reposRes.json();
    for (const repo of repos) {
        const commitsRes = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits?since=${oneYearAgo.toISOString()}&author=${username}&per_page=100`
        );
        if (commitsRes.ok) {
            totalCommits += (await commitsRes.json()).length;
        }
    }
    return totalCommits;
}
```

