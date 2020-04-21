import React from 'react';
import { NavLink } from 'react-router-dom'
import './NoteListNav.css'


export default function NoteListNav(props) {
    return (
        <div className="NoteListNav">
            <ul className="NoteList">
                {props.folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className="NavFoldersLink"
                                to={`/folder/${folder.id}`}
                                >
                                {folder.name}
                             </NavLink>
                        </li>
                )}
            </ul>
               


        </div>
    );
}

NoteListNav.defaultProps = {
    folders: []
  }