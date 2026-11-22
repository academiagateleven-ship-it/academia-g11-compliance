# GitHub Pages + Supabase — preparação de publicação externa

22/11/2026. Reutiliza a Academia existente; não cria outra base de dados.

## Publicação

Repositório: `academiagateleven-ship-it/academia-g11-compliance`.
Pasta de publicação: `docs`, ramo `main`, com `.nojekyll`.
Endereço previsto: https://academiagateleven-ship-it.github.io/academia-g11-compliance/
O endereço só fica operacional depois de ativar Pages e de o deployment terminar.

GitHub Free requer um repositório público para Pages. Apenas a entrada, o adaptador e documentação técnica podem estar no Git público. A migração histórica de fundação contém esquema sem pessoas ou credenciais e não deve ser novamente executada.

## Recursos privados

O bucket `g11-hub-assets` é privado. A versão `c13ba103-pages-1` deriva do `dist` publicado no Sites no commit `c13ba103c3e783dfee20239450125d6381092339`. São 108 ficheiros, 123803449 bytes, incluindo HTML, JS, imagens, PDFs e ZIPs. Não contém os ficheiros reservados de `integracao/reservado` nem a tabela RH. O armazenamento replica recursos de publicação, não cria registos RH ou de formação paralelos.

RLS permite leitura apenas a contas com perfil ativo. Não há escrita por clientes neste bucket. O bucket documental operacional anterior e as suas regras por localização são mantidos. A Área pessoal do Formador continua sob a proteção específica do titular na base de dados.

A entrada utiliza o mesmo Supabase Auth, Sendys e palavras-passe. Não cria nem altera contas reais. O mapa técnico da identidade existente é preservado. O Service Worker fornece os recursos privados com o JWT do próprio utilizador; cada cliente do navegador tem a sua autorização em memória. Não existe cache offline dos recursos privados nem JWT em URL. PDFs/ZIPs abrem por URL assinada válida durante 60 segundos, após verificação RLS.

Este adaptador exige HTTPS e Service Workers num navegador atualizado. O origin GitHub é diferente do Sites: a autenticação é novamente pedida, e os dados antigos guardados apenas no navegador não são transferidos automaticamente. Não se afirma que os ecrãs ainda locais tenham passado a ser centrais. Supabase Auth, permissões, registos centrais e importação Kahoot usam o mesmo backend.

## Manutenção

As fontes completas da Academia permanecem no repositório original do Sites; esta publicação é um adaptador da mesma versão. Para atualizar: obter o `dist` desse repositório, executar `node integracao/github-pages/build.cjs`, transferir os recursos para uma nova versão privada por um meio administrativo autorizado e copiar `integracao/github-pages/public` para `docs` neste repositório. Alterar o identificador de release no build e no meio de transferência. Rever o conjunto publicado antes de tornar público. Nunca incluir `protected`, RH, ficheiros do formador, sessões de login ou credenciais administrativas no Git.

O ajudante de transferência é temporário, limitado por manifesto SHA256, capacidade aleatória e prazo. Depois da verificação deve devolver sempre HTTP410. Não faz parte da operação normal do HUB. Os templates não contêm a capacidade nem a chave administrativa.

Testes: `tests/pages.cjs`, com Playwright Core1.56.1, Chrome isolado e conta técnica temporária. O proxy local do ensaio encaminha para o Supabase real porque o ambiente bloqueia rede direta do navegador. A validação do endereço GitHub publicado é um passo separado.
