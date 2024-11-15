import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
      <section>
        <p>error happened! || notfound page</p>
        <br></br>
        <button onClick={() => navigate("/")}>Refresh to main</button>
      </section>
    );
  };
  
export default ErrorPage;