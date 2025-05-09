"use client";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { supabase } from "@/services/supeabaseClient";
import React, { useContext, useEffect, useState } from "react";

function Providers({ children }) {
  const [user, setUser] = useState();
  const [DetailsOfQuestions, setDetailsOfQuestions] = useState();
  useEffect(() => {
    createNewUser();
  }, []);
  const createNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      if (Users?.length == 0) {
        const { data, error } = await supabase.from("Users").insert([
          {
            name: user?.user_metadata?.name,
            email: user?.email,
            picture: user?.user_metadata?.picture,
          },
        ]);

        setUser(data);
        return;
      }
      setUser(Users[0]);
    });
  };
  return (
    <UserDetailsContext.Provider
      value={{ user, setUser, DetailsOfQuestions, setDetailsOfQuestions }}
    >
      <div>{children}</div>
    </UserDetailsContext.Provider>
  );
}

export default Providers;

export const useUser = () => {
  const context = useContext(UserDetailsContext);
  return context;
};
