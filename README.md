<div align="center">

# GeoNexus: O mundo conectado de forma clara e acolhedora

</div>

<div align="center">

_Um sistema web construído com o propósito de gerenciar dados relacionados a cidades, países e continentes, integrando informações reais de APIs externas em uma interface pastel e acolhedora._

<img src="https://github.com/raphaelamonteiro/geonexus/blob/main/frontend-geonexus/src/assets/loading-kirby.gif" width="80" />

</div>

---

<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-f2a2b8?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-f2a2b8?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-f2a2b8?style=for-the-badge&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/axios-f2a2b8?style=for-the-badge&logo=axios&logoColor=white)
![Prisma](https://img.shields.io/badge/prisma-f2a2b8?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-f2a2b8?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-f2a2b8?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-f2a2b8?style=for-the-badge&logo=css&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-f2a2b8?style=for-the-badge&logo=bootstrap&logoColor=white)
![Git](https://img.shields.io/badge/git-f2a2b8?style=for-the-badge&logo=git&logoColor=white)
![REST Countries](https://img.shields.io/badge/REST%20Countries-f2a2b8?style=for-the-badge&logo=google-earth&logoColor=white)
![NewsData](https://img.shields.io/badge/NewsData-f2a2b8?style=for-the-badge&logo=news&logoColor=white)

</div>

---

<div align="center">

<div align="center">

<a href="#sobre"> 🌍 Sobre o Projeto </a> |
<a href="#funcionalidades"> ⭐ Funcionalidades </a> |
<a href="#tech"> 💻 Tecnologias </a> |
<a href="#apis"> 🧩 APIs </a> |
<a href="#manual"> 💡 Como Executar </a> |
<a href="#estrutura"> 🗂 Estrutura </a> |
<br>
<a href="#capturas"> 📸 Screenshots </a> |
<a href="#creditos"> 💌 Créditos </a>

</div>
</div>

---

# 🌍 Sobre o Projeto <a id="sobre"></a>

O **GeoNexus** é uma aplicação acadêmica desenvolvida para gerenciar dados geográficos através de CRUDs completos.
Com ele, é possível relacionar:

➡ **Continentes → Países → Cidades**

A interface foi projetada com tons **pastéis, predominantemente rosa**, trazendo suavidade, clareza e acessibilidade.
Além disso, o sistema integra **duas APIs externas** para enriquecer os dados com bandeiras, informações detalhadas e notícias em tempo real.

---

# ⭐ Funcionalidades <a id="funcionalidades"></a>

### 🌎 Continentes

✔ Criar
✔ Listar
✔ Atualizar
✔ Excluir

### 🇧🇷 Países

✔ Associados a um continente
✔ CRUD completo
✔ Listar países por continente
✔ Exibir dados extras via REST Countries
✔ Exibir notícias via NewsData

### 🏙️ Cidades

✔ Associadas a um país
✔ CRUD completo
✔ Listar por país
✔ Listar por continente

---

# 💻 Tecnologias Utilizadas <a id="tech"></a>

| Tecnologia         | Descrição                        |
| ------------------ | -------------------------------- |
| **TypeScript**     | Linguagem principal              |
| **Node.js**        | Backend                          |
| **Prisma ORM 5.0** | Modelagem + queries              |
| **MySQL**          | Banco relacional                 |
| **Axios**          | Consumo de APIs externas         |
| **Bootstrap**      | Interface responsiva e intuitiva |
| **Express**        | Rotas e controle                 |
| **React/Vite**     | Construção da interface web      |
| **HTML/CSS/JS**    | Estrutura da UI                  |

---

# 🧩 Integrações com APIs Externas <a id="apis"></a>

### 🔵 REST Countries

Fornece dados como:

- Bandeiras
- Regiões
- Idiomas
- Moeda
- Capital
- Geografia

### 📰 NewsData

Exibe notícias recentes sobre o país selecionado.
Ideal para enriquecer o contexto do usuário 🌸

---

# 🗂 Estrutura do Projeto <a id="estrutura"></a>

Aqui está uma **visualização real** da estrutura do GeoNexus:

```plaintext
geonexus/
│
├── backend-geonexus/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.ts
│   └── package.json
│
├── frontend-geonexus/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── main.ts
│   └── index.html
│
└── README.md
```

Essa divisão **organiza bem** o backend e frontend, mantendo escalabilidade e clareza.

---

# 💡 Como Executar o Projeto <a id="manual"></a>

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/raphaelamonteiro/geonexus.git
cd geonexus
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o `.env`

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/geonexus"
REST_COUNTRIES_URL="https://restcountries.com/v3.1"
NEWSDATA_API_KEY="SUA_CHAVE_AQUI"
```

### 4️⃣ Gere o cliente Prisma

```bash
npx prisma migrate dev
```

### 5️⃣ Inicie o servidor

```bash
npm run dev
```

---

# 📸 Screenshots <a id="capturas"></a>

## PRINTS AQUI - EM BREVE!

# 💌 Créditos <a id="creditos"></a>

**Desenvolvido por:** Raphaela Monteiro

📘 **Disciplina:** Programação Web

**Professor:** [André Olímpio](https://github.com/andreolimpio)

**Curso:** Análise e Desenvolvimento de Sistemas
