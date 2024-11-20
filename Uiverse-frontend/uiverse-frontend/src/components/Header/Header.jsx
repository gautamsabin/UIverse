import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "./header.css";

import user_profile from "../../assets/images/user-profile.svg";
import logo from "../../assets/images/logo.svg";
import SearchTooltip from "../SearchTooltip/SearchTooltip";
import { UiverseContext } from "../../Context/Context";
import { AiOutlineHeart } from "react-icons/ai";
import { Dropdown } from "antd";

const Header = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchField, setSearchField] = useState("");

  const { setSearchValue, token, logout } = useContext(UiverseContext);

  useEffect(() => {
    setSearchValue(searchField);
  }, [searchField]);

  const inputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const items = [
    {
      key: "1",
      label: "Log out",
      onClick: () => logout(),
    },
  ];

  console.log("token from header is =====> ", token);
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="header-logo" className="header-img" />
      </Link>

      <div className="right-section">
        <div
          className={
            !isSearching
              ? "tooltip-container"
              : "tooltip-container search-active"
          }
          ref={inputRef}
        >
          <input
            className="search-bar"
            placeholder="Search"
            onClick={() => setIsSearching(true)}
            onChange={(e) => setSearchField(e.target.value)}
          />
          {isSearching && <SearchTooltip setIsSearching={setIsSearching} />}
        </div>

        {!isSearching && (
          <>
            <div className="mid-section">
              <span className="web-section">Web</span>
              <span className="app-section">App</span>
            </div>
            {token === "" ? (
              <Link to="/signin">
                <button className="signin-btn">Sign in</button>
              </Link>
            ) : (
              <div className="logged-in-header">
                <Link to="/favourite">
                  <AiOutlineHeart className="watch-favourites" />
                </Link>
                <Dropdown menu={{ items: items }} placement="bottom">
                  <img
                    src={user_profile}
                    alt="profile"
                    className="profile-image"
                  />
                </Dropdown>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
