import React, { useState } from "react";
import {useQuery, useMutation } from "@apollo/client";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

function AddBook(){
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");

    const {loading, data} = useQuery(getAuthorsQuery);
    const [addBookFunction] = useMutation(addBookMutation);

    const displayAuthors = () => {
        if(loading){
            return (<option disabled>Loading Authors...</option>)
        }else{
            return data.authors.map(author => {
                return (<option key={author.id} value={author.id}>{ author.name }</option>)
            })
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        // console.log(name,genre,author);
        await addBookFunction({variables: {name,genre,authorId:author},refetchQueries:[getBooksQuery]});
        // console.log(bookData,isBookLoading);
    }

    return (
        <form id="add-book" onSubmit={(e) => submit(e)}>
            <div className="field">
                <label>Book Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthor(e.target.value)}>
                    <option>Select Author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook;