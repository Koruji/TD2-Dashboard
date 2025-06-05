import { createContext, useState, type ReactNode } from "react";
import type { MemberI, TeamI } from "~/models/team.interface";

interface TeamsContextI {
    allTeams: TeamI[],
    paginatedTeams: TeamI[],
    allMembers: MemberI[],
    fetchTeams: () => Promise<void>,
    fetchMembers: () => Promise<void>,
    assignMemberToTeam: (teamId: number, newMemberId: number) => void,
    removeMemberFromTeam: (teamId: number, memberId: number) => void,
    // setSortBy: (key: keyOfTeam) =>void,
    // setCurrentPage: (page: number) => void,
    pageSize: number,
    totalPages: number,
    currentPages: number
}

export const TeamsContext = createContext<TeamsContextI>(null!);

export const TeamsProvider = ({children}: {children: ReactNode}) => {

    const [allTeams, setAllTeams] = useState<TeamI[]>([]);
    const [paginatedTeams, setPaginatedTeams] = useState<TeamI[]>([]);
    const [allMembers, setAllMembers] = useState<MemberI[]>([]);
    const [pageSize, setPageSize] = useState(0);
    const [totalPages,setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(0);

    const apiRoot = "https://jsonplaceholder.typicode.com";

    const fetchTeams = async() => {
        await fetch(`${apiRoot}/posts`)
        .then(result => result.ok && result.json())
        .then(data => {
            data.forEach((team: TeamI) => {
                const membersId = localStorage.getItem(`${team.id}`);
                team.assignedMemberIds = membersId ? JSON.parse(membersId) : [];
            });
            setAllTeams(data || []);
        })
        .catch(err => { console.error(`Erreur : ${err}`)});
        
    }

    const fetchMembers = async() => {
        await fetch(`${apiRoot}/users`)
        .then(result => result.ok && result.json())
        .then(data => setAllMembers(data || []))
        .catch(err => { console.error(`Erreur : ${err}`)});
    }

    const assignMemberToTeam = (teamId: number, newMemberId: number) => {
        const existingMember = JSON.parse(localStorage.getItem(`${teamId}`) || '[]');
        if(!existingMember.includes(newMemberId)) {
            existingMember.push(newMemberId);
        }
        localStorage.setItem(`${teamId}`, JSON.stringify(existingMember));
    }

    const removeMemberFromTeam = (teamId: number, memberId: number) => {
        const existingMember: MemberI[] = JSON.parse(localStorage.getItem(`${teamId}`) || '[]');
        const newMemberList = existingMember.filter(member => member.id !== memberId)
        localStorage.setItem(`${teamId}`, JSON.stringify(existingMember));
    }

    
    return (
        <TeamsContext.Provider value={{
            allTeams,
            paginatedTeams,
            allMembers,
            fetchTeams,
            fetchMembers,
            assignMemberToTeam,
            removeMemberFromTeam,
            // setSortBy,
            // setCurrentPage,
            pageSize,
            totalPages,
            currentPages
        }}>
            {children}
        </TeamsContext.Provider>
    );
}