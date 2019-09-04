import View from './view';
import Notepad from './notepad-model';
import {PRIORITY_TYPES} from './utils/constants';
import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notepad = new Notepad();
const view = new View();
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

// handlers
export const createNewNote = (event) => {
  if (refs.formInput.value === '' || refs.formTextArea.value === '') {
    event.preventDefault();
    return notyf.error('Необходимо заполнить все поля!');
  };

  // that the form not reset
  event.preventDefault();
  // that the form not reset -END  
  
  const newNote = {}; 
  newNote.title = refs.formInput.value;
  newNote.body = refs.formTextArea.value;
  newNote.priority = PRIORITY_TYPES.LOW;
  
  return notepad.saveNote(newNote)
    .then(savedNote => {
      addListItem(view.noteListLink, view.createListItemTemplate(savedNote));
      refs.formNoteEditor.reset();
      MicroModal.close('note-editor-modal');
      notyf.success('Заметка успешно добавлена!');
      return savedNote;  
    });
}

export const removeListItem = ({target}) => {
  if(target.closest('button[data-action="delete-note"]')) {
    const idDeletedNote = target.closest('.note-list__item').dataset.id;
    
    const promise = notepad.deleteNote(idDeletedNote);
    promise.then((el) => {
      target.closest('li').remove();
      notyf.success('Заметка успешно удалена!');
    })
  } 
}

export const search = () => {
  [...view.noteListLink.children].forEach(item => item.remove()); // clears the screen

  // const notes = 

  const searchNotesArr = notepad.filterNotesByQuery(refs.searchInput.value);
  searchNotesArr.then(notesArr => view.renderNoteList(view.noteListLink, notesArr));  
}

export const handleOpenEditor = () => {
  MicroModal.show('note-editor-modal')
}
// handlers -END