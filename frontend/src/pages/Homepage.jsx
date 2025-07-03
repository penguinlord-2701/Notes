import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import RatelimitedUI from '../components/RatelimitedUI';
import axios from 'axios';
import toast from 'react-hot-toast';
import Notecard from '../components/Notecard';
import api from '../lib/axios';

const Homepage = () => {
  const [isRatelimited, setIsRatelimited] = useState(false);  
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {  
      try {
        const res = await api.get('/notes');
        console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      if (error.response?.status === 429) {
          setIsRatelimited(true);
         // toast.error("Too many requests. Please wait.");
        } else {
          toast.error("failed to fetch notes");
        }
      } finally{
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRatelimited && <RatelimitedUI /> }
    <div  className='max-w-6xl mx-auto p-4 mt-6'>
      {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

      {notes.length>0 &&!isRatelimited && (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {notes.map((note) => (
          <Notecard key={note._id} note={note} setNotes={setNotes}/>
        ))}
      </div>
      )}





    </div>
    </div>
  );
};

export default Homepage;