# Bluegame: Desafio Chatbot
Preparado para ganhar um alienware? Se sim, este será seu primeiro desafio. Leia atentamente as instruções abaixo e boa sorte!

## Passo a Passo

1. Vocé precisará de uma conta na IBM Cloud. Caso ainda não tenha, corra e crie logo a sua clicando [aqui][sign_up]. É necessário ter uma conta aqui no GitHUb.

2. Baixe e instale a ferramenta [Cloud-foundry CLI][cloud_foundry], caso ainda não tenha feito.

3. Faça um fork (Opção no canto superior à direita, para copiar este projeto para a sua conta GitHub) deste projeto e clone (o fork que você acabou de criar) para sua máquina.

4. Crie o serviço Watson Conversation (Free) em sua conta clicando [aqui][conversation-link]. Permaneça na página para qual foi direcionado após a criação do serviço.

5. Clique em `Service credentials`, agora clique em New Credential (o botão azul que fica do lado direito da página). Após aparecer a modal de criação (modal com título Add new credential), apenas clique em `Add`.

6. Uma vez criada a credencial, clique na action `View credentials`. Copie o JSON gerado para um arquivo temporário, logo iremos usá-lo.

7. Ainda na mesma página, clique na opção Manager / Gerenciar, na lateral à esquerda acima.

8. Clique em `Launch Tool`. Caso abra uma tela de login, clique em `Log in with IBM ID`.

9. Você agora está na dashboard do serviço Watson Conversation. Você verá o título `Workspaces` e do lado dois botões: `Create` e `Ícone de upload`. Clique no ícone de upload e escolha o arquivo `workspace-initial.json` que está no repo que você clonou logo no começo, lembra? Uma vez selecionado o arquivo clique em `Import`.

10. Você deverá ver a seguinte mensagem: `Workspace "Bluegame" imported successfully from file workspace-initial.json.`. Agora você está na tela para a criação de toda a lógica para um chatbot. Você é livre para adiconar novos flows, deste que não modifique o que já foi feito, caso contrário sua validação será comprometida. No canto superior esquerdo clique em `Watson Conversation`. Agora você voltou para a dashboard.

11. No Workspace `bluegame` recém criado, clique no ícone dos três pontinhos e selecione a opção `View details`.

12. Agora você está vendo uma box azul com informações tais como: "Created", "Last modified", "Workspace ID". Copie o valor do `Workspace ID` para o mesmo arquivo temporário onde salvou o JSON gerado quando criou o serviço.

13. Crie um arquivo chamado `.env` no diretório root do repo clonado, usando o arquivo `env.sample` como template, usando o comando:

  ```none
  cp env.sample .env
  ```

O arquivo `.env` deve conter, em um primeiro momento, o seguinte conteúdo:

  ```none
    CONVERSATION_USERNAME=
    CONVERSATION_PASSWORD=
    CONVERSATION_WORKSPACE_ID=
  ```

14. Lembra do arquivo temporário, agora iremos usá-lo. Copie o valor `username`, `password` e `Workspace ID` para as respectivas variáveis `CONVERSATION_USERNAME`, `CONVERSATION_PASSWORD`, e `CONVERSATION_WORKSPACE_ID` no arquivo `.env`.
Agora o arquivo `.env` deverá estar assim:

  ```none
    CONVERSATION_USERNAME=<VALOR USERNAME COPIADO SEM ÁSPAS>
    CONVERSATION_PASSWORD=<VALOR PASSWORD COPIADO SEM ÁSPAS>
    CONVERSATION_WORKSPACE_ID=<VALOR WORKSPACE ID COPIADO SEM ÁSPAS>
  ```

15. Estamos quase lá. Agora edite o arquivo `manifest.yml` e mude `<sua-id>` para que seja a mesma id que você recebeu no assunto em seu email de comfirmação de inscrição. Esse passo é muito importante para posterior validação de seu desafio.
  ```yaml
  ---
applications:
    - name: <sua-id>-conversation
      path: .
      memory: 256M
      instances: 1
      buildpack: sdk-for-nodejs
      route: mybluemix.net
      command: npm start
      disk_quota: 1024M
  ```

16. A partir de agora você precisa instalar (caso ainda não tenha) o NodeJS e o geranciador de pacotes NPM. Siga as instruções disponíveis em https://docs.npmjs.com/getting-started/installing-node. Detalhe muito importante, você precisa pelo menos da versão 8.9.4 do node.

17. Com tudo instalado. Execute o seguinte comando, na pasta do projeto, para instalar as dependências do projeto:

  ```none
  npm install
  ```

18. Para executar a aplicação localmente execute o comando:

  ```none
  npm run dev
  ```
19. Acesse o endereço [http://localhost:8080](http://localhsot:8080).

20. Para testar sua applicação, digite `oi`. Você deve receber uma mensagem diferente de `Humm... Houve um erro, tente novamente.`. Caso veja essa mensagem, verifique os passos acima.

21. Precisamos agora logar na IBM Cloud, para isto execute o seguinte comando.
```none
cf api https://api.ng.bluemix.net
cf login
```

22. Após feito o login, execute o seguinte comando para fazer o deploy de sua aplicação.
```sh
    npm run build && cf push
```
23. Veja que legal, você consiguiu terminar o desafio, agora acesse a página do [bluegame][page-link] no facebook e diga para o bot: `acabei`.

[sign_up]: https://console.ng.bluemix.net/registration/
[page-link]: https://www.facebook.com/ibmbluegame/
[dashboard-link]: https://console.bluemix.net/dashboard/apps
[conversation-link]: https://console.bluemix.net/catalog/services/conversation
[cloud_foundry]: https://github.com/cloudfoundry/cli
