import { PlayerModel } from "@/entities/players"
import { basic_get } from "@/libs/fetchs"

const getHost = (): string => {
    const host = import.meta.env.VITE_BACKEND_HOST
    //return host || "https://localhost:8080/api/v1"
    return "https://api-gateway-1047491143983.europe-southwest1.run.app"
}


export const ApiBackend = {
    Players: {
        GetAll: async () => {
            const endpoint = `${getHost()}/players/get-all`;
            return await basic_get(endpoint) as PlayerModel[]
        }
    }
}