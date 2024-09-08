

function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById("campo-pesquisa").value

    // se campoPesquisa for uma string sem nada
    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome de um atleta ou esporte</p>"
        return 
    }

    campoPesquisa = campoPesquisa.toLowerCase()

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    let titulo = ""; 
    let descricao = "";
    let tags = "";

    // Itera sobre cada dado da lista de dados
    for (let dado of dados) {
        titulo = dado.titulo.toLowerCase()
        descricao = dado.descricao.toLowerCase()
        tags = dado.tags.toLowerCase()
        // se titulo includes campoPesquisa
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            // cria um novo elemento
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href=${dado.link} target="_blank">Mais informações</a>
            </div>
        `;
        }
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>"
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}
    const cheerio = require('cheerio');
    const fs = require('fs');
    
    async function buscarPersonagem(nome) {
      const response = await fetch(`https://https://www.bibliaonline.com.br/nvi/busca?q=${nome}&version=nvi`);
      const html = await response.text();
      const $ = cheerio.load(html);
    
      // Aqui você precisa ajustar os seletores para corresponder à estrutura da página da BibleGateway
      const nomeElemento = $('h1').text();
      const descricaoElemento = $('p').first().text();
      // ... outros seletores para extrair período e tags (você pode precisar ajustar)
    
      const personagem = {
        nome: nomeElemento,
        descricao: descricaoElemento,
        periodo: "Período a ser definido", // Substitua por um valor real
        tags: ["tag1", "tag2"] // Substitua por tags relevantes
      };
    
      return personagem;
    }
    
    async function criarBaseDeDados() {
      const personagens = [];
      const nomes = ['Jesus', 'Moisés', 'Paulo']; // Lista de personagens a buscar
    
      for (const nome of nomes) {
        const personagem = await buscarPersonagem(nome);
        personagens.push(personagem);
      }
    
      fs.writeFile('dados.json', JSON.stringify(personagens, null, 2), (err) => {
        if (err) throw err;
        console.log('Dados salvos em dados.json');
      });
    }
    
    criarBaseDeDados();
