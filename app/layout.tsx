import type { Metadata } from 'next';
import '@fontsource/fraunces/400.css';
import '@fontsource/fraunces/400-italic.css';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import './globals.css';
const publicHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
export const metadata: Metadata = {
 ...(publicHost ? {metadataBase: new URL('https://' + publicHost)} : {}),
 title:'The Fish — Restaurante e Petiscaria em Botucatu',
 description:'Peixes, camarões e porções para compartilhar em Botucatu. Conheça o The Fish, consulte o cardápio e monte seu pedido pelo WhatsApp.',
 keywords:['The Fish','restaurante Botucatu','peixes','petiscaria','frutos do mar'],
 openGraph:{title:'The Fish — Sabor de mar. Noite para ficar.',description:'Conheça nosso restaurante e petiscaria em Botucatu. Veja o cardápio e monte seu pedido.',...(publicHost ? {images:[{url:'/assets/the-fish-logo-hd.png',width:1254,height:1254,alt:'The Fish — Restaurante e Petiscaria'}]} : {}),locale:'pt_BR',type:'website'},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="pt-BR"><body>{children}</body></html>;}
