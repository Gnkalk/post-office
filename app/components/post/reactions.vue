<template>
    <div v-if="pending || isReactionPending" class="bg-stone-200 rounded-full px-4 py-1 my-2">
        <span class="text-sm">
            🔄 {{ " " }}
        </span>
        Loading...
    </div>
    <div class="flex gap-2 my-2" v-else>
        <span v-for="reaction in data?.reactions" :key="reaction.type" class="bg-stone-200 rounded-full px-4 py-1"
            @click="addReaction(reaction.type)">
            <span class="text-sm">
                {{ emojis[reaction.type] }}
            </span>
            <span class="ml-2">
                {{ reaction.count }}
            </span>
        </span>
        <div class="bg-stone-200 rounded-full px-4 pb-1 text-xl cursor-pointer">
            <span @click="newReactionOpen = !newReactionOpen">
                +
            </span>
            <span class="ml-2 text-sm" v-show="newReactionOpen" v-for="[type, emoji] in Object.entries(emojis)"
                @click="() => { addReaction(type); newReactionOpen = false }">{{ emoji
                }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
const emojis = {
    heart: '❤️',
    joy: '😂',
    poo: '💩',
    like: '👍',
    dislike: '👎',
    moyai: '🗿',
}

const newReactionOpen = ref(false)

const { post } = defineProps<{
    post: Post
}>()

const { data, pending } = await useFetch<Reactions>(`/api/posts/${post.id}/reactions`, { key: `post-${post.id}-reactions`, lazy: true })

const { mutate: addReaction, isPending: isReactionPending } = useMutation({
    mutationFn: (type: string) =>
        $fetch(`/api/posts/${post.id}/react`, {
            method: 'POST',
            body: {
                type,
            },
        }),
    onSuccess: () => {
        refreshNuxtData(`post-${post.id}-reactions`)
    },
})
</script>