<h1>
Letmeask
</h1>

## 💻 Como acessar o projeto

### Clique [aqui](https://letmeask-78eb7.web.app/) para acessar a aplicação.

<h1></h1>

<h1>
  <img src='./images/home-page.png' >
</h1>

<h3>Mais imagens do projeto:</h3>

- [User Page](./images/user-page.png)
- [Admin Page](./images/admin-page.png)
- [Delete Page](./images/delete-question.png)

## 📃 Sobre

O projeto **Letmeask** é uma aplicação desenvolvida durante a NLW-Together da Rocketseat. Ela tem como objetivo filtrar as principais perguntas realizadas pelos alunos durante uma live. Com isso o professor poderá ver quais foram as perguntas com mais **likes** e com isso ir respondendo uma a uma com calma, diferentemente do que acontece no YouTube por exemplo, onde é difícil acompanhar as mensagens pelo chat.

## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [ReactJS](https://reactjs.org/)
- [SCSS](https://sass-lang.com/)
- [Typescript](https://www.typescriptlang.org/)
- [React Modal](https://github.com/reactjs/react-modal) : Componente de diálogo modal para ReactJS.
- [React Hot Toast](https://react-hot-toast.com/) Biblioteca de notificações.

</p>

## 📥 Como baixar a aplicação

```bash
git clone https://github.com/eliezer537/NLW-Together.git
cd NLW-Together
```
## ⚙️ Configure o Firebase para executar o projeto
- Crie um [novo projeto](https://console.firebase.google.com/?hl=pt) no Firebase
- Ative o recurso de autenticação com o Google na barra lateral -> [Authentication](https://console.firebase.google.com/project/whatsapp-59702/authentication/providers?hl=pt)
- Crie um novo banco de dados na barra lateral -> [Realtime Database](https://console.firebase.google.com/project/whatsapp-59702/database?hl=pt)
- Altere as regras iniciais em -> Realtime Database -> [Regras](https://console.firebase.google.com/project/whatsapp-59702/database/whatsapp-59702-default-rtdb/rules?hl=pt), pelas seguintes novas regras [aqui](./database.rules.json) sugeridas.

## 📌 Configuração da aplicação
- Na directório da aplicação crie um arquivo de variáveis ambiente chamado **.env.local**
- Nesse arquivo insira as chaves: ```bash
REACT_APP_API_KEY="   "
REACT_APP_AUTH_DOMAIN="    "
REACT_APP_DATABASE_URL="   "
REACT_APP_PROJECT_ID="    "
REACT_APP_STORAGE_BUCKET="    "
REACT_APP_MESSAGING_SENDER_ID="   "
REACT_APP_APP_ID="   "
```
- Os valores das chaves acima podem ser encontrados em -> Visão Geral do Projeto -> Configuração do projeto

## 📦 Para instalar as dependências
```bash
yarn install
```

## 🖱️ Para executar a aplicação

```bash
yarn start
```

Caso não tenha o **yarn** instalado em seu computador, você poderá acessar o [Guia de instalação](https://classic.yarnpkg.com/en/docs/install/#debian-stable).
