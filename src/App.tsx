
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentClass } from './types/Student';
import { useState } from 'react';
import './App.css'
import Students from './Students';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudents from './DeleteStudents';

function App() {

  const [studentList, updateList] = useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01'))
  ]);
  const [selectedStudent, changeSelectedStudent] = useState<StudentClass>();
  
   const addNewStudent = (student: StudentClass) => {
      let students = [...studentList];
      students.push(student)
      updateList(students)
    }
  
    const saveStudent = (student: StudentClass) => {
      const students = studentList.map((s) => 
        s.Index_nr === selectedStudent?.Index_nr ? student : s
      )
      updateList(students)
      changeSelectedStudent(undefined)
    }
  
    const updateStudents = (students: StudentClass[]) => {
      updateList(students)
    }

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Students studentList={studentList} changeSelectedStudent={changeSelectedStudent} />} />
        <Route path="/add" element={<AddStudent addFn={addNewStudent} />} />
        <Route path="/edit" element={<EditStudent studentToEdit={selectedStudent} editFn={saveStudent} />} />
        <Route path="/delete" element={<DeleteStudents students={studentList} saveFn={updateStudents} />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
