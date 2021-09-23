import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }

  getName = (event) => {
    this.setState({ name: event.target.value });
  };
  getEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  getPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  onRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          console.log('register', user);
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };

  render() {
    return (
      <article className="br3 ba dark-gray b--white mv4 w-100 w-50-m w-25-l mw6 shawdow-5 center">
        <main className="pa4 white">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Name
                </label>
                <input
                  className=" white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="name"
                  name="name"
                  id="name"
                  onChange={this.getName}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className=" white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.getEmail}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="white b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.getPassword}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white"
                type="submit"
                value="Register"
                onClick={this.onRegister}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
