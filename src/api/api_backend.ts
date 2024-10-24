import { PlayerModel, ProminentPlayer } from "@/entities/players"
import { TeamsModel } from "@/entities/teams"
import { UserModel } from "@/entities/users"
import { basic_get, basic_post } from "@/libs/fetchs"

const getHost = (): string => {
    let host = import.meta.env.VITE_BACKEND_HOST
    return host || "http://localhost:8080/api/v1"
}


export const ApiBackend = {
    Users: {
        AuthCallback: async (code: string) => {
            const codeVerifier = localStorage.getItem('faceit_code_verifier');
            const endpoint = `http://localhost:8080/api/v1/auth/callback`;
            const res = await basic_post(endpoint, { "code": code, "code_verifier": codeVerifier })
            localStorage.removeItem('faceit_code_verifier');
            console.log(res)
            return res as UserModel
        },
        Logout: async (code: string) => {
            const endpoint = `${getHost()}/auth/logout`;
            const res = await basic_post(endpoint, { code: code })
            return res.data as boolean
        }
    },
    Players: {
        GetAll: async () => {
            const endpoint = `${getHost()}/players/get-all`;
            const res = await basic_get(endpoint)
            return res.data.players as PlayerModel[]
        },
        GetProminentPlayers: async () => {
            const endpoint = `${getHost()}/players/get-prominent-players`;
            const res = await basic_get(endpoint)
            return res.data.players as ProminentPlayer[]
        },
        Get: async (ids:string[]) => {
            const endpoint = `${getHost()}/players/get?ids=${ids.join(",")}`;
            const res = await basic_get(endpoint)
            return res.data.players as PlayerModel[]
        }
    },
    Teams: {
        GetAll: async (active:boolean) => {
            const endpoint = active ? `${getHost()}/teams/get-all?active=true` : `${getHost()}/teams/get-all`;
            const res = await basic_get(endpoint) 
            return res.data.teams as TeamsModel[]
        },
        GetById: async (id:string) => {
            const endpoint = `${getHost()}/teams/get?id=${id}`;
            const res = await basic_get(endpoint) 
            return res.data as TeamsModel
        },
        GetByNickname: async (nickname:string) => {
            const endpoint = `${getHost()}/teams/get?nickname=${nickname}`;
            const res = await basic_get(endpoint) 
            return res.data as TeamsModel
        }
    }
}