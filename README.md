# NGINX_load_Balancing-com-Docker
Balanceamento de carga simples com NGINX e dois serviços e backend Node.js em contêineres Docker.

# NGINX Load Balancing : Distribuição de Carga com Docker 

Este projeto demonstra o conceito fundamental de 
Balanceamento de Carga utilizando o NGINX como 
proxy reverso e load balancer para distribuir 
requisições entre múltiplos servidores backend (neste 
caso, dois serviços Node.js). A arquitetura é 
totalmente conteinerizada usando Docker e Docker 
Compose.

# Características Principais 
● Balanceamento de Carga: O NGINX é configurado para distribuir o tráfego para os 
servidores backend backend1 e backend2. 
● Algoritmo: Utiliza o algoritmo least_conn (Mínimas Conexões Ativas), que envia a nova 
requisição para o servidor backend com o menor número de conexões ativas no 
momento, otimizando a distribuição de carga1. 
● Servidores Backend: Dois serviços idênticos baseados em Node.js com um servidor 
HTTP simples (em server.js) que retorna uma página HTML estilizada, mostrando o nome 
do host (container ID) para comprovar qual servidor está respondendo à requisição. 
● Contêineres: Todo o ambiente é gerenciado via Docker Compose, criando uma rede 
interna (backendnet) para os serviços.

# Componentes da Arquitetura 
O projeto é composto por três serviços principais: 
1. backend1: Servidor Node.js rodando na porta 8080. 
2. backend2: Servidor Node.js rodando na porta 8080. 
3. nginx-load-balancer: Contêiner NGINX que escuta na porta 80 do host e direciona o 
tráfego para os serviços backend.

# Como Executar o Projeto 
1. Pré-requisitos: Certifique-se de ter o Docker e o Docker Compose instalados. 

2. Clonar o Repositório: 
Bash 
git clone 
https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line
to-import-source-code/adding-locally-hosted-code-to-github 
cd [pasta do projeto] 

3. Subir os Contêineres: 
Bash 
docker-compose up --build -d 
Isso irá construir as imagens dos backends e iniciar os três contêineres: backend1, 
backend2 e nginx-load-balancer. 

4. Acessar a Demonstração: 
Abra seu navegador e acesse: http://localhost:80 
Ao recarregar a página, o NGINX aplicará o algoritmo least_conn e você verá o Servidor 
Atual alternar entre os nomes de host de backend1 e backend2, demonstrando o balanceamento de carga em ação.

#Para Parar e Remover os Contêineres 
Bash 
docker-compose down
