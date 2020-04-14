import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem'
import axios from 'axios'
import ImageResult from '../image-results/ImageResult';

 class Search extends Component {
state = {
      searchText: '',
      amount:15,
      images: []
   }

onTextChange = e => {
    const apiUrl ='https://pixabay.com/api';
    const val = e.target.value;
    const apiKey = `15994548-dfa10e3f48c65a21709c30581`
    this.setState({ [e.target.name]: val }, () => {
      if (val === '') {
        this.setState({ images: [] });
      } else {
        axios
          .get( 
            `${apiUrl}/?key=${apiKey}&q=${
              this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
          )
          .then(res => this.setState({ images: res.data.hits }))
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ amount: value });

    render() {
        console.log(this.state.images);
        return (
            <div>
              <TextField
              name="searchText"
              value={this.state.searchText}
              onChange={this.onTextChange}
              floatingLabelText='Search For Images'
              fullWidth={true} />  
           
            <br />
            <SelectField
              name="amount"
              floatingLabelText="Amount"
              value={this.state.amount}
              onChange={this.onAmountChange}>
              <MenuItem value={5} primaryText="5" />
              <MenuItem value={10} primaryText="10" />
              <MenuItem value={15} primaryText="15" />
              <MenuItem value={30} primaryText="30" />
              <MenuItem value={50} primaryText="50" />
            </SelectField>
            <br />
            {this.state.images.length > 0 ? (
              <ImageResult images={this.state.images} />
            ) : null}
          </div>
        );
    }
}

export default Search
