import React from "react";
import Snackbar from "@material-ui/core/Snackbar"

export default function AssignMentor(){
    const [students,setStudents]=React.useState([]);
    const [mentors,setMentors]=React.useState([]);
    const [flag,setFlag]=React.useState(0);
    const [open,setOpen]=React.useState(false);
    const [mess,setMess]=React.useState("");
    const snackbarClose = ()=> {
     setOpen(false);
      };
    function fetchData(){
        fetch("http://localhost:4040/getstudents")
        .then(data=>data.json())
        .then(d=>{setStudents(d);/*console.log(d)*/})
        fetch("http://localhost:4040/getmentors")
        .then(data=>data.json())
        .then(d=>{setMentors(d);/*console.log(d)*/})
    }
    React.useEffect(()=>{
        try{
        fetchData();
        }catch(err){
            alert("SOME ERROR HERE")
        }
    },[flag])
    async function assign(){
        let student_array=[];
        let selected=document.querySelectorAll('input[type="checkbox"]:checked')
        let mentor_id=document.querySelector('input[type="radio"]:checked').id;
        let mentor_name=document.querySelector('input[type="radio"]:checked').value;
        selected.forEach((s)=>{
            let temp={};
            temp={student_id:s.id,mentor_id,mentor_name};
            student_array.push(temp);
        })
        console.log(student_array);
        console.log(mentor_id,mentor_name);
        var r=await fetch('http://localhost:4040/assignmentor',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              body:JSON.stringify(student_array)
            }
        );
        setFlag(flag+1);
        var txt=await r.text();
        setMess(txt);
        setOpen(true);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1 col-md-2 col-lg-2"></div>
                <div className="col-sm-5 col-md-4 col-lg-4">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Select Students</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((stu)=>{
                                return (
                                    <tr>
                                        <td><input type="checkbox" id={stu._id}/>
                                        <label style={{marginLeft:"5px"}} htmlFor={stu._id}>
                                         {stu.name}
                                    </label></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-5 col-md-4 col-lg-4">
                    
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col">Assign Mentor</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        {mentors.map((m)=>{
                                return (
                                    <tr scope="row">
                                        <td><input type="radio" name="mentors" id={m._id} value={m.name}/>
                                        <label style={{marginLeft:"5px"}} htmlFor={m._id}>
                                         {m.name}
                                         </label></td>
                                        
                                    </tr>
                                )
                            })}
                            
                        </tbody>
                        
                    </table>
                    
                </div>
                <div className="col-sm-1 col-md-2 col-lg-2">
                    <button onClick={assign} className="btn btn-primary btn-sm">Assign</button>
                </div>
            </div>
            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={1500}
        onClose={snackbarClose}
        message={mess}/>
        </div>
    )
}
