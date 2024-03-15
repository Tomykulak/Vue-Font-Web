<template>
  <v-container>
    <div v-if="fontStore.error">
      <Error v-if="fontStore.error" :message="fontStore.error" />
    </div>
    <div class="loading-container" v-if="fontStore.isLoading">
      <Loading />
    </div>
    <div v-else>
      <v-row>
        <!-- .slice for limiting range of fonts for loading purpose -->
        <v-col v-for="(font, index) in fontStore.fonts.slice(0, 100)" :key="index" cols="6">
          <!-- Font card -->
          <v-card class="pa-2">
            <v-img src="">
              <div :style="{
                'font-family': font.family
              }">
                <p>{{ font.family }}</p>
              </div>
              <v-btn
                :to="`/${font.family}`"
                color="black"
                class="ma-2">
                Edit
              </v-btn>
              <v-btn variant="outlined" color="black"
              @click = "DeleteFavoriteFont(font.family) ">
              Unfavorite
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
// API FROM GOOGLE
import { ref, onMounted } from 'vue';
import { useFontsStore } from "@/store/fonts";
import { db } from "@/main"
import {useUserStore} from "@/store/userStore";
import {id} from "vuetify/locale";
import {collection, getDocs, addDoc, query, where, updateDoc, UpdateData, deleteDoc} from "firebase/firestore";

const fontStore = useFontsStore();
const userStore = useUserStore()

// getUserFavoriteFonts
// card number increment++
const number = ref(0);
function getIncrementedNumber(index) {
  return number.value + index + 1;
}

onMounted(() => {
  fontStore.fetchFavoriteFonts(userStore.currentUser?.email);
});

//add fonts to favorites
// add fonts to favorites
async function AddFavoriteFonts(fontFamily: String) {
  const requestData = {
    userEmail: userStore.currentUser.email,
    fontFamily: fontFamily,
  };

  try {
    const docRef = await addDoc(collection(db, 'favorites'), requestData);
    console.log('Liked font added with ID:', docRef.id);

    // Clear the input field
  } catch (error) {
    console.error('Error adding liked font:', error);
  }
}

async function DeleteFavoriteFont(fontFamily: string) {
  const userEmail = userStore.user.email;

  try {
    const fontCollectionRef = collection(db, "favorites");
    const querySnapshot = await getDocs(
      query(fontCollectionRef, where("userEmail", "==", userEmail), where("fontFamily", "==", fontFamily))
    );

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      await deleteDoc(doc.ref);
      console.log("Font deleted successfully");

      // Fetch the updated favorite fonts after deletion
      fontStore.fetchFavoriteFonts(userEmail);
    } else {
      console.log("Font not found");
    }
  } catch (error) {
    console.error("Error deleting font: ", error);
  }
}



</script>


<style>
.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
