<script>
	// The Header
	import ButtonsModal from "./mobile_modal.svelte";
	// Get screen type
	let mobile = (window.innerWidth <= 600);

	// Setup the hamburger

	let showButtons = false;

	function clickMenu(e) {
		e.preventDefault();
		console.log("here!")
		showButtons = !showButtons;
	}

</script>

<style>
	header {
						width: 100%;
						background-color: #ebd234;
					}

	h1{
		font-size: 42px;
		font-weight: bold;
	}
	
	h2{
		font-size: 24px;
	}

	@media(max-width: 600px){
		h1{
			font-size: 28px;
			font-weight: bold;
		}
	
		h2{
			font-size: 24px;
			display: none;
		}

		.header-inner {
			padding: 10px 5px;
		}
	}

	.header-inner{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 15px 5px;
	}

	.buttons-wrapper {
		display: flex;
		flex-direction: row;
	}
	.nav-button {
		margin: 0px 10px;
	}
	
</style>


<header class="header">
	<div class="header-inner">
		<div>
			<h1>
				Build a Better Bike Path
			</h1>
		</div>

		{#if !mobile}
			<div class="buttons-wrapper">
				<h2 class="nav-button">Sign the Petition</h2>
				<h2 class="nav-button">Attend a Council Meeting</h2>
			</div>
		{:else}
			<img src="assets/img/hamburger_icon.svg" on:click={clickMenu} alt="menu">
		{/if}
	</div>
</header>

{#if showButtons}
	<ButtonsModal dismiss={clickMenu}>

	</ButtonsModal>
{/if}