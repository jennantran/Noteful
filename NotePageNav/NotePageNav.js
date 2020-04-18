import React from 'react';
import {findNote, findFolder} from  '../NoteFunctions';

export default class NotePageNav extends React.Component {
    static defaultProps={
        history: {
            goBack: () => {}
        }
    }

    render() {
        return (
            <div className="NotePageNav">
                <button 
                    className="backButton"
                    onClick={() => this.props.history.goBack()}>Back
                </button>
                {this.props.folder &&(
                <h3 className="folderName">
                    {this.props.folder.name}
                </h3>
                )}
            </div>
         );
    }
}

