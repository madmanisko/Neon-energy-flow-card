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
      xPx: 387,    //840,
      yPx: 294,    //170,
      widthPx: 477  //573
    },
    {
      id: "inverter",
      asset: "nodes/inverter.png",
      xPx: 854,    //840,
      yPx: 580,    //540,
      widthPx: 187
    },
    {
      id: "battery",
      asset: "nodes/battery.png",
      xPx: 393,   //460,
      yPx: 791,   //700,
      widthPx: 208   //150
    },
    {
      id: "grid",
      asset: "nodes/meter.png",
      xPx: 1374,    //1220,
      yPx: 801,    //700,
      widthPx: 142   //106
    },
    {
      id: "home",
      asset: "nodes/home.png",
      xPx: 1323,  //840,
      yPx: 330,   //910,
      widthPx: 662   //287
    }
  ],

  links: [
  {
    id: "pv1_to_inverter",
    from: "pv1",
    to: "inverter",
    flowType: "pv",
    path: [
      { x: 421, y: 341 },
      { x: 421, y: 540 },
      { x: 760, y: 540 }
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
      { x: 465, y: 785 },
      { x: 815, y: 785 },
      { x: 815, y: 662 }
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
      { x: 1300, y: 787 },
      { x: 882, y: 787 },
      { x: 882, y: 662 }
    ]
  },
  {
    id: "inverter_to_home",
    from: "inverter",
    to: "home",
    flowType: "home",
    path: [
      { x: 1240, y: 436 },
      { x: 1240, y: 540 },
      { x: 936, y: 540 }
    ]
  }
]

};
