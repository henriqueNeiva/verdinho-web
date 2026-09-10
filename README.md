# Verdinho Web

Site institucional do **Verdinho Finanças**, separado do aplicativo em `D:\projetos\web`.
Responsável: Henrique Santos Neiva · henriquesneiva@gmail.com.

## Executar

Requer Node.js 22 ou superior. Não há pacotes externos para instalar.

```powershell
cd D:\projetos\web
npm run build
npm run check
npm run dev
```

Abra http://localhost:4173/. O servidor atende apenas à máquina local. Após editar arquivos, execute build novamente e atualize a página.

## Estrutura

- `src/pages/`: página inicial, privacidade, termos, suporte, exclusão de conta e licenças.
- `src/layout.html`: cabeçalho, rodapé e metadados compartilhados.
- `src/styles.css`: identidade visual, responsividade, acessibilidade e impressão.
- `site.config.json`: responsável, contato, endereço público e revisão dos documentos.
- `assets/`: logos próprios, incluindo o PNG para Google abaixo de 1 MB.
- `scripts/`: geração, verificação de links e servidor local.
- `dist/`: site estático gerado. Publique somente esta pasta.
- `LICENSE` e `THIRD_PARTY_NOTICES.md`: licença MIT do código e créditos.

Todo conteúdo é renderizado no HTML. O site funciona sem JavaScript no navegador. Os links relativos funcionam tanto em domínio próprio quanto em um subdiretório do GitHub Pages. O site não inclui login do app, chaves Supabase, banco de dados, cookies próprios, formulário, fontes externas ou analytics.

## Documentos e publicação

Os textos são minutas específicas para o estado atual do app, não certificação de conformidade jurídica. O nome e o e-mail foram informados pelo responsável. Antes da publicação, valide o conteúdo e os itens em `PUBLICACAO.md`. Os documentos legais exibem aviso de versão preliminar enquanto a configuração não estiver pronta.

A geração comum mantém noindex. Depois da revisão e definição da URL pública, use `npm run build:release`. Esse comando exige identificação, contato, endereço HTTPS e `legalReviewed: true` antes de gerar páginas indexáveis. O siteUrl deve incluir o caminho completo do repositório, por exemplo `https://USUARIO.github.io/REPOSITORIO/`.

Repositório: https://github.com/henriqueNeiva/verdinho-web. O envio do código ao GitHub é separado da publicação do site. A configuração de GitHub Pages e a revisão dos documentos permanecem para a etapa de publicação.

## Identidade e fontes

Paleta escura e verde do Verdinho. Arte de marca reutilizada do aplicativo; os arquivos estão fisicamente no projeto web e não dependem da pasta do app. A interface financeira da página inicial é ilustrativa e seus números são fictícios.

## Fontes consultadas

- LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Google User Data Policy: https://developers.google.com/terms/api-services-user-data-policy
- Branding Google: https://support.google.com/cloud/answer/13464321
- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Privacidade Supabase: https://supabase.com/privacy

Atualização: 10/09/2026.
