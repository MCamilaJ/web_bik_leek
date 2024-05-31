// EditBookForm.js
import React, { useState, useEffect } from "react";
import api from "../../Api/api";

export default function EditBookForm({ book, onDone }) {

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState(book.genre);
    const [pages, setPages] = useState(book.pages);
    const [editions, setEditions] = useState(book.editions);
    const [year_publication, setYear_publication] = useState(book.year_publication);

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setPages(book.pages);
        setEditions(book.editions);
        setYear_publication(book.year_publication);
        // Actualiza los estados con los datos del libro cuando el libro cambie
    }, [book]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedBook = {
            id: book.id,
            title,
            author,
            genre,
            pages: Number(pages),
            editions: Number(editions),
            year_publication: Number(year_publication)
        };

        try {
            await api.put(`/books/${book.id}`, updatedBook);
            console.log('Libro actualizado con éxito');
            onDone();
        } catch (error) {
            console.error('Error actualizando el libro:', error.response);
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
            <button type="submit">Actualizar libro</button>
        </form>
    );
}