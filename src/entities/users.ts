import { PlayerModel } from "./players"

export interface UserModel {
    ID:number|undefined
	FaceitID:string
	Name:string
	Description:string
	Twitter:string
	Twitch:string
	Role:number
	Token:string
	Player:PlayerModel
}