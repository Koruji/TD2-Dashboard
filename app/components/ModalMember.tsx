import { createContext, useContext, useEffect, useState } from "react";
import { TeamsContext } from "~/contexts/teams/TeamsContext";
import type { MemberI } from "~/models/team.interface";
import "./ModalMember.css";

export const ModalMember = ({showModal, selectedTeam, onClose, children}: {
    showModal: boolean;
    selectedTeam: number;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    if(!showModal) return null;

    const {allMembers, fetchMembers, assignMemberToTeam, removeMemberFromTeam} = useContext(TeamsContext);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
        if(allMembers) {
            setLoading(false);
            console.table(allMembers);
        }
    }, []);

    return(
        <div className={`modal-container ${showModal ? 'visible' : ''}`}>
            <div className="modal-inner">
                <button className="modal-close" onClick={onClose}>×</button>
                {allMembers.map((item: MemberI) => (
                        <p>{item.email}</p>
                    ))}
            </div>
        </div>
    );

}