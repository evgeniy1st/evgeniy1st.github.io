const root = document.querySelector('#root');
const buttonResult = root.querySelector('#button');
const buttonAdd = root.querySelector('#buttonAdd');
const input = root.querySelector('#input');
const list = root.querySelector('#list');
const errorMessage = root.querySelector('#error');
const helpButton = root.querySelector('#help');
const popup = root.querySelector('#howItWork');
const main = root.querySelector('#main');
const descriptions = [
    'Анализирую информацию...', 'Поднимаю статистику...', 'Анализирую публикации в СМИ...', 'Изучаю мнения экспертов...', 'Почти готово...', 'Формирую отчёт...', 'Ваш прогноз готов!'
]
const markdownLoader = `
    <div class="textCont" id="text">Подготовка</div>
    <div class='cssload-loader'>
    <div class='cssload-inner cssload-one'></div>
    <div class='cssload-inner cssload-two'></div>
    <div class='cssload-inner cssload-three'></div>
    </div>
    `;
let valuesList =[];

function pasteLoader() {
    root.innerHTML = markdownLoader;
}


function replaceDescription(items) {
    const textCont = root.querySelector('#text');
    for (let i = 0; i < items.length; i++) {
        setTimeout(() => {
            let item = items[i]
            textCont.innerHTML = '';
            for (let j = 0; j < item.length; j++) {
                setTimeout(() => {
                    textCont.innerHTML += item[j];
                },70 * (j+1))
            }
        }, 5000 * (i+1));
    }
}


buttonResult.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (valuesList.length > 0) {
        pasteLoader();
        replaceDescription(descriptions)
        setTimeout(() => {
            root.innerHTML = `
        <div class="textFinal" id="textFinal"><span>Пизда рублю</span>
        <span class="material-icons button-reload" onClick="window.location.reload()">
            replay
        </span>
        </div>

        <div class="baymax">
        <div class="head">
        </div>
        <div class="body"></div>
        <div class="hand">
            <div class="finger"></div>
        </div>
        </div>
        `
        }, 40000)
    } else {
        errorMessage.innerHTML = `
        Вы ниичего не написали
        `
        errorMessage.classList.add('active')

        setTimeout(() => {
            errorMessage.classList.remove('active')
        }, 5000)
    }
})

buttonAdd.addEventListener('click', (evt) => {
    evt.preventDefault();
    let value = input.value;

    if (value.length >= 5 && valuesList.length < 5) {
        const item = document.createElement('li');
        item.classList.add('listItem');
        item.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (evt.target.id === 'removeElement') {
                list.removeChild(item)
                valuesList = valuesList.filter(it => {
                    return it !== value
                });
            }
        })
        item.innerHTML = `${value}
    <button type="button">
    <span class="material-icons button-reset" id="removeElement">
        cancel
    </span>
    </button>`;
        list.insertAdjacentElement('beforeend', item);
        valuesList.push(value);
        input.value = '';
    } else if (value.length < 5) {
        errorMessage.innerHTML = `
        Не менее 5 символов на строку
        `
        errorMessage.classList.add('active')

        setTimeout(() => {
            errorMessage.classList.remove('active')
        }, 5000)
    } else if (valuesList.length === 5) {
        errorMessage.innerHTML = `
        Не болеее пяти факторов на один прогноз
        `
        errorMessage.classList.add('active')

        setTimeout(() => {
            errorMessage.classList.remove('active')
        }, 5000)
    }
})

// helpButton.addEventListener('click', () => {
//     popup.classList.add('active');
//     root.classList.add('popup-active');
// })