import m from 'mithril';
import tagl from 'tagl-mithril';
const { div, h1, button, pre, input, a, br, p } = tagl(m);

const range = (start, endExclusive) => {
    let r = [];
    for (let i = start; i < endExclusive; i++) r.push(i);
    return r;
};

const use = (v, fn) => fn(v);
const flatMap = (arr, fn = e => e) => (arr || []).reduce((a_, v) => a_.concat(v.map(fn)), []);
const createDisplay = (width, height) => {
    const defaultPixels = [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0];
    let pixels = defaultPixels;
    const idx = (x, y) => y * width + x;
    return {
        width: () => width,
        height: () => height,
        at: (x, y) => pixels[idx(x, y)],
        toggle: (x, y) => pixels[idx(x, y)] = 1 - pixels[idx(x, y)],
        print: () => console.log(JSON.stringify(pixels)),
        pixels: () => pixels.map(e => e),
        save: () => localStorage.setItem('pixels', JSON.stringify(pixels, null, 2)),
        load: () => (pixels = use(localStorage.getItem('pixels'), storage => storage ? JSON.parse(storage) : defaultPixels)) && display.print(),
        clear: () => pixels = range(0, width * height).map(e => 0)
    };
};

let width = 52;
let height = 7;

let display = createDisplay(width, height);


let plan = null;
let days = 7;
let weeks = 52;

const createPlan = (date) => {
    const startDate = new Date(date);
    const weekDays = range(0, days).map(day =>
        range(0, weeks).map(week =>
            display.at(week, day) ? {
                week,
                day
            } : undefined
        ).filter(e => e)
    )

    plan =
        flatMap(weekDays, element => element.week * 7 + element.day).map(dayOffset => {
            const volatileDate = new Date(date);
            volatileDate.setDate((volatileDate.getDate() + dayOffset));
            volatileDate.setUTCHours(0);
            return volatileDate;
        }).sort((d1, d2) => d1 - d2);

};


display.print();
m.mount(document.body, {
    view: vnode => div.container(
        [
            h1('Contribution Pixel Message'),
            div.display(
                range(0, height).map(y =>
                    div.row(
                        range(0, width).map(x =>
                            display.at(x, y) ? div.filled({
                                onclick: e => display.toggle(x, y)
                            }) : div.blank({
                                onclick: e => display.toggle(x, y)
                            })
                        )
                    )
                )
            ),
            // div(display.pixels().join(', '))
            input({ title: 'Select the starting date of your plan. It should be a sunday.', type: 'date', oninput: e => createPlan(e.target.value) }),
            // pre(JSON.stringify(plan, null, 2)),
            button({ title: 'Load from local storage', onclick: e => display.load() }, 'load'),
            button({ title: 'Save to local storage', onclick: e => display.save() }, 'save'),
            button({ onclick: e => display.clear() }, 'clear'),
            plan ? a({
                href: `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(plan))}`,
                download: 'plan.json'
            }, 'Download plan') : null,
            br(),
            p('Find the source code and how it works on ', a({ href: 'https://github.com/abulvenz/contribution-pixel-messages' }, 'github')),
            p('Best viewed on Internet Explorer 4 with screen resolution set to 1024x768pixels.')
        ]
    )
});