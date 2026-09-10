# Preparação para a publicação

## Dados já informados

- Marca: Verdinho Finanças.
- Responsável: Henrique Santos Neiva.
- Contato público: henriquesneiva@gmail.com.
- Não foi informado CNPJ; o site não inventa uma pessoa jurídica.
- O projeto está em desenvolvimento, sem download nas lojas anunciado.

## Validar antes de disponibilizar o app publicamente

1. Revisar a política e os termos com o responsável e, se necessário, assessoria jurídica. Os documentos são minutas, não parecer jurídico.
2. Confirmar a região do Supabase, operadores, transferências internacionais, bases legais por finalidade e ciclos reais de retenção de logs/backups. Atualizar o parágrafo de transferências da política após a confirmação.
3. Avaliar a necessidade de nascimento e gênero: são coletados no cadastro/perfil atual, mas não são necessários para o login Google. Adequar a coleta e a política antes do lançamento.
4. Testar exclusão com conta que já possui lançamentos e grupos. A migração atual do app usa FK de transactions.author_id para profiles.id sem ON DELETE; a função delete_my_account pode falhar para esses usuários. O site oferece a via de atendimento por e-mail e não promete exclusão automática de todos os dados. Resolver no projeto do app.
5. Definir e documentar o destino dos registros compartilhados após exclusão de membro e os critérios de retenção. Não inventar prazo de exclusão.
6. Confirmar capacidade operacional para atender henriquesneiva@gmail.com. Não foi prometido SLA.
7. Confirmar a política para menores e seu atendimento efetivo no app.
8. Inserir no app links públicos de privacidade, termos, suporte e exclusão depois da publicação. O site não altera o app.
9. Verificar se as afirmações sobre não vender dados, não usar dados Google para publicidade/treinamento e não usar analytics permanecem corretas quando novos recursos forem adicionados.

## GitHub Pages — próxima etapa

1. Criar o repositório público separado para o site e enviar seus arquivos de fonte. Não enviar a pasta do app ou arquivos .env.
2. Definir a URL final, normalmente https://USUARIO.github.io/REPOSITORIO/.
3. Atualizar site.config.json com essa URL (incluindo /REPOSITORIO/).
4. Após a revisão real dos documentos, mudar legalReviewed para true.
5. Executar npm run build:release e npm run check.
6. Publicar o conteúdo de dist/ com GitHub Pages, usando um workflow de GitHub Actions ou uma branch de publicação dedicada. Configurar essa automação quando criarmos o repositório.
7. Confirmar HTTPS, página inicial, subpáginas, imagens, links, robots.txt e sitemap.xml na URL pública.

## Endereços para o Google

Usando BASE = URL pública final, com barra no final:

- Página inicial: BASE
- Privacidade: BASEprivacidade/
- Termos: BASEtermos/
- Atendimento: BASEsuporte/
- Exclusão de conta: BASEexcluir-conta/
- Logo: assets/google-logo.png (120 × 120, abaixo de 1 MB).

Verificar a propriedade do endereço no Google Search Console com a conta responsável pelo projeto Cloud. Não adicionar uma meta de verificação inventada. Quando o Google fornecer o arquivo HTML ou a meta, incluir o valor exato e publicar. A aceitação do domínio e a aprovação da marca dependem da avaliação do Google; GitHub Pages não as garante.

O callback OAuth do Supabase é separado das URLs institucionais e não deve ser trocado pela URL deste site. O domínio próprio pode ser conectado posteriormente sem migrar a hospedagem.

## Licença

Mantida a opção MIT do projeto do app para o código do site. A identidade visual não concede direito de representar o projeto. Revisar essa escolha se a estratégia de licenciamento mudar.
