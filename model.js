let queryResult = []
const fragmentSearchHero = document.createDocumentFragment()
const optionsList = [...document.querySelectorAll('#optionsList > ul')]
const formElement = document.querySelector('main form.flex.items-center')
const options = [... document.querySelectorAll('#optionsInformation > li')]
const URL_ROOTER = 'https://www.superheroapi.com/api.php/3544900422420027/search'
const searchList = document.querySelector('main form.flex > section#searchList')
const searchHeroTemplate = document.getElementById('searchSuperheroTemplate').content


document.addEventListener('click', event => {
    /**
     * @type {Element}
     */
    const target = event.target
    if(target.matches('#optionsInformation > li')) {
        const previous = document.querySelector('#optionsInformation > li > span:not(.hidden)')
        previous.classList.add('hidden')
        target.firstElementChild.classList.remove('hidden')
        toggleClassListOption({ currentNode: previous.parentElement, optionsList })
        toggleClassListOption({ currentNode: target, optionsList })
    } else if(target.matches('form.flex > section#searchList :is(figure, img, figcaption)')) {
        const selectedHeroId = parentNode(target, 'section#searchList > figure').getAttribute('data-id')
        const heroInfo = queryResult.find(superhero => superhero.id === selectedHeroId)
        changeSuperHero(heroInfo)
        clearChildNodes(searchList)
    }
})


formElement.addEventListener('keyup', () => {
    if(formElement.firstElementChild.value.length > 1) {
        fetchAllSuperHero(new FormData(formElement).get('superheroName'))
    }else {
        searchList.innerHTML = ''
    }
})


document.addEventListener('submit', event => {
    event.preventDefault()
    if(formElement.firstElementChild.value.length > 1) {
        fetchAllSuperHero(new FormData(formElement).get('superheroName'))
    }
})


/**
 * 
 * @param {heroInfo} heroInfo 
 */
const changeSuperHero = (heroInfo) => {
    const { image: { url }, name, appearance, biography, connections, powerstats } = heroInfo
    document.querySelector('#heroImage').setAttribute('src', url)
    document.querySelector('section > h2#heroName').textContent = name
    putInformationHero({ nodeList: [... document.querySelectorAll('ul#biography > li > span + span')], jsonData: biography }) 
    putInformationHero({ nodeList: [... document.querySelectorAll('ul#appearance > li > div + span')], jsonData: appearance }) 
    putInformationHero({ nodeList: [... document.querySelectorAll('ul#connections > li > p')], jsonData: connections}) 
    putInformationHero({ nodeList: [... document.querySelectorAll('ul#powerstats > li > div + span')], jsonData: powerstats})
}   


/**
 * @typedef {Object} miniInfo
 * @property {Array<Element>} nodeList
 * @property {Object} jsonData
 * @param {miniInfo}
 */
const putInformationHero = ({ nodeList, jsonData }) => {
    Object.values(jsonData).forEach((value, index) => {
        if(index < nodeList.length)
            nodeList[index].textContent = value
    })
}



/**
 * 
 * @param {Element} currentNode 
 * @param {String} match 
 */
const parentNode = (currentNode, match) => {
    if(currentNode === document.body) {
        return null
    }else {
        if(currentNode.matches(match))
            return currentNode
        return parentNode(currentNode.parentElement, match)
    }
}


/**
 * 
 * @param {String} searchHero 
 */
const fetchAllSuperHero = async searchHero => {
    fetch(`${URL_ROOTER}/${searchHero}`)
        .then(response => response.json())
        .then(consumer)
        .catch(error => console.log(error))
}


/**
 * 
 * @typedef {Object} heroInfo
 * @property {{ gender: String, 'eye-color': String, 'hair-color': String, race: String, height: Array<String>, weight: Array<String> }} appearance
 * @property {{ aliases: Array<String>, alignment: String, 'alter-egos': String, 'first-appearance': String, 'full-name': String, 'place-of-birth': String, publisher: String }} biography
 * @property {{ 'group-affiliation': Array<String>, relatives: Array<String> }} connections
 * @property {String} id
 * @property {{ url: String }} image
 * @property {String} name
 * @property {{ combat: String, durability: String, intelligence: String, power: String, speed: String, strength: String }} powerstats
 * @property {{ base: String, occupation: String }} work
 * @param {{ results: Array<heroInfo> }} jsonData
 */
const consumer = (jsonData) => {
    clearChildNodes(searchList)
    jsonData.results.forEach(json => {
        const { image: { url }, name, id } = json
        const clone = searchHeroTemplate.cloneNode(true)
        clone.querySelector('img.w-4').setAttribute('src', url)
        clone.querySelector('figcaption.text-sm').textContent = name
        clone.querySelector('figure').setAttribute('data-id', id)
        fragmentSearchHero.append(clone)
    })
    queryResult = jsonData.results
    searchList.append(fragmentSearchHero)
}


/**
 * 
 * @param {Element} currentNode 
 */
const clearChildNodes = (currentNode) => {
    [...currentNode.children].forEach(node => node.remove())
}


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