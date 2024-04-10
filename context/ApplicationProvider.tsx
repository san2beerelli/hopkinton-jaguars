"use client";

import { FC, ReactNode, createContext, useContext, useReducer } from "react";

export type UserProfile = {
  name: string;
  email: string;
  session: string;
  photo: string;
  role: string;
};

export type ApplicationActions = {
  type: "SETUSER";
  userProfile: UserProfile;
};

type ApplicationData = {
  userProfile: UserProfile | object;
};

const applicationReducer = (
  state: ApplicationData,
  action: ApplicationActions
): ApplicationData => {
  switch (action.type) {
    case "SETUSER":
      return { ...state, userProfile: action.userProfile };
    default:
      return state;
  }
};

const defaultValues: ApplicationData = {
  userProfile: {},
};

const profile = {
  userProfile: {},
  setUserProfile: (action: ApplicationActions): void => {},
};

const Context = createContext<{
  userProfile: UserProfile | object;
  setUserProfile: React.Dispatch<ApplicationActions>;
}>(profile);

export const ApplicationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useReducer(
    applicationReducer,
    defaultValues
  );
  return (
    <Context.Provider value={{ userProfile, setUserProfile }}>
      {children}
    </Context.Provider>
  );
};

export const useApplicaiton = () => useContext(Context);
