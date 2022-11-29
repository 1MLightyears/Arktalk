import {v4 as uuid} from 'uuid'
import html2canvas from 'html2canvas';
import message from "./message";

function copy(obj) {
    return JSON.parse(JSON.stringify(obj))
}

function saveData(name, data) {
    let dataStr = null;
    if (typeof data === 'object') {
        dataStr = JSON.stringify(data)
    }
    if (typeof data === 'string' || typeof data === 'number') {
        dataStr = data.toString()
    }
    if (dataStr) {
        localStorage.setItem(name, dataStr)
    }
}

function downloadImage(node, options, callback) {
    html2canvas(node, options).then(canvas => {
        const el = document.createElement('a');
        el.download = 'arktalk-' + Date.now() + '.png';
        el.href = canvas.toDataURL();
        el.click();
        callback && callback()
    }).catch(message.notify)
}

function getData(name) {
    let data = localStorage.getItem(name);
    if (data) {
        try {
            data = JSON.parse(data)
        } catch (e) {
        }
        return data
    }
}


export {
    copy,
    uuid,
    saveData,
    getData,
    downloadImage
}