export default class Notepad {
    constructor (notes = []) {
    this._notes = notes;
    }
  
    get notes () {
       return this._notes
    }
  
    finedNoteById (id) {
      for (let note of this.notes) {
        if (id === note.id) return note;
      };
    }
  
    saveNote (note) {
      return this.notes.push(note);
    }
  
    deleteNote (id) {
      this.notes.splice(this.notes.indexOf(this.finedNoteById(id)), 1);
    }
  
    updateNoteContent (id, updatedContent) {
      return Object.assign(this.finedNoteById(id), updatedContent);
    }
  
    updateNotePriority (id, priority) {
      this.finedNoteById(id).priority = priority;
      return this.finedNoteById(id).priority;
    }
  
    filterNotesByQuery (query) {
      const resultArr = [];
      query = query.toLowerCase();
      for (let note of this.notes) {
        if (note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
          resultArr.push(note);
        };
      };
      return resultArr;
    }
  
    filterNotesByPriority (priority) {
      const resultArr = [];
      for (let note of this.notes) {
        if (note.priority === priority) {
          resultArr.push(note);
        };
      };
      return resultArr;
    }
  }