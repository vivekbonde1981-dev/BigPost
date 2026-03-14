import React, { useState, useEffect } from 'react';
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

const App = () => {
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

  const categories = ['All', 'Technology', 'Design', 'Lifestyle', 'Business', 'Culture'];

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

  const posts = [
    {
      id: 2,
      title: "Sustainable Architecture in Urban Environments",
      excerpt: "How modern architects are integrating nature into concrete jungles to fight climate change.",
      category: "Environment",
      author: "Marcus Thorne",
      date: "Oct 22, 2023",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1449156059431-787c5d7139b8?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "The Silent Productivity Killer: Context Switching",
      excerpt: "Why multitasking is a myth and how 'deep work' can triple your creative output.",
      category: "Lifestyle",
      author: "Sarah Chen",
      date: "Oct 20, 2023",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Web3 and the Creator Economy",
      excerpt: "Understanding the shift from platform-owned content to user-owned digital assets.",
      category: "Technology",
      author: "David Kim",
      date: "Oct 18, 2023",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2064&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Mindfulness in the Age of Constant Connectivity",
      excerpt: "Practical strategies for finding mental clarity when your devices never stop buzzing.",
      category: "Lifestyle",
      author: "Aria Montgomery",
      date: "Oct 15, 2023",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2031&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Generative AI: Creative Tool or Replacement?",
      excerpt: "Navigating the ethical and practical implications of AI in the world of professional art.",
      category: "Technology",
      author: "Julian Ross",
      date: "Oct 12, 2023",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2064&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Small Business Growth in 2024",
      excerpt: "The specific trends that will help boutique agencies scale without losing their soul.",
      category: "Business",
      author: "Linda Wu",
      date: "Oct 10, 2023",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Lumina</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-neutral-600">
            <a href="#" className="text-indigo-600">Home</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Articles</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Series</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Search size={20} />
            </button>
            <button className="bg-neutral-900 text-white px-5 py-2 rounded-full hover:bg-neutral-800 transition-all">
              Subscribe
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-100 p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-4">
            <a href="#" className="text-lg font-semibold">Home</a>
            <a href="#" className="text-lg font-semibold">Articles</a>
            <a href="#" className="text-lg font-semibold">Series</a>
            <a href="#" className="text-lg font-semibold">About</a>
            <hr className="border-neutral-100" />
            <div className="flex flex-col gap-4">
              <button className="flex items-center gap-2 text-neutral-600">
                <Search size={20} /> Search articles
              </button>
              <button className="bg-indigo-600 text-white py-3 rounded-lg font-semibold">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Featured Story
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-neutral-900">
                {featuredPost.title}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
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
      <section className="sticky top-[72px] bg-neutral-50/80 backdrop-blur-md z-40 border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
          <div className="flex items-center gap-8 h-16 whitespace-nowrap">
            <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest mr-2">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium transition-all relative py-2 ${
                  activeCategory === cat ? 'text-indigo-600 font-bold' : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest Insights</h2>
            <button className="text-indigo-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase text-indigo-600">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-xs text-neutral-400">
                    <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-neutral-50 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-400">{post.date}</span>
                    <button className="text-indigo-600 font-bold text-sm inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-indigo-600 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            {/* Decorative background circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-700 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50"></div>

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Stay curious. Join the list.</h2>
                <p className="text-indigo-100 max-w-lg mx-auto text-lg">
                  Weekly insights on design, tech, and the future delivered straight to your inbox. No spam, ever.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="flex-grow px-6 py-4 rounded-2xl bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all shadow-lg"
                />
                <button className="bg-neutral-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-lg">
                  Subscribe
                </button>
              </div>
              <p className="text-indigo-200 text-xs">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold tracking-tight">Lumina</span>
              </div>
              <p className="text-neutral-500 max-w-sm leading-relaxed">
                A digital space for thinkers, creators, and the curious. Exploring the intersection of design, technology, and culture.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-neutral-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-all">
                  <Twitter size={20} />
                </a>
                <a href="#" className="p-2 bg-neutral-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-all">
                  <Github size={20} />
                </a>
                <a href="#" className="p-2 bg-neutral-100 rounded-full hover:bg-indigo-100 hover:text-indigo-600 transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-neutral-400">Company</h4>
              <ul className="space-y-4 text-neutral-600 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Manifesto</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-neutral-400">Explore</h4>
              <ul className="space-y-4 text-neutral-600 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Resources</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Podcast</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold uppercase tracking-widest text-xs text-neutral-400">Categories</h4>
              <ul className="space-y-4 text-neutral-600 font-medium">
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Technology</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Design</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Culture</a></li>
                <li><a href="#" className="hover:text-indigo-600 transition-colors">Business</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
            <p>© 2024 Lumina Insights Media. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;