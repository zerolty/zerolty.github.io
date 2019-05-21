const AppKey = 'vue-online-editor';
function setItem(key, value) {  
    if(!value) {
        return;
    }
    let data = {}
    try {
        data = localStorage.getItem(AppKey);
        if(data) {
            data = JSON.parse(data);
        } else {
            data = {}
        }
    } catch(e) {
    }
    data[key] = value;
    localStorage.setItem(AppKey, JSON.stringify(data));
}

function getItem(key) {
    let data = localStorage.getItem(AppKey);
    if(!data) {
        data = {}
    } else {
        data = JSON.parse(data);
    }
    return data[key];
}

const initMap = {
    js: `export default {
    name: "HelloWorld",
    data() {
        return {
            value: "",
            msg: '111'
        }
    }
};`,
    html: `<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <input v-model="value">
        {{value}}
    </div>
</template>`,
    css: `h1 {
    margin: 40px 0 0;
}`,
};

['css', 'js', 'html'].map(item => {
    const localValue = getItem(item);
    if(localValue) {
        ace.edit(item+"-editor").getSession().setValue(localValue);
    } else {
        ace.edit(item+"-editor").getSession().setValue(initMap[item]);
    }
})

$('#submit').click(() => {
    const style    = ace.edit("css-editor").getSession().getValue();
    const js = ace.edit("js-editor").getSession().getValue();
    const template   = ace.edit("html-editor").getSession().getValue();
    setItem('css', style);
    setItem('js', js);
    setItem('html', template);
    const lib = 'https://unpkg.com/vue@2.6.10/dist/vue.min.js';
    const script = 'var template = `' + template + '`;' + 'var js =`' + js + '`;';
    const previewDoc = window.frames[0].document;
    previewDoc.write("<!DOCTYPE html>");
    previewDoc.write("<html>");
    previewDoc.write("<head>");
    previewDoc.write("<style type='text/css'>" + style + "</style>");
    if (lib)
        previewDoc.write("<script src=" + lib + " type='text/javascript'></script>");
    previewDoc.write("<body>");
    previewDoc.write('<div id="app"></div>'); 
    previewDoc.write("<script type='text/javascript'>" + script + "</script>");
    previewDoc.write("<script type='text/javascript' src='./iframe.js'></script>");
    previewDoc.write("</body>");
    previewDoc.write("</html>");
    previewDoc.close();
    
})

