import React, {Component} from 'react';
import NoteContext from './noteContext'


export default class AddNote extends Component {
    static contextType = NoteContext;

    constructor(props){
        super(props);
        this.state = {
            name: {
                value: "",
                content:"",
                // folder_id
            }
        }
    }
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

    updateFolder = (event) => {
        console.log("update folder");
        this.setState({
            folder_id: event.target.value
        })
    }

     handleSubmit(event){
         console.log("handlesubmit");
         event.preventDefault();
 
         const newNote = {
            name: this.state.name.value,
            content: this.state.name.content,
            // folder_id,
       };

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
        });
     }

    render(){
        // const {name, content, folder_id} = this.state;

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
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <label>Content</label>
                    <input
                        type="text"   
                        name="content"   
                        id="content"
                        onChange={e => this.updateContent(e.target.value)}
                    /> 
                    <label>
                        Folder: 
                    </label>
                    <select 
                        className="folderId"
                        onChange={e => this.updateFolder(e.target.value)}>
                        {options}
                    </select>
                    <input type="submit"
            
                    ></input>
                </form>
        );
    }
}