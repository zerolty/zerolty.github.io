function handleJs(js) {
    js = js.replace('export default', 'return');
    return (new Function(js))();
}

function mergeJs(js, template) {
    const jsObj = handleJs(js);
    const vueObj = Object.assign({template}, jsObj, {el: '#app'}); 
    return new Vue(vueObj);
}

mergeJs(js, template);