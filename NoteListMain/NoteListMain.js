import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../noteContext'
import {getNotesForFolder} from '../NoteFunctions'

export default class NoteListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }

    static contextType = NoteContext;

    render(){
        const { folderId } = this.props.match.params
        const { notes =[] } = this.context
        console.log("Notes" + notes);
        const notesForFolder = getNotesForFolder(notes,folderId)
        return (
            <section className="NotePageMain">
                <ul>
                    {notesForFolder.map(note => 
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
}

