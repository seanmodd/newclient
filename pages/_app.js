//! here is a test comment
import {
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
  Box,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import '../styles/globals.css';
import { KBarProvider, KBarContent, KBarSearch, KBarResults } from 'kbar';

import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import rootReducer from '../redux/reducers';
import theme from '../theme';
import TopNav from '../components/TopNav';
import NavbarWithSubmenu from '../components/chakra/NavbarWithSubmenu/App';
import SimpleFooter from '../components/chakra/SimpleFooter/App';

function MyApp({ Component, pageProps }) {
  const store = createStore(rootReducer, composeWithDevTools());
  return (
    <ChakraProvider resetCSS theme={theme}>
      <KBarProvider actions={actions}>
        <Provider store={store}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <MyBox>
              {/* <TopNav /> */}

              <NavbarWithSubmenu />
              {/* <DarkModeSwitch /> */}
              <ContentBox>
                <KBarContent>
                  <KBarSearch />
                  <KBarResults />
                </KBarContent>
                <Component {...pageProps} />
              </ContentBox>
              <SimpleFooter />
            </MyBox>
          </ColorModeProvider>
        </Provider>
      </KBarProvider>
    </ChakraProvider>
  );
}

const actions = [
  {
    id: 'blog',
    name: 'Blog',
    shortcut: ['b'],
    keywords: 'writing words',
    perform: () => (window.location.pathname = 'blog'),
  },
  {
    id: 'contact',
    name: 'Contact',
    shortcut: ['c'],
    keywords: 'email',
    perform: () => (window.location.pathname = 'contact'),
  },
];

export default MyApp;
const MyBox = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: 'black',
    dark: 'white',
  };
  const bgColor = {
    light: 'gray.50',
    dark: 'gray.900',
  };
  return (
    <>
      <Box
        minH="100vh"
        px={['0px', '0px', '0px', '0px']}
        bg={bgColor[colorMode]}
      >
        {children}
      </Box>
    </>
  );
};
const ContentBox = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = {
    light: 'black',
    dark: 'white',
  };
  const bgColor = {
    light: 'gray.50',
    dark: 'gray.900',
  };
  return (
    <>
      <Box pt="100px" px={['0px', '0px', '0px', '0px']} bg={bgColor[colorMode]}>
        {children}
      </Box>
    </>
  );
};
