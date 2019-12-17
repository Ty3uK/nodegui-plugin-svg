import fs from "fs";
import path from "path";

import {
  QMainWindow,
  QPushButton,
  FlexLayout,
  QWidget
} from "@nodegui/nodegui";

import { QSvgWidget } from "./index";

const readSvgFile = (): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    const stream = fs.createReadStream(path.join(__dirname, "../assets/wikipedia.svg"));

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

const button = new QPushButton();
button.setText("Push Push Push!");

const svg = new QSvgWidget();

if (rootView.layout) {
  rootView.layout.addWidget(button);
  rootView.layout.addWidget(svg);
}

win.setCentralWidget(rootView);
win.setStyleSheet(`
  #root {
    flex: 1;
    height: '100%';
    align-items: 'center';
    justify-content: 'space-around';
  }
`);
win.setWindowTitle("NodeGUI Demo");
win.resize(400, 700);
win.show();

readSvgFile()
  .then((content) => svg.load(content))
  .catch((error) => console.error(error));

(global as any).win = win; // To prevent win from being garbage collected.
