import { useParams, useHistory } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    // get id
    const { id } = useParams();
    const { error, loading, data: blog} = useFetch('http://localhost:8080/blogs/' + id);
    const history = useHistory();

    // handle delete
    const handleDelete = () => {
        fetch("http://localhost:8080/blogs/" + blog.id, {
            method: "DELETE",
        }) .then(() => {
            history.push('/');
        })
    }
    return (
        <div className="blog-details">
            {loading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {blog && (
                <article>
                    <h2>{ blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <div>{ blog.body }</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    )
}
export default BlogDetails;