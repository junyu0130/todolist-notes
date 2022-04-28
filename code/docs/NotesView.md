## Functions

<dl>
<dt><a href="#_createListItemHTML">_createListItemHTML(id, title, body, isCompleted, isArchived, updated)</a> ⇒ <code>String</code></dt>
<dd><p>Create list item for sidebar.</p>
</dd>
<dt><a href="#updateNoteList">updateNoteList(notes)</a></dt>
<dd><p>Update the notes app&#39;s sidebar and add a event listener to each note.</p>
</dd>
<dt><a href="#updateActiveNote">updateActiveNote(note)</a></dt>
<dd><p>Set preview and set notes to be selected in the sidebar.</p>
</dd>
<dt><a href="#updateNotePreviewVisibility">updateNotePreviewVisibility(visible)</a></dt>
<dd><p>Set the preview is visible or not.</p>
</dd>
</dl>

<a name="_createListItemHTML"></a>

## \_createListItemHTML(id, title, body, isCompleted, isArchived, updated) ⇒ <code>String</code>

Create list item for sidebar.

**Returns**: <code>String</code> - The list items in the notes sidebar of html.

| Param       | Type                 | Description                    |
| ----------- | -------------------- | ------------------------------ |
| id          | <code>Number</code>  | Note's id.                     |
| title       | <code>String</code>  | Title of the note.             |
| body        | <code>String</code>  | Contents of the note.          |
| isCompleted | <code>Boolean</code> | The Notes is completed or not. |
| isArchived  | <code>Boolean</code> | The Notes is archived or not.  |
| updated     | <code>Date</code>    | Notes update time.             |

<a name="updateNoteList"></a>

## updateNoteList(notes)

Update the notes app's sidebar and add a event listener to each note.

| Param | Type                            | Description |
| ----- | ------------------------------- | ----------- |
| notes | <code>Array.&lt;Note&gt;</code> | All notes.  |

<a name="updateActiveNote"></a>

## updateActiveNote(note)

Set preview and set notes to be selected in the sidebar.

| Param | Type              | Description         |
| ----- | ----------------- | ------------------- |
| note  | <code>Note</code> | User clicked notes. |

<a name="updateNotePreviewVisibility"></a>

## updateNotePreviewVisibility(visible)

Set the preview is visible or not.

| Param   | Type                 | Description                          |
| ------- | -------------------- | ------------------------------------ |
| visible | <code>Boolean</code> | The notes preview is visible or not. |
