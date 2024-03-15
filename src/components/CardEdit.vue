<template>
  <v-container>
    <v-row>
      <v-col cols="5">
          <div class="pa-1">
            <h1>
              {{ fontFamily }}
            </h1>
          </div>
          <br>
          <v-select
            v-model="fontWeight"
            label="Font Weight"
            variant="outlined"
            :items="['normal','italic', 'bold', 'semibold']"
            @change="updateFontWeight"
          ></v-select>
          <v-text-field
            v-model="baseText"
            label="Type something"
            variant="outlined"
            @input="updateText"
          ></v-text-field>
          <v-text-field
            v-model="fontSize"
            label="Font Size"
            type="number"
            variant="outlined"
            @input="updateFontSize"
          ></v-text-field>
          <v-text-field
            v-model="fontColor"
            label="Font Color"
            type="color"
            variant="outlined"
            @input="updateFontColor"
          ></v-text-field>
          <v-text-field
            v-model="backgroundColor"
            label="Background Color"
            type="color"
            variant="outlined"
            @input="updateBackgroundColor"
          ></v-text-field>
      </v-col>
      <v-col cols="7" :style="backgroundColorStyle" class="rounded">
          <div :style="{
               'font-size': fontSize + 'px',
               'color': fontColor,
               'font-family': fontFamily,
               'font-weight': fontWeight,
               'display': 'flex',
               'justify-content': 'center',
               'align-items': 'center',
               'height': '100%',
               'word-break': 'break-all'
             }">
            <h1>
              <div class="" :style="baseTextStyle">
                <h1>{{ baseText }}</h1>
              </div>
            </h1>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import {ref, computed, onMounted, watch, onBeforeMount} from 'vue';
import {useRouter} from "vue-router";
import {Font} from "@/model/Font";


const baseText = ref('Ahoj Ivo');
const fontSize = ref(34);
const fontColor = ref('#000000');
const backgroundColor = ref('#FFFFFF');
const fontFamily = ref('');
const fontWeight = ref('normal');
let fonts: Font[]
fontFamily.value = <string>useRouter().currentRoute.value.params.fontFamily


onMounted(() => {
  updateFontFamily()
  updateFontWeight()

});

function updateFontWeight() {
  baseTextStyle.value['font-weight'] = fontWeight.value;
}

function updateFontFamily() {
  // Update the font family value
  baseTextStyle.value['font-family'] = fontFamily.value;
}

function updateBackgroundColor() {
  backgroundColorStyle.value['background-color'] = backgroundColor.value;
}


const baseTextStyle = computed(() => ({
  'font-size': fontSize.value + 'px',
  'color': fontColor.value,
  'font-family': fontFamily.value,
  'font-weight': fontWeight.value,
}));

const backgroundColorStyle = computed(() => ({
  'background-color': backgroundColor.value,
}));


</script>

<style>
</style>
