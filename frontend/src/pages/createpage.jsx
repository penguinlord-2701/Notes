import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import { Link ,useNavigate  } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import api from '../lib/axios';


export const Createpage = () => {
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [loading, setLoading] = useState(false);
 
 const navigate = useNavigate();
 const handleSubmit=async (e) => {
  e.preventDefault();
  if (!title.trim() || !content.trim()) {
    toast.error('Please fill in all fields');
    return;
  }
  setLoading(true);
  try{
    await api.post('/notes', {
      title,content
    });
    toast.success('Note created successfully');
    navigate('/');
  }catch (error) {
  console.error('Error creating note:', error);
    if (error.response?.status === 429) {
      toast.error('Too many requests. Please wait before creating a new note.',{
        duration: 3000,
        icon: '🚨',
      });
    } else  {
      toast.error('Failed to create note. Please try again.');
    }
  }
  finally {
    setLoading(false);  }
 } 
 return (
    <div className=" min-h-screen bg-base-200">
      <div className="max-w-2xl mx-auto ">
      <Link to ={"/"} className="btn btn-ghost md-6">
      <ArrowLeftIcon className="size-5" />Back to notes
      </Link>
      <div className="card bg-base-100">
        <div className='card-body'>
          <h2 className='card-title text-2xl mb-4'> Create New Note</h2>
          <form Onsubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
              <span className="label-text">Title</span>
              </label>
              <input 
              type="text" 
              placeholder="Enter note title" 
              className="input input-bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}  
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
              <span className="label-text">Content</span>
              </label>
              <textarea 
              placeholder="Enter note content" 
              className="textarea textarea-bordered"
              value={content}
              onChange={(e) => setContent(e.target.value)}  
              ></textarea>
            </div>

          <div className='card-actions justify-end'>
            <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            onClick={handleSubmit}
            >
              {loading ? 'Creating...' : 'Create Note'}
            </button>

          </div>


          </form>
        </div>
        
      </div>
      </div>
      </div>
  )
}
export default Createpage;