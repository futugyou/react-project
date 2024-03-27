import { Link } from "react-router-dom"

const ErrorPage = (props: any) => {
    const message = props.message || "Nothing to see here!";

    return (
        <div>
            <h2>{message}</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}

export default ErrorPage