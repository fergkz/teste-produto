# Teste Madeira Madeira: Desenvolvimento de um sistema de portfólio de produtos

## Como executar o projeto localmente

### 1. Obtenha os arquivos do projeto

Primeiramente, obtenha os arquivos do projeto e os extraia em um pasta em seu ambiente de desenvolvimento (por padrão o projeto está pré-configurado para utilizar Apache).

### 2. Crie e importe o SQL do Banco de Dados

Com os arquivos do projeto já na sua máquina, crie um Banco de Dados MySQL (por padrão chamado de `teste-madeira`) e execute/importe o arquivo `teste-madeira-schema.sql` presente na pasta `/backend`

### 3. Valide / configure as variáveis de ambiente do backend e frontend

Acesse o arquivo `/backend/includes/defines.php` e verifique se as **Variáveis de Ambiente** estão de acordo com seu ambiente de desenvolvimento.
Depois, acesse o arquivo `/frontend/next.config.js` e verifique se a url da variável **backendUrl** representa corretamente o link de acesso do backend de seu projeto.

### 4. Instale as dependências e inicialize o servidor frontend do projeto

Acesse a pasta `/frontend` em seu terminal e execute **`npm install`** para instalar as dependências do frontend.
Assim que finalizada a instalação, execute **`npm run dev`** para iniciar o servidor node.js responsável pelo frontend do projeto.

Se tudo ocorrer conforme o esperado, o terminal deverá manter-se aberto e, acessando a url do servidor (normalmente [http://localhost:3000](http://localhost:3000)), será possível navegar no sistema.