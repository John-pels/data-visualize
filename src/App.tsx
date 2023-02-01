import React, { useCallback, useEffect, useRef, useState } from "react";
import { IRates } from "./@types";
import { Checkbox } from "./components/Checkbox";
import { LineChart } from "./components/LineChart";
import { SelectBox } from "./components/SelectBox";
import { useFetchPort, useFetchRates } from "./hooks";
import { getMarketPositionPriceAndDay } from "./util";

const CHECKBOXES = [
  { name: 'high', value: 'high', label: 'Market High' },
  { name: 'mean', value: 'mean', label: 'Market Average' },
  { name: 'low', value: 'low', label: 'Market Low' },
]
function App() {
  const [port, setPort] = useState({
    origin: 'CNSGH',
    destination: 'NOOSL'
  })
  const [marketPositionRate, setMarketPositionRate] = useState<Array<{
    day: string;
    price: number;
  }>>([])
  const [allPorts] = useFetchPort()
  const [allRates, , loading] = useFetchRates(port)
  const [marketPosition, setmarketPosition] = useState('high')
  const highestRateValue = Math.max(...allRates?.map((rate: IRates) => rate.high))
  const chartAreaRef = useRef<HTMLDivElement>(null)
  const chartAreaWidth = chartAreaRef.current?.clientWidth

  const handleMarketPosition = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target
    const newMarketPositionRate = getMarketPositionPriceAndDay(allRates, value)
    if (checked) {
      setMarketPositionRate(newMarketPositionRate)
      setmarketPosition(value)
    }
  }, [allRates])

  const handlePortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setPort({
      ...port,
      [name]: value
    })
  }, [port])

  useEffect(() => {
    const newMarketPositionRate = getMarketPositionPriceAndDay(allRates, 'high')
    setMarketPositionRate(newMarketPositionRate)

  }, [allRates])



  return (
    <div className="container">
      <form className="search-form flex">
        <SelectBox
          onChange={handlePortChange}
          name='origin'
          value={port.origin}
          options={allPorts}
        />
        <span>X</span>
        <SelectBox
          onChange={handlePortChange}
          name='destination'
          value={port.destination}
          options={allPorts}
        />
      </form>
      <main className="content flex">
        <section className="chart" ref={chartAreaRef}>
          {loading ? <p>Loading...</p> :
            <LineChart
              width={chartAreaWidth}
              data={marketPositionRate}
              highestRateValue={highestRateValue}

            />}
        </section>
        <section className="position">
          <h4>Market Position</h4>
          <div className="flex position_checkbox">
            {
              React.Children.toArray(CHECKBOXES.map(({ name, label, value }) => (
                <Checkbox
                  label={label}
                  name={name}
                  value={value}
                  checked={marketPosition === value}
                  onChange={handleMarketPosition}
                />
              )))
            }
          </div>

        </section>
      </main>
    </div>
  );
}
export default App;
