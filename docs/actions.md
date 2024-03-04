---
outline: deep
---
# Actions

Actions are muatators of the state, and can access the whole store through `this` with automatic type detection.

```ts
import { createStore } from 'olallie';

const store = createStore({
  state: () => ({
    firstName: 'John',
    lastName: 'Doe',
    userPreferences: {}
  }),
  actions: {
    async fetchPreferences() {
      const data = await fetch(`/preferences/${this.fullName}`);
      this.setPreferences(data);
    },
    setPreferences(options) {
      this.userPreferences = options;
    },
  },
  getters: {
    fullName: (state) => `${store.firstName} ${}`,
  },
});

await store.fetchPreferences();
```

