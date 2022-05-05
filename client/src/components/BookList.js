import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

function BookList(){
    const {loading, data} = useQuery(getBooksQuery);
    const [selectedId, setSelectedId] = useState("");
    return (
        <div>
            {loading ? 
            <h1>Books are loading...</h1> : 
            <ul id="book-list">{
            data.books.map( book => {
                return <li key={book.id} onClick={() => setSelectedId(book.id)}>{book.name}</li>
            })}
            </ul>
            }
            <BookDetails id={selectedId}/>
        </div>
    )
}

export default BookList;