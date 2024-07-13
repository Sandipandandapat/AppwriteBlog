import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//this is a mechanism how to protect pages and routes
export default function Protected({children,authentication= true}) {   //we want to check we have to render the children or not
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)  //our slice name is auth, that's why we are writing auth.status

    useEffect(()=>{
        //authentication(true) && false!==true(authStatus false means user is not authenticated)
        if(authentication && authStatus!==authentication)   //if we are getting authentication true from user, we should again check it
        {
            navigate("/login")
        }
        //have to check it again
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    },[authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
