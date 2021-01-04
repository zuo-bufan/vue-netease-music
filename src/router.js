import Vue from "vue";
import Router from "vue-router";

const Discovery = () => import(/* webpackChunkName: "Discovery" */ '@/page/discovery')
const Songs = () => import(/* webpackChunkName: "Songs" */ '@/page/songs')
const Playlists = () => import(/* webpackChunkName: "Playlists" */ '@/page/playlists')
const PlaylistDetail = () => import(/* webpackChunkName: "PlaylistDetail" */ '@/page/playlist-detail')
const Mvs = () => import(/* webpackChunkName: "Mvs" */ '@/page/mvs')
const Mv = () => import(/* webpackChunkName: "Mv" */ '@/page/mv')
const Search = () => import(/* webpackChunkName: "Search" */ '@/page/search')
const SearchSongs = () => import(/* webpackChunkName: "SearchSongs" */ '@/page/search/songs')
const SearchPlaylists = () => import(/* webpackChunkName: "SearchPlaylists" */ '@/page/search/playlists')
const SearchMvs = () => import(/* webpackChunkName: "SearchMvs" */ '@/page/search/mvs')

//内容需要居中的页面
export const LayoutCenterNames = ['discovery', 'songs', 'mvs']

//需要显示在侧边栏菜单的页面
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery', 
    component: Discovery,
    meta: { 
      title: '发现音乐',
      icon: 'music',
     }
  },
  {
    path: '/playlists',
    name: 'playlists',
    component: Playlists,
    meta: { 
      title: '推荐歌单',
      icon: 'playlist-menu'
    }
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs,
    meta: { 
      title: '最新音乐',
      icon: 'yinyue'
     }
  },
  {
    path: '/mvs',
    name: 'mvs',
    component: Mvs,
    meta: { 
      title: '最新MV',
      icon: 'mv'
     }
  }
]
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: '/discovery',
    },
    {
      path: "/playlist/:id",
      name: 'playlist',
      component: PlaylistDetail
    },
    {
      path: '/mv/:id',
      name: 'mv',
      component: Mv,
      props: (route) =>  ({id: +route.params.id}),
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: Search,
      props: true,
      children: [
        {
          path: '/',
          redirect: 'songs',
        },
        {
          path: 'songs',
          name: 'searchSongs',
          component: SearchSongs,
        },
        {
          path: 'playlists',
          name: 'searchPlaylists',
          component: SearchPlaylists,
        },
        {
          path: 'mvs',
          name: 'searchMvs',
          component: SearchMvs,
        }
      ]
    },
    ...menuRoutes,
  ],
});
