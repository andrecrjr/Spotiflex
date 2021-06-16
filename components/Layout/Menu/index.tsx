import React from "react";

function Menu() {
  return (
    <header className='header'>
      <h1>Spotiflex</h1>
      <nav className='header__menu'>
        <label htmlFor='open-menu' className='open-menu'>
          <div className='menu'>Menu</div>
        </label>
        <input
          type='checkbox'
          name='open-menu'
          className='menu--check'
          id='open-menu'
          style={{ width: "0px" }}
        />
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
