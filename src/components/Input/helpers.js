export const getMask = (type) => {
  switch (type) {
    case "percent":
      return {
        mask: [
          {
            mask: "",
          },
          {
            mask: "num%",
            lazy: false,
            blocks: {
              num: {
                mask: Number,
                scale: 3,
                min: 1,
                max: 100,
                radix: ".",
                mapToRadix: [","],
              },
            },
          },
        ],
      };
    case "number":
      return {
        mask: [
          { mask: "000000" },
          {
            mask: "num",
            blocks: {
              num: { mask: Number, scale: 6, min: 100000, max: 999999 },
            },
          },
        ],
      };
    case "float":
      return {
        mask: Number,
        scale: 2,
        signed: false,
        thousandsSeparator: "",
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ",",
        mapToRadix: ["."],
        min: -10000,
        max: 10000,
      };
    default:
      return {};
  }
};
