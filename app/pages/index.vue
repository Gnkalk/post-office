<template>
    <div>
        <form @submit.prevent="submit">
            <PUTextArea placeholder="Write your post here" v-model="newpost" />
            <PUButton class="w-full">Send</PUButton>
        </form>
        <article v-for="post in posts" :key="post.id">
            <h2>{{ post.text }}</h2>
            <p>{{ post.author }}</p>
        </article>
    </div>
</template>

<script setup lang="ts">
const newpost = ref('')
const { data: posts, pending } = await useFetch('/api/posts')

const submit = async () => {
    const res = await $fetch('/api/posts/create', {
        method: 'POST',
        body: { text: newpost.value },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    newpost.value = ''
}
</script>