import React,{useEffect, useState} from 'react'
import {useParams,useNavigate,Link} from "react-router-dom" 
import axios from 'axios';
import { computeHeadingLevel } from '@testing-library/react';
import Finish from './Finish';

function Test() {
    const navigate=useNavigate();
     const {id}=useParams();
    //  console.log("exam",id);
    const[test,settest]=useState([])
    const [question, setQuestion] = useState("");
    const[count,setCount]=useState(0)
    const[count2,setCount2]=useState(0)
    const[optbutton,setoptbutton]=useState("")
    const[option,setoption]=useState("")
    let temo=[]
    // const[question,setquestion]=useState([])
    // const[examId,setExamId]=useState(JSON.parse(localStorage.getItem("Exam_id")))


    useEffect(() => {
        axios.get("https://dip-kaluse.github.io/examport/portal.json")
        .then(res=>{
            console.log(res.data)
            const result=res.data.tests.filter((obj,index)=>obj._id==id)
            settest(result[0]);
      
            const ind = result[0].questions.filter((obj, index) => {
                if (obj._id === id)  {
                  setCount(index);
                  return index;
                }
              });
        })
        .catch(err=>{
            console.log("error");
        })
        }, [])

        useEffect(()=>{

            // localStorage.setItem(test.questions[count]._id,JSON.stringify(temo.sort()))

        },[count2])

        useEffect(()=>{
            if(question != "" && count<test.questions.length)
            {     
            //   setque(data.questions)/
            //   setquestion(data.questions[count].questionText)
              setoption(test.questions[count].options)
            }
            // console.log("opt",question!="" && test.questions[0].options[0]);
        },[count])




        useEffect(() => {
 
            if(test != "" && test .questions[count].type==="Multiple-Response")
            {
                setoptbutton("checkbox" )
           const checks=JSON.parse(localStorage.getItem(test.questions[count]._id))
                if(checks!=null && checks.length==0)
                {
                    localStorage.removeItem(test.questions[count]._id)
                }
                else if(checks!=null)
                {
                    temo=checks;
                }
            }
            else
            {
                setoptbutton("radio")
            }
        },)
    

        const handleNextQuestion = () => {
            setCount((prev) => prev + 1);
          };

          const handlePreviosQuestion = () => {
            setCount((prev) => prev - 1);
          };

          const myfun={
            margin:"10px"
          };

          const saveradioval=(e)=>{
                // console.log(count);
            localStorage.setItem(test.questions[count]._id,JSON.stringify(e.target.value))
            
        }
 
        const savecheckboxval=(e)=>{

            if(e.target.checked)
            {
                let temp=[];
                temp.push(Number(e.target.value))
                temo=[...temo,...temp]    
                    // console.log(temo);
                // temo=temp    
                // console.log(temo);
            }
            else
            {
                console.log("firdt");
                let temp2;
                console.log( temo.includes(Number(e.target.value))&& Number(e.target.value));
                temo.includes(Number(e.target.value))
                &&(temp2= temo.filter((obj)=>obj !== Number(e.target.value)))
                temo=temp2;
                console.log(temo);
            }   
            setCount2((prev)=>prev+1);

            localStorage.setItem(test.questions[count]._id,JSON.stringify(temo.sort()))


            }
            const checkoption=(index)=>
            {
                const checks=JSON.parse(localStorage.getItem(test.questions[count]._id))
                console.log((checks));
                if(checks!=null  && optbutton=="checkbox" && checks.includes(index) )
                {  
                        return true;
                }
                if(checks!=null && checks.length>0 && index===Number(checks))
                {
                    // console.log("asdf");
                    return true
                }
                

            }
            
    const finish=()=>{
      
    }


return (
    <div>
   <div className="container">
        <div className="row">
            <h1>My Interview Portal</h1>
            
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">{test.length!=0 && test.name}</div>
                    <div className="panel-body">
                        <form>
                            <label>{[count+1]} {test.length!=0 && test.questions[count].questionText}</label>
                            <div className="radio">
                                <label>
                                {    
                                    test.length!=0 &&
                                  test.questions[count].options.map((op,index)=>{     
                             const function2=optbutton==="checkbox" ? savecheckboxval : saveradioval  
                                    // console.log("firdt");
                            return(     
                            <div className="radio" key={op}>
                                <label>
                                    <input type={optbutton} 
                                    checked={checkoption(index)}
                                    name="option" 
                                    value={index} 
                                     onChange={function2}
                                    />
                                     {op}
                                </label>
                            </div>
                            );
                            })    
                        }
   
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="panel-footer">

                    <Link to={test.length!=0 && (`/Test/${test._id}/${test.questions[count]._id}`)}>    
                    <button className="btn btn-success" style={myfun} disabled={count==0} onClick={()=>{ handlePreviosQuestion()}}>Previous</button>
                    </Link>   


                    <Link to={test.length!=0 && (`/Test/${test._id}/${test.questions[count]._id}`)}>    
                    <button className="btn btn-success" disabled={test.length!=0 && count>test.questions.length-2} onClick={()=>{ handleNextQuestion()}}>Next</button>
                    </Link>   

                    <Link to={test.length!=0 && (`/Finish/${test._id}`)}>    
                    <button className="pull-right btn btn-danger" disabled={test.length!=0 && count<test.questions.length-1} onClick={finish()} >Finish</button>
                    </Link>   

                        {/* <a href="finish.html" className="pull-right btn btn-danger">Finish</a> */}

                    </div>
                </div>
            </div>
        </div>
    </div>

        {/* {(que.length==count && count!=0 ) ? complete() : ""} */}

    </div>
  )
}

export default Test