"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext<any>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSupabaseReady, setIsSupabaseReady] = useState(false);
  const [supabase, setSupabase] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const initSupabase = () => {
      if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        setIsSupabaseReady(false);
        return;
      }

      try {
        const client = createClientComponentClient();
        setSupabase(client);
        setIsSupabaseReady(true);
      } catch (error) {
        console.error("Supabase client initialization failed:", error);
        setIsSupabaseReady(false);
      }
    };

    initSupabase();
  }, []);

  useEffect(() => {
    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router, supabase]);

  if (!isSupabaseReady) {
    return (
      <div className="flex items-center justify-center flex-grow">
        <h1 className=" text-gray-800 text-xl">Loading...</h1>
      </div>
    );
  }

  return <Context.Provider value={supabase}>{children}</Context.Provider>;
}

export const useSupabase = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }
  return context;
};
