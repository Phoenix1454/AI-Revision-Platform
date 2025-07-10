import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2025 AI Revision Platform. All rights reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: '40px',
    padding: '10px',
    textAlign: 'center',
    background: '#f0f4f8',
    borderTop: '1px solid #ddd'
  }
};

export default Footer;
