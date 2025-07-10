import React from 'react';

function Header() {
  return (
    <header style={styles.header}>
      <h1>AI Revision Platform</h1>
      <nav>
        <a href="#adduser">Add User</a> | 
        <a href="#generate">Generate Plan</a> | 
        <a href="#view">View Plans</a>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: '#f0f4f8',
    padding: '10px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #ddd'
  }
};

export default Header;
