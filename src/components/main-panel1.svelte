<script>
    // This component is the top panel of the main page, with picture and intro box
</script>

<section>
    <div class="info-box">
        <div class="info-box-inner">
            <h1>Re-route the Rincon bike path to preserve our coastal bluffs!</h1>
            <a href="about:blank" class="link-button">Sign the Petition!</a>
        </div>
    </div>
</section>

<style>
    section {
        width: auto;
        height: 800px;
        background-image: url("../assets/img/bates1.jpg");
        background-size: cover;
        position: relative;
    }
    .info-box{
        background-color: white;
        position: absolute;
        top: 50%;
        transform: translateX(-50%);
        left: 50%;
        text-align: center;
    }

    .info-box-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1{
        font-size: 45px;
        margin-bottom: 15px;
    }

    .link-button{
        background-color: #E21C21;
        padding: 10px 15px;
        color: white;
        width: fit-content;
        margin-bottom: 20px;
        cursor: pointer;   
        border: 1px solid white; 
    }

    .link-button:hover{
        text-decoration: none;
        background-color: white;
        color: black;
        border: 1px solid black;
    }
</style>