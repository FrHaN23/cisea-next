import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

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
    parent_id: number;
  };
}

interface ChartData {
  month: string;
  [key: string]: number | string;
}

interface AmChartComponentProps {
  data: DataItem[];
}

const AmChartComponent: React.FC<AmChartComponentProps> = ({ data }) => {
  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    const chart = am4core.create('chartdiv', am4charts.XYChart);

    // Process data
    const processedData = data.reduce<{ [key: string]: { [key: string]: number } }>((acc, item) => {
      const date = new Date(item.date);
      const month = date.toISOString().substring(0, 7); // Extract YYYY-MM

      const categoryName = item.category.name;
      const value = parseInt(item.value, 10);
  
      if (!acc[month]) {
        acc[month] = {};
      }

      if (!acc[month][categoryName]) {
        acc[month][categoryName] = 0;
      }

      acc[month][categoryName] += value;

      return acc;
    }, {});


    const chartData: ChartData[] = Object.keys(processedData).map(month => {
      const entry: ChartData = { month };
      Object.keys(processedData[month]).forEach(categoryName => {
        entry[categoryName] = processedData[month][categoryName];
      });
      return entry;
    });

    // Format month to display only the month name
    const formatMonth = (date: string) => {
      try {
        const formated = new Date(date);
        if (isNaN(formated.getTime())) {
          throw new Error('Invalid date');
        }
        return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(formated);
      } catch (e) {
        console.error('Date formatting error:', e);
        return date; // Return the raw month if formatting fails
      }
    };

    // Add data to chart
    chart.data = chartData;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'month';
    categoryAxis.title.text = 'Month';
    categoryAxis.renderer.labels.template.adapter.add('text', (text, target) => {
      return formatMonth(text as string);
    });
    categoryAxis.renderer.labels.template.rotation = 45; // Rotate labels if needed
    categoryAxis.renderer.labels.template.truncate = false; // Allow labels to not be truncated

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Value';

    // Create series for each category
    const categories = Array.from(new Set(chartData.flatMap(data => Object.keys(data).filter(key => key !== 'month'))));

    categories.forEach(category => {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = category;
      series.dataFields.categoryX = 'month';
      series.name = category;
      series.tooltipText = '{name}: [bold]{valueY}[/]';
    });

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    return () => {
      chart.dispose();
    };
  }, [data]);

  return <div id="chartdiv" style={{ width: '1500px', height: '500px' }} />;
};

export default AmChartComponent;
