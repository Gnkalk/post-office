<template>
    <NuxtLink :to="`/profile/${user.username}`">
        <div class="flex items-center gap-2">
            <PUAvatar :src="user.avatar ?? '/empty-user.svg'" shape="rounded" size="small" />
            <div class="flex flex-col">
                <div class="text-md font-bold">
                    {{ user.name }}
                </div>
                <div class="text-xs">
                    {{ user.username }}
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
    user: {
        name: string;
        username: string;
        avatar: string | null;
    };
}>()
</script>