import conf from "../conf/conf.js"
import {Client,Account,ID} from "appwrite"

export class AuthService{
    client=new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectID);
        this.account=new Account(this.client);
        // try {
        //     this.client.ping()
        // } catch (error) {
        //     console.log(error)
        // }
    }

    async  createSession() {
    try {
        const session = await this.account.createAnonymousSession();
        console.log("Session created successfully:", session);
        return session;
    } catch (error) {
        console.error("Session creation failed:", error);
        throw error;
    }
}

    async createAccount({email,name,password}){
        try {
           const userAccount=await this.account.create({
        userId:ID.unique(),
        email,
        password,
        name,
    }) 
           if(userAccount){
                return this.login({email,password})

            }else{return userAccount}
        } catch (error) {
            throw error
            
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email,password})
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
           return await this.account.get()
        } catch (error) {
            console.log("Appwrite service error :: getCurrentUser :: error",error)
        }

        return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service error :: logout :: error",error)
            
        }
    }
}

const authService=new AuthService()

export default authService