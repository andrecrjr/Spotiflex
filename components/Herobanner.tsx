import Link from 'next/link';
function Herobanner(): JSX.Element {
  return (
    <section className='block--herobanner'>
      <div className='block--herobanner__wrapper'>
        <h2>Another "ok" spotify client over the World Wide Web!</h2>
        <p className='link--portfolio'>
          <Link href={'https://andrecrjr.github.io/'}>by A.c. Junior</Link>
        </p>
        <Link href='explorer' data-testid='access-explorer'>
          <a className='button-hero'>EXPLORE</a>
        </Link>
      </div>
    </section>
  );
}

export default Herobanner;
