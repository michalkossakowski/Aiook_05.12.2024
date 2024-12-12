

import { useEffect, useState } from 'react';
import { StudentClass } from './types/Student';
import Student from './Student';
import { useNavigate } from 'react-router-dom';

type StudentPropsType = {
    students: StudentClass[];
    saveFn: (updatedStudetns: StudentClass[]) => void;
}

export default function DeleteStudents(props: StudentPropsType): React.ReactElement {
    const [studentList, setStudentsList] = useState<StudentClass[]>()
    const navigate = useNavigate();

    useEffect(() => {
        if (props.students) {
            setStudentsList([...props.students]);
        }
    }, [props.students]);

    const deleteStudent = (index : number): void => {
        setStudentsList(studentList?.filter(student => student.Index_nr !== index));
    }

    const saveStudents = (): void => {
        if(studentList){
            props.saveFn(studentList)
        }
        navigate('/');
    }

    const cancel = (): void => {
        navigate('/');
    }

    return (

        <>
            <div style={{margin: "5px", padding:"5px", border: "solid red 2px"}}>
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
