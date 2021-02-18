import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
//   const appProps: GlobalContext = await App.getInitialProps(appContext);
//   let urlAuth = `${process.env.SERVER_URL}api/spotifyAuth`;
//   const data = await fetch(urlAuth);
//   const publicAuth: TokenSpotify = await data.json();
//   appProps.pageProps = { ...{ auth: publicAuth } };
//   console.log(appProps);

//   return { ...appProps };
// };

export default MyApp;
