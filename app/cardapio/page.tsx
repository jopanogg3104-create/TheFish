import Menu from './menu';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
export const metadata={title:'Cardápio de peixes, porções e pedidos — The Fish'};
export default function MenuPage(){return <div className="new-menu"><Header menu/><Menu/><Footer/></div>;}
