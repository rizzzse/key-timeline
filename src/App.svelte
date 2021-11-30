<script lang="ts">
    import { writable } from "svelte/store";
    import { Dict } from "ts-micro-dict";
    import Cluster from "./Cluster.svelte";
    import type { KeyPressDuration } from "./duration";

    const clustering = (durs: KeyPressDuration[]): KeyPressDuration[][] => {
        const clusters: KeyPressDuration[][] = [];
        let currentCluster: KeyPressDuration[] = [];
        let prev: KeyPressDuration;
        for(const dur of durs) {
            if(prev! == null || dur.start - prev.end > 1000) {
                clusters.push(currentCluster = []);
            }
            currentCluster.push(prev = dur);
        }
        return clusters;
    };

    let timeline: KeyPressDuration[] = [];
    let clusters: KeyPressDuration[][] = [];

    const pressingKeys = writable<Dict<KeyPressDuration>>({});
</script>

<svelte:window
    on:keydown|preventDefault={({ code, timeStamp }) => {
        if(code in $pressingKeys) {
            $pressingKeys[code].end = timeStamp;
        } else {
            pressingKeys.update(Dict.put(code, {
                key: code,
                start: timeStamp,
                end: timeStamp,
            }));
        }
    }}
    on:keyup|preventDefault={({ code, timeStamp }) => {
        if(code in $pressingKeys) {
            timeline = [...timeline, { ...$pressingKeys[code], end: timeStamp }];
            clusters = clustering(timeline);
            pressingKeys.update(Dict.omit(code));
        }
    }}
/>

<main>
    <div>
        <p>{Dict.length($pressingKeys)}keys pressing</p>
        <ul>
            {#each Object.values($pressingKeys) as { key }}
                <li>
                    {key}
                </li>
            {/each}
        </ul>
    </div>
    {#each clusters as durs}
        <Cluster {durs} />
    {/each}
</main>

<style>
    :root {
        background: #e8eeee;
    }

    div {
        background: #bbc0c0;
        padding: 1em;
    }
    p {
        margin: 0;
    }
    ul {
        height: 5em;
        display: flex;
        flex-flow: column wrap;
        list-style: none;
        padding: 0;
    }
    li {
        height: 1em;
    }
</style>
