import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  constructor(root) {
    // keep the notes' data
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  _refreshNotes() {
    // get all data in localStorage
    const notes = NotesAPI.getAllNotes();

    // update notes list, update note preview
    this._setNote(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  _setNote(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  _setActiveNote(note) {
    this.activeNote = note;
    // call NoteView
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      // user pick which note
      onNoteSelect: (noteID) => {
        const selectNote = this.notes.find((note) => note.id == noteID);
        this._setActiveNote(selectNote);
      },
      // user add one new note
      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take a new note...",
          isCompleted: false,
          isArchived: false,
        };

        NotesAPI.saveNote(newNote);

        // refresh view
        this._refreshNotes();
      },
      // user edit existing note
      onNoteEdit: (title, body) => {
        NotesAPI.saveNote({
          id: this.activeNote.id,
          isCompleted: this.activeNote.isCompleted,
          isArchived: this.activeNote.isArchived,
          title,
          body,
        });
        this._refreshNotes();
      },
      // user completed, archived
      onNoteStatus: (status) => {
        NotesAPI.setNoteStatus(this.activeNote, status);
        this._refreshNotes();
      },
      // user delete
      onNoteDelete: () => {
        NotesAPI.deleteNote(this.activeNote);
        this._refreshNotes();
      },
    };
  }
}
