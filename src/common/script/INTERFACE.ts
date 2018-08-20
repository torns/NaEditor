const SLD = {
    backend: '//naeditor.com',
}

const prefix = '/api'

const INTERFACE = {
    uploadImage: `${SLD.backend}${prefix}/uploadImage`,
    getImageList: `${SLD.backend}${prefix}/getImageList`,
    getAllModule: `${SLD.backend}${prefix}/getAllModule`,
    getModuleList: `${SLD.backend}${prefix}/getModuleList`,
    addModule: `${SLD.backend}${prefix}/addModule`,
    removeModule: `${SLD.backend}${prefix}/removeModule`,
    positionModule: `${SLD.backend}${prefix}/positionModule`,
    updateModule: `${SLD.backend}${prefix}/updateModule`,
}

export default INTERFACE;