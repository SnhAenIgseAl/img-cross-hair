<template>

    <div ref="asideRef"
        class="aside-container"
        @keydown="changeStyle">

        <el-tooltip v-for="(item, index) in asideItem" 
            :key="index"
            effect="dark"
            :content="item.content"
            placement="right">

            <RouterLink :to="item.path"
                class="aside-item">
                <i v-html="item.icon"></i>
            </RouterLink>

        </el-tooltip>

    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted} from 'vue';
import { RouterLink } from 'vue-router';
import { useSettingStore } from '../store/setting'



const {
	USER_CHANGE_WINDOW_KEY,
	USER_RESTORE_WINDOW_KEY,
} = useSettingStore()
const asideRef = ref<HTMLElement | null>(null)
const asideItem = [
    {
        icon: '&#xe6b8;',
        content: '准星',
        path: '/index'
    },
    {
        icon: '&#xe68a;',
        content: '设置',
        path: '/setting'
    }
]



const changeStyle = (event: KeyboardEvent) => {
    
    // 应用准星
	if (event.key === USER_CHANGE_WINDOW_KEY) {
		asideRef.value!.style.display = 'none'
	}

    // 还原
	if (event.key === USER_RESTORE_WINDOW_KEY) {
		asideRef.value!.style.display = 'flex'
	}
}



// 监听键盘事件
onMounted(() => {
	window.addEventListener('keydown', changeStyle)
})

onUnmounted(() => {
	window.removeEventListener('keydown', changeStyle)
})

</script>

<style scoped>

.aside-container {
    position: fixed;
    z-index: 99;
    padding: 16px;
    width: 48px;
    height: 100%;
    display: flex;
    gap: 16px;
    flex-flow: column nowrap;
    align-items: center;
    background-color: #fff;
    box-shadow: var(--el-box-shadow-light);
}

.aside-item {
    width: 100%;
    height: 48px;
    text-align: center;
    font-size: 24px;
    align-content: center;
    border-radius: 8px;

    &:hover {
        cursor: pointer;
        background-color: #f0f0f0;
    }
}

</style>