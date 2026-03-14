const API_BASE_URL = ""

function logout(): void {
  localStorage.clear();
}

type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export async function API<T>(
    method: HttpMethod,
    url: string,
    data?: any
): Promise<T> {

    let access = localStorage.getItem("access");

    let res = await fetch(API_BASE_URL + url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(access && { Authorization: `Bearer ${access}` })
        },
        body: data ? JSON.stringify(data) : undefined
    });

    if (res.status === 401) {

        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
            logout();
            throw new Error("Unauthorized");
        }

        const refreshRes = await fetch(API_BASE_URL + "/api/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh })
        });

        if (!refreshRes.ok) {
            logout();
            throw new Error("Session expired");
        }

        const refreshData = await refreshRes.json();

        localStorage.setItem("access", refreshData.access);

        access = refreshData.access;

        res = await fetch(API_BASE_URL + url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access}`
            },
            body: data ? JSON.stringify(data) : undefined
        });
    }

    if (!res.ok) {
        throw new Error("Request failed");
    }

    return await res.json();
}