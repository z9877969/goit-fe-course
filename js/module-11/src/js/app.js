import View from './view';
import Notepad from './notepad-model';
import notes from '../assets/notes.json';
import {PRIORITY_TYPES} from './utils/constants';
import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notepad = new Notepad(notes);
const view = new View();
const shortid = require('shortid');
const addListItem = (listRef, note) => {
  listRef.insertAdjacentHTML('beforeend', note);
}
const notyf = new Notyf();

view.renderNoteList(view.noteListLink, notepad.notes);

export const refs = {
    formNoteEditor: document.querySelector('form.note-editor'),
    formInput: document.querySelector('input.note-editor__input'),
    formTextArea: document.querySelector('textarea.note-editor__input'),
    searchInput: document.querySelector('form.search-form input'),
    openNoteEditorModal: document.querySelector('button[data-action="open-editor"]'),
  }

// handlers
export const createNewNote = (event) => {
  if (refs.formInput.value === '' || refs.formTextArea.value === '') {
    event.preventDefault();
    return notyf.error('Необходимо заполнить все поля!');
  };
  
  const newNote = {};  
  newNote.id = shortid.generate();
  newNote.title = refs.formInput.value;
  newNote.body = refs.formTextArea.value;
  notepad.saveNote(newNote);
  newNote.priority = notepad.updateNotePriority(newNote.id, PRIORITY_TYPES.LOW);
  
  // that the form not reset
  event.preventDefault();
  // that the form not reset -END

  addListItem(view.noteListLink, view.createListItem(...notepad.notes.slice(-1)));
  refs.formNoteEditor.reset();
  MicroModal.close('note-editor-modal');
  notyf.success('Заметка успешно добавлена!');

  return newNote;  
}

export const removeListItem = ({target}) => {
  if(target.closest('button').dataset.action === 'delete-note') {
    notepad.deleteNote(target.closest('.note-list__item').dataset.id);
    target.closest('.note-list__item').remove();
    notyf.success('Заметка успешно удалена!');
  }
}

export const search = () => {
  [...view.noteListLink.children].forEach(item => item.remove());
  view.renderNoteList(view.noteListLink, notepad.filterNotesByQuery(refs.searchInput.value))
}

export const handleOpenEditor = () => {
  MicroModal.show('note-editor-modal')
}
// handlers -END