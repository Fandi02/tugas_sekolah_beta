<template>
  <div
    :class="[
      'item-task d-flex align-items-start border-bottom pt-3 pb-4',
      isGrid ? 'col-12 col-md-6 col-lg-4' : 'col-12',
    ]"
  >
    <input
      type="checkbox"
      name="status"
      id="task"
      class="me-2 mt-2"
      :checked="task.isDone"
      v-model="task.isDone"
      v-on:click.prevent="isDone"
    />
    <div
    v-if="!task.isDone"
      :class="[
        'd-flex flex-column',
        task.isDone ? 'text-decoration-line-through fst-italic' : '',
      ]"
    >
      <nuxt-link class="title-task mb-1" :to="'app/detail/' + task.id">
          {{ task.title }}
      </nuxt-link>
      <div class="description-task small text-muted">
        {{ task.description }}
      </div>
      <div class="description-task small text-muted">
        {{ task.category }}
      </div>
      <input class="form-control form-control-sm" type="date" />
    </div>
    <span v-else>Task selesai</span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  props: {
    task: {
        type: Object,
        default: 'Untitled',
    },
    isGrid: {
        type: Boolean,
        required: true,
        default: false,
    },
  },

...mapState("tasks", ["tasks"]),

  methods: {
    isDone() {
      // this.$store.commit('tasks/ADD_TASK', this.form);
      // this.$store.commit('tasks/ADD_TASK', this.form);
      this.$store.commit('tasks/isDone', this.isDone);
    },
  },
};
</script>
