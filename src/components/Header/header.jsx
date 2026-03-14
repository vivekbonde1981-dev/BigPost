import React from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import { Link ,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Github, 
  Twitter, 
  Linkedin, 
  ArrowRight,
  Clock,
  User,
  Tag,
  Bookmark
} from 'lucide-react';


// function Header() {
//     // const authStatus=false
//      const authStatus=useSelector((state)=>state.auth.status)
    
//     const navigate=useNavigate()
//     const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//   {
//       name: "Profile",
//       slug: "/Profile",
//       active: authStatus,
//   },
//   {
//       name: "EditProfile",
//       slug: "/edit-profile/My",
//       active: authStatus,
//   },
//   {
//       name: "ProfileCard",
//       slug: "/profile-card",
//       active: authStatus,
//   },
//   ]
//     return (
//          <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='70px'   />

//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//     )
// }


function header(){
   const authStatus=useSelector((state)=>state.auth.status)
   const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
    
    const navigate=useNavigate()
    const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
      name: "Profile",
      slug: "/Profile",
      active: authStatus,
  },
  
  ]
  return(
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold tracking-tight">BigPost</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-neutral-600">
            {/* <a href="#" className="text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Articles</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Series</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            
            <button className="bg-neutral-900 text-white px-5 py-2 rounded-full hover:bg-neutral-800 transition-all">
              Subscribe
            </button> */}
            <ul className='flex ml-auto'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-100 p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-4">
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)&& setIsMenuOpen(!isMenuOpen)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                style={{fontWeight:"bold"}}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {/* <a href="#" className="text-lg font-semibold">Home</a>
            <a href="#" className="text-lg font-semibold">Articles</a>
            <a href="#" className="text-lg font-semibold">Series</a>
            <a href="#" className="text-lg font-semibold">About</a> */}
            <hr className="border-neutral-100" />
            {/* <div className="flex flex-col gap-4">
              <button className="flex items-center gap-2 text-neutral-600">
                <Search size={20} /> Search articles
              </button>
              <button className="bg-indigo-600 text-white py-3 rounded-lg font-semibold">
                Subscribe to Newsletter
              </button>
            </div> */}
          
              {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )}
            </div>
        
        )}
      </nav>
  )
}

export default header
