<script>
    // This component is the top panel of the main page, with picture and intro box
</script>

<section>
    <div class="info-box">
        <div class="info-box-inner">
            <h1>Re-route the Rincon bike path to preserve our coastal bluffs!</h1>
            <a href="https://www.change.org/p/carpinteria-city-council-save-bates-carpinteria-s-historic-flying-site-f1131508-0d82-4ded-802c-a1226c01e049?utm_content=cl_sharecopy_27790827_en-US%3A3&recruiter=26187358&utm_source=share_petition&utm_medium=copylink&utm_campaign=share_petition" class="link-button">
                Sign the Petition!</a>
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

        padding: 20px 30px; 
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
        cursor: pointer;   
        font-size: 24px;
        border: 1px solid white; 
    }

    .link-button:hover{
        text-decoration: none;
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    @media(max-width:600px){
        section {
            height: fit-content;
            padding: 10% 0%;
        }

        h1 {
            font-size: 24px;
        }

        .link-button {
            font-size: 18px;
        }
    }

    @media(max-width:650px){
        .info-box {
            position: relative;
            box-sizing: border-box;
            max-width: 90%;
        }
    }
</style>