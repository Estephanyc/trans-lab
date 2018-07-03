let email = '';
const validate = () => {
    let pass = document.getElementById('inputPassword').value.length
    if (pass <= 8) {
        email = document.getElementById('inputEmail').value
        localStorage.setItem('email', email)
        options();
        
    }
    else {
        alert('Ingrese una contraseña de 8 caracteres maximo y solo numeros')
    }
}
function createElement(parent, element, text, clase) {
    const newElement = document.createElement(element);
    newElement.innerText = text;
    newElement.classList.add(clase);
    newElement.classList.add('mx-auto');
    parent.appendChild(newElement);
}
const showOrHidden = (id, property) => {
    document.getElementById(id).style.display = property;
}
const verSaldo = () => {
    showOrHidden('options', 'none'), showOrHidden('calcular-tarifa', 'none')
    showOrHidden('ver-saldo', 'block'), showOrHidden('faq', 'none')
    showOrHidden('perfil', 'none')

    document.getElementById('verSaldoButtom').addEventListener('click', function () {
        let inputValue = document.getElementById('bipNumber1').value;
        let selectValue = document.getElementById('chooseBip1').value;
        let bipNumber = '';
        if (selectValue != 'vacio') {
            bipNumber = selectValue;
            inputValue.disabled = true;
        } else {
            bipNumber = inputValue;
        }

        fetch(`http://bip.franciscocapone.com/api/getSaldo/${bipNumber}`)
            .then(response => response.json())
            .then(mydata => showSaldo(mydata));

        const showSaldo = (mydata) => {
            let saldo = mydata.saldo.slice(1)
            let saldoDiv = document.getElementById('ver-saldo')
            createElement(saldoDiv, 'p', '$' + saldo, 'total');
        }
    })
}
const calcularTarifa = () => {
    showOrHidden('options', 'none'), showOrHidden('ver-saldo', 'none')
    showOrHidden('calcular-tarifa', 'block'), showOrHidden('faq', 'none')
    showOrHidden('perfil', 'none')

    document.getElementById('calcular').addEventListener('click', function () {
        let inputValue = document.getElementById('bipNumber').value;
        let selectValue = document.getElementById('chooseBip').value;
        let bipNumber = '';
        let horarios = parseInt(document.getElementById('horarios').value);

        if (selectValue != 'vacio') {
            bipNumber = selectValue;
            inputValue.disabled = true;
        } else {
            bipNumber = inputValue;
        }


        fetch(`http://bip.franciscocapone.com/api/getSaldo/${bipNumber}`)
            .then(response => response.json())
            .then(mydata => calculate(mydata));

        const calculate = (mydata) => {

            let saldo = (mydata.saldo.slice(1))
            saldo = saldo.split('.').join("");
            if (horarios == '760') {
                saldo = saldo - 760
            }
            if (horarios == '680') {
                saldo = saldo - 680
            }
            if (horarios == '630') {
                saldo = saldo - 630
            }
            let saldoDiv = document.getElementById('calcular-tarifa')
            createElement(saldoDiv, 'div', '$' + saldo, 'col-10');
        }
    })
}
const perfil = () => {
    showOrHidden('options', 'none'), showOrHidden('ver-saldo', 'none'),
        showOrHidden('calcular-tarifa', 'none'), showOrHidden('faq', 'none'),
        showOrHidden('perfil', 'block')

    let perfilDiv = document.getElementById('infoUser');
    let listDiv = document.getElementById('list')
    createElement(perfilDiv, 'span', email, 'email')
    document.getElementById('addBip').addEventListener('click', function () {
        let newBip = document.getElementById('newBip').value
        createElement(listDiv, 'span', newBip, 'bipList')
    });

}

const options = () => {
    showOrHidden('signIn', 'none'), showOrHidden('menu', 'block'),
        showOrHidden('options', 'block'), showOrHidden('faq', 'none')
    showOrHidden('perfil', 'none')
    let emailText = localStorage.getItem('email')
    let emailDiv = document.getElementById('show-email');
    let emailNode = document.createTextNode(emailText);
    emailDiv.appendChild(emailNode)
}
const faq = () => {
    showOrHidden('options', 'none'), showOrHidden('ver-saldo', 'none'),
        showOrHidden('calcular-tarifa', 'none'), showOrHidden('faq', 'block'),
        showOrHidden('perfil', 'none')
}