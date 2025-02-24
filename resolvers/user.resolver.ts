import { generateRandomString } from "../helpers/generate.helper";
import User from "../models/user.model";
import md5 from "md5"

export const resolversUser = {

    Query: {
        getUser: async (_, args, context) => {
            try {
                const { id } = args;
                const token = context.req.token;
                const user = await User.findOne({
                    token: token,
                    deleted: false,
                })
                if (user) {
                    return {
                        code: 200,
                        message: "Get User Successfull!",
                        id: user.id,
                        fullName: user.fullName,
                        email: user.email,
                        token: user.token
                    }
                }
                return {
                    code: 400,
                    message: "Get User Fail!"
                }
            } catch (error) {
                return error;
            }
        }
    },

    Mutation: {
        register: async (_, args) => {
            const { user } = args;
            const exitUser = await User.findOne({
                email: user.email,
                deleted: false,
            })
            if (exitUser) {
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
        },

        login: async (_, args) => {
            const { user } = args;

            const infoUser = await User.findOne({
                email: user.email,
                deleted: false,
            })

            if (!infoUser) {
                return {
                    code: 400,
                    message: "Account does not exist!"
                }
            }

            if (infoUser.password != md5(user.password)) {
                return {
                    code: 400,
                    message: "Wrong password!"
                }
            }
            return {
                code: 200,
                message: "Login Successfull!",
                id: infoUser.id,
                fullName: infoUser.fullName,
                email: infoUser.email,
                token: infoUser.token
            }
        }
    }
}