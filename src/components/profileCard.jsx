import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  User,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Twitter,
  Linkedin,
  Github,
  MessageCircle,
  ChevronRight,
  ThumbsUp,
  Briefcase,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import Button from "./Button";

const PostContent = () => {
  const [post, setPost] = useState({});
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [fileLink, setFileLink] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  // console.log(profilePic)
  useEffect(() => {
    try {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        //  else navigate("/");
        // console.log(post);
        setFileLink(
          appwriteService
            .getFilePreview(String(post.featuredImage))
          
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

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

  console.log(fileLink)

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border   border-slate-200 ">
      <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
        {post.title}
      </h1>
      <img
        src={fileLink}
        alt={post.title}
        className="w-full h-[400px] object-cover"
      />

      <div className="p-8 lg:p-12">
        <div className="flex items-center space-x-4 mb-6">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">
            {/* {posts.category} */}
          </span>
          <div className="flex items-center text-slate-500 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(post.$createdAt)}
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            {/* <Clock className="w-4 h-4 mr-1" /> */}
            {/* {posts.readTime} */}
          </div>

          {isAuthor && (
            <div className="relative">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="browser-css">{parse(String(post.content))}</div>

        {/* <div className="mt-12 flex items-center justify-between p-6 bg-slate-50 rounded-xl">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span className="font-medium">1.2k</span>
            </button>
            <button className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">84</span>
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div> */}
      </div>
    </article>
  );
};

function ProfileCard() {
  const [profile, setProfile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [userId, setUserId] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const [posts,setPosts]=useState([])
    useEffect(()=>{
      if(userId)
        appwriteService.getProfilePosts(userId).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })

    },[userId,navigate])

    // console.log(posts.length)

  useEffect(() => {
    try {
      appwriteService.getPost(slug).then((post) => {
        if (post) setUserId(post.userId);
        //  else navigate("/");
        // console.log(post);
        // setFileLink(
        //   appwriteService
        //     .getFilePreview(String(post.featuredImage))
        //     .concat("&mode=admin"),
        // );
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [slug, navigate]);

  // useEffect(() => {
    if (userId) {
      appwriteService.getProfile(userId).then((data) => {
        if (data) setProfile(data);
        // console.log(profile)
        setProfilePic(
          appwriteService
            .getFilePreview(String(profile?.profilePic))
            
        );
        // const isoString=`${profile.birthDate}`.split('T')[0].split('-').reverse().join('-')
        // setDate(isoString)
      });
    }
  // },[userId,navigate]);

  // console.log(profile)
  const author = {
    name: "Sarah Drasner",
    handle: "@sdras",
    role: "Senior Staff Engineer",
    bio: "Full-stack developer, open source contributor, and tech writer. Passionate about building accessible, high-performance web applications and mentoring the next generation of engineers.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    location: "San Francisco, CA",
    website: "https://sarah.dev",
    stats: {
      posts: 42,
      followers: "12.5k",
    },
  };
  return (
    <main className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Post Content */}
        <div className="flex-1 min-w-0">
          <PostContent />

          {/* Simple Newsletter Box at bottom of post */}
          {/* <div className="mt-12 p-8 bg-blue-600 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-2">Enjoying this article?</h3>
            <p className="text-blue-100 mb-6">
              Join 50,000+ developers getting weekly insights on React and the
              modern web.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>

        {/* Right Column: Author Sidebar */}
        <div className="lg:w-[380px] flex-shrink-0">
          <aside className="space-y-6">
            {/* Author Profile Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={profilePic}
                    alt={profile?.fullName}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {profile?.fullName}
                </h3>
                <p className="text-blue-600 text-sm font-medium mb-4">
                  {"@"+profile?.fullName.split(" ")[0]}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {profile?.bio}
                </p>

                <div className="w-full grid grid-cols-1 gap-4 mb-6 py-4 border-y border-slate-50">
                  <div>
                    <div className="text-lg font-bold text-slate-900">
                      {posts.length}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">
                      Posts
                    </div>
                  </div>
                 
                    {/* <div className="text-lg font-bold text-slate-900">
                      {author.stats.followers}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">
                      Followers
                    </div> */}
                
                </div>

                <div className="flex items-center justify-center space-x-4 mb-8">
                  <a
                    href="#"
                    className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 text-slate-400 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 space-y-3">
                <div className="flex items-center text-slate-500 text-sm">
                  <Briefcase size={16} className="mr-2" />
                  {profile?.proffession}
                </div>
                <div className="flex items-center text-slate-500 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  {profile?.location}
                </div>
              </div>
            </div>

            {/* More from Author */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h4 className="text-lg font-bold text-slate-900 mb-4">
                More from {profile?.fullName.split(" ")[0]}
              </h4>
              <div className="space-y-4">
                {posts?.map((post, i) => (
                  <a
                    key={i}
                    href="#"
                    className="group flex items-start space-x-3 p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-all"
                  >
                    <div className="mt-1.5 p-1 bg-slate-100 rounded group-hover:bg-blue-100 transition-colors">
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors leading-snug">
                      {post?.title}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default ProfileCard;
