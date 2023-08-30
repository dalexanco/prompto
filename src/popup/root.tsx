import React from 'react';
import browser from 'webextension-polyfill';
import { Outlet } from 'react-router-dom';

import css from './styles.module.css';
import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType
} from '@src/types/extension';
import logger from '@src/logger';
import Footer from '@src/components/Footer';
import Header from '@src/components/Header';

export default function PopupRoot(): JSX.Element {
  React.useEffect(() => {
    browser.runtime.sendMessage({
      type: ExtensionRuntimeRequestType.POPUP_MOUNTED
    } as ExtensionRuntimeRequest);
    logger.info('Popup connected');
  }, []);

  return (
    <div className={`${css.popupContainer} flex flex-col bg-stone-50`}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
