
import './App.css';
import Datapost from './components/Datapost';
import ViewData from './components/ViewData';
import Singel from './components/Singel';
import UpdateData from './components/UpdateData';






import {HashRouter,Routes,Route} from "react-router-dom"


function App() {
  return (


    <>

      <HashRouter>
        <Routes>
          <Route  path="/" element={ <Datapost />} />

          <Route path="/viewdata" element={<ViewData/>}/>
          <Route path="/singleser/:id" element={<Singel/>}/>
          <Route path="/updteuser/:id" element={<UpdateData/>}/>
          <Route  path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </HashRouter>
     
    </>



  );
}

export default App;
