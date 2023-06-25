// / Getting the data
  fetch('http://localhost:3000/characters')
    .then(b => b.json())
    .then(data => dom(data));




    // DOm 

    function dom(par){
        for(let item of par){
            let container = document.getElementById('container')
            let list = document.createElement('li')
            list.innerText = item.name
            container.appendChild(list)

            // description
            let more = document.createElement('div')
            more.className = "more"
            list.appendChild(more)
            more.innerHTML = `
            <img src="${item.image}"/>`
            more.style.display = "none"

            list.addEventListener('click', () => {
                more.style.display = "block"
            })
            
        }

    }