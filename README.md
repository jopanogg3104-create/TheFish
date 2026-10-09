# The Fish — Restaurante e Petiscaria

Next.js 16, React 19, TypeScript e Tailwind CSS. A apresentação usa componentes locais no padrão ShadCN/Radix, com visual editorial em preto e dourado e fontes Fraunces/Manrope distribuídas no projeto. O cardápio e os preços existentes foram preservados.

## Executar

Node.js >=20.9 (validado em Node 24).

```sh
npm ci
npm run dev
```

Produção:

```sh
npm run build
npm run start
```

Rotas: `/`, `/cardapio` e `/privacidade`.

## Estrutura

- `app/page.tsx`: nova apresentação do restaurante.
- `components/`: cabeçalho, rodapé, FAQ e componentes de interface.
- `app/globals.css`: sistema visual e estilos do cardápio.
- `content/menu.json`: estrutura HTML da interface de pedidos.
- `app/cardapio/menu-runtime.js`: catálogo e interações do carrinho.
- `app.js`: mesma lógica para a versão independente.
- `cardapio-data.json`: catálogo organizado por seção.
- `cardapio-original.txt`: material original de referência, preservado.
- `public/assets/`: logos e fotos extraídas do PDF fornecido.

O pedido abre o WhatsApp 5514998134791 com itens, escolhas e observações. O restaurante confirma disponibilidade, valor final, recebimento e pagamento. Premium acrescenta R$ 12 por unidade do item com camarão. O site não envia mensagens automaticamente, não exige segredos e não tem banco de dados. O carrinho é salvo no dispositivo.

## Versões independentes

`index.html`, `cardapio.html`, `privacidade.html` e `site-completo.html` incluem imagens, fontes e estilos. Devem ser abertos em um navegador, pois visualizadores de anexos podem bloquear JavaScript.

Para regenerar esses arquivos após mudanças, inicie o servidor de produção e execute, em um ambiente com Playwright e Chromium:

```sh
node scripts/export-standalone.cjs http://127.0.0.1:3000
```

O script usa o Chromium em `/usr/bin/chromium`; adapte o caminho se necessário. Não é executado durante o deploy na Vercel.

## Publicação

O GitHub está conectado à branch `main`. Uma integração Vercel ativa pode publicar os commits automaticamente. Este repositório não prova que o último deploy foi concluído. Metadados sociais usam o domínio de produção fornecido pela Vercel, sem inventar endereço público.
