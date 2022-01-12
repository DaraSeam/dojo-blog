import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
    const {error, loading, data: blogs} = useFetch("http://localhost:8080/blogs");
    
    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {loading && <div>loading...</div>}
            {blogs && <BlogList blogs={ blogs } />}
        </div>
    )
}
export default Home;