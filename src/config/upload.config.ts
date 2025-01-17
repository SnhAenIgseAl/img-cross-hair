export const uploadCfg = {
    // 上传图片密钥
    uploadKey: 'a393a237f05197cdea02fbde39def317',
    // uploadKey: 'chv_Fw9l_891031f2d259e4777d8bc3274b2d542e3fd794dffd253196fca64e7acbf68a624fe36e542a029b6011e03d090d16afadea272589dce6cbb5e8a3fc8f02841993',
    // 上传图片接口
    uploadUrl: 'https://api.imgbb.com/1/upload'
    // uploadUrl: 'http://www.picgo.net/api/1/upload',
}

export interface UploadResponse {
    data: {
        id: string,
        title: string,
        url: string,
        width: string,
        height: string,
        time: string,
    }
    // "status_code": number,
    // "success": {
    //     "message": string,
    //     "code": number,
    // },
    // "image": {
    //     "name": string,
    //     "extension": string,
    //     "size": number,
    //     "width": number,
    //     "height": number,
    //     "date": string,
    //     "date_gmt": string,
    //     "title": string,
    //     "tags": Array<string>,
    //     "description": null,
    //     "md5": string,
    //     "url": string
    // }
}