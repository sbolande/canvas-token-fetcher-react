import React from "react";
import styles from "./LoadingTitle.module.css";

export const LoadingTitle = (props) => (
  <h1 className={styles.title}>
    <span className={`${styles.loader} ${props.loading && styles.loading}`}>
      {props.children}
    </span>
  </h1>
);
