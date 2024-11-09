import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="font-sans">
        {/* Header Section with Navigation */}
        <header className="fixed top-0 left-0 w-full z-10">
          <div className="flex items-center justify-between p-4 bg-[#00396B96]">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to={""}>
                <img
                  src="src/upload/logo.png"
                  alt="Hotel Logo"
                  className="inline-block w-[150px] h-[60px] md:w-[214.05px] md:h-[85.59px]"
                />
              </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav
              className={`md:flex md:flex-grow md:items-center md:justify-center ${
                isMenuOpen ? "block" : "hidden"
              } absolute md:relative top-full left-0 w-full md:w-auto bg-[#00396B96] md:bg-transparent`}
            >
              <div className="flex flex-col md:flex-row font-judson text-white text-[25px] md:text-[24px] text-center space-y-4 md:space-y-0 md:space-x-20 p-4 md:p-0">
                <Link to="/" className="hover:text-yellow-400 hover:underline">
                  Trang chủ
                </Link>
                <Link
                  to="/About"
                  className="hover:text-yellow-400 hover:underline"
                >
                  Về chúng tôi
                </Link>
                <Link
                  to="/Services"
                  className="hover:text-yellow-400 hover:underline"
                >
                  Dịch vụ
                </Link>
                <Link
                  to="/News"
                  className="hover:text-yellow-400 hover:underline"
                >
                  Tin tức
                </Link>
                <Link
                  to="/Contact"
                  className="hover:text-yellow-400 hover:underline"
                >
                  Liên hệ
                </Link>
              </div>
            </nav>
          </div>
        </header>
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-3 right-3 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Header;
