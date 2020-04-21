import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import DummyStore from '../dummyStore'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import { findNote , findFolder, getNotesForFolder } from '../NoteFunctions.js'
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
// import NoteContext from '.noteContext';

class App extends Component{
  state =  {
    notes: [],
    folders: []
  };

  componentDidMount() {
    const baseUrl = 'http://localhost:9090';
    const notesEndPoint = '/notes';
    const foldersEndPoint = '/folders';

    this.setState(DummyStore);
    console.log(this.state);

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


  renderNavRoutes() {
    const {notes, folders} = this.state;
    console.log(folders);
    console.log(this.state);
    return (
        <>
            {['/', '/folder/:folderId'].map(path => (
                <Route
                    exact
                    key={path}
                    path={path}
                    render={routeProps => (
                      <NoteListNav
                          folders={folders}
                          notes={notes}
                          {...routeProps}
                      />
                  )}
              />
           
            ))}
           <Route
                path="/note/:noteId"
                render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }} 

            />  
        </>
    );
}
 renderMainRoutes() {
  const {notes, folders} = this.state;
  return (
      <React.Fragment>
           {['/', '/folder/:folderId'].map(path => (
              <Route
                  exact 
                  key={path}
                  path={path}
                  render={routeProps => {
                      const {folderId} = routeProps.match.params;
                      console.log(notes);
                      console.log(folderId);
                      console.log(getNotesForFolder());
                      const notesForFolder = getNotesForFolder(
                           notes,
                           folderId
                       );
                      return (
                          <NoteListMain
                             {...routeProps}
                             notes={notesForFolder}
                          />
                     );
                  }}
              />
         ))}
           <Route
              path="/note/:noteId"
              render={routeProps => {
                  const {noteId} = routeProps.match.params;
                  const note = findNote(notes, noteId);
                return <NotePageMain {...routeProps} note={note} />;
             }}
          /> 
      </React.Fragment>
    );
  }


    render(){
      return (
          <div className="App">
            <nav className="navigation">{this.renderNavRoutes()}</nav>
            <header className="appHeader">
                <h1>Noteful</h1>
            </header>
            <main className="appMain">{this.renderMainRoutes()}</main> 
          </div>
      
      );
    }
  }

export default App;
