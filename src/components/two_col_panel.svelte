<script>
    // This component takes in children and arranges them in 2 columns
    // horizontal on desktop, vertically stacked on mobile
</script>

<section>
    <div class="column">
        <slot name="col1"></slot>
    </div>

    <div class="column">
        <slot name="col2"></slot>
    </div>
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
    .column {
        display: flex;
        flex-direction: column;
        align-items: center;
        width:50%;
    }

    @media(max-width:600px){
        section{
            flex-direction: column;
        }

        .column{
            width: 100%;
        }
    }
</style>

