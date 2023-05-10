<script setup lang="ts">

import {computed, onBeforeUnmount, onMounted, reactive, ref} from "vue";
import ActionPopup from "./ActionPopup";
import {Direction} from "./Direction";
import {onActivated, onRenderTriggered, onUpdated} from "@vue/runtime-core";


const props = withDefaults(defineProps<{ isRightClickEnabled?: boolean }>(), {
    isRightClickEnabled: false
});


let dispatched: boolean = false

function prepare() {
    actionPopup.x = mousePosition.x
    actionPopup.y = mousePosition.y
    isPresent.value = true;
}

function release() {
    actionPopup.setPositionToOut()
    isPresent.value = false;
}


function handleMouseMoveEvent(ev: MouseEvent) {
    const emitDirection = () => {
        direction.value = actionPopup.compareDirectionTo({x: ev.clientX, y: ev.clientY})
        emit(('in' + upperCaseMap[direction.value]) as any);

        if (!dispatched) {
            emit(('in' + upperCaseMap[direction.value] + 'Once') as any);
            dispatched = true;
        }
    }

    mousePosition.x = ev.clientX
    mousePosition.y = ev.clientY

    if ((ev.ctrlKey || ev.altKey) && ev.buttons !== 1) {
        actionPopup.x = mousePosition.x
        actionPopup.y = mousePosition.y
    }


    if (
        (ev.ctrlKey || ev.altKey) && ev.buttons === 1
    ) {
        emitDirection();
    }

    if (!props.isRightClickEnabled) {
        return;
    }

    if (ev.buttons === 2) {
        emitDirection();
    }
}


function handleKeyDownEvent(ev: KeyboardEvent) {

    if ((ev.ctrlKey || ev.altKey) && !ev.repeat) {
        prepare();
    }
}

function handleKeyUpEvent(ev: KeyboardEvent) {
    if (ev.key === 'Control' || ev.key === 'Alt') {
        release()
    }
}

function popup(x: number, y: number) {
    dispatched = false;
    direction.value = 'center';
    actionPopup.x = x
    actionPopup.y = y
    isPresent.value = true;
    visible.value = true;
}

function handleMouseDownEvent(ev: MouseEvent) {

    initializeSizeIfNot();

    if ((ev.ctrlKey || ev.altKey) && ev.button == 0) {
        popup(ev.clientX, ev.clientY)
    }

    if (!props.isRightClickEnabled) {
        return;
    }

    if (ev.button === 2) {
        prepare()
        popup(ev.clientX, ev.clientY)
    }
}

function handleMouseUpEvent(ev: MouseEvent) {

    if (visible.value === true) {
        const direction = actionPopup.compareDirectionTo({x: ev.clientX, y: ev.clientY});
        emit(('mouseUpIn' + upperCaseMap[direction]) as any);
    }
    visible.value = false;
    isPresent.value = false;
}

function handleContextMenu(ev: Event) {
    if (props.isRightClickEnabled) {
        ev.preventDefault()
    }
}

const mousePosition = reactive({x: 0, y: 0})

const direction = ref<Direction>('center')

const upperCaseMap = {
    'left': 'Left',
    'right': 'Right',
    'top': 'Top',
    'bottom': 'Bottom',
    'center': 'Center',
}

const emit = defineEmits(['mouseUpInCenter', 'mouseUpInLeft', 'mouseUpInRight', 'mouseUpInTop', 'moseUpInBottom', 'inCenter', 'inLeft', 'inRight', 'inTop', 'inBottom', 'inCenterOnce', 'inLeftOnce', 'inRightOnce', 'inTopOnce', ' inBottomOnce'])

const visible = ref(false);
const isPresent = ref(true);
const zeroWidth = 0;
const actionPopup = reactive<ActionPopup>(new ActionPopup(zeroWidth, 0, 0, -999, -999))
const actionPopupComp = ref<HTMLElement>()
const top = ref();
const bottom = ref();
const left = ref();
const right = ref();

let centerEle: HTMLElement | null = null;
const isSizeInitialized = computed(() => actionPopup.width !== zeroWidth);

function initializeSize() {
    actionPopup.width = actionPopupComp.value?.offsetWidth!
    actionPopup.height = actionPopupComp.value?.offsetHeight!
    actionPopup.centerRadius = centerEle?.offsetWidth! / 2
}

function initializeSizeIfNot() {
    if (isSizeInitialized.value) return;
    initializeSize();
}

onMounted(() => {
    document.addEventListener('mousemove', handleMouseMoveEvent);
    document.addEventListener('keydown', handleKeyDownEvent)
    document.addEventListener('keyup', handleKeyUpEvent)
    document.addEventListener('mousedown', handleMouseDownEvent)
    document.addEventListener('mouseup', handleMouseUpEvent)
    document.addEventListener('contextmenu', handleContextMenu)

    centerEle = actionPopupComp.value?.querySelector('.action-center') as HTMLElement;

    initializeSizeIfNot();

})

onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleMouseMoveEvent);
    document.removeEventListener('keydown', handleKeyDownEvent);
    document.removeEventListener('keyup', handleKeyUpEvent);
    document.removeEventListener('mousedown', handleMouseDownEvent);
    document.removeEventListener('mouseup', handleMouseUpEvent);
    document.removeEventListener('contextmenu', handleContextMenu)
})


</script>

<template>
    <div ref="actionPopupComp" class=" absolute z-50 cursor-default select-none" v-bind="$attrs"
         :class="[visible ?  'opacity-100' : 'opacity-0']"
         v-show="isPresent"
         :style="{top : actionPopup.asCenter.y + 'px' , left : actionPopup.asCenter.x + 'px'}">
        <div class="flex flex-row  flex-grow items-center justify-around">
            <slot :direction="direction"/>

        </div>
    </div>

    <div class="absolute z-50 w-full h-full top-0 left-0 opacity-0" v-show="visible">
    </div>

</template>


<style scoped>

</style>
