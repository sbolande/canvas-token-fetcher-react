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
      autoFocus = false,
      value,
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
          id={name}
          type={type}
          name={name}
          required={required}
          list={listId}
          autoFocus={autoFocus}
          defaultValue={value}
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

export const Checkbox = React.forwardRef(({ name, label }, ref) => (
  <li className={styles.container}>
    <input ref={ref} name={name} id={name} type="checkbox" />
    <label htmlFor={name}>{label}</label>
  </li>
));

export const Submit = (props) => (
  <li className={`${styles.container} ${styles.submit_container}`}>
    <button type="submit" id="submit">
      {props.children}
    </button>
  </li>
);

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
