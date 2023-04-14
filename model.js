let queryResult = []
const searchHeroFragment = document.createDocumentFragment()
const optionsInfoFragment = document.createDocumentFragment()
const optionsList = [...document.querySelectorAll('#optionsList > ul')]
const formElement = document.querySelector('main form.flex.items-center')
const URL_ROOTER = 'https://www.superheroapi.com/api.php/3544900422420027'
const options = [... document.querySelectorAll('#optionsInformation > li')]
const searchList = document.querySelector('main form.flex > section#searchList')
const searchHeroTemplate = document.getElementById('searchSuperheroTemplate').content
const optionsInfoTemplate = document.getElementById('optionsInformationTemplate').content


document.addEventListener('click', event => {
    /**
     * @type {Element}
     */
    const target = event.target
    if(target.matches('#optionsInformation > li')) {
        const previous = document.querySelector('#optionsInformation > li > span.option-active')
        previous.classList.remove('option-active')
        target.firstElementChild.classList.add('option-active')
        toggleClassListOption({ currentNode: previous.parentElement, optionsList })
        toggleClassListOption({ currentNode: target, optionsList })        

    } else if(target.matches('form.flex > section#searchList :is(figure, img, figcaption)')) {
        const selectedHeroId = parentNode(target, 'section#searchList > figure').getAttribute('data-id')
        const heroInfo = queryResult.find(superhero => superhero.id === selectedHeroId)
        changeSuperHero(heroInfo)
        clearChildNodes(searchList)
    }
})


document.addEventListener('DOMContentLoaded', () => {
    insertOptions()
    const connections = ['group--affiliation', 'relatives']
    const appearance = ['gender', 'race', 'height', 'weight', 'eye color', 'hair color']
    const stats = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat']
    const biography = ['full name', 'alter egos', 'aliases', 'place of birth', 'first appearance', 'publiser']
    loadTitlesContainer({ titles: connections, queryTemplate: 'connectionsTemplate', selector: 'li > h3', parentSelector: 'ul#connections' })
    loadTitlesContainer({ titles: appearance, queryTemplate: 'appearanceTemplate', selector: 'div > span', parentSelector: 'ul#appearance'})
    loadTitlesContainer({ titles:  biography, queryTemplate: 'biographyTemplate', selector: 'li > span', parentSelector: 'ul#biography'} )
    loadTitlesContainer({ titles: stats, queryTemplate: 'powerstatTemplate', selector: 'li > div > span', parentSelector: 'ul#powerstats'} )
    loadHero()
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
 * @param {String} searchHero 
 */
const fetchAllSuperHero = async searchHero => {
    fetch(`${URL_ROOTER}/search/${searchHero}`)
        .then(response => response.json())
        .then(consumer)
        .catch(error => console.log(error))
}


/**
 * @typedef {Object} titles
 * @property {Array<String>} titles
 * @property {String} [extra]
 * @property {Boolean} [dataAttribute]
 * @property {String} queryTemplate
 * @property {String} selector
 * @property {String} parentSelector
 * @param {titles} object
 */
const loadTitlesContainer = ({ titles, extra = '', dataAttribute = false,  queryTemplate, selector, parentSelector }) => {
    const fragment = document.createDocumentFragment()
    const template = document.getElementById(queryTemplate).content
    titles.forEach((title, index) => {
        const clone = template.cloneNode(true)
        clone.firstElementChild.setAttribute('data-option', dataAttribute? index +1 : '')
        clone.querySelector(selector).innerHTML = `${title}${extra}`
        fragment.append(clone)
    })
    document.querySelector(parentSelector).append(fragment)
}


/**
 * @returns {void}
 */
const loadHero = async () => {
    fetch(`${URL_ROOTER}/70`)
        .then(response => response.json())
        .then(changeSuperHero)
        .catch(error => console.log(error))
}


/**
 * @returns {void}
 */
const insertOptions = () => {
    const options = ['powerstat', 'biography', 'appearance', 'connections']
    loadTitlesContainer({ 
        titles: options, extra: '<span class ="w-full h-[3px] hidden absolute -bottom-[2px] left-0 bg-red"></span>',
        dataAttribute: 1, queryTemplate: 'optionsInformationTemplate', selector: 'li', parentSelector: '#optionsInformation' 
    })
    document.querySelector('#optionsInformation > li > span').classList.add('option-active')
}

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
const putInformationHero = async ({ nodeList, jsonData }) => {
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
        searchHeroFragment.append(clone)
    })
    queryResult = jsonData.results
    searchList.append(searchHeroFragment)
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