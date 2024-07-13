import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'  //we can just write login, if we want to rename it we can do it like this
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate() //we use this hook to navigate to a page based of the programmatic logic
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()  //this is the basic syntax of useForm //this handleSubmit is an event
    const [error,setError] = useState("")

    const login = async (data)=>{         //we should not give this method name handleSubmit because we will give this method inside handleSubmit event
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                console.log("userdata: ",userData);
                if(userData) dispatch(authLogin({userData}));  //as userData is js object we should wrap it with {}
                navigate("/")
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-g bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;   {/*here &apos;t is apostrophee */}
                    <Link
                        to="/signup"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)}className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email",{      //here email is key
                            required: true,
                            validate: {
                                matchPattern: (value)=> /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||  //this regex expression is bounded by / /, and we have to give the parameter value in the test()
                            "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password",{
                                required:true
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >Sign In</Button>
                    </div>
                </form>
            </div>
        
        </div>
    )
}


export default Login
