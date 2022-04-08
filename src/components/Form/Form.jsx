import React, { useState, useRef, useEffect } from "react";
import { Checkbox, Error, Input, Token } from "../Input/Input.jsx";
import { Submit } from "../Submit/Submit.jsx";
import { LoadingTitle } from "../LoadingTitle/LoadingTitle.jsx";
import styles from "./Form.module.css";

import moment from "moment";

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [showError, setShowError] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [passwordType, setPasswordType] = useState("password");
  const [tokenCopied, setTokenCopied] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const subdomainRef = useRef();
  const purposeRef = useRef();
  const expiresRef = useRef();
  const rememberRef = useRef();

  useEffect(() => {
    window.presetsAPI
      .getPresets()
      .then((presets) => {
        usernameRef.current.value = presets.username;
        subdomainRef.current.value = presets.subdomain;
        purposeRef.current.value = presets.purpose;
        expiresRef.current.value = moment().day(6).format("YYYY-MM-DDTHH:mm");
      })
      .then(() => {
        // autofocus first empty field
        if (usernameRef.current.value === "") usernameRef.current.focus();
        else if (passwordRef.current.value === "") passwordRef.current.focus();
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowError(false);
    setIsLoading(true);

    let purposeVal = purposeRef.current.value;
    let purpose = purposeVal === "" ? "API Calls" : purposeVal;

    // save user data
    if (rememberRef.current.checked) {
      window.presetsAPI.setPresets({
        username: usernameRef.current.value,
        subdomain: subdomainRef.current.value,
        purpose: purpose,
      });
    }

    // send form data
    window.tokenAPI
      .fetch({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        subdomain: subdomainRef.current.value,
        purpose: purpose,
        expires: expiresRef.current.value,
      })
      .then((res) => {
        setToken(res);
        setShowToken(true);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message.split(": ")[1]);
        setShowError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form className={styles.form} name="login" onSubmit={handleSubmit}>
      <LoadingTitle loading={isLoading}>Canvas Token Fetcher</LoadingTitle>
      <ul className={styles.input_list}>
        <Input
          ref={usernameRef}
          name="username"
          label="Canvas Admin Username"
          type="text"
          required
        />
        <Input
          ref={passwordRef}
          name="password"
          label="Password"
          type={passwordType}
          required
          hint={{
            label: "Show Password",
            onClick: () => {
              setPasswordType(
                passwordType === "password" ? "text" : "password"
              );
            },
          }}
        />
        <Input
          ref={subdomainRef}
          name="subdomain"
          label="Subdomain"
          type="text"
          required
          list={["byui", "byuird", "byui.beta", "byuird.beta"]}
        />
        <Input
          ref={purposeRef}
          name="purpose"
          label="Purpose"
          type="text"
          hint={{ label: "Optional" }}
        />
        <Input
          ref={expiresRef}
          name="expires"
          label="Expires"
          type="datetime-local"
          required
          hint={{ label: "Defaults to this Saturday" }}
        />
        <Checkbox
          ref={rememberRef}
          name="remember_me"
          label="Remember me for next time"
        />
        <Submit isSubmitting={isLoading}>
          {!isLoading ? "FETCH TOKEN" : "FETCHING"}
        </Submit>
        {showToken && (
          <Token
            name="token"
            label="Token"
            value={token}
            hint={{
              label: !tokenCopied ? "Copy to clipboard" : "Copied!",
              onClick: () => {
                navigator.clipboard
                  .writeText(tokenRef.current.value)
                  .then(() => {
                    console.log("Copied token to clipboard.");
                    setTokenCopied(true);
                    setTimeout(() => {
                      setTokenCopied(false);
                    }, 5000);
                  });
              },
            }}
          />
        )}
        {showError && <Error name="error" label="Error" value={error} />}
      </ul>
    </form>
  );
};
