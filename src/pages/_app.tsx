import { AppProps } from "next/app";

function Pages({Component, pageProps}: AppProps){
    return < Component {...pageProps}/>
}

export default Pages;