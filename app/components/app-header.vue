<template>
    <nav class="flex items-center justify-between border-b-4 border-stone-900 p-6">
        <NuxtLink to="/">
            <h1 class="font-bold text-3xl">
                Post Office
            </h1>
        </NuxtLink>
        <div class="flex items-center gap-4">
            <User />
            <PUButton @click="show">New Post</PUButton>
        </div>
    </nav>
    <PUModal>
        <template #header>
            <h2 class="text-2xl">Custom Header</h2>
        </template>
        <template #content>
            <div class="custom-content">
                <PUIcon name="info" />
                <p>Custom modal content here</p>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2">
                <PUButton @click="hide">Confirm</PUButton>
                <PUButton flavor="ghost" @click="hide">Cancel</PUButton>
            </div>
        </template>
    </PUModal>
</template>

<script setup lang="ts">
const { show, hide } = useModal()
</script>