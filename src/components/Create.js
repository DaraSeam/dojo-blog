import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [author,setAuthor] = useState("mario");
    const histroy = useHistory();

    const handleSubmit = (e) => {
        // prevent site from reloading after add new blog
        e.preventDefault();

        const blog = { title, body, author }
        fetch("http://localhost:8080/blogs/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        })
            .then(() => {
                histroy.push('/');
            })
    }
    return (
        <div className="create">
            <h2>Add New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title: </label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Blog Body: </label>
                <textarea
                    required
                    rows="8"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Blog Author: </label>
                <select
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                <button>Add Blog</button>
            </form>
        </div>
    )
}
export default Create;