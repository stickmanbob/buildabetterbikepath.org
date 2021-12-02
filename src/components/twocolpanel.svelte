<script>
    // This component takes in children and arranges them in 2 columns
</script>

<div class="column">
    <slot name="col1"></slot>
</div>

<div class="column">
    <slot name="col2"></slot>
</div>

<style>
    .column {
        width:50%;
    }
</style>

