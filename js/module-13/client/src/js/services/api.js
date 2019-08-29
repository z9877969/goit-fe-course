const URL = 'http://localhost:3000/notes';

export const requestGet = () => {
    return fetch(URL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`);                
            })
        .then(notes => notes)
        .catch(err => console.log(err));
}

export const requestPost = note => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    }

    return fetch(URL, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`)
        })
        .then(newNote => newNote)
        .catch(err => err);
}

export const requestDelete = id => {
    const options = {
        method: 'DELETE'
    };
    return fetch(`${URL}/${id}`, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }

            throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(deletedNote => deletedNote)
        .catch(err => err);
}

export const requestPatch = (id, updateContentObj) => {
    const {body, priority} = updateContentObj;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({body: body, priority: priority})
    }

    return fetch(`${URL}/${id}`, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(updatedNote => updatedNote)
        .catch(err => err);
}

export const requestUpdateContent = (id, updatedContent) => {
    const objOptions = {body: updatedContent}
    return requestPatch(id, objOptions)
}

export const requestUpdatePriority = (id, updatedPriority) => {
    const objOptions = {priority: updatedPriority}
    return requestPatch(id, objOptions)
}

export const requestSearchByQuery = query => {
    return fetch(`${URL}?q=${query}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(filteredNotesArr => filteredNotesArr)
        .catch(err => err);
} 

export const requestFilteredByPriority = priority => {
    return fetch(`${URL}?priority=${priority}`)
        .then(response => {
            if(response.ok){
                return response.json()
            }

            throw new Error(`Error while fetching: ${response.statusText}`);
        })
        .then(filteredNotesArr => filteredNotesArr)
        .catch(err => err);
} 