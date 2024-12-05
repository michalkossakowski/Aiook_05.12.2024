

import { useState } from 'react';
import Student from './Student';
import { StudentClass, StudentType } from './types/Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';


export default function Students() {
  const listTitle = 'Students list';
  const [studentList, updateList] = useState([
    new StudentClass('Ala', 'Makota', 123485, new Date('2000-01-21')),
    new StudentClass('Jan', 'Kowlaski', 2345, new Date('1999-10-23')),
    new StudentClass('Adrian', 'Duda', 156789, new Date('2001-04-01'))
  ]);
  const [showAddForm, changeValue] = useState(false);
  
  const [selectedStudent, changeSelectedStudent] = useState<StudentClass>();
  const [showEditForm, changeShowEditForm] = useState(false);


  const addNewStudent = (student: StudentClass) => {
    changeValue(false)
    console.log("add fn invoked")
    //studentList.push(student);
    let students = [...studentList];
    students.push(student)
    updateList(students)
  }

  const saveStudent = (student: StudentClass) => {
    changeShowEditForm(false)
    console.log("save fn invoked")
    const students = studentList.map((s) => 
      s.Index_nr === selectedStudent?.Index_nr ? student : s
    )
    updateList(students)
    changeSelectedStudent(undefined)
  }


  return (

    <>
      {listTitle}
      {studentList.length > 0 &&
        <ul>
          {studentList.map((el) => {
            return  <li key={el.Index_nr}>
                      <div style={{ color: selectedStudent === el ? "red" : ""}} onClick={() => {changeSelectedStudent(el); changeValue(false);changeShowEditForm(false)}}>
                        <Student student={el}/>
                      </div>
                    </li>
          })}

        </ul>}
      {studentList.length === 0 && <p>No students stored</p>}
      {!showAddForm &&
        <button onClick={() => {changeValue(true);changeShowEditForm(false); changeSelectedStudent(undefined)}}>Add student</button>
      }
      {showAddForm && <AddStudent addFn={addNewStudent} />}
      

      {!showEditForm && selectedStudent &&
        <button onClick={() => {changeShowEditForm(true)}}>Edit student</button>
      }

      {showEditForm && <EditStudent studentToEdit={selectedStudent} editFn={saveStudent} />}
    </>
  );
}
