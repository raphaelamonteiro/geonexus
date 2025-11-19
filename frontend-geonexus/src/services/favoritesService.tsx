const API_URL = "http://localhost:3000/favorites";

export interface FavoriteCountry {
    id?: number;
    code: string;
    name: string;
    note?: string;
}

export async function addFavorite(country: FavoriteCountry) {
    return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(country),
    }).then(r => r.json());
}

export async function getFavorites(): Promise<FavoriteCountry[]> {
    return fetch(API_URL).then(r => r.json());
}

export async function updateFavorite(id: number, note: string) {
    return fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
    }).then(r => r.json());
}

export async function deleteFavorite(id: number) {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    }).then(r => r.json());
}
