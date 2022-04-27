import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App {
  /**
   * The app for the web.
   * @param {HTMLElement} root The root from html.
   */
  constructor(root) {
    // keep the notes' data
    this.notes = [];
    this.activeNote = null;
    this.view = new NotesView(root, this._handlers());

    this._refreshNotes();
  }

  /**
   * Refresh the notes view.
   */
  _refreshNotes() {
    // get all data in localStorage
    const notes = NotesAPI.getAllNotes();

    // update notes list, update note preview
    this._setNote(notes);

    if (notes.length > 0) {
      this._setActiveNote(notes[0]);
    }
  }

  /**
   * Update notes list and preview.
   * @param {Array<Note>} notes All notes.
   */
  _setNote(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes);
    this.view.updateNotePreviewVisibility(notes.length > 0);
  }

  /**
   * Set note preview.
   * @param {Note} note User clicked notes.
   */
  _setActiveNote(note) {
    this.activeNote = note;
    // call NoteView
    this.view.updateActiveNote(note);
  }

  /**
   * Return the app event handlers.
   */
  _handlers() {
    return {
      /**
       * User pick which notes.
       * @param {Number} noteID
       */
      onNoteSelect: (noteID) => {
        const selectNote = this.notes.find((note) => note.id == noteID);
        this._setActiveNote(selectNote);
      },
      /**
       * User add one new notes.
       */
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
      /**
       * User edit existing notes.
       * @param {String} title Title of the note.
       * @param {String} body Contents of the note.
       */
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
      /**
       * User change the notes status.
       * @param {String} status The notes for which status(completed, archived).
       */
      onNoteStatus: (status) => {
        NotesAPI.setNoteStatus(this.activeNote, status);
        this._refreshNotes();
      },
      /**
       * User delete the selected notes.
       */
      onNoteDelete: () => {
        NotesAPI.deleteNote(this.activeNote);
        this._refreshNotes();
      },
    };
  }
}
