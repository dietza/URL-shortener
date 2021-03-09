import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: '',
      urlToShorten: '',
      error: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    const newUrl = {
      id: Date.now(),
      long_url: this.state.urlToShorten,
      title: this.state.title
    }

    this.checkInputs();
    if (this.state.error === '') {
      this.props.shortenNewUrl(newUrl);
      this.clearInputs();
    }
  }

  checkInputs = () => {
    if ((this.state.title === '') && (this.state.urlToShorten)) {
      this.setState({error: 'Please fill in a title!'})
    } else if ((this.state.title) && (this.state.urlToShorten === '')) {
      this.setState({error: 'Please fill in a URL for us to shorten!'})
    }
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          className='title-input'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          className='urlToShorten-input'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button 
        onClick={e => this.handleSubmit(e)}
        className='submit-btn'>
          Shorten Please!
        </button>

        {this.state.error &&
        <h3 className="error-message">{this.state.error}</h3>}

      </form>
    )
  }
}

export default UrlForm;
