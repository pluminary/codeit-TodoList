// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css"; // Tailwind 적용

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}