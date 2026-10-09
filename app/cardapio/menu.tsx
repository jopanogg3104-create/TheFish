'use client';
import { useEffect, useRef } from 'react';
import menu from '../../content/menu.json';
import initializeMenu from './menu-runtime';
export default function Menu(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!root.current)return;root.current.innerHTML=menu;return initializeMenu();},[]);
 return <div ref={root} dangerouslySetInnerHTML={{__html:menu}}/>;
}
