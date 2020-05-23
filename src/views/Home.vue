<template>
  <div class="home">
    <h2>Todo list</h2>
    <v-container>
      <v-row>
        <v-col cols="4">
    <v-text-field
      autofocus
      placeholder="Input new todo"
      v-model="name"
    />
        </v-col>
        <v-col cols="7">
    <v-text-field
      placeholder="Description"
      v-model="description"
    />
        </v-col>
        <v-col cols="1">
    <v-btn v-on:click="create">create</v-btn>
        </v-col>
      </v-row>
    </v-container>
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
        @click="remove(item)"
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
import { Logger, API, graphqlOperation } from 'aws-amplify'

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
    this.logger = new Logger('HOME_component')
    this.list();
    API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (data) => {
        console.log(data);
        this.list();
      }
    });
    API.graphql(graphqlOperation(onUpdateTodo)).subscribe({
      next: (data) => {
        console.log(data);
        this.list();
      }
    });
    API.graphql(graphqlOperation(onDeleteTodo)).subscribe({
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
      API.graphql(graphqlOperation(listTodos, {}))
      .then((res) => {
        this.todos = res.data.listTodos.items;
        this.logger.info(`Todos successfully listed`, res)
      })
      .catch((e) => {
        this.logger.error(`Error listing Todos`, e)
      });
    },
    remove(id) {
      API.graphql(graphqlOperation(deleteTodo, {id}))
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
      API.graphql(graphqlOperation(createTodo, {input: {name: this.name, description: descStr}}))
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
