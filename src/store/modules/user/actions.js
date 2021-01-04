import storage from 'good-storage'
import { getUserDetail, getUserPlaylist } from "@/api"
import { UID_KEY } from "@/utils"
import {notify, isDef } from "@/utils"

export default {
  async login ({ commit }, uid) {
    const error = () => {
      notify.error('登陆失败,请输入正确的uid。')
      return false
    }
    if (!isDef(uid)) {
      return error()
    }

    try {
      const user = await getUserDetail(uid)
      const { profile } = user
      commit('setUser', profile)
      storage.set(UID_KEY, profile.userId)
    } catch (e) {
      return error()
    }

    const { playlist } = await getUserPlaylist(uid)
    commit('setUserPlaylist', playlist)
    return true
  },
  logout ({ commit }) {
    commit('setUser', {})
    commit('setUserPlaylist', [])
    storage.set(UID_KEY, null)
  }
}