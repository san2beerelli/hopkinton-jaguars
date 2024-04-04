//@ts-nocheck
"use client";

import SignInView from "./signIn";
import { useApplicaiton } from "@/context/ApplicationProvider";

export default function ProfilePage() {
  const { userProfile } = useApplicaiton();
  const profile = userProfile;
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      {profile?.userProfile?.name ? (
        <div>{profile?.userProfile?.name}</div>
      ) : (
        <SignInView />
      )}
    </section>
  );
}
