import {useState,useEffect} from "react";

function D(props){
    
    return (
        props.students.map((s)=>{
            return (
                <tr>
                <td>{s.name}</td>
                <td>{s.year}</td>
                </tr>
            )
        })
    )

}

export default function Display(){
    const [mentors,setMentors]=useState([]);
    const [students,setStudents]=useState([]);
    const [studentstoshow,setStudentstoshow]=useState([]);
    const [flag,setFlag]=useState(0)
    function fetchData(){
        fetch(`http://localhost:4040/getallmentors`)
        .then(data=>data.json())
        .then(d=>{setMentors(d)});
        fetch(`http://localhost:4040/getallstudents`)
        .then(data=>data.json())
        .then(d=>setStudents(d));
    }
    const handleClick=()=>{
        let sel=document.getElementById("mentor_select");
        let mentor=sel.options[sel.selectedIndex].text;
        setStudentstoshow(students.filter((stu)=>stu.mentor_name==mentor))
        setFlag(flag+1);
    }
    useEffect(()=>{
        fetchData();
    },[flag])
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-1 col-md-3 col-lg-3"></div>
                <div className="col-sm-10 col-md-6 col-lg-6">
                <form>
                    <div className="form-row">
                    <div className="col-auto my-1">
                    <label htmlFor="mentor_select">Select Mentor</label>
                        <select className="custom-select mr-sm-2" id="mentor_select">
                            {mentors.map((m)=>{
                                return <option value={m._id}>{m.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-auto my-1">
                        <button style={{position:"absolute",bottom:"1px"}} type="button" onClick={handleClick} className="btn btn-success">Show</button>
                    </div>
                    </div>
                </form>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Year</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            studentstoshow.length!==0? <D students={studentstoshow}/>:<p>No students to show</p>
                        }
                    </tbody>
                       
                </table>
                </div>
                <div className="col-sm-1 col-md-3 col-lg-3"></div>
            </div>
        </div>
    )
}