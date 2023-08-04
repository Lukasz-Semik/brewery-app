import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.inner}>&#169; {new Date().getFullYear()} </div>
    </footer>
  );
};

export default Footer;
