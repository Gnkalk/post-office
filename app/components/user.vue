<template>
    <div v-if="session.loggedIn">
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
        <TelegramLogin telegram-login="gnkalk_auth_bot" radius="10" @callback="loginCallback" />
    </div>
</template>

<script setup lang="ts">
const { session } = useUser();

const loginCallback = async (payload: TelegramUser) => {
    const res = await $fetch('/api/telegram/login', {
        method: 'POST',
        body: payload,
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (res.message === 'OK') {
        session.value = {
            loggedIn: true,
            // @ts-ignore
            ...res.user
        }
    }
}
</script>