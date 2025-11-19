import "../index.css";

export function Footer() {
    return (
        <footer
            className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">

            <ul className="nav col-md-12 justify-content-start">
                <li className="nav-item">
                    <a href="https://github.com/raphaelamonteiro/geonexus" target="_blank" rel="noopener noreferrer" className="px-2 title-footer">GeoNexus - O mundo conectado de forma clara e acolhedora</a>
                </li>

            </ul>
            <ul className="nav col-md-12 justify-content-start">
                <li className="nav-item">
                    <a href="https://github.com/raphaelamonteiro" target="_blank" rel="noopener noreferrer" className="px-2 text-footer"> &copy; 2025 Raphaela Monteiro</a>
                </li>

            </ul>

        </footer>
    );
}
