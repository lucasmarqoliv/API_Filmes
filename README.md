# Lucas API

Aplicação Next.js que permite buscar filmes via API OMDb e salvar favoritos usando LocalStorage. Inclui navegação com paginação e detalhes dos filmes.

## Índice

- [Introdução](#introdução)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração](#configuração)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Créditos](#créditos)
- [Licença](#licença)
- [Contato](#contato)

## Introdução

Lucas API é uma aplicação desenvolvida em Next.js que permite aos usuários buscar filmes por título utilizando a API OMDb. Os usuários também podem salvar seus filmes favoritos, que são armazenados no LocalStorage do navegador.

## Funcionalidades

- Busca de filmes por título usando a API OMDb
- Exibição de detalhes de filmes
- Paginação dos resultados de busca
- Salvamento de filmes como favoritos usando LocalStorage
- Exibição da lista de filmes favoritos

## Tecnologias Utilizadas

- **Front-End:** Next.js, React
- **API:** OMDb API
- **Armazenamento Local:** LocalStorage

## Configuração

Para rodar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:
 
   git clone https://github.com/seu-usuario/lucas-api.git
   
Navegue até o diretório do projeto:

cd lucas-api
Instale as dependências:

npm install
Crie um arquivo .env.local na raiz do projeto com a sua chave da API OMDb:

NEXT_PUBLIC_OMDB_API_KEY=sua_chave_aqui
Inicie o servidor:


npm run dev

Uso

Após configurar o projeto, você pode acessar a aplicação em http://localhost:3000. Utilize a barra de pesquisa para buscar filmes por título, e clique em "Ver Favoritos" para acessar a lista de filmes que foram salvos como favoritos.

Contribuição

Contribuições são bem-vindas! Para contribuir, siga os passos abaixo:

Faça um fork do repositório.

Crie uma nova branch:

git checkout -b feature-branch

Faça suas alterações e commite-as:

git commit -m 'Descrição da sua mudança'

Faça o push para a branch:

git push origin feature-branch

Crie um pull request.
Créditos
Este projeto foi desenvolvido por Lucas Marques

Licença
Este projeto é licenciado sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

Contato
Email: lucasmarqoliv@gmail.com
