export interface TeamI {
    id: number,
    title: string,
    body: string,
    assignedMemberIds: number[]
}

export interface MemberI {
    id: number,
    name: string,
    email: string
}