'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

class Notepad {
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

  static priorityStatus = {

  }
}

const notepad = new Notepad(initialNotes);

const noteListLink = document.querySelector('ul.note-list');

const createTag = ({tagName, classNameArr, atributesObj, dataAtributesObj, content}) => {
  const element = document.createElement(tagName);
  if (classNameArr) {element.classList.add(...classNameArr);}
  
  // add data-atribbute
  if (dataAtributesObj) {
    Object.entries(dataAtributesObj).forEach(el => element.dataset[el[0]] = el[1])
  };
  // add data-atribbute -END
  
  if (atributesObj) {
    Object.entries(atributesObj).forEach(el => element.setAttribute(el[0], el[1]))
  };
  
  if (content) {element.textContent = content};

  return element;
};

const createActionButton = (actionLink, iconLink, container) => {
  const dataActionElement = {
      tagName: 'button',
      classNameArr:['action'],
      dataAtributesObj: {action: actionLink,},
    };
    const actionElement = createTag(dataActionElement);
    container.append(actionElement);
  
    const dataIconDecrease = {
      tagName: 'i',
      classNameArr:['material-icons', 'action__icon'],
      content: iconLink,
    };
    const iconDecrease = createTag(dataIconDecrease);
    actionElement.append(iconDecrease);
}

const createNoteContent = (container, note) => {
  const dataNoteContent = {
    tagName: 'div',
    classNameArr: ['note__content'],
  };
  const noteContent = createTag(dataNoteContent);
  container.append(noteContent);

  const dataNoteTitle = {
    tagName: 'h2',
    classNameArr: ['note__title'],
    content: note.title,
  };
  const noteTitle = createTag(dataNoteTitle);
  noteContent.append(noteTitle);

  const dataNoteBody = {
    tagName: 'p',
    classNameArr: ['note__body'],
    content: note.body,
  };
  const noteBody = createTag(dataNoteBody);
  noteContent.append(noteBody);

  return noteContent;
}

const createNoteFooter = (container, note) => {
  const dataNoteFooter = {
    tagName: 'footer',
    classNameArr:['note__footer'],
  };
  const noteFooter = createTag(dataNoteFooter);
  container.append(noteFooter);

  // SECTION increase/decrease priority
  const dataSectionPriority = {
    tagName: 'section',
    classNameArr:['note__section'],
  };
  const sectionPriority = createTag(dataSectionPriority);
  noteFooter.append(sectionPriority);

  const actionDecrease = createActionButton(
    NOTE_ACTIONS.INCREASE_PRIORITY,
    ICON_TYPES.ARROW_DOWN,
    sectionPriority
  );

  const actionIncrease = createActionButton(
    NOTE_ACTIONS.DECREASE_PRIORITY,
    ICON_TYPES.ARROW_UP,
    sectionPriority
  );
  
  const dataPriorityStatus = {
    tagName: 'span',
    classNameArr:['note__priority'],
    content: `Priority: ${note.priority}`,
  };
  const priorityStatus = createTag(dataPriorityStatus);
  sectionPriority.append(priorityStatus);
  // SECTION increase/decrease priority -END
  
  // SECTION edit/delete note
  const dataSectionEdit = {
    tagName: 'section',
    classNameArr:['note__section'],
  };
  const sectionEdit = createTag(dataSectionEdit);
  noteFooter.append(sectionEdit);

  const actionEdit = createActionButton(
    NOTE_ACTIONS.EDIT,
    ICON_TYPES.EDIT,
    sectionEdit
  )

  const actionDelete = createActionButton(
    NOTE_ACTIONS.DELETE,
    ICON_TYPES.DELETE,
    sectionEdit
  )
  // SECTION edit/delete note -END

  return noteFooter;
}

const createListItem = (note) => {
  const dataItem = {
    tagName: 'li',
    classNameArr: ['note-list__item'],
    dataAtributesObj: {id: note.id},
  }
  const item = createTag(dataItem);
  
  createNoteContent(item, note);
  createNoteFooter(item,note);
  
  return item;  
}

const renderNoteList = (listRef, notes) => {
  const listItemsArr = [];
  notes.map(el => listItemsArr.push(createListItem(el)));
  listRef.append(...listItemsArr);
};

renderNoteList(noteListLink, initialNotes); 
