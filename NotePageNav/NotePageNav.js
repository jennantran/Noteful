import React from 'react';


export default function NotePageNav(props) {
    return (
        <div className="NotePageNav">
            <button
                onClick={() => props.history.goBack()}>
            </button>
            <h3 className="folderName">
                {props.folder.name}
            </h3>

        </div>
    );
}

NotePageNav.defaultProps={
    history: {
        goBack: () => {}
    }
}