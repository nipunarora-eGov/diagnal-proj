import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faSearch,
  faChevronLeft,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';

const Header = ({
  onBackButtonClick,
  handleInputChange,
  defaultText,
  setQuery,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const searchInputRef = useRef(null);
  const hintsRef = useRef(null);

  // Function to handle focusing the search input
  const handleSearchIconClick = () => {
    setIsSearchFocused(true);
    setShowHint(true);
    // Focus the input field when search icon is clicked
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // const handleHintClick = (hint) => {
  //   searchInputRef.current.value = hint
  // }

  const handleBlur = () => {
    setIsSearchFocused(false);
  };

  // Function to handle hiding the search hints container when clicked outside
  const handleClickOutside = (event) => {
    if (hintsRef.current && !hintsRef.current.contains(event.target)) {
      setShowHint(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const searchHints = ['The Birds', 'Rear Window', 'Family Pot'];

  return (
    <dummy ref={hintsRef} >
      <div className="header title" ref={hintsRef}>
        {/* Back Button */}
        <div className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>

        {/* Search Input */}
        <div className={`search-container ${isSearchFocused ? 'search-container-focused' : ""}`}>
          <input
            type="text"
            placeholder={defaultText}
            ref={searchInputRef}
            className={`search-input ${isSearchFocused ? 'focused' : ''}`}
            onChange={(e) => {
              setShowHint(false);
              handleInputChange(e);
            }}
            onBlur={handleBlur}
            minLength={0} 
            maxLength={20} 
          />
        </div>

        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={handleSearchIconClick}
        />
      </div>
      {showHint && (
        <div className="search-hints-container">
          <div className="suggestions-label">Suggestions</div>
          <div className="search-hints">
            {searchHints.map((hint, index) => (
              <div key={index} className="search-hint-container">
                <div className="search-hint">{hint}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </dummy>
  );
};

export default Header;
