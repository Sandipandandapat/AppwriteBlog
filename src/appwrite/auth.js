import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        console.log(this.account);
    }

    async createAccount({email,password,name}){       //account creation may failed so we need to handle it
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);   //according to the docs as first parameter we should give ID
            if(userAccount){
                //call another method, we want to log in if account created
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailSession(email, password);
        }
        catch(error){
            throw error;
        }
    }

    // if user lands to home page we have to check the user is logged in or not
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error",error);
        }
    }
}

const authService = new AuthService();

export default authService;