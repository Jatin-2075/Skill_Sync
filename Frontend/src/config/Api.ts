export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const backend_base_url: string = API_BASE_URL;

type HttpMethod = "POST" | "GET" | "DELETE";

export async function API<T = any>(
    method: HttpMethod,
    url: string,
    data?: T
): Promise<Response> {
    let accesstoken = localStorage.getItem("access");

    let res = await fetch(backend_base_url + url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(accesstoken && { Authorization: `Bearer ${accesstoken}` }),
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (res.status === 401) {
        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
            logout();
            throw new Error("Authorization failed");
        }

        const refreshToken = await fetch(
            backend_base_url + "/api/token/refresh/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh }),
            }
        );

        if (!refreshToken.ok) {
            logout();
            throw new Error("authorization failed");
        }

        const refreshdata = await refreshToken.json();
        localStorage.setItem("access", refreshdata.access);
        accesstoken = refreshdata.access;

        res = await fetch(backend_base_url + url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accesstoken}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    if (!res.ok) {
        throw new Error("request failed");
    }

    return res;
}

function logout(): void {
    localStorage.clear();
}
