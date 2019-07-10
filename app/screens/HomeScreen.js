import React from 'react';
import {
  ImageBackground,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
} from 'react-native';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/bruce';

import { Legend } from '../components/Legend';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static colors = [
    '#fff200',
    '#ed1c24',
    '#22b14c',
    '#3f48cc',
    '#a349a4',
    '#ffffff',
    '#ffaec9',
    '#b5e61d',
    '#99d9ea',
    '#7092be',
    '#880015',
    '#728107',
    '#ff8000'
  ];

  static resources = [
    require('../assets/images/food.png'),
    require('../assets/images/wood.png'),
    require('../assets/images/coal.png'),
    require('../assets/images/iron.png'),
    require('../assets/images/gold.png'),
    require('../assets/images/bricks.png'),
  ];


  constructor(props, context) {
    super(props, context);
    this.state = {
      buttonPressed: false,
    }
  }

  static randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  buttonPressed(pressed) {
    this.setState({
      buttonPressed: pressed,
    });
  }

  draw(next) {
    this.buttonPressed(true);
    let animatedValue = new Animated.Value(0);
    let lastValue = 0;
    let sum = 0;

    animatedValue.addListener((event) => {
      let delta = event.value - lastValue;
      lastValue = event.value;
      sum += delta;
      if (sum > 6) {
        sum = 0;
        this.setState(this.state);
      }
    });

    Animated.timing(animatedValue, {
      toValue: 100,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      duration: 2000,
    }).start(() => {
      next();
      this.buttonPressed(false);
    });
  }

  render() {
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} style={{with: '100%', height: '100%'}}>
          <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <View style={styles.appContainer}>
                <Image
                    source={require('../assets/images/euro-escape.png')}
                    style={styles.welcomeImage}
                />

                <View style={styles.drawButtonContainer}>
                  <AwesomeButton type='secondary' disabled={this.state.buttonPressed} progress progressLoadingTime={1500} onPress={next => this.draw(next)}>
                    <Text style={styles.drawButtonText}>LOSUJ</Text>
                  </AwesomeButton>
                </View>

                <View style={styles.drewResourceContainer}>
                  <View style={[styles.drewResource, {backgroundColor: HomeScreen.randomElement(HomeScreen.colors)}]}>
                    <Image style={styles.drewResourceImage} source={HomeScreen.randomElement(HomeScreen.resources)}/>
                  </View>
                </View>
              </View>
              <Legend />
            </ScrollView>

          </View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  appContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    marginTop: 3,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  drawButtonContainer: {
  },
  drawButtonText: {
    padding: 75,
    fontSize: 20
  },
  drewResourceContainer: {
    marginTop: 20,
  },
  drewResource: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: '#000',
  },
  drewResourceImage: {
    width: 126,
    height: 128,
    resizeMode: 'contain',
  },
});
