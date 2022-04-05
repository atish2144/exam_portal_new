import React,{useState,useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom' 
import axios from 'axios'

function Finish() {
    const navigate=useNavigate()
    const [data,setdata]=useState([])
    const{id}=useParams()
    const[count,setCount]=useState(0)
    let count2=0;

    useEffect(() => {
        axios.get("https://dip-kaluse.github.io/examport/portal.json")
        .then(res=>{
            console.log(id);
            const result=res.data.tests.filter((obj,index)=>(obj._id==id))
            setdata(result[0]);
            console.log(result[0])
      
            result[0].questions.map((obj,index)=>{ 
                const checks=JSON.parse(localStorage.getItem(obj._id))
                // console.log("ty",typeof checks);
                // console.log("cor",typeof  String(obj.correctOptionIndex));
                String(checks)==String(obj.correctOptionIndex) && count2++; 
                setCount(count2)
            })
            // setCount(count2)
        })
        .catch(err=>{
            console.log("error");
        })
    
        return () => {
            navigate("/");
            localStorage.clear();                
          };
        }, [])


    const clear=()=>
    {
            data.questions.map((obj,index)=>{
            localStorage.removeItem(obj._id);
            localStorage.removeItem("test")   
            })

    }



// console.log(data.length===0 && data );
// console.log(count);
  return (
    <div>

<div className="container">
        <div className="row">
            <h1>My Interview Portal</h1>
            
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">{ data!="" && data.name} - Result</div>
                    <div className="panel-body">
                        <center>
                            <h2 className="">Total no of Questions: {data!="" && data.questions.length} </h2>
                            <h3 className="text-success">Correct Answers:- {count} </h3>
                            <h3 className="text-danger">wrong Answers:- {data!="" && data.questions.length-count}</h3>
                      
                            <button className="btn btn-warning" onClick={()=>{clear();navigate("/")}}> Home</button>                      
                            {/* <h3 className="text-success">Correct Answers: {right}
                            <span className="text-danger">Wrong Answers: {wrong}</span></h3> */}
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Finish