import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { TeamsContext } from "~/contexts/teams/TeamsContext";
import type { TeamI } from "~/models/team.interface";
import "./TeamsDashboard.css";
import { ModalMember } from "~/components/ModalMember";

export default function TeamsDashboard() {

    const {allTeams, paginatedTeams, fetchTeams} = useContext(TeamsContext);
    const [isLoading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<number>(null!);

    useEffect(() =>{
        fetchTeams()
        if(allTeams.length > 0) {
            setLoading(false);
        }
    }, []);

    return (<div className="team-container">
            {allTeams.map((item: TeamI) => (
                <article className="team-item" key={item.id}>
                    <h1>Equipe n° { item.id }</h1>
                    <p className="team-content"><strong>Description : </strong><br></br>{ item.body }</p>
                    <p><strong>Nombre de membres</strong></p>
                    <p className="team-count">{ item.assignedMemberIds.length }</p>
                    <button onClick={() => {setShowModal(true); setSelectedTeam(item.id);}}>Gérer les membres</button>
                </article>
            ))}
            <ModalMember showModal={showModal} selectedTeam={selectedTeam} onClose={() => { setShowModal(false); fetchTeams(); } }/>
    </div>
    );
}