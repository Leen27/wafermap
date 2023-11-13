import Konva from 'konva'
import { useWaferMap } from './useWaferMap'
import { onMounted, ref } from 'vue'

// let x1, y1, x2, y2;

// add a new feature, lets add ability to draw selection rectangle
let selectionRectangle
const selectLayerRef = ref(null)

const createSelctorRect = () => {
  console.log(selectLayerRef.value, selectLayerRef.value.getNode(), 'selectLayerRef')
  const layer = selectLayerRef.value.getNode() as Konva.Layer

  if (!layer) return

  if (!selectionRectangle) {
    selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
      visible: false
    })
    layer.add(selectionRectangle)
  }

  // stage.on('mousedown touchstart', (e) => {
  //   // do nothing if we mousedown on any shape
  //   if (e.target !== stage) {
  //     return;
  //   }
  //   e.evt.preventDefault();
  //   x1 = stage.getPointerPosition()?.x;
  //   y1 = stage.getPointerPosition()?.y;
  //   x2 = stage.getPointerPosition()?.x;
  //   y2 = stage.getPointerPosition()?.y;

  //   selectionRectangle.visible(true);
  //   selectionRectangle.width(0);
  //   selectionRectangle.height(0);
  // });
}

export const useSelector = () => {
  onMounted(() => {
    const { stageRef } = useWaferMap()

    if (!stageRef.value) return

    const stage = (stageRef.value as Konva.Node)?.getStage()

    console.log(stage, 'stage')

    createSelctorRect()
  })

  return {
    selectLayerRef
  }
}
