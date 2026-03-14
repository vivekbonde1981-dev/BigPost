import {
  Mail,
  Calendar,
  Briefcase,
  MapPin,
  Link as LinkIcon,
  MoreHorizontal,
  Edit2,
  Camera,
  MessageSquare,
  Heart,
  Share2,
} from "lucide-react";
import appwriteService from "../appwrite/config";

import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PostCard } from "../components";
const Profile = () => {
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState("");
  const [fileLink, setFileLink] = useState(" ");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [posts,setPosts]=useState([])
    useEffect(()=>{
      if(userData)
        appwriteService.getProfilePosts(userData.$id).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })

    },[userData,navigate])

  useEffect(() => {
    if (userData) {
      setEmail(userData.email);
     
      appwriteService.getProfile(userData.$id).then((data) => {
        if (data) setProfile(data);
        else navigate("/edit-profile/My");
        setFileLink(
          appwriteService.getFilePreview(String(data.profilePic)).concat("&mode=admin"),
        );
      });
    } else navigate("/");
  }, [userData, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Check for invalid dates to avoid "Invalid Date" showing up in UI
    if (isNaN(date.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleEdit=()=>{
    navigate("/edit-profile/MyProfile")
  }

  // console.log(fileLink)

  // console.log(posts)
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans" style={{marginTop:"70px"}}>
      {/* Header/Cover Photo Area */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 sm:-mt-24 pb-12">
          {/* Profile Header Card */}
          <div
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6"
            style={{ flexDirection: "row" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-slate-200">
                  <img
                    src={`${fileLink}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    // onError={(e) => {
                    //   e.target.src = "https://via.placeholder.com/150";
                    // }}
                  />
                </div>
                
              </div>

              <div
                className="flex gap-10"
                style={{
                  flexDirection: "column",
                  marginBottom: "20px",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <div className="mt-6">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {profile.fullName}
                  </h1>
                  <div
                    className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-1 text-slate-500"
                    style={{ flexDirection: "column" }}
                  >
                    <span className="flex items-center gap-1">
                      <Briefcase size={16} className="text-slate-400" />
                      {profile.proffession}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} className="text-slate-400" />
                      {profile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <LinkIcon size={16} className="text-slate-400" />
                      <span className="text-indigo-600 hover:underline cursor-pointer">
                        portfolio.me
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div
                className="flex gap-2"
                style={{
                  flexDirection: "column",
                  gap: "30px",
                  marginRight: "20px",
                }}
              >
                <div className="text-center sm:text-left">
                  <span className="block text-5xl font-bold text-slate-900">
                    {posts.length}
                  </span>
                  <span className="text-sm text-slate-500 uppercase tracking-wider">
                    Posts
                  </span>
                </div>
                <button className="flex-1 sm:flex-none px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                onClick={handleEdit}>
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Info
                  </h2>
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                      Email Address
                    </span>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Mail size={16} />
                      </div>
                      <span className="truncate">{email}</span>
                    </div>
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                      Date of Birth
                    </span>
                    <div className="flex items-center gap-3 text-slate-700">
                      <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                        <Calendar size={16} />
                      </div>
                      <span>{formatDate(profile.birthDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: About & Posts */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-3">
                  About Me
                </h2>
                <p className="text-slate-600 leading-relaxed">{profile.bio}</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post}/>
                        </div>
                    ))}
                </div>
      </div>
    </div>
  );
};

export default Profile;
