import '@/styles/globals.css'
import ThemeCustomization from '@/themes';

const app = ({ Component, pageProps }) =>{
  return 
  <ThemeCustomization>
    <Component {...pageProps} />
  </ThemeCustomization>
}

export default app;