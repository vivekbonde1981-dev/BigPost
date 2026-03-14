import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument({
                databaseId:conf.appwriteDatabaseId,
                collectionId:conf.appwriteCollectionId,
                documentId:slug,
                data:{
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
        })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async createProfile({fullName,birthDate,gender,profilePic,bio,userId,location,proffession,email}){
        try {
            return await this.databases.createDocument({
                databaseId:conf.appwriteDatabaseId,
                collectionId:conf.appwriteProfileCollectionId,
                documentId:userId,
                data:{
                   fullName,
                   birthDate,
                   gender,
                   profilePic,
                   bio,
                   location,
                  proffession,
                  email,
                }
        })
        } catch (error) {
            console.log("Appwrite serive :: createProfile :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async updateProfile(userId, {fullName,birthDate,gender,profilePic,bio,location,proffession,email}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                userId,
                {
                   fullName,
                   birthDate,
                   gender,
                   profilePic,
                   bio,
                   location,
                   proffession,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updateProfile :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getProfile(id){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfileCollectionId,
                id
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getProfile :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    async getProfilePosts(userId){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal("userId",`${userId}`)],
                
            )
        } catch (error) {
            console.log("Appwrite serive :: getProfilePosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        const result= this.bucket.getFileView(
            conf.appwriteBucketId,
            fileId
        )

        return `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?&project=${conf.appwriteProjectID}`
    }
}


const service = new Service()
export default service