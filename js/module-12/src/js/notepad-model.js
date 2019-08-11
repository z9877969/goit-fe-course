export default class Notepad {
    constructor (notes = []) {
    this._notes = notes;
    }
  
    get notes () {
      return this._notes;
    }
  
    finedNoteById (id) {
      return new Promise((resolve, reject) => {
        resolve(this.notes.find(note => id === note.id));
      })
    }
  
    saveNote (note) {
      return new Promise((resolve, reject) => { 
        this.notes.push(note);
        resolve(note);
      }) 
    }    
  
    deleteNote (id) {
      const newNotes = this.finedNoteById(id)
      .then(finededNote => this.notes.splice(this.notes.indexOf(finededNote), 1))
      .then(() => this.notes);
      return Promise.resolve(newNotes);
    }
  
    updateNoteContent (id, updatedContent) {
      this.finedNoteById(id)
      .then(note => Object.assign(note, updatedContent));
    }
  
    updateNotePriority (id, priority) {  
      this.finedNoteById(id)
      .then(note => note.priority = priority);
    }
  
    filterNotesByQuery (query) {
      return new Promise((resolve, reject) => {
        query = query.toLowerCase();        
        const filteredArr =  this.notes.filter(note => note.body.toLowerCase().includes(query) || note.title.toLowerCase().includes(query));
          
        resolve(filteredArr);
        
      })
    }
    
    filterNotesByPriority (priority) {      
      return new Promise((resolve, reject) => {        
        const filteredArr = this.notes.filter(note => note.priority === priority);
        resolve(filteredArr);
      })      
    }
  }