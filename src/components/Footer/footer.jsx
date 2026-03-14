import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logo'
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

function Footer() {
    return (
         <footer className="bg-white border-t border-neutral-200 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl font-bold tracking-tight">BigPost</span>
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
            <p>© 2024 BigPost Insights Media. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
  )
}
    

export default Footer
