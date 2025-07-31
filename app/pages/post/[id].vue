<template>
    <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-if="post">
        <div class="flex items-center gap-2">
            <PUAvatar :src="post.author.avatar!" shape="rounded" size="small" />
            <div class="flex flex-col">
                <div class="text-xl font-bold">
                    {{ post.author.name }}
                </div>
                <div class="text-xs">
                    {{ post.author.username }}
                </div>
            </div>
        </div>
        <p class="text-2xl">{{ post.text }}</p>
        <form @submit.prevent="submit" class="mb-4">
            <PUTextArea placeholder="Write your post here" v-model="replay" />
            <PUButton class="w-full">Send</PUButton>
        </form>
        <article class="border-2 border-stone-900 p-4 rounded-lg mb-1" v-if="post.replays" v-for="reply in post.replays"
            :key="reply.id">
            <div class="flex items-center gap-2">
                <PUAvatar :src="reply.author.avatar!" shape="rounded" size="small" />
                <div class="flex flex-col">
                    <div class="text-xl font-bold">
                        {{ reply.author.name }}
                    </div>
                    <div class="text-xs">
                        {{ reply.author.username }}
                    </div>
                </div>
            </div>
            <p class="text-2xl">{{ reply.text }}</p>
        </article>
    </article>
</template>

<script setup lang="ts">
const { params } = useRoute()
const { data: post } = await useFetch('/api/posts/:id', { params })


const replay = ref('')

const submit = async () => {
    await $fetch('/api/posts/replay', {
        method: 'POST',
        body: { text: replay.value, replayTo: params.id },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    replay.value = ''
}
</script>