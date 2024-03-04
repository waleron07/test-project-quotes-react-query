import { Box } from '@material-ui/core';

const Application = () => {
  return (
    <Box sx={{ p: 3 }}>
      <h2>О приложении</h2>
      <span>
        Общие сведения Приложение состоит из двух страниц: 1. Страница “О
        приложении” (первая, показывается при запуске). 2. Страница “Котировки”
        (отображает таблицу котировок, обновляемую в фоне). 3. Для навигации
        используется react-router-dom 4. Под таблицей подразумевается
        использование не готовых компонент табличного вида, а мини-реализация
        своего компонента под конкретные нужды. 5. (опционально) для типизации
        возможно использование TypeScript в целом по проекту 6. (опционально,
        плюс) вместо страницы “котировки” c одной таблицей рассмотреть
        использование tab-ов (2-ух, “Котировки А” и “Котировки Б”), где
        элементом tab-а и является страница “котировки” с половиной приходящей
        информации (для 1ого таба – 1ая половина данных, для 2ого – 2ая
        половина, иммитация 2ух разных источников) от публичного API 7.
        (опционально, плюс) возможно рассмотреть использование mobx + mobx-react
        как в приложении в целом, так и под конкретные нужды вроде нотификаций о
        изменении “таблицы”. 8. (опционально, плюс) возможно рассмотреть
        использование rxjs для организации observable потока данных.
      </span>
      <h3> Страница “О приложении” </h3>{' '}
      <span>
        Содержит: 1. Элемент навигации, позволяющий перейти на страницу
        “Котировки” (при выполнении опции с tab-ами – делаем 2 элемента, ведущие
        на оба tab-а)
      </span>
      <h3>Страница “Котировки”</h3>
      <span>
        Содержит: 1. Элемент навигации, позволяющий перейти на страницу “О
        приложении” 2. Таблицу, содержащую котировки с биржи poloniex,
        обновляемые в фоне по таймеру. В ячейке показывать имя тикера, last,
        highestBid и percentChange. 3. По клику на котировку (строку таблицы)
        появляется модальное окно со статичной информацией о выбранной котировке
        (обновлять её не нужно)
      </span>
      <h4>Замечания по реализации:</h4>
      <span>
        1. Данные в таблице обновляются по таймеру раз в 5 секунд 2. Данные не
        обновляются когда страница (таб) не активна (т.е. открыта страница “О
        приложении” или другой таб “котировки”), либо когда открыто модальное
        окно с информацией о котирокве. 3. В случае ошибки получения данных или
        парсинга их (т.е. в целом при любой ошибке), индикатируем об этом в
        верхней части страницы показывая элемент содержащий текст “ошибка”, в
        консоль логируем детали. В случае когда ошибка пропадает (например на
        следующей итерации таймера), индикацию ошибки скрываем. 4. (опционально,
        плюс) анимация обновления значений в элементах таблицы 5. (опционально,
        плюс) индикация загрузки при начальной загрузке данных (до момента
        получения первого пакета данных либо ошибки; после открытия страницы).
      </span>
    </Box>
  );
};
export default Application;
