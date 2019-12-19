import addon from '../utils/addon';
import { NativeElement, NodeWidget } from '@nodegui/nodegui';

export class QSvgWidget extends NodeWidget {
    native: NativeElement;
    constructor(fileOrContent?: string | Buffer, parent?: NodeWidget) {
        let native;
        if (fileOrContent) {
            native = new addon.QSvgWidget(fileOrContent, parent ? parent.native : null);
        } else if (parent) {
            native = new addon.QSvgWidget(parent.native);
        } else {
            native = new addon.QSvgWidget();
        }
        super(native);
        this.native = native;
        this.nodeParent = parent;
    }
    load(fileOrContent: Buffer | string): void {
        this.native.load(fileOrContent);
    }
}
