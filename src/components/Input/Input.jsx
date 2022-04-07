import React from "react";
import styles from "./Input.module.css";

export const Input = React.forwardRef(
  (
    {
      name,
      label,
      type,
      required = false,
      hidden = false,
      disabled = false,
      autoFocus = false,
      hint,
      list,
    },
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
          className={styles.input}
          type={type}
          name={name}
          required={required}
          disabled={disabled}
          list={listId}
          autoFocus={autoFocus}
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

export const Submit = () => {
  return (
    <li className={`${styles.container} ${styles.submit_container}`}>
      <button type="submit" id="submit">
        FETCH TOKEN
      </button>
    </li>
  );
};

export const Token = React.forwardRef(({ name, label, hidden, hint }, ref) => (
  <li className={`${styles.container} ${hidden && styles.hidden}`}>
    <label className={`${styles.label} ${styles.token}`} htmlFor={name}>
      {label}
    </label>
    <input
      ref={ref}
      className={styles.input}
      type="text"
      name={name}
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
));

export const Error = React.forwardRef(({ name, label, hidden }, ref) => (
  <li className={`${styles.container} ${hidden && styles.hidden}`}>
    <label className={`${styles.label} ${styles.error}`} htmlFor={name}>
      {label}
    </label>
    <input
      ref={ref}
      className={`${styles.input} ${styles.error}`}
      type="text"
      name={name}
      disabled
    />
  </li>
));
