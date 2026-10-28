<script lang="ts">
	import type { PageBlock } from '$lib/sanity/types';
	import CallToAction from './blocks/CallToAction.svelte';
	import CardGrid from './blocks/CardGrid.svelte';
	import DonateSection from './blocks/DonateSection.svelte';
	import EventsList from './blocks/EventsList.svelte';
	import FeatureGrid from './blocks/FeatureGrid.svelte';
	import FormSection from './blocks/FormSection.svelte';
	import Hero from './blocks/Hero.svelte';
	import IntroSplit from './blocks/IntroSplit.svelte';
	import Testimonials from './blocks/Testimonials.svelte';
	import TextSection from './blocks/TextSection.svelte';

	let {
		sections,
		form
	}: { sections?: PageBlock[]; form?: { key?: string; success?: boolean; error?: string } | null } =
		$props();
</script>

{#each sections ?? [] as block (block._key)}
	{#if block._type === 'hero'}
		<Hero {block} />
	{:else if block._type === 'textSection'}
		<TextSection {block} />
	{:else if block._type === 'introSplit'}
		<IntroSplit {block} />
	{:else if block._type === 'featureGrid'}
		<FeatureGrid {block} />
	{:else if block._type === 'cardGrid'}
		<CardGrid {block} />
	{:else if block._type === 'eventsList'}
		<EventsList {block} />
	{:else if block._type === 'testimonials'}
		<Testimonials {block} />
	{:else if block._type === 'callToAction'}
		<CallToAction {block} />
	{:else if block._type === 'formSection'}
		<FormSection {block} {form} />
	{:else if block._type === 'donateSection'}
		<DonateSection {block} />
	{/if}
{/each}
