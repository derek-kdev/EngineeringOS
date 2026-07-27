export const loaderImages = [
  "/img/loading1.jpg",
  "/img/loading2.jpg",
  "/img/loading3.jpg",
  "/img/loading4.jpg",
  "/img/loading5.jpg",
  "/img/loading6.jpg",
  "/img/loading7.png",
  "/img/loader8.jpg",
  "/img/loader9.jpg",
  "/img/loader10.jpg",
  "/img/loader11.jpg",
  "/img/loader12.jpg",
  "/img/loader13.jpg",
  "/img/loader14.jpg",
];


export const loaderAnimations = [
  "spinner",
  "pulse",
  "bounce",
  "ripple",
  "breathing",
  "gradient",
  "dots",
  "filament",
] as const;



export function randomItem<T>(
  array:T[]
):T {

  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];

}
