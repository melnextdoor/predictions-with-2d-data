async function getData() {
    const carsDataResponse = await fetch ('https://storage.googleapis.com/tfjs-tutorials/carsData.json')
    const carsData = await carsDataResponse.json();

    const cleanedCarsData = carsData.map(car => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower,
    })).filter(car => (car.mpg != null && car.horsepower != null))

    return cleanedCarsData;
}

async function run() {
    const data = await getData();
    const values = data.map(d => ({
        x: d.horsepower,
        y: d.mpg,
    }));

    tfvis.render.scatterplot(
        {name: 'Horsepower v MPG'},
        {values},
        {
            xLabel: 'Horsepower',
            ylabel: 'MPG',
            height: 300
        }
    );

    const model = createModel();
    tfvis.show.modelSummary({name: 'Model Summary'}, model);
}

function createModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));
    model.add(tf.layers.dense({units: 1, useBias: true}));

    return model;
}

document.addEventListener('DOMContentLoaded', run);