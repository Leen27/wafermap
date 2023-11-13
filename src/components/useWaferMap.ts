import { computed, ref, watchEffect } from 'vue'
import Konva from 'konva'

const waferConfig = {
  x: 800,
  y: 450,
  radius: 400,
  fill: 'grey'
}

const waferGrid = {
  width: 800,
  height: 800,
  x: 400,
  y: 50
}

const waferGridBorder = {
  width: 800,
  height: 800,
  x: 0,
  y: 0,
  strokeWidth: 2,
  stroke: 'black'
}

const xSteps = ref(40)
const ySteps = ref(40)
const cellwidth = computed(() => waferGrid.width / xSteps.value)
const cellHeight = computed(() => waferGrid.height / ySteps.value)

const xStepsGrid = computed(() =>
  Array(xSteps.value)
    .fill(1)
    .map((_, index) => ({
      x: index * cellwidth.value,
      y: 0,
      points: [0, 0, 0, waferGrid.height],
      stroke: 'rgba(0, 0, 0, 0.2)',
      strokeWidth: 1
    }))
)

const yStepsGrid = computed(() =>
  Array(ySteps.value)
    .fill(1)
    .map((_, index) => ({
      x: 0,
      y: index * cellHeight.value,
      points: [0, 0, waferGrid.width, 0],
      stroke: 'rgba(0, 0, 0, 0.2)',
      strokeWidth: 1
    }))
)

export type CellDataT = {
  isSelected: boolean
}

const dieArray = ref<Array<Konva.RectConfig & { data?: CellDataT }>>([])

watchEffect(() => {
  const xstep = xSteps.value
  const ystep = ySteps.value
  const width = cellwidth.value
  const height = cellHeight.value

  dieArray.value = Array(xstep * ystep)
    .fill(1)
    .map((_, index) => {
      const xIndex = index % xstep
      const yIndex = parseInt(`${index / xstep}`)

      const rectConfig = {
        x: xIndex * width,
        y: yIndex * height,
        width,
        height,
        fill: 'rgba(245, 95, 85, 0.2)',
        stroke: 'rgba(245, 95, 85, 0.5)',
        strokeWidth: 1.5
      } as Konva.RectConfig

      rectConfig.data = {
        isSelected: false
      } as CellDataT

      return rectConfig
    })
})

const handleCellEnter = (e: any) => {
  const cell: Konva.Rect = e.target
  const tween = new Konva.Tween({
    node: cell,
    duration: 0.5,
    fill: 'red',
    opacity: 1
  })

  tween.play()
}

const handleCellLeave = (e: any) => {
  const cell: Konva.Rect = e.target
  const tween = new Konva.Tween({
    node: cell,
    duration: 0.3,
    fill: 'rgba(245, 95, 85, 0.2)',
    opacity: 1
  })

  tween.play()
}

const handleCellClick = (e: any) => {
    const cell: Konva.Rect = e.target
    console.log(cell, 'cccc lick')
}

const stageRef = ref(null)

export const useWaferMap = () => {
  return {
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
  }
}
