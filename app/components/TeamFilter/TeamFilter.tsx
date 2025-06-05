import { useContext } from "react";
import { TeamsContext } from "~/contexts/teams/TeamsContext";
import type { TeamI } from "~/models/team.interface";
import "./TeamFilter.css";

export default function TeamFilter() {
    const { setSortBy, setCurrentPage, currentPage, totalPages } = useContext(TeamsContext);

    return (
        <div className="controls">
            <div>
                <label>Trier par : </label>
                <select onChange={(e) => setSortBy(e.target.value as keyof TeamI)}>
                    <option>Titre</option>
                    <option>Nombre de membres</option>
                </select>
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Précédent
                </button>
                <span>
                    Page {currentPage} sur {totalPages}
                </span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Suivant
                </button>
            </div>
        </div>
    );
}
