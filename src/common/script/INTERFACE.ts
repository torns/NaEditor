const SLD = {
    backend: '//localhost:3000',
}

const prefix = '/api'

const INTERFACE = {
    uploadImage: `${SLD.backend}${prefix}/uploadImage`,
    getImageList: `${SLD.backend}${prefix}/getImageList`,
    getModuleList: `${SLD.backend}${prefix}/getModuleList`,

}

export default INTERFACE;