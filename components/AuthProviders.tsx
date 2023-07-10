"use client";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signUrl: string;
  callbackUrl: string;
  signinUrlParams: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res as Providers | null);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button
            key={i}
            onClick={() => {
              signIn(provider.id);
            }}
          >
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
  return <div>AuthProviders</div>;
};

export default AuthProviders;
