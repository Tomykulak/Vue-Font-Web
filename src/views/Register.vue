<template>
  <NavBar />
  <v-container class="d-flex align-content-center">
    <v-row>
      <v-col>
        <v-container
          v-if="errorMessage"
          class="bg-amber
              text-black
              font-weight-bold"
        >
          <h1 >{{errorMessage}}</h1>
        </v-container>
        <h1>Create a new account</h1>
        <v-text-field
          name="email"
          label="Email"
          variant="outlined"
          id="email"
          v-model="email"
          type="email"
          required
        >
        </v-text-field>
        <v-text-field
          name="password"
          label="Password"
          variant="outlined"
          id="password"
          v-model="password"
          type="password"
          required
        >
        </v-text-field>
        <!--validation of password
        <v-text-field
         name="email"
         label="Confirm Password"
         id="confirmPassword"
         v-model="state.confirmPassword"
         type="password"
         :rules="comparePasswords"
        >
        </v-text-field>
        -->

        <v-btn id="register" @click="register" variant="outlined" color="black">Register</v-btn>
        <!--
        <v-btn @click="signInWithGoogle">Sign In With Google</v-btn>
        -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
  import router from "@/router";
  import NavBar from "@/components/NavBar.vue";


  const email = ref("")
  const password = ref("")
  const errorMessage = ref("")
  // register a new user
  const register = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("success register")
      router.push({ name: 'Home' });
    })
      .catch((error) => {
        errorMessage.value = error.code
        if(errorMessage.value == "auth/invalid-email"){
          errorMessage.value = "Wrong Email"
        }
        if(errorMessage.value == "auth/missing-password"){
          errorMessage.value = "Missing password"
        }
        if(errorMessage.value == "auth/weak-password"){
          errorMessage.value = "Password needs to be longer than 5 characters"
        }
        //console.log(error.code)
        //alert(error.message)
      })
  };
</script>
