<script>
    // This component is the second panel on the main page, with a light background picture, 
    // bullet points of our main talking points, and a pic of the proposed construction

    //Imports
    import TwoCol from "./twocolpanel.svelte";
</script>

<section>
        <div class="inner">
            <h1>The Rincon Bike Path</h1>
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
        height: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        background-color: #DAE9F2;
        /* background-image: url("/assets/img/bates2.jpg");
        background-size: cover;
        background-position: center;
        opacity: 15%; */
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


    .column-inner {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0% 5%;
    }

    .route-image {
        height: 400px;
        background: white;
    }
</style>