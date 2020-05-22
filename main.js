import m from 'mithril';
import tagl from 'tagl-mithril';
const { div, h1, button, pre } = tagl(m);

const range = (start, endExclusive) => {
    let r = [];
    for (let i = start; i < endExclusive; i++) r.push(i);
    return r;
};

const createDisplay = (width, height) => {
    const pixels = [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];
    const idx = (x, y) => y * width + x;
    return {
        width: () => width,
        height: () => height,
        at: (x, y) => pixels[idx(x, y)],
        toggle: (x, y) => pixels[idx(x, y)] = 1 - pixels[idx(x, y)],
        print: () => console.log(pixels),
        pixels: () => pixels.map(e => e)
    };
};

let width = 52;
let height = 7;

let display = createDisplay(width, height);


let plan = null;

let days = 7;
let weeks = 52;

const createPlan = () => {
    plan = range(0, days).map(day =>
        range(0, weeks).map(week =>
            display.at(week, day) ? {
                week,
                day
            } : undefined
        ).filter(e => e)
    )
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
            button({ onclick: e => createPlan() }, 'Export plan'),
            // div(display.pixels().join(', '))
            pre(JSON.stringify(plan, null, 2))
        ]
    )
});