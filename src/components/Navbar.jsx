import { signOut } from "firebase/auth";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { AuthContext } from "../utils/UserContext";

export default function Navbar({ isScrolled }) {
  const { User } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For toggling the dropdown
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  useEffect(() => {
    if (User != null) {
      setProfilePic(User.photoURL);
    }
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, [User]);

  const transitionNavBar = () => {
    if (window.scrollY > 80) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const SignOut = () => {
    signOut(firebaseAuth).then(() => {
      navigate("/");
    }).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <Container>
      <nav className={`${isScrolled || show ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Right section: Search, Logout, Profile */}
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>

          {User ? (
            <div className="profile">
              {/* Profile section */}
              <Link to="/profile">
                <img
                  className="h-10 w-10 rounded-full cursor-pointer"
                  src={profilePic ? User.photoURL : "https://www.citypng.com/public/uploads/preview/profile-user-round-red-icon-symbol-download-png-11639594337tco5j3n0ix.png"}
                  alt="Profile"
                  onClick={() => setIsOpen(!isOpen)} // Toggle dropdown on click
                />
              </Link>
              {/* Dropdown Menu */}
              {isOpen && (
                <div className="dropdown">
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link to="/signin">Add another User</Link>
                    </li>
                    <li>
                      <button onClick={SignOut}>Sign Out</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => signOut(firebaseAuth)}>
              <FaPowerOff />
            </button>
          )}
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      display: flex;
      gap: 1rem;
      align-items: center;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
      .profile {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        img {
          cursor: pointer;
        }
        .dropdown {
          position: absolute;
          top: 35px;
          right: 0;
          background-color: rgba(0, 0, 0, 0.8);
          padding: 10px;
          list-style: none;
          border-radius: 5px;
          z-index: 20;
        }
        .dropdown-content {
          padding: 10px;
          list-style: none;
        }
        .dropdown-content li {
          padding: 5px 10px;
        }
        .dropdown-content li a,
        .dropdown-content li button {
          color: white;
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
  }
`;
