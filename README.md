# Parallel Sets for RAWGraphs <img src="https://raw.githubusercontent.com/mikima/rawgraphs-parset/master/src/parset/parset_icon.svg" alt="parallel sets icon" height="40px" style="vertical-align: middle"/>

This custom chart is intended to be used inside the [RAWGraphs app](https://app.rawgraphs.io/).

## What are Parallel Sets

![](https://raw.githubusercontent.com/mikima/rawgraphs-parset/master/src/parset/parset_thumb.svg)

Parallel Sets show how two or more categorical dimensions relate to each other. Each dimension is drawn as a row of stacked bars — one per category, sized by frequency — with ribbons flowing between adjacent rows to show how records split across categories, similarly to a Sankey diagram read top-to-bottom. The technique was introduced by Robert Kosara, Fabian Bendix and Helwig Hauser in [Parallel Sets: Interactive Exploration and Visual Analysis of Categorical Data](https://eagereyes.org/publications/Kosara-TVCG-2006) (IEEE TVCG, 2006). This implementation is built on top of the [d3-parsets](https://github.com/mikima/d3-parsets) layout, and lets you switch between straight, curved or line-style ribbons, weight rows by a numeric value (or just count records), and color flows by their originating category.

## Installation

- Build the chart bundle yourself (see [Edit the code](#edit-the-code) below), or, once available, download the latest release asset (`index.umd.js`) from the [Releases](https://github.com/mikima/rawgraphs-parset/releases) tab.
- In [RAWGraphs](https://app.rawgraphs.io/) load a dataset. You can try the [sample Titanic dataset](https://raw.githubusercontent.com/mikima/rawgraphs-parset/master/example/datasets/titanic.csv).
- In section `2. Choose a chart`, scroll down and click `Load your chart`.
- Select the `Load from file` tab, then drag and drop the bundle file.
- Click `Load your chart`, acknowledge the pop-up about external code, and continue.
- The Parallel Sets chart will now be available in your chart list.

## Tutorial

Build a Parallel Sets chart using the sample Titanic dataset.

#### Dataset

Load the dataset at [example/datasets/titanic.csv](https://raw.githubusercontent.com/mikima/rawgraphs-parset/master/example/datasets/titanic.csv) — the classic aggregated Titanic survival table. Columns: `Class`, `Sex`, `Age`, `Survived`, `Freq`.

#### Chart Selection

Choose **Parallel Sets**. If you do not see it, follow the steps in [Installation](#installation).

#### Mapping

Drag and drop dimensions as follows:

- `Class`, `Sex`, `Age`, `Survived` → `Sets`, in this order (at least 2 columns are required; you can map more)
- `Freq` → `Size` (optional — leave it unmapped to count each row as 1)

#### Customize

Key visual options you can tune in RAWGraphs:

- **Chart**: set `Bars thickness` and `Total spacing between categories` to control the layout; `Sort categories by` shows one dropdown per mapped set (`Original`, `Name`, `Size ascending/descending`), so each set can have its own order; switch `Ribbons shape` between `Ribbon (filled)` and `Line (stroked centerline)`; use `Ribbons curvature` to bow ribbons into an S-curve (ignored when the shape is `Line`); adjust `Ribbons opacity`.
- **Colors**: choose a palette in `Color scale` to color ribbons by their category in the first mapped set.
- **Labels**: toggle `Show set names`, `Show category names` and `Show category values`.
- **Artboard**: adjust margins, and toggle `Show legend` / `Legend width`.

## Contribute

If you'd like to contribute, follow the RAWGraphs [custom template guide](https://github.com/rawgraphs/custom-rawcharts-template).

## Edit the code

### Install dependencies

```sh
npm install
```

### Run Sandbox

Modify the chart locally with live reload.

```sh
npm run sandbox
```

Open [http://localhost:9000](http://localhost:9000) to view the sandbox. Five example configurations are available:

- `parset01-straightribbons` — default look, straight-sided ribbons
- `parset02-rowcounts` — no `Size` mapped, each row counts as 1
- `parset03-curvedribbons` — ribbons bowed into an S-curve (`tension` < 1)
- `parset04-lineribbons` — ribbons drawn as stroked centerlines instead of filled shapes
- `parset05-sortedcategories` — each set sorted differently (by size, by name, by count ascending/descending, or left in dataset order)

### Build

Create the bundle to load in RAWGraphs.

```sh
npm run build
```

The `lib/index.umd.js` file is the bundle you can load into RAWGraphs.

## Credits

- Original technique: Robert Kosara, Fabian Bendix, Helwig Hauser, [Parallel Sets: Interactive Exploration and Visual Analysis of Categorical Data](https://eagereyes.org/publications/Kosara-TVCG-2006), IEEE TVCG, 2006.
- First D3 implementation: Jason Davies' [d3-parsets](https://github.com/jasondavies/d3-parsets).
- Layout powered by [d3-parsets](https://github.com/mikima/d3-parsets).
- Chart implementation built on the RAWGraphs [custom-rawcharts-template](https://github.com/rawgraphs/custom-rawcharts-template).
