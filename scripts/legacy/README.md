# Перенос контента со старого trustbank.uz

Скрипты скачивают старый сайт на трёх языках (ru, uz — латиница, en) и превращают его
в структурированные блоки, которые рендерятся по шаблону Figma «Ultimate Design» (`components/content/*`).

```bash
# 0. Скопировать списки адресов в рабочую папку
cp scripts/legacy/urls*.txt <tmp-dir>/

# 1. Скачать страницы — для каждого языка (ru по умолчанию → md/, uz → md_uz/, en → md_en/)
for lang in ru uz en; do
  for f in urls.txt urls2.txt urls3.txt urls4.txt urls5.txt urls6.txt; do
    node scripts/legacy/scrape.mjs <tmp-dir> $f $lang
  done
done
#   urls.txt  — разделы (2-й уровень)        urls2.txt — корпоративные продукты
#   urls3.txt — законы, новости, тендеры…     urls4.txt — раскрытие информации акционерам
#   urls5.txt — карточки членов правления     urls6.txt — видео

# 2. Сконвертировать: сначала ru, затем uz/en (они опираются на pages.json), затем ещё раз ru —
#    чтобы в index.json попали названия страниц на uz/en
node scripts/legacy/convert.mjs <tmp-dir> data/legacy/pages.json
node scripts/legacy/convert.mjs <tmp-dir> data/legacy/pages.uz.json uz
node scripts/legacy/convert.mjs <tmp-dir> data/legacy/pages.en.json en
node scripts/legacy/convert.mjs <tmp-dir> data/legacy/pages.json

# 3. Скачать документы и фото (по ссылкам из всех трёх языков) и сконвертировать ещё раз,
#    чтобы ссылки указывали на локальные копии
cat data/legacy/pages.json data/legacy/pages.uz.json data/legacy/pages.en.json > <tmp-dir>/all.json
node scripts/legacy/files.mjs <tmp-dir>/all.json
# …и повторить шаг 2
```

- `pages.json` — русский контент (только для серверных компонентов). Страницы из `urls3–6.txt`
  помечены `detail: true`: у них есть маршрут, но в меню раздела они не попадают.
- `pages.uz.json`, `pages.en.json` — те же страницы на узбекском и английском (только те, что есть на старом
  сайте на этом языке; остальные показываются на русском с пометкой «Материал опубликован только на русском языке»).
  Кириллические буквы-двойники внутри латинских слов (опечатки старого сайта) исправляются автоматически.
- `index.json` — заголовки (ru + uz/en) и адреса страниц меню, для навигации на клиенте.
- `offices*.json` — офисы банковских услуг на трёх языках.
- `files.json` — старый адрес файла → локальная копия в `public/upload/…`
  (`download.php?f=<имя>&i=<id>` → `/upload/dl/<id>/<имя>`). `files.mjs` докачивает новые файлы
  и удаляет копии, на которые больше никто не ссылается.

Соответствие старых адресов новым — `PATH_MAP` в `convert.mjs`. Разделы описаны в `data/legacy/sections.ts`;
детальные страницы «О банке» обслуживает `app/o-banke/[...slug]`.

Ссылки, которые пока ведут на trustbank.uz: установщики ПО (`/upload/media/soft/*`), выгрузки open data,
формы и опросы, а также детальные страницы uz/en-версий, у которых на старом сайте другие номера
(например, законы в `/uz/documents/…`), — их можно докачать отдельным списком.

## Меню шапки «О банке ▾» и «Еще ▾»

`node scripts/legacy/header-menu.mjs` читает верхнее меню старого сайта (выпадающий список «О банке» со всеми
разделами и ссылку «Продажа имущества») на ru/uz/en и пишет `data/legacy/header-menu.json` — ссылки уже
переведены в наши адреса, пункты без страницы на нашем сайте отброшены (скрипт их печатает). Запускать после
переноса новых страниц. Шапки берут меню из `components/layout/HeaderSiteMenu.tsx`.

Категории «Банковского законодательства» на uz/en-версиях старого сайта имеют другие номера
(например, ru `documents/2536` = uz `documents/2551`); таблица соответствия — `DOC_IDS` в `header-menu.mjs`.
При скачивании uz/en такие страницы скачиваются по своему номеру и сохраняются под ru-ключом.

## Переводы интерфейса

Тексты интерфейса и данных (`data/*.ts`) остаются на русском; переводы лежат в `i18n/dict/*.ts`
(ключ — русская строка). `node scripts/i18n-check.mjs <файл> <словарь…>` показывает строки без перевода.
