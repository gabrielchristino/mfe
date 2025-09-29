# Projeto de Micro-Frontends com Angular e Module Federation

Este projeto demonstra uma arquitetura de micro-frontends (MFE) utilizando Angular e Webpack Module Federation. A aplicação é dividida em um contêiner (host) e dois micro-frontends (`mfe1` e `mfe-cards`), cada um com responsabilidades distintas.

## Visão Geral da Arquitetura

A arquitetura é composta por três aplicações Angular independentes:

1.  **`host-app`**: A aplicação principal, ou "shell", que serve como o ponto de entrada e orquestra a navegação e o carregamento dos micro-frontends.
2.  **`mfe1`**: Um micro-frontend que atua como um orquestrador secundário. Ele é responsável por carregar e coordenar a comunicação entre os componentes de outro micro-frontend (`mfe-cards`).
3.  **`mfe-cards`**: Um micro-frontend que expõe componentes de UI reutilizáveis, como uma lista de cartões e um detalhe de cliente.

O fluxo de interação é o seguinte:

`Host-App` ➜ carrega `MFE1` ➜ `MFE1` carrega componentes do `MFE-Cards`

## Aplicações

### 1. Host App (`host-app`)

A aplicação host é a base do sistema.

-   **Porta:** `4200`
-   **Responsabilidades:**
    -   Fornecer a estrutura principal da página, incluindo a navegação global.
    -   Definir as rotas para carregar os micro-frontends de forma preguiçosa (lazy-loading).
    -   Carregar o `mfe1` quando o usuário navega para a rota `/mfe1`.
-   **Configuração de Module Federation (`webpack.config.js`):**
    -   Mapeia o remote `mfe1` para o seu `remoteEntry.js` em `http://localhost:4201/remoteEntry.js`.
    -   Compartilha as dependências do Angular (`@angular/*`, `rxjs`, etc.) com os micro-frontends para garantir que apenas uma instância de cada biblioteca seja carregada na aplicação.

### 2. Micro-Frontend 1 (`mfe1`)

Este micro-frontend funciona como uma página ou uma feature completa, que por sua vez é construída a partir de componentes de outros MFEs.

-   **Porta:** `4201`
-   **Responsabilidades:**
    -   É carregado pelo `host-app`.
    -   Contém o componente `CardCustomerComponent`, que atua como um "sub-host".
    -   Carrega dinamicamente os componentes `CardListComponent` e `CustomerDataComponent` a partir do `mfe-cards`.
    -   Orquestra a interação entre os componentes que carrega:
        1.  Exibe a lista de cartões (`CardListComponent`).
        2.  Ouve o evento de clique em um cartão.
        3.  Ao receber o clique, carrega e exibe os dados do cliente (`CustomerDataComponent`), passando o ID do cartão selecionado.

### 3. Micro-Frontend Cards (`mfe-cards`)

Este é um micro-frontend focado em UI, expondo componentes que podem ser reutilizados em toda a plataforma.

-   **Porta:** `4202`
-   **Responsabilidades:**
    -   Expor componentes de UI para serem consumidos por outras aplicações.
    -   **`CardListComponent`**:
        -   Exibe uma lista de cartões.
        -   Emite um evento (`cardClicked`) com o ID do cartão quando um deles é clicado.
    -   **`CustomerDataComponent`**:
        -   Recebe um `cardId` como `@Input`.
        -   Exibe dados relacionados ao ID do cartão.
        -   Emite um evento (`dataSelected`) quando um dado específico é selecionado.

## Como Executar o Projeto

Para executar o ambiente completo, você precisa iniciar as três aplicações Angular em terminais separados.

1.  **Iniciar o `mfe-cards`:**

    ```bash
    cd mfe-cards
    npm install
    npm start
    # A aplicação estará disponível em http://localhost:4202
    ```

2.  **Iniciar o `mfe1`:**

    ```bash
    cd mfe1
    npm install
    npm start
    # A aplicação estará disponível em http://localhost:4201
    ```

3.  **Iniciar o `host-app`:**

    ```bash
    cd host-app
    npm install
    npm start
    # A aplicação estará disponível em http://localhost:4200
    ```

Após iniciar todos os serviços, acesse `http://localhost:4200` em seu navegador. Ao clicar no link "Carregar Micro-Frontend 1", o `host-app` carregará o `mfe1`, que por sua vez carregará e exibirá os componentes do `mfe-cards`.

