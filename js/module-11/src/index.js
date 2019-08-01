import './sass/main.scss';
import Notepad from './js/notepad-model';
import notes from './assets/notes.json';
import View from './js/view';
import {
    refs,
    createNewNote,
    removeListItem,
    search,
    handleOpenEditor
} from './js/app';

const notepad = new Notepad(notes);
const view = new View();

view.renderNoteList(view.noteListLink, notepad.notes);

// Listners
refs.formNoteEditor.addEventListener('submit', createNewNote);
view.noteListLink.addEventListener('click', removeListItem);
refs.searchInput.addEventListener('input', search);
refs.openNoteEditorModal.addEventListener('click', handleOpenEditor);
// Listners -END