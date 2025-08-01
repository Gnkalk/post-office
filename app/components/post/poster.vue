<template>
    <form @submit.prevent="submit" :class="class">
        <textarea placeholder="Write your post here" v-model="text" name="text"
            :disabled="!session.loggedIn || isPosting || isReplaying"
            class="border-2 border-stone-900 w-full rounded-md p-2 focus:outline-none" />
        <PUButton class="w-full" icon-left="message" :disabled="!session.loggedIn || isPosting || isReplaying">{{
            isPosting ? 'Posting...' : isReplaying ?
                'Replaying...' :
                replayTo ? `Replay to
            ${replayTo.name}` : 'Post' }}</PUButton>
    </form>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query"

const { session } = useUser()
const { replayTo } = defineProps<{
    class?: string;
    replayTo?: {
        name: string;
        id: string
    }
}>()

const text = ref('')

const { mutate: replayMuatate, isPending: isReplaying } = useMutation({
    mutationFn: (arg: { text: string, replayTo: string }) =>
        $fetch('/api/posts/replay', {
            method: 'POST',
            body: { text: arg.text, replayTo: arg.replayTo },
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    onSuccess: () => {
        text.value = ''
        refreshNuxtData(`post-${replayTo?.id}`)
    },
})

const { mutate: postMuatate, isPending: isPosting } = useMutation({
    mutationFn: (arg: { text: string }) =>
        $fetch('/api/posts/create', {
            method: 'POST',
            body: { text: arg.text },
            headers: {
                'Content-Type': 'application/json',
            },
        }),
    onSuccess: () => {
        text.value = ''
        refreshNuxtData('posts')
    },
})

const submit = () => replayTo ? replayMuatate({ text: text.value, replayTo: replayTo.id }) : postMuatate({ text: text.value })
</script>