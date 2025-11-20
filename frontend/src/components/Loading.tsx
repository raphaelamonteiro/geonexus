import kirby from "../assets/loading-kirby.gif";
import '../index.css';

function Loading() {
    return (
        <div className="loading-wrapper">
            <img src={kirby} alt="kirby loading" className="kirby-img" />
            <p className="loading-text">Conectando...</p>
        </div>
    );
}

export default Loading;
