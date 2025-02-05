import React from "react";
import Form from "@/components/ui/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { login } from "../../utils/api";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router.push("/admin");
  }
  const handleLoginSubmit = async (data: any) => {
    console.log("Login data:", data);
    try {
      const loginResponse = await login(data);
      console.log("Login Response", loginResponse);
    } catch (error: any) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Add form here */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login Page</h1>
        <Form
          onSubmit={handleLoginSubmit}
          fields={[
            { label: "Email", type: "email", name: "email" },
            { label: "Password", type: "password", name: "password" },
          ]}
          submitButtonText="Login"
        />
        <div className="font-light text-slate-400 mt-4 text-sm">
          Don&apos;t have an account ?{" "}
          <Link href="/signup" className="font-bold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
