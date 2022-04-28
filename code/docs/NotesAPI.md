## Functions

<dl>
<dt><a href="#getAllNotes">getAllNotes()</a> ⇒ <code>Array.&lt;Note&gt;</code></dt>
<dd><p>Get all notes from localStorage.</p>
</dd>
<dt><a href="#saveNote">saveNote(noteToSave)</a></dt>
<dd><p>Save the notes, or edits the note, if they already exist.</p>
</dd>
<dt><a href="#deleteNote">deleteNote(noteToDel)</a></dt>
<dd><p>Delete notes from localStorage.</p>
</dd>
<dt><a href="#setNoteStatus">setNoteStatus(note, status)</a></dt>
<dd><p>Switching the status of notes according to <code>status</code>.</p>
</dd>
</dl>

<a name="getAllNotes"></a>

## getAllNotes() ⇒ <code>Array.&lt;Note&gt;</code>

Get all notes from localStorage.

**Returns**: <code>Array.&lt;Note&gt;</code> - Notes array sorted by edit time.  
<a name="saveNote"></a>

## saveNote(noteToSave)

Save the notes, or edits the note, if they already exist.

| Param      | Type              | Description                      |
| ---------- | ----------------- | -------------------------------- |
| noteToSave | <code>Note</code> | The notes to be saved or edited. |

<a name="deleteNote"></a>

## deleteNote(noteToDel)

Delete notes from localStorage.

| Param     | Type              | Description              |
| --------- | ----------------- | ------------------------ |
| noteToDel | <code>Note</code> | The notes to be deleted. |

<a name="setNoteStatus"></a>

## setNoteStatus(note, status)

Switching the status of notes according to `status`.

| Param  | Type                | Description                                   |
| ------ | ------------------- | --------------------------------------------- |
| note   | <code>Note</code>   | To change the status of the notes.            |
| status | <code>String</code> | Status to be changed. (completed or archived) |
