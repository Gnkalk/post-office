<template>
    <div v-if="session?.loggedIn">
        <NuxtLink to="/profile" class="flex items-center gap-2">
            <PUAvatar :src="session.photo_url" shape="rounded" />
            <div class="flex flex-col">
                <div class="text-xl font-bold">
                    {{ session.first_name }}
                </div>
                <div class="text-xs">
                    {{ session.username }}
                </div>
            </div>
        </NuxtLink>
    </div>
    <div v-else>
        <TelegramLoginWidget telegram-login="gnkalk_auth_bot" />
    </div>
</template>

<script setup lang="ts">
const { session } = useUserSession();
</script>