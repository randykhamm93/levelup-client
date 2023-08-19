export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
      headers:{
          "Authorization": `Token ${localStorage.getItem("lu_token")}`
      }
  })
      .then(response => response.json())
}

export const createEvent = (game) => {
    return fetch("http://localhost:8000/events", {
         method: "POST",
         headers:{
             "Content-Type": "application/json",
             "Authorization": `Token ${localStorage.getItem("lu_token")}`
         },
         body: JSON.stringify(game) 
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
            throw new Error("Event not found"); // Throw an error if the response is not OK
        }
        return response.json();
    });
}
