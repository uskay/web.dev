// Import the LitElement base class and html helper function
import {svg, html, property, customElement, PropertyValues} from 'lit-element';
import {LighthouseScore} from '../../types';
import {BaseElement} from '../base_element/base_element';
import './web_sparkline.scss';


// function clampTo2Decimals(val: number): number {
//   return Math.round(val * 100) / 100;
// }

const circleRadius = 3;
const strokeWidth = 2;
const scoreHeight = 15;


type PathPart = {
  color: string,
  points: string,
  firstPoint: {x: number, y: number},
  lastPoint: {x: number, y: number},
};


/**
 * Progress bar element.
 * Uses TypeScript decorator to register custom element.
 */
@customElement('web-sparkline')
export class WebSparkline extends BaseElement {
  // Example TypeScript decorator for defining properties
  @property({type: Boolean}) isAwesome = true;

  @property({type: String}) fill = null;

  @property({type: Array}) values_ = [];

  @property({type: Array}) medians_ = [];

  generatePath_(values: Array<LighthouseScore>, updateDataPoints: boolean = true): Array<PathPart> {
    if (values.length === 0) {
      return [{
        points: 'M0 0 L0 0',
        firstPoint: {x: 0, y: 0},
        lastPoint: {x: 0, y: 0},
        color: '',
      }];
    }

    const segment = 1 / values.length;  // TODO: one fewer?

    const paths: Array<PathPart> = [];

    let points = `M0 ${1 - (values[0].score / 100)}`;
    let firstPoint = {x: NaN, y: NaN};
    let lastPoint = {x: NaN, y: NaN};
    let prevColor: string;

    if (updateDataPoints) {
//      this.datapoints = [];
    }

    values.forEach((value, i) => {
      const x = i * segment;
      const y = 1 - (value.score / 100);  // in [0,1]
      const isFirstPoint = i === 0;
      const isLastPoint = i === values.length - 1;
      const currColor = this.computeColorClass_(value.score);

      if (isFirstPoint) {
        firstPoint = {x, y};
      } else if (prevColor !== currColor) {
        paths.push({firstPoint, lastPoint, color: prevColor, points});
        points = `M${lastPoint.x} ${lastPoint.y} L${lastPoint.x} ${lastPoint.y}`;
        firstPoint = {x: lastPoint.x, y: lastPoint.y};
      }

      points += ` L${x} ${y}`;

      if (isLastPoint) {
        paths.push({firstPoint, lastPoint: {x, y}, color: currColor, points});
      }

      prevColor = currColor;
      lastPoint = {x, y};

      if (updateDataPoints) {
        // this.datapoints.push(
        //     {x,y, score: clampTo2Decimals(value.score), date: value.date});
      }
    });

    return paths;
  }

  /**
   * Determines Lighthouse pass/average/fail coloring based on value (0-100).
   */
  computeColorClass_(val: number): string {
    // Match to Lighthouse rating. See https://goo.gl/Pz6xfR.
    let colorClass = 'red';
    if (val >= 90) {
      colorClass = 'green';
    } else if (val >= 50) {
      colorClass = 'orange';
    }
    return colorClass;
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    const paths = this.generatePath_(this.values_);
    if (!paths.length) {
      throw new TypeError('paths should be non-zero');
    }
    const lastDataPoint = paths[paths.length - 1];
    const medianPaths = this.generatePath_(this.medians_, false);

    return html`
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewbox="0 0 1 1">
  <defs>
    <filter id="hover-shadow">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/>
    </filter>
    <linearGradient id="gradient-green" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="rgb(24,182,99)" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="gradient-orange" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="rgb(251,140,0)" stop-opacity="0.2" />
    </linearGradient>
    <linearGradient id="gradient-red" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="rgb(229,57,53)" stop-opacity="0.2" />
    </linearGradient>
  </defs>
  <g>
    ${paths.map(({firstPoint, points, color}) => svg`
      <path class="gradient" stroke="none"
          d="${points} V ${1 + scoreHeight / 2} H ${firstPoint.x} Z"
          fill="${this.fill ? `url(#gradient-${color})` : 'none'}" />
      <path d="${points}" class="path ${color}" style="fill:none" />
    `)}
    ${medianPaths.map(({points}) => {
      return svg`<path d="${points}" class="path dashed"
                        style="stroke-dasharray:4;stroke-dashoffset:0;"/>`;
    })}
    <line id="cursor" stroke-opacity="1" stroke-width="1"
          x1="-10000" x2="-10000" y1="0" y2="1" />
    <circle cx="${lastDataPoint.lastPoint.x}"
          cy="${lastDataPoint.lastPoint.y}"
          r="${circleRadius}"
          stroke-width="${strokeWidth}"
          class="${lastDataPoint.color}" style="fill:#fff" vector-effect="non-scaling-stroke" />
    <g id="score" transform="translate(-10000,-10000)" aria-hidden="true">
      <rect width="50" height="40" fill="#fff" rx="2" ry="2"
            style="filter:url(#hover-shadow)"/>
      <text id="value" stroke="none" x="25" y="18"></text>
      <text id="date" stroke="none" x="3" y="32"></text>
    </g>
  </g>
</svg>
<div aria-live="assertive" class="sr-announcer"></div>`;
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);

    this.tabIndex = 0;
    this.setAttribute('role', 'group');
    this.setAttribute('aria-label', 'scores over time. Use arrow keys to navigate');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', '100');
  }
}
