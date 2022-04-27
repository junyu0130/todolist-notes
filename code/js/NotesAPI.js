/**
 * Used to control the static class of notes.
 */
export default class NotesAPI {
  /**
   * Get all notes from localStorage.
   * @returns Notes array sorted by edit time
   */
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesApp-notes") || "[]");

    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  /**
   * Save the notes,
   * or edits the note, if they already exist.
   * @param {Note} noteToSave
   */
  static saveNote(noteToSave) {
    // 現在 localStorage 的資料
    const notes = NotesAPI.getAllNotes();

    // 再把新的 noteToSave 加入存起來
    const existing = notes.find((note) => note.id == noteToSave.id);

    // Add a new Note / Edit a existing note
    if (existing) {
      // update
      existing.title = noteToSave.title;
      existing.body = noteToSave.body;
      existing.isCompleted = noteToSave.isCompleted;
      existing.isArchived = noteToSave.isArchived;
      existing.updated = new Date().toISOString();
    } else {
      // add a new one
      noteToSave.id = Math.floor(Math.random() * 10000);
      noteToSave.updated = new Date().toISOString();
      // 加入新增的資料
      notes.push(noteToSave);
    }

    // save new data + existing data
    localStorage.setItem("notesApp-notes", JSON.stringify(notes));
  }

  /**
   * Permanently delete notes from localStorage.
   * @param {Note} noteToDel
   */
  static deleteNote(noteToDel) {
    if (confirm("確定要刪除這個項目嗎?\n將會從本機儲存空間永久刪除。")) {
      const notes = NotesAPI.getAllNotes();
      const delIndex = notes.findIndex((item) => item.id == noteToDel.id);

      notes.splice(delIndex, 1);

      localStorage.setItem("notesApp-notes", JSON.stringify(notes));
    }
  }

  /**
   * Switching the status of notes according to `status`.
   * @param {Note} note
   * @param {String} status
   */
  static setNoteStatus(note, status) {
    switch (status) {
      case "completed":
        note.isCompleted = !note.isCompleted;
        break;

      case "archived":
        note.isArchived = !note.isArchived;
        break;

      default:
        break;
    }
    NotesAPI.saveNote(note);
  }
}
