const options = [... document.querySelectorAll('#optionsInformation > li')]
const optionsList = [...document.querySelectorAll('#optionsList > ul')]


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
        const previousIndex = previous.parentElement.getAttribute('data-option')
        target.firstElementChild.classList.remove('hidden')
        const currentIndex  = target.getAttribute('data-option')
        optionsList[previousIndex -1].classList.add('hidden')
        optionsList[currentIndex -1].classList.remove('hidden')
    }
})

document.addEventListener('submit', event => {
    event.preventDefault()
})