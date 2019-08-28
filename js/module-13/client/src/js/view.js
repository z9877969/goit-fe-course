import noteTemplate from '../template/note.hbs';
import {requestGet} from './services/api';
    
const createNoteList = notes => {
  const list = notes.reduce((acc, note) => acc + noteTemplate(note), '');
  return list;
}

export default class View {
    constructor() {
        this._body = document.querySelector('body');
        this._noteListLink = document.querySelector('ul.note-list');
    }

    get noteListLink() {
       return this._noteListLink;
    }

    createListItemTemplate(note) {
      const item = noteTemplate(note);
        
      return item;  
    }
      
    renderNoteList(listRef, notes) {
      const noteListTemplate = requestGet()
        .then(notes => notes.reduce((acc, note) => acc + this.createListItemTemplate(note), ''));
      noteListTemplate
        .then(tpl => listRef.insertAdjacentHTML('beforeend', tpl));
    };
}