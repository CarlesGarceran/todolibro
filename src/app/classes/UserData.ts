import { User } from "../interfaces/user";

export class UserData
{
    private static user? : User = undefined;

    public static setUser(usr? : User)
    {
        this.user = usr;
    }

    public static getUser() : User | undefined
    {
        return this.user;
    }
}