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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Auth Token" name="authToken" />
        <button type="submit">Join Meeting</button>
      </form>
    </div>
  );
}
