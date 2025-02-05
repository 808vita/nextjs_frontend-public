import { LoginRequest, SignupRequest } from "../schemas";
import { signIn } from "next-auth/react";
import Router from "next/router";
export const signup = async (data: SignupRequest) => {
  try {
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Error during signup");
  }
};

export const login = async (data: LoginRequest) => {
  try {
    const res: any = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
      callbackUrl: `${window.location.origin}/admin`,
    });
    // res.error ? console.log(res.error) :  Router.push("/admin");
  } catch (error: any) {
    throw new Error(error.message || "Error during login");
  }
};
