import { useEffect, useState } from "react";
import { fetchCountries } from "../services/countriesService";
import { Header } from "../components/header";
import { Loading } from "../components/loading";
import "../index.css";
import { Footer } from "../components/footer";


export default function CountriesPage() {
    const [countries, setCountries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const data = await fetchCountries();
            setCountries(data);
            setLoading(false);
        }
        load();
    }, []);

    if (loading) return (
        <Loading />
    );

    return (

        <div>
            <Header />
            <div className="container">
                <h1 className="title">Lista de Países</h1>

                <div className="row g-4">
                    {countries.map((c) => (
                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3"
                            key={c.name}
                        >
                            <div
                                className="card card-country h-100"
                                onClick={() => window.location.href = `/country/${c.name}`}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    src={c.flag}
                                    className="card-img-top"
                                    alt={c.name}
                                    style={{ height: "150px", objectFit: "cover" }}
                                />

                                <div className="card-body">
                                    <h5 className="card-title">{c.name}</h5>
                                    <p className="card-text">
                                        Clique para ver mais informações
                                    </p>
                                    <a className="btn btn-primary">Detalhes</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>

    );
}
