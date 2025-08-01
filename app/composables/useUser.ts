export const useSessionState = () =>
  useState<Session>('telegram-session', () => ({ loggedIn: false }));

export function useUser(): {
  session: Ref<Session>;
  clearSession: () => Promise<void>;
} {
  fetchSession();
  const session = useSessionState();
  return { session, clearSession };
}

export const clearSession = async () => {
  await $fetch('/api/telegram/session', { method: 'DELETE' });
  useSessionState().value = { loggedIn: false };
  reloadNuxtApp();
};

export const fetchSession = async () => {
  const sessionState = useSessionState();
  const { data } = await useAsyncData<Session>('telegram_auth', () =>
    useRequestFetch()('/api/telegram/session')
  );
  sessionState.value = data.value ? data.value : { loggedIn: false };
};
