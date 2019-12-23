import { NodeWidget } from '@nodegui/nodegui';
import { RNWidget } from '@nodegui/react-nodegui/dist/components/config';
import { ViewProps, setViewProps } from '@nodegui/react-nodegui/dist/components/View/RNView';
import { throwUnsupported } from '@nodegui/react-nodegui/dist/utils/helpers';

import { QSvgWidget } from '../../../index';

export interface SvgProps extends ViewProps {
  src?: string;
  content?: Buffer;
  children?: string;
}

const setSvgProps = (
  widget: RNSvg,
  newProps: SvgProps,
  oldProps: SvgProps,
) => {
  const setter: SvgProps = {
    set src(file: string) {
      widget.load(file);
    },
    
    set content(content: Buffer) {
      widget.load(content);
    },

    set children(children: string) {
      widget.load(new Buffer(children, 'utf-8'));
    }
  };
  
  Object.assign(setter, newProps);
  setViewProps(widget, newProps, oldProps);
};

/**
 * @ignore
 */
export class RNSvg extends QSvgWidget implements RNWidget {
  setProps(newProps: SvgProps, oldProps: SvgProps): void {
    if (newProps.children && (newProps.src || newProps.content)) {
      console.warn('You shouldn\'t mix children notation with src or content props.');
    }

    setSvgProps(this, newProps, oldProps);
  }
  
  appendInitialChild(child: NodeWidget): void {
    throwUnsupported(this);
  }
  
  appendChild(child: NodeWidget): void {
    throwUnsupported(this);
  }
  
  insertBefore(child: NodeWidget, beforeChild: NodeWidget): void {
    throwUnsupported(this);
  }
  
  removeChild(child: NodeWidget): void {
    throwUnsupported(this);
  }
  
  static tagName = 'svg';
}