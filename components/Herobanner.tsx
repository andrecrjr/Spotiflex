import Link from 'next/link';
function Herobanner(): JSX.Element {
  return (
    <section className='block--herobanner'>
      <div className='block--herobanner__wrapper'>
        <h2>The best spotify client in the Web ever!</h2>
        <Link href='explorer' data-testid="access-explorer">ACCESS</Link>
      </div>
    </section>
  );
}

export default Herobanner;
