import React from 'react'
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
import appwriteService from '../appwrite/config' 
import { Link } from 'react-router-dom' 

import { useState,useEffect } from 'react';
function Hero() {
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

      const [posts,setPosts]=useState([])
    useEffect(
      ()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)

            }})},[])
        


    
     
    
      const featuredPost = {
        id: 1,
        title: "The Future of Interface Design: Beyond the Screen",
        excerpt: "As we move into 2024, the boundaries between physical and digital spaces are blurring more than ever. Explore how spatial computing is redefining our daily interactions.",
        category: "Design",
        author: "Elena Vance",
        date: "Oct 24, 2023",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
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

    
     


    return (
        <>
        <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Hero Section */}
        <section className=" pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6" style={{display:"flex",alignItems:"flex-start",justifyContent:"flex-start",flexDirection:"column"}}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider" style={{marginBottom:"0px",marginTop:"30px"}}>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        Featured Story
                      </div>
                      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-neutral-900" style={{textAlign:"left"}}>
                        {featuredPost.title}
                      </h1>
                      <p className="text-lg text-neutral-600 leading-relaxed max-w-xl" style={{textAlign:"left"}}>
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-neutral-700 overflow-hidden">
                            <img src="https://i.pravatar.cc/150?u=elena" alt="Author" />
                          </div>
                          <span className="font-semibold text-neutral-900">{featuredPost.author}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {featuredPost.readTime}
                        </div>
                      </div>
                      <button className="group inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:translate-x-1 transition-all">
                        Read Full Article
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                      <img 
                        src={featuredPost.image} 
                        alt="Featured" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-6 right-6">
                        <button className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-indigo-600 transition-all">
                          <Bookmark size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Category Filter */}
      

      <section className=" px-6" style={{paddingBottom:"20px"}}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-3xl font-bold">Latest Insights</h2>
                  <button className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    View All <ChevronRight size={18} />
                  </button>
                </div>
      
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post) => (
                    <Link to={`/profile-card/${post.$id}`}>
                    <article key={post.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img 
                          src={appwriteService.getFilePreview(post.featuredImage)} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                          <span className="text-xs font-medium text-neutral-400">{formatDate(post.$createdAt)}</span>
                          <button className="text-indigo-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Read More <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>


            </div>
        </>
    )
}

export default Hero
