import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import ParticlesBg from 'particles-bg';
import { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '7c2f80f017164bc6b99de474dd90e686',
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'login',
      isLoggedIn: false,
      user: {
        id: '',
        email: '',
        name: '',
        entries: 0,
        joined: '',
      },
    };
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000')
  //     .then((response) => response.json())
  //     .then(console.log);
  // }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - [clarifaiFace.right_col * width],
      bottomRow: height - [clarifaiFace.bottom_row * height],
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(this.state.box);
  };

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    console.log(this.state.imageURL);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            });
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log('Error, ', err));
  };

  onRouteChange = (status) => {
    if (status === 'login') {
      this.setState({ isLoggedIn: false });
    } else if (status === 'home') {
      this.setState({ isLoggedIn: true });
    }
    this.setState({ route: status });
  };

  render() {
    const { imageURL, box, route, isLoggedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg className="particles" type="lines" bg={true} />
        <Navigation
          route={route}
          onRouteChange={this.onRouteChange}
          isLoggedIn={isLoggedIn}
        />
        <Logo />
        {route === 'home' ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              userName={this.state.user.name}
            />
            <FaceRecognition imageURL={imageURL} box={box} />
          </div>
        ) : route === 'login' ? (
          <Login onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
