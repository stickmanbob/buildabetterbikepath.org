<script>
    // This component is the second panel on the main page, with a light background picture, 
    // bullet points of our main talking points, and a pic of the proposed construction
</script>

<section>
        <div class="column">
            <div class="column-inner">
                <h1>The Rincon Bike Path</h1>
                <ul>
                    <li>This bike path will connect carpineteria avenue with rincon beach and the rest of the coastal trail, however the current design has some serious drawbacks</li>
                    <li>The bike path is planned to be routed across a gap in the bluffs, requiring a bridge and tons of earthwork (over 40,000 truckloads!)</li>
                    <li>Reason why the path needs to be changed</li>
                    <li>Reason wny the path needs to be changed</li>
                </ul>
            </div>
        </div>

        <div class="column">
            <div class="column-inner">
                <h2>Current Path Routing</h2>
                <img src="" alt="" class="route-image">
                <ul>
                    <li>Disadvantage of path</li>
                    <li>Disadvantage of path</li>
                    <li>Disadvantage of path</li>
                </ul>

                <h2> New path routing</h2>
            </div>
        </div>
</section>

<style>
    section {
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        /* background-image: url("/assets/img/bates2.jpg");
        background-size: cover;
        background-position: center;
        opacity: 15%; */
    }
    section::before {
        content: "";
        position: absolute;
        top: 0; 
        left: 0;
        width: 100%; 
        height: 100%;  
        opacity: .4; 
        z-index: -1;
        background-size: cover;
        background-position: center;
        background-image: url("/assets/img/bates2.jpg");
    }

    .column {
        width: 50%;
    }

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