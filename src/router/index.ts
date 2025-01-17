import { createWebHashHistory, createRouter } from 'vue-router'



const routes = [
	{
		path: '/',
		redirect: '/index'
    },
    {
		path: '/index',
		component: () => import('@/view/Index/Index.vue')
    },
    {
		path: '/setting',
		component: () => import('@/view/Setting/Setting.vue')
    }
]



const router = createRouter({
	history: createWebHashHistory(),
	routes,
	scrollBehavior() {
		// 切换页面时回到顶部
		return { top: 0 }
	},
})



export default router