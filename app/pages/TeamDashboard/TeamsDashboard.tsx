import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { TeamsContext } from "~/contexts/teams/TeamsContext";
import type { TeamI } from "~/models/team.interface";

export default function TeamsDashboard() {

    const {allTeams, paginatedTeams, fetchTeams} = useContext(TeamsContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>{
        fetchTeams()
        if(allTeams.length > 0) {
            setLoading(false);
            console.table(allTeams);
        }
    }, []);

    return (<>
            {allTeams.map((item: TeamI) => (
                <article className="team-item">
                    <h1 className="team-title">Equipe n° { item.id }</h1>
                    <p className="team-content">Description : { item.body }</p>
                    <p className="team-count">Nombre de membres : { item.assignedMemberIds.length }</p>
                    <NavLink to="/">Gérer les membres l'équipe</NavLink>
                </article>
            ))}
    </>
    );
}