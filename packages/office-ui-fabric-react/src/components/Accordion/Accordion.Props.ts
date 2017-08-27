import * as React from 'react';
import { Accordion } from './Accordion';
import { AccordionSection } from './AccordionSection';
import { IRenderFunction } from '../../Utilities';
import { IIconProps, IconName } from '../../Icon';

export interface IAccordionSection {

}

export interface IAccordion {

}

export interface IAccordionProps extends React.Props<Accordion> {
  /**
   * Optional callback to access the ISearchBox interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IAccordion) => void;

  /**
   * Add a seperator between each accordion section
   */
  addSeparator?: boolean;
}


export interface IAccordionSectionProps extends React.Props<AccordionSection> {
  /**
   * Optional callback to access the ISearchBox interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: IAccordionSection) => void;

  /**
   * Label text for the accordion section header.
   */
  headerLabel: string;

  /**
   * Description when the accordion section is expanded
   */
  expandedDescription?: string;

  /**
   * Description when the accordion section is collapsed
   */
  collpasedDescription?: string;

  /**
   * Initial state of accordion section collapse or expanded.
   */
  initiallyExpanded?: boolean;

  /**
   * The props for the icon shown beside header.
   */
  iconProps?: IIconProps;

  /**
   * CSS class to apply to the accordion section.
   */
  className?: string;

  /**
   * Add a line after the header section label
   */
  addSectionHeaderLine?: boolean;

  /**
   * Accordion section content
   */
  content: JSX.Element;

  /**
   * Optional custom renderer for the header
   */
  onRenderHeader?: IRenderFunction<IAccordionProps>;

  /**
   * Callback to be called when the header is clicked
   */
  onHeaderClick?: (isExpanded: boolean) => void;
}
