// SCENE_V1
// Native geometry: 16:9 (1680x1080)
// All coordinates and sizes are expressed in this pixel space.
// Final scaling is applied at render time to fit the available viewport.

export const SCENE_V1 = {
  meta: {
    id: "v1",
    aspect: "16:9",
    baseWidthPx: 1680,
    baseHeightPx: 1080,
    assetRoot: "assets/v1"
  },

  background: {
    layers: [
      {
        id: "base",
        asset: "background/base.png"
      }
      // w przyszłości:
      // { id: "overlay", asset: "background/overlay.png" }
    ]
  },

  nodes: [
    {
      id: "pv",
      asset: "nodes/pv.png",
      xPx: 840,
      yPx: 170,
      widthPx: 573
    },
    {
      id: "inverter",
      asset: "nodes/inverter.png",
      xPx: 840,
      yPx: 540,
      widthPx: 135
    },
    {
      id: "battery",
      asset: "nodes/battery.png",
      xPx: 460,
      yPx: 700,
      widthPx: 150
    },
    {
      id: "grid",
      asset: "nodes/meter.png",
      xPx: 1220,
      yPx: 700,
      widthPx: 106
    },
    {
      id: "home",
      asset: "nodes/home.png",
      xPx: 840,
      yPx: 910,
      widthPx: 287
    }
  ],

  links: []
};
