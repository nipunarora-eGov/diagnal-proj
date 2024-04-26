import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSearch,faChevronLeft,faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ onBackButtonClick, handleInputChange,defaultText }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef(null);

  // Function to handle focusing the search input
  const handleSearchIconClick = () => {
    setIsSearchFocused(true);
    // Focus the input field when search icon is clicked
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="header title">
      {/* Back Button */}
      <div className='back-button'>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder={defaultText}
          ref={searchInputRef}
          className={`search-input ${isSearchFocused ? 'focused' : ''}`}
          onChange={handleInputChange}
        />
      </div>

      <FontAwesomeIcon
        icon={faSearch}
        className="search-icon"
        onClick={handleSearchIconClick}
      />
    </div>
  );
};

export default Header;
