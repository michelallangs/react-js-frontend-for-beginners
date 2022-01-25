import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  };

  getUsers() {
    this.setState({
      loading: true
    })

    axios('https://api.randomuser.me/?nat=US&results=5')
    .then(response => this.setState({
      users: [...this.state.users, ...response.data.results],
      loading: false
    }))
  }

  handleSubmit(e) {
    e.preventDefault();

    this.getUsers();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const {loading, users} = this.state;

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="load users" />
        </form>

        {!loading 
          ? users.map(user => (
            <div key={user.id.value}>
              <hr />
              <p><strong>Nome:</strong> {`${user.name.first} ${user.name.last}`}</p>
              <p><strong>Celular:</strong> {user.cell}</p>
            </div>
          ))
          : (
            <Loading message="Carregando..."/>
          )
        }
      </div>
    )
  }
}

export default App;