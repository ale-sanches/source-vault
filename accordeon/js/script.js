(function () {
  /**
   * Служебная функция для считывания параметров из адресной строки
   * и определения конфигурации компонента
   * @param  {string} name - имя параметра
   * @return {number} - значение параметра в адресной строке
   */
  const getUrlValue = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get(name), 10);
  };

  /**
   * Настройки аккордеона, параметры получаются из командной строки
   *
   * tabs_limit - number, максимальное количество одновременно открытых элементов,
   * по умолчанию 0 - не ограничено
   *
   * Для тестирования работы своего скрипта при разных значениях tabs_limit
   * временно переопределяйте значение переменной, хранящей этот параметр.
   * Либо можете дописыват GET-параметр с нужным значением в конец адресной строки,
   * например: ?tabs_limit=1
   */
  const settings = {
    tabsLimit: getUrlValue("tabs_limit") || 0,
  };

  /* Код компонента пишите ниже */
  if (settings.tabsLimit === 0) {
    const accordeonItems = document.querySelectorAll(".accordeon-item");

    accordeonItems.forEach(function (item) {
      const title = item.querySelector(".accordeon-item-title");
      title.addEventListener("click", function () {
        item.classList.toggle("accordeon-item--open");
      });
    });
  } else if (settings.tabsLimit === 1) {
    const accordeonItems = document.querySelectorAll(".accordeon-item");

    accordeonItems.forEach(function (item) {
      const title = item.querySelector(".accordeon-item-title");

      title.addEventListener("click", function () {
        if (!item.classList.contains("accordeon-item--open")) {
          closeAllAccordeonItems();
        }
        item.classList.toggle("accordeon-item--open");
      });
    });

    function closeAllAccordeonItems() {
      accordeonItems.forEach(function (accItem) {
        accItem.classList.remove("accordeon-item--open");
      });
    }
  } else if (settings.tabsLimit === 3) {
    const accordeonItems = document.querySelectorAll(".accordeon-item");
    const openedTabs = [];

    accordeonItems.forEach(function (item) {
      const title = item.querySelector(".accordeon-item-title");

      title.addEventListener("click", function () {
        if (openedTabs.length >= settings.tabsLimit) {
          const firstOpenedTab = openedTabs.shift();
          firstOpenedTab.classList.remove("accordeon-item--open");
        }
        if (!item.classList.contains("accordeon-item--open")) {
          openedTabs.push(item);
        }
        item.classList.toggle("accordeon-item--open");
      });
    });
  }
})();
