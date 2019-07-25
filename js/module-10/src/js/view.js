import {
    ICON_TYPES,
    NOTE_ACTIONS} from './utils/constants';

export default class View {
    constructor() {
        this._body = document.querySelector('body');
        this._noteListLink = document.querySelector('ul.note-list');
    }

    get noteListLink() {
       return this._noteListLink;
    }

    createDomElement({tagName, classNameArr, atributesObj, dataAtributesObj, content}) {
        const element = document.createElement(tagName);
        if (classNameArr) {element.classList.add(...classNameArr);}
        
        // add data-atribbute
        if (dataAtributesObj) {
          Object.entries(dataAtributesObj).forEach(dataAtribute => { 
            const [dataKey, dataValue] = dataAtribute;
            element.dataset[dataKey] = dataValue})
        };
        // add data-atribbute -END
        
        if (atributesObj) {
          Object.entries(atributesObj).forEach(
            atribute => {
              const [atributeKey, atributeValue] = atribute;
              element.setAttribute(atributeKey, atributeValue);
            }
          )
        };
        
        if (content) {element.textContent = content};
      
        return element;
    };

    createNoteContent(container, note) {
        const dataNoteContent = {
          tagName: 'div',
          classNameArr: ['note__content'],
        };
        const noteContent = this.createDomElement(dataNoteContent);
        container.append(noteContent);
      
        const dataNoteTitle = {
          tagName: 'h2',
          classNameArr: ['note__title'],
          content: note.title,
        };
        const noteTitle = this.createDomElement(dataNoteTitle);
        noteContent.append(noteTitle);
      
        const dataNoteBody = {
          tagName: 'p',
          classNameArr: ['note__body'],
          content: note.body,
        };
        const noteBody = this.createDomElement(dataNoteBody);
        noteContent.append(noteBody);
      
        return noteContent;
    }
      
    createActionButton(actionLink, iconLink, container) {
        const dataActionElement = {
            tagName: 'button',
            classNameArr:['action'],
            dataAtributesObj: {action: actionLink,},
          };
          const actionElement = this.createDomElement(dataActionElement);
          container.append(actionElement);
        
          const dataIconDecrease = {
            tagName: 'i',
            classNameArr:['material-icons', 'action__icon'],
            content: iconLink,
          };
          const iconDecrease = this.createDomElement(dataIconDecrease);
          actionElement.append(iconDecrease);
    }
      
    createNoteFooter(container, note) {
        const dataNoteFooter = {
          tagName: 'footer',
          classNameArr:['note__footer'],
        };
        const noteFooter = this.createDomElement(dataNoteFooter);
        container.append(noteFooter);
      
        // SECTION increase/decrease priority
        const dataSectionPriority = {
          tagName: 'section',
          classNameArr:['note__section'],
        };
        const sectionPriority = this.createDomElement(dataSectionPriority);
        noteFooter.append(sectionPriority);
      
        const actionDecrease = this.createActionButton(
          NOTE_ACTIONS.INCREASE_PRIORITY,
          ICON_TYPES.ARROW_DOWN,
          sectionPriority
        );
      
        const actionIncrease = this.createActionButton(
          NOTE_ACTIONS.DECREASE_PRIORITY,
          ICON_TYPES.ARROW_UP,
          sectionPriority
        );
        
        const dataPriorityStatus = {
          tagName: 'span',
          classNameArr:['note__priority'],
          content: `Priority: ${note.priority}`,
        };
        const priorityStatus = this.createDomElement(dataPriorityStatus);
        sectionPriority.append(priorityStatus);
        // SECTION increase/decrease priority -END
        
        // SECTION edit/delete note
        const dataSectionEdit = {
          tagName: 'section',
          classNameArr:['note__section'],
        };
        const sectionEdit = this.createDomElement(dataSectionEdit);
        noteFooter.append(sectionEdit);
      
        const actionEdit = this.createActionButton(
          NOTE_ACTIONS.EDIT,
          ICON_TYPES.EDIT,
          sectionEdit
        )
      
        const actionDelete = this.createActionButton(
          NOTE_ACTIONS.DELETE,
          ICON_TYPES.DELETE,
          sectionEdit
        )
        // SECTION edit/delete note -END
      
        return noteFooter;
    }
      
    createListItem(note) {
        const dataItem = {
          tagName: 'li',
          classNameArr: ['note-list__item'],
          dataAtributesObj: {id: note.id},
        }
        const item = this.createDomElement(dataItem);
        
        this.createNoteContent(item, note);
        this.createNoteFooter(item, note);
        
        return item;  
    }
      
    renderNoteList(listRef, notes) {
        const listItemsArr = [];
        notes.map(el => listItemsArr.push(this.createListItem(el)));
        listRef.append(...listItemsArr);
    };
}