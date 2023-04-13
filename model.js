const API_HOST = 'superhero-search.p.rapidapi.com'
const URL_ROOTER = 'https://superhero-search.p.rapidapi.com/api/'
const API_KEY = '5803be8ab2msh7cda7b0d20c3e69p145460jsnb53e6eabc69f'
const options = [... document.querySelectorAll('#optionsInformation > li')]
const optionsList = [...document.querySelectorAll('#optionsList > ul')]

/**
 * 
 * @typedef {Object} optionListElement
 * @property {Element} currentNode
 * @property {Array<Element>} optionsList
 * @param {optionListElement} object 
 * @returns {void}
 */
const toggleClassListOption = ({ currentNode, optionsList }) => {
    const index = currentNode.getAttribute('data-option')
    optionsList[index -1].classList.toggle('hidden')
}

const init =  {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST
    }
}

fetch(`${URL_ROOTER}?hero=Ironman`, init)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.log(error))




document.addEventListener('click', event => {
    /**
     * @type {Element}
     */
    const target = event.target
    if(target.matches('#optionsInformation > li')) {
        /**
        * @type {Element}
        */
        const previous = document.querySelector('#optionsInformation > li > span:not(.hidden)')
        previous.classList.add('hidden')
        target.firstElementChild.classList.remove('hidden')
        toggleClassListOption({ currentNode: previous.parentElement, optionsList })
        toggleClassListOption({ currentNode: target, optionsList })
    }
})

document.addEventListener('submit', event => {
    event.preventDefault()
})