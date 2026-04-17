import { useState, useCallback } from "react";
import { API } from "../Config/Api";
import type { Project } from "../Config/Types";

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  syncOne: (id: number) => Promise<void>;
}

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await API<Project[]>("GET", "/projects/");
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  const syncOne = useCallback(async (id: number) => {
    try {
      const updated = await API<Project>("POST", `/projects/${id}/sync/`);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      console.error("Sync failed:", err);
    }
  }, []);

  // Auto-fetch on mount by returning fetchAll — caller decides when to call
  return { projects, loading, error, fetchAll, syncOne };
}
