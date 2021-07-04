h1. SHAPI
API para executar comandos através de NodeJS.
Para executar o comando é usado o endpoint da api, lembrando que o comando desejado precisa estar instalado na máquina Host para ser executado. Também é permitido a passagem de parâmetros como Array através do `body` da requisição.

h1. ENV
É possível configurar algumas variáveis de ambiente para executar o servico.
h2. PORT
Permite configurar em qual porta o serviço vai rodar. Porta padrão 1337.
```shell
PORT=8080 node shapi.js
```
h2. LOG
Permite que seja logado o conteúdo recebido pela API. Valor padrão 6.
```shell
LOG=3 node shapi.js
```
Nesse exemplo é permitido apenas fazer o log de erros
h1. Exemplo
Nesse exemplo iremos simplesmente chamar o comando de notificação dentro de um sistema operacional Linux com o comando `notify-send` usando shapi.

Primeiro executamos a api em um terminal:
```shell
node shapi.js
```

Em seguida em outro terminal executamos o comando com os parâmetros desejados:
```shell
curl localhost:1337/notify-send -d '"Está na hora de tomar água!",-t 10000'
```
Neste exemplo a API irá executar um notificação com a mensagem "Está na hora de tomar água!" e ficará visível por 10 segundos. Seguinta as especificações do comando `notify-send`
