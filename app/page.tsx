"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler } from "react";

export default function Login() {
  const { push } = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const authToken = (e.target as HTMLFormElement).elements.namedItem(
      "authToken"
    ) as HTMLInputElement;
    console.log({ authToken: authToken.value });
    push(`/meeting?authToken=${authToken.value}`);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Auth Token"
          name="authToken"
          style={{ minHeight: 32, minWidth: 260 }}
        />
        <button type="submit">Join Meeting</button>
      </form>
    </div>
  );
}
