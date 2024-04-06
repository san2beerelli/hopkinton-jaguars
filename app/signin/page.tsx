"use client";

import { makeGet } from "@/service/api";
import { Spinner } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useApplicaiton } from "@/context/ApplicationProvider";
export default function SigninPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { setUserProfile } = useApplicaiton();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        setLoading(true);
        const session = searchParams.get("sessionId") || "";
        const response = await makeGet({
          screen: "validUser",
          sessionId: session,
        });
        setLoading(false);
        if (response.name !== "No User Found") {
          const obj = response;
          obj.session = session;
          window.localStorage.setItem("profile", JSON.stringify(obj));
          setUserProfile({ type: "SETUSER", userProfile: obj });
        }
        push("/profile");
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, [searchParams, push, setUserProfile]);

  return (
    <Suspense>
      <>{loading ? <Spinner color="warning" /> : null}</>
    </Suspense>
  );
}
