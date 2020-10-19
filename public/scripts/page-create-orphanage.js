//create map
const map = L.map('mapid').setView([-5.1233327,-42.8028737], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',)
.addTo(map);


const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
})

let marker;

//create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat
    const lng = event.latlng.lng

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    //remove icon layer
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

//add photo field
function addPhotoField() {
    //pegar o container de fotos #images 
    const container = document.querySelector('#images');
    //pegar o container pra duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //realizando o clone da última imagem add
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    //ereificar se o campo esta vazio
    const input = newFieldContainer.children[0]
    
    if(input.value == "") {
        return
    }
    //limpar o campo antes de add ao container de imagens
    input.value = ""
    //adicionar o clone ao container de #imagens
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if(fieldsContainer.length <= 1) {
        span.parentNode.children[0].value = ""
        return 
    }

    span.parentNode.remove()
}

function toggleSelect(event) {
    //removendo a classe active
    document.querySelectorAll('.button-select button')
    .forEach((button) => button.classList.remove('active'))

    //pegando o botao selecionado 
    const button = event.currentTarget
    //adicionando a classe active
    button.classList.add('active')
    //pegando o input e dando valor a ele
    const input = document.querySelector('[name="open_on_weekends"]')
    input.value = button.dataset.value
}

function validate(event){
    const lat = document.querySelector('input[name="lat"]')
    const lng = document.querySelector('input[name="lng"]')

    if(lat.value == "" && lng.value == ""){
        event.preventDefault()
        alert('Atenção: Selecione um ponto no mapa!')
    }
}