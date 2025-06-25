// src/app/components/Toolbar.js
"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

// Toolbar container with gradient background
const ToolbarWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 2rem;
  background: #ffd781;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
`;

// Nav links container without scrolling
const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 1100px) {
    display: none; /* Hide on mobile, rely on burger menu */
    padding-top: 2rem; /* Adjusted padding for better alignment */
  }
`;

// Nav link styling with modern hover effects
const NavLink = styled.a`
  color: #ffd781; /* Light yellow text */
  background-color: #000000; /* Black background */
  text-decoration: none; /* No underline */
  font-family: "Montserrat", Arial, sans-serif; /* Modern font with fallback */
  font-weight: 600;
  font-size: 1.2rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid transparent; /* Subtle border for polish */
  transition: all 0.3s ease; /* Smooth transition for hover effects */
  text-transform: uppercase;
  letter-spacing: 2px;

  &:hover,
  &:visited,
  &:active {
    text-decoration: none; /* Ensure no underline on hover, visited, or active */
    background: linear-gradient(90deg, #333 0%, #444 100%); /* Gradient hover effect */
    color: #ffd781; /* Keep light yellow on hover */
    border: 1px solid #ffd781; /* Subtle border on hover */
    transform: translateY(-2px); /* Slight lift on hover */
  }
`;

// Burger icon for mobile
const BurgerIcon = styled.div<{ $isOpen: boolean }>`
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 10px;
  z-index: 1201;

  @media (max-width: 1100px) {
    display: flex; /* Show on mobile */
  }

  div {
    width: 30px;
    height: 6px;
    background-color: #000000; /* Black to match the design */
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }

  div:nth-child(1) {
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg) translate(8px, 8px)" : "rotate(0)")};
  }

  div:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? "0" : "1")};
  }

  div:nth-child(3) {
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(-45deg) translate(8px, -8px)" : "rotate(0)")};
  }
`;

// Mobile menu (full-screen)
const Menu = styled.div<{ $isMenuOpen: boolean }>`
  display: ${({ $isMenuOpen }) => ($isMenuOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #ffd781; /* Dark background for contrast */
  backdrop-filter: blur(12px); /* Modern blur effect */
  z-index: 1100;
  animation: fadeIn 0.3s ease-in-out;
  overflow-y: auto;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (min-width: 901px) {
    display: none; /* Hide on desktop */
  }
`;

const MenuItemsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
`;

// Menu item styling for mobile
const MenuItem = styled.div<{ $isActive: boolean }>`
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ $isActive }) => ($isActive ? "#ffffff" : "#ffffff")}; /* Light yellow text */
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 0.75rem 1.5rem;
  letter-spacing: 2px;
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid transparent;
  background-color: #000000; /* Black background to match design */

  &:hover,
  &:visited,
  &:active {
    text-decoration: none;
    color: #ffd781;
    transform: scale(1.1);
    background: linear-gradient(90deg, #333 0%, #444 100%); /* Gradient hover effect */
    border: 1px solid #ffd781; /* Subtle border on hover */
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }
`;

// Logo styling
const Logo = styled.h1`
  color: #ffd781; /* Light yellow text */
  background-color: #000000; /* Black background */
  padding: 0.5rem 1rem;
  margin: 0;
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #333 0%, #444 100%); /* Gradient hover effect */
    color: #ffd781;
    transform: translateY(-2px); /* Slight lift on hover */
  }

  /* Responsive font size */
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export default function Toolbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleTabClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <ToolbarWrapper>
        <Link href="/">
          <Logo>Høl i CV´en</Logo>
        </Link>
        <NavLinks>
          <Link href="#about">
            <NavLink>Om Oss</NavLink>
          </Link>
          <Link href="#events">
            <NavLink>Arrangementer</NavLink>
          </Link>
          <Link href="#contact">
            <NavLink>Kontakt</NavLink>
          </Link>
        </NavLinks>
        <BurgerIcon onClick={handleBurgerClick} $isOpen={isMenuOpen}>
          <div />
          <div />
          <div />
        </BurgerIcon>
      </ToolbarWrapper>

      <Menu $isMenuOpen={isMenuOpen}>
        <MenuItemsWrapper>
          <Link href="#about">
            <MenuItem $isActive={false} onClick={handleTabClick}>
              Om Oss
            </MenuItem>
          </Link>
          <Link href="#events">
            <MenuItem $isActive={false} onClick={handleTabClick}>
              Arrangementer
            </MenuItem>
          </Link>
          <Link href="#contact">
            <MenuItem $isActive={false} onClick={handleTabClick}>
              Kontakt
            </MenuItem>
          </Link>
        </MenuItemsWrapper>
      </Menu>
    </>
  );
}