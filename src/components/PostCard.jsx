import React from 'react'
import appWriteService from "../appwrite/config"
import { Link } from 'react-router-dom'


function PostCard({$id,title,featured_image}) {   //in appWrite we write id as $id
  console.log("postCard: ",featured_image);
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appWriteService.getFilePreview(featured_image)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}



export default PostCard
