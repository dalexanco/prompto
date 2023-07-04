import * as React from "react";
import browser from "webextension-polyfill";
import { createRoot } from "react-dom/client";

import { Popup } from "./component";
import "../css/app.css";

//browser.tabs.query({ active: true, currentWindow: true }).then(() => {
const container = document.getElementById("popup");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(<Popup />);
//});
