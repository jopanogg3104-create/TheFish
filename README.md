# The Fish — Next.js

Site do restaurante The Fish com página inicial, cardápio original, busca e carrinho para encaminhar pedidos ao WhatsApp.

## Desenvolvimento

Node.js 20.9 ou superior (validado com Node 24).

```sh
npm ci
npm run dev
```

## Produção

```sh
npm run build
npm run start
```

Rotas: `/` (apresentação) e `/cardapio` (pedidos). Não requer banco de dados nem segredos. O restaurante confirma o pedido pelo WhatsApp; o site não envia mensagens automaticamente.

## Arquivos

- `app/`: páginas e estilos do Next.js.
- `content/home.json` e `content/menu.json`: apresentação HTML das páginas.
- `app/cardapio/menu-runtime.js`: dados do cardápio e interação do pedido.
- `cardapio-original.txt`: texto original, sem a seção Boteco.
- `public/assets/`: logo original e versão em alta resolução.
- `site-completo.html`: versão independente para baixar e abrir no navegador.

Os arquivos HTML independentes foram preservados. As alterações futuras no site Next.js devem ser feitas nos arquivos de `app/` e `content/`. Fontes externas são opcionais e têm alternativas locais.

Observação
Todas as pesagens são feitos com os insumos INATURA
