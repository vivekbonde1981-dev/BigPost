import React ,{useState,useEffect} from 'react'
import { PostCard,Container } from '../components'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'
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
function AllPost() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
                console.log(posts.documents)
            }
        })

    },[])


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
        <div className='w-full py-8'>
            <Container>
                <section className=" px-6">
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
            </Container>

        </div>
    )
}

export default AllPost
