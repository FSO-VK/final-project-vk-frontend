import { createMemo, Match, Switch } from 'solid-js';
import './gauge.css';

const RADIUS = 47; // user units
const CENTER_X = 50; // user units
const CENTER_Y = 50; // user units
const STROKE_WIDTH = 6; // user units

export interface GaugeProps {
  initialDeg: number;
  fillPercentage: number;
}

export function Gauge(props: GaugeProps) {
  const initialPosition = createMemo(() => {
    const initialRad = (props.initialDeg * Math.PI) / 180;
    const x = CENTER_X + RADIUS * Math.cos(initialRad);
    const y = CENTER_Y - RADIUS * Math.sin(initialRad);
    return {
      x,
      y,
      phi: initialRad,
    };
  });

  const currentState = createMemo(() => {
    const truncatedPercentage = props.fillPercentage < 0 ? 0 : props.fillPercentage;
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
      width={2 * RADIUS + STROKE_WIDTH}
      height={2 * RADIUS + STROKE_WIDTH}
      xmlns="http://www.w3.org/2000/svg"
      class="gauge"
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
        <Match when={props.fillPercentage < 100 && props.fillPercentage > 0}>
          <circle
            cx={initialPosition().x}
            cy={initialPosition().y}
            r={STROKE_WIDTH / 2}
            class="gauge_fill-brand"
          />
          <path
            d={`M${initialPosition().x} ${initialPosition().y} A ${RADIUS} ${RADIUS} ${currentState().phi} ${currentState().largeFlag} 0 ${currentState().x} ${currentState().y}`}
            stroke-width={STROKE_WIDTH}
            fill="transparent"
            class="gauge_stroke-brand"
          />
          <circle
            cx={currentState().x}
            cy={currentState().y}
            r={STROKE_WIDTH / 2}
            class="gauge_fill-brand"
          />
        </Match>

        <Match when={props.fillPercentage >= 100}>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RADIUS}
            fill="transparent"
            stroke-width={STROKE_WIDTH}
            class="gauge_stroke-brand"
          />
        </Match>
      </Switch>
    </svg>
  );
}
