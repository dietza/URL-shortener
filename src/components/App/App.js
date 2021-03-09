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
    getUrls()
    .then(data => this.setState({ urls: data.urls }))
    .catch(error => console.log(error))
  }

 shortenNewUrl = (newUrl) => {
    postNewUrl(newUrl)
      .then(response => {
        if (response.ok) {
          console.log('POST RESPONSE >>>', response.json)
          return response.json();
        }
      })
      .then(() => this.setState({ urls: [...this.state.urls, newUrl] }));
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
