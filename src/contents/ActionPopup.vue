
<script lang="ts">
import BaseCssText from "data-text:~style-except-font.css"
import cssText from "data-text:~/src/contents/ActionPopup.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import ActionPopupComp from "../lib/Components/ActionPopup/ActionPopupComp.vue"
import Url from "../lib/Url"
import { queuePostFlushCb } from "vue"

export const config: PlasmoCSConfig = {
    // matches: ["https://www.plasmo.com/*"],
    matches: ["<all_urls>"],
    css: ["../styles/fonts/google-font.css", "../styles/fonts/google-icon.css"]
}

const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText + BaseCssText
    return style
}



export default {
    plasmo: {
        getStyle
    },
    data() {
        return {
            actionPopupPage: 1
        }
    },
    computed: {
        currentIsFirst: () => true
    },
    methods: {
        gotoPage(getNewPage: (currentPage: number) => number | null) {
            const url = new Url(window.location.href);
            let page = parseInt(url.qs.get("page") ?? "1")
            const newPage = getNewPage(page);
            if (newPage === null) {
                return;
            }
            url.qs.set('page', newPage.toString());
            url.navigate();
        },
        gotoPrevious() {
            this.gotoPage((currentPage) => {
                if (currentPage === 1) {
                    return null;
                }
                return --currentPage
            })
        },
        gotoNext() {
            this.gotoPage((currentPage) => {
                return ++currentPage;
            })
        }
    },
    setup() { },
    mounted() { },
    components: {ActionPopupComp }
}


</script>


<template>
    <ActionPopupComp @mouseUpInLeft="gotoPrevious" @mouseUpInRight="gotoNext"
        class=" flex items-center bg-base-content/10 rounded-full" :is-right-click-enabled="true">
        <template #default="{ direction }">
            <span :class="[direction === 'left' ? 'bg-base-200 ' : 'bg-opacity-0 text-base-content/50']"
                class="flex-grow-[1] text-base material-icons rounded-full py-1  px-2 ">
                west
            </span>
            <div class="action-center text-base p-2 rounded-full w-[32px] h-[32px] flex justify-center items-center">
                <span v-show="direction === 'top'" class="material-icons text-base">
                    keyboard_arrow_up
                </span>
                <span v-show="direction === 'bottom'" class="material-icons text-base">
                    refresh
                </span>

                <div v-show="direction !== 'top' && direction !== 'bottom'">
                    {{ actionPopupPage }}
                </div>

            </div>
            <span :class="[direction === 'right' ? 'bg-base-200 ' : 'bg-opacity-0 text-base-content/50']"
                class=" flex-grow-[1] text-base material-icons rounded-full py-1  px-2 ">
                east
            </span>
        </template>
    </ActionPopupComp>
</template>
    
