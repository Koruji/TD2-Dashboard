import TeamsDashboard from "~/pages/TeamDashboard/TeamsDashboard";
import type { Route } from "../../+types/root";
import { TeamsProvider } from "~/contexts/teams/TeamsContext";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard équipe" },
    { name: "description", content: "dashboard" },
  ];
}

export default function TeamsDashboardRoute() {
    return (
        <TeamsProvider>
            <TeamsDashboard></TeamsDashboard>
        </TeamsProvider>
    );
}
