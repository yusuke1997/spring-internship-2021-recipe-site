import '../styles/global.css';
import type { AppProps } from "next/app";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function MyApp({ Component, pageProps}:AppProps) {
    return <Component {...pageProps} />
}