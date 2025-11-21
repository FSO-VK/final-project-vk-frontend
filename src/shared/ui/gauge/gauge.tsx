import { createMemo, type JSX, Match, splitProps, Switch } from 'solid-js';
import './gauge.css';

const RADIUS = 47; // user units
const CENTER_X = 50; // user units
const CENTER_Y = 50; // user units
const STROKE_WIDTH = 6; // user units

export interface GaugeProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  initialDeg: number;
  fillPercentage: number;
  strokeColor: string;
}

export function Gauge(props: GaugeProps) {
  const [selectedProps, otherProps] = splitProps(props, [
    'initialDeg',
    'fillPercentage',
    'strokeColor',
  ]);

  const initialPosition = createMemo(() => {
    const initialRad = (selectedProps.initialDeg * Math.PI) / 180;
    const x = CENTER_X + RADIUS * Math.cos(initialRad);
    const y = CENTER_Y - RADIUS * Math.sin(initialRad);
    return {
      x,
      y,
      phi: initialRad,
    };
  });

  const currentState = createMemo(() => {
    const truncatedPercentage = selectedProps.fillPercentage < 0 ? 0 : selectedProps.fillPercentage;
    const currentRad = (truncatedPercentage / 100) * 2 * Math.PI + initialPosition().phi;
    const x = CENTER_X + RADIUS * Math.cos(currentRad);
    const y = CENTER_Y - RADIUS * Math.sin(currentRad);
    const largeFlag = truncatedPercentage > 50 ? 1 : 0;
    return {
      x,
      y,
      phi: currentRad,
      largeFlag,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${2 * RADIUS + STROKE_WIDTH} ${2 * RADIUS + STROKE_WIDTH}`}
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <circle
        cx={CENTER_X}
        cy={CENTER_Y}
        r={RADIUS}
        fill="transparent"
        stroke-width={STROKE_WIDTH}
        class="gauge__background-circle"
      />

      <Switch>
        <Match when={selectedProps.fillPercentage < 100 && selectedProps.fillPercentage > 0}>
          <path
            d={`M${initialPosition().x} ${initialPosition().y} A ${RADIUS} ${RADIUS} ${currentState().phi} ${currentState().largeFlag} 0 ${currentState().x} ${currentState().y}`}
            stroke-width={STROKE_WIDTH}
            fill="transparent"
            stroke={selectedProps.strokeColor}
            stroke-linecap="round"
          />
        </Match>

        <Match when={selectedProps.fillPercentage >= 100}>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            fill="transparent"
            stroke-width={STROKE_WIDTH}
            stroke={selectedProps.strokeColor}
          />
        </Match>
      </Switch>
    </svg>
  );
}
