import React, { Component } from 'react';
import './App.css';
import { getUrls, postNewUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    this.fetchAllUrls()
  }

  fetchAllUrls = () => {
    getUrls()
    .then(data => this.setState({ urls: data.urls }))
    .catch(error => console.log(error))
  }

 shortenNewUrl = (newUrl) => {
    postNewUrl(newUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(() => this.fetchAllUrls());
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm  shortenNewUrl={newUrl => this.shortenNewUrl(newUrl)}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
