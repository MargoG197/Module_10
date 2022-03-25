

const btn = document.querySelector('.btn');

const width = window.screen.width;
const height = window.screen.height;


btn.addEventListener('click', () => {
    alert(`Ширина экрана вашего устройства: ${width} px, высота: ${height} px.`)
})