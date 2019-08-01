import './sass/main.scss';
import View from './js/view';
import {
    refs,
    createNewNote,
    removeListItem,
    search,
    handleOpenEditor
} from './js/app';

const view = new View();

// Listners
refs.formNoteEditor.addEventListener('submit', createNewNote);
view.noteListLink.addEventListener('click', removeListItem);
refs.searchInput.addEventListener('input', search);
refs.openNoteEditorModal.addEventListener('click', handleOpenEditor);
// Listners -END