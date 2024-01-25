<script lang="ts">
	import { dataAttr } from '@zag-js/dom-query';
	import { stringifyState } from '@zag-js/shared';
	import type { UseControlsReturn } from '$lib/use-controls.svelte';
	import Controls from './Controls.svelte';
	import { unstate } from 'svelte';
	import type { useMachine, useSnapshot } from '@zag-js/svelte';

	const {
		controls,
		machine,
		state: machineState
	} = $props<{
		machine: ReturnType<typeof useMachine<any, any, any>>;
		state: ReturnType<typeof useSnapshot>['state'];
		controls?: UseControlsReturn;
	}>();

	let active = $state(controls !== undefined ? 0 : 1);
</script>

<div class="toolbar">
	<nav>
		{#if controls !== undefined}
			<button data-active={dataAttr(active === 0)} onclick={() => (active = 0)}>Controls</button>
		{/if}
		<button data-active={dataAttr(active === 1)} onclick={() => (active = 1)}>Visualizer</button>
	</nav>
	{#if controls !== undefined}
		<div data-content data-active={dataAttr(active === 0)}>
			<Controls {controls} />
		</div>
	{/if}
	<div data-content data-active={dataAttr(active === 1)}>
		<div class="viz">
			<pre>
        <details open>
          <summary>Visualizer</summary>
          <div>{@html stringifyState(unstate(machineState))}</div>
        </details>
      </pre>
		</div>
	</div>
</div>
