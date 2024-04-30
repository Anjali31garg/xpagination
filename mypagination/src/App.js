import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
const[employee, setEmployee] = useState([]);
const[page,setPage] = useState(1);

useEffect(()=>{
  const fetchData = async()=>{
    try{
      const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      if(!response.ok){
        throw new Error("failing in fetching");
      }
      const data = await response.json();
      setEmployee(data);

    }catch(e){
      window.alert("failed to fetch data", e);
    }
  }

  fetchData();
},[])


const previousPage = ()=>{
  if(page>1){
    setPage((previousPage)=> previousPage-1);
  }
}

const nextPage = ()=>{
  if(page<employee.length/10){
    setPage((nextPage)=>nextPage+1)
  }
}

  return (
    <div className="App">
      <h1> Employee Data Table</h1>
    <table>
      <thead className='table_head'>
      <tr className='table_row'>
        <th className='head_data'>ID</th>
        <th className='head_data'>Name</th>
        <th className='head_data'>Email</th>
        <th className='head_data'>Role</th>
      </tr>
      </thead>
      <tbody className='table_body'>
      {employee.slice(page*10-10,page*10).map((emp,index)=>(
        <tr key={index}>
            <td className='table_body'>{emp.id}</td>
            <td className='table_body'>{emp.name}</td>
            <td className='table_body'>{emp.email}</td>
            <td className='table_body'>{emp.role}</td>
        </tr>
      ))}
      </tbody>
    </table>

    <div className='paginantion'>
    <button type='button' onClick={previousPage}>Previous</button> 
    <span className='page_number'>{page}</span> 
    <button type='button' onClick={nextPage}>Next</button>  
        
    </div>
    </div>
  );
}

export default App;
