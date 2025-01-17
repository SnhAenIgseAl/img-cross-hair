<template>

    <div class="setting-container">
        <p v-for="(item, index) in settingList"
            :key="index"
            class="setting-list">

            <span>
                {{ item.name }}：
                <el-text size="large" type="primary">
                    {{ item.key }}
                </el-text>
            </span>

            <el-button text bg size="large" @click="listening(item.key)">更改</el-button>
        </p>

    </div>

</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue'
import { useSettingStore } from '../../store/setting'
import { storeToRefs } from 'pinia';
import { ElNotification } from 'element-plus';



const {
	USER_CHANGE_WINDOW_KEY,
	USER_RESTORE_WINDOW_KEY,
	USER_WINDOW_CENTER_KEY
} = storeToRefs(useSettingStore())

const settingList = [
    {
        name: '应用准星快捷键',
        key: USER_CHANGE_WINDOW_KEY
    },
    {
        name: '显示窗口快捷键',
        key: USER_RESTORE_WINDOW_KEY
    },
    {
        name: '窗口居中快捷键',
        key: USER_WINDOW_CENTER_KEY
    }
]

const isListening = ref(false)
let keyName: Ref<string>



const listening = (key: Ref<string>) => {
    isListening.value = true
    ElNotification.info('请按下快捷键')
    keyName = key
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (isListening.value) {

        for (let i = 0; i < settingList.length; i++) {
            if (settingList[i].key.value === event.key) {
                ElNotification.error('快捷键已存在')
                isListening.value = false
                return
            }
        }

        setKey(keyName, event)
        ElNotification.success('设置成功')
        isListening.value = false
    }
}

const setKey = (keyName: Ref<string>, event: KeyboardEvent) => {
    keyName.value = event.key
}



onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
})


</script>

<style scoped>

.setting-container {
    width: 300px;
    padding: 16px;
    padding-left: 96px;
    display: flex;
    gap: 16px;
    flex-flow: column nowrap;
}

.setting-list {
    display: flex;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: var(--cl-black-75);
}

</style>