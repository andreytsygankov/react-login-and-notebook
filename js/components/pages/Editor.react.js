import React, { Component } from 'react';
import { connect } from 'react-redux';

class Note extends Component{
  render() {
    let style = { backgroundColor: this.props.color };
    return (
        <div className="note" style={style}>
          <span className="delete-note" onClick={this.props.onDelete}> × </span>
          {this.props.children}
        </div>
    );
  }
}

class NoteEditor extends Component{
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleNoteAdd() {
    let newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now()
    };

    this.props.onNoteAdd(newNote);
    this.setState({ text: '' });
  }

  noteColor(event){
    this.setState({
      color: event.target.value
    });
  }

  render() {
    return (
        <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange.bind(this)}
                />
          <input className="add-color" onChange={this.noteColor.bind(this)} type="color" />
          <button className="add-button" onClick={this.handleNoteAdd.bind(this)}>Add</button>
        </div>
    );
  }
}

class NoteSearch extends Component{
    render() {
        return (
            <input className="noteSearch" type="search" placeholder="Search..." onChange={this.props.onSearch}/>
        );
    }
}

class NotesGrid extends Component{
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  componentDidMount() {
    let grid = this.refs.grid;
    this.msnry = new Masonry( grid, {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10,
      isFitWidth: true
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }

  handleSearch(event) {
      this.setState({
            value: event.target.value
      })
  }

  render() {
    let searchQuery = this.state.value.toLowerCase();
    let onNoteDelete = this.props.onNoteDelete;

    this.props.notes.filter(function(note) {
      let searchValue = note.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });

    return (
        <div>
            <NoteSearch onSearch={this.handleSearch}/>
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function(note){
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        </div>

    );
  }
}

class NotesApp extends Component{
  constructor(props) {
    super(props);
    this.state = {notes: []};
  }

  componentDidMount() {
    let localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({ notes: localNotes });
    }
  }

  componentDidUpdate() {
    this._updateLocalStorage();
  }

  handleNoteDelete(note) {
    let noteId = note.id;
    let newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  }

  handleNoteAdd(newNote) {
    let newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes });
  }

  _updateLocalStorage() {
    let notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  }

  render() {
    return (
        <div className="notes-app">
          <NoteEditor onNoteAdd={this.handleNoteAdd.bind(this)} />
          <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete.bind(this)} />
        </div>
    );
  }

}


class Editor extends Component {
  render() {
    return (
        <section className="text-section">
          <h1>Editor Notes </h1>
          <NotesApp />
        </section>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

export default connect(select)(Editor);

// class Note extends Component {
//     render(){
//         let style = {backgroundColor: this.props.color};
//         return (
//             <div className="note" style={style}>
//                 <span className="delete-note" onClick={this.props.onDelete}>×</span>
//                 {this.props.children}
//             </div>
//         );
//     }
// }
// class NoteSearch extends Component{
//     render() {
//         return (
//             <input className="noteSearch" type="search" placeholder="Search..." onChange={this.props.onSearch}/>
//         );
//     }
// }
//
// class NoteColors extends Component{
//     render() {
//         let colors = ["grey", "green", "tomato", "yellow", "red", "brown"];
//         return (
//             <div className="colors-list">
//                 {
//                     colors.map((el, i) => {
//                         return (
//                             <div key={i} style={{backgroundColor: el}}>
//                                 <input
//                                     className="radio-custom"
//                                     id={el}
//                                     type="radio"
//                                     name="color"
//                                     onChange={(e)=>this.props.onColorChanged(e, el)}
//                                 />
//                                 <label className="radio-custom-label" htmlFor={el}/>
//                             </div>
//                         );
//                     })
//                 }
//             </div>
//         );
//     }
// }
//
// class NoteEditor extends Component{
//     constructor(props) {
//         super(props);
//
//         this._hadleColorChange = this.hadleColorChange.bind(this);
//
//         return {
//             text: '',
//             color: '',
//             checked: false
//         }
//     }
//
//     hadleTextChange(e) {
//         this.setState({
//             text: e.target.value
//         })
//     }
//
//     hadleColorChange(e, color) {
//         this.input = e.target;
//         this.setState({
//             color: color,
//             checked: e.target.checked
//         })
//     }
//
//     handleNoteAdd() {
//         if(this.state.text.length) {
//             let newNote = {
//                 about: this.state.text,
//                 color: this.state.color,
//                 id: new Date()
//             };
//             this.props.onNoteAdd(newNote);
//             this.setState({
//                 text: '',
//                 color: '',
//                 checked: false
//             });
//             if(this.state.checked) this.input.checked = false;
//         }
//     }
//
//     render() {
//         return (
//             <div className="note-editor">
//                 <textarea
//                     className="textarea"
//                     placeholder="Enter your note here..."
//                     rows={5}
//                     value={this.state.text}
//                     onChange={this.hadleTextChange}>
//                 </textarea>
//                 <div className="controls">
//                     <NoteColors onColorChanged={this._hadleColorChange}/>
//                     <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
//                 </div>
//             </div>
//         );
//     }
// }
//
// class NoteGrid extends Component{
//     constructor(props) {
//         super(props);
//         return {
//             value: ''
//         }
//     }
//     componentDidMount() {
//         this.msnry = new Masonry( this.grid, {
//             itemSelector: '.note',
//             columnWidth: 200,
//             gutter: 10
//         });
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if(this.props.notes.length != prevProps.notes.length || this.state.value.length != prevState.value.length) {
//             this.msnry.reloadItems();
//             this.msnry.layout();
//         }
//     }
//     handleSearch(e) {
//         this.setState({
//             value: e.target.value
//         });
//     }
//     render() {
//         let searchQuery = this.state.value.toLowerCase();
//         let displayedNotes = !this.state.value ? this.props.notes : this.props.notes.filter(function(item) {
//             let searchValue = item.about.toLowerCase();
//             return searchValue.indexOf(searchQuery) !== -1;
//         });
//         console.log(displayedNotes);
//         return (
//             <div>
//                 <NoteSearch onSearch={this.handleSearch}/>
//                 <div ref={(div) => this.grid = div} className="notes-grid">
//                     {
//                         displayedNotes.map((note) => {
//                             return (
//                                 <Note
//                                     key={note.id}
//                                     color={note.color}
//                                     onDelete={this.props.onNoteDelete.bind(null, note)}
//                                 >{note.about}</Note>
//                             );
//                         })
//                     }
//                 </div>
//             </div>
//         );
//     }
// }
//
// class NoteApp extends Component{
//     constructor(props) {
//         super(props);
//         return {
//             // notes: this.props.notes
//             notes: []
//         }
//     }
//     componentDidMount() {
//         let localNotes = JSON.parse(localStorage.getItem('notes'));
//         if(localNotes) {
//             this.setState({
//                 notes: localNotes
//             })
//         }
//     }
//     componentDidUpdate() {
//         this.updateLocalStorage();
//     }
//     handleDeleteNote(note) {
//         let noteId = note.id;
//         let newNotes = this.state.notes.filter(function (note) {
//             return note.id != noteId;
//         });
//         this.setState({
//             notes: newNotes
//         })
//     }
//     handleNoteAdd(newNote) {
//         this.setState({
//             notes: [newNote, ...this.state.notes]
//         })
//     }
//     render() {
//         return (
//             <div className="notes-app">
//                 <h2 className="app-header">Notes App</h2>
//                 <NoteEditor onNoteAdd={this.handleNoteAdd}/>
//                 <NoteGrid notes={this.state.notes} onNoteDelete={this.handleDeleteNote}/>
//             </div>
//         );
//     }
//     updateLocalStorage() {
//         let notes = JSON.stringify(this.state.notes);
//         localStorage.setItem('notes', notes);
//     }
// }
//
// class Editor extends Component {
//   render() {
//     return (
//         <section className="text-section">
//           <h1>Editor Notes </h1>
//           <NoteApp />
//         </section>
//     );
//   }
// }
//
// function select(state) {
//   return {
//     data: state
//   };
// }
//
// export default connect(select)(Editor);
