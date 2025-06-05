import { createContext, useContext, useEffect, useState } from "react";
import { TeamsContext } from "~/contexts/teams/TeamsContext";
import type { MemberI } from "~/models/team.interface";
import "./ModalMember.css";

export const ModalMember = ({showModal, selectedTeam, onClose}: {
    showModal: boolean;
    selectedTeam: number;
    onClose: () => void;
}) => {
    if(!showModal) return null;

    const {allMembers, fetchMembers, assignMemberToTeam, removeMemberFromTeam} = useContext(TeamsContext);
    const [isLoading, setLoading] = useState(true);
    const [assignedMembers, setAssignedMembers] = useState<number[]>([]);

    useEffect(() => {
        fetchMembers();
        if(allMembers) {
            const listAssignedMembers = localStorage.getItem(`${selectedTeam}`);
            setAssignedMembers(listAssignedMembers ? JSON.parse(listAssignedMembers) : []);
            setLoading(false);
        }
    }, [selectedTeam]);

    return(
        <>
        {showModal && <div className="modal-overlay" onClick={onClose}></div>}

        <div className={`modal-container ${showModal ? 'visible' : ''}`}>
            <div className="modal-inner">
                <button className="modal-close" onClick={onClose}>X</button>
                    <h2>Liste des membres</h2>
                            <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Assignation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allMembers.map((item: MemberI) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            {
                                                assignedMembers.includes(item.id) ? (
                                                    <button className="non-assigned" onClick={() => {
                                                        removeMemberFromTeam(selectedTeam, item.id);
                                                        setAssignedMembers(prev => prev.filter(id => id !== item.id));
                                                    }}>Désassigner</button>
                                                ) : (
                                                    <button className="assigned" onClick={() => {
                                                        assignMemberToTeam(selectedTeam, item.id);
                                                        setAssignedMembers(prev => [...prev, item.id]);
                                                    }}>Assigner</button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    </div>
        </div>
        </>
    );

}