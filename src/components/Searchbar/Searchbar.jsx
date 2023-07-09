import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  ButtonLabel,
  Button,
  Form,
  SearchbarBox,
} from './Searchbar.styled';

export const SearchBar = ({ handleSubmit }) => {
  const [inputQuery, setInputQuery] = useState('');

  const changeInput = event => {
    setInputQuery(event.target.value);
  };

  const inputSubmit = event => {
    event.preventDefault();

    if (event.target.elements.query.value.trim() === '') {
      return;
    }

    handleSubmit(event.target.elements.query.value);

    setInputQuery('');
  };

  return (
    <SearchbarBox>
      <Form onSubmit={inputSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          name="query"
          value={inputQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={changeInput}
        />
      </Form>
    </SearchbarBox>
  );
};

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
