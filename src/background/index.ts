import browser from 'webextension-polyfill';
import {
  ExtensionRuntimeRequest,
  ExtensionRuntimeRequestType
} from '../types/extension';
import { Log } from '../logger';

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener((request: ExtensionRuntimeRequest) => {
  // Log statement if request.popupMounted is true
  // NOTE: this request is sent in `popup/component.tsx`

  switch (request.type) {
    case ExtensionRuntimeRequestType.POPUP_MOUNTED:
      console.log('backgroundPage notified that Popup.tsx has mounted.');
      break;
    case ExtensionRuntimeRequestType.LOG:
      const log = request.content as Log;
      console.log(log.message, log.params);
      break;
    default:
      console.log('Received unknown message : ', request);
      break;
  }
});
