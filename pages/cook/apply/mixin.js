import { addCarBusiness, getReservationInfo } from '@/api/carBusiness'
import businessTypeConstant from '@/constant/car/businessType'
import { host } from '@/api/request'

export default {
  filters: {},
  computed: {},
  data() {
    return {
      businessTypeConstant,
      pageTitle: '', // 页面标题
      carId: 0, // 用户车辆id
      userId: 0, // 办理企业id
      businessType: 0, // 业务类型
      transferType: 0, // 过户类型
      carInfo: {
        // 车辆信息
        bidUserId: 0,
        bodyPhoto: '',
        brand: 0,
        brandName: '',
        certificateNumber: '',
        city: '',
        driverLicense: '',
        engineNumber: '',
        frameNumber: '',
        id: 0,
        isNew: 0,
        licensePlate: null,
        model: 0,
        modelName: '',
        series: 0
      },
      user: {
        // 用户信息
        id: 0,
        idCard: '',
        idEmblem: '',
        idFace: '',
        name: '',
        phone: ''
      },
      showUpFile: false, // [上传文件] 显示上传文件
      hasUpFile: false, // [上传文件] 有上传文件
      upFileConfig: {
        // [上传文件] 要上传的文件的配置
      },
      files: {
        // [上传文件] 预置文件列表
        idFaceFile: [], // 身份证正面
        idEmblemFile: [], // 身份证反面
        driverLicenseFile: [] // 驾驶证
      },
      uploadImgUrl: host + '/api/common/uploadPrivate' // 上传的图片服务器地址
    }
  },
  methods: {
    reservationInfoRequest() {
      getReservationInfo({
        carId: this.carId
      }).then(res => {
        this.carInfo = res.data.carInfo
        this.user = res.data.user
        this.user.idFace && this.files.idFaceFile.push({ url: this.user.idFace })
        this.user.idEmblem && this.files.idEmblemFile.push({ url: this.user.idEmblem })
        this.carInfo.driverLicense && this.files.driverLicenseFile.push({ url: this.carInfo.driverLicense })
        this.showUpFile = true
      })
    },
    /**
     * 文件获取方式1
     * @return {{flag: boolean, dataListing: [], message: string}}
     */
    filesListGetType1() {
      let returnData = {
        flag: true,
        message: '',
        dataListing: [],
        driverLicense: ''
      }

      this.upFileConfig.forEach((item, index) => {
        let list = this.$refs[item.id][0].lists
        if (list.length <= 0) {
          returnData.flag = false
          returnData.message = '请上传' + item.name
          return false
        }

        list.forEach(val => {
          if (val.progress === 100) {
            let url = ''
            if (val.response && val.response.data && val.response.data.url) {
              url = val.response.data.url
            } else {
              url = val.url
            }

            // 特殊应对
            if (item.id === 'driverLicense') {
              returnData.driverLicense = url
            }

            returnData.dataListing.push({
              name: item.name,
              img: url
            })
          } else {
            returnData.flag = false
            returnData.message = '请上传' + item.name
          }
        })
      })

      return returnData
    },
    /**
     * 文件获取方式2
     * @return {{flag: boolean, dataListing: [], message: string, buyerDataListing: []}}
     */
    filesListGetType2() {
      let returnData = {
        flag: true,
        message: '',
        dataListing: [],
        buyerDataListing: [],
        driverLicense: ''
      }

      let text1 = '卖方'
      this.upFileConfig['seller'].forEach((item, index) => {
        let list = this.$refs['seller' + item.id][0].lists
        if (list.length <= 0) {
          returnData.flag = false
          returnData.message = '请上传' + text1 + item.name
          return false
        }

        list.forEach(val => {
          if (val.progress === 100) {
            let url = ''
            if (val.response && val.response.data && val.response.data.url) {
              url = val.response.data.url
            } else {
              url = val.url
            }

            // 特殊应对
            if (item.id === 'driverLicense') {
              returnData.driverLicense = url
            }

            returnData.dataListing.push({
              name: text1 + item.name,
              img: url
            })
          } else {
            returnData.flag = false
            returnData.message = '请上传' + text1 + item.name
          }
        })
      })

      let text2 = '买方'
      this.upFileConfig['buyer'].forEach((item, index) => {
        let list = this.$refs['buyer' + item.id][0].lists
        if (list.length <= 0) {
          returnData.flag = false
          returnData.message = '请上传' + text2 + item.name
          return false
        }

        list.forEach(val => {
          if (val.progress === 100) {
            let url = ''
            if (val.response && val.response.data && val.response.data.url) {
              url = val.response.data.url
            } else {
              url = val.url
            }

            // 特殊应对
            if (item.id === 'driverLicense') {
              returnData.driverLicense = url
            }

            returnData.buyerDataListing.push({
              name: text2 + item.name,
              img: url
            })
          } else {
            returnData.flag = false
            returnData.message = '请上传' + text2 + item.name
          }
        })
      })

      return returnData
    },
    submitRequest(params) {
      addCarBusiness(params).then(res => {
        let data = res.data

        if (data.isPay === 1) {
          // 不需要支付
          uni.redirectTo({
            url: `/pages/order/paySuccess?isPaySuccess=1&showType=2`
          })
        } else {
          // 需要支付
          uni.redirectTo({
            url: `/pages/order/pay?from=carPrepay&id=${res.data.id}&deposit=${res.data.deposit}`
          })
        }
      })
    }
  }
}
