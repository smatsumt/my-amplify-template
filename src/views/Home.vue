<template>
  <div class="home">
    <h2>Todo list</h2>
    <v-text-field
      autofocus
      placeholder="Input new todo"
      v-model="name"
    />
    <v-text-field
      placeholder="Description"
      v-model="description"
    />
    <v-btn v-on:click="create">作成</v-btn>

  <v-data-table
    :headers="headers"
    :items="todos"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>

  </div>
</template>

<script>
import AmplifyStore from '@/store/'

import { listTodos }  from '../graphql/queries.js';
import { createTodo, deleteTodo }  from '../graphql/mutations.js';
import { onCreateTodo, onUpdateTodo, onDeleteTodo }  from '../graphql/subscriptions.js';

export default {
  name: 'Home',
  data () {
    return {
      name: '',
      description: '',
      todos: [],
      headers: [
        { text: 'Todo', align: 'start', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },
  mounted() {
    this.logger = new this.$Amplify.Logger('HOME_component')
    this.list();
    this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(onCreateTodo)).subscribe({
      next: (data) => {
        console.log(data);
        this.list();
      }
    });
    this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(onUpdateTodo)).subscribe({
      next: (data) => {
        console.log(data);
        this.list();
      }
    });
    this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(onDeleteTodo)).subscribe({
      next: (data) => {
        console.log(data);
        this.list();
      }
    });
  },
  computed: {
    userId: function() { return AmplifyStore.state.userId }
  },
  methods: {
    initialize() {
      // called from v-data-table
    },
    list() {
      this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(listTodos, {}))
      .then((res) => {
        this.todos = res.data.listTodos.items;
        this.logger.info(`Todos successfully listed`, res)
      })
      .catch((e) => {
        this.logger.error(`Error listing Todos`, e)
      });
    },
    remove(id) {
      this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(deleteTodo, {id}))
      .then((res) => {
        this.logger.info(`Todo ${id} removed`, res);
        this.list();
      })
      .catch((e) => {
        this.logger.error(`Error removing Todo ${id}`, e)
      })
    },
    create() {
      let descStr = this.description + " by " + AmplifyStore.state.user.username;
      this.$Amplify.API.graphql(this.$Amplify.graphqlOperation(createTodo, {input: {name: this.name, description: descStr}}))
      .then((res) => {
        this.logger.info(`Todo created`, res);
        this.list();
        this.note = '';
      })
      .catch((e) => {
        this.logger.error(`Error creating Todo`, e)
      })
    }
  }
}
</script>
