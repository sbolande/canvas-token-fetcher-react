import React from "react";
import styles from "./Submit.module.css";

export const Submit = ({ children, isSubmitting }) => (
  <li className={styles.submit_container}>
    <button
      className={styles.submit}
      id="submit"
      type="submit"
      disabled={isSubmitting}
    >
      {children}
      {isSubmitting && <span className={styles.spinner}></span>}
    </button>
  </li>
);
