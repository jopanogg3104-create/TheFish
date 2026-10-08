import './globals.css';
export const metadata = {
  title: 'The Fish — Restaurante e Petiscaria em Botucatu',
  description: 'Peixes, camarões, pratos executivos e porções. Conheça o The Fish, veja o cardápio e monte seu pedido pelo WhatsApp.'
};
export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body className="landing">{children}</body></html>;
}
