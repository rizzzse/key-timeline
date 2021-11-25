<script lang="ts">
    import Duration from "./Duration.svelte";
    import Divider from "./Divider.svelte";
    import { isOverlap, KeyPressDuration } from "./duration";

    type Layer = (KeyPressDuration & { layerIndex: number })[];
    const layering = (durs: KeyPressDuration[]): Layer[] => {
        const layers: Layer[] = [];
        for(const dur of durs) {
            let layerIndex = layers.findIndex(layer => layer.every(x => !isOverlap(x, dur)));
            if(layerIndex === -1) {
                layerIndex += layers.push([]);
            }
            layers[layerIndex].push({ ...dur, layerIndex });
        }
        return layers;
    };

    const VIEW_BOX_SIZE = 100;
    const LAYER_WIDTH = 20;

    export let durs: KeyPressDuration[];

    let first: number, last: number;
    $: {
        first = Math.min(...durs.map(dur => dur.start));
        last = Math.max(...durs.map(dur => dur.end));
    }

    const scale = 1 / 3;
    const y = (y: number) => (y - first) * scale;
</script>

<Divider>
    {Math.round(first)}ms
</Divider>
<div style="height: {y(last)}px;">
    <svg
        viewBox="0 0 {VIEW_BOX_SIZE} {VIEW_BOX_SIZE}"
        width={VIEW_BOX_SIZE}
        height={VIEW_BOX_SIZE}
    >
        {#each layering(durs).flat() as { key, layerIndex, start, end }}
            <Duration
                {key}
                x={layerIndex * LAYER_WIDTH}
                start={y(start)}
                end={y(end)}
            />
        {/each}
    </svg>
</div>
<Divider>
    {Math.round(last)}ms
</Divider>

<style>
    svg {
        overflow: visible;
    }
</style>
