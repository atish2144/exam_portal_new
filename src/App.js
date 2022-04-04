import './App.css';
import Homepage from './component/Homepage';
import Test from './component/Test';
import Finish from './component/Finish';
import  {Routes,Route} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
        {/* <Homepage></Homepage>
        <Test></Test>
        <Finish></Finish> */}

      <Routes>
        <Route  path='/*' element={<Homepage/>} />
        <Route exact path='/' element={<Homepage/>} />
        <Route  path='/Test/:id/:id1' element={<Test/>} />
        <Route  path='/Finish/:id' element={<Finish/>} />
      </Routes>

    </div>
  );
}

export default App;
