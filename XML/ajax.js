import { url_all } from "./urls.js";
class Ajax {
    // Асинхронный метод для GET-запроса
    async get(url) {
        try {
            const response = await fetch(url_all.getAllInfo(url)); // Отправляем запрос
            if (!response.ok) {
                throw new Error(`Ошибка с запросом: ${response.status} ${response.statusText}`);
            }
            const data = await response.json(); // Преобразуем ответ в JSON
            return data; // Возвращаем данные
        } catch (error) {
            console.error("Ошибка запроса:", error); // Логируем ошибку
            throw error; // Генерируем ошибку, чтобы с ней можно было работать дальше
        }
    }
}

export const ajax = new Ajax();