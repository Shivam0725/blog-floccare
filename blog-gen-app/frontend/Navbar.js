import React from "react";
import logo from "./assets/FlocCarelogo.png";

const Navbar = ({ onAddBlog }) => {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <img src={logo} alt="FlocCare" style={styles.logo} />
      </div>
      <div style={styles.center}>
        <span style={styles.link}>Use Cases</span>
        <span style={styles.link}>Blogs</span>
        <span style={styles.link}>Pricing</span>
        <span style={styles.link}>Specialities</span>
        <span style={styles.link}>Careers</span>
      </div>
      <div style={styles.right}>
        <button onClick={onAddBlog} style={styles.button}>
          Add Blog
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 1000,
  },
  left: {},
  center: {
    display: "flex",
    gap: "25px",
    fontWeight: 500,
    fontSize: "16px",
  },
  right: {},
  logo: {
    height: "40px",
  },
  link: {
    cursor: "pointer",
  },
  button: {
    background: "#1f7a4c",
    color: "#fff",
    border: "none",
    padding: "8px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
