import { url_all } from "./urls.js";

class Ajax {
    get(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url_all.getAllInfo(url), true);  // Изменяем на GET-запрос
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                // Проверка на успешный ответ (статус 200)
                if (xhr.status === 200) {
                    try {
                        const data = JSON.parse(xhr.responseText); // Используем responseText для GET-запросов
                        callback(data);
                    } catch (error) {
                        console.error("Ошибка при разборе JSON:", error);
                    }
                } else {
                    console.error("Ошибка с запросом:", xhr.status, xhr.statusText);
                }
            }
        };
    }
}

export const ajax = new Ajax();