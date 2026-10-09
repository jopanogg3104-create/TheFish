import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
export function Header({menu=false}:{menu?:boolean}){return <header className="site-header"><Link className="site-logo" href="/" aria-label="The Fish — início"><Image src="/assets/the-fish-logo-hd.png" alt="The Fish — Restaurante e Petiscaria" width={190} height={190} priority /></Link><nav aria-label="Navegação principal"><Link className="quiet-link" href={menu?'/':'/#restaurante'}>{menu?'Voltar ao início':'O restaurante'}</Link>{!menu&&<Button asChild size="sm"><Link href="/cardapio">Cardápio e pedidos <ArrowUpRight size={17}/></Link></Button>}</nav></header>;}
