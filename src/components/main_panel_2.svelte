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
                    <li>This bike path will connect Carpinteria Avenue with Rincon Beach and the rest of the coastal trail, however the current design has some serious drawbacks</li>
                    <li>The bike path is planned to be routed across a gap in the bluffs, requiring a bridge and tons of earthwork (over 40,000 truckloads!)</li>
                    <li>Construction will require over 40,000 truckloads of dirt to be removed from the bluff, creating severe coastal erosion and greatly exascerbating traffic along the 101</li>
                    <li>The current design has a steep (5%) slope and empties into the Rincon Beach parking lot. This will likely lead to many accidents as bikers collide with cars at high speed</li>
                    <li>Better alternatives to this design exist, such as building the bike path on the north side of highway 101 and connecting it to the existing Ventura trail. However, <strong>they are not being considered by project planners or regulators</strong></li>
                    <li>This design would destroy the historic Bates Bluff hang gliding and paragliding site, which attracts pilots from all over the world</li>
                    <li>Approving this design would open the doors for development of the rest of Carpinteria's beautiful, pristine coastal bluffs</li>
                </ul>
        </div>

        <TwoCol>
            <div class="column-inner" slot="col1">
                <h2>Current Bike Path Design</h2>
                <img src="assets/img/path1.png" alt="Path over gap in bluffs, requiring bridge" class="route-image">
                <ul>
                    <li>Requires the construction of a bridge over eroding and unstable soil</li>
                    <li>Empties bikes into the crowded Rincon parking lot, a recipie for disaster</li>
                    <li>Will cost over $14,000,000 of taxpayer money to fund construction of the bridge</li>
                </ul>
            </div>

            <div class="column-inner" slot="col2">
                <h2>Alternate # 4 (preferred route)</h2>
                <img src="assets/img/path-alt-4.png" alt="Path along existing bench in north side of freeway" class="route-image">
                <ul>
                    <li>On the North side of the freeway, on stable ground</li>
                    <li>Will still connect with Rincon Beach and the rest of the Ventura trail</li>
                    <li>Will preserve our coastal bluffs and avoid massive seaside erosion/pollution</li>
                    <li>Will allow hang gliders and paragliders to continue to soar the historic Bates Bluff flying site</li>
                    <li>Far fewer truckloads of earth that needs to be moved and a fraction of the cost</li>
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
        height: auto;
        width: 100%;
        background: white;
        border: 1px solid white;
    }

    strong {
        font-weight: bold;
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