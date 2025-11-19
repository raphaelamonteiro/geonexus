<div align="center">
  
# GeoNexus — Sistema Geográfico com CRUD Completo

![TypeScript](https://img.shields.io/badge/typescript-f2a2b8?style=for-the-badge&logo=typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-f2a2b8?style=for-the-badge&logo=axios&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-f2a2b8?style=for-the-badge&logo=Prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-f2a2b8?style=for-the-badge&logo=mysql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-f2a2b8?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/css3-f2a2b8?style=for-the-badge&logo=css&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-f2a2b8?style=for-the-badge&logo=bootstrap&logoColor=white)
![Git](https://img.shields.io/badge/git-f2a2b8?style=for-the-badge&logo=git&logoColor=white)


*Um sistema web construído com o propósito de gerenciar dados relacionados a cidades, países e continente.*

</div>

---

<div align="center">

## 🎀 Índice

<a href ="#sobre"> 🌍 Sobre o Projeto </a> |
<a href ="#funcionalidades"> :star: Funcionalidades </a> |
<a href ="#tech"> :computer: Tecnologias Utilizadas </a> |
<a href ="#apis"> 🧩 APIs Integradas </a> |
<a href ="#manual">  :bulb: Como Executar </a> |
<br>
<a href ="#estrutura"> :wrench: Estrutura do Projeto </a> |
<a href ="#interface"> :cherry_blossom: Interface </a> |
<a href ="#capturas"> 📸 Screenshots </a> |
<a href ="#creditos"> :love_letter: Créditos </a>
|

</div>


# 🌍 Sobre o Projeto <a id="sobre"></a>

O **GeoNexus** é uma aplicação acadêmica desenvolvida para gerenciar dados geográficos através de CRUDs completos.
Ele permite relacionar **continentes → países → cidades**, consumir **APIs externas** e exibir isso tudo em uma interface fofa, organizada e com tons pastéis 🌸✨

O objetivo é unir prática de desenvolvimento web com integração de dados reais.

---

# :star: Funcionalidades <a id="funcionalidades"></a>

### 🌎 Continentes

✔ Criar
✔ Listar
✔ Atualizar
✔ Excluir

### 🇧🇷 Países

✔ Associados a um continente
✔ CRUD completo
✔ Listar países por continente
✔ Exibir dados extras vindos das APIs

### 🏙️ Cidades

✔ Associadas a um país
✔ CRUD completo
✔ Listar por país ou continente

---

# 🧩 Integrações com APIs Externas <a id="apis"></a>

### 🔵 REST Countries

Usada para obter dados como:

* Bandeira
* Capital
* Regiões
* Idiomas
* Moeda

### 📰 NewsData

Exibe notícias atuais relacionadas ao país selecionado.
Ótimo para enriquecer a experiência do usuário 💗

---

# :computer: Tecnologias Utilizadas  <a id="tech"></a>

| Tecnologia      | Descrição                |
| --------------- | ------------------------ |
| **TypeScript**  | Linguagem principal      |
| **Node.js**     | Backend                  |
| **Prisma ORM**  | Modelagem + queries      |
| **MySQL**       | Banco relacional         |
| **Axios**       | Consumo de APIs          |
| **Bootstrap**   | Interface pastel fofinha |
| **Express.js**  | Rotas e controle         |
| **HTML/CSS/JS** | Estrutura da UI          |

---

# 🔧 Estrutura do Projeto <a id="estrutura"></a>

| Tecnologia      | Descrição                |
| --------------- | ------------------------ |
| **TypeScript**  | Linguagem principal      |
| **Node.js**     | Backend                  |
| **Prisma ORM**  | Modelagem + queries      |
| **MySQL**       | Banco relacional         |
| **Axios**       | Consumo de APIs          |
| **Bootstrap**   | Interface pastel fofinha |
| **Express.js**  | Rotas e controle         |
| **HTML/CSS/JS** | Estrutura da UI          |

---


---

#  :bulb: Como Executar o Projeto  <a id="manual"></a>

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/geonexus.git
cd geonexus
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o `.env`

```
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

# 🌸 Interface <a id="interface"></a>

A UI do **GeoNexus** utiliza **tons pastéis, predominando rosa**, trazendo leveza sem perder a clareza.
Bootstrap foi usado para:

* Formulários organizados
* Cards elegantes
* Botões suaves
* Tabelas bem definidas

---

# 📸 Screenshots <a id="capturas"></a>

*(Quando quiser, é só me mandar prints que eu deixo essa seção PERFEITA e fofinha!)*

---

# 📚 Créditos <a id="creditos"></a>

👩‍💻 **Desenvolvido por:** Raphaela
📘 **Disciplina:** Programação Web
👨‍🏫 **Professor:** André Olímpio
🏫 **Curso:** Análise e Desenvolvimento de Sistemas

---
