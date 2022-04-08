import React, { useState, useRef, useEffect } from "react";
import { Checkbox, Error, Input, Submit, Token } from "../Input/Input.jsx";
import { LoadingTitle } from "../LoadingTitle/LoadingTitle.jsx";
import styles from "./Form.module.css";

import moment from "moment";
const { ipcRenderer } = window.require("electron");

export const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hideToken, setHideToken] = useState(true);
  const [hideError, setHideError] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [tokenCopied, setTokenCopied] = useState(false);

  const usernameRef = useRef();
  const passwordRef = useRef();
  const subdomainRef = useRef();
  const purposeRef = useRef();
  const expiresRef = useRef();
  const rememberRef = useRef();
  const tokenRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    ipcRenderer.invoke("get-presets").then((presets) => {
      usernameRef.current.value = presets.username;
      subdomainRef.current.value = presets.subdomain;
      purposeRef.current.value = presets.purpose;
      expiresRef.current.value = moment().day(6).format("YYYY-MM-DDTHH:mm");
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHideError(true);
    setIsLoading(true);

    let purpose =
      purposeRef.current.value === "" ? "API Calls" : purposeRef.current.value;

    // save user data
    if (rememberRef.current.checked) {
      ipcRenderer.invoke("set-presets", {
        username: usernameRef.current.value,
        subdomain: subdomainRef.current.value,
        purpose: purpose,
      });
    }

    // send form data
    ipcRenderer
      .invoke("fetch-token", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        subdomain: subdomainRef.current.value,
        purpose: purpose,
        expires: expiresRef.current.value,
      })
      .then((res) => {
        tokenRef.current.value = res;
        setHideToken(false);
      })
      .catch((err) => {
        console.error(err);
        errorRef.current.value = err.message.split(": ")[1];
        setHideError(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <form name="login" onSubmit={handleSubmit}>
      <LoadingTitle loading={isLoading}>Canvas Token Fetcher</LoadingTitle>
      <ul className={styles.input_list}>
        <Input
          ref={usernameRef}
          name="username"
          label="Canvas Admin Username"
          type="text"
          required
          autoFocus
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
        <Submit>FETCH TOKEN</Submit>
        <Token
          ref={tokenRef}
          name="token"
          label="Token"
          hidden={hideToken}
          hint={{
            label: !tokenCopied ? "Copy to clipboard" : "Copied!",
            onClick: () => {
              navigator.clipboard.writeText(tokenRef.current.value).then(() => {
                console.log("Copied token to clipboard.");
                setTokenCopied(true);
                setTimeout(() => {
                  setTokenCopied(false);
                }, 5000);
              });
            },
          }}
        />
        <Error ref={errorRef} name="error" label="Error" hidden={hideError} />
      </ul>
    </form>
  );
};
