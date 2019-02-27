const FORM = $('form');
const INPUT = $('input');
const MAIN = $('main');
const LOADING = $('.lds-spinner')

function $(tag) {
    return document.querySelector(tag)
}

function transformToHtml(link, title, info) {
    return `<a href=${link} target="_blank"><div class='divich'>
                <h1>${title}</h1>
                <p>${info}</p>
            </div></a>`
}

FORM.addEventListener('submit', async (e) => {
    LOADING.style.display = 'inline-block'
    e.preventDefault();
    const url = `https://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=${INPUT.value}`
    axios.get(url)
        .then(res => {
            LOADING.style.display = 'none'
            return res.data;
        })
        .then(data => {
            let el = '';
            for (let i = 0; i < data[1].length; i++) {
                el += transformToHtml(data[3][i], data[1][i], data[2][i]);

            }
            MAIN.innerHTML = el;
        })

})
