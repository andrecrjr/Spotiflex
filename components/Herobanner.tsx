import Link from 'next/link';
function Herobanner(): JSX.Element {
  return (
    <section className='block--herobanner'>
      <div className='block--herobanner__wrapper'>
        <h2>O melhor cliente web para seu Spotify!</h2>
        <Link href='explorer'>Acessar</Link>
      </div>
    </section>
  );
}

export default Herobanner;
