import { Route , Routes } from 'react-router';

import  Homepage  from "./pages/homepage";
import  Navbar  from "./components/Navbar";
import  RatelimitedUI  from "./components/RatelimitedUI";
import  Createpage  from "./pages/createpage"
import  Notedetailpage  from './pages/Notedetailpage';
import toast from 'react-hot-toast'; 
const App = () => {
  return (
    <>

      <div className='relative h-full w-full '>
        <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24
        [background:radial-gradient(125%_125%_at_50%_10%_,#000_60%,#00FF9D40_100%)]'></div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Createpage />} />
          <Route path="/note/:id" element={<Notedetailpage />} />
        </Routes>
      </div>
    </>
  );
};

export default App; 