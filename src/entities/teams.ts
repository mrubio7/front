export interface TeamsModel {
    Id: number;
    FaceitId: string;
    Name: string;
    Nickname: string;
    Avatar: string;
    Active: boolean;
    PlayersId: string[];
    Stats: TeamStats;
}

interface TeamStats {
    TotalMatches: number;
    Wins: number;
    Winrate: number;
    RecentResults: number[];
    MapStats: { [key: string]: TeamMapStats };
}
  
interface TeamMapStats {
    MapName: string;
    Winrate: number;
    Matches: number;
}