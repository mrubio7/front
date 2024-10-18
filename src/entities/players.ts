export interface PlayerStatsModel {
	Id: number;
	KrRatio: number;
	KdRatio: number;
	KillsAverage: number;
	DeathsAverage: number;
	HeadshotPercentAverage: number;
	MVPAverage: number;
	AssistAverage: number;
	TripleKillsAverage: number;
	QuadroKillsAverage: number;
	PentaKillsAverage: number;
	Elo: number;
}

export interface PlayerModel {
	Id: number;
	Nickname: string;
	FaceitId: string;
	SteamId?: string | null;
	Stats: PlayerStatsModel;
}