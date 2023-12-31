/* site planning de la semaine ( mobile only )
header : 
- liste des jours de la semaine avec un scroll horizontal
    un bouton par jour de la semaine en commençant par le jour actuel ( ex : JEU. 27 JUIL. ) préciser semaine a ou b
    suivit d'un bouton calendrier qui ouvre un calendrier ( qui vient du bas de l'écran ) avec le contenu suivant :
    un scroll vertical avec pour chaque mois a partir du mois actuel : le nom du mois (centré), puis en dessous la première lettre de chaque jour de la semaine ( L M M J V S D ) puis en dessous les numéros des jours du mois ( ex : 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 ... ) sous forme de grille correspondant au jour de la semaine ( ne commence pas forcément par le lundi )
    dans le coin en haut a droite, un bouton pour fermer le calendrier ou swipe vers le bas pour fermer le calendrier
- un bouton Télécharger le planning qui télécharge le planning de la semaine a et b en pdf

body :
- liste des taches et arrivé des gens du jour selectonnée
    les taches du jour sont affichées sous forme de liste de haut en bas (style liste de course) avec pour chauqe tache :
    - le font de la tache est transparent
    - en haut a gauche : un cercle avec le numéro de la tache dedans ( fond gris-blanc, text blanc pas de bordure )
    - à coté : le nom de la personne qui doit faire la tache ( text gras noir ) + un petit rond de la couleur de la personne (couleur pastel)
    - en dessous : l'intitulé de la tache ( text normal noir )
    et tout à droite aligné avec le cercle : 2 rectangle cote a cote, le premier contient l'horaire de début de la tache et le deuxième l'horaire de fin de la tache ( bord bleu, fond transparent, text bleu )
    si la tache est en cours, le font de la tache devient bleu opacité 20%, le cercle devient bleu, le numéro de la tache devient un icon de sablier, l'horaire de début est remplacé par "en cours" et son rectangle prend un fond bleu et le texte devient blanc, l'horaire de fin disparait
    si la tache est terminée, le cercle devient redevient gris-blanc, le numéro de la tache redevient un numéro, l'horaire de début est remplacé par "terminé" et son rectangle prend un fond gris-blanc et le texte reste blanc, l'horaire de fin ne réapparait pas

un système de mot de passe est mis en place pour accéder au planning

*/

// Path: js\index.js

const daysWrapper = document.querySelector('#days');
const tasksWrapper = document.querySelector('#tasks');

const now = moment();

const tradDays = {
    monday: {
        complete: 'Lundi',
        short: 'Lun.',
    },
    tuesday: {
        complete: 'Mardi',
        short: 'Mar.',
    },
    wednesday: {
        complete: 'Mercredi',
        short: 'Mer.',
    },
    thursday: {
        complete: 'Jeudi',
        short: 'Jeu.',
    },
    friday: {
        complete: 'Vendredi',
        short: 'Ven.',
    },
    saturday: {
        complete: 'Samedi',
        short: 'Sam.',
    },
    sunday: {
        complete: 'Dimanche',
        short: 'Dim.',
    },
};
const tradMonths = {
    january: {
        complete: 'Janvier',
        short: 'Jan.',
    },
    february: {
        complete: 'Février',
        short: 'Fév.',
    },
    march: {
        complete: 'Mars',
        short: 'Mar.',
    },
    april: {
        complete: 'Avril',
        short: 'Avr.',
    },
    may: {
        complete: 'Mai',
        short: 'Mai',
    },
    june: {
        complete: 'Juin',
        short: 'Juin',
    },
    july: {
        complete: 'Juillet',
        short: 'Juil.',
    },
    august: {
        complete: 'Août',
        short: 'Août',
    },
    september: {
        complete: 'Septembre',
        short: 'Sept.',
    },
    october: {
        complete: 'Octobre',
        short: 'Oct.',
    },
    november: {
        complete: 'Novembre',
        short: 'Nov.',
    },
    december: {
        complete: 'Décembre',
        short: 'Déc.',
    },
};
const workers = [
    {
        name: 'Salarié',
        color: '#7f8fa6',
    },
    {
        name: 'Myriam',
        color: '#be738d',
    },
    {
        name: 'Lucie',
        color: '#88a069',
    },
    {
        name: 'Producteur',
        color: '#cab06d',
    }
];

const week = {
    odd: {
        monday: [
            {
                worker: 0,
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 0,
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'ouverture + matinée + midi',
                start: moment('08:45', 'HH:mm'),
                end: moment('14:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        tuesday: [
            {
                worker: 0, // Valérie
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'bureau',
                start: moment('10:00', 'HH:mm'),
                end: moment('15:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'midi + après-midi + fermeture',
                start: moment('13:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        wednesday: [
            {
                worker: 1, // Myriam
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        thursday: [
            {
                worker: 0, // Valérie
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'bureau',
                start: moment('11:00', 'HH:mm'),
                end: moment('15:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        friday: [
            {
                worker: 0, // Valérie
                task: 'ouverture + matinée + midi',
                start: moment('08:45', 'HH:mm'),
                end: moment('15:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'bureau',
                start: moment('11:00', 'HH:mm'),
                end: moment('15:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'ouverture + matinée + midi',
                start: moment('08:45', 'HH:mm'),
                end: moment('14:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'après-midi',
                start: moment('15:00', 'HH:mm'),
                end: moment('19:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        saturday: [
            {
                worker: 0, // Valérie
                task: 'journee complète',
                start: moment('08:45', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'matinée + midi + après-midi',
                start: moment('10:00', 'HH:mm'),
                end: moment('17:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        sunday: [],
    },
    even: {
        monday: [
            {
                worker: 0, // Valérie
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 0,
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'ouverture + matinée + midi',
                start: moment('08:45', 'HH:mm'),
                end: moment('15:45', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        tuesday: [
            {
                worker: 0, // Valérie
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 0, // Valérie
                task: 'bureau',
                start: moment('13:00', 'HH:mm'),
                end: moment('15:00', 'HH:mm'),
            },
            {
                worker: 0, // Valérie
                task: 'début d\'après-midi',
                start: moment('15:00', 'HH:mm'),
                end: moment('16:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'bureau',
                start: moment('10:00', 'HH:mm'),
                end: moment('16:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'après-midi + fermeture',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'midi + après-midi + fermeture',
                start: moment('13:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        wednesday: [
            {
                worker: 1, // Myriam
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        thursday: [
            {
                worker: 0, // Valérie
                task: 'ouverture + matinée',
                start: moment('08:45', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'bureau',
                start: moment('12:30', 'HH:mm'),
                end: moment('15:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'après-midi + fermeture',
                start: moment('15:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('09:00', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        friday: [
            {
                worker: 0, // Valérie
                task: 'journee complète',
                start: moment('08:45', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 1, // Myriam
                task: 'bureau',
                start: moment('09:00', 'HH:mm'),
                end: moment('14:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'ouverture + matinée + midi',
                start: moment('08:45', 'HH:mm'),
                end: moment('14:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'après-midi',
                start: moment('15:00', 'HH:mm'),
                end: moment('19:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('09:00', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        saturday: [
            {
                worker: 1, // Myriam
                task: 'journee complète',
                start: moment('08:45', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
            {
                worker: 2, // Lucie
                task: 'matinée + midi + après-midi',
                start: moment('10:00', 'HH:mm'),
                end: moment('17:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'matinée',
                start: moment('09:00', 'HH:mm'),
                end: moment('13:00', 'HH:mm'),
            },
            {
                worker: 3,
                task: 'après-midi',
                start: moment('16:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
            },
        ],
        sunday: [],
    }
}

const days = generateDays(now);

generateDaysHTML();

function generateDays(firstDay) {
    let days = [];
    // si on a dépassé 21h, on passe au jour suivant
    firstDay.hour(13);
    if (now.hour() >= 21) {
        firstDay.add(1, 'day');
        firstDay.hour(0);
    }
    const firstWeekType = firstDay.week() % 2 === 0 ? 'even' : 'odd';
    // si on est dimanche, on passe au lundi
    if (firstDay.day() === 0) {
        firstWeekType = firstWeekType === 'even' ? 'odd' : 'even';
    }
    const firstDayName = firstDay.format('dddd').toLowerCase();
    if(week[firstWeekType][firstDayName].length === 0) {
        firstDay.add(1, 'day');
        firstDay.hour(0);
    }

    for (let i = 0; i < 7; i++) {
        const day = firstDay.clone().add(i, 'day');
        // si day est autre que le jour actuel, on passe à 0h
        if (day.format('D') !== now.format('D')) {
            // set to 0h
            day.hour(0);
        }
        let weekType = day.week() % 2 === 0 ? 'even' : 'odd';
        if(day.day() === 0) {
            weekType = weekType === 'even' ? 'odd' : 'even';
        }
        const dayName = day.format('dddd').toLowerCase();
        const monthName = day.format('MMMM').toLowerCase();
        let tasks = week[weekType][dayName].sort((a, b) => a.start - b.start)
        // set date + hour of start and end
        for (const task of tasks) {
            task.start.set({
                year: day.year(),
                month: day.month(),
                date: day.date(),
            });
            task.end.set({
                year: day.year(),
                month: day.month(),
                date: day.date(),
            });
        }
        let finishedTasks = tasks.filter(task => task.end.isBefore(now));
        let currentTask = tasks.filter(task => task.start.isBefore(now) && task.end.isAfter(now));
        let nextTask = tasks.filter(task => task.start.isAfter(now));
        tasks = [...finishedTasks, ...currentTask, ...nextTask];
        const objDay = {
            moment: day,
            weekType: weekType,
            shortDayName: tradDays[dayName].short,
            dayNumber: day.format('DD'),
            shortMonthName: tradMonths[monthName].short,
            tasks,
        };
        days.push(objDay);
    }
    console.log(days);
    return days;
}

function generateDaysHTML() {
    daysWrapper.innerHTML = '';
    for (const day of days) {
        const weekTypeColor = day.weekType === 'even' ? '#fbc531' : '#e84118';
        let styleOfDayButton = "bg-white border-white border border-solid rounded p-1 h-[72px] min-h-[72px] w-[56px] min-w-[56px] flex flex-col justify-center items-center after:bg-[" + weekTypeColor + "] after:rounded-full after:content-'' after:opacity-0 after:block after:h-[3px] after:w-[24px] after:mb-[-4px]";
        if(day.tasks.length === 0) {
            styleOfDayButton = "bg-[#f7f7f7] border-[#090a0b0d] border border-solid rounded p-1 h-[72px] min-h-[72px] w-[56px] min-w-[56px] flex flex-col justify-center items-center after:bg-transparent after:rounded-full after:content-'' after:block after:h-[3px] after:w-[24px] after:mb-[-4px] pointer-events-none"
        }
        const dayHTML = `
<div class="day ${styleOfDayButton}"
data-day="${day.moment.format('DD-MM-YYYY')}">
    <p class="day-name uppercase font-bold leading-[20px] ${day.tasks.length === 0 ? 'opacity-[0.3]' : ''}" style="font-size: 12px;"
    >${day.shortDayName}</p>
    <p class="day-number font-bold leading-[24px] ${day.tasks.length === 0 ? 'opacity-[0.3]' : ''}" style="font-size: 22px;"
    >${day.dayNumber}</p>
    <p class="day-month uppercase font-bold leading-[20px] ${day.tasks.length === 0 ? 'opacity-[0.3]' : ''}" style="font-size: 12px;"
    >${day.shortMonthName}</p>
</div>`
        daysWrapper.innerHTML += dayHTML;
    }
    // add calendar button
    const calendarButton = `
<div class="day bg-white border-white border border-solid rounded p-1 h-[72px] min-h-[72px] w-[56px] min-w-[56px] flex flex-col justify-center items-center" id="calendar-button">
    <i class="far fa-calendar-plus" style="font-size: 22px;"></i>
</div>`
    daysWrapper.innerHTML += calendarButton;
    document.querySelector('.day').classList.add('selected');
    generateTasksHTML(days[0]);

    // event listeners
    const daysElements = document.querySelectorAll('.day');
    for (const dayElement of daysElements) {
        dayElement.addEventListener('click', function () {
            if (this.id === 'calendar-button') {
                // open calendar
                openCalendar();
            } else {
                // select day
                for (const dayElement of daysElements) {
                    dayElement.classList.remove('selected');
                }
                this.classList.add('selected');
                const day = days.find(day => day.moment.format('DD-MM-YYYY') === this.dataset.day);
                generateTasksHTML(day)
            }
        });
    }
}

function generateTasksHTML(day) {
    tasksWrapper.innerHTML = '';
    let index = 1;
    for (const task of day.tasks) {
        const worker = workers[task.worker];
        let textIndex = index < 10 ? `0${index}` : index;
        let taskStart = task.start.format('HH:mm');
        if(task.start.isBefore(now) && task.end.isAfter(now)) {
            textIndex = '<i class="fas fa-hourglass-half text-white" style="font-size: 10px;"></i>';
            taskStart = 'en cours';
        }

        if(task.end.isBefore(now)) {
            taskStart = 'terminé';
        }
        const taskHTML = `
<div class="task ${task.start.isBefore(now) && task.end.isAfter(now) ? 'current' : ''} ${task.end.isBefore(now) ? 'finished' : ''} h-[80px] min-h-[80px] w-full flex justify-between items-start px-[15px] pt-[10px]">
    <div class="task-content flex items-start gap-[10px] w-full">
    <p class="task-number bg-${taskStart === 'en cours' ? '[#7296e3]' : '[#b9b9b9]'} rounded-full min-w-[20px] min-h-[20px] flex justify-center items-center text-white mt-[5px]" style="font-size: 12px;"
    >${textIndex}</p>
    <div class="task-text w-full">
        <p class="task-worker flex items-center after:bg-[${worker.color}] after:rounded-full after:content-'' after:block after:w-full after:mx-[15px] after:h-[2px] text-black font-bold" style="font-size: 18px;">${worker.name}</p>
        <p class="task-name">${task.task}</p>
        </div>
    </div>
    <div class="task-time flex flex-row justify-between items-end gap-[5px]">
        <p class="task-start bg-${taskStart === 'en cours' ? '[#7296e3]' : (taskStart === 'terminé' ? '[#b9b9b9]' : 'transparent')} rounded-sm border border-solid text-${task.start.isBefore(now) ? 'white w-[80px]' : '[#7296e3]'} border-${taskStart === 'terminé' ? '[#b9b9b9]' : '[#7296e3]'} font-medium px-[5px] leading-[18px] mt-[4px] min-w-[48px] flex justify-center items-center whitespace-nowrap uppercase" style="font-size: 14px;">${taskStart}</p>
        <p class="task-end bg-transparent rounded-sm border border-solid border-[#7296e3] text-[#7296e3] font-medium px-[5px] leading-[18px] mt-[4px] min-w-[48px] flex justify-center items-center whitespace-nowrap uppercase ${task.start.isBefore(now) ? 'hidden' : ''}" style="font-size: 14px;">${task.end.format('HH:mm')}</p>
    </div>
</div>`
        tasksWrapper.innerHTML += taskHTML;
        index++;
    }
}
