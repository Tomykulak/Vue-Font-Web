<template>
  <!-- Navbar -->
  <v-app-bar :elevation="2" app>
    <v-container class="d-flex align-content-center">
      <v-row>
        <v-col cols="4">
          <router-link to="/" class="textLink">
           Home
          </router-link>
        </v-col>
        <v-col cols="4" class="d-flex align-center text-center fill-height">
          <v-toolbar-title class="webName">Google Font Browser</v-toolbar-title>
        </v-col>
        <!-- Login-->
        <v-col cols="2" class="favorite">
        <router-link to="/favoriteFonts" v-if="userStore.isLoggedIn" class="textLink">
            Favorite
        </router-link>
        </v-col>

        <v-col cols="2" class=" d-flex align-right text-right fill-height">
          <!-- Not Yet Logged in user-->
          <v-toolbar-title v-if="!isLoggedIn" class="ml-3">
              <router-link to="/login" class="textLink">
              Log in
              </router-link>
          </v-toolbar-title>
          <!-- END Not Yet Logged in user-->

          <!-- Logged in user-->
          <v-toolbar-title v-if="isLoggedIn" class="ml-3">
            <router-link to="/login" @click="handleSignOut" class="textLink">
                Log out

            </router-link>
          </v-toolbar-title>
          <!-- END Logged in user-->
        </v-col>
        <!-- END Login-->
      </v-row>
    </v-container>
  </v-app-bar>
  <!-- END navbar -->

</template>
<script setup>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {onMounted, ref} from "vue";
import router from "@/router";
import {useUserStore} from "@/store/userStore";


const isLoggedIn = ref(false);
const userStore = useUserStore()

const auth = getAuth();
onMounted(()=> {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  }).catch((error) => {
    // An error happened.
  });
}
// signout



</script>

<style scoped>
@font-face {
font-family: 'Pretendard regular';
  src: url('../fonts/PretendardStd-Regular.woff') format('truetype');
}
@font-face {
  font-family: 'Pretendard light';
  src: url('../fonts/PretendardStd-Light.woff') format('truetype');
}

.webName {
  font-family: 'Pretendard regular';
  font-size: 20px;
}
a{
  text-decoration:none;
  color: black;
}
.textLink{
  text-decoration: none;
  font-family: Pretendard std;
  font-family: 'Pretendard light';
  font-size: 16px;
  cursor: pointer;
  position: relative;
  margin: 100% auto;
  width: max-content;
}
.textLink::after{
  content: "";
  position: absolute;
  bottom: -5px;
  height: 1px;
  width: 100%;
  left: 0;
  background-color: black;
  transition: 0.3s;
  transition-timing-function: ease-in-out;
  transform: scaleX(0);
}
.textLink:hover::after{
  transform: scaleX(1);
}

.favorite{
  padding-top: 1em;
}
</style>
