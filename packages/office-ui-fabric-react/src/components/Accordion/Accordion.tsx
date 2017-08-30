import * as React from 'react';
import { IAccordionProps } from './Accordion.Props';
import {
  BaseComponent,
  autobind,
  css,
  getId,
  KeyCodes
} from '../../Utilities';

import { Icon } from '../../Icon';
import * as stylesImport from './Accordion.scss';
const styles: any = stylesImport;

export interface IAccordionState {

}

export class Accordion extends BaseComponent<IAccordionProps, IAccordionState> {
  public render() {
    return(
      <h1>Hello World</h1>
    );  
  }
}
