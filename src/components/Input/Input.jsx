import React from "react";
import styles from "./Input.module.css";

export const Input = React.forwardRef(
  (
    { name, label, type, required = false, hidden = false, hint, list },
    ref
  ) => {
    const listId = list && `${name}_list`;

    return (
      <li className={`${styles.container} ${hidden && styles.hidden}`}>
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        <input
          ref={ref}
          name={name}
          id={name}
          className={styles.input}
          type={type}
          list={listId}
          required={required}
          spellCheck="false"
        />
        {hint && (
          <span
            className={`${styles.hint} ${hint.onClick && styles.hint_btn}`}
            id={`${name}_hint`}
            onClick={hint.onClick}
          >
            {hint.label}
          </span>
        )}
        {list && (
          <datalist id={listId}>
            {list.map((item) => (
              <option key={`${listId}_${item}`} value={item} />
            ))}
          </datalist>
        )}
      </li>
    );
  }
);

export const Checkbox = React.forwardRef(({ name, label, checked }, ref) => (
  <li className={styles.container}>
    <input
      ref={ref}
      name={name}
      id={name}
      type="checkbox"
      defaultChecked={checked}
    />
    <label htmlFor={name}>{label}</label>
  </li>
));

export const Token = ({ name, label, value, hint }) => (
  <li className={styles.container}>
    <label className={`${styles.label} ${styles.token}`} htmlFor={name}>
      {label}
    </label>
    <input
      name={name}
      id={name}
      className={styles.input}
      type="text"
      defaultValue={value}
      disabled
    />
    {hint && (
      <span
        className={`${styles.hint} ${hint.onClick && styles.hint_btn}`}
        id={`${name}_hint`}
        onClick={hint.onClick}
      >
        {hint.label}
      </span>
    )}
  </li>
);

export const Error = ({ name, label, value }) => (
  <li className={styles.container}>
    <label className={`${styles.label} ${styles.error}`} htmlFor={name}>
      {label}
    </label>
    <input
      name={name}
      id={name}
      className={`${styles.input} ${styles.error}`}
      type="text"
      defaultValue={value}
      disabled
    />
  </li>
);
