# Backstage - Você mais próximo do seu artista.

Este projeto é um app de música simples em React Native, que permite ao usuário navegar por gêneros musicais, ouvir músicas no YouTube e avaliar suas faixas favoritas.

## Principais Recursos:

### Autenticação:

Login e Registro de usuários com AsyncStorage para armazenar credenciais.

### Navegação:

Criação de telas para login, registro, seleção de gênero, reprodução e avaliação.
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/e900d5a5-0824-417e-9309-92a9448cb5ee)
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/fafd7c40-86f1-4299-8c35-6d0d47e904a8)

Utilização de NavigationContainer, createBottomTabNavigator e createStackNavigator para navegação entre telas.

### Seleção de Gênero:

Apresenta uma lista de gêneros musicais com botões para navegar para a tela de reprodução.
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/32f0665a-857d-4d0a-ad1e-e21452145d9a)


### Reprodução de Música:

Seleciona uma música aleatória do gênero escolhido.
Nesse caso, selecionamos "FAV"
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/8fd35f9d-a11f-4fc7-8b74-594eccc22070)


Exibe o título e o artista da música.

Permite abrir a música no YouTube através do botão "Ouvir no YouTube".

### Avaliação:

![image](https://github.com/GabrielBalbine/backstage/assets/103226641/13c2748f-7cd2-4f69-b162-63d4934a2e81)

Permite que o usuário avalie a música de 1 a 5 estrelas.

Armazena as avaliações no AsyncStorage para visualização posterior.

### Animações:

Utiliza a biblioteca react-native-reanimated para criar animações suaves para entrada e saída de elementos.

### Visualização de Avaliações:

Tela que mostra as avaliações salvas, com o título da música e a nota atribuída.

![image](https://github.com/GabrielBalbine/backstage/assets/103226641/dc305fa4-c307-4e13-98ee-dbe943a674ee)


Caso não haja avaliações, mostra uma mensagem informando.

## Como executar o projeto:

### Instale o Expo CLI:

npm install expo-cli --global
content_copy

### Clone este repositório:

git clone https://github.com/gabrielbalbine/backstage
content_copy

### Navegue para o diretório do projeto:

cd music-app
content_copy

### Inicie o app:

expo start
content_copy

## Tecnologias:

React Native

Expo

React Navigation

AsyncStorage

react-native-reanimated

react-native-paper (para a tela de avaliações)

## Próximos Passos:

Implementar a funcionalidade de reprodução de música no próprio app (sem redirecionar para o YouTube).

Adicionar a opção de criar playlists.

Melhorar a interface do usuário com estilos personalizados.

Implementar a integração com uma API de música para buscar informações de músicas e artistas.

## Observações:

Este projeto foi criado para fins educacionais e demonstrativos.

As músicas utilizadas no projeto são apenas para demonstração e devem ser substituídas por músicas com direitos autorais permitidos.

O armazenamento de dados no AsyncStorage é simples e pode não ser ideal para projetos mais complexos.

O código utiliza animações simples para fins didáticos, e pode ser aprimorado com animações mais elaboradas.

Enjoy the Music!
