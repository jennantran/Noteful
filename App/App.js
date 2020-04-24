import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain';
import noteContext from '../noteContext';
import AddFolder from '../AddFolder/AddFolder';

class App extends Component{
  state =  {
    notes: [],
    folders: [],
    addFolder: this.addFolder
  };

  componentDidMount() {
    const baseUrl = 'http://localhost:9090';
    const notesEndPoint = '/notes';
    const foldersEndPoint = '/folders';

    console.log(baseUrl + notesEndPoint);
    console.log(baseUrl + foldersEndPoint);

    Promise.all([
        fetch(baseUrl + notesEndPoint),
        fetch(baseUrl + foldersEndPoint)
    ])
      .then(([notesResolve, foldersResolve]) => {
        if(!notesResolve.ok){
          return notesResolve.json().then(e => Promise.reject(e));
        }
        if(!foldersResolve.ok){
          return foldersResolve.json().then(e=> Promise.reject(e));
        }
        return Promise.all([notesResolve.json(),foldersResolve.json()]);
      })
      .then(([notes,folders]) => {
        this.setState({notes,folders});
        console.log(this.state);
      })
      .catch(error => {
        console.error({error})
      });
  }
  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !==noteId)
    });
  }

  addFolder = name => {
    this.setState({
      folders: [...this.state.folders,name]
    })
  }

    render(){
      const value ={
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote,
        addFolder: this.addFolder
      }
      
      return (
        <noteContext.Provider value={value}>
            <div className="App">
              <nav className="navigation">
                <Route exact path="/" component={NoteListNav}/>
                <Route path="/folder/:folder_id" component={NoteListNav}/>
                <Route path="/notes/:note_id" component={NotePageNav}/>
                <Route path="/AddFolder" component={AddFolder}/>
              </nav>
              <header className="appHeader">
                  <h1>Noteful</h1>
              </header>
              <main className="appMain">
                <Route exact path="/" component={NoteListMain}/>
                </main> 
            </div>
          </noteContext.Provider>
      
      );
    }
  }

export default App;
