'use client'
import React, { useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface DataItem {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  date: string;
  value: string;
  category_id: number;
  district_id: number;
  user_id: number;
  district: {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
  };
  user: {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    username: string;
    password: string;
    nama: string;
    role: number;
    district_id: number | null;
  };
  category: {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    kota: number;
    provinsi: number;
    pusat: number;
    parent_id: number | null;
  };
}

interface CategoryChartProps {
  data: DataItem[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  useEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "month", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root,{}),
      })
    );

    let aggregatedData: { [key: string]: { [key: string]: number } } = {};

    data.forEach((item) => {
      const month = item.date.substring(0, 7); // Get YYYY-MM format
      const category = item.category.name;

      if (!aggregatedData[month]) {
        aggregatedData[month] = {};
      }

      if (!aggregatedData[month][category]) {
        aggregatedData[month][category] = 0;
      }

      aggregatedData[month][category] += parseFloat(item.value);
    });

    let chartData: { date: Date; [key: string]: number | Date }[] = [];

    for (let month in aggregatedData) {
      let dataItem: { date: Date; [key: string]: number | Date } = { date: new Date(month + "-01") };

      for (let category in aggregatedData[month]) {
        dataItem[category] = aggregatedData[month][category];
      }

      chartData.push(dataItem);
    }

    for (let category in aggregatedData[Object.keys(aggregatedData)[0]]) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: category,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: category,
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{name}: {valueY}",
          }),
        })
      );

      series.data.setAll(chartData);
    }

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);

    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    return () => {
      root.dispose();
    };
  }, [data]);

  return <div id="chartdiv" style={{ width: "1500px", height: "500px" }}></div>;
};

export default CategoryChart;
