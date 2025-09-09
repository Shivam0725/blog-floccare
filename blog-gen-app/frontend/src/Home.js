import React from "react";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heading}>
          Personalise healthcare communications with AI
        </h1>
        <p style={styles.subheading}>
          Enables pharma, healthcare, insurance and medical device companies with
          hyper-personalised and localised communications with our LLM models
        </p>
        <div style={styles.buttons}>
          <button style={styles.demoButton}>Request Demo</button>
          <button style={styles.trialButton}>Free Trial for a Week</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "100px 50px",
    textAlign: "center",
    background: "#f9f9f9",
    minHeight: "calc(100vh - 70px)", // minus navbar height
  },
  hero: {},
  heading: {
    fontSize: "48px",
    fontWeight: 700,
    marginBottom: "20px",
  },
  subheading: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "30px",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  demoButton: {
    background: "#1f7a4c",
    color: "#fff",
    border: "none",
    padding: "12px 30px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
  trialButton: {
    background: "#fff",
    color: "#1f7a4c",
    border: "2px solid #1f7a4c",
    padding: "12px 30px",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Home;
