'use client';
import { useEffect, useRef } from 'react';
import menu from '../../content/menu.json';
import initializeMenu from './menu-runtime';
export default function Menu() {
  const root = useRef(null);
  useEffect(() => {
    // Initialize the existing, verified ordering interface after hydration.
    // Content and script are local project files, never user input.
    root.current.innerHTML = menu;
    const cleanup = initializeMenu();
    return cleanup;
  }, []);
  return <div ref={root} dangerouslySetInnerHTML={{ __html: menu }} />;
}
