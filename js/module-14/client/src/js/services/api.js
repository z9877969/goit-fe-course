import axios from 'axios';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const URL = 'http://localhost:3000/notes';
const notyf = new Notyf();

export const requestGet = async () => {
    
    try {
        const response = await axios.get(URL);
        
        return response.data;
    } catch(err) {
        throw notyf.error(`Oops!! ${err}. Try again...`);
    }
}

export const requestPost = async note => {
    
    try {
        const response = await axios.post(URL, note);

        return response.data;
    } catch(err) {
        throw notyf.error(`Oops!! ${err}. Try again...`);
    }
}

export const requestDelete = async id => {
    try {
        const response = await axios.delete(`${URL}/${id}`);

        return response.data; // return empty object
    } catch(err) {
        throw notyf.error(`Oops!! ${err}. Try again...`);
    }
}

export const requestPatch = async (id, updateContentObj) => {
    try{
        const {body, priority} = updateContentObj;
        const response = await axios.patch(`${URL}/${id}`, {body: body, priority: priority});
    } catch(err) {
        throw notyf.error(`Oops!! requestPatch: ${err}`);
    }
}

export const requestUpdateContent = (id, updatedContent) => {
    const objOptions = {body: updatedContent};

    return requestPatch(id, objOptions);
}

export const requestUpdatePriority = (id, updatedPriority) => {
    const objOptions = {priority: updatedPriority};

    return requestPatch(id, objOptions);
}

export const requestSearchByQuery = async query => {
    
    try {
        const response = await axios.get(`${URL}?q=${query}`);
        const notes = response.data;

        return notes;
    } catch(err) {
        throw notyf.error(`Oops!! requestSearchByQuery: ${err}`);
    }
} 

export const requestFilteredByPriority = async priority => {
    try {
        const response = await axios.get(`${URL}?priority=${priority}`);
        const filteredNotesByPriorityArr = response.data;

        return filteredNotesByPriorityArr;
    } catch(err) {
        throw notyf.error(`Oops!! requestFilteredByPriority: ${err}`);
    }
} 