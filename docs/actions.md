---
outline: deep
---
# Actions

Actions are muatators of the state, and can access the whole store through `this` with automatic type detection.

```ts
import createStore from 'olallie';

const store = createStore({
  state: {
    firstName: 'John',
    lastName: 'Doe',
    userPreferences: {}
  },
  actions: {
    async fetchPreferences() {
      const res = await fetch(new URL(`https://${process.env.baseURL}/prefs/${this.fullName}`));
      this.setPreferences(res.options);
    },
    setPreferences(options) {
      this.userPreferences = options;
    },
  },
  getters: {
    fullName: (state) => `${state.firstName} ${state.lastName}`,
  },
});

await store.fetchPreferences();
```

