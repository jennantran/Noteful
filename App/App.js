import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain';
import noteContext from '../noteContext';


class App extends Component{
  state =  {
    notes: [],
    folders: []
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
      })
      .catch(error => {
        console.error({error})
      });
  }
  deleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !==noteId)
    });
  }

  renderNavRoutes() {
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    component={NoteListNav}
                      />
              ))}
               <Route 
                    path="/note/:noteId" 
                    component={NotePageNav} 
                    />
        </>
    );
}
 renderMainRoutes() {
  return (
      <React.Fragment>
           {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact 
                  key={path}
                  path={path}
                  component={NoteListMain}
               />       
         ))}
           <Route
              path="/note/:noteId"
          /> 
      </React.Fragment>
    );
  }


    render(){
      const value ={
        notes: this.state.notes,
        folders: this.state.folders,
        deleteNote: this.handleDeleteNote
      }
      
      return (
        <noteContext.Provider value={value}>
            <div className="App">
              <nav className="navigation">{this.renderNavRoutes()}</nav>
              <header className="appHeader">
                  <h1>Noteful</h1>
              </header>
              <main className="appMain">{this.renderMainRoutes()}</main> 
            </div>
          </noteContext.Provider>
      
      );
    }
  }

export default App;
