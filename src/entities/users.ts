import { PlayerModel } from "./players"

export interface UserModel {
    ID:number
	FaceitID:string
	Name:string
	Description:string
	Twitter:string
	Twitch:string
	Role:number
	Player:PlayerModel
}