/ Fetch all the data from the server

async function getDataFromServer() {

    try {

      const response = await fetch("http://localhost:3000/characters");

      const data = await response.json();

      getTheData(data);

    } catch (error) {

      console.error('Error:', error);

    }

  }

 

  getDataFromServer();

 

  // Display the characters' details

  async function getTheData(json) {

    try {

      const arrays = await json;

      const crDiv = document.querySelector('#character-bar');

      arrays.forEach(array => {

        const cat = array.name;

        const spanTag = document.createElement('span');

        spanTag.innerText = cat;

        spanTag.className = "name";

        spanTag.setAttribute("style", "cursor: pointer");

        crDiv.append(spanTag);

      });

      characterReady(json);

    } catch (error) {

      console.log(error, "logged Error");

    }

  }

 

  // Display the characters' details on click

  function characterReady(json) {

    const crName = document.querySelectorAll('.name');

    for (let i = 0; i < crName.length; i++) {

      const div = crName[i];

      div.addEventListener('click', e => {

        displayInfo(e, json);

      });

    }

  }

 

  function displayInfo(e, json) {

    const nameDiv = e.target.innerText;

 

    function findObject(nameDiv) {

      for (let i = 0; i < json.length; i++) {

        const object = json[i];

        if (object.name === nameDiv) {

          detailObject(object);

        }

      }

    }

 

    findObject(nameDiv);

 

    function detailObject(object) {

      const image = object.image;

      const name = object.name;

      const votes = object.votes;

      const id = object.id;

 

      // Get the elements to append

      const nameTag = document.getElementById('name');

      const imageTag = document.getElementById('image');

      const voteTag = document.getElementById('vote-count');

 

      nameTag.setAttribute("data-count", `${object.id}`);

      nameTag.innerText = name;

      imageTag.setAttribute("src", `${image}`);

      voteTag.innerText = votes;

    }

  }

 

  // Add votes to the server and the UI

  const form = document.querySelector('.form');

  form.addEventListener('submit', e => {

    e.preventDefault();

    addVotes();

  });

 

  function addVotes() {

    const input = document.querySelector('#votes');

    const voteTag = document.getElementById('vote-count');

    const dataCount = document.querySelector('#name');

    const id = dataCount.getAttribute('data-count');

    const vote = input.value;

    const voteObject = { votes: vote };

 

    voteTag.innerText = vote;

    postResultToServer(voteObject, id); // Send new vote to the server

  }

 

  function postResultToServer(voteObject, id) {

    fetch(`http://localhost:3000/characters/${id}`, {

      method: 'PATCH',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify(voteObject)

    })

      .then(response => response.json())

      .then(result => {

        // Handle the response from the server

        console.log('Response:', result);

      })

      .catch(error => {

        // Handle any errors that occur during the request

        console.error('Error:', error);

      });

  }

 

  const button = document.querySelector('#btn');

  button.addEventListener('click', () => {

    fetch("http://localhost:3000/characters")

      .then(res => res.json())

      .then(data => console.log(data));

  });

 

  // Reset the votes back to 0

  const resetBtn = document.getElementById('reset-btn');

  resetBtn.addEventListener('click', () => {

    const votes = document.querySelector('#vote-count');

    votes.innerText = "0";

    const dataCount = document.querySelector('#name');

    const id = dataCount.getAttribute('data-count');

    clearVote(id);

  });

 

  // Clear vote from server

  function clearVote(id) {

    fetch(`http://localhost:3000/characters/${id}`, {

      method: "PATCH",

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({ votes: 0 })

    })

      .then(response => response.json())

      .then(result => {

        // Handle the response from the server

        console.log('Response:', result);

      })

      .catch(error => {

        // Handle any errors that occur during the request

        console.error('Error:', error);

      });

  }

 

  // Add a new character to the character list

  const form2 = document.getElementById('character-form');

  form2.addEventListener('submit', e => {

    e.preventDefault();

    getCharacterDetail(); // Run function

  });

 

  // Get the name and the URL

  function getCharacterDetail() {

    const name = document.querySelector('.newName').value;

    const imageUrl = document.getElementById('image-url').value;

    addCharacter(name, imageUrl);

  }

 

  function addCharacter(name, imageUrl) {

    fetch("http://localhost:3000/characters", {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json'

      },

      body: JSON.stringify({

        name: `${name}`,

        image: `${imageUrl}`,

        votes: 0,

      })

    })

      .then(res => res.json)

      .catch(error => {

        console.log("ERROR", error);

      });

  }

 