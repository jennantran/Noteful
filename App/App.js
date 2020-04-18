import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import DummyStore from '../dummyStore'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'

class App extends Component{
  state =  {
    notes: [],
    folders: []
  };

  componentDidMount() {
     this.setState(DummyStore);
     console.log(this.state);
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
          {/* <Route
                path="/note/:noteId"
                render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }} 

            />  */}
        </>
    );
}
// renderMainRoutes() {
//   const {notes, folders} = this.state;
//   return (
//       <>
//           {['/', '/folder/:folderId'].map(path => (
//               <Route
//                   exact
//                   key={path}
//                   path={path}
//                   render={routeProps => {
//                       const {folderId} = routeProps.match.params;
//                       const notesForFolder = getNotesForFolder(
//                           notes,
//                           folderId
//                       );
//                       return (
//                           <NoteListMain
//                               {...routeProps}
//                               notes={notesForFolder}
//                           />
//                       );
//                   }}
//               />
//           ))}
//           <Route
//               path="/note/:noteId"
//               render={routeProps => {
//                   const {noteId} = routeProps.match.params;
//                   const note = findNote(notes, noteId);
//                   return <NotePageMain {...routeProps} note={note} />;
//               }}
//           />
//       </>
//   );
// }
  render(){
    return (
      
        <div className="App">
          <nav className="navigation">{this.renderNavRoutes()}</nav>
          <header className="appHeader">
              <h1>Noteful</h1>
          </header>
          {/* <main className="appMain">{this.renderMainRoutes()}</main> */}
        </div>
     
    );
  }
  }

export default App;
