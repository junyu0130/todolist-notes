export default class NotesView {
  /**
   * The view of the notebook app.
   * @param {HTMLElement} root The root form html.
   * @param {*} handler
   */
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteStatus, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteStatus = onNoteStatus;
    this.onNoteDelete = onNoteDelete;

    // show sidebar part
    this.root.innerHTML = `
    <div class="notes_sidebar">
      <button class="notes_add" type="button">新增筆記</button>
      <div class="notes_list"></div>
    </div>
    <div class="notes_preview">
      <input type="text" class="notes_title" placeholder="Enter the title" />
      <span class="notes_status-bar">
        <a href="#" note_completed><i class="bi bi-check-square"></i></a>
        <a href="#" note_archived><i class="bi bi-inbox"></i></a>
        <a href="#" note_deleted><i class="bi bi-trash"></i></a>
      </span>
      <textarea class="notes_body" placeholder="Enter the note"></textarea>
    </div>
    `;

    const btnAddNote = this.root.querySelector(".notes_add");
    const inpTitle = this.root.querySelector(".notes_title");
    const inpBody = this.root.querySelector(".notes_body");
    const btnNoteCompleted = this.root.querySelector("[note_completed]");
    const btnNoteArchived = this.root.querySelector("[note_archived]");
    const btnNoteDeleted = this.root.querySelector("[note_deleted]");

    // if user click button -> add notes
    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd();
    });

    btnNoteCompleted.addEventListener("click", () => {
      this.onNoteStatus("completed");
    });

    btnNoteArchived.addEventListener("click", () => {
      this.onNoteStatus("archived");
    });

    btnNoteDeleted.addEventListener("click", () => {
      this.onNoteDelete();
    });

    [inpTitle, inpBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const updatedTile = inpTitle.value.trim();
        const updatedBody = inpBody.value.trim();

        // odd, edit
        this.onNoteEdit(updatedTile, updatedBody);
      });
    });

    this.updateNotePreviewVisibility(false);
  }

  /**
   * Create list item for sidebar.
   * @param {Number} id Note's id.
   * @param {String} title Title of the note.
   * @param {String} body Contents of the note.
   * @param {Boolean} isCompleted
   * @param {Boolean} isArchived
   * @param {Date} updated Notes update time.
   * @returns Notes sidebar with html for list items.
   */
  _createListItemHTML(id, title, body, isCompleted, isArchived, updated) {
    const MAX_BODY_LENGTH = 60;

    const completed = isCompleted ? "notes_list-item--completed" : "";
    const archived = isArchived ? "notes_list-item--archived" : "";

    return `
    <div class="notes_list-item ${completed} ${archived}" data-note-id=${id}>
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

  /**
   * Update the notes app's sidebar and add a event listener to each note.
   * @param {Array<Note>} notes All notes.
   */
  updateNoteList(notes) {
    const notesListContainer = this.root.querySelector(".notes_list");

    // Empty list
    notesListContainer.innerHTML = "";

    for (const note of notes) {
      const html = this._createListItemHTML(
        note.id,
        note.title,
        note.body,
        note.isCompleted,
        note.isArchived,
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

  /**
   * Set preview and set notes to be selected in the sidebar.
   * @param {Note} note User clicked notes.
   */
  updateActiveNote(note) {
    this.root.querySelector(".notes_title").value = note.title;
    this.root.querySelector(".notes_body").value = note.body;

    this.root.querySelectorAll(".notes_list-item").forEach((noteListItem) => {
      noteListItem.classList.remove("notes_list-item--selected");
    });

    this.root
      .querySelector(`.notes_list-item[data-note-id="${note.id}"]`)
      .classList.add("notes_list-item--selected");

    if (note.isCompleted) {
      this.root
        .querySelector("[note_completed] .bi")
        .classList.remove("bi-check-square");
      this.root
        .querySelector("[note_completed] .bi")
        .classList.add("bi-check-square-fill");
    } else {
      this.root
        .querySelector("[note_completed] .bi")
        .classList.remove("bi-check-square-fill");
      this.root
        .querySelector("[note_completed] .bi")
        .classList.add("bi-check-square");
    }

    if (note.isArchived) {
      this.root
        .querySelector("[note_archived] .bi")
        .classList.remove("bi-inbox");
      this.root
        .querySelector("[note_archived] .bi")
        .classList.add("bi-inbox-fill");
    } else {
      this.root
        .querySelector("[note_archived] .bi")
        .classList.remove("bi-inbox-fill");
      this.root.querySelector("[note_archived] .bi").classList.add("bi-inbox");
    }
  }

  /**
   * Set whether the preview is visible or not.
   * @param {Boolean} visible
   */
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes_preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
