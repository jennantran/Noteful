import React, {Component} from 'react';
import NoteContext from './noteContext'

export default class AddNote extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: "",
                content:""
            }
        }
    }

    static contextType = NoteContext;

    updateName(name){
        console.log({name});
        this.setState({
            name: {value: name}
        })

    }


    updateContent(content){
        console.log({content});
        this.setState({
            content: {value: content}
        })

    }
    
    render(){
        return(  
                <form className="AddNoteForm"
                    onSubmit= {e => this.handleSubmit(e)} >
                    <label>Name</label>
                    <input
                        type="text"   
                        id="name"
                        placeholder="name"
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <label>Content</label>
                    <input
                        type="text"   
                        name="content"   
                        id="content"
                        onChange={e => this.updateContent(e.target.value)}
                    /> 
                
                    <input type="submit"

                    ></input>
                </form>
        );
    }
}