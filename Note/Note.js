import React from 'react';
import { Link } from 'react-router-dom'



export default class Note extends React.Component {
    render(){
        return(
            <div className="note">
                <h2 className="noteTitle">
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h2>
                {/* <button
                    className="noteDelete"
                    type="button"
                    onClick={this.handleClickDelete}
                >
                    Delete
                </button> */}
            </div>
            
        );
    }
}