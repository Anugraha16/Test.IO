import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import clsx from 'clsx'; 
import LoginPopup from '../LoginPopup/LoginPopup';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [showLogin, setShowLogin] = useState(false); // State for login popup

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); 
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "/home" },
        { name: "About Us", href: "/AboutUS" },
        { name: "Blogs", href: "/Blogs" },
        { name: "Test", href: "/codeEditor" },
        { name: "MCQ", href: "/Mcq" }
    ];

    return (
        <>
            <header className="w-full fixed top-0 left-0 right-0 border-b-2 z-50 bg-white">
                <nav
                    className={clsx(
                        "py-4 md:px-8 px-4 transition-all duration-300",
                        { "shadow-lg": isSticky }
                    )}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="font-bold text-2xl cursor-pointer text-black">
                            <a href="/">Logo</a>
                        </div>

                        {/* Navigation Links for Large Devices */}
                        <div className="lg:flex items-center gap-4 hidden text-stone-700">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block hover:text-gray-400 py-2 px-4 transition-all duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Contact Me Button for Large Devices */}
                        <div className="lg:block hidden">
                            <button
                                onClick={() => setShowLogin(true)} // Show popup
                                className="btnOutline"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Menu Button for Small Devices */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden text-indigo-600 text-3xl"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle menu"
                        >
                            <HiMenu />
                        </button>
                    </div>

                    {/* Navigation Links for Small Devices */}
                    {isMenuOpen && (
                        <div className="mt-4 bg-indigo-500 text-white rounded py-4 lg:hidden">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block hover:text-gray-400 py-2 px-4 transition-all duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    )}
                </nav>
            </header>

            {/* Login Popup */}
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
        </>
    );
};

export default Navbar;
