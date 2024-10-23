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
    Player:{} as PlayerModel,
})

