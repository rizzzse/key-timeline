<script lang="ts">
    export const left = "10%";
</script>

<div style="--left: {left};">
    <span>
        <slot></slot>
    </span>
</div>

<style>
    div {
        display: flex;
    }
    div::before, div::after {
        content: "";
        border-top: 1px solid black;
        transform: translateY(50%);
    }
    div::before { width: var(--left); }
    div::after { width: calc(100% - var(--left)); }
    span {
        padding-left: 1em;
        padding-right: 1em;
    }
</style>
