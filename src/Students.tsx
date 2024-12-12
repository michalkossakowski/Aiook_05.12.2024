

import { useState } from 'react';
import Student from './Student';
import { StudentClass, StudentType } from './types/Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudents from './DeleteStudents';


export default function Students() {
  const listTitle = 'Students list';
  const [studentList, updateList] = useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01'))
  ]);
  const [selectedStudent, changeSelectedStudent] = useState<StudentClass>();
  const [showForm, changeShowForm] = useState("");


  const addNewStudent = (student: StudentClass) => {
    changeShowForm("")
    console.log("add fn invoked")
    //studentList.push(student);
    let students = [...studentList];
    students.push(student)
    updateList(students)
  }

  const saveStudent = (student: StudentClass) => {
    changeShowForm("")
    console.log("save fn invoked")
    const students = studentList.map((s) => 
      s.Index_nr === selectedStudent?.Index_nr ? student : s
    )
    updateList(students)
    changeSelectedStudent(undefined)
  }

  const updateStudents = (students: StudentClass[]) => {
    updateList([...students])
  }

  return (

    <>
      {listTitle}
      {studentList.length > 0 &&
        <ul>
          {studentList.map((el) => {
            return  <li key={el.Index_nr}>
                      <div style={{ color: selectedStudent === el ? "red" : ""}} onClick={() => {changeSelectedStudent(el); changeShowForm("")}}>
                        <Student student={el}/>
                      </div>
                    </li>
          })}

        </ul>}
      {studentList.length === 0 && <p>No students stored</p>}
     
      {showForm !== "add" &&
        <button onClick={() => {changeShowForm("add"); changeSelectedStudent(undefined)}}>Add student</button>
      }
        
      {showForm !== "edit" && selectedStudent &&
        <button onClick={() => {changeShowForm("edit")}}>Edit student</button>
      }
   
      {showForm !== "delete" &&
        <button onClick={() => {changeShowForm("delete")}}>Delete students</button>
      }

      {showForm === "add" && <AddStudent addFn={addNewStudent} />}
      {showForm === "edit" && <EditStudent studentToEdit={selectedStudent} editFn={saveStudent} />}
      {showForm === "delete" && <DeleteStudents students={studentList} onSave={updateStudents} />}

    </>
  );
}
