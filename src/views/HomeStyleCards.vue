<template>
  <v-container>
    <div v-if="fontStore.error">
      <Error v-if="fontStore.error" :message="fontStore.error" />
    </div>
    <div class="loading-container" v-if="fontStore.isLoading">
      <Loading />
    </div>

    <div v-else>
      <!--
      <v-row>
        <v-col>
          <SearchBar @search="searchFont"/>
        </v-col>
      </v-row>
      -->
      <v-row>
        <!-- .slice for limiting range of fonts for loading purpose -->
        <v-col v-for="(font, index) in filteredFonts().slice(0, 20)" :key="index" cols="6">
          <!-- Font card -->
          <v-card class="pa-5" :style="{

          }">
            <v-img src="">
              <div :style="{
                'font-family': font.family
              }">
                <p class="title">{{ font.family }}</p>
              </div>
              <v-btn
                     :to="`/${font.family}`"
                     color="black"
                     class="ma-2">
                Edit
              </v-btn>
              <v-btn v-if="isLoggedIn" variant="outlined"
              @click="AddFavoriteFonts(font.family)">
               Favorite
              </v-btn>

            </v-img>
          </v-card>

          <!-- END Font card -->
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading.vue";
import SearchBar from "@/components/SearchBar.vue";

// API FROM GOOGLE
import {ref, onMounted, computed} from 'vue';
import { useFontsStore } from "@/store/fonts";
import {useUserStore} from "@/store/userStore";
import {id} from "vuetify/locale";
import {collection, getDocs, addDoc, query, where, updateDoc, UpdateData, deleteDoc, doc} from "firebase/firestore";
import { db } from "@/main"
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Font} from "@/model/Font";


const props = defineProps(["searchRef"])

const isLoggedIn = ref(false);
const userStore = useUserStore()
const auth = getAuth();

const fontStore = useFontsStore();

// card number increment++
const number = ref(0);

const searchFont = (name: string) => {
  console.log('Search font: ', name);
  fontStore.fonts.value = [name];
};

const filteredFonts = (): [] => {
  if (props.searchRef == "") {
    return fontStore.fonts
  }
  return fontStore.fonts.filter((font) =>
    font.toLowerCase().includes(props.searchRef.value.toLowerCase()))
}

function getIncrementedNumber(index) {
  return number.value + index + 1;
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
  fontStore.fetchFonts();
});

async function AddFavoriteFonts(fontFamily) {
  const requestData = {
    userEmail: userStore.user.email,
    fontFamily: fontFamily,
  };

  try {
    // Check if the font already exists
    const querySnapshot = await getDocs(
      query(collection(db, 'favorites'), where('fontFamily', '==', fontFamily))
    );

    if (!querySnapshot.empty) {
      console.log('Font is already a favorite.');
      return; // Exit the function if it's a duplicate
    }

    // Insert the font if it's not a duplicate
    const docRef = await addDoc(collection(db, 'favorites'), requestData);
    console.log('Liked font added with ID:', docRef.id);

    // Clear the input field
  } catch (error) {
    console.error('Error adding liked font:', error);
  }
}

const font = ref<Font | null>(null);
/*
const toggleFavorite = (font) => {
  if (font != null){
    fontStore.toggleFavorite(font.fontFamily)
  }
};

const isFavorite = computed((font) => {
  if(font !== null) {
    return fontStore.isFavorite(font.fontFamily)
  }
  return false
});
*/


</script>


<style>
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title{
  font-size: 35px;

}
</style>
