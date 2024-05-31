import React from "react";
import { useEffect, useState } from "react";
import EditBook from "./activity_form/EditBook"
import InsertBook from './activity_form/InsertBook';
import api from "../Api/api";

export default function ({ book }) {
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        console.log('Agregar un nuevo libro');
        setIsAdding(true);
    };

    const handleEdit = () => {
        console.log('Editar libro con ID:', book.id);
        setIsEditing(true);
    };

    const handleDelete = async () => {
        console.log('Eliminar libro con ID:', book.id);
        try {
            await api.delete(`/books/${book.id}`);
            console.log('Libro eliminado con éxito');
        } catch (error) {
            console.error('Error eliminando el libro:', error);
        }
    };

    return (
        <div>
            {isEditing ? (
                <EditBook book={book} onDone={() => { setIsEditing(false) }} />
            ) : isAdding ? (
                <InsertBook onDone={() => { setIsAdding(false) }} />
            ) : (
                <>
                    <button onClick={handleAdd} className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-2 rounded">Agregar</button>
                    <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">Eliminar</button>
                </>
            )}
        </div>
    );
}