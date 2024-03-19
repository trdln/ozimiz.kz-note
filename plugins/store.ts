export default defineNuxtPlugin(() => {
  const store = useStore();
  return {
    provide: {
      store: store,
    },
  };
});
