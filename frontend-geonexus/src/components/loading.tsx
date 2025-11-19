import '../index.css'
import kirbyGif from "../assets/loading-kirby.gif";

export function Loading() {
    return (
        <div className="loading-container">
            <img src={kirbyGif} alt="Loading..." style={{ width: "150px" }} />

            <div className="loading-text">
                <h1 className="loading-text">
                    Estamos preparando tudo para você!
                </h1>
            </div>
        </div>
    );
}
