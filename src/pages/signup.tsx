import React from "react";
import Form from "@/components/ui/Form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Link from "next/link";
import { signup } from "../../utils/api";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router.push("/admin");
  }
  const handleSignupSubmit = async (data: any) => {
    console.log("Signup data:", data);
    try {
      const signupResponse = await signup(data);
      console.log("Signup Response", signupResponse);
      router.push("/login");
    } catch (error: any) {
      alert(error.message);
      console.error("Signup Failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Add form here */}
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Signup Page</h1>
        <Form
          onSubmit={handleSignupSubmit}
          fields={[
            { label: "Name", type: "text", name: "name" },
            { label: "Email", type: "email", name: "email" },
            { label: "Password", type: "password", name: "password" },
          ]}
          submitButtonText="Signup"
        />
        <div className="font-light text-slate-400 mt-4 text-sm">
          Already have an account ?{" "}
          <Link href="/login" className="font-bold">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
