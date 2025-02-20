import { generateRandomString } from "../helpers/generate.helper";
import User from "../models/user.model";
import md5 from "md5"

export const resolversUser =  {


    Mutation: {
        register: async (_, args) => {
            const { user } = args;
            const exitUser = await User.findOne({
                email: user.email,
                deleted: false,
            })
            if (exitUser){
                return {
                    code: 400,
                    message: "Account already exists!"
                }
            }
            else {
                user.password = md5(user.password);
                user.token = generateRandomString(30);
                const record = new User(user);
                const data = await record.save();
                console.log(data.password);
                return {
                    code: 200,
                    message: "Register Successful!",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token,
                }
            }
        }
    }
}