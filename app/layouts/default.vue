<template>
    <AppHeader />
    <main class="mx-auto mt-6 max-w-screen-sm max-sm:px-2">
        <slot />
    </main>
    <PUToast position="bottom-right" />
</template>

<style>
body {
    font-family: "Patrick Hand", sans-serif;
}
</style>