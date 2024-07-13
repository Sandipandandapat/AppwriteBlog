import React, { useCallback, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({       //follow readme
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })  

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    
    const submit = async (data)=>{
        if(post){
            const file=data.image[0] ? appwriteService.uploadFile(data.image[0]) : null   //we are taking data.image[0] as it is an array and it supports multiple image
            
            // if there is already file present then after upload we have to delete the prev file
            if(file){
                appwriteService.deleteFile(post.featured_image)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featured_image: file ? file.$id : undefined
            })
            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                console.log("postform: ",fileId);
                data.featured_image = fileId;
                console.log("userData: ",userData);
                console.log(userData.$id);  
                try {
                    
                    const dbPost = await appwriteService.createPost({ ...data, userID: userData.$id });

                    if (dbPost) {
                        console.log("success db post");
                        navigate(`/post/${dbPost.$id}`);
                    }
                } catch (error) {
                    console.log("dbpost error: ",error);
                }
            }
        }
    }

    //according to the project there are two fields title and slug, we have to watch the title and have to generate value in slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    //***how to use the slugTransfer
    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug',slugTransform(value.title,
                    {shouldValidate: true}         //In react-hook-form, the shouldValidate option is used to control whether a field should be validated when its value is programmatically set using the setValue function.

                ))
            }            
        })

        return  ()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featured_image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
