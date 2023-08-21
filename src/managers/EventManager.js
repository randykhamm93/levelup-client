export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
  })
      .then(response => response.json())
}

export const getEventById = (eventId) => {
   return fetch(`http://localhost:8000/events/${eventId}`, {
       headers: {
           "Authorization": `Token ${localStorage.getItem("lu_token")}`
       }
   })
   .then(response => {
       if (!response.ok) {
           throw new Error("Event not found"); 
       }
       return response.json();
   });
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
         method: "POST",
         headers:{
             "Content-Type": "application/json",
             "Authorization": `Token ${localStorage.getItem("lu_token")}`
         },
         body: JSON.stringify(event) 
    })
        .then(response => response.json())
 }

 export const updateEvent = (eventId, eventData) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(eventData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to update game");
        }
    });
}

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
    });
  }
  