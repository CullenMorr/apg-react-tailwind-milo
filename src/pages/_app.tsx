import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/layouts/Layout";
import { UserProvider } from "@/context/UserContext"; // ← import the provider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
