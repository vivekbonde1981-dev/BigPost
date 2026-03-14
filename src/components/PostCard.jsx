import React, { useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom' 

function PostCard({$id,title,featuredImage}) {

    // useEffect(()=>{
    //     try {
    //     const fileLink=appwriteService.getFilePreview(featuredImage)
    //     return fileLink

    //     } catch (error) {
    //         console.log(error)
            
    //     }

    // },[$id,featuredImage])

   
        const file=appwriteService.getFilePreview(featuredImage)
        // const fileLink=file.concat("&mode=admin")
        console.log(file)

        try {
            appwriteService.getFilePreview(featuredImage)
        } catch (error) {
            console.log(error.message)
            
        }


    return (
    
        <Link to={`/profile-card/${$id}`}>
        <div className='p-4 bg-white rounded-2xl shadow-sm border border-slate-200' style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"auto"}}>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl'
            style={{width:"100%",height:"auto"}} />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
        <style jsx>{`
  @media (max-width: 600px) {
    .lasan {
      width:300px;
      height:400px
      
    }
  }

  @media (min-width: 1200px) {
    .lasan {
      width:600px;
      height:700px
    }
  }
`}</style>
    </Link>
    )
}

export default PostCard
