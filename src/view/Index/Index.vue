<template>
	<div style="display: none;" @keydown="changeWindowStyle"></div>

	<div ref="containerRef" class="container">

		<!-- 选择图片 -->
		<el-upload 
			ref="imgFile" 
			:auto-upload="false" 
			:show-file-list="false"
			:on-change="previewImg">

			<template #trigger>
				<el-button size="large" text bg type="primary">选择图片</el-button>
			</template>

		</el-upload>

		<!-- 重置 -->
		<el-button size="large" text bg type="info" @click="resetImg" style="margin-left: 12px;">重置准星</el-button>
	
		<!-- 居中 -->
		<el-button size="large" text bg type="info" @click="windowCenter">窗口居中</el-button>
	
		<!-- 全屏 -->
		<el-button size="large" text bg type="info" @click="windowFullScreen">窗口全屏</el-button>

		<!-- 窗口化 -->
		<el-button size="large" text bg type="info" @click="windowUnFullScreen">重置大小</el-button>
	
		<!-- 退出 -->
		<el-button size="large" text bg type="danger" @click="windowClose">退出</el-button>
	</div>



	<div class="img-container">
		<el-image v-if="USER_IMG" 
			:src="USER_IMG"
			class="img"
			fit="contain">
		</el-image>
	</div>


	
</template>

<script setup lang="ts">
import { IpcRenderer } from 'electron'
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps} from 'element-plus'
import { useSettingStore } from '../../store/setting'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { uploadCfg, UploadResponse } from '../../config/upload.config'

declare global {
    interface Window {
		require: (module: 'electron') => {
			ipcRenderer: IpcRenderer
		}
	}
}

const ipcRenderer = window.require('electron').ipcRenderer



const {
	USER_CHANGE_WINDOW_KEY,
	USER_RESTORE_WINDOW_KEY,
	USER_WINDOW_CENTER_KEY
} = useSettingStore()
const {
	USER_IMG
} = storeToRefs(useSettingStore())
const containerRef = ref<HTMLElement | null>(null)



const changeWindowStyle = (event: KeyboardEvent) => {

	// 应用准星
	if (event.key === USER_CHANGE_WINDOW_KEY) {
		containerRef.value!.style.display = 'none'
		ipcRenderer.invoke('change-window-style')
	}

	// 还原
	if (event.key === USER_RESTORE_WINDOW_KEY) {
		containerRef.value!.style.display = 'flex'
		ipcRenderer.invoke('restore-window-style')
	}

	// 居中
	if (event.key === USER_WINDOW_CENTER_KEY) {
		ipcRenderer.invoke('window-center')
	}
}

// 预览图片
const previewImg: UploadProps['onChange'] = (uploadFile) => {

	if (uploadFile.raw!.type !== 'image/jpg' &&
		uploadFile.raw!.type !== 'image/jpeg' &&
		uploadFile.raw!.type !== 'image/png'
	) {
		ElMessage({ message: '必须是jpg或png格式的图片', type: 'error' })
		return false
	}

	let fd = new FormData()
	fd.append('key', uploadCfg.uploadKey)
	fd.append('image', uploadFile.raw!)

	axios.post(uploadCfg.uploadUrl, fd, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
	.then(res => {
		res = res.data
		console.log(res)
	})
	.catch(err => {
	    ElMessage.error(err + '图片上传失败，请检查网络后重试')
	})

	// USER_IMG.value = URL.createObjectURL(uploadFile.raw!)
	// console.log(USER_IMG.value)
}

// 重置图片
const resetImg = () => {
	USER_IMG.value = ''
}

// 窗口居中
const windowCenter = () => {
	ipcRenderer.invoke('window-center')
}

// 全屏
const windowFullScreen = () => {
	ipcRenderer.invoke('window-fullscreen')
}

// 窗口化
const windowUnFullScreen = () => {
	ipcRenderer.invoke('window-un-fullscreen')
}

// 退出
const windowClose = () => {
	ipcRenderer.invoke('window-closed')
}



// 监听键盘事件
onMounted(() => {
	window.addEventListener('keydown', changeWindowStyle)
})

onUnmounted(() => {
	window.removeEventListener('keydown', changeWindowStyle)
})

</script>

<style scoped>

.container {
	position: fixed;
	z-index: 9;
	display: flex;
	gap: 16px;
	width: 100%;
	padding: 16px;
	/* padding-left: 96px; */
	justify-content: center;
	align-items: center;
	height: auto;
}

.img-container {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.img {
	width: auto;
	height: auto;
	overflow: hidden;
}

</style>