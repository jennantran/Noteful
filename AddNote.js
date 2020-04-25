import React, {Component} from 'react';
import NoteContext from './noteContext'
import './AddNote.css'

export default class AddNote extends Component {
    static contextType = NoteContext;

    constructor(props){
        super(props);
        this.state = {
            name: "",
            content:"",
            folderId: ""
        };      
    }
    updateName(name){
        console.log({name});
        this.setState({
            name
        });
    }

    updateContent(content){
        console.log({content});
        this.setState({
            content
        });
    }

    updateFolder = (folderId) => {
        console.log(folderId);
        this.setState({
            folderId
        });
    }

     handleSubmit(event){
         console.log("handlesubmit");
         event.preventDefault();
 
         const newNote = {
            name: this.state.name,
            content: this.state.content,
            folderId: this.state.folderId
       };
        console.log(newNote);
        const baseUrl = 'http://localhost:9090';
        const NoteEndPoint = '/notes';

        fetch(baseUrl + NoteEndPoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        })
        .then((res) => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then((data) => {
            this.props.history.push("/");
        })
        .catch(error => {
            console.error(error);
        });   
     }

    render(){
        // const {name, content, folder_id} = this.context;
        console.log(this.context);
        const options = this.context.folders.map((folder) => {
            return(
                <option key={folder.id} value={folder.id}>
                    {folder.name}
                </option>
            )
        })
        return(  
                <form className="AddNoteForm"
                    onSubmit= {e => this.handleSubmit(e)} >
                    <label>Name</label>
                    <input
                        type="text"   
                        id="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <label>Content</label>
                    <input
                        type="text"   
                        name="content"   
                        id="content"
                        value={this.state.content}
                        onChange={e => this.updateContent(e.target.value)}
                    /> 
                    <label>
                        Folder: 
                    </label>
                    <select 
                        className="folderId"
                        value={this.state.folderId}
                        onChange={e => this.updateFolder(e.target.value)}>
                        {options}
                    </select>
                    <input type="submit"
                        className="submit"
                    ></input>
                </form>
        );
    }
}