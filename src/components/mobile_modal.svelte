<script>
    // Mobile navigation modal

    //Props
    export let dismiss;
</script>

<section>
    <img class="x-button" src="/assets/img/x_icon.png" alt="close menu" on:click={dismiss}>
    <div>
        <h1><a>Sign the Petition</a></h1>
        <h1><a>Attend a Council Meeting</a></h1>
    </div>
</section>

<style>
    section {
        width: 100vw;
        height: 100vh;
        z-index: 100;
        background-color: #ebd234;
        position:fixed;
        top: 0px;
        display: flex;
        flex-direction: column;
        align-items: center; 
    }

    .x-button {
        align-self: flex-end;
        margin-top: 10px;
        margin-right: 10px;
    }

    div{
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 30px;
    }

    h1 {
        font-size: 32px;
        margin: 10px 0px;
    }

</style>