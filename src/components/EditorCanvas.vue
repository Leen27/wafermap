<template>
  <div id="container">
    <v-stage ref="stageRef" :config="configKonva">
      <v-layer>
        <v-circle :config="waferConfig" />
      </v-layer>
      <v-layer>
        <v-group :config="waferGrid">
          <v-rect :config="waferGridBorder" />
          <v-line v-for="(linconfig, index) in xStepsGrid" :key="index" :config="linconfig" />
          <v-line v-for="(linconfig, index) in yStepsGrid" :key="index" :config="linconfig" />
          <v-rect
            v-for="(die, index) in dieArray"
            :key="index"
            :config="die"
            @mouseenter="handleCellEnter"
            @mouseleave="handleCellLeave"
            @click="handleCellClick"
          />
        </v-group>
      </v-layer>
      <v-layer ref="selectLayerRef"></v-layer>
    </v-stage>
  </div>
  <div id="ui">
    x: <input v-model.number="xSteps" /><br />
    y: <input v-model.number="ySteps" />
  </div>
</template>
<script lang="ts" setup>
import { useWaferMap } from './useWaferMap'
import { useSelector } from './useSelector'
const width = window.innerWidth
const height = window.innerHeight

const configKonva = {
  width,
  height
}

const {
  stageRef,
  xSteps,
  ySteps,
  waferConfig,
  waferGrid,
  waferGridBorder,
  xStepsGrid,
  yStepsGrid,
  dieArray,
  handleCellEnter,
  handleCellLeave,
  handleCellClick
} = useWaferMap()

const { selectLayerRef } = useSelector()
</script>
<style>
#container {
  border: 1px solid grey;
  background-color: rgb(241, 239, 239);
}

#ui {
  position: absolute;
  width: 200px;
  height: 600px;
  right: 0px;
  top: 0px;
  background-color: aquamarine;
  z-index: 9999;
}
</style>
