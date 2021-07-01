import React from "react";

function Menu() {
  const openMenu = () => {
    document.querySelector(".main--grid").classList.toggle("open--menu");
    document.querySelector(".menu").classList.toggle("opened");
  };
  return (
    <header className='header'>
      <div className='menu' onClick={openMenu}>
        Menu
      </div>
      <div className='logo'>Spotiflex</div>
      <nav className='header__menu'>
        <ul>
          <li>Home</li>
          <li>Playlists</li>
          <li>Albums</li>
          <li>About</li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
