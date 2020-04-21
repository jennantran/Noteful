import React from 'react';
import Note from '../Note/Note';

export default function NoteListMain(props) {
    return (
        <section className="NotePageMain">
            <ul>
                {props.notes.map(note => 
                    <li key={note.id}>
                        <Note
                            id={note.id}
                            name={note.name}    
                        />
                    </li>
                    )}
            </ul>
        </section>

    )
} 

NoteListMain.defaultProps = {
    note: [],
}

