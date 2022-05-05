import { useQuery } from "@apollo/client";
import React from "react";
import { getBookQuery } from "../queries/queries";

const BookDetails = ({id}) => {
    const { loading, data } = useQuery(getBookQuery, {variables: {id}});
    function displayBook(){
        if(loading){
            return <div>Loading...</div>
        }
        if(data){
            const {name, genre, author} = data.book;
            return (
                <div>
                    <h2>{name}</h2>
                    <p>{genre}</p>
                    <p>{author.name}</p>
                    <h3>All the Books by {author.name} are:</h3>
                    <ul>
                    {author.books.map(book => {
                        return <li key={book.id}>{book.name}</li>
                    })}
                    </ul>
                </div>
        )
        } else{
            return <div>No Book Selected...</div>
        }
    }

    return (
        <div id="book-details">
        {displayBook()}
        </div>
    )

}

export default BookDetails;