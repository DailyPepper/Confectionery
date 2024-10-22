<template>
    <div class="checkbox-rect">
        <input
            type="checkbox"
            :id="id"
            :disabled="isDisabled"
        />
        <label :for="id"></label>
    </div>
</template>

<script setup lang="ts">
defineProps({
    id: {
        type: String,
        required: true,
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
});
</script>

<style scoped lang="scss">
input[type="checkbox"] {
    cursor: pointer;
}

.checkbox-rect {
    display: inline-block;
    position: relative;
}

.checkbox-rect input[type="checkbox"] {
    display: none;
}

.checkbox-rect input[type="checkbox"]+label {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 0;
    font: 14px/20px "Open Sans", Arial, sans-serif;
    cursor: pointer;
    height: 14px;
    padding: 6px;
}

.checkbox-rect input[type="checkbox"]:hover+label:hover {
    color: rgba(255, 139, 22, 1);
}

.checkbox-rect input[type="checkbox"]:hover+label:before {
    background: rgb(250, 154, 57);
    box-shadow: inset 0px 0px 0px 2px #f7f2f2;
}

.checkbox-rect input[type="checkbox"]+label:before {
    content: "";
    display: block;
    width: 14px;
    height: 14px;
    border: 1px solid #343a3f;
    border-radius: 0.2em;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.2s, background 0.2s ease-in-out;
    background: #f3f3f3;
}

.checkbox-rect input[type="checkbox"]:checked+label:before {
    width: 14px;
    height: 14px;
    border-radius: 0.2em;
    border: 1px solid #fff;
    transform: rotate(90deg);
    background: rgba(255, 139, 22, 1);
    box-shadow: 0 0 0 1px #000;
}
</style>
