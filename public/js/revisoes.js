ready(() => {
    let form = document.getElementById('form-veiculos')

    if (form !== null && form !== undefined) {
        form.addEventListener('submit', gravaRevisao)
    }

    let form2 = document.getElementById('form-historico')

    if (form2 !== null && form2 !== undefined) {
        form2.addEventListener('submit', carregaRevisoes)
    }
})

function gravaRevisao(e) {
    e.preventDefault()

    // modal

    let revisao = {
        chassi: document.getElementById('txt-chassi').value, 
        km: parseFloat(document.getElementById('txt-km').value), 
        dataRevisao: document.getElementById('dat-datarevisao').value, 
        valor: parseFloat(document.getElementById('txt-valor').value.replace(/\D/g, '')) / 100, 
        observacao: document.getElementById('txt-obs').value
    }

    fetch(`https://localhost:5001/api/revisoes`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(revisao)
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                limpaForm('form-veiculos')

                alert('Revisão gravada com sucesso.')
            } else {
                alert('Foi encontrado um problema ao gravar a revisão. Revise os dados e tente novamente em instantes.')
            }
        })
        .catch(error => {
            alert('Foi encontrado um problema ao gravar a revisão. Revise os dados e tente novamente em instantes.')
        })
}

function carregaRevisoes(e) {
    e.preventDefault()

    // modal

    let chassi = document.getElementById('txt-chassi').value
    let km = parseFloat(document.getElementById('txt-km').value)
    let dataRevisao = document.getElementById('dat-datarevisao').value
    let valor = parseFloat(document.getElementById('txt-valor').value.replace(/\D/g, '')) / 100

    let url = `https://localhost:5001/api/revisoes`
    let filtros = []

    if (chassi) {
        filtros.push(`chassi=${chassi}`)
    }

    if (km) {
        filtros.push(`km=${km}`)
    }

    if (dataRevisao) {
        filtros.push(`dataRevisao=${dataRevisao}`)
    }

    if (valor) {
        filtros.push(`valor=${valor}`)
    }

    if (filtros.length > 0) {
        url += `?${filtros.join('&')}`
    }

    fetch(url, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                let table = document.querySelector('#results > tbody')
                table.innerHTML = ''

                for (item of data) {
                    let row = '<tr>'

                    row += `<td>${item.chassi}</td>`
                    row += `<td style="text-align: right;">${item.km}</td>`
                    row += `<td style="text-align: center;">${formataData(new Date(item.dataRevisao))}</td>`
                    row += `<td style="text-align: right;">${item.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>`
                    row += '</tr>'

                    table.innerHTML += row
                }
            } else {
                alert('Não foi possível carregar as revisões. Tente novamente em instantes.')
            }
        })
        .catch(error => {
            alert('Não foi possível carregar as revisões. Tente novamente em instantes.' + error)
        })
}
