import ApiLocalStorage from "@/api/api_localstorage";
import { PlayerModel } from "@/entities/players";
import { UserModel } from "@/entities/users";
import { reactive } from "vue";

export const UserState = reactive<UserModel>({
    ID:0,
    Role:0,
    FaceitID:"",
    Name:"",
    Description: "",
    Twitch:"",
    Twitter:"",
    Token: "",
    Player:{} as PlayerModel,
})

export const SetUserState = (user:UserModel) => {
    ApiLocalStorage.User.Save(user)
    UserState.Description = user.Description
    UserState.FaceitID = user.FaceitID
    UserState.ID = user.ID
    UserState.Name = user.Name
    UserState.Role = user.Role
    UserState.Twitch = user.Twitch
    UserState.Twitter = user.Twitter
    UserState.Player = user.Player
}

export const ClearState = () => {
    ApiLocalStorage.User.Remove()
    UserState.Description = ""
    UserState.FaceitID = ""
    UserState.ID = 0
    UserState.Name = ""
    UserState.Role = 0
    UserState.Twitch = ""
    UserState.Twitter = ""
    UserState.Player = {} as PlayerModel
}

export const IsAlreadyLogged = () => {
    const user = ApiLocalStorage.User.Get()
    SetUserState(user)
}