import Header from "@/app/components/Shared/Header";
import { UserProvider } from "@/context/UserContext";
import { AppProps } from "next/app";

import '../app/globals.css';

function Pages({Component, pageProps}: AppProps){
    return (
      <UserProvider>
            <Header />
            <Component {...pageProps} />
      </UserProvider>
      );
}

export default Pages;