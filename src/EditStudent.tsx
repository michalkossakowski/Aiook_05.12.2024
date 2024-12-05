

import { useEffect, useState } from 'react';
import { StudentClass } from './types/Student';

type StudentPropsType = {

    editFn: (new_student: StudentClass) => void;
    studentToEdit: StudentClass | undefined;
}

//export default function Student({student}:{student: StudentClass}) {
export default function EditStudent(props: StudentPropsType): React.ReactElement {

    const [editedName, setEditedName] = useState<string>()
    const [editedSurname, setEditedSurname] = useState<string>()
    const [editedIndex, setEditedIndex] = useState<number>()
    const [editeBirthDate, setEditedBirthDate] = useState<Date>()

    useEffect(() => {
        console.log()
        if (props.studentToEdit) {
            setEditedName(props.studentToEdit.Name);
            setEditedSurname(props.studentToEdit.Surname);
            setEditedIndex(props.studentToEdit.Index_nr);
            setEditedBirthDate(props.studentToEdit.dataUrodzenia);
        }
    }, [props.studentToEdit]);

    const editStudent = (): void => {
        if(editedName && editedSurname && editedIndex && editeBirthDate){
            const student = new StudentClass(editedName ,editedSurname, editedIndex, editeBirthDate);
            props.editFn(student);
        }
    }

    return (

        <>
            <div>
                Edit Student:
                <br/>
                Name: <input type='text' name="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                Surname: <input type='text' name="surname" value={editedSurname}  onChange={(e) => setEditedSurname(e.target.value)} />
                Index: <input type='number' name="index" value={editedIndex}  onChange={(e) => setEditedIndex(parseInt(e.target.value))} />
                Date of birth: <input type='date' name="birthdate" value={editeBirthDate?.toISOString().split('T')[0]} onChange={(e) => setEditedBirthDate(new Date(e.target.value))} />
                <button onClick={() => editStudent()}>Save</button>
            </div>

        </>
    );
}
