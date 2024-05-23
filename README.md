# Backstage - Você mais próximo do seu artista.

Este projeto é um app de música simples em React Native, que permite ao usuário navegar por gêneros musicais, ouvir músicas no YouTube e avaliar suas faixas favoritas.

## Principais Recursos:

### Autenticação:

Login e Registro de usuários com AsyncStorage para armazenar credenciais.

### Navegação:

Criação de telas para login, registro, seleção de gênero, reprodução e avaliação.

#### Tela de Registro
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/e74a6022-cad3-4f22-8dd6-3dcd952fe9b7)

#### Tela de Login
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/b22b7515-4eea-4f89-9c0b-05472beb8d34)

Utilização de NavigationContainer, createBottomTabNavigator e createStackNavigator para navegação entre telas.

### Seleção de Gênero:

Apresenta uma lista de gêneros musicais com botões para navegar para a tela de reprodução.

#### Tela de Seleção de Gênero
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/e09e0ba2-bab3-4481-ac66-396fdb538ce9)

### Reprodução de Música:

Seleciona uma música aleatória do gênero escolhido.
Nesse caso, selecionamos "FAV"

#### Opções na música
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/3313605d-d1bf-4281-bfaa-f2a15e4fd1f5)

Exibe o título e o artista da música.

Permite abrir a música no YouTube através do botão "Ouvir no YouTube".

### Avaliação:

#### Tela de Avaliação da música
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/59c74a99-4446-4cfc-9f1e-f3f1390d8850)

Permite que o usuário avalie a música de 1 a 5 estrelas.

Armazena as avaliações no AsyncStorage para visualização posterior.

### Animações:

Utiliza a biblioteca react-native-reanimated para criar animações suaves para entrada e saída de elementos.

### Visualização de Avaliações:

Tela que mostra as avaliações salvas, com o título da música e a nota atribuída.

#### Tela com availiações feitas pelo usuário
![image](https://github.com/GabrielBalbine/backstage/assets/103226641/8706eeba-fba6-4494-907b-7a7be1228648)

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
