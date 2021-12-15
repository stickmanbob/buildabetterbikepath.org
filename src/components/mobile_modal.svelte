<script>
    // Mobile navigation modal

    //Props
    export let dismiss;
</script>

<section>
    <img class="x-button" src="assets/img/x_icon.png" alt="close menu" on:click={dismiss}>
    <div>
        <h1><a href="https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&recruiter=26187358&utm_source=share_petition&utm_medium=copylink&utm_campaign=share_petition">
            Sign the Petition</a></h1>
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

    a:hover{
        cursor: pointer;
        color: white;
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