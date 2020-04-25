import React, {Component} from 'react'
import NoteContext from '../noteContext'
import './AddFolder.css'


export default class AddFolder extends Component {

    static contextType = NoteContext;
    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
    }

    updateName(name){
        console.log({name});
        this.setState({
            name: name
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const newFolder = {
            name: this.state.name
        };
        const baseUrl = 'http://localhost:9090';
        const foldersEndPoint = '/folders';
        fetch(baseUrl + foldersEndPoint, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newFolder)
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(data => {
            this.context.addFolder(data);
            this.props.history.push("/");
        })
        .catch(error => {
            console.error(error);
        });   
    } 

    render(){
        return(  
                <form className="AddFolderForm"
                    onSubmit= {e => this.handleSubmit(e)} >
                    <label>Name</label>
                    <input
                        type="text"   
                        name="name"   
                        id="name"
                        placeholder="name"
                        onChange={e => this.updateName(e.target.value)}
                    />
                    <input type="submit"

                    ></input>
                </form>
        );
    }
}