// 专门用于管理请求各种接口地址
import Network from './network'

export const getBanner = () => Network.get('banner?type=2') // 首页banner
export const getPersonalized = () => Network.get('personalized?limit=6') // 推荐歌单
export const getNewAlbum = () => Network.get('album/newest') // 最新专辑
export const getNewSong = () => Network.get('personalized/newsong') // 最新音乐
export const getPlayList = (data) => Network.get('playlist/detail', data) // 歌单详情
export const getAlbum = (data) => Network.get('album', data) // 专辑详情
export const getSongDetail = (data) => Network.get('song/detail', data) // 单曲详情
export const getSongLyric = (data) => Network.get('lyric', data) // 获取单曲详情歌词
export const getSongURL = (data) => Network.get('song/url', data) // 获取单曲播放地址
export const getArtistsSongs = (data) => Network.get('artists', data) // 获取歌手歌曲
export const getRankSongs = (data) => Network.get('playlist/detail', data) // 获取排行榜歌曲
// export const getHotArtists = () => Network.get('/top/artists?offset=0&limit=5') // 获取歌手
export const getSearchList = (data) => Network.get('search/suggest?type=1', data) // 发送网络请求获取搜索数据
export const getSearchHots = () => Network.get('search/hot') // 获取热门搜索

/* 获取热门歌手 */
export const getHotArtists = () => {
  return new Promise(function (resolve, reject) {
    Network.get('/top/artists?offset=0&limit=5')
      .then(result => {
        resolve(result.artists)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/* 获取单个指定字母开头的歌手 */
export const getLetterArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    const letterArtists = []
    Network.all([
      Network.get(`/artist/list?type=2&limit=5&area=7&initial=${letter}`),
      Network.get(`/artist/list?type=2&limit=5&area=96&initial=${letter}`),
      Network.get(`/artist/list?type=2&limit=5&area=8&initial=${letter}`),
      Network.get(`/artist/list?type=2&limit=5&area=16&initial=${letter}`),
      Network.get(`/artist/list?type=2&limit=5&area=0&initial=${letter}`)
    ])
      .then(function (result) {
        // resolve(result)
        result.forEach(element => {
          letterArtists.push(...element.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

/* 获取所有歌手 */
export const getAllArtists = () => {
  return new Promise(function (resolve, reject) {
    // 定义发送请求的数组
    const list = [getHotArtists()]
    const keys = ['热']
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      // console.log(char)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        const obj = {}
        obj.keys = keys
        obj.artists = result
        // console.log(result)
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

// 获取排行榜
export const getTopListDetail = () => {
  return new Promise((resolve, reject) => {
    const category = {
      officialList: [
        { name: '热歌榜', id: 3778678 },
        { name: '飙升榜', id: 19723756 },
        { name: '原创榜', id: 2884035 },
        { name: '新歌榜', id: 3779629 }
      ],
      recList: [
        { name: '云音乐ACG VOCALOID榜', id: 3001890046 },
        { name: '云音乐日语榜', id: 5059644681 },
        { name: '云音乐欧美新歌榜', id: 2809577409 },
        { name: '云音乐摇滚榜', id: 5059633707 }
        // { name: '云音乐ACG音乐榜', id: 22 },
        // { name: '云音乐古典音乐榜', id: 24 }
      ],
      globalList: [
        { name: '云音乐古典榜', id: 71384707 },
        { name: '云音乐说唱榜', id: 991319590 },
        { name: 'Beatport全球电子舞曲榜', id: 3812895 },
        { name: '云音乐韩语榜', id: 745956260 },
        { name: '抖音排行榜', id: 2250011882 }
        // { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      otherList: [
        { name: '云音乐电音榜', id: 1978921795 },
        // { name: '云音乐欧美新歌榜', id: 2809577409 },
        { name: '云音乐古风榜', id: 5059642708 },
        { name: '潜力爆款榜', id: 5338990334 },
        { name: '云音乐民谣榜', id: 5059661515 },
        { name: '云音乐欧美热歌榜', id: 2809513713 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }

    Network.get('/toplist/detail')
      .then(data => {
        data.list.forEach((obj) => {
          // console.log(obj.name, obj.id)
          let flag = false
          for (const key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) { break }
          }
        })
        resolve(category)
      })
      .catch(err => {
        reject(err)
      })
  })
}
