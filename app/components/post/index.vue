<template>
    <article class="border-2 border-stone-900 p-4 rounded-lg mb-1">
        <div class="flex justify-between">
            <PostUser :user="post.author" />
            <div class="flex flex-col items-end">
                <span class="text-stone-700 text-sm">{{ post.publishedAt.toLocaleString() }}</span>
                <PUButton icon-right="trash-alt" flavor="ghost" @click="deleteMuatate()" :disabled="isdeleteing"
                    v-if="session.loggedIn && post.author.username === session.username" />
            </div>
        </div>
        <p v-if="post.id === $route.params.id" class="text-2xl">{{ post.text }}</p>
        <NuxtLink :to="`/${post.id}`" v-else>
            <p class="text-2xl">{{ post.text }}</p>
        </NuxtLink>
        <PostPoster :replay-to="{
            id: post.id,
            name: post.author.name
        }" class="my-4" />
        <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-if="post.replays" v-for="reply in post.replays"
            :key="reply.id">
            <PostUser :user="reply.author" />
            <NuxtLink :to="`/${reply.id}`">
                <p class="text-2xl">{{ reply.text }}</p>
            </NuxtLink>
        </article>
    </article>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';

const { session } = useUser()

const { post } = defineProps<{
    post: Post
}>()

const { mutate: deleteMuatate, isPending: isdeleteing } = useMutation({
    mutationFn: () =>
        $fetch(`/api/posts/${post.id}`, {
            method: 'DELETE',
        }),
    onSuccess: () => {
        refreshNuxtData(`posts`)
        clearNuxtData(`post-${post.id}`)
    },
})

</script>