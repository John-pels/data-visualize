import { FC, useCallback, useEffect, useRef } from "react"
import * as d3 from 'd3';
import { getAllMarketPrices, MONTHS } from "../../util";

interface ILineChart {
    width: number | undefined
    data: Array<{ day: string, price: number }>
    highestRateValue: number | undefined
}
const LineChart: FC<ILineChart> = ({ width = 0, data, highestRateValue }) => {
    const allPrices = getAllMarketPrices(data) //grabbing all prices
    const svgRef = useRef<SVGSVGElement>(null);
    const month = new Date(data[0]?.day).getMonth() || 0
    const createLineChart = useCallback(() => {
        //setting the svg element
        const height = 500
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style('background', '#fff')
            .style('overflow', 'visible')
        //setting the scaling
        const xScale = d3.scaleLinear()
            .domain([0, allPrices.length - 1])
            .range([0, width])
        const yScale: any = d3.scaleLinear()
            .domain([0, highestRateValue])
            .range([height, 0])
            .nice();
        const generateScaledLine = d3.line()
            .x((_, i) => xScale(i))
            .y(yScale)
            .curve(d3.curveCardinal)
        // clear all previous content on refresh or when the prices change
        const everything = svg.selectAll("*");
        everything.remove();
        //setting the axes
        const xAxis = d3.axisBottom(xScale.domain([0, allPrices.length - 1]))
            .tickFormat((i: any) => `${MONTHS[month]} ${i + 1}`)
        const yAxis = d3.axisLeft(yScale)
            .tickFormat((d) => `$${d}`)
        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0,${height})`)

        svg.append('g')
            .classed("xAxis", true)
            .call(yAxis)
        //setting up the data for the svg
        svg.selectAll('.line')
            .data([allPrices])
            .join('path')
            .attr('d', (d: any) => generateScaledLine(d))
            .attr('fill', 'none')
            .attr('stroke', 'black')
    }, [width, allPrices, highestRateValue, month])

    useEffect(() => {
        createLineChart()
    }, [width, allPrices, data, highestRateValue, createLineChart])

    return (
        <svg ref={svgRef}></svg>
    )
}

export { LineChart }
