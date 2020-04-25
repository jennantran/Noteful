import React from 'react';
import NoteContext from '../noteContext'
import { findFolder } from '../NoteFunctions'
import { findNote } from '../NoteFunctions'

export default class NotePageNav extends React.Component {
    static defaultProps={
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }
    static contextType = NoteContext;

    render() {
        const { notes, folders, } = this.context
        const { note_id } = this.props.match.params
        const note = findNote(notes, note_id) || {}
        const folder = findFolder(folders, note.folderId)
        return (
            <div className="NotePageNav">
                <button 
                    className="backButton"
                    onClick={() => this.props.history.goBack()}>Back
                </button>
                {folder &&(
                <h3 className="folderName">
                    {folder.name}
                </h3>
                )}
            </div>
         );
    }
}

