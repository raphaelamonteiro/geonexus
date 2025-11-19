import { Header } from "../components/header";
import { Footer } from "../components/footer";

import "../index.css";


export default function HomePage() {
    return (

        <div>
            <Header />
            <div className="container">
                <h1 className="title">Lista de Países</h1>

            </div>
            <Footer />
        </div>

    );
}
