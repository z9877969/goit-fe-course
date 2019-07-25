import View from './view';

import Notepad from './notepad-model';

import notes from '../assets/notes.json';

import {PRIORITY_TYPES} from './utils/constants';


const notepad = new Notepad(notes);

const view = new View();

view.renderNoteList(view.noteListLink, notepad.notes);

export const refs = {
    formNoteEditor: document.querySelector('form.note-editor'),
    formInput: document.querySelector('input.note-editor__input'),
    formTextArea: document.querySelector('textarea.note-editor__input'),
    searchInput: document.querySelector('form.search-form input'),
  }

const shortid = require('shortid');


// handlers
export const createNewNote = (event) => {
  if (refs.formInput.value === '' || refs.formTextArea.value === '') {
    event.preventDefault();
    return alert('Необходимо заполнить все поля!')
  };
  
  const newNote = {};  
  newNote.id = shortid.generate();
  newNote.title = refs.formInput.value;
  newNote.body = refs.formTextArea.value;
  notepad.saveNote(newNote);
  newNote.priority = notepad.updateNotePriority(newNote.id, PRIORITY_TYPES.LOW);
  
  event.preventDefault();
  addListItem(view.noteListLink, view.createListItem(...notepad.notes.slice(-1)));
  refs.formNoteEditor.reset();

  return newNote;  
}

const addListItem = (listRef, note) => {
  listRef.append(note);
}

export const removeListItem = ({target}) => {
  if(target.closest('button').dataset.action === 'delete-note') {
    notepad.deleteNote(target.closest('.note-list__item').dataset.id);
    target.closest('.note-list__item').remove();
  }
}

export const search = () => {
  [...view.noteListLink.children].forEach(item => item.remove());
  view.renderNoteList(view.noteListLink, notepad.filterNotesByQuery(refs.searchInput.value))
}

