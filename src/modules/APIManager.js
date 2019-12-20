const remoteURL = "http://localhost:5002"

export default {
  // fetch calls for login and register
  searchUser(email) {
    return fetch(`${remoteURL}/users?q=${email}`)
      .then(data => data.json());
  },
  postNewUser(newUser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(data => data.json())
  },
  getRegisteredUser(email) {
    return fetch(`${remoteURL}/users?email=${email}`)
      .then(data => data.json())
  },
  // fetch calls for entire application
  get(route) {
    const id = localStorage.getItem("credentials")
    return fetch(`${remoteURL}/${route}`).then(result => result.json());
  },
  delete(route) {
    return fetch(`${remoteURL}/${route}`, {
      method: "DELETE"
    }).then(result => result.json());
  },
  post(route, newItem) {
    return fetch(`${remoteURL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }).then(data => data.json());
  },
  update(route, editedItem) {
    return fetch(`${remoteURL}/${route}/${editedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedItem)
    }).then(data => data.json());
  },
  patch(route, newItem) {
    return fetch(`${remoteURL}/${route}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    }).then(data => data.json());
  }
}