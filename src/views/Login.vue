<template>
  <v-container class="d-flex">
    <NavBar />
      <v-row>
          <v-col>
            <!-- Error message -->
            <v-container
              v-if="errorMessage"
              class="bg-amber
              text-black
              font-weight-bold"
            >
              <h1 >{{errorMessage}}</h1>
            </v-container>
            <!-- END Error message -->

            <h1 class="h1-title">Login</h1>
            <v-text-field cols="7"
              name="email"
              label="Email"
              id="email"
              v-model="email"
              type="email"
              variant="outlined"
              required
            >
            </v-text-field>
            <v-text-field class="textfield"
              name="password"
              label="Password"
              id="password"
              v-model="password"
              type="password"
              variant="outlined"
              required
            >
            </v-text-field>
              <v-btn id="login-button" color="black" @click="login" class="ma-2" >Login</v-btn>
              <v-btn @click="signInWithGoogle" variant="outlined" color="black">Sign In With Google</v-btn>
            <v-row class="pa-3 pa-lg-4">
              <v-col>
                Need a new account?
                <router-link id="register" to="/register" >
                  <v-btn variant="outlined" color="black">
                    Register
                  </v-btn>
                </router-link>
              </v-col>

            </v-row>


            </v-col>

            </v-row>
    </v-container>
</template>

<script lang="ts" setup>

  import NavBar from "@/components/NavBar.vue";
  import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
  } from "firebase/auth";
  import {ref} from "vue";
  import router from "@/router";
  import { useUserStore } from "@/store/userStore"

  const userStore = useUserStore();
  const email = ref("")
  const password = ref("")
  const errorMessage = ref("")

  const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then((data) => {
        userStore.login(data.user);
        console.log("success")
        router.push({ name: 'Home' });
      })
      .catch((error) => {
        console.log(error.code)
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage.value = "Invalid email"
            break;

          case "auth/user-not-found":
            errorMessage.value = "No account with that email was found"
            break;

          default:
            errorMessage.value = "Email or password was incorrect"
            break;
        }
      })
  };


  // TODO SignInGoogle
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result)=> {
        userStore.login(result.user);
        router.push("/");
      })
      .catch((error) => {
        // error here
      })
  };

</script>

<style>
@font-face {
  font-family: 'Pretendard regular';
  src: url('../fonts/PretendardStd-Regular.woff') format('truetype');
}
@font-face {
  font-family: 'Pretendard light';
  src: url('../fonts/PretendardStd-Light.woff') format('truetype');
}

@font-face {
  font-family: 'Pretendard bold';
  src: url('../fonts/PretendardStd-Bold.woff') format('truetype');
}


.h1-title{
  font-family: "Pretendard bold";

}


</style>
