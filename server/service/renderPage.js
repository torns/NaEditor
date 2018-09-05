import { renderToString } from 'react-dom/server';

async function renderPage(Page, store) {

    const str = renderToString(Page);
    const state = JSON.stringify(store.getState())
    const result = {
        str: str,
        state: state,
    }
    return result;
}


export default renderPage;