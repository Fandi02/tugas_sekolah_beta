export const state = () => ({
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
  newTask: null,
});

export const mutations = {
  ADD_TASK(state, task) {
    console.log("masuk mutation");
    state.tasks.push(task);
  },
  isDone(state, isDone) {
      var coba = state.tasks.isDone = true;
      console.log(coba);
  }
};

export const actions = {
  addTask(context, task) {
    context.commit("ADD_TASK", task);
  },
  isDone(context, isDone) {
    var test = context.commit("isDone", isDone == true);
    console.log("ini", test);
  },
};  

export const getters = {
  getTasks: (state) => {
    return state.tasks;
  },
  getTaskById: (state) => (id) => {
    console.log("task: ", id);
    return state.tasks.find((task) => task.id == id);
  },
};


// export const isDone = (state) => {
//   return state.tasks.filter((task) => task.isDone == true);
// };