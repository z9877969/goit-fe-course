import {
  requestGet,
  requestDelete,
  requestPost,
  requestUpdateContent,
  requestUpdatePriority,
  requestSearchByQuery,
  requestFilteredByPriority
} from './services/api';

export default class Notepad {
    constructor (notes = []) {
    this._notes = notes;
    }
  
    get notes () {
      this._notes = requestGet();
      
      return this._notes;
    }
  
    finedNoteById (id) {
      return this._notes
      .then(notes => notes.find(note => id === note.id))
      .catch(err => err);
    }
  
    saveNote (note) {
      return requestPost(note);
    }    
  
    deleteNote (id) {
      return requestDelete(id);
    }
  
    updateNoteContent (id, updatedContent) {
      return requestUpdateContent(id, updatedContent);
    }
  
    updateNotePriority (id, updatedPriority) {  
      return requestUpdatePriority(id, updatedPriority);
    }
  
    filterNotesByQuery (query) {
      return requestSearchByQuery(query);
    }
    
    filterNotesByPriority (priority) {
      return requestFilteredByPriority(priority);
    }
  }