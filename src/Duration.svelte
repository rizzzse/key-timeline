<script lang="ts">
    export let key: string;
    export let x: number;
    export let start: number;
    export let end: number;
</script>

<g>
    <line x1={x} x2={x} y1={start} y2={end} stroke-width={4} />
    <circle cx={x} cy={start} r={6} />
    <circle cx={x} cy={end} r={6} />
    <text x={x} y={start} transform="rotate(90 {x},{start})">
        {key}
    </text>
    <title>"{key}" / {Math.round(end - start)}ms</title>
</g>

<style>
    circle { fill: gray; }
    line { stroke: darkgray; }
    text {
        font-family: monospace;
        font-size: 1.2em;
    }
</style>
