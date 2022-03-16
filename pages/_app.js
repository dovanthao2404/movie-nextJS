import '../styles/globals.scss';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { Provider } from 'react-redux';
import store from '../redux/store';
import { createWrapper } from "next-redux-wrapper";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
function MyApp({ Component, pageProps, ...props }) {
  return <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Component {...pageProps} />
    </LocalizationProvider>
  </Provider>;
}


const makeStore = () => store;

const wrapper = createWrapper(makeStore);


export default wrapper.withRedux(MyApp);
