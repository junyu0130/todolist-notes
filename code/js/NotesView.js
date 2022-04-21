export default class NotesView {
  constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit } = {}) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;

    // show sidebar part
    this.root.innerHTML = `
    <div class="notes_sidebar">
      <button class="notes_add" type="button">新增筆記</button>
      <div class="notes_list"></div>
    </div>
    <div class="notes_preview">
      <input type="text" class="notes_title" placeholder="Enter the title" />
      <textarea class="notes_body" placeholder="Enter the note"></textarea>
    </div>
    `;

    const btnAddNote = this.root.querySelector(".notes_add");
    const inpTitle = this.root.querySelector(".notes_title");
    const inpBody = this.root.querySelector(".notes_body");

    // if user click button -> add notes
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    [(inpTitle, inpBody)].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTile = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        // odd, edit
        this.onNoteEdit(updatedTile, updatedBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  _createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 60;

    return `
    <div class="notes_list-item" data-note-id=${id}>
      <div class="notes_small-title">${title}</div>
      <div class="notes_small-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div class="notes_small-updated">
        ${updated.toLocaleString(undefined, {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </div>
    </div>
    `;
  }

  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes_list");

    // Empty list
    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        new Date(note.updated)
      );

      notesListContainer.insertAdjacentHTML("beforeend", html);
    }

    // Add select events for each list item
    notesListContainer
      .querySelectorAll(".notes_list-item")
      .forEach((noteListItem) => {
        noteListItem.addEventListener("click", () => {
          this.onNoteSelect(noteListItem.dataset.noteId);
        });
      });
  }

  // user mouse click -> picked notes will be gray
  updateActiveNote(note) {
    this.root.querySelector(".notes_title").value = note.title;
    this.root.querySelector(".notes_body").value = note.body;

    this.root.querySelectorAll(".notes_list-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notes_list-item--selected");
    });

    this.root
      .querySelector(`.notes_list-item[data-note-id="${note.id}"]`)
      .classList.add("notes_list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes_preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
