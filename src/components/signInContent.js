import React from 'react';

const signInContent = () => {
  return (
    <select
      value={book.shelf || 'none'}
      onChange={(e) => {
        updateBookShelf(book, e.target.value);
      }}
    >
      <option value='chooseUser' disabled>
        Select User to Login
      </option>
      <option value={user.id}>{user.name}</option>
    </select>
  );
};

export default signInContent;
