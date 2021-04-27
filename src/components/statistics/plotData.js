const plotOptions = {
  chartArea: {
        backgroundColor: "#fff"
  }
}

export const plotDataStructure = {
    labels: [],
    datasets: [
    {
      label: "Συνολικά Εμβόλια",
      data: [],
      backgroundColor: "hsl(222, 62%, 60%)",
      borderColor: "hsl(222, 62%, 60%)",
    },
    {
      label: "Εμβόλια α-δόσης",
      data: [],
      backgroundColor: "hsl(222, 65%, 70%)",
      borderColor: "hsl(222, 65%, 70%)",
    },
    {
      label: "Εμβόλια β-δόσης",
      data: [],
      backgroundColor: "hsl(222, 75%, 80%)",
      borderColor: "hsl(222, 75%, 80%)"
    }
  ],
  options: plotOptions
}


