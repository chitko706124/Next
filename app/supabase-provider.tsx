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
        console.warn("Supabase environment variables are missing");
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
        <div className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg m-4">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Supabase Connection Required
          </h2>
          <div className="space-y-4">
            <p className="text-muted-foreground text-center">
              Please connect your Supabase project to continue:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li className="text-foreground">
                Click the "Connect to Supabase" button in the top right
              </li>
              <li className="text-foreground">
                Create a new project or connect an existing one
              </li>
              <li className="text-foreground">
                Wait for the connection to be established
              </li>
            </ol>
            <div className="pt-4">
              <p className="text-xs text-muted-foreground text-center">
                The application will automatically start once the connection is
                established
              </p>
            </div>
          </div>
        </div>
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
