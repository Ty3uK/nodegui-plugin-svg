import fs from "fs";
import path from "path";

import {
  QMainWindow,
  FlexLayout,
  QWidget
} from "@nodegui/nodegui";

import { QSvgWidget } from "./index";

const readSvgFile = (): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    const stream = fs.createReadStream(path.join(__dirname, "../assets/nodegui.svg"));

    stream.once("error", (err) => reject(err));

    stream.once("end", () => {
      resolve(Buffer.concat(chunks));
    });

    stream.on("data", (chunk) => chunks.push(chunk));
  });
};

const win = new QMainWindow();
const rootView = new QWidget();
rootView.setObjectName("root");
rootView.setLayout(new FlexLayout());

const svg = new QSvgWidget();
svg.setObjectName("logo");

if (rootView.layout) {
  rootView.layout.addWidget(svg);
}

win.setCentralWidget(rootView);
win.setStyleSheet(`
  #root {
    flex: 1;
    height: '100%';
    align-items: 'center';
    justify-content: 'center';
  }

  #logo {
    width: 192px;
    height: 192px;
  }
`);
win.setWindowTitle("NodeGUI SVG Demo");
win.resize(256, 256);
win.show();

readSvgFile()
  .then((content) => svg.load(content))
  .catch((error) => console.error(error));

(global as any).win = win; // To prevent win from being garbage collected.
