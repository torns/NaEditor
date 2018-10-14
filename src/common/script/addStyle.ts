import { PageType } from './../../component/interface';
/**
 * 动态加入style样式
 */
export default (style: string, pageType: PageType, id?: string) => {
    const node = document.createElement('style');
    node.type = 'text/css';
    node.innerHTML = style;
    id && (node.id = id);
    document.head && document.head.appendChild(node);
    // 装修页，样式放到iframe里面去
    if (pageType === PageType.Decorate) {
        const iframeDom = (document.querySelector('.J_canvas') as HTMLIFrameElement).contentDocument;
        iframeDom && iframeDom.head && iframeDom.head.appendChild(node);
    } else {
        document && document.head && document.head.appendChild(node);
    }
};