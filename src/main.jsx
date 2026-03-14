import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home.jsx'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import {RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout, Login } from './components/index.js'
import ProfileCard from './components/profileCard.jsx'

// import AddPost from "./pages/AddPost.jsx";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import EditProfile from './components/editProfile.jsx'

import Post from "./pages/Post";

import AllPosts from "./pages/AllPost";
import Profile from './pages/Profile.jsx'

import {Container, PostForm } from './components/index.js'

function AddPost() {
    return (
        <div className='py-8'>
            <Container>
                <PostForm/>
            </Container>
        </div>
    )
}

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login/>
          </AuthLayout>
        )
      },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/Profile",
            element: <Profile/>,
        },
        {
            path: "/edit-profile/:slug",
            element: <EditProfile/>,
        },
        {
            path: "/profile-card/:slug",
            element:<ProfileCard/> ,
        },
    ]

  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
    
  </StrictMode>,
)
