<template>
  <div class="py-4">
    <div class="container">
      <div v-if="loading" class="d-flex align-items-center ms-auto">
        <img src="../assets/loading.gif" alt="" style="margin: 0px auto" />
      </div>
      <div
        class="title border-bottom d-flex align-items-center justify-content-between py-2"
      >
        <h5>Task</h5>
        <!-- <button @click="ss = !ss">
          {{ ss ? 'Show' : 'Hide' }}
        </button> -->
        <div class="d-flex align-items-center ms-auto">
          <select @change="orderBy($event)">
            <option value="" hidden>-- Shorting by --</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button
            class="btn btn-outline-primary py-1 px-3 me-4"
            @click="shuffle"
          >
            Shuffle!
          </button>
          <!-- Dropdown -->
          <select v-model="category">
            <option value="" hidden>Pilih Category</option>
            <option value="kuliah">Kuliah</option>
            <option value="kantor">Kantor</option>
          </select>

          <!-- Form input pencarian -->
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="searchQuery"
          />

          <div class="d-flex align-items-center">
            <span class="me-2">View As</span>
            <button
              class="btn btn-outline-secondary py-1 px-3"
              @click="isGrid = !isGrid"
            >
              {{ isGrid ? "Grid" : "List" }}
            </button>
          </div>
        </div>
      </div>
      <transition-group name="tasks" tag="div" class="list-task row"
        >
        <CardItem
          v-for="(task, n) in tasks"
          :task="task"
          :key="task.id"
          :isGrid="isGrid"
        />
      </transition-group>
      <div class="action py-2">
        <a
          href="#"
          class="add-button"
          v-if="!isCreating"
          @click="isCreating = !isCreating"
          >Add Task</a
        >
        <div class="add-card" v-else>
          <form action="" v-on:submit.prevent="handleSubmit">
            <div class="card mb-2">
              <div class="card-body d-flex flex-column p-0">
                <input
                  class="form-control border-0 mb-2"
                  v-model="form.id"
                  placeholder="ID"
                  type="number"
                />
                <input
                  class="form-control border-0 mb-2"
                  v-model="form.title"
                  placeholder="Title"
                  type="text"
                />
                <textarea
                  class="form-control border-0 small"
                  placeholder="Description"
                  rows="3"
                  v-model="form.description"
                ></textarea>
                <select name="category" id="" v-model="form.category">
                  <option value="" hidden>-- Pilih Kategori --</option>
                  <option value="kuliah">Kuliah</option>
                  <option value="kantor">Kantor</option>
                </select>
              </div>
            </div>
            <div class="button-wrapper d-flex">
              <button class="btn btn-primary me-2" type="submit">Save</button>
              <button
                class="btn btn-outline-secondary"
                @click="isCreating = !isCreating"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/Card/CardItem.vue";

export default {
  components: {
    CardItem,
  },

  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Task 1",
          description: "ini deskripsi",
          isDone: false,
          category: "kuliah",
        },
        {
          id: 2,
          title: "Task 2",
          description: "ini deskripsi 2",
          isDone: false,
          category: "kantor",
        },
        {
          id: 3,
          title: "Task 3",
          description: " ini deskripsi 3",
          isDone: false,
          category: "kuliah",
        },
      ],
      category: "",
      // Variabel penampung teks pencarian
      searchQuery: "",
      // Status saat menambahkan task
      isCreating: false,
      // Tipe layout daftar task
      isGrid: false,
      // Variabel penampung form input
      form: {
        id: "",
        title: "",
        description: "",
        isDone: false,
        category: "",
      },
      loading: true,
    };
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 3000);

    if (localStorage.getItem("tasks")) {
      try {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      } catch (e) {
        localStorage.removeItem("tasks");
      }
    }
  },

  computed: {
    resultQuery() {
      if (this.category) {
        return this.tasks.filter((item) => {
          return this.category
            .toLowerCase()
            .split(" ")
            .every((v) => item.category.toLowerCase().includes(v));
        });
      } else if (this.searchQuery) {
        return this.tasks.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        console.log(this.tasks);
        return this.tasks;
      }
    },
  },

  methods: {
    handleSubmit() {
      if (!this.form) {
        return;
      }
      this.tasks.push(this.form);
      this.form = "";
      this.saveTasks();

      
    },
    removeTasks(x) {
      this.cats.splice(x, 1);
      this.saveTasks();
    },
    saveTasks() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", parsed);

      //output form
      this.tasks.push(
        Object.assign({}, this.form, {
          isDone: false,
          title: this.form.name,
          description: this.form.description,
          category: this.form.category,
        })
      );
    },

    shuffle() {
      this.tasks = _.shuffle(this.tasks);
    },
    orderBy(event) {
      this.tasks = _.orderBy(this.tasks, ["title"], [event.target.value]);
    },
  },
};
</script>

<style>
#app .tasks-move {
  transition: 0.4s;
}
</style>
