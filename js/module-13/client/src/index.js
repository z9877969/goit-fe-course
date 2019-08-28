import './sass/main.scss';
import Notepad from './js/notepad-model';
import View from './js/view';
import {
    refs,
    createNewNote,
    removeListItem,
    search,
    handleOpenEditor,
    initNotes
} from './js/app';
import {requestGet} from './js/services/api';

// requestGet().then(notes => console.log(notes));



const notepad = new Notepad(initNotes);
const view = new View();

view.renderNoteList(view.noteListLink, notepad.notes);

// Listners
refs.formNoteEditor.addEventListener('submit', createNewNote);
view.noteListLink.addEventListener('click', removeListItem);
refs.searchInput.addEventListener('input', search);
refs.openNoteEditorModal.addEventListener('click', handleOpenEditor);
// Listners -END