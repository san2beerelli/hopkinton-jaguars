//@ts-nocheck
"use client";

import ProfileView from "@/components/profile/profile";
import SignInView from "@/components/signin/signIn";
import { useApplicaiton } from "@/context/ApplicationProvider";

export default function ProfilePage() {
  const { userProfile } = useApplicaiton();
  const profile = userProfile;
 
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {profile?.userProfile?.name ? (
        <ProfileView />
      ) : (
        <SignInView />
      )}
    </section>
  );
}
