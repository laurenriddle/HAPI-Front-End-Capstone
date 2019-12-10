

export default {
  // fetch calls for login and register
  searchByDescription(userInput) {
    return fetch(`https://api.publicapis.org/entries?description=${userInput}`)
      .then(data => data.json());
  }
}