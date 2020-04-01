export default {
  // fetch calls for external API
  searchByDescription(userInput) {
    // searches API list by description
    return fetch(`https://api.publicapis.org/entries?description=${userInput}`)
      .then(data => data.json());
  }, searchByTitle(userInput) {
    // searches API list by title
    return fetch(`https://api.publicapis.org/entries?title=${userInput}`)
      .then(data => data.json());
  }, searchByCategory(userInput) {
    // searches API list by category
    return fetch(`https://api.publicapis.org/entries?category=${userInput}`)
      .then(data => data.json());
  },
  getRandomApi(userInput) {
    // generates a random API
    return fetch(`https://api.publicapis.org/random`)
      .then(data => data.json());
  }
  

}
