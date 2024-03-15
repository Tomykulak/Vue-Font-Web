import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import {Font} from "@/model/Font";
import {computed, reactive, ref} from "vue";
import axios from "axios";
import {axiosInstance} from "@/code/api";
import {useUserStore} from "@/store/userStore";

import {collection, getDocs, addDoc, query, where, updateDoc, UpdateData, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/main"

const LS_FAVORITE_KEY = "favorite_fonts";

export const useFontsStore = defineStore("fonts",()=> {
  const router = useRouter()
  const fonts = reactive<Font[]>([]);
  // const fonts = ref([]);
  const isLoading = ref(false);
  const error = ref<string | null >(null);

  const userStore = useUserStore();

  const apiKey =
    'AIzaSyCh36zTr9ygQwkNWi0f6Gi6YO26HaATOVs'
  const apiURL =
    'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey

  const apiFavURL =  'https://www.googleapis.com/webfonts/v1/webfonts?family='
    //https://www.googleapis.com/webfonts/v1/webfonts?family=Abel&key=AIzaSyCh36zTr9ygQwkNWi0f6Gi6YO26HaATOVs
  async function fetchFavoriteFonts(email: String) {
    isLoading.value = true;

    let fontFamily = []

    const fontCollectionRef = collection(db, 'favorites');
    const querySnapshot = await getDocs(
      query(
        fontCollectionRef,
        where('userEmail', '==', email)
      )
    );
console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      //fontFamily.push(...doc.data().fontFamily)
      const docFontFamily = doc.data().fontFamily;
      fontFamily.push(...docFontFamily.split(",").map(value => value.charAt(0).toUpperCase() + value.slice(1)));
    });


    console.log("fontFamily: "+fontFamily)

    fonts.splice(0, fonts.length);

    await Promise.all(fontFamily.map(async (family) => {
      try {
        const response = await axios.get(apiFavURL + family + "&key=" + apiKey);
        fonts.push(...response.data.items);
      } catch (e) {
        console.log(e);
        error.value = "Cannot find any fonts. 😢";
      }
    }));

    isLoading.value = false;
  }

//fetch fonts
  async function fetchFonts() {
    isLoading.value = true;
    try {
      const response = await axios.get(apiURL);
      fonts.splice(0, fonts.length);
      fonts.push(...response.data.items);
      } catch (e: any) {
        console.log(e);
        error.value = "Cannot find any fonts. 😢";
      } finally {
        isLoading.value = false;
      }
  }

  const favoriteIds = ref<number[]>(JSON.parse(localStorage.getItem(LS_FAVORITE_KEY) || "[]"));
//favorite func
  function toggleFavorite(fontId: number) {
    const index = favoriteIds.value.findIndex(id => id === fontId);

    if (index !== -1) {
      favoriteIds.value.splice(index, 1);
    } else {
      favoriteIds.value.push(pokemonId)
    }

    localStorage.setItem(LS_FAVORITE_KEY, JSON.stringify(favoriteIds.value))
  }

  function isFavorite(fontId: number) {
    return favoriteIds.value.includes(fontId);
  }
  const favoritesCount = computed(() => favoriteIds.value.length);

  return {
    fonts,
    isLoading,
    error,
    fetchFonts,
    fetchFavoriteFonts,
    toggleFavorite,
    isFavorite,
    favoritesCount,
    favoriteIds,
  };
});
