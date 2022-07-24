import React from 'react';
import DirectoryItem from '../directory-item/directory-item.component';
import categories from '../../assets/categories.json';

import { DirectoryContainer } from './directory.styles';

const Directory = () => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
