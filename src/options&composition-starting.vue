<script>
  export default{
      data (){
        return {
        message: "Learning Vue",
        mode: "active",
        days: ['monday', 'tuesday', 'wednesday', 'friday'],
        link: "https://google.com"
      };
    },
    methods: {
      toggleMode(){
        if(this.mode ==='active'){
          this.mode = 'pending';
        } else if (this.mode === 'pending'){
          this.mode = 'inactive';
        } else {
          this.mode = 'active';
        }
      }
    },
  };
</script>

<template>

  <h1>{{ message }}</h1>
  <p v-if="mode === 'active'">Hey, Vue is Active</p>
  <p v-else-if="mode === 'pending'">Hey, Vue is loading</p>
  <!-- <p v-else-if="mode === 'inactive'">Chacharuu</p> -->
  <p v-else-if="mode === 'inactive'">Hey, Vue is not Active</p>

  <h3>Days</h3>
  <ul>
    <li v-for="day in days" :key="day">{{ day }}</li>
  </ul>
  <a v-bind:href="link">This Google</a>

    <button v-on:click="toggleMode">Change Mode</button>

</template>






<!-- composition starts here -->
 <script setup>
  import {ref, onMounted} from 'vue';

  const link = "https://google.com";
  const name = ref('Vue learning');
  const mode = ref('active');
  const days = ref(['monday', 'tuesday', 'wednesday', 'friday']);
  const newDay = ref('sdsafa');

  const toggleMode = () => {
    if(mode.value ==='active'){
      mode.value = 'pending';
    } else if (mode.value === 'pending'){
      mode.value = 'inactive';
    } else {
      mode.value = 'active';
    }
  };

  const addDay = () => {
    if(newDay.value.trim() != ""){
      days.value.push(newDay.value);
      newDay.value = "";
    }
  };

  const delDay = (index) => {
    days.value.splice(index, 1);
  }

  onMounted(
    async () => {
      try{
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        days.value = [...data].map((item) => item.name);
      } catch(err) {
        console.log(err);
      }
    }
  );
</script>

<template>

  <h1>{{ name }}</h1>

  <p v-if="mode === 'active'">Hey, Vue is Active</p>
  <p v-else-if="mode === 'pending'">Hey, Vue is loading</p>
  <!-- <p v-else-if="mode === 'inactive'">Chacharuu</p> -->
  <p v-else-if="mode === 'inactive'">Hey, Vue is not Active</p>

  <form @submit.prevent="addDay">
    <label for="newDay">Add Day</label>
    <input type="text" id="newDay" name="newDay" v-model="newDay">
    <button type="submit">submit</button>
  </form>

  <h3>Days</h3>
  <ul>
    <li v-for="(day, index) in days" :key="day">
      <span>{{ day }}</span>
      <button @click="delDay(index)">X</button>
    </li>
  </ul>
  <a v-bind:href="link">This Google</a>

    <button v-on:click="toggleMode">Change Mode</button>

</template>
