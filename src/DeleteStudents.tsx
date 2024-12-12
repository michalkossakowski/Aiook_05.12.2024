

import { useEffect, useState } from 'react';
import { StudentClass } from './types/Student';
import Student from './Student';

type StudentPropsType = {
    students: StudentClass[];
    onSave: (updatedStudetns: StudentClass[]) => void;
}

export default function DeleteStudents(props: StudentPropsType): React.ReactElement {

    const [studentList, setStudentsList] = useState<StudentClass[]>()

    useEffect(() => {
        if (props.students) {
            setStudentsList(props.students);
        }
    }, [props.students]);

    const deleteStudent = (index : number): void => {
        setStudentsList(studentList?.filter(student => student.Index_nr !== index));
    }

    const saveStudents = (): void => {
        if(studentList){
            props.onSave(studentList)
        }
    }

    const cancel = (): void => {

    }

    return (

        <>
            <div style={{margin: 20}}>
                {studentList?.map((el) => {
                    return  <li key={el.Index_nr}>
                                    <Student student={el} /> 
                                    <button onClick={() => deleteStudent(el.Index_nr) }> Delete</button>
                            </li>
                        })}
                <button onClick={() => saveStudents()}>Save</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>

        </>
    );
}
