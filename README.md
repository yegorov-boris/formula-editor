## первоначальные настройки
- git clone `https://github.com/yegorov-boris/formula-editor.git`
- cd formula-editor
- npm i
- npm run build

если теперь убить сервер, приложение будет работать offline

## запуск проекта
- serve -s build
- открыть http://localhost:5000

## запуск тестов
- serve -s build
- (в другом терминале, так как для работы тестов нужен сервер) npm run test
