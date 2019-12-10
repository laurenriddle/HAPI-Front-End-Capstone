

export default {
  // fetch calls for login and register
  searchByDescription(userInput) {
    return fetch(`https://api.publicapis.org/entries?description=${userInput}`)
      .then(data => data.json());
  }, searchByTitle(userInput) {
    return fetch(`https://api.publicapis.org/entries?title=${userInput}`)
      .then(data => data.json());
  }, searchByCategory(userInput) {
    return fetch(`https://api.publicapis.org/entries?category=${userInput}`)
      .then(data => data.json());
  }

}