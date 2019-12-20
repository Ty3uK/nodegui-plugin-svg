import addon from '../utils/addon';
import { NativeElement, NodeWidget } from '@nodegui/nodegui';

export class QSvgWidget extends NodeWidget {
    native: NativeElement;
    
    constructor(file?: string, parent?: NodeWidget) {
        const args = [];
        
        if (file) {
            args.push(file);
        }

        if (parent) {
            args.push(parent.native);
        } else {
            args.push(null);
        }
        
        const native = new addon.QSvgWidget(...args);
        super(native);
        this.native = native;
        this.nodeParent = parent;
    }
    
    load(fileOrContent: string | Buffer): void {
        this.native.load(fileOrContent);
    }
}
