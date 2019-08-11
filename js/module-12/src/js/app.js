import View from './view';
import Notepad from './notepad-model';
import notes from '../assets/notes.json';
import {PRIORITY_TYPES} from './utils/constants';
import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const pushNotesToLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getNotesToLS = key => JSON.parse(localStorage.getItem(key));
const notepad = new Notepad(getNotesToLS('myNotes') ? getNotesToLS('myNotes') : notes);
const view = new View();
const shortid = require('shortid');
const addListItem = (listRef, note) => {
  listRef.insertAdjacentHTML('beforeend', note);
}
const notyf = new Notyf();

export const refs = {
    formNoteEditor: document.querySelector('form.note-editor'),
    formInput: document.querySelector('input.note-editor__input'),
    formTextArea: document.querySelector('textarea.note-editor__input'),
    searchInput: document.querySelector('form.search-form input'),
    openNoteEditorModal: document.querySelector('button[data-action="open-editor"]'),
  }

export const initNotes = getNotesToLS('myNotes') ? getNotesToLS('myNotes') : notes;

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
  newNote.priority = PRIORITY_TYPES.LOW;
  notepad.saveNote(newNote)
    .then(savedNote => {
      pushNotesToLS('myNotes', notepad.notes);
      addListItem(view.noteListLink, view.createListItemTemplate(savedNote));
    });

  // that the form not reset
  event.preventDefault();
  // that the form not reset -END

  refs.formNoteEditor.reset();
  MicroModal.close('note-editor-modal');
  notyf.success('Заметка успешно добавлена!');

  return newNote;  
}

export const removeListItem = ({target}) => {
  if(target.closest('button[data-action="delete-note"]')) {
    const idDeletedNote = target.closest('.note-list__item').dataset.id;
    notepad.deleteNote(idDeletedNote)
    .then(newNotes => {
      pushNotesToLS('myNotes', newNotes);
      target.closest('li').remove();
      notyf.success('Заметка успешно удалена!');
    });    
  } 
}

export const search = () => {
  [...view.noteListLink.children].forEach(item => item.remove());
  notepad.filterNotesByQuery(refs.searchInput.value)
    .then(notesArr => view.renderNoteList(view.noteListLink, notesArr));  
}

export const handleOpenEditor = () => {
  MicroModal.show('note-editor-modal')
}
// handlers -END