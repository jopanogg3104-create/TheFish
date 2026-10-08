import home from '../content/home.json';
export default function HomePage() {
  return <div dangerouslySetInnerHTML={{ __html: home }} />;
}
