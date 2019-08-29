import noteTemplate from '../template/note.hbs';

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
      const noteListTemplate = notes.reduce((acc, note) => acc + this.createListItemTemplate(note), '');
      listRef.insertAdjacentHTML('beforeend', noteListTemplate);
    };
}