import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {useNavigate,Link} from "react-router-dom" 

function Homepage() {
    const navigate=useNavigate();
    const [test,setTest]=useState([])

    const send = (id) => {
        // localStorage.setItem("Exam_id", JSON.stringify(id));
      };

    useEffect(() => {
        axios.get("https://dip-kaluse.github.io/examport/portal.json")
        .then(res=>{
            // console.log(res.data)
            setTest(res.data.tests) 
        })
        .catch(err=>{
            console.log("error");
        })
    }, [])


    return (
    <div>
     <div className="container">
        <div className="row">
            <h1>My Interview Portal</h1>
            
            <div className="col-md-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Test</th>
                            <th>No of Questions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {test.map((obj,index)=>{
                        return(
                          <tr key={index}>
                              <td>{obj.name}</td>
                              <td>{obj.questions.length}</td>
                              {/* <td ><button className="btn btn-warning" onClick={()=> navigate(`/Test/${obj._id}`)}>Start Test</button></td> */}
                              <td >
                                  {/* <button className="btn btn-warning"onClick={() => {myfunction(index);navigate(`/Test/${obj._id}/${obj.questions[0]._id}`)}} >Start Test
                                  </button> */}
                                {/* <Link to={`/Test/${obj._id}/${obj.questions[0]._id}`}>     */}
                                <Link to={`/Test/${obj._id}/${obj.questions[0]._id}`}>    

                                <button className="btn btn-warning"onClick={() =>send(obj._id)}>Start Test
                                  </button>
                                  </Link>


                              </td>
                          </tr>      
                        );
                    })}    
                    </tbody>
                </table>
            </div>
        </div>

        {/* API Url: <a href="http://interviewapi.stagging.in/getQuizData" target="_blank">http://interviewapi.stagging.in/getQuizData</a> */}
    </div>

    </div>
  )
}

export default Homepage