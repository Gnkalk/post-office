<template>
    <nav class="flex items-center justify-between border-b-4 border-stone-900 p-6">
        <NuxtLink to="/">
            <div class="flex gap-2 items-center">
                <PUIcon name="building" height="30" width="30" />
                <h1 class="font-bold text-3xl">
                    Post Office
                </h1>
            </div>
        </NuxtLink>
        <div class="flex items-center gap-4">
            <UserProfile />
            <PUButton @click="show">New Post</PUButton>
        </div>
    </nav>
    <PUModal>
        <template #header>
            <h2 class="text-2xl font-bold mb-1 text-center">Post a new Thing</h2>
        </template>
        <template #content>
            <PostPoster :hide="hide" />
        </template>
        <template #footer>
            <PUButton flavor="ghost" @click="hide" custom-class="w-full">Cancel</PUButton>
        </template>
    </PUModal>
</template>

<script setup lang="ts">
const { show, hide } = useModal()
</script>