import React, { useState, useEffect } from 'react';
import { TextInput, Text, View, Button, FlatList, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import { Card } from 'react-native-paper'; // Import para usar Card

const musicLibrary = {
  Rock: [
    { title: "Bohemian Rhapsody", artist: "Queen", url: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
    { title: "Stairway to Heaven", artist: "Led Zeppelin", url: "https://www.youtube.com/watch?v=xbhCPt6PZIU" },
    {title: "Mammamia", artist: "Maneskin", url:"https://www.youtube.com/watch?v=Ex037JX3-BI&pp=ygUSbWFtbWEgbWlhIG1hbmVza2lu"}
  ],
  Pop: [
    { title: "Blinding Lights", artist: "The Weeknd", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ" },
    { title: "Bad Guy", artist: "Billie Eilish", url: "https://www.youtube.com/watch?v=DyDfgMOUjCI" },
    {title: "Wake up in the sky", artist:"Bruno Mars ft Gucci Mane & Kodak Black", url:"https://www.youtube.com/watch?v=U68MJz9DrI4&pp=ygUSd2FrZSB1cCBpbiB0aGUgc2t5"}
  ],
  Rap: [
    {title: "Mockingbird", artist:"Eminem", url:"https://www.youtube.com/watch?v=S9bCLPwzSC0&pp=ygULbW9ja2luZ2JpcmQ%3D"},
    {title:"Still D.R.E", artist:"Snoop Dogg ft Dr Dre", url: "https://www.youtube.com/watch?v=_CL6n0FJZpk&pp=ygUKc25vb3AgZG9nZw%3D%3D"},
    {title: "Jorge da Capadócia", artist:"Racionais Mc's", url:"https://www.youtube.com/watch?v=goICQUk6NYk&pp=ygUSam9yZ2UgZGEgY2FwYWRvY2lh"}
  ],
  Sertanejo:[
    {title: "Infiel", artist:"Marilia Mendonça", url:"https://www.youtube.com/watch?v=eCyMh-mZ1B0&pp=ygURbWFyaWxpYSBtZW5kb27Dp2E%3D"},
    {title:"Fio de Cabelo", artist:"Chitãozinho e Chororó", url:"https://www.youtube.com/watch?v=48kf5eG5yeY&pp=ygUfdW0gZmlvIGRlIGNhYmVsbyBubyBtZXUgcGFsZXTDsw%3D%3D"},
    {title:"Mulher Maravilha", artist:"Zé Neto e Cristiano", url:"https://www.youtube.com/watch?v=Fzmvv8fSyQs&pp=ygUQbXVsaGVyIG1hcmF2aWxoYQ%3D%3D"}
  ],
  Pagode:[
    {title: "Deixa Alagar", artist:"Grupo Revelação", url:"https://www.youtube.com/watch?v=bOhasdCq1OU&pp=ygUMZGVpeGEgYWxhZ2Fy"},
    {title: "Fala Baixinho", artist:"Grupo Revelação", url:"https://www.youtube.com/watch?v=ZWvU8JuFxwA&pp=ygUlY2FyYSBuYSBjYXJhIHBlbGUgbmEgcGVsZSByZXZlbGHDp8Ojbw%3D%3D"},
    {title:"Senti Amor", artist:"Péricles", url:"https://www.youtube.com/watch?v=T3Y6RRSDm4o&pp=ygUZZnVpIG1haXMgdW0gbmFzIHN1YXMgbWFvcw%3D%3D"}
  ],
  Funk:[
    {title: "Ritmista 1.0", artist:"Mc Hariel e diversos Mc's", url:"https://www.youtube.com/watch?v=lQ1-YSXaxT8&pp=ygUMcml0bWlzdGEgMS4w"},
    {title:"Amor é Mentira",artist:"Dj Arana ft Mc Livinho", url:"https://www.youtube.com/watch?v=RE0v_LaBKtM&pp=ygUPYW1vciDDqSBtZW50aXJh"},
    {title:"Areia Branquinha", artist:"Mc PP da VS", url:"https://www.youtube.com/watch?v=fZY8DsJyVEk&pp=ygUQYXJlaWEgYnJhbnF1aW5oYQ%3D%3D"}
    ],
  FAV:[
    {title: "Humanos não Matam Deuses", artist:"Baco Exu do Blues", url:"https://www.youtube.com/watch?v=sl4Ccgljd5U&pp=ygUYaHVtYW5vcyBuYW8gbWF0YW0gZGV1c2Vz"},
    {title: "Surreal", artist:"Luisa Sonza ft Baco Exu do Blues", url:"https://www.youtube.com/watch?v=H0sTP0mgtdI&pp=ygUHc3VycmVhbA%3D%3D"},
    {title:"Dois Amores", artist:"Baco Exu do Blues", url:"https://www.youtube.com/watch?v=ztqljksP8P4&pp=ygULZG9pcyBhbW9yZXM%3D"}
  ],
  GOAT:[
    {title:"Shake it Bololo", artist:"Clássicos da MPB", url:"https://www.youtube.com/watch?v=oowBXzfcl90&pp=ygUPc2hha2UgaXQgYm9sb2xv"},
    {title:"Mc Poze anos 80", artist:"Mc Poze", url:"https://www.youtube.com/watch?v=WZIGwN-5Ioo&pp=ygUPbWMgcG96ZSBhbm9zIDgw"}
      ]
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//Começa a magia
class MainStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Backstage!</Text>
        <Animated.View entering={FadeIn.duration(500).springify()} exiting={FadeOut.duration(500)} style={styles.inputContainer}>
          <Text style={styles.label}>Seu Nome:</Text>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ username: text })} />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500).springify()} exiting={FadeOut.duration(500)} style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(text) => this.setState({ password: text })}
            secureTextEntry={true} 
          />
        </Animated.View>
        <Animated.View entering={SlideInUp.duration(500).springify()} exiting={SlideOutDown.duration(500)} style={styles.buttonContainer}>
          <Button title="Entrar" onPress={() => this.login()} style={styles.loginButton} />
        </Animated.View>
      </View>
    );
  }

  async login() {
    // Tenta recuperar a senha armazenada para o nome de usuário
    try {
      let storedPassword = await AsyncStorage.getItem(this.state.username);
      if (storedPassword !== null) {
        // Verifica se a senha inserida é a mesma da armazenada
        if (storedPassword === this.state.password) {
          // Navega para a tela de gêneros
          this.props.navigation.navigate('Genres');
        } else {
          alert("Senha incorreta!");
        }
      } else {
        alert("Usuário não encontrado!");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

// Classe pra login
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: '',
      newPassword: '',
    };
  }

  async register() {
    // Armazena o novo usuário e senha no AsyncStorage
    try {
      await AsyncStorage.setItem(this.state.newUser, this.state.newPassword);
      alert("Conta criada com sucesso!");
    } catch (error) {
      alert("Erro ao criar a conta!");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Crie sua conta!</Text>
        <Animated.View entering={FadeIn.duration(500).springify()} exiting={FadeOut.duration(500)} style={styles.inputContainer}>
          <Text style={styles.label}>Nome de usuário:</Text>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ newUser: text })} />
        </Animated.View>
        <Animated.View entering={FadeIn.duration(500).springify()} exiting={FadeOut.duration(500)} style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(text) => this.setState({ newPassword: text })}
            secureTextEntry={true} 
          />
        </Animated.View>
        <Animated.View entering={SlideInUp.duration(500).springify()} exiting={SlideOutDown.duration(500)} style={styles.buttonContainer}>
          <Button title="Registrar" onPress={() => this.register()} style={styles.loginButton} />
        </Animated.View>
      </View>
    );
  }
}

// Navega pelas opcoes de musica
class AppNavigation extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={MainStage} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Genres" 
          component={GenreSelection} 
          options={({ navigation }) => ({ 
            headerShown: true, // Mostrar a barra de navegação
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Evaluations')}>
                <MaterialCommunityIcons name="star-outline" size={24} color="#ff8c00" />
              </TouchableOpacity>
            ),
          })} 
        />
        <Stack.Screen name="NowPlaying" component={NowPlaying} options={{ headerShown: false }} />
        <Stack.Screen name="RateTheMusic" component={RateTheMusic} options={{ headerShown: false }} /> 
        <Stack.Screen name="Evaluations" component={EvaluationsScreen} options={{ title: 'Avaliações' }} />
      </Stack.Navigator>
    );
  }
}

// Funcao pra selecionar genero
function GenreSelection({ navigation }) {
  const genres = Object.keys(musicLibrary);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um gênero:</Text>
      <FlatList
        data={genres}
        renderItem={({ item }) => (
          <View style={styles.genreItem}> 
            <Button 
              title={item} 
              onPress={() => navigation.navigate('NowPlaying', { genre: item })} 
              style={styles.genreButton} 
            />
          </View>
        )}
        keyExtractor={item => item}
      />
    </View>
  );
}

// SOLTA A BATIDA
function NowPlaying({ route, navigation }) {
  const { genre } = route.params;
  const randomTrack = musicLibrary[genre][Math.floor(Math.random() * musicLibrary[genre].length)];

  return (
    <View style={styles.container}>
      <Text style={styles.trackTitle}>{randomTrack.title}</Text>
      <Text style={styles.artist}>{randomTrack.artist}</Text>
      <Animated.View entering={SlideInUp.duration(500).springify()} exiting={SlideOutDown.duration(500)} style={styles.buttonContainer}>
        <Button 
          title="Ouvir no YouTube" 
          onPress={() => Linking.openURL(randomTrack.url)} 
          style={styles.listenButton}
        />
      </Animated.View>
      <Animated.View entering={SlideInUp.duration(500).springify()} exiting={SlideOutDown.duration(500)} style={styles.buttonContainer}>
        <Button 
          title="Avaliar"
          onPress={() => navigation.navigate('RateTheMusic', { track: randomTrack })} 
          style={styles.rateButton}
        />
      </Animated.View>
    </View>
  );
}

// Funcao pra avaliacao
function RateTheMusic({ route, navigation }) {
  const { track } = route.params;

  const ButtonRating = ({ rating }) => (
    <Animated.View entering={SlideInUp.duration(500).springify()} exiting={SlideOutDown.duration(500)} style={styles.buttonContainer}>
      <Button
        title={`${rating}`}
        onPress={() => {
          console.log(`Avaliado com: ${rating}`);
          navigation.navigate('Genres');
          alert(`Avaliado com: ${rating}`);
          saveEvaluation(route.params.track.title, rating); // Salva a avaliação
        }}
        style={styles.rateButton}
      />
    </Animated.View>
  );

  // Salve de forma async as avaliacoes
  const saveEvaluation = async (title, rating) => {
    try {
      const storedEvaluations = await AsyncStorage.getItem('evaluations');
      let evaluations = storedEvaluations ? JSON.parse(storedEvaluations) : [];
      evaluations.push({ title, rating });
      await AsyncStorage.setItem('evaluations', JSON.stringify(evaluations));
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.trackTitle}>{track.title}</Text>
      <ButtonRating rating={1} />
      <ButtonRating rating={2} />
      <ButtonRating rating={3} />
      <ButtonRating rating={4} />
      <ButtonRating rating={5} />
    </View>
  );
}

// Tela de avaliações
function EvaluationsScreen({ navigation }) {
  const [evaluations, setEvaluations] = useState([]);

  // Carrega as avaliações do armazenamento local (AsyncStorage)
  useEffect(() => {
    const loadEvaluations = async () => {
      try {
        const storedEvaluations = await AsyncStorage.getItem('evaluations');
        if (storedEvaluations) {
          setEvaluations(JSON.parse(storedEvaluations));
        }
      } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
      }
    };
    loadEvaluations();
  }, []);

  // Renderiza a lista de avaliações
  const renderItem = ({ item }) => (
    <Card style={styles.evaluationCard}>
      <Card.Content>
        <Text style={styles.evaluationTitle}>{item.title}</Text>
        <Text style={styles.evaluationRating}>Avaliação: {item.rating}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliações</Text>
      <FlatList
        data={evaluations}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ListEmptyComponent={() => <Text style={styles.emptyText}>Sem avaliações ainda.</Text>}
      />
    </View>
  );
}

// Tal da main 
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Já sou do club!') {
                iconName = focused ? 'home-account' : 'home-account-outline';
              } else if (route.name === 'Quero me juntar ao club!') {
                iconName = focused ? 'account-details' : 'account-outline';
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ff8c00',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Já sou do club!" 
            component={AppNavigation} 
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen 
            name="Quero me juntar ao club!" 
            component={SignUp} 
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

// Estilização pq eu sou filho de Deus tbm ne
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff8c00',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#fff',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ff8c00', 
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#ff8c00',
  },
  genreButton: {
    backgroundColor: '#ff8c00',
    padding: 10,
    borderRadius: 5,
    flex: 1, 
    textAlign: 'center', 
  },

  genreItem: {
    width: '100%',
    marginBottom: 10,
  },
  trackTitle: {
    fontSize: 20, 
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  artist: {
    fontSize: 14,
    marginBottom: 15,
    color: '#fff',
  }, 
  listenButton: {
    backgroundColor: '#4CAF50',
    padding: 10, 
    borderRadius: 5,
  },
  rateButton: {
    backgroundColor: '#FF9800',
    padding: 10, 
    borderRadius: 5,
  },
  evaluationCard: {
    marginBottom: 10,
  },
  evaluationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  evaluationRating: {
    fontSize: 14,
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default App;