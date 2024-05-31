'use client';

import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import api from "../Api/api";
import TableRow from "./TableRow";

const BooksTable = () => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/books');
                setBooksData(response.data); // Asigna los datos de la API al estado local
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const columns = [
        //{ name: 'ID', selector: row => row.id },
        { name: 'Título', selector: row => row.title },
        { name: 'Autor', selector: row => row.author },
        { name: 'Género', selector: row => row.genre },
        { name: 'Páginas', selector: row => row.pages },
        { name: 'Año de Publicación', selector: row => row.year_publication },
        { name: 'Ediciones', selector: row => row.editions },
        {
            name: 'Acciones', cell: (row) => <TableRow book={row} />
        }
    ];

    return (
        <DataTable
            title="Lista de Libros Disponibles"
            columns={columns}
            data={booksData}
            pagination
            paginationPerPage={5}
            highlightOnHover
            pointerOnHover
        />
    );
};

export default BooksTable;
