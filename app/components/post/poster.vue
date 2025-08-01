<template>
    <form @submit.prevent="submit" :class="class">
        <PUTextArea placeholder="Write your post here" v-model="text" />
        <PUButton class="w-full" icon-left="message" :disabled="!session.loggedIn">{{ replayTo ? `Replay to
            ${replayTo.name}` : 'Post' }}</PUButton>
    </form>
</template>

<script setup lang="ts">
const { session } = useUser()
const { replayTo } = defineProps<{
    class?: string;
    replayTo?: {
        name: string;
        id: string
    }
}>()

const text = ref('')

const replay = async (id: string) => {
    await $fetch('/api/posts/replay', {
        method: 'POST',
        body: { text: text.value, replayTo: id },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    text.value = ''
}

const post = async () => {
    await $fetch('/api/posts/create', {
        method: 'POST',
        body: { text: text.value },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    text.value = ''
}

const submit = async () => replayTo ? await replay(replayTo.id) : await post()
</script>