import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Header,Footer } from './components'
import conf from './conf/conf'
import { Outlet } from 'react-router-dom'
function App() {
  const [loading,setLoading]=useState(false)
  const dispatch=useDispatch()

  useEffect(()=>{

    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    }).finally(()=>
      setLoading(false))
    
   },[])

   return !loading ? (
    
    <div className='min-h-screen flex flex-wrap content-between bg-neutral-50'>
      <div className='w-full block'>
        <Header />
        <main style={{marginTop:"50px"}}>
        <Outlet /> 
        </main>
        <Footer />
      </div>
    </div>
  )  : null
}

export default App
