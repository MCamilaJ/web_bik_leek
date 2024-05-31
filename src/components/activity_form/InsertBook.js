// EditBookForm.js
import React, { useState } from "react";
import api from "../../Api/api";

export default function InsertBookForm({ onDone }) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [pages, setPages] = useState(0);
    const [editions, setEditions] = useState(0);
    const [year_publication, setYear_publication] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const AddBook = {
            title,
            author,
            genre,
            pages: Number(pages),
            editions: Number(editions),
            year_publication: Number(year_publication)
        };

        try {
            await api.post(`/books`, AddBook);
            console.log('Libro agregado con éxito');
            onDone();
        } catch (error) {
            console.error('Error al agregar el libro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Título:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
            <label>
                Autor:
                <input type="text" value={author} onChange={e => setAuthor(e.target.value)} />
            </label>
            <label>
                Género:
                <input type="text" value={genre} onChange={e => setGenre(e.target.value)} />
            </label>
            <label>
                Páginas:
                <input type="number" value={pages} onChange={e => setPages(e.target.value)} />
            </label>
            <label>
                Ediciones:
                <input type="number" value={editions} onChange={e => setEditions(e.target.value)} />
            </label>
            <label>
                Año de Publicación:
                <input type="number" value={year_publication} onChange={e => setYear_publication(e.target.value)} />
            </label>
            <button type="submit">Agregar libro</button>
        </form>
    );
}