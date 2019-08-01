import noteTemplate from '../template/note.hbs';
// import notes from '../assets/notes.json';
    
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

    createListItem(note) {
      const item = noteTemplate(note);
        
      return item;  
    }
      
    renderNoteList(listRef, notes) {
        
      const noteList = notes.reduce((acc, note) => acc + this.createListItem(note), '');
      listRef.insertAdjacentHTML('beforeend', noteList);
    };
}