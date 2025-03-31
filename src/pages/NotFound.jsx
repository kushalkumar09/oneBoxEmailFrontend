import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
  },
  heading: {
    fontSize: "2rem",
    color: "red",
  },
  text: {
    fontSize: "1.2rem",
    marginBottom: "20px",
  },
  link: {
    fontSize: "1.2rem",
    color: "blue",
    textDecoration: "none",
  },
};

export default NotFound;
