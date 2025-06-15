import modalStyles from '../styles/modalStyles.js';
import logger from '../utils/logger.js';
import gameElementStyles from '../styles/gameElementStyles.js';

/**
 * Викторина
 * 
 * Игра представляет собой викторину с вопросами о кино.
 * Игроку предлагается выбрать правильный ответ из нескольких вариантов.
 * После каждого ответа показывается результат и мотивирующее сообщение.
 * В конце игры выводится общий результат и возможность начать заново.
 */
export function startQuizGame() {
    logger.info('Starting Quiz Game');
    let currentQuestion = 0;
    let score = 0;
    let currentCategory = '';

    // Массивы с вопросами и ответами
    const quizSets = {
        'Современное кино. Часть 1': [
            {
                category: 'Кино',
                question: 'В каком фильме главный герой перемещается в прошлое и знакомится со своими родителями?',
                options: ['Матрица', 'Назад в будущее', 'Терминатор'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Кто исполнил главную мужскую роль в фильме Титаник?',
                options: ['Леонардо Ди Каприо', 'Марк Уолберг', 'Дензел Вашингтон'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'В каком фильме главный герой стал акционером компании Apple?',
                options: ['Сладкий ноябрь', 'Крёстный отец', 'Форрест Гамп'],
                correct: 2
            },
            {
                category: 'Кино',
                question: 'Какой секрет раскрыл главный герой фильма «Шоу Трумэна»?',
                options: ['Весь мир следил за ним', 'Его отец - инопланетянин', 'Он - избранный, который спасёт весь мир'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'В какую женщину был влюблён Шерлок Холмс из британского сериала «Шерлок»?',
                options: ['Мэри Мортсен', 'Ирэн Адлер', 'Миссис Хадсон'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Как звали двух главных злодеев в фильме «Один дома»?',
                options: ['Гарри и Марвин', 'Джон и Брэд', 'Питер и Стэнли'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'В каком фильме два актёра получили Оскар за игру одного и того же персонажа?',
                options: ['Умница Уилл Хантинг', 'Крёстный отец 2', 'Форсаж 4'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Назовите учителя Брюса Ли, именем которого назвали фильм.',
                options: ['Ип Ман', 'Пьяный мастер', 'Лю Канг'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'Что происходило с главным героем фильма «Загадочная история Бенджамина Баттона»?',
                options: ['Он научился летать', 'Он родился старым и молодел', 'Он становился больше с каждым днём'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Какого предмета следовало остерегаться в знаменитом фильме про Юрия Деточкина?',
                options: ['Самолёта', 'Автомобиля', 'Парохода'],
                correct: 1
            }
        ],
        'Современное кино. Часть 2': [
            {
                category: 'Кино',
                question: 'Кто сыграл главную роль в фильме Гая Ричи «Джентльмены»?',
                options: ['Энтони Хопкинс', 'Мэттью МакКонахи', 'Роберт Паттинсон'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Какой эксперимент проводят герои датского фильма «Ещё по одной»?',
                options: ['Проверяют теорию о нехватке алкоголя в организме и постоянно выпивают', 'Разрабатывают алгоритм безопасного курения', 'Создают средство, позволяющее становиться невидимым'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'Какой фильм 2020 года получил главную кинопремию «Оскар» в номинациях: «Лучший фильм», «Лучшая режиссура» и «Лучшая актриса»?',
                options: ['Манк', 'Земля кочевников', 'Суд над чикагской семёркой'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Как называется корейский фильм о социальном неравенстве и столкновении представителей разных слоёв общества, высоко оценённый критиками и зрителями?',
                options: ['Паразиты', 'Олдбой', 'Поезд в Пусан'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'Роль Джокера в одноимённом фильме Тодда Филлипса блистательно воплотил актёр …',
                options: ['Джаред Лето', 'Джозеф Гордон-Левитт', 'Хоакин Феникс'],
                correct: 2
            },
            {
                category: 'Кино',
                question: 'Какая история лежит в основе фильма Квентина Тарантино «Однажды в Голливуде»?',
                options: ['Переход от немого кинематографа к звуковым фильмам', 'Расцвет жанра вестерн', 'Преступная деятельность секты Чарльза Мэнсона'],
                correct: 2
            },
            {
                category: 'Кино',
                question: 'Кому досталась роль Чёрной вдовы в супергеройском блокбастере «Мстители»?',
                options: ['Скарлетт Йоханссон', 'Эмме Стоун', 'Марго Робби'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'Какую кличку дали Фрэнку Валлелонга, главному герою фильма «Звезда родилась»?',
                options: ['Болтун', 'Молчун', 'Праведник'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'Как называется фильм, который рассказывает историю успеха британской рок-группы Queen с Рами Малеком в главной роли?',
                options: ['Богемная рапсодия', 'Богемская рапсодия', 'Феномен Queen'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Кто является главной героиней фильма «Тоня против всех»?',
                options: ['Фигуристка', 'Гимнастка', 'Пловчиха'],
                correct: 0
            }
        ],
        'Современное кино. Часть 3': [
            {
                category: 'Кино',
                question: 'Для какого из этих фильмов музыку написал Ханс Циммер?',
                options: ['Довод', 'Дюнкерк', 'Фантастические твари и где они обитают'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Кого играет Райан Гослинг в романтическом мюзикле «Ла-Ла Ленд»?',
                options: ['Актёра', 'Джазового музыканта', 'Сценариста'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Кинематографу какой страны принадлежит фильм «Идеальные незнакомцы», который имеет множество ремейков, снятых в других странах?',
                options: ['Италии', 'Франции', 'Германии'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'В каком фильме сыграли Мэтт Дэймон и Кристиан Бэйл?',
                options: ['Ford против Ferrari', 'Тёмный рыцарь', 'Марсианин'],
                correct: 0
            },
            {
                category: 'Кино',
                question: 'Кто снял фильм «Аритмия» с Александром Яценко и Ириной Горбачёвой в главных ролях?',
                options: ['Кантемир Балагов', 'Борис Хлебников', 'Андрей Звягинцев'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'В каком фильме главную роль исполнила известная певица Леди Гага?',
                options: ['Фаворитка', 'Звезда родилась', 'Одарённая'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'В фильме «Приключения Паддингтона» главным героем является …',
                options: ['Кот', 'Мышонок', 'Медвежонок'],
                correct: 2
            },
            {
                category: 'Кино',
                question: 'Где происходит действие фильма «Мотылек» с Чарли Ханнэмом в главной роли?',
                options: ['На войне', 'В тюрьме', 'На корабле'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'В чём особенность британского военного фильма «1917»?',
                options: ['В главных ролях снялись непрофессиональные актёры', 'Полное погружение в происходящее за счёт съемки одним кадром', 'Фильм снимали на протяжении 10 лет'],
                correct: 1
            },
            {
                category: 'Кино',
                question: 'Режиссёр, который снял супергеройский блокбастер «Лига справедливости».',
                options: ['Зак Снайдер', 'Кристофер Нолан', 'Джеймс Ганн'],
                correct: 0
            }
        ],
        'Советское кино': [
            {
                category: 'Кино',
                question: 'Кипящий борщ из советской фантастической романтики… Но больше всего интригуют переменчивые политические веяния, которые чувствуются в фильме',
                options: ['Чародеи', 'Человек-амфибия', 'Через тернии к звездам', 'Аэлита'],
                correct: 1,
                fact: 'А еще «Человек-амфибия» Владимира Чеботарева и Геннадия Казанского был одним из любимых фильмов детства Квентина Тарантино. «Я даже не знал, что это русский фильм, но смотрел с большим удовольствием», — признавался режиссер.'
            },
            {
                category: 'Кино',
                question: 'Учитывая стоимость и огромные усилия, которые были вложены в его создание, такой фильм может быть снят только один раз в истории. Самое удивительное — что это вообще произошло',
                options: ['Война и мир', 'Солярис', 'Место встречи изменить нельзя', 'А зори здесь тихие'],
                correct: 0,
                fact: '«Война и мир» Сергея Бондарчука до сих пор остается одним из самых дорогих фильмов в истории. Однако данные о бюджете картины разнятся. Так, критик Федор Раззаков считал, что стоимость съемок эпопеи составила 8 миллионов советских рублей — однако он не включил в расчет многие статьи расхода. А другие источники оценивают бюджет картины в целых 100 миллионов долларов США.'
            },
            {
                category: 'Кино',
                question: 'Могу пересказать по кадрам фильм… Я увидел его в 1984 году, и он остался лучшим фильмом о войне за всю мою жизнь. Мальчик, входящий в дом, хозяев которого истребили нацисты, повсюду оставшиеся следы мирной жизни. Разоренное гнездо… кошмар неприкаянности',
                options: ['Офицеры', 'Иваново детство', 'Они сражались за Родину', 'Иди и смотри'],
                correct: 3,
                fact: 'Во время съемок «Иди и смотри» Элем Климов стремился к максимальной правдоподобности и потому использовал на площадке настоящие боевые снаряды: стандартные пиротехника и взрывпакеты, которые использовали для имитаций, в глазах режиссера выглядели ненатурально.'
            },
            {
                category: 'Кино',
                question: 'Фильм раскрывает, пожалуй, главную всеобщую проблему — проблему отношений мужчин и женщин. И делает это душевно и остроумно. Станет ли картина предвестником нового течения советского кинематографа, сказать сложно… однако она приятно удивляет чарующей историей и выдающимися актерскими работами',
                options: ['Покровские ворота', 'Служебный роман', 'Москва слезам не верит', 'Самая обаятельная и привлекательная'],
                correct: 2,
                fact: 'Фильм «Москва слезам не верит» пришелся по душе не только советским, но и зарубежным зрителям. В 1981 году картина даже получила «Оскар» в номинации «Лучший фильм на иностранном языке». А американский президент Рональд Рейган посмотрел фильм целых восемь раз перед встречей с Михаилом Горбачевым, пытаясь понять ту самую загадочную русскую душу.'
            },
            {
                category: 'Кино',
                question: 'Легко понять, как это военное приключение стало культовым — благодаря его чудаковатому остроумию, элегантной простоте и, вероятно, малобюджетным постановочным трюкам',
                options: ['Крепкий орешек', 'Белое солнце пустыни', 'Василий Теркин', 'Гусарская баллада'],
                correct: 1,
                fact: 'Поклонником «Белого солнца пустыни» был даже Леонид Брежнев. Именно по его распоряжению картину, забракованную во время просмотра на «Мосфильме», все-таки выпустили на экраны.'
            },
            {
                category: 'Кино',
                question: 'Когда я хочу позволить себе момент полного наслаждения, мне достаточно посмотреть этот фильм — это вызывает у меня восторг, и на душе становится теплее',
                options: ['Солярис', 'Москва — Кассиопея', 'Бриллиантовая рука', 'Долгие проводы'],
                correct: 0,
                fact: '«Солярис» Андрея Тарковского и в наши дни превозносят как отечественные, так и западные кинокритики. А вот Станиславу Лему, автору романа, который лег в основу фильма, экранизация совершенно не понравилась. «Из-за «Соляриса» мы здорово поругались с Тарковским. Я просидел шесть недель в Москве, пока мы спорили о том, как делать фильм, потом я обозвал его дураком и уехал домой», — вспоминал писатель.'
            },
            {
                category: 'Кино',
                question: 'Это странная комбинация хоррора и фэнтези, это невероятно круто! Русское кино рулит',
                options: ['Вий', 'Аленький цветочек', 'Сказка странствий', 'Морозко'],
                correct: 3,
                fact: 'Не только Элайдж Вуд (автор рецензии) оказался в восторге от кадров из «Морозко»: говорят, что советской картиной восхищался и режиссер Стивен Спилберг, который якобы называл сказку Александра Роу предтечей многих голливудских блокбастеров.'
            },
            {
                category: 'Кино',
                question: 'Эстетику утильпанка, в которой снят этот фильм, можно лучше всего описать как слияние Безумного Макса с Монти Пайтоном через видение Тарковского. Она прекрасно оттеняет глубокую, трагическую и одновременно очень глупую историю персонажей картины. То, как фильм изображает варварство ежедневного угнетения, остается очень актуальным и спустя 30 лет после выхода картины. Всем, кто интересуется космической научной фантастикой, обязательно стоит ее посмотреть',
                options: ['Отроки во Вселенной', 'Кин-дза-дза!', 'Планета бурь', 'Дознание пилота Пиркса'],
                correct: 1,
                fact: 'Легендарный пепелац для «Кин-дза-дза!» собирал сам режиссер Георгий Данелия вместе с художником-постановщиком Теодором Тэжиком. Для этого они отпилили хвост у Ту-104, который нашли на свалке самолетов, покрыли его пенополиуретаном и придали фактуру, чтобы металл казался изношенным и ржавым.'
            },
            {
                category: 'Кино',
                question: 'Один из моих самых любимых русских фильмов — этот фильм. Одно из великих качеств российского кино — мастерство в показе чего-то малого, глубоко личного, на фоне невероятной, огромной деятельности вокруг. Русские рассказывают историю одной любви, но окружают ее тысячами человек, лошадьми, артиллерией, взрывы сотрясают воздух. И просто интересно, как выстраивается этот баланс между интимным и сюрреалистическим',
                options: ['Летят журавли', 'В бой идут одни старики', 'Офицеры', 'Двадцать дней без войны'],
                correct: 0,
                fact: 'Фильм «Летят журавли» в Советском Союзе поначалу приняли холодно. Его жестко раскритиковал Никита Хрущев, а о том, что картина получила главный приз Каннского фестиваля в 1958 году, вышла лишь заметка в «Известиях» без названия и фотографий, где даже не упомянули имя режиссера Михаила Калатозова. Однако вскоре стало ясно, что фильм, который не прославлял с оптимизмом героев войны, а откровенно показывал трагедию военного времени, во многом изменил советский кинематограф.'
            },
            {
                category: 'Кино',
                question: 'Но этот фильм — это нечто большее. Он важен не столько как советская пропаганда, сколько как часть советского кинематографа… В нем соединилось столько различных отраслей кинопроизводства, сколько не используют кинодеятели ни одной другой страны в мире',
                options: ['Александр Невский', 'Иван Грозный', 'Броненосец «Потемкин', 'Стачка'],
                correct: 2,
                fact: '«Броненосец «Потемкин» Сергея Эйзенштейна оказал грандиозное влияние на развитие кинематографа не только в Советском Союзе, но и во всем мире. Он регулярно в наше время попадает в списки лучших фильмов всех времен и народов.'
            }
        ],
        'Советские мультфильмы': [
            {
                category: 'Мультфильмы',
                question: 'Какая фамилия у Пятачка?',
                options: ['Никакая — он просто Пятачок', 'Посторонним', 'Копытцев'],
                correct: 1,
                fact: 'На табличке рядом с домом Пятачка есть табличка «Посторонним В.». В книге Пятачок объясняет, что так звали его дедушку — Вильям Посторонним'
            },
            {
                category: 'Мультфильмы',
                question: 'Что сказал котенок Гав в ответ на предостережение: «Не ходи туда, там тебя ждут неприятности»?',
                options: ['Они меня ждут, эти неприятности? Я пошел!', 'Ну как же туда не ходить! Они же ждут!', 'Спасибо за предупреждение, пойду в другое место'],
                correct: 0,
                fact: 'Первоначально Гав предполагался рыжим и беспородным, однако впоследствии мультипликатор Леонид Шварцман решил сделать котенка породистым, взяв за основу сиамскую породу.'
            },
            {
                category: 'Мультфильмы',
                question: 'Какую песню насвистывает волк из «Ну, погоди!», поднимаясь по веревке?',
                options: ['«Прекрасное далеко».', '«Трава у дома»', '«Если друг оказался вдруг...»'],
                correct: 2,
                fact: 'Волк насвистывает мелодию песни Высоцкого «Если друг оказался вдруг...». Такая отсылка не случайна — знаменитый музыкант должен был озвучивать персонажа, однако его не утвердили на роль цензоры из-за «тлетворного влияния Высоцкого на молодежь».'
            },
            {
                category: 'Мультфильмы',
                question: 'Сколько рук у Громозеки из «Тайны третьей планеты»?',
                options: ['2', '6', '8'],
                correct: 1,
                fact: 'В мультфильме у Громозеки три пары рук. А вот в повести Кира Булычева у Громозеки «десять щупалец, восемь глаз, панцирь на груди и три добрых, бестолковых сердца».'
            },
            {
                category: 'Мультфильмы',
                question: 'Что подарил Медвежонок на день рождения Зайцу?',
                options: ['Он забыл подарок', 'Волшебную страну', 'Букет ромашек'],
                correct: 1,
                fact: 'Медвежонок дарит Зайцу Тилимилитрямдию — волшебную страну, которую он придумывал всю ночь. А еще Мультфильм "Трям! Здравствуйте!" — это один из эпизодов запланированного мини-сериала, но из-за определенных причин авторы не смогли реализовать задуманное в полном объеме'
            },
            {
                category: 'Мультфильмы',
                question: 'Кто решает принять Маугли в стаю?',
                options: ['Волчица Ракша', 'Питон Каа', 'Пантера Багира'],
                correct: 2,
                fact: 'На совете стаи Багира спасает Маугли, предложив за его жизнь только что убитого быка.Кстати главный герой книги, Маугли, был вдохновлен сыном Редьярда Киплинга.А "Книга джунглей" стала первой книгой, которая была напечатана на бумаге, сделанной из конопли'
            },
            {
                category: 'Мультфильмы',
                question: 'За что выгнали пса из мультфильма «Жил-был пес»?',
                options: ['Пес подружился с волком, которого боялись в селе', 'Пес проспал вора, который ограбил хозяев', 'Он сам ушел от хозяев'],
                correct: 1,
                fact: 'Старый пес всё время спал и не проснулся даже во время кражи.Изначально, Эдуард Назаров планировал назвать свой мультфильм "Собачья жизнь". Но увидев такое название руководство рассердилось, так как чиновники усмотрели в нем какой-то скрытый смысл. Пришлось придумывать новое название для мультфильма, иначе его мультфильм так и не вышел бы на экраны.'
            },
            {
                category: 'Мультфильмы',
                question: 'Как попугай Кеша возвращается из деревни домой?',
                options: ['Его привозит тракторист', 'Он голосует на дороге и ловит машину', 'Его присылают почтой'],
                correct: 2,
                fact: 'Тракторист Василий высылает попугая обратно Вовке посылкой.Кстати, идея с мультфильмом зародилась совершенно случайно. Однажды на студии Валентин Караваев предложил Курляндскому снять простенький детский мультик и рассказал историю о попугае, которого он зимой видел улице. Пернатый улетел из дома, но не растерялся и затесался в стаю воробьев.Мультипликаторы стали додумывать историю: зачем он вылетел из квартиры? Почему не вернулся? Как ему жилось? Никто не ожидал, что попугай Кеша станет настолько популярным.'
            },
            {
                category: 'Мультфильмы',
                question: 'Что дарит бабушка Бонифацию на прощание?',
                options: ['Свитер', 'Новый сачок', 'Красивую бабочку'],
                correct: 0,
                fact: 'Бабушка дарит Бонифацию свитер, который вязала ему всё лето. Интересный факт: Сценарий, написанный Ф. Хитруком, концептуально изменил историю, рассказанную чешским писателем. Короткая, немного грустная сказка для детей младшего и среднего школьного возраста о цирковом льве, который пришел домой на каникулы и вместо того, чтобы без устали дарить идеи своим «маленьким, забавным племянникам», успешно превратился в довольно философскую историю о силе Доброта и Доброта Силы. в то же время сочетая мягкий юмор с лиризмом.'
            },
            {
                category: 'Мультфильмы',
                question: 'Как зовут почтальона Печкина?',
                options: ['Сергей Петрович', 'Игорь Иванович', 'Юрий Борисович', 'Никак не зовут, он просто почтальон Печкин'],
                correct: 1,
                fact: 'Почтальона в Простоквашино зовут Печкин Игорь Иванович. Деревня Простоквашино существует на самом деле. Находится она в Нижегородской области и основана в 18 веке. Согласно поверью, местная хозяйка пролила удойник с молоком. Оно быстро прокисло на жаре, так и родилось название населённого пункта.'
            }
        ],
        'Искусство и литература': [
            {
                category: 'Искусство',
                question: 'Кто написал картину "Крик"?',
                options: ['Винсент Ван Гог', 'Эдвард Мунк', 'Пабло Пикассо'],
                correct: 1
            },
            {
                category: 'Литература',
                question: 'Кто написал роман "Мастер и Маргарита"?',
                options: ['Федор Достоевский', 'Михаил Булгаков', 'Лев Толстой'],
                correct: 1
            },
            {
                category: 'Искусство',
                question: 'В каком музее находится картина "Мона Лиза"?',
                options: ['Лувр', 'Прадо', 'Эрмитаж'],
                correct: 0
            },
            {
                category: 'Литература',
                question: 'Кто написал роман "Преступление и наказание"?',
                options: ['Лев Толстой', 'Федор Достоевский', 'Антон Чехов'],
                correct: 1
            }
        ],
        'Сказки и мифы': [
            {
                category: 'Сказки',
                question: 'Кто написал сказку "Алиса в Стране чудес"?',
                options: ['Льюис Кэрролл', 'Роальд Даль', 'Дж. М. Барри'],
                correct: 0
            },
            {
                category: 'Сказки',
                question: 'В какой сказке главный герой носит красную шапочку?',
                options: ['Красная Шапочка', 'Белоснежка', 'Золушка'],
                correct: 0
            },
            {
                category: 'Сказки',
                question: 'Кто написал сказку "Питер Пэн"?',
                options: ['Дж. М. Барри', 'Роальд Даль', 'Льюис Кэрролл'],
                correct: 0
            },
            {
                category: 'Сказки',
                question: 'В какой сказке главная героиня теряет хрустальную туфельку?',
                options: ['Белоснежка', 'Золушка', 'Спящая красавица'],
                correct: 1
            },
            {
                category: 'Сказки',
                question: 'Кто написал сказку "Маленький принц"?',
                options: ['Антуан де Сент-Экзюпери', 'Ганс Христиан Андерсен', 'Шарль Перро'],
                correct: 0
            },
            {
                category: 'Сказки',
                question: 'В какой сказке главный герой превращается в лебедя?',
                options: ['Гадкий утенок', 'Дикие лебеди', 'Снежная королева'],
                correct: 0
            },
            {
                category: 'Сказки',
                question: 'Кто написал сказку "Снежная королева"?',
                options: ['Шарль Перро', 'Ганс Христиан Андерсен', 'Братья Гримм'],
                correct: 1
            },
            {
                category: 'Сказки',
                question: 'В какой сказке главный герой летает на ковре-самолете?',
                options: ['Аладдин', 'Синдбад-мореход', 'Али-Баба'],
                correct: 0
            }
        ]
    };

    const compliments = [
        'Отлично! Ты молодец! 🎉',
        'Восхитительно! Продолжай в том же духе! 🌟',
        'Потрясающе! Ты на верном пути! 🚀',
        'Браво! Ты справился! 👏',
        'Супер! Ты знаешь кино! 🎬',
        'Невероятно! Ты просто киноман! 🍿',
        'Превосходно! Ты вдохновляешь! 💫',
        'Замечательно! Ты настоящий эксперт! 🏆',
        'Фантастически! Ты знаешь всё! 🤩',
        'Умница! Продолжай в том же духе! ��'
    ];

    const quotes = [
        'Кино — это жизнь, из которой вырезаны моменты скуки. — Альфред Хичкок',
        'В каждом фильме есть что-то от режиссера. — Федерико Феллини',
        'Кино — это зеркало, отражающее нас самих. — Жан-Люк Годар',
        'Фильм — это мечта, в которой мы все живем. — Ингмар Бергман',
        'Кино — это искусство показывать невидимое. — Франсуа Трюффо',
        'Хороший фильм заканчивается слишком быстро. — Роберт Альтман',
        'Кино — это магия, которая объединяет людей. — Стивен Спилберг',
        'Великие фильмы заставляют нас думать и чувствовать. — Мартин Скорсезе',
        'Кино — это язык, который понимают все. — Чарли Чаплин',
        'Фильм — это путешествие в другой мир. — Джеймс Кэмерон'
    ];

    const encouragements = {
        'Современное кино. Часть 1': [
            // Заполните своими цитатами или комплиментами
        ],
        'Современное кино. Часть 2': [
            // Заполните своими цитатами или комплиментами
        ],
        'Современное кино. Часть 3': [
            // Заполните своими цитатами или комплиментами
        ],
        'Советские мультфильмы': [
            // Заполните своими цитатами или комплиментами
        ],
        'Искусство и литература': [
            // Заполните своими цитатами или комплиментами
        ],
        'Сказки и мифы': [
            // Заполните своими цитатами или комплиментами
        ]
        // Добавьте другие категории по необходимости
    };

    try {
    const modal = document.createElement('div');
    modal.style.cssText = modalStyles.modal;

    const gameContent = document.createElement('div');
    gameContent.style.cssText = modalStyles.modalContent;

    const title = document.createElement('h2');
    title.style.cssText = modalStyles.title;
    title.textContent = 'Викторина';

    const questionContainer = document.createElement('div');
    questionContainer.style.cssText = gameElementStyles.questionContainer;

    const questionText = document.createElement('p');
    questionText.style.cssText = gameElementStyles.question;

    const optionsContainer = document.createElement('div');
    optionsContainer.style.cssText = gameElementStyles.optionsContainer;

    const message = document.createElement('p');
    message.style.cssText = gameElementStyles.message;

    const scoreDisplay = document.createElement('p');
    scoreDisplay.style.cssText = gameElementStyles.score;

    const nextButton = document.createElement('button');
    nextButton.style.cssText = modalStyles.button;
    nextButton.textContent = 'Следующий вопрос';
    nextButton.style.display = 'none';
    nextButton.addEventListener('mouseover', () => {
        nextButton.style.cssText = modalStyles.button + (modalStyles.buttonHover || '');
    });
    nextButton.addEventListener('mouseout', () => {
        nextButton.style.cssText = modalStyles.button;
    });

    const closeButton = document.createElement('button');
    closeButton.style.cssText = modalStyles.button;
    closeButton.textContent = 'Закрыть';
    closeButton.addEventListener('mouseover', () => {
        closeButton.style.cssText = modalStyles.button + (modalStyles.buttonHover || '');
    });
    closeButton.addEventListener('mouseout', () => {
        closeButton.style.cssText = modalStyles.button;
    });

    function createOptionButton(text, index) {
        try {
        const button = document.createElement('button');
            button.style.cssText = modalStyles.button + 'width: 100%; text-align: left; padding: 15px 20px;';
        button.textContent = text;

            button.addEventListener('click', () => {
                try {
                    const isCorrect = index === quizSets[currentCategory][currentQuestion].correct;
                    if (isCorrect) {
                        score++;
                        logger.info(`Correct answer: ${text}`);
                        let reward = '';
                        
                        // Получаем случайное поощрение из категории
                        const randomEncouragement = window.gameMessages.encouragements && window.gameMessages.encouragements[currentCategory] && window.gameMessages.encouragements[currentCategory].length > 0
                            ? window.gameMessages.encouragements[currentCategory][Math.floor(Math.random() * window.gameMessages.encouragements[currentCategory].length)]
                            : window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
                        
                        if (currentCategory === 'Советское кино' || currentCategory === 'Советские мультфильмы') {
                            // Только поощрение (без цитаты и без факта)
                            reward = `
                                <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                                    ${randomEncouragement}
                                </div>`;
                        } else {
                            // Для остальных категорий показываем поощрение и случайную цитату по категории
                            const categoryQuotes = window.gameMessages.quotesByCategory && window.gameMessages.quotesByCategory[currentCategory];
                            const randomQuote = categoryQuotes && categoryQuotes.length
                                ? categoryQuotes[Math.floor(Math.random() * categoryQuotes.length)]
                                : window.gameMessages.quotes[Math.floor(Math.random() * window.gameMessages.quotes.length)];
                            reward = `
                                <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                                    ${randomEncouragement}
                                </div>
                                <div style="margin-top: 15px; font-size: 18px; color: #33d17a;">
                                    ${randomQuote}
                                </div>`;
                        }
                        
                        message.innerHTML = `Правильно! 🎉${reward}`;
                        message.style.color = '#33d17a';

                        // Факт только отдельным блоком для советских категорий
                        if ((currentCategory === 'Советское кино' || currentCategory === 'Советские мультфильмы') 
                            && quizSets[currentCategory][currentQuestion].fact) {
                            const fact = quizSets[currentCategory][currentQuestion].fact;
                            message.innerHTML += `<div style="margin-top: 15px; font-size: 18px; color: #202027; background: #f5f5f5; border-radius: 8px; padding: 10px;"><b>Факт:</b> ${fact}</div>`;
                        }
                    } else {
                        logger.info(`Wrong answer: ${text}`);
                        const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
                        const correctAnswer = quizSets[currentCategory][currentQuestion].options[quizSets[currentCategory][currentQuestion].correct];
                        let messageContent = `
                            <div style="color: #ff0000; font-weight: bold; font-size: 20px; margin-bottom: 10px;">
                                Неправильно! 😢
                            </div>
                            <div style="margin-bottom: 10px; font-size: 18px; color: #202027;">
                                Правильный ответ: <b>${correctAnswer}</b>
                            </div>
                            <div style="margin-top: 15px; font-size: 18px; color: #202027;">
                                ${randomMotivation}
                            </div>`;

                        // Факт только отдельным блоком для советских категорий
                        if ((currentCategory === 'Советское кино' || currentCategory === 'Советские мультфильмы') 
                            && quizSets[currentCategory][currentQuestion].fact) {
                            const fact = quizSets[currentCategory][currentQuestion].fact;
                            messageContent += `
                                <div style="margin-top: 15px; font-size: 18px; color: #202027; background: #f5f5f5; border-radius: 8px; padding: 10px;">
                                    <b>Факт:</b> ${fact}
                                </div>`;
                        }

                        message.innerHTML = messageContent;
                    }

                    const buttons = optionsContainer.getElementsByTagName('button');
                    for (let btn of buttons) {
                btn.disabled = true;
                if (btn === button) {
                            btn.style.background = isCorrect ? '#33d17a' : '#ff0000';
                        }
                    }

                    nextButton.style.display = 'block';
                } catch (error) {
                    logger.error('Error handling answer:', error);
                    message.textContent = 'Произошла ошибка при проверке ответа';
                    message.style.color = '#ff0000';
                }
            });

            return button;
        } catch (error) {
            logger.error('Error creating option button:', error);
            throw error;
        }
    }

    function showQuestion() {
        try {
            // Описание всегда актуально
            let description = gameContent.querySelector('.quiz-description');
            if (!description) {
                description = document.createElement('div');
                description.className = 'quiz-description';
                description.style.cssText = 'margin-bottom: 15px; color: #202027; font-size: 16px;';
                gameContent.insertBefore(description, title.nextSibling);
            }
            if (currentCategory === 'Советское кино') {
                description.innerHTML = 'В этой категории нужно угадать советский фильм по рецензиям иностранных изданий и публичных лиц.';
            } else {
                description.textContent = 'Выберите правильный ответ на вопрос.';
            }
            const question = quizSets[currentCategory][currentQuestion];
            questionText.textContent = question.question;
        optionsContainer.innerHTML = '';
            message.textContent = '';
            scoreDisplay.textContent = `Вопрос ${currentQuestion + 1} из ${quizSets[currentCategory].length}`;

        question.options.forEach((option, index) => {
                const button = createOptionButton(option, index);
                optionsContainer.appendChild(button);
        });

        nextButton.style.display = 'none';
            logger.info(`Showing question ${currentQuestion + 1}`);
        } catch (error) {
            logger.error('Error showing question:', error);
            message.textContent = 'Произошла ошибка при отображении вопроса';
            message.style.color = '#ff0000';
        }
    }

    nextButton.addEventListener('click', () => {
        try {
        currentQuestion++;
            if (currentQuestion < quizSets[currentCategory].length) {
            showQuestion();
        } else {
                questionContainer.innerHTML = '';
            optionsContainer.innerHTML = '';
                message.textContent = `Игра окончена! Ваш результат: ${score} из ${quizSets[currentCategory].length}`;
            message.style.color = '#202027';
            nextButton.style.display = 'none';
                logger.info(`Game finished with score: ${score}/${quizSets[currentCategory].length}`);
            }
        } catch (error) {
            logger.error('Error handling next question:', error);
            message.textContent = 'Произошла ошибка при переходе к следующему вопросу';
            message.style.color = '#ff0000';
        }
    });

    closeButton.addEventListener('click', () => {
        logger.info('Closing Quiz Game');
        document.body.removeChild(modal);
    });

    const categories = Object.keys(quizSets);
    currentCategory = categories[Math.floor(Math.random() * categories.length)];
    logger.info(`Selected category: ${currentCategory}`);

    questionContainer.appendChild(questionText);
    gameContent.appendChild(description);
    gameContent.appendChild(title);
    gameContent.appendChild(questionContainer);
    gameContent.appendChild(optionsContainer);
    gameContent.appendChild(message);
    gameContent.appendChild(scoreDisplay);
    gameContent.appendChild(nextButton);
    gameContent.appendChild(closeButton);
    modal.appendChild(gameContent);
    document.body.appendChild(modal);

    showQuestion();
    logger.info('Quiz Game initialized successfully');
    } catch (error) {
        logger.error('Error initializing Quiz Game:', error);
        throw error;
    }
}

function handleAnswer(selectedIndex) {
    const isCorrect = selectedIndex === currentQuestionObj.correct;
    
    if (isCorrect) {
        score++;
        const randomCompliment = window.gameMessages.compliments[Math.floor(Math.random() * window.gameMessages.compliments.length)];
        messageElement.textContent = `Правильно! ${randomCompliment}`;
        messageElement.style.color = '#4CAF50';
        if (!(currentCategory === 'Советское кино' || currentCategory === 'Советские мультфильмы')) {
            messageElement.innerHTML += window.getRandomQuote();
        }
    } else {
        const randomMotivation = window.gameMessages.motivation[Math.floor(Math.random() * window.gameMessages.motivation.length)];
        messageElement.textContent = `Неправильно! Правильный ответ: ${currentQuestionObj.options[currentQuestionObj.correct]}. ${randomMotivation}`;
        messageElement.style.color = '#f44336';
    }
    
    // Отключаем все кнопки
    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach(button => button.disabled = true);
    
    // Подсвечиваем правильный ответ
    buttons[currentQuestionObj.correct].style.backgroundColor = '#4CAF50';
    buttons[currentQuestionObj.correct].style.color = 'white';
    
    // Если ответ был неправильный, подсвечиваем выбранный ответ
    if (!isCorrect) {
        buttons[selectedIndex].style.backgroundColor = '#f44336';
        buttons[selectedIndex].style.color = 'white';
    }
    
    // Показываем кнопку "Следующий вопрос"
    nextButton.style.display = 'block';
}