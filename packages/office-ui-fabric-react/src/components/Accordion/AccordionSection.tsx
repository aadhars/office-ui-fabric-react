import * as React from 'react';
import { IAccordionSectionProps } from './Accordion.Props';
import {
  BaseComponent,
  autobind,
  css,
  getId,
  KeyCodes
} from '../../Utilities';

import { Icon } from '../../Icon';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';

import * as stylesImport from './Accordion.scss';
const styles: any = stylesImport;

export interface IAccordionSectionState {
  expanded: boolean;
}

export class AccordionSection extends BaseComponent<IAccordionSectionProps, IAccordionSectionState> {

  private _contentContainer: HTMLDivElement;
  private readonly _titleId: string = "accordion-label-id";

  public constructor(props: IAccordionSectionProps) {
    super(props);
    this.state = {
      expanded: props.initiallyExpanded || false
    };
  }

  public componentDidUpdate(prevProps: IAccordionSectionProps, prevState: IAccordionSectionState): void {
    // Get visible content into scroll view  
    if (this.state && this.state.expanded) {
      if (!prevState || prevState.expanded !== this.state.expanded && this._contentContainer) {
        this._contentContainer.scrollIntoView();
      }
    }
  }

  public render(): JSX.Element {
    const chevronIconClass: string = this.state.expanded ? "chevron bowtie-icon bowtie-chevron-up-light" : "chevron bowtie-icon bowtie-chevron-down-light";
    let headerContent: JSX.Element | null = this._getHeaderContent();
    const accordionSectionDescription: string = this._getSectionDescription();

    return (
      <div className={css("accordionSection", this.props.className)}
        ref={this._resolveRef("_contentContainer")}>
        <div
          className="titleContainer"
          role="heading"
          aria-expanded={this.state.expanded}>

          <div
            tabIndex={0}
            className="accordionSectionHeader"
            role="button"
            onClick={this._toggle}
            onKeyDown={this._handleKeyPress}
            id={this._titleId}
            aria-label={this.props.headerLabel}
            aria-expanded={this.state.expanded}
            data-first-focus-element={true}>

            {headerContent}

            <div className={chevronIconClass} />
            {
              this.props.addSectionHeaderLine &&
              <div className="accordionSectionLine">
                <hr />
              </div>
            }
          </div>
          {accordionSectionDescription && <div className="descriptionContainer">{accordionSectionDescription}</div>}
        </div>
        {
          this.state.expanded &&
          <div
            className="contentContainer"
            aria-labelledby={this._titleId}>
            {this.props.content}
          </div>
        }
      </div >
    );
  }

  public isExpanded(): boolean {
    if (this.state) {
      return !!this.state.expanded;
    }
    return !!this.props.initiallyExpanded;
  }

  public showContent = (show: boolean): void => {
    this.setState({ expanded: show });
  }

  private _getSectionDescription(): string {
    let description: string | undefined;
    if (this.state.expanded) {
      description =  this.props.expandedDescription;
    } else {
      description= this.props.collpasedDescription;
    }
    description =  description ? description: "";
    return description;
  }

  private _toggle = (): void => {
    let toggledState: boolean = !this.state.expanded;
    this.setState({
      expanded: toggledState
    });
    if (this.props.onHeaderClick) {
      this.props.onHeaderClick(toggledState);
    }
  }

  private _handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.keyCode === KeyCodes.space || event.keyCode === KeyCodes.enter) {
      this._toggle();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private _getHeaderContent(): JSX.Element | null {
    if (this.props.onRenderHeader) {
      return this.props.onRenderHeader(this.props, this._getDefaultSectionHeaderLabel);
    } else {
      return this._getDefaultSectionHeaderLabel(this.props);
    }
  }

  private _getDefaultSectionHeaderLabel = (props: IAccordionSectionProps): JSX.Element => {
    return (
      <div className="accordionSectionLabel">
        {this._getBowtieHeader(props)}
        <TooltipHost content={props.headerLabel} overflowMode={TooltipOverflowMode.Parent}>
          {props.headerLabel}
        </TooltipHost>
      </div>);
  }

  private _getBowtieHeader(props: IAccordionSectionProps): JSX.Element | undefined {
    return (
      props.iconProps && <Icon { ...this.props.iconProps } />
    );
  }

}

const Separator = (): JSX.Element =>
  <div className="emptySeparator" />;
