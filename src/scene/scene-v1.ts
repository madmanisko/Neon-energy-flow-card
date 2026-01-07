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
      widthPx: 600
    }
  ],

  links: [
  {
    id: "pv1_to_inverter",
    from: "pv1",
    to: "inverter",
    flowType: "pv",
    path: [
      { x: 840, y: 260 },
      { x: 840, y: 430 }
    ]
  },
  {
    id: "pv2_to_inverter",
    from: "pv2",
    to: "inverter",
    flowType: "pv",
    path: [
      { x: 1040, y: 260 },
      { x: 900, y: 430 }
    ]
  },
  {
    id: "battery1_to_inverter",
    from: "battery1",
    to: "inverter",
    flowType: "battery",
    path: [
      { x: 520, y: 720 },
      { x: 700, y: 720 },
      { x: 700, y: 580 }
    ]
  },
  {
    id: "battery2_to_inverter",
    from: "battery2",
    to: "inverter",
    flowType: "battery",
    path: [
      { x: 300, y: 720 },
      { x: 600, y: 720 },
      { x: 600, y: 580 }
    ]
  },
  {
    id: "grid_to_inverter",
    from: "grid",
    to: "inverter",
    flowType: "grid",
    path: [
      { x: 1200, y: 720 },
      { x: 980, y: 720 },
      { x: 980, y: 580 }
    ]
  },
  {
    id: "inverter_to_home",
    from: "inverter",
    to: "home",
    flowType: "home",
    path: [
      { x: 840, y: 600 },
      { x: 840, y: 880 }
    ]
  }
]

};
