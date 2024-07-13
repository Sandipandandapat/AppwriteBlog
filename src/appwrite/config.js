import conf from "../conf/conf";
import {Client, ID, Databases, Storage, Query} from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featured_image, status, userID}){
        try {
            console.log("inside create post");
            console.log("featured_image",featured_image);
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featured_image,
                    status,
                    userID,
                }
            )
            console.log("createPost response: ",response);
            return true;
            
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,       //we are considering slug as documentId here
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;   //we are returning to show post is deleted
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            console.log("In getPost");
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error",error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error",error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            console.log("in upload file");
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
            console.log("response: ",response);
            return response;

        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error",error);
            return false;
        }
    }
    

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFIle :: error",error);
            return false;
        }
    }

    getFilePreview(fileId){
        console.log("fileId",fileId);
        const response = this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
        console.log("filepreview response",response);
        return response
    }
}

const appwriteService = new Service()
export default appwriteService;