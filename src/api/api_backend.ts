import { PlayerModel, ProminentPlayer } from "@/entities/players"
import { TeamsModel } from "@/entities/teams"
import { basic_get } from "@/libs/fetchs"

const getHost = (): string => {
    let host = import.meta.env.VITE_BACKEND_HOST
    return host || "http://localhost:8080/api/v1"
}


export const ApiBackend = {
    Players: {
        GetAll: async () => {
            const endpoint = `${getHost()}/players/get-all`;
            const res = await basic_get(endpoint)
            return res.data.players as PlayerModel[]
        },
        GetProminentPlayers: async () => {
            const endpoint = `${getHost()}/players/get-prominent-players`;
            const res = await basic_get(endpoint)
            console.log(res)
            return res.data.players as ProminentPlayer[]
        }
    },
    Teams: {
        GetAll: async (active:boolean) => {
            const endpoint = active ? `${getHost()}/teams/get-all?active=true` : `${getHost()}/teams/get-all`;
            const res = await basic_get(endpoint) 
            return res.data.teams as TeamsModel[]
        }
    }
}