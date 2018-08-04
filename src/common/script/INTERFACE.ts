const SLD = {
    backend: '//localhost:3000',
}

const prefix = '/api'

const INTERFACE = {
    uploadImage: `${SLD.backend}${prefix}/uploadImage`,
    getImageList: `${SLD.backend}${prefix}/getImageList`,
    getModuleList: `${SLD.backend}${prefix}/getModuleList`,
    addModule: `${SLD.backend}${prefix}/addModule`,
    removeModule: `${SLD.backend}${prefix}/removeModule`,
    positionModule: `${SLD.backend}${prefix}/positionModule`,
    updateModule: `${SLD.backend}${prefix}/updateModule`,
}

export default INTERFACE;