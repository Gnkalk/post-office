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
        <p v-if="post.id === $route.params.id" class="text-lg" dir="auto">{{ post.text }}</p>
        <NuxtLink :to="`/${post.id}`" v-else>
            <p class="text-lg" dir="auto">{{ post.text }}</p>
        </NuxtLink>
        <PostReactions :post="post" v-if="!isReplayTo" />
        <template v-if="post.replays">
            <PostPoster :replay-to="{
                id: post.id,
                name: post.author.name
            }" class="my-4" />
            <Post v-for="reply in post.replays" :key="reply.id" :post="reply" :is-replay-to="post.id" />
        </template>
    </article>
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';

const { session } = useUser()
const { add } = useToast()
const { params } = useRoute()
const router = useRouter()

const { post, isReplayTo } = defineProps<{
    post: Post
    isReplayTo?: string
}>()

const { mutate: deleteMuatate, isPending: isdeleteing } = useMutation({
    mutationFn: () =>
        $fetch(`/api/posts/${post.id}`, {
            method: 'DELETE',
        }),
    onSuccess: () => {
        refreshNuxtData(`posts`)
        clearNuxtData(`post-${post.id}`)
        add({
            severity: 'secondary',
            summary: 'Post deleted',
            detail: 'Your post has been deleted',
            life: 1000,
        })

        if (isReplayTo) {
            refreshNuxtData(`post-${isReplayTo}`)
        } else if (post.id === params.id) router.back()
    },
})

</script>