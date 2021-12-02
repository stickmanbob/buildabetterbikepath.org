<script>
    // This component is the second panel on the main page, with a light background picture, 
    // bullet points of our main talking points, and a pic of the proposed construction

    //Imports
    import TwoCol from "./two_col_panel.svelte";
</script>

<section>
        <div class="text-block">
            <h1>The Rincon Bike Path - End of Carpinteria Avenue to Rincon Beach Parking Lot</h1>
                <ul>
                    <li>This bike path will connect carpineteria avenue with rincon beach and the rest of the coastal trail, however the current design has some serious drawbacks</li>
                    <li>The bike path is planned to be routed across a gap in the bluffs, requiring a bridge and tons of earthwork (over 40,000 truckloads!)</li>
                    <li>Reason why the path needs to be changed</li>
                    <li>Reason wny the path needs to be changed</li>
                </ul>
        </div>

        <TwoCol>
            <div class="column-inner" slot="col1">
                <h2>Current Bike Path Design</h2>
                <img src="" alt="" class="route-image">
                <ul>
                    <li>Disadvantage of path</li>
                    <li>Disadvantage of path</li>
                    <li>Disadvantage of path</li>
                </ul>
            </div>

            <div class="column-inner" slot="col2">
                <h2>Alternate # 4 (preferred route)</h2>
                <img src="" alt="" class="route-image">
                <ul>
                    <li>advantage of path</li>
                    <li>advantage of path</li>
                    <li>advantage of path</li>
                </ul>
            </div>
        </TwoCol>
</section>

<style>
    section {
        width: auto;
        height: fit-content;
        padding: 5%;
        padding-top: 0%;
        padding: 0px 5%; 
        display: flex;
        flex-direction: column;
        align-items: center;
        /* position: relative; */
        background-color: #DAE9F2;
    }
    /* section::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: .2; 
        z-index: -1;
        background-size: cover;
        background-position: center;
        background-image: url("../assets/img/bates3.jpg");
    } */

    .text-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 30px 0px;
    }

    .text-block h1 {
        font-size: 36px;
        text-align: center;
    }

    .text-block ul {
        margin-top: 20px; 
    }

    li {
        font-size: 26px;
        margin: 10px 0px; 
    }


    .column-inner {
        display: flex;
        width: 95%; 
        flex-direction: column;
        align-items: center;
    }

    .column-inner h2 {
        text-align: center;
        font-size: 28px;
    }

    .route-image {
        height: 400px;
        width: 100%;
        background: white;
        border: 1px solid white;
    }

    @media(max-width:600px) {

        section {
            padding: 10px;
        }

        .text-block {
            width: 100%;
            box-sizing: border-box;
        }

        .text-block h1 {
            font-size: 24px;
        }

        ul {
            width: 100%;
        }

        li {
            font-size: 20px;
        }

        .column-inner {
            margin-top: 10px;
        }

        h2 {
            margin-bottom: 5px;
        }
    }
</style>