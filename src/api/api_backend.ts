import { PlayerModel, ProminentPlayer } from "@/entities/players"
import { basic_get } from "@/libs/fetchs"

const getHost = (): string => {
    let host = import.meta.env.VITE_BACKEND_HOST
    //return host || "https://localhost:8080/api/v1"
    host = host
    return "https://api-gateway-1047491143983.europe-southwest1.run.app/api/v1"
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
    }
}