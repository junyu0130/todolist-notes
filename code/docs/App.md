## Functions

<dl>
<dt><a href="#_refreshNotes">_refreshNotes()</a></dt>
<dd><p>Refresh the notes view.</p>
</dd>
<dt><a href="#_setNote">_setNote(notes)</a></dt>
<dd><p>Update notes list and preview.</p>
</dd>
<dt><a href="#_setActiveNote">_setActiveNote(note)</a></dt>
<dd><p>Set note preview.</p>
</dd>
<dt><a href="#_handlers">_handlers()</a></dt>
<dd><p>Return the application event handlers.</p>
</dd>
<dt><a href="#onNoteSelect">onNoteSelect(noteID)</a></dt>
<dd><p>User pick which notes.</p>
</dd>
<dt><a href="#onNoteAdd">onNoteAdd()</a></dt>
<dd><p>User add one new notes.</p>
</dd>
<dt><a href="#onNoteEdit">onNoteEdit(title, body)</a></dt>
<dd><p>User edit existing notes.</p>
</dd>
<dt><a href="#onNoteStatus">onNoteStatus(status)</a></dt>
<dd><p>User change the notes status.</p>
</dd>
<dt><a href="#onNoteDelete">onNoteDelete()</a></dt>
<dd><p>User delete the selected notes.</p>
</dd>
</dl>

<a name="_refreshNotes"></a>

## \_refreshNotes()

Refresh the notes view.

<a name="_setNote"></a>

## \_setNote(notes)

Update notes list and preview.

| Param | Type                            | Description |
| ----- | ------------------------------- | ----------- |
| notes | <code>Array.&lt;Note&gt;</code> | All notes.  |

<a name="_setActiveNote"></a>

## \_setActiveNote(note)

Set note preview.

| Param | Type              | Description         |
| ----- | ----------------- | ------------------- |
| note  | <code>Note</code> | User clicked notes. |

<a name="_handlers"></a>

## \_handlers()

Return the application event handlers.

<a name="onNoteSelect"></a>

## onNoteSelect(noteID)

User pick which notes.

| Param  | Type                | Description                |
| ------ | ------------------- | -------------------------- |
| noteID | <code>Number</code> | The ID number of the note. |

<a name="onNoteAdd"></a>

## onNoteAdd()

User add one new notes.

<a name="onNoteEdit"></a>

## onNoteEdit(title, body)

User edit existing notes.

| Param | Type                | Description           |
| ----- | ------------------- | --------------------- |
| title | <code>String</code> | Title of the note.    |
| body  | <code>String</code> | Contents of the note. |

<a name="onNoteStatus"></a>

## onNoteStatus(status)

User change the notes status.

| Param  | Type                | Description                                      |
| ------ | ------------------- | ------------------------------------------------ |
| status | <code>String</code> | The notes for which status(completed, archived). |

<a name="onNoteDelete"></a>

## onNoteDelete()

User delete the selected notes.
