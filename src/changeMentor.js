import React from "react";
import Snackbar from "@material-ui/core/Snackbar";

export default function ChangeMentor(){
    const [students,setStudents]=React.useState([]);
    const [mentors,setMentors]=React.useState([]);
    const [open,setOpen]=React.useState(false);
    const [mess,setMess]=React.useState("");
    const [flag,setFlag]=React.useState(0);
    const snackbarClose = ()=> {
     setOpen(false);
      };
    function fetchData(){
        fetch("http://localhost:4040/getallstudents")
        .then(data=>data.json())
        .then(d=>{setStudents(d);console.log(students)})
        fetch("http://localhost:4040/getallmentors")
        .then(data=>data.json())
        .then(d=>{setMentors(d);console.log(mentors)})
    }
    React.useEffect(()=>{
        fetchData()
    },[flag])
    const handleChange=async (e)=>{
        let student_clicked=e.target.id;
        let m=document.getElementById(`mentor_change${student_clicked}`);
        let mentor_selected=m.options[m.selectedIndex];
        let data_to_send={id:student_clicked,mentor_name:mentor_selected.text,mentor_id:mentor_selected.value}
        let r=await fetch(`http://localhost:4040/changementor`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              },
              body:JSON.stringify(data_to_send)
            }
            );
            let txt=await r.text();  //Snackbar 
            setMess(txt);
            setOpen(true);
            setFlag(flag+1);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-2 col-md-3 col-lg-3"></div>
                <div className="col-sm-8 col-md-6 col-lg-6">
                    <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Mentor</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        students.map((s)=>{
                           return (<tr>
                                <td>{s.name}</td>
                                <td>{s.mentor_name}</td>
                                <td>
                                    <div>
                                        <select style={{width:"10rem"}} class="form-control-sm" id={`mentor_change${s._id}`}>
                                            {mentors.map((m)=>{
                                                if(m._id!==s.mentor_id)
                                                  return <option value={m._id}>{m.name}</option>;
                                            })}
                                        </select>
                                        <button id={s._id} style={{marginLeft:"5px"}} type="button" onClick={handleChange} className="btn btn-primary btn-sm">Assign/Change</button>
                                    </div>
                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                    </table>
        
                </div>
                <div className="col-sm-2 col-md-3 col-lg-3"></div>
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