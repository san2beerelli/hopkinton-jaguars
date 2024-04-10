"use client";

import { makeGet } from "@/service/api";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";

const NOT_FOUND = "Player Not Found !!! Reach your captain.";

export default function SignInView() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const onSubmitHandler = async () => {
    setLoading(true);
    const response = await makeGet({ screen: "profile", email });
    let msg = "";
    if (response[0] !== "Player Not Found") {
      msg = `Your magic delivery is on its way! Swing by your email ${response[0]} and hit the link to walk onto the pitch.`;
    } else {
      msg = NOT_FOUND;
    }
    setLoading(false);
    setMessage(msg);
  };
  const onResetHandler = async () => {
    setEmail("");
    setMessage("");
  };
  return (
    <>
      {message ? (
        <>
          <div className="font-medium text-lg">{message}</div>
          {message === NOT_FOUND ? (
            <Button
              style={{ width: 150 }}
              color="warning"
              onPress={onResetHandler}
              isLoading={loading}
            >
              Reset
            </Button>
          ) : null}
        </>
      ) : (
        <>
          <div>Sign in with Magic Link</div>
          <Input
            type="email"
            label="Email"
            placeholder="Enter Your Email!"
            style={{ width: 350 }}
            value={email}
            onChange={(event) => setEmail(event.target.value.toLowerCase())}
          />

          <Button
            style={{ width: 150 }}
            color="warning"
            onPress={onSubmitHandler}
            isLoading={loading}
          >
            Submit
          </Button>
        </>
      )}
    </>
  );
}
