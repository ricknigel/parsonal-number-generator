import React, { useEffect, Fragment } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import Head from 'next/head';
import { AppBar, createMuiTheme, CssBaseline, makeStyles, Theme, ThemeProvider, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(3),
    },
    width: '100%'
  }
}));

const App = ({ Component, pageProps }: AppProps) => {
  const classes = useStyles();

  const myTheme = createMuiTheme({
    palette: {
      background: {
        default: '#eef0f1'
      },
      secondary: {
        main: '#3b49df'
      }
    },
    typography: {
      fontFamily: [
        '"Segoe UI"',
        'Noto Sans JP',
      ].join(',')
    }
  });

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>パーソナルナンバージェネレータ</title>
      </Head>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <AppBar position="static" color="primary" variant="outlined">
          <Toolbar>
            <h2>パーソナルナンバージェネレータ</h2>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <main className={classes.content}>
            <Component {...pageProps}/>
          </main>
        </div>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
