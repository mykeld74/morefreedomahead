<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import logoBlack from '$lib/assets/logoBlack.svg';

	let { links = [] }: { links?: { _key: string; label: string; href: string }[] } = $props();

	const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

	let menuOpen = $state(false);
	let dialogClosing = $state(false);
	let navCompact = $state(false);
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	const getMobileDialog = () =>
		document.getElementById('mobileNavDialog') as HTMLDialogElement | null;

	const handleDialogClosed = () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		dialogClosing = false;
		menuOpen = false;
	};

	const closeMenu = () => {
		const mobileMenuDialog = getMobileDialog();
		if (!mobileMenuDialog?.open || dialogClosing) {
			menuOpen = false;
			return;
		}
		dialogClosing = true;
		closeTimer = setTimeout(() => {
			mobileMenuDialog.close();
		}, 220);
	};

	const toggleMenu = () => {
		const mobileMenuDialog = getMobileDialog();
		if (!mobileMenuDialog) return;
		if (mobileMenuDialog.open) {
			closeMenu();
		} else {
			mobileMenuDialog.showModal();
			menuOpen = true;
		}
	};

	const handleWindowScroll = () => {
		navCompact = window.scrollY > 32;
	};

	onMount(() => {
		handleWindowScroll();
	});
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- hrefs come from the CMS and may be external; internal ones go through resolve() -->

<svelte:window onscroll={handleWindowScroll} />

<header class="siteHeader">
	<div class="container navRow" class:navCompact>
		<a class="siteBrand" href={resolve('/')} aria-label="More Freedom Ahead home">
			<img class="siteLogo" src={logoBlack} alt="More Freedom Ahead" />
		</a>
		<button
			type="button"
			class="navToggle"
			aria-controls="siteNavigation"
			aria-expanded={menuOpen}
			aria-label="Toggle navigation menu"
			onclick={toggleMenu}
		>
			<span></span>
			<span></span>
			<span></span>
		</button>
		<nav id="siteNavigation" class="siteNav siteNavDesktop">
			{#each links as link (link._key)}
				<a href={isExternal(link.href) ? link.href : resolve(link.href as '/')}>{link.label}</a>
			{/each}
		</nav>
	</div>
</header>

<dialog
	id="mobileNavDialog"
	class="mobileNavDialog"
	class:mobileNavDialogClosing={dialogClosing}
	onclose={handleDialogClosed}
>
	<div class="mobileNavSurface">
		<div class="mobileNavHeader">
			<p class="mobileNavTitle">Navigate</p>
			<button
				type="button"
				class="mobileNavClose"
				aria-label="Close navigation menu"
				onclick={closeMenu}
			>
				✕
			</button>
		</div>
		<nav class="mobileNavList">
			{#each links as link (link._key)}
				<a href={isExternal(link.href) ? link.href : resolve(link.href as '/')} onclick={closeMenu}
					>{link.label}</a
				>
			{/each}
		</nav>
	</div>
</dialog>
