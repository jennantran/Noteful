import React from 'react';
import { NavLink } from 'react-router-dom'
import './NoteListNav.css'
import { countNotesForFolder } from '../NoteFunctions'
import NoteContext from '../noteContext'

export default class NoteListNav extends React.Component {
    static contextType = NoteContext;

    render(){
        const { folders=[], notes=[] } = this.context
        return (
            <div className="NoteListNav">
                <ul className="NoteList">
                    {folders.map(folder =>
                            <li key={folder.id}>
                                <NavLink
                                    className="NavFoldersLink"
                                    to={`/folder/${folder.id}`}
                                    >
                                         <span className='NoteListNav__num-notes'>
                                             {countNotesForFolder(notes, folder.id)}
                                         </span>
                                    {folder.name}
                                </NavLink>
                            </li>
                    )}
                </ul>
                


            </div>
        );
    }
}


