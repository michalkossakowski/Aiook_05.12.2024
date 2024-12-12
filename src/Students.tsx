

import { useState } from 'react';
import Student from './Student';
import { StudentClass, StudentType } from './types/Student';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import DeleteStudents from './DeleteStudents';
import { NavLink } from 'react-router-dom';


type StudentPropsType = {
  studentList: StudentClass[];
  changeSelectedStudent: (student: StudentClass) => void;
}


export default function Students(props: StudentPropsType) {
  const listTitle = 'Students list';
  return (

    <>
      {listTitle}
      {props.studentList.length > 0 &&
        <ul>
          {props.studentList.map((el) => {
            return  <li key={el.Index_nr}>
                      <div onClick={() => {props.changeSelectedStudent(el);}}>
                        <Student student={el}/>
                        <button><NavLink to="/edit">Edit student</NavLink></button>
                      </div>
                    </li>
          })}

        </ul>}
      {props.studentList.length === 0 && <p>No students stored</p>}

      <button>
        <NavLink to="/add">Add student</NavLink>
      </button>
      <button>
        <NavLink to="/delete">Delete students</NavLink>
      </button>
    </>
  );
}
