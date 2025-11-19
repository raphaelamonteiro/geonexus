import { useEffect, useState } from "react";
import {
    getFavorites,
    deleteFavorite,
    updateFavorite,
    type FavoriteCountry
} from "../services/favoritesService";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState<FavoriteCountry[]>([]);
    const [editingNote, setEditingNote] = useState<string>("");

    async function load() {
        setFavorites(await getFavorites());
    }

    useEffect(() => {
        load();
    }, []);

    async function handleDelete(id: number) {
        await deleteFavorite(id);
        load();
    }

    async function handleUpdate(id: number) {
        await updateFavorite(id, editingNote);
        load();
    }

    return (
        <div style={{ padding: 20 }}>
            <h1>⭐ Países Favoritos</h1>

            {favorites.map((f) => (
                <div key={f.id} style={{ marginBottom: 15 }}>
                    <strong>{f.name}</strong> ({f.code}) <br />
                    <small>{f.note || "Sem anotação"}</small>

                    <div>
                        <input
                            placeholder="Editar anotação"
                            onChange={(e) => setEditingNote(e.target.value)}
                        />

                        <button onClick={() => handleUpdate(f.id!)}>Salvar</button>
                        <button onClick={() => handleDelete(f.id!)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
